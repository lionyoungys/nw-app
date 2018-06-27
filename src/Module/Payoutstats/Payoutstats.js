/**
 * 赔付统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import { WSAEINVALIDPROCTABLE } from 'constants';
import Window from '../../UI/Window';
import './Payoutstats.css';


export default class extends Component {   
    constructor(props) {
        super(props);              
    };    
    render() {
       var arr = ['查询','打印','退出'].map((item,index) =><button key={index} data-index={index} onClick={this.arrbutton}>{item}</button>);
       return (             
            <Window title='赔付统计' onClose={this.props.closeView}>   
                        <div className="revokedata_data">
                            <div className="revokedata_dataLeft">
                                <div>开始日期：<input type="date" /></div>                           
                                <div>结束日期：<input type="date" /></div>
                            </div>
                            <div className="revokedata_dataright">
                            {arr}
                            </div>
                        </div>
                        <div className="Payoutstats">
                           <div className="Payoutstats-boxdiv">
                              <div className="Payoutstats-div">
                                 <span>客户姓名: </span><input type="text"/>
                              </div>
                              <div className="Payoutstats-div">
                                 <span>客户电话: </span><input type="text"/>
                              </div>
                              <div className="Payoutstats-div">
                                 <span>日期: </span><input type="text" className="select"/>
                              </div>
                              <div className="Payoutstats-div">
                                 <span>类别: </span><input type="text"/>
                              </div>
                              <div className="Payoutstats-text">
                                 <span>退赔原因：</span>
                                 <textarea></textarea>
                              </div>
                           </div>
                           <div className="Payoutstats-boxdiv">
                              <div className="Payoutstats-div">
                                 <span>流水号: </span><input type="text"/>
                              </div>
                              <div className="Payoutstats-div">
                                 <span>衣物名称: </span><input type="text"/>
                              </div>
                              <div className="Payoutstats-div">
                                 <span>衣物类别: </span><input type="text" className="select"/>
                              </div>
                              <div className="Payoutstats-div">
                                 <span>退款方式: </span><input type="text"/>
                              </div>
                              <div className="Payoutstats-text">
                                 <span>经验反馈：</span>
                                 <textarea></textarea>
                              </div>
                           </div>
                        </div>
                        <div className="Pay-tatol">
                           <div className="Pay-tatol-title">赔付合计</div>
                           <table>
                               <thead>
                                   <tr>
                                       <th></th>
                                       <th>合计</th>
                                   </tr>
                               </thead>
                               <tbody>
                                   <tr>
                                       <td>1</td>
                                       <td>15566666</td>
                                   </tr>
                                   <tr>
                                       <td>2</td>
                                       <td>56435364367</td>
                                   </tr>
                                   <tr>
                                       <td>2</td>
                                       <td>56435364367</td>
                                   </tr>
                               </tbody>
                           </table>
                        </div>
                        <div className="Payout-detail bothpayout-detail" id="bothpayout-detail">
                           <div className="Payout-detail-title">赔付明细 <b>共记录<i>456</i>条</b></div>
                           <table>
                               <thead>
                                   <tr>
                                       <th></th>
                                       <th>流水号</th>
                                       <th>日期</th>
                                       <th>经手人</th>
                                       <th>类别</th>
                                       <th>衣物名称</th>
                                       <th>衣物类别</th>
                                       <th>退赔原因</th>
                                       <th>退赔方式</th>
                                       <th>退赔金额</th>
                                       <th>衣物类别</th>
                                   </tr>                                  
                               </thead>
                               <tbody >
                                   <tr>
                                       <td>1</td>
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
                                       <td>1</td>
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
                                       <td>1</td>
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
                                       <td>1</td>
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
                                       <td>1</td>
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
                                       <td>1</td>
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
                                       <td>1</td>
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
                                       <td>1</td>
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