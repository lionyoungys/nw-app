/**
 * 取衣详情界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import LayerBox from '../../UI/LayerBox';
import Payment from '../../UI/Payment';
import './Takeclothes.css';

const token = 'token'.getData();
export default class extends Component {   
    constructor(props) {
        super(props);     
        this.state = {
            show2:false,            
            count:'',
            listitem:[],
            listorder:{},
            listuser:{},
            merchant:{},
            nopay:{},
            index:[],
            checked:[],
            more:false,                      
        }; 
        this.takeClothes=this.takeClothes.bind(this);
        this.handleAllChecked=this.handleAllChecked.bind(this);
        this.handleChecked=this.handleChecked.bind(this);
        this.paymore = this.paymore.bind(this);
        this.paymentCallback = this.paymentCallback.bind(this);
        this.print = this.print.bind(this);
    }; 
    takeClothes(){
        if(this.state.checked.length==0)
        return tool.ui.error({msg:'请选择你要取的衣服',callback:close => close()});
        let takeclothes= { 
            token:'token'.getData(),
            ids:this.state.checked
        }
        console.log(takeclothes)
        api.post('takeItem',
          takeclothes
        , (res, ver) => {
                if (ver && res) {
                    tool.ui.success({callback:(close) => {
                        close();
                    }});                                                                                         
                }else{
                    tool.ui.error({msg:res.msg,callback:(close) => {
                        close();
                    }});                 
                }
            }
        );
    }
      componentDidMount () {
        api.post('clothesdetail', {
            token:'token'.getData(),
            id:this.props.id,
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res);  
                    this.setState({
                        count:res.result.count,
                        listitem:res.result.item,
                        listorder:res.result.order,
                        listuser:res.result.user,
                        nopay:res.result.nopay,
                        merchant:res.result.merchant,
                    })
                }else{
                    // console.log(res.msg);                   
                }
            }
        );

      } 
    // handleclick(e){
    //     console.log(e.target.dataset.index || e.target.parentNode.dataset.index);
    //     this.setState({index:e.target.dataset.index || e.target.parentNode.dataset.index});
    // }
    handleAllChecked() {
        
        //console.log(this.state.checked.length == this.state.listitem.length);
    
            this.state.checked.length == this.state.listitem.length
            ?
            this.setState({checked:[]})        
            :
            this.setState({checked:this.state.listitem.typeArray('id')})
        
    }
    paymentCallback(obj) {
        if (null == this.props.id) return;
        if (0 == obj.gateway && (null == this.props.data.cid || '' == this.props.data.cid)) return tool.ui.error({msg:'会员不存在！',callback:close => close()});
        let loadingEnd;
        tool.ui.loading(handle => loadingEnd = handle);
        api.post(
            'orderPay', 
            {token:token,gateway:obj.gateway,pay_amount:obj.amount,authcode:obj.authcode || '', cid:this.props.data.cid || '', oid:this.props.id, passwd:obj.passwd || ''},
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
        ,   discount = this.props.data.discount || 100;
        this.state.listitem.map(obj => {
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
        ,   balance = this.props.data.balance;
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
            sn:this.state.listorder.ordersn,
            items:JSON.stringify(this.state.listitem),
            total:total,
            dis_amount:dis_amount,
            amount:no_dis_amount,
            discount: (discount / 10),
            real_amount:amount,
            name:this.state.listuser.user_name,
            phone:this.state.listuser.user_mobile,
            addr:this.state.merchant.maddress,    //店铺地址
            mphone:this.state.merchant.phone_number,    //店铺电话
            ad:this.state.merchant.mdesc,    //店铺广告
            number:this.props.data.recharge_number,
            balance:balance,
            pay_amount:object.pay_amount,
            change:object.change,
            gateway:gateway,
            debt:('undefined' !== typeof object.pay_amount && 0 != object.pay_amount ? object.debt : total)
        });
    }
    handleChecked(e) {          
        let id = e.target.dataset.id || e.target.parentNode.dataset.id || e.target.parentNode.parentNode.dataset.id;
        let index = id.inArray(this.state.checked);
        if (-1 === index) {
            this.state.checked.push(id);
        } else {
            this.state.checked.splice(index, 1);
        }
         
        this.setState({checked:this.state.checked});
        //console.log(this.state.checked.length)                 
    }
    paymore (){       
        this.setState({more:true});                        
    }
    render() {
        let discount = this.props.data.discount || 100
        ,   total_amount = this.state.listorder.arrears || this.state.listorder.pay_amount || 0
        ,   amount = this.state.nopay.amount || 0
        ,   dis_amount = this.state.nopay.discount_amount || 0
        ,   pay_amount = amount.add(Math.floor(dis_amount * discount) / 100);
        let takeclothesdetail=this.state.listitem.map((item,index)=>
        <tr key={'item'+index} data-id={item.id}  onClick={this.handleChecked}>
            <td>{index+1}</td>
            <td><input type="checkbox" checked={-1 !== item.id.inArray(this.state.checked)}/><span>{item.clothing_number}</span></td>
            <td>{item.clothing_name}</td>
            <td>{item.clothing_color}</td>
            <td>{item.remark}</td>
            <td>{item.grid_num}</td>
            <td>{item.status == 3 ? '清洗中' : '清洗完成'}</td>
        </tr>
        );
           return (
                <Window title='取衣详情' onClose={this.props.onClick}>   
                    <div className="Takeclothesdetail-title">
                      <div className="Takeclothesdetail-title-left">
                         <div>订单号：{this.state.listorder.ordersn}</div>
                         <div>衣物件数:{this.state.count}</div>
                      </div>
                      <div className="Takeclothesdetail-title-right">
                         <div>姓名：{this.state.listuser.user_name}</div>
                         <div>手机号：{this.state.listuser.user_mobile}</div>
                         <div>卡号：{this.state.listuser.card_number}</div>
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
                               {takeclothesdetail}
                           </tbody>
                        </table> 
                    </div>
                    <div className="Takeclothesdetail-footer">
                        <div className="Takeclothesdetail-footer-left">
                        <input type="checkbox" onChange={this.handleAllChecked} checked={this.state.checked.length == this.state.listitem.length}/>全选/全不选</div>
                        <div className="Takeclothesdetail-footer-right">
                           <button className="e-btn Takeclothesdetail-footer-right-btn" onClick = {this.paymore} style={{display:this.state.pay}}>立即收款</button> 
                           <button className="take-over" onClick={() => this.setState({show2:true})} >取衣</button>
                           <button className="take-no">取衣</button>                           
                           <div>欠款: ￥{this.state.listorder.arrears}</div>
                           <div>价格: ￥{this.state.listorder.pay_amount}</div>
                        </div>                       
                    </div>
                    {/* {total_amount:原价,dis_amount:可折金额,amount:不可折金额,discount:折扣率,pay_amount:折后价} */}
                    {
                        this.state.more
                        &&
                        <Payment 
                            onClose={() => this.setState({more:false})} 
                            M1Read={this.props.M1Read}
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
                </Window> 
        )
    }
}