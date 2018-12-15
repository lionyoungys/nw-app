/**
 * 取衣界面
 * @author wangjun
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Nodata from '../../UI/nodata'
import Table from '../../UI/Table';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clist: [],//接口返回数组 
            count: 0
        }
        this.token = 'token'.getData();
        this.M1Read = this.M1Read.bind(this);
        this.query = this.query.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.singleTakeClothes = this.singleTakeClothes.bind(this);
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
    singleTakeClothes(e) {
        e.stopPropagation();
        var id = e.target.dataset.id;
        console.log(id);
        tool.ui.warn({
            title: '取衣', msg: '该客户确定要取走衣物？', callback: (close, event) => {
                console.log(event);
                if ('确定' == event) {
                    console.log('网络申请');
                    let takeclothes = {
                        token: 'token'.getData(),
                        ids: id
                    }
                    console.log(takeclothes)
                    api.post('takeItem',
                        takeclothes
                        , (res, ver) => {
                            if (ver && res) {
                                tool.ui.success({
                                    callback: (close) => {
                                        close();
                                        this.query();
                                    }
                                });
                            } else {
                                tool.ui.error({
                                    msg: res.msg, callback: (close) => {
                                        close();
                                    }
                                });
                            }
                        }
                    );
                }
                close();
            }
        })
    }
    render() {
        let P = this.state.clist.map((data, index) =>
            <Person
                key={'p_' + index}
                name={data.name}
                phone={data.mobile}
                orders={data.order}
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
                <div className="Takeclothes-div-title" style={{ display: this.state.title }}>已为您找到<b>{this.state.count}</b>条数据</div>
                <div className="Takeclothes-tab-div">
                    <div>{P}</div>
                </div>
                {/* {total_amount:原价,dis_amount:可折金额,amount:不可折金额,discount:折扣率,pay_amount:折后价} */}

                {this.state.count < 1 && <Nodata />}
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
                >单件取衣</div>
            )
        } else {
            return <span className='takeclothred'>立即付款</span>;
        }
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
                            <input type="checkbox" class="e-checkbox" />
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
                                <th>序号</th>
                                <th>订单编号</th>
                                <th>衣物编码</th>
                                <th>衣物名称</th>
                                <th>颜色</th>
                                <th>瑕疵</th>
                                <th>衣挂号</th>
                                <th>洗护状态</th>
                                <th>操作</th>
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
                            checked={matched == len}
                            onChange={this.handleAllChecked}
                        />
                        全选&emsp;已选中{len}件&nbsp;,&nbsp;共{orders.length}件
                    </div>
                    <div className="Takeclothesdetail-footer-right">
                        <button className="take-over" onClick={this.takeClothes}>取衣</button>
                        <button className="take-no">取衣</button>
                    </div>
                </div>
            </div>

        );
    }
}