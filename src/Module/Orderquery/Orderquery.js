/**
 * 订单查询
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import Page from '../../UI/Page';
import Nodata from '../../UI/nodata';
import './Orderquery.css';

export default class extends Component {
    constructor(props) {
        super(props);
        this.thead = ['订单号','衣物编码','衣物名称','价格','衣物状态','工艺加价','合计','客户信息','操作'];
        this.state = {
            orderquerylist:[],
            count:0,
            page:1,
            ostatus_name:'', // 状态名称
            orderostatus:[],
            online:[],
            online_name:'',
            number:'',
            nodatas:false,           
        }
        this.limit = 10;  
        this.query = this.query.bind(this);
        this.print = this.print.bind(this) ;  // 打印 
        this.prints = this.prints.bind(this); // 打印条形码
        this.serch = this.serch.bind(this) ; //查询      
    };
    // 初始化页面加载
    componentDidMount (){
        this.query();
        this.input.focus();
    }
    //查询
    serch (){
        this.setState({orderquerylist:[]})
        this.query();
    }
    query(page) {
       // console.log(page);
        page = page || this.state.page;                                         
        api.post('ordersearch',{
            token: 'token'.getData(),
            page: page, 
            limit: this.limit,
            ostatus:this.state.ostatus_name=='待接单'?'0':this.state.ostatus_name=='待上门'?'1':this.state.ostatus_name=='已上门'?'2':this.state.ostatus_name=='洗护中'?'3':this.state.ostatus_name=='完成清洗'?'4':this.state.ostatus_name=='送件完成'?'5':this.state.ostatus_name=='烘干中'?'50':this.state.ostatus_name=='熨烫中'?'51':this.state.ostatus_name=='质检中'?'52':this.state.ostatus_name=='已上挂'?'91':this.state.ostatus_name=='已完成'?'99':this.state.ostatus_name=='临时订单'?'100':this.state.ostatus_name=='已取消'?'101':this.state.ostatus_name=='已拒单'?'102':'',
            value:this.state.number,
            is_online:this.state.online_name=='线下'?'0':this.state.online_name=='线上'?'1':''
        }, (res,ver) => {           
            if (ver && res) {
                 console.log(res);
                if(res.result.list.length>0){                                                            
                    this.setState({
                        orderquerylist:res.result.list,
                        count:res.result.count,
                        page:page,
                        orderostatus: res.result.ostatus.typeArray('name'),                                              
                        online:res.result.is_online.typeArray('name'),  
                        nodatas:false,                    
                    }) 
                    this.state.orderostatus.push('全部');
                    this.state.online.push('全部');                                                    
                }else{
                    this.setState({
                        orderquerylist:res.result.list,
                        count:res.result.count,
                        page:page,
                        nodatas:true,
                    }) 
                }                      
            }            
        })
    }
    print (e){       
        /*
            sn:订单编号;items:项目json字符串;total:总金额;dis_amount:可折金额;amount:不可折金额;gateway:支付方式;discount:折扣;real_amount:折后价;
            reduce:优惠;reduce_cause:优惠原因;coupon:现金券;coupon_name:现金券名称;
            pay_amount:实收;change:找零;debt:欠款;
            number:卡号;balance:余额;
            name:客户姓名;phone:客户电话;time:取衣时间;addr:店铺地址;mphone:店铺电话;ad:店铺广告;
        */
        var id = e.target.dataset.id; 
        console.log(id)     
        api.post('receipt',{
            token:'token'.getData(),
            oid:id,
        }, (res,ver) => {  
            console.log(res)         
            if (ver && res) {
                console.log('调取打印');
                let data = res.result.order
                ,   codes = data.work.map(obj => {
                    return {
                        clothing_number:obj.clothing_number,
                        clothing_name:obj.clothing_name,
                        clothing_color:obj.clothing_color,
                        grid_num:obj.grid_num,
                        sign:obj.sign,
                        remark:obj.remark,
                    };
                });
                var params = {
                    sn:data.ordersn,
                    items:JSON.stringify(data.work),
                    put_codes:JSON.stringify(codes),                   
                    total:data.total,
                    dis_amount:data.dis_amount,
                    amount:data.amount,
                    discount: data.discount ? data.discount : 10,
                    real_amount:data.pay_amount,
                    name:data.user_name,
                    phone:data.user_mobile,
                    time:data.deal_time,    //取衣时间
                    addr:data.maddress,      //店铺地址
                    mphone:data.phone_number,   //店铺电话
                    ad:data.ad ? data.ad : '',    //店铺广告
                    number:data.card_number,
                    balance:data.balance ? data.balance : 0,
                    pay_amount:data.pay_amount,
                    gateway:data.pay_gateway
                }
                EventApi.print('order', params, 'printer'.getData(), () => {
                    tool.ui.success({msg:'本页已打印完成，请撕纸', callback:close => {
                        EventApi.print('order2', params, 'printer'.getData());
                        close();
                    }});
                });
            }
        }) 
    } 
    prints (e){
        var id = e.target.dataset.id
        ,   index = e.target.dataset.index; 
        console.log(id)       
        let printer = 'clean_tag_printer'.getData();
        console.log(printer);
        if (printer) {
            let text = this.state.orderquerylist[index].mname;
            let name = this.state.orderquerylist[index].user_name;
            let phone = this.state.orderquerylist[index].user_mobile;
            let items = this.state.orderquerylist[index].work
            ,   len = items.length;
            for (let i = 0;i < len;++i) {
                EventApi.print('code2', {
                    logo_name:text, // 衣物店的名称
                    sn:items[i].clothing_number,  //衣物编码
                    name:items[i].clothing_name,
                    color:items[i].clothing_color,
                    service:items[i].addition_remark,
                    reark:items[i].reark,
                    forecast:items[i].forecast,
                    number:items[i].grid_num, // 衣挂号
                    time:items[i].deal_time, // 取衣时间
                    user_name:name,
                    tell:phone,
                }, printer);
            }
        }   
    }        
    render() {  
        var thead = this.thead.map((item,index) =><th key={item +'index'}>{item}</th>)  
        var orderquerylist = this.state.orderquerylist.map((item,index) =><tr key={'item'+index}>
          <td><span>{item.ordersn}</span></td>
          <td>{item.work.map((item,index)=><span>{item.clothing_number}</span>)}</td>
          <td>{item.work.map((item,index)=><span>{item.clothing_name}</span>)}</td>
          <td>{item.work.map((item,index)=><span>{item.raw_price}</span>)}</td>
          {/* <td>{item.work.map((item,index)=><span >{item.status==3?'清洗中':item.status==4?'清洗完成':item.status==5?'已撤单':'已完成'}</span>)} */}
          <td>{item.work.map((item,index)=><span >{item.sta}</span>)}
          </td>
          <td><span>保值费:{item.keep_price}<br/>工艺加价:{item.craft_price}<br/>运费:{item.freight_price}</span></td>
          <td>合计:{item.total}元<br/>共:{item.count}件</td>
          <td>订单来源:<j>{item.is_online=='0'?'线下':'线上'}</j><br/>姓名:{item.user_name}<br/>地址:{item.address}</td>
          <td>
                <i>订单状态:{item.ostatus}</i>
                <b onClick={this.print} data-index={index} data-id={item.id}>补打小票</b>
                <b onClick = {this.prints} data-id={item.id} data-index={index}>补打条码</b></td>
          </tr>
        )           
        return (
            <Window title='订单查询' onClose={this.props.closeView}> 
               <div className="orderquery-title">
                    <div>
                       <span>订单状态：</span><Select  option={this.state.orderostatus}  onChange={value => this.setState({ostatus_name:value=='全部'?'':value})} selected="全部"/>
                    </div>
                    <div>
                       <span>订单来源：</span><Select option={this.state.online}  onChange={value => this.setState({online_name:value=='全部'?'':value})} selected="全部"/>
                    </div>   
                    <div>
                       <input type="text" placeholder="订单号,姓名,手机号,卡号" value={this.state.number} onChange={e => this.setState({number:e.target.value})} ref={input => this.input = input} />
                    </div>
                    <div>                        
                        <button className="e-btn" onClick = {this.serch}>查询</button>   
                    </div>              
               </div> 
               <div className="orderquery-div">
                  <table>
                      <thead>
                            <tr> 
                               {thead}
                            </tr>
                      </thead>
                      <tbody>
                          {this.state.nodatas&&<Nodata />}
                          {orderquerylist}
                      </tbody>
                  </table>
               </div> 
               <Page   current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)}/>                                                      
            </Window>
        );
    }
}