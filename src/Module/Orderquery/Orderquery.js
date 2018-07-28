/**
 * 订单查询
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import Page from '../../UI/Page';
import './Orderquery.css';

export default class extends Component {
    constructor(props) {
        super(props);
        this.thead = ['订单号','衣物编码','衣物名称','价格','衣物状态','工艺加价','合计','客户信息','操作']             
    }; 
    render() {  
        var thead = this.thead.map((item,index) =><th key={item +'index'}>{item}</th>)             
        return (
            <Window title='订单查询' onClose={this.props.closeView}> 
               <div className="orderquery-title">
                    <div>
                       <span>定单状态：</span><Select option={"清洗中"}   Select="清洗中"/>
                    </div>
                    <div>
                       <span>订单来源：</span><Select option={"微信"}    Select="微信"/>
                    </div>   
                    <div>
                       <input type="text" placeholder="订单号,流水号,姓名,手机号,卡号"/>
                    </div>
                    <div>
                        <button className="e-btn">读卡</button>
                        <button className="e-btn">查询</button>   
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
                          <tr>
                              <td>
                                  <span>1831096393212345</span>
                                </td>
                              <td>
                                  <span>1831096393214562</span>
                                  <span>1831096393214562</span>
                                  <span>1831096393214562</span>
                                  <span>1831096393214562</span>
                                  <span>1831096393214562</span>
                              </td>
                              <td>
                                  <span>衬衫</span>
                                  <span>裤子</span>
                                  <span>外套</span>
                                  <span>鞋</span>
                                  <span>袜子</span>
                              </td>
                              <td>
                                  <span>￥12.00</span>
                                  <span>￥10.22</span>
                                  <span>￥2.10</span>
                                  <span>￥14.10</span>
                                  <span>￥32.10</span>
                              </td>
                              <td>
                                  <span>已清洗</span>
                                  <span>已上挂</span>
                                  <span>清洗中</span>
                                  <span>未付款</span>
                                  <span>待取件</span>
                              </td>
                              <td>
                                 <span>上门服务费:￥4,保值清洗:￥2,优惠金额:￥2.30</span>                               
                              </td>
                              <td>
                                 <span>合计:4件￥78.78</span>
                              </td>
                              <td>
                                 <span>订单来源:微信姓名:范仔电话:18310963932地址:万达广场三号线1902</span>
                              </td>
                              <td>
                                  <i>订单状态</i>
                                  <b>补打小票</b>
                                  <b>补打条码</b>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <span>1831096393212345</span>
                                </td>
                              <td>
                                  <span>1831096393214562</span>                                  
                              </td>
                              <td>
                                  <span>衬衫</span>
                              </td>
                              <td>
                                  <span>￥12.00</span>
                              </td>
                              <td>
                                  <span>已清洗</span>
                              </td>
                              <td>
                                 <span>上门服务费:￥4,保值清洗:￥2,优惠金额:￥2.30</span>                               
                              </td>
                              <td>
                                 <span>合计:4件￥78.78</span>
                              </td>
                              <td>
                                 <span>订单来源:微信姓名:范仔电话:18310963932地址:万达广场三号线1902</span>
                              </td>
                              <td>
                                  <i>订单状态</i>
                                  <b>补打小票</b>
                                  <b>补打条码</b>
                              </td>
                          </tr>
                      </tbody>
                  </table>
               </div> 
               <Page   />                                                      
            </Window>
        );
    }
}