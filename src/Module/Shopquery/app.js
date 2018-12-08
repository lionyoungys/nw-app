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
    };
    render() {  
        
        return (
            <Window title='商品查询' onClose={this.props.closeView}> 
                <div className='shopquery'> 
                    <div className="shopquery-top">
                        <div>
                            <span>&nbsp;&nbsp;&nbsp;订单号：</span><input type='text' className='e-input'/>
                        </div> 
                        <div>
                            <span>&nbsp;&emsp;&emsp;客户姓名：</span><input type='text' className='e-input'/>
                        </div>
                        <div>
                            <span>订单来源：</span><Select  />                         
                        </div>
                        <div>
                            <span>&nbsp;&emsp;&emsp;订单状态：</span><Select />
                        </div>
                    </div>
                    <div className='shopquery_btn'>
                            <button className='e-btn' >查询</button>
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
                      </tbody>
                  </Table>
                  <Page   />
                </div>                                                                      
            </Window>
        );
    }
}