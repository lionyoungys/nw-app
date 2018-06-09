/**
 * 客户消费查询页面
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import './Customerquery.css';

export default class extends Component {
    constructor(props) {
        super(props);                
    };  
    render() {               
        return (       
        <div>
            <Window title='客户消费查询' onClose={this.props.closeView}>
                <div className="Customerquery">
                   <div className="Customerquery-title">
                      <div><span>客户电话:</span><input type="text" /></div>
                      <div><span>客户姓名:</span><input type="text" /></div>
                      <div><span>充值卡号:</span><input type="text" /></div>
                      <div><span>卡类型:</span><input type="text" /></div>
                      <div><span>起始日期:</span><input type="date" className="select"/></div>
                      <div><span>结束日期:</span><input type="date" className="select"/></div>
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
                              <th>卡编号</th>
                              <th>充值卡号</th>
                              <th>客户电话 </th>
                              <th>充值卡金额 </th>
                              <th>折扣率</th>
                              <th>客户姓名 </th>
                              <th>消费总额</th>
                              <th>截止日期</th>
                              <th>卡类型 </th>
                          </tr>
                      </thead>
                      <tbody>
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
                                 
            </Window>        
        </div>    
        );
    }
}