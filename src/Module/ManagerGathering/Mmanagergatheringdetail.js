/**
 * 经理收款明细
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import './ManagerGathering.css';
export default class extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <Window title='经理收款-查看明细' onClose={this.props.onClick} >
              <div className="Payout-detail " id="ManagerGathering-detail">
                           <table>
                               <thead>
                                   <tr>                                       
                                       <th>流水号</th>
                                       <th>店员姓名</th>
                                       <th>衣服件数</th>
                                       <th>金额</th>
                                       <th>实收金额</th>
                                       <th>折扣率</th>
                                       <th>收款类型</th>
                                       <th>客户电话</th>
                                       <th>客户姓名</th>
                                       <th>时间</th>
                                   </tr>                                  
                               </thead>
                               <tbody>
                                   <tr>
                                       
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                   </tr>
                                   <tr>
                                       
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                   </tr>
                                   <tr>
                                       
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                   </tr>
                                   <tr>
                                       
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                   </tr>
                                   <tr>
                                      
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                   </tr>
                                   <tr>
                                       
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                   </tr>
                                   <tr>
                                       
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                   </tr>
                                   <tr>
                                      
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                       <td>4522114 </td>
                                   </tr>
                               </tbody>
                           </table>
                        
                        </div>
            </Window>

        );
    }
}