/**
 * 订单查询
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
            page:1,
            number:'',
            name:'',
            order_from:['线上','线下','全部'],
            order_name:'',
            order_state:['送件完成','清洗完成','上挂中','已取件','清洗中','全部'],
            state_name:'',
        }   ;
        this.limit = 10; 
        this.query = this.query.bind(this) ;  
        this.serch = this.serch.bind(this);     
    };
    // 初始查询
    query(){
      console.log(1)
    };
    // 条件查询
    serch (){
        console.log(2)
    }
    render() {         
        return (
            <Window title='商品订单' onClose={this.props.closeView}> 
                <div className='shopquery'> 
                    <div className="shopquery-top">
                        <div>
                            <span>&nbsp;&nbsp;&nbsp;订单号：</span><input type='text' className='e-input' value={this.state.number} onChange={e => this.setState({number:e.target.value})} />
                        </div> 
                        <div>
                            <span>&nbsp;&emsp;&emsp;客户姓名：</span><input type='text' className='e-input' value={this.state.name} onChange={e => this.setState({name:e.target.value})}/>
                        </div>
                        <div>
                            <span>订单来源：</span><Select  option={this.state.order_from} value={this.state.order_name} onChange={value => this.setState({order_name:value.value})}/>                         
                        </div>
                        <div>
                            <span>&nbsp;&emsp;&emsp;订单状态：</span><Select option={this.state.order_state} value={this.state.state_name} onChange={value => this.setState({state_name:value.value})}/>
                        </div>
                    </div>
                    <div className='shopquery_btn'>
                            <button className='e-btn' onClick = {this.serch} >查询</button>
                            <button className='e-btn clear_btn'>清空</button>
                    </div>  
                </div>
                 <div className="orderquery-div">
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
                               <th>下单时间</th>
                               <th>操作</th>
                            </tr>
                      </thead>
                      <tbody>  
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr> 
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>                      
                            <tr>
                                <td></td> 
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td> 
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td> 
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                      </tbody>
                  </Table>
                  <Page   current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)}/>
                </div>                                                                      
            </Window>
        );
    }
}