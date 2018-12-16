/**
 * 取衣界面
 * @author wangjun
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Nodata from '../../UI/nodata'
import Table from '../../UI/Table';
import Payment from '../../UI/Payment';


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clist: [],    //接口返回数组 
            count: 0,
            index:null,
            oindex:null,
            show_payment:false
        }
        this.token = 'token'.getData();
        this.oid = null;
        this.calculator = new tool.api.calculator();    //获取价格计算器对象
        this.M1Read = this.M1Read.bind(this);
        this.query = this.query.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.handlePay = this.handlePay.bind(this);
        this.handlePaymentCallback = this.handlePaymentCallback.bind(this);
    };
    componentDidMount() { this.input.focus(); }
    M1Read() { EventApi.M1Read({ callback: res => this.query(res.recharge_number) }) }
    query(number) {
        if ('undefined' == typeof number && '' == this.state.number) {
            return tool.ui.error({ msg: '请输入关键词', callback: close => close() });
        }
        number = number || this.state.number;
        api.post('takeclothes', { token: this.token, keywords: this.state.number }, (res, ver) => {
            console.log(res);
            if (ver) {
                this.setState({ clist: res.result.clist, count: res.result.count });
            }
        });
    }
    onKeyPress(e) {
        13 == (e.keyCode || e.which) && this.query();
    }

    handlePay(e) {
        let data = e.target.dataset;
        this.setState({show_payment:true, index:data.pindex, oindex:data.oindex});
    }

    handlePaymentCallback(obj) {
        if (null != this.oid) {
            if (0 == obj.gateway && '' == obj.card.id) {
                return tool.ui.error({msg:'会员不存在！',callback:close => close()});
            }
            let loadingEnd;
            tool.ui.loading(handle => loadingEnd = handle);
            let param = {
                token:this.token,
                gateway:obj.gateway,
                pay_amount:obj.cash,
                authcode:obj.authcode, 
                cid:obj.card.id,
                oid:this.oid, 
                passwd:obj.passwd,
                coupon_id:obj.coupon ? obj.coupon.id : '',
                activity_id:obj.activity ? obj.activity.id : ''
            };
            console.log(param);
            api.post('orderPay', param, (res, ver, handle) => {
                    console.log(res);
                    loadingEnd();
                    if (ver) {
                        //this.print({change:obj.change, debt:0, pay_amount:obj.pay_amount, gateway:obj.gateway});
                        tool.ui.success({callback:close => {
                            close();
                            this.setState({show_payment:null});
                            this.query();
                        }}); 
                    } else {
                        handle();
                    }
                },
                () => loadingEnd()
            );
        }
    }
    
    render() {
        let phone, items, debt = {debt:0, dis_amount:0, no_dis_amount:0};
        if (this.state.show_payment) {
            let data = this.state.clist[this.state.index]
            ,   order = data.order[this.state.oindex];
            phone = data.mobile;
            this.oid = order.id;
            items = order.item;
            debt.debt = order.debt;
            debt.dis_amount = order.discount_amount;
            debt.no_dis_amount = order.amount;
        }
        let P = this.state.clist.map((data, index) =>
            <Person
                key={'p_' + index}
                index={index}
                name={data.name}
                phone={data.mobile}
                orders={data.order}
                query={this.query}
                handlePay={this.handlePay}
            />
        );
        return (
            <Window title='取衣' onClose={this.props.closeView}>
                <div className="Takeclothes-title">
                    <button className="e-btn Takeclothes-title-btn" onClick={this.M1Read}>读卡</button>
                    <button className="e-btn Takeclothes-title-btn" onClick={this.query}>查询</button>
                    <input
                        type="text"
                        className="e-input"
                        placeholder='姓名,手机号,订单号,卡号,流水号'
                        value={this.state.number}
                        onChange={e => this.setState({ number: e.target.value })}
                        ref={input => this.input = input}
                        onKeyPress={this.onKeyPress}
                    />
                </div>
                <div className="Takeclothes-div-title">已为您找到<b>{this.state.count}</b>条数据</div>
                <div className="Takeclothes-tab-div">
                    <div>{P}</div>
                </div>

                {this.state.count < 1 && <Nodata />}
                {
                    this.state.show_payment 
                    && 
                    <Payment 
                        onClose={() => this.setState({show_payment:false})}
                        callback={this.handlePaymentCallback}
                        oid={this.oid}
                        phone={phone}
                        debt={debt}
                        items={items}
                        calculator={this.calculator}
                    />}
            </Window>
        )
    }
}

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked:[],    //选中的数据列表
        };
        this.list = [];    //可以选中的订单的指针列表
        this.hout = this.hout.bind(this);
        this.bout = this.bout.bind(this);
        this.singleTakeClothes = this.singleTakeClothes.bind(this);
        this.handleAllChecked = this.handleAllChecked.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }
    singleTakeClothes(e) {
        let checkid=[];
        if('all'==e.target.dataset.all){
            for(var i=0;i<this.state.checked.length;i++){
                for(var j=0;j<this.props.orders[this.state.checked[i]].item.length;j++){
                    checkid.push(this.props.orders[this.state.checked[i]].item[j].id)
                    console.log(this.props.orders[this.state.checked[i]].item.length)
                }
            }
        }else{
            var index = e.target.dataset.index;
            var oindex = e.target.dataset.oindex;
            checkid.push(this.props.orders[oindex].item[index].id)
            console.log(index);
            console.log(oindex);
        }
        tool.ui.warn({
            title: '取衣', msg: '该客户确定要取走衣物？', callback: (close, event) => {
                console.log(event);
                if ('确定' == event) {
                    console.log('网络申请');
                    let takeclothes = {
                        token: 'token'.getData(),
                        ids: JSON.stringify(checkid)
                    }
                    console.log(takeclothes)
                    api.post('manytakeItem',
                        takeclothes
                        , (res, ver, handle) => {
                            if (ver) {
                                tool.ui.success({callback: (close) => {
                                        close();
                                       this.props.query();
                                       this.setState({checked:[]})
                                }});
                            } else {
                                handle();
                            }
                        }
                    );
                }
                close();
            }
        })
    }
    //界面文字展示
    hout(arr, key, func) {
        return arr.item.map((obj, index) =>
            <div key={'hout_' + index} className='takecloth_div'>{'function' == typeof func ? func(obj[key]) : obj[key]}</div>
        );
    }

    //根据支付方式展示按钮
    bout(order, oindex) {
        if (1 == order.pay_state) {
            return order.item.map((obj, index) => 
                <div 
                    key={'bout_' + index} 
                    className='takeclothgreen'
                    data-oindex={oindex} 
                    data-index={index} 
                    onClick={this.singleTakeClothes}
                >单件取衣</div>
            );
        } else {
            return (
                <span 
                    className='takeclothred' 
                    data-oindex={oindex} 
                    data-pindex={this.props.index} 
                    onClick={this.props.handlePay}
                >立即付款</span>
            );
        }
    }
    handleAllChecked(){
        if(this.state.checked.length==this.list.length){
            this.setState({checked:[]})
        }else{
            this.setState({checked:this.list});
        }
         
    }
    handleChecked(e){
        let index = e.target.dataset.index
        ,   pointer = index.inArray(this.state.checked);
        if (-1 == pointer) {
            this.state.checked.push(index);
        } else {
            this.state.checked.splice(pointer, 1);
        }
        this.setState({checked:this.state.checked});
    }
    render() {
        this.list = [];
        let orders = tool.isArray(this.props.orders) ? this.props.orders : []
        ,   len = this.state.checked.length
        ,   matched = 0
        ,   html = orders.map((order, index) => {
            let match = (1 == order.pay_state);
            if (match) {
                ++matched;
                this.list.push(index);
            }
            return (
                <tr key={'o_' + index}>
                    <td>
                        {
                            match
                            &&
                            <input type="checkbox" checked={-1 != index.inArray(this.state.checked)} class="e-checkbox" data-index={index}  onChange={this.handleChecked}/>
                        }
                        {index + 1}
                    </td>
                    <td>{order.ordersn}</td>
                    <td>{this.hout(order, 'clothing_number')}</td>
                    <td>{this.hout(order, 'clothing_name')}</td>
                    <td>{this.hout(order, 'clothing_color')}</td>
                    <td>{this.hout(order, 'remark')}</td>
                    <td>{this.hout(order, 'grid_num')}</td>
                    <td>{this.hout(order, 'status', val => val.getItemStatusName())}</td>
                    <td>{this.bout(order, index)}</td>
                </tr>
            );
        });
        return (
            <div style={{ background: '#ffffff' }}>
                <div className="Takeclothesdetail-title">
                    <div className="Takeclothesdetail-title-left">
                        <div>姓名：{this.props.name}</div><div>手机号：{this.props.phone}</div>
                    </div>
                </div>
                <div className='Takeclothes-tab'>
                    <Table>
                        <thead>
                            <tr>
                                <th style={{minWidth:'45px'}}>序号</th>
                                <th style={{minWidth:'110px'}}>订单编号</th>
                                <th style={{minWidth:'100px'}}>衣物编码</th>
                                <th style={{minWidth:'70px'}}>衣物名称</th>
                                <th style={{minWidth:'80px'}}>颜色</th>
                                <th style={{minWidth:'80px'}}>瑕疵</th>
                                <th style={{minWidth:'45px'}}>衣挂号</th>
                                <th style={{minWidth:'50px'}}>洗护状态</th>
                                <th style={{minWidth:'55px'}}>操作</th>
                            </tr>
                        </thead>
                        <tbody>{html}</tbody>
                    </Table>
                </div>
                <div className="Takeclothesdetail-footer">
                    <div className="Takeclothesdetail-footer-left" >
                        <input 
                            type="checkbox" 
                            class="e-checkbox" 
                            checked={matched == len&&len!=0}
                            onChange={this.handleAllChecked}
                        />
                        全选&emsp;已选中{len}件&nbsp;,&nbsp;共{orders.length}件
                    </div>
                    <div className="Takeclothesdetail-footer-right">
                        <button className="take-over" onClick={this.singleTakeClothes} data-all={'all'} style={{display:len!=0?'block':'none'}}>取衣</button>
                        <button className="take-no" style={{display:len==0?'block':'none'}}>取衣</button>
                    </div>
                </div>
            </div>

        );
    }
}