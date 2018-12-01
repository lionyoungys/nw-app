/**
 * 取衣界面
 * @author wangjun
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Payment from '../../UI/Payment';
import CardList from '../Clothes/CardList';
import './Takeclothes.css';
import Nodata from '../../UI/nodata'
const token = 'token'.getData();
export default class extends Component {   
    constructor(props) {
        super(props);    
        let card = this.props.card || {}; 
        this.state = {
            title:'none',
            show2:false,            
            count:'',
            cardList:[],
            list:[],
            nopay:{},
            checked:[],
            Show:'block',
            Show1:'none',
            pay:'none',
            checkbox:'none',
            number:'',
            index:0,
            id:0,
            cid: card.id || '',    //卡编号id
            user_mobile: card.user_mobile || '',    //电话
            user_name: card.user_name || '',    //姓名
            sex: card.sex || '',    //性别
            birthday: card.birthday || '',    //生日
            address: card.address || '',    //地址
            integrals: card.integral,    //积分
            balance: card.balance || '',    //余额
            recharge_number: card.recharge_number || '',    //卡号
            card_name: card.card_name || '',    //卡类型
            discount: card.discount || '',    //折扣
            time: card.time || '',    //售卡日期     
            current:null,
            takeclothindex:null,
            merchant:{},
            payCard:{},
            calculate:2,    //计算方式
        }; 
        this.takeClothes=this.takeClothes.bind(this);
        this.handleAllChecked=this.handleAllChecked.bind(this);
        this.handleChecked=this.handleChecked.bind(this);
        this.paymore = this.paymore.bind(this);
        this.paymentCallback = this.paymentCallback.bind(this);
        this.print = this.print.bind(this);
        this.takecloth = this.takecloth.bind(this);
        this.M1Read = this.M1Read.bind(this); 
        this.PAYM1read = this.PAYM1read.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }; 
    componentDidMount(){
        this.input.focus();
    }
  
    takecloth() {
        if(this.state.number=='')
        return tool.ui.error({msg:'请输入关键词',callback:close => close()});
        api.post('takeclothes', {
            token:'token'.getData(),
            keywords:this.state.number,
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res);
                    console.log(111)
                    if(res.result.list.length>0){
                        this.setState({
                            list:res.result.list,
                            count:res.result.count,   
                            nodatas:false,     
                            merchant:res.result.merchant,
                            title:'block'
                        })
                      console.log(res.result.list);
                    }else{
                        this.setState({list:[],count:0,nodatas:true, merchant:res.result.merchant,title:'block'})
                    }
                    
                }else{
                    tool.ui.error({title:'提示',msg:'请检查您输入的是否正确',button:'确定',callback:(close, event) => {
                        close();
                    }});
                }
            }
        );
    }
    onKeyPress(e){
        13 == (e.keyCode || e.which) && this.takecloth();
    }
    takeClothes(e){
        var index = e.target.dataset.index;
        // if(this.state.checked[this.state.current].length==0)
        // return tool.ui.error({msg:'请选择你要取的衣服',callback:close => close()});
        tool.ui.warn({
            title: '取衣', msg: '该客户确定要取走衣物？', callback: (close, event) => {
                console.log(event);
                if (event == '确定') {
                    this.setState({ takeclothindex: index });
                    console.log('网络申请');
                    let takeclothes = {
                        token: 'token'.getData(),
                        ids: JSON.stringify(this.state.checked[this.state.takeclothindex])
                    }
                    console.log(takeclothes)
                    api.post('takeItem',
                        takeclothes
                        , (res, ver) => {

                            if (ver && res) {
                                tool.ui.success({
                                    callback: (close) => {
                                        this.takecloth();
                                        close();
                                        this.setState({checked: [] })
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
    handleclick(e){
        console.log(e.target.dataset.index || e.target.parentNode.dataset.index);
        this.setState({index:e.target.dataset.index || e.target.parentNode.dataset.index});
    }
    handleAllChecked(e) {
        let index = e.target.dataset.index
        ,   tempChecked = this.state.checked[index] || []
        ,   tmpCheckedCount = 0;
        this.state.list[index].item.map(obj => {
            if (4 != obj.status) ++tmpCheckedCount;
        });
        console.log(tmpCheckedCount);
        console.log(this.state.list[index].item);
        if (tmpCheckedCount == tempChecked.length) {
            this.state.checked[index] = [];
        } else {
            let len = this.state.list[index].item.length;
            this.state.checked[index] = [];
            for (var i = 0;i < len;++i) {
                if (4 != this.state.list[index].item[i].status) {
                    this.state.checked[index].push(Number(this.state.list[index].item[i].id));
                }
            }
        }
        this.setState({checked:this.state.checked});
    }
    M1Read(e) {
        let obj = {};
        obj.callback = (res) => {
            this.setState({
                cid:res.id,
                user_mobile:res.user_mobile,
                user_name:res.user_name,
                sex:res.sex,
                birthday:res.birthday,
                balance:res.balance,
                integrals:res.integrals,
                card_name:res.card_name,
                discount:res.discount,
                time:res.time,
                recharge_number:res.recharge_number,
                address:res.address,
            });
            if(''!=res.recharge_number){
                this.setState({number:res.recharge_number})
                this.takecloth();
            }
        }
        EventApi.M1Read(obj);
    }
    PAYM1read(value) {
        let obj = {};
        if ('string' === typeof value && '' != value) {
            obj.number = value;
        }
        obj.callback = (res) => {
            if (res.cardList.length > 1) {
                this.setState({cardList:res.cardList});
            } else {
                this.setState({payCard:res});
            }
        }
        EventApi.M1Read(obj);
    }
    paymentCallback(obj) {
        if (null == this.state.id) return;
        let cid = this.state.payCard.id || this.state.cid;
        if (0 == obj.gateway && (null == cid || '' == cid)) return tool.ui.error({msg:'会员不存在！',callback:close => close()});
        let loadingEnd;
        tool.ui.loading(handle => loadingEnd = handle);
        api.post(
            'orderPay', 
            {token:token,gateway:obj.gateway,pay_amount:obj.amount,authcode:obj.authcode || '', cid:cid || '', oid:this.state.id, passwd:obj.passwd || ''},
            (res, ver, handle) => {
                console.log(res);
                loadingEnd();
                if (ver) {
                    //this.print({change:obj.change, debt:0, pay_amount:obj.pay_amount, gateway:obj.gateway});
                    tool.ui.success({callback:close => {
                        close();
                        this.setState({current:null, payCard:{}});
                        this.takecloth();
                    }}); 
                } else {
                    handle();
                }
            },
            () => loadingEnd()
        );
    }
    print(object) {
        object = object || {};
        /*
            sn:订单编号;items:项目json字符串;total:总金额;dis_amount:可折金额;amount:不可折金额;gateway:支付方式;discount:折扣;real_amount:折后价;
            reduce:优惠;reduce_cause:优惠原因;coupon:现金券;coupon_name:现金券名称;
            pay_amount:实收;change:找零;debt:欠款;
            number:卡号;balance:余额;
            name:客户姓名;phone:客户电话;time:取衣时间;addr:店铺地址;mphone:店铺电话;ad:店铺广告;
        */
        let total = 0    //总金额
        ,   amount = 0    //折后金额
        ,   dis_amount = 0
        ,   no_dis_amount = 0
        ,   discount = this.state.payCard.discount || this.state.discount || 100
        ,   list = this.state.list;
        list[this.state.current].item.map(obj => {
            total = total.add(obj.raw_price, obj.addition_no_price, obj.addition_price);
            amount = amount.add( 
                (1 == obj.has_discount ? (Math.floor(obj.raw_price * discount) / 100) : obj.raw_price), 
                obj.addition_no_price, 
                (Math.floor(obj.addition_price * discount) / 100)
            );
            dis_amount = dis_amount.add((1 == obj.has_discount ? obj.raw_price : 0), obj.addition_price);
            no_dis_amount.add((1 == obj.has_discount ? 0 : obj.raw_price), obj.addition_no_price);
        });
        let gateway = object.gateway
        ,   balance = this.state.payCard.balance || this.state.balance || 0;
        if ('undefined' !== typeof gateway) {
            if (0 == gateway) {
                gateway = '会员卡支付';
                if (!isNaN(balance)) balance = balance.subtract(object.pay_amount);
            } else if (1 == gateway) {
                gateway = '现金支付';
            } else if (2 == gateway) {
                gateway = '微信支付';
            } else {
                gateway = '支付宝支付';
            }
        } else {
            gateway = '未付款';
        }
        let user_data = list[0] || {user_name:'',user_mobile:'',item:{address:''}};
        let param = {
            sn:list[this.state.current].ordersn,
            items:JSON.stringify(list[this.state.current].item),
            total:total,
            dis_amount:dis_amount,
            amount:no_dis_amount,
            discount: discount,
            real_amount:amount,
            name:user_data.user_name,
            phone:user_data.user_mobile,
            uaddr:(user_data.item ? user_data.item.address : ''),
            addr:this.state.merchant.maddress,    //店铺地址
            mphone:this.state.merchant.phone_number,    //店铺电话
            ad:this.state.merchant.mdesc,    //店铺广告
            number:this.state.payCard.recharge_number || this.state.recharge_number,
            balance:balance,
            pay_amount:object.pay_amount,
            change:object.change,
            gateway:gateway,
            debt:('undefined' !== typeof object.pay_amount && 0 != object.pay_amount ? object.debt : total)
        };
        console.log(param);
        var limit = false;
        EventApi.print('order', param,'printer'.getData(),
            () => {
                tool.ui.success({msg:'本页已打印完成，请撕纸', callback:close => {
                    if (limit) return;
                    limit = true;
                    EventApi.print('order2', param,'printer'.getData());
                    close();
                }});
            }
        );
    }
    handleChecked(e) {          
        let id = e.target.dataset.id || e.target.parentNode.dataset.id || e.target.parentNode.parentNode.dataset.id
        ,   index = e.target.dataset.index || e.target.parentNode.dataset.index || e.target.parentNode.parentNode.dataset.index
        ,   tempChecked = this.state.checked[index] || []
        ,   pointer = id.inArray(tempChecked);
        if (-1 === pointer) {
            tempChecked.push(Number(id));
            this.state.checked[index] = tempChecked;
        } else {
            this.state.checked[index].splice(pointer, 1);
        }
        this.setState({checked:this.state.checked});     
    }
    paymore (e){  
        var  is = e.target.dataset.isonline;
        if(is==1){
            tool.ui.error({title:'提示',msg:'该订单为线上订单，请在用户端支付',button:'确定',callback:(close, event) => {
                close();
            }}); 
        } else{
            this.setState({
                id:e.target.dataset.id,
                current:e.target.dataset.index
            });   
        }                                      
    }
    render() {
        let order = null === this.state.current ? {} : this.state.list[this.state.current]
        ,   discount = this.state.payCard.discount || this.state.discount || 100
        ,   amount = order.amount || 0
        ,   dis_amount = order.discount_amount || 0
        ,   pay_amount = amount.add(Math.floor(dis_amount * discount) / 100)
        ,   total_amount = amount.add(dis_amount)
        ,   tempChecked
        ,   tmpCheckedCount;

        let takeclothes=this.state.list.map((item,index)=> {
            tempChecked = this.state.checked[index] || [];
            tmpCheckedCount = 0;
            return (
                <div style={{background:'#ffffff'}}>
                <div className="Takeclothesdetail-title">
                <div className="Takeclothesdetail-title-left">
                <div>订单号：{item.ordersn}</div>
                <div>收衣时间:{item.collect}</div>
                </div>
                <div className="Takeclothesdetail-title-right">
                <div>姓名：{item.user_name}</div>
                <div>手机号：{item.user_mobile}</div>
                <div>卡号：{item.card_number}</div>
                </div>
            </div>
            <div className="Takeclothes-tab Takeclothesdetail-tab">
                <table cellPadding="0" cellSpacing="0" border="0">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>衣物编码</th>
                            <th>衣物名称</th>
                            <th>颜色</th>
                            <th>颜色瑕疵</th>
                            <th>衣挂号</th>
                            <th>洗护状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            item.item.map((item1,index2) => {
                                if (4 != item1.status) ++tmpCheckedCount;
                                return (
                                    <tr key={'item'+index2} data-id={item1.id} data-index={index}  onClick={this.handleChecked}>
                                        <td><input type="checkbox" class="e-checkbox" checked={-1 !== item1.id.inArray(tempChecked)} style={{ display: ((item.pay_state == 1 ? true : false) && (item1.status == 4 ? false : true)) == true ? 'inline' : 'none' }} /><span>{index2 + 1}</span></td>
                                        <td>{item1.clothing_number}</td>
                                        <td>{item1.clothing_name}</td>
                                        <td>{item1.clothing_color}</td>
                                        <td>{item1.remark}</td>
                                        <td>{item1.grid_num}</td>
                                        <td>{item1.status.getItemStatusName()}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table> 
            </div>
            <div className="Takeclothesdetail-footer">
                <div className="Takeclothesdetail-footer-left" style={{display:item.pay_state==1?'block':'none'}}>
                <input type="checkbox" class="e-checkbox" data-index={index} onChange={this.handleAllChecked} checked={tempChecked.length == tmpCheckedCount} />全选/全不选</div>
                <div className="Takeclothesdetail-footer-right">
                            <button className="e-btn Takeclothesdetail-footer-right-btn" data-id={item.id} data-index={index} data-isonline={item.is_online} onClick = {this.paymore} style={{display:item.pay_state!=1?'block':'none'}}>立即收款</button> 
                            <button className="take-over" data-index={index} onClick={this.takeClothes} style={{ display: ((item.pay_state == 1 ? true : false) && (tempChecked.length != 0 ? true : false)) == true ? 'block' : 'none' }}>取衣</button>
                            <button className="take-no" style={{ display: ((item.pay_state == 1 ? true : false) && (tempChecked.length == 0 ? true : false)) == true ? 'block' : 'none' } }>取衣</button>
                    {/* take-no 是灰色取不了衣服样式现在已隐藏 */}
                    <div style={{display:item.pay_state!=1?'block':'none'}}>
                        {item.lead!=1?<div><span style={{color:'#000000'}}>欠费金额:</span> ￥{item.debt}</div>:<div><span style={{color:'#000000'}}>未付款金额:</span> ￥{(parseFloat(item.debt)).changeTwoDecimal_f()}</div>}
                                <div style={{ display: 'none' }}><span style={{ color: '#000000' }}>价格:</span> ￥{item.debt}</div><div><span style={{ color: '#000000' }}>衣服件数{item.item_count}件 </span></div>
                    </div>
                </div>                       
            </div>
                    <div style={{ height: '0px', width: '850px', background: '#cce8ff', margin: '20px auto 0px'}}></div>
            </div>
            
            );
        });
           return (
                <Window title='取衣' onClose={this.props.closeView}>   
                    <div className="Takeclothes-title">
                       <button className="e-btn Takeclothes-title-btn" onClick={this.M1Read}>读卡</button>
                       <button className="e-btn Takeclothes-title-btn" onClick = {this.takecloth}>查询</button>
                       <input type="text" className="e-input" placeholder='姓名,手机号,订单号,卡号,流水号' value={this.state.number} onChange={e => this.setState({number:e.target.value})} ref={input => this.input = input} onKeyPress={this.onKeyPress}/>
                    </div>  
                    <div className="Takeclothes-div-title" style={{display:this.state.title}}>已为您找到<b>{this.state.count}</b>条数据</div>
                   <div className= "Takeclothes-tab-div">
                        <div>
                            {takeclothes}
                        </div>
                    </div>
                {/* {total_amount:原价,dis_amount:可折金额,amount:不可折金额,discount:折扣率,pay_amount:折后价} */}
                {
                    null !== this.state.current
                    &&
                    <Payment 
                        onClose={() => this.setState({current:null, payCard:{}})} 
                        M1Read={this.PAYM1read}
                        data={{
                            total_amount:total_amount,
                            discount:discount,
                            amount:amount,
                            dis_amount:dis_amount,
                            balance:this.state.payCard.balance || this.state.balance || 0,
                            pay_amount:pay_amount,
                            special_pay_amount:order.debt,
                            type:(this.state.payCard.card_name || this.state.card_name),
                            number:(this.state.payCard.recharge_number || this.state.recharge_number)
                        }}
                        callback={this.paymentCallback}
                    />
                }
                {this.state.nodatas&&<Nodata/>}
                {
                    this.state.cardList.length > 1 && <CardList data={this.state.cardList} onClose={() => this.setState({cardList:[]})} callback={obj => this.setState({payCard:obj,cardList:[]})}/>
                }
                </Window> 
        )
    }
}