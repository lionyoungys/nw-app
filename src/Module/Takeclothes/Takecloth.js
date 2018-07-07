/**
 * 取衣界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import LayerBox from '../../UI/LayerBox';
import Payment from '../../UI/Payment';
import './Takeclothes.css';
import Nodata from '../../UI/Nodata'
const token = 'token'.getData();
export default class extends Component {   
    constructor(props) {
        super(props);    
        let card = this.props.card || {}; 
        this.state = {
            show2:false,            
            count:'',
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
            merchant:{}
        }; 
        this.takeClothes=this.takeClothes.bind(this);
        this.handleAllChecked=this.handleAllChecked.bind(this);
        this.handleChecked=this.handleChecked.bind(this);
        this.paymore = this.paymore.bind(this);
        this.paymentCallback = this.paymentCallback.bind(this);
        this.print = this.print.bind(this);
        this.takecloth = this.takecloth.bind(this);
        this.M1Read = this.M1Read.bind(this); 
    }; 
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
                            merchant:res.result.merchant
                        })
                      console.log(res.result.list);
                    }else{
                        this.setState({list:[],count:0,nodatas:true, merchant:res.result.merchant})
                    }
                    
                }else{
                    console.log(222)
                    console.log(res.msg);
                }
            }
        );
    }
    takeClothes(){
        // if(this.state.checked[this.state.current].length==0)
        // return tool.ui.error({msg:'请选择你要取的衣服',callback:close => close()});
        let takeclothes= { 
            token:'token'.getData(),
            ids:JSON.stringify(this.state.checked[this.state.takeclothindex])
        }
        console.log(takeclothes)
        api.post('takeItem',
          takeclothes
        , (res, ver) => {
                if (ver && res) {
                    tool.ui.success({callback:(close) => {
                        this.takecloth();
                        close();
                    this.setState({show2:false,checked:[]})    
                    }});                                                                                         
                }else{
                    tool.ui.error({msg:res.msg,callback:(close) => {
                        close();
                    }});                 
                }
            }
        );
    }
    handleclick(e){
        console.log(e.target.dataset.index || e.target.parentNode.dataset.index);
        this.setState({index:e.target.dataset.index || e.target.parentNode.dataset.index});
    }
    handleAllChecked(e) {
        let index = e.target.dataset.index
        ,   tempChecked = this.state.checked[index] || [];
        if (this.state.list[index].item.matchLen({status:3}) == tempChecked.length) {
            this.state.checked[index] = [];
        } else {
            let len = this.state.list[index].item.length;
            this.state.checked[index] = [];
            for (var i = 0;i < len;++i) {
                if (3 == this.state.list[index].item[i].status) {
                    this.state.checked[index].push(Number(this.state.list[index].item[i].id));
                }
            }
        }
        console.log('checked', this.state.checked);
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
    paymentCallback(obj) {
        if (null == this.state.id) return;
        if (0 == obj.gateway && (null == this.state.cid || '' == this.state.cid)) return tool.ui.error({msg:'会员不存在！',callback:close => close()});
        let loadingEnd;
        tool.ui.loading(handle => loadingEnd = handle);
        api.post(
            'orderPay', 
            {token:token,gateway:obj.gateway,pay_amount:obj.amount,authcode:obj.authcode || '', cid:this.state.cid || '', oid:this.state.id, passwd:obj.passwd || ''},
            (res, ver, handle) => {
                console.log(res);
                loadingEnd();
                if (ver) {
                    this.print({change:obj.change, debt:0, pay_amount:obj.pay_amount, gateway:obj.gateway});
                    tool.ui.success({callback:close => {
                        close();
                        this.props.closeView();
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
        ,   discount = this.state.discount || 100;
        this.state.list[this.state.current].item.map(obj => {
            total = total.add(obj.raw_price, obj.addition_no_price, obj.addition_price);
            amount = amount.add( 
                (obj.has_discount ? (Math.floor(obj.raw_price * discount) / 100) : obj.raw_price), 
                obj.addition_no_price, 
                (Math.floor(obj.addition_price * discount) / 100)
            );
            dis_amount = dis_amount.add((obj.has_discount ? obj.raw_price : 0), obj.addition_price);
            no_dis_amount.add((obj.has_discount ? 0 : obj.raw_price), obj.addition_no_price);
        });
        let gateway = object.gateway
        ,   balance = this.state.balance;
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
        EventApi.print('order', {
            sn:this.state.list[this.state.current].ordersn,
            items:JSON.stringify(this.state.list[this.state.current].item),
            total:total,
            dis_amount:dis_amount,
            amount:no_dis_amount,
            discount: (discount / 10),
            real_amount:amount,
            name:this.state.user_name,
            phone:this.state.user_mobile,
            addr:this.state.merchant.maddress,    //店铺地址
            mphone:this.state.merchant.phone_number,    //店铺电话
            ad:this.state.merchant.mdesc,    //店铺广告
            number:this.state.recharge_number,
            balance:balance,
            pay_amount:object.pay_amount,
            change:object.change,
            gateway:gateway,
            debt:('undefined' !== typeof object.pay_amount && 0 != object.pay_amount ? object.debt : total)
        }, 'printer'.getData());
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
        this.setState({id:e.target.dataset.id,current:e.target.dataset.index});                        
    }
    render() {
        let order = null === this.state.current ? {} : this.state.list[this.state.current]
        ,   discount = order.discount || 100
        ,   total_amount = order.debt || order.pay_amount || 0
        ,   amount = order.amount || 0
        ,   dis_amount = order.discount_amount || 0
        ,   pay_amount = amount.add(Math.floor(dis_amount * discount) / 100)
        ,   tempChecked;

        let takeclothes=this.state.list.map((item,index)=> {
            tempChecked = this.state.checked[index] || [];
            console.log(tempChecked);
            return (
                <div>
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
                            <th></th>
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
                            item.item.map((item1,index2) =>
                                <tr key={'item'+index2} data-id={item1.id} data-index={index}  onClick={this.handleChecked}>
                                    <td>{index2+1}</td>
                                    <td><input type="checkbox" checked={-1 !== item1.id.inArray(tempChecked)} style={{display:((item.pay_state==1?true:false)&&(item1.status==4?false:true))==true?'block':'none'}}/><span>{item1.clothing_number}</span></td>
                                    <td>{item1.clothing_name}</td>
                                    <td>{item1.clothing_color}</td>
                                    <td>{item1.remark}</td>
                                    <td>{item1.grid_num}</td>
                                    <td>{item1.status==3?'未取走':item1.status==4?'已取走':'已撤单'}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table> 
            </div>
            <div className="Takeclothesdetail-footer">
                <div className="Takeclothesdetail-footer-left" style={{display:item.pay_state==1?'block':'none'}}>
                <input type="checkbox" data-index={index} onChange={this.handleAllChecked} checked={tempChecked.length == item.item.matchLen({status:3})} />全选/全不选</div>
                <div className="Takeclothesdetail-footer-right">
                    <button className="e-btn Takeclothesdetail-footer-right-btn" data-id={item.id} data-index={index} onClick = {this.paymore} style={{display:item.pay_state!=1?'block':'none'}}>立即收款</button> 
                    <button className="take-over" onClick={() => this.setState({show2:true,takeclothindex:index})} style={{display:((item.pay_state==1?true:false)&&(tempChecked.length!=0?true:false))==true?'block':'none'}}>取衣</button>
                    <button className="take-no" style={{display:((item.pay_state==1?true:false)&&(tempChecked.length==0?true:false))==true?'block':'none'}}>取衣</button>
                    {/* take-no 是灰色取不了衣服样式现在已隐藏 */}
                    <div>欠款: ￥{item.debt}</div>
                    <div>价格: ￥{item.pay_amount}</div>
                </div>                       
            </div>
            </div>
            
            );
        });
           return (
                <Window title='取衣' onClose={this.props.closeView}>   
                    <div className="Takeclothes-title">
                       <button className="e-btn Takeclothes-title-btn" onClick={this.M1Read}>读卡</button>
                       <button className="e-btn Takeclothes-title-btn" onClick = {this.takecloth}>查询</button>
                       <input type="text" className="Takeclothes-title-text" placeholder='姓名,手机号,订单号,卡号,流水号' value={this.state.number} onChange={e => this.setState({number:e.target.value})}/>
                    </div>  
                    <div className="Takeclothes-div-title">已为您找到<b>{this.state.count}</b>条数据</div>
                    <div style={{maxHeight: '500px',overflowY: 'auto'}}>{takeclothes}</div>
                {/* {total_amount:原价,dis_amount:可折金额,amount:不可折金额,discount:折扣率,pay_amount:折后价} */}
                {
                    null !== this.state.current
                    &&
                    <Payment 
                        onClose={() => this.setState({current:null})} 
                        M1Read={this.M1Read}
                        data={{
                            total_amount:total_amount,
                            discount:discount,
                            amount:amount,
                            dis_amount:dis_amount,
                            pay_amount:pay_amount
                        }}
                        callback={this.paymentCallback}
                    />
                }
                {
                    this.state.show2
                    &&
                    <LayerBox
                        title='取衣'
                        onClose={() => this.setState({show2:false})}
                        onClick={this.takeClothes}
                        onCancel={() => this.setState({show2:false})}
                        hasCancel={true} width='278' height='200'>
                        {
                            <div className="takeclothes-people">
                                该客户确定要取走衣物
                            </div>
                        }
                    
                    </LayerBox>
                }
                  {this.state.nodatas&&<Nodata />}
                </Window> 
        )
    }
}