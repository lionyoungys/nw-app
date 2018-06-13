/**
 * 客户消费查询页面
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import './Customerquery.css';
import './Membersdetail.css';

export default class extends Component {
    constructor(props) {
        super(props);  
        this.state = {show:false}              
    };  
    render() {               
        return (       
        <div>
            <Window title='客户信息查询' onClose={this.props.closeView}>
                <div className="Customerquery">
                   <div className="Customerquery-title">
                      <div className="Customerquery-title-nor"><span>客户电话:</span><input type="text" /></div>
                      <div className="Customerquery-title-nor"><span>客户姓名:</span><input type="text" /></div>
                      <div className="Customerquery-title-nor"><span>充值卡号:</span><input type="text" /></div>
                      <div className="Customerquery-title-select"><span>卡类型:</span><input type="text" /></div>
                      <div className="Customerquery-title-nor"><span>起始日期:</span><input type="date" className="select"/></div>
                      <div className="Customerquery-title-nor"><span>结束日期:</span><input type="date" className="select"/></div>
                   </div>
                   <div className="Customerquery-right">
                      <button className="Customerquery-query">查询</button>
                      <b></b>
                      <button className="Customerquery-over">退出</button>
                   </div>
                </div>
                <div className="Customerquery-tab">
                  <div className="Customerquery-tab-title">共记录<b>564</b>条</div>
                  <table border="0" cellSpacing="0" cellPadding="0">
                      <thead>
                          <tr>
                            <th></th>
                            <th>流水号</th>
                            <th>店铺ID</th>
                            <th>店员姓名</th>
                            <th>衣物件数</th>
                            <th>金额</th>
                            <th>实收金额</th>
                            <th>折扣率 </th>
                            <th>收银类型</th>
                            <th>日期</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td></td>
                              <td onClick = {e =>this.setState({show:true})}>15555555</td>
                              <td>555555555</td>
                              <td>42342353253243</td>
                              <td>5432521521</td>
                              <td>旺旺旺</td>
                              <td>5555555</td>
                              <td>5555555</td>
                              <td>555555555555</td>
                              <td>平台会员卡</td>
                          </tr>
                          <tr>
                              <td></td>
                              <td>15555555</td>
                              <td>555555555</td>
                              <td>42342353253243</td>
                              <td>5432521521</td>
                              <td>旺旺旺</td>
                              <td>5555555</td>
                              <td>5555555</td>
                              <td>555555555555</td>
                              <td>平台会员卡</td>
                          </tr>
                          <tr>
                              <td></td>
                              <td>15555555</td>
                              <td>555555555</td>
                              <td>42342353253243</td>
                              <td>5432521521</td>
                              <td>旺旺旺</td>
                              <td>5555555</td>
                              <td>5555555</td>
                              <td>555555555555</td>
                              <td>平台会员卡</td>
                          </tr>
                          <tr>
                              <td></td>
                              <td>15555555</td>
                              <td>555555555</td>
                              <td>42342353253243</td>
                              <td>5432521521</td>
                              <td>旺旺旺</td>
                              <td>5555555</td>
                              <td>5555555</td>
                              <td>555555555555</td>
                              <td>平台会员卡</td>
                          </tr>
                          <tr>
                              <td></td>
                              <td>15555555</td>
                              <td>555555555</td>
                              <td>42342353253243</td>
                              <td>5432521521</td>
                              <td>旺旺旺</td>
                              <td>5555555</td>
                              <td>5555555</td>
                              <td>555555555555</td>
                              <td>平台会员卡</td>
                          </tr>                         
                      </tbody>
                  </table>
                </div>
                <div className="bothpages-footer">
                       <div className="bothpages-footer-btn">
                            <span>首页</span>
                            <span>上一页</span>
                            <span>下一页</span>
                            <span>尾页</span>
                       </div>
                       <div className="bothpages-footer-all">第<span>一</span>页/共<span>四</span>页</div>
                       <div className="bothpages-footer-both">每页<span>20</span>条，共<span>112</span>条</div>
                </div>                                
            </Window>  
            {
                    this.state.show
                    &&
                    <Window title='客户信息详情' onClose={this.props.closeView}>
                        <div className="Membersdetail">
                             <div>卡号：<span>158475254582</span></div>
                            <div>姓名：<span>旺旺旺</span></div>
                            <div>手机号：<span>158475254582</span></div>
                            <div>发卡店：<span>大望路</span></div>
                            <div>卡类型：<span>平台会员卡</span></div>
                            <div>折扣率：<span>20%</span></div>
                            <div>余额：<span>￥2541</span></div>   
                            <div>发卡时间：<span>2018-05-12</span></div>   
                            <div>性别：<span>男</span></div> 
                            <div>生日：<span>19960616</span></div>  
                            <div>地址：<span>大望路1902</span></div>      
                        </div> 
                        <div className="Membersdetail-tab">
                            <div className="Membersdetail-tab-title">已为您找到<span>25485</span>条记录</div>
                            <table>
                                <thead>
                                    <tr>
                                    <th></th>
                                    <th>流水号</th>
                                    <th>店铺ID</th>
                                    <th>店员姓名 </th>
                                    <th>衣物件数 </th>
                                    <th>金额</th>
                                    <th>实收金额 </th>
                                    <th>折扣率</th>
                                    <th>收银类型</th>
                                    <th>时间 </th>
                                    <th>充值卡号 </th>
                                    <th>卡类型 </th>
                                    </tr>                             
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>4555584751</td>
                                        <td>45</td>
                                        <td>旺旺旺</td>
                                        <td>43</td>
                                        <td>564</td>
                                        <td>455</td>
                                        <td>56%</td>
                                        <td>3245</td>
                                        <td>2015-05-23</td>
                                        <td>3245</td>
                                        <td>2015-05-23</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>4555584751</td>
                                        <td>45</td>
                                        <td>旺旺旺</td>
                                        <td>43</td>
                                        <td>564</td>
                                        <td>455</td>
                                        <td>56%</td>
                                        <td>3245</td>
                                        <td>2015-05-23</td>
                                        <td>3245</td>
                                        <td>2015-05-23</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>4555584751</td>
                                        <td>45</td>
                                        <td>旺旺旺</td>
                                        <td>43</td>
                                        <td>564</td>
                                        <td>455</td>
                                        <td>56%</td>
                                        <td>3245</td>
                                        <td>2015-05-23</td>
                                        <td>3245</td>
                                        <td>2015-05-23</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>4555584751</td>
                                        <td>45</td>
                                        <td>旺旺旺</td>
                                        <td>43</td>
                                        <td>564</td>
                                        <td>455</td>
                                        <td>56%</td>
                                        <td>3245</td>
                                        <td>2015-05-23</td>
                                        <td>3245</td>
                                        <td>2015-05-23</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>4555584751</td>
                                        <td>45</td>
                                        <td>旺旺旺</td>
                                        <td>43</td>
                                        <td>564</td>
                                        <td>455</td>
                                        <td>56%</td>
                                        <td>3245</td>
                                        <td>2015-05-23</td>
                                        <td>3245</td>
                                        <td>2015-05-23</td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                        <div className="bothpages-footer">
                            <div className="bothpages-footer-btn">
                                    <span>首页</span>
                                    <span>上一页</span>
                                    <span>下一页</span>
                                    <span>尾页</span>
                            </div>
                            <div className="bothpages-footer-all">第<span>一</span>页/共<span>四</span>页</div>
                            <div className="bothpages-footer-both">每页<span>20</span>条，共<span>112</span>条</div>
                        </div>                               
                </Window>
                 }       
        </div>    
        );
    }
}