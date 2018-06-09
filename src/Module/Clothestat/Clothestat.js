/**
 * 衣物统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import './Clothestat.css';

export default class extends Component {   
    constructor(props) {
        super(props);           
    };   
    render() {
       var arr = ['查询','打印','退出'].map((item,index) =><button key={index} data-index={index} onClick={this.arrbutton}>{item}</button>);
       return (             
            <Window title='衣物统计' onClose={this.props.closeView}>   
                      <div className="revokedata_data">
                         <div className="revokedata_dataLeft">
                            <div>开始日期：<input type="date"  /></div>                           
                            <div>结束日期：<input type="date" /></div>
                         </div>
                         <div className="revokedata_dataright">
                           {arr}
                         </div>
                         <div className="vipstats-detail"><input type="checkbox" />明细</div>
                      </div>
                      <div className="revokedata_list">
                        <div>类别合计<span className="revokedata_prompt"></span></div>
                        <ul className="revokedata_list_box">
                            <li id="revokedata_list_box_li">
                                <span></span>
                                <span>合计</span>
                                <span>衣物合计</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>6436436</span>
                                <span>3643643</span>
                            </li>
                        </ul>
                      </div>
                      <div className="revokedata_list">
                        <div>衣物合计<span className="revokedata_prompt"></span></div>
                        <ul className="revokedata_list_box">
                            <li id="revokedata_list_box_li">
                                <span></span>
                                <span>合计</span>
                                <span>衣物合计</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>6436436</span>
                                <span>3643643</span>
                            </li>
                        </ul>
                      </div>
                      <div className="revokedata_list revokedata_last clothestat-tab">
                        <div>衣物明细<b>共有 <a>25487</a> 条</b><span className="revokedata_prompt"></span></div>
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
                               <tbody>
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