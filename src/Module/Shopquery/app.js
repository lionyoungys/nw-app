/**
 * 商品订单
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import Page from '../../UI/Page';
import Nodata from '../../UI/nodata';
import Table from '../../UI/Table';
import './app.css';

export default class extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            count:0,
            page:0,
            number:'',
            from_name:'',            
            order_name:'线下',
            statename:'完成',
            shoplist:[],
            nodatas:true, 
        }   ;
        this.limit = 10;   
        this.query = this.query.bind(this);       
        this.serch = this.serch.bind(this);     
    };   
    // 条件查询
    query (page){
        page = page || this.state.page;
        let aa = {
            token: 'token'.getData(),
            page: page, 
            limit: this.limit,
            is_online:this.state.order_name=='线下'?'0':this.state.order_name=='线上'?'1':'',
            ostatus:this.state.statename == '完成'?'99':'',
            user_name:this.state.from_name,
            ordersn:this.state.number, 
        }; 
        console.log(aa)          
        api.post('orderQuery',aa, (res,ver) => {           
            if (ver && res) {
                 console.log(res); 
                 if(res.result.order.length>0){
                    this.setState({
                        shoplist:res.result.order,
                        page:res.result.page,
                        count:res.result.count,
                        nodatas:false,
                    })
                 }else{
                    this.setState({
                        shoplist:[],
                        count:res.result.count,
                        page:page,
                        nodatas:true,
                    })
                 }                                          
            } else{
                console.log(res.msg)
            }           
        })       
    }
    serch (){
        this.query()       
    }
    render() {  
       // console.log();
        var html = this.state.shoplist.map((item,index)=>
            <tr>
               <td><span>{item.ordersn}</span></td> 
               <td>{item.work.map((item,index)=><span>{item.name}</span>)}</td>
               <td>{item.work.map((item,index)=><span>{item.raw_price}</span>)}</td>
               <td>{item.work.map((item,index)=><span>{item.work_number}</span>)}</td>
               <td><span>{item.pay_amount}</span></td>
               <td><span>姓名:{item.user_name}</span><span>电话：{item.user_mobile}</span></td>
               <td><span>{item.ostatus}</span></td>
               <td>{item.work.map((item,index)=><span>{item.preferential_price}</span>)}</td>
               <td>代购</td>
            </tr>
        )       
        return (
            <Window title='商品订单' onClose={this.props.closeView}> 
                <div className='shopquery'> 
                    <div className="shopquery-top">
                        <div>
                            <span>&nbsp;&nbsp;&nbsp;订单号：</span><input type='text' className='e-input' value={this.state.number} onChange={e => this.setState({number:e.target.value})} />
                        </div> 
                        <div>
                            <span>&nbsp;&emsp;&emsp;客户姓名：</span><input type='text' className='e-input' value={this.state.from_name} onChange={e => this.setState({from_name:e.target.value})}/>
                        </div>
                        <div>
                            <span>订单来源：</span><Select  option={['线下','线上']} value={this.state.order_name} onChange={value => this.setState({order_name:value.value})}/>                         
                        </div>
                        <div>
                            <span>&nbsp;&emsp;&emsp;订单状态：</span><Select value={this.state.statename} />
                        </div>
                    </div>
                    <div className='shopquery_btn'>
                            <button className='e-btn' onClick = {this.serch} >查询</button>
                            <button className='e-btn clear_btn'>清空</button>
                    </div>  
                </div>
                 <div className="orderquery-div shopquery-div">
                  <Table>
                      <thead>
                            <tr> 
                               <th>订单号</th>
                               <th>商品名称</th>
                               <th>商品价格</th>
                               <th>商品数量</th>
                               <th>总计</th>
                               <th>客户信息</th>
                               <th>订单状态</th>
                               <th>优惠金额</th>
                               <th>渠道</th>
                            </tr>
                      </thead>
                      <tbody> 
                          {this.state.nodatas&&<Nodata />} 
                          {html}  
                      </tbody>
                  </Table>
                  <Page   current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)}/>
                </div>                                                                      
            </Window>
        );
    }
}