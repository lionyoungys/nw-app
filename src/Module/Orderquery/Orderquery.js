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
        console.log(page);
        page = page || this.state.page;                                         
        api.post('ordersearch',{
            token: 'token'.getData(),
            page: page, 
            limit: this.limit,
            ostatus:this.state.ostatus_name=='下单'?'0':this.state.ostatus_name=='确认订单'?'1':this.state.ostatus_name=='已收衣'?'2':this.state.ostatus_name=='清洗中'?'3':this.state.ostatus_name=='完成清洗'?'4':this.state.ostatus_name=='送件完成'?'5':this.state.ostatus_name=='烘干中'?'50':this.state.ostatus_name=='熨烫中'?'51':this.state.ostatus_name=='质检中'?'52':this.state.ostatus_name=='已上挂'?'91':this.state.ostatus_name=='订单完成'?'99':this.state.ostatus_name=='临时订单'?'100':this.state.ostatus_name=='用户取消'?'101':this.state.ostatus_name=='店铺取消'?'102':'',
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
    print (){       
        /*
            sn:订单编号;items:项目json字符串;total:总金额;dis_amount:可折金额;amount:不可折金额;gateway:支付方式;discount:折扣;real_amount:折后价;
            reduce:优惠;reduce_cause:优惠原因;coupon:现金券;coupon_name:现金券名称;
            pay_amount:实收;change:找零;debt:欠款;
            number:卡号;balance:余额;
            name:客户姓名;phone:客户电话;time:取衣时间;addr:店铺地址;mphone:店铺电话;ad:店铺广告;
        */
        
        
        // EventApi.print('order', {
        //     sn:222,
        //     items:JSON.stringify([{clothing_number:'12345',clothing_name:'你好',clothing_color:'蓝色',sign:'骆驼',remark:'污渍',forecast:'发白',raw_price:'20.25',has_discount:1}]),
        //     put_codes:JSON.stringify([{clothing_number:'12345',grid_num:'A#32'}]),
        //     total:333,
        //     dis_amount:454545,
        //     amount:7878798,
        //     discount: 10,
        //     real_amount:'aaaa',
        //     name:'你好',
        //     phone:18512354856,
        //     time:'2018-5-25',
        //     addr:647457575,
        //     mphone:4745758758,
        //     ad:7583523634,
        //     number:7548754854325,
        //     balance:252353636,
        //     pay_amount:6436747567,
        //     change:65475485485,
        //     gateway:'未付款',
        //     debt:0
        // }, 'printer'.getData());
        let printer = 'clean_tag_printer'.getData();
        console.log(printer);
        if (printer) {
             let len = this.state.orderquerylist.length;
            for (let i = 0;i < len;++i) {
                EventApi.print('code', {
                    sn:'1234', 
                    name:'你好', 
                    color:'蓝色',
                    number:'12445',
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
          <td>{item.work.map((item,index)=><span>{item.discount_price}</span>)}</td>
          <td>{item.work.map((item,index)=><span >
             {item.status==3?'清洗中':item.status==4?'清洗完成':item.status==5?'已撤单':'已完成'}</span>)}
          </td>
          <td><span>保值费:{item.keep_price}<br/>工艺加价:{item.craft_price}<br/>运费:{item.freight_price}</span></td>
          <td>合计:{item.total}<br/>共:{item.count}</td>
          <td>订单来源:{item.is_online=='0'?'线下':'线上'}<br/>姓名:{item.user_name}<br/>地址:{item.address}</td>
          <td>
                <i>订单状态:{item.ostatus}</i>
                <b >补打小票</b>
                <b onClick={this.print} data-index={index} data-id={item.id}>补打条码</b></td>
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