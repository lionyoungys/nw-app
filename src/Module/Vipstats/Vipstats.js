/**
 * 会员分类统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import { WSAEINVALIDPROCTABLE } from 'constants';
import './Vipstats.css';

export default class extends Component {   
    constructor(props) {
        super(props);              
    };    
    render() {
       var arr = ['退出'].map((item,index) =><button key={index} data-index={index} onClick={this.arrbutton}>{item}</button>);
       return (             
            <Window title='会员分类统计' onClose={this.props.closeView}>   
                        <div className="revokedata_data">
                            <div className="revokedata_dataLeft">
                                <div>开始日期：<input type="date" /></div>                           
                                <div>结束日期：<input type="date" /></div>                               
                            </div>
                            
                            <div className="revokedata_dataright">
                              {arr}
                            </div>
                        </div>                        
                        <div className="Pay-tatol">
                           <div className="Pay-tatol-title">分类合计</div>
                           <table>
                               <thead>
                                   <tr>
                                       <th></th>
                                       <th>卡类别</th>
                                       <th>刷卡数</th>
                                       <th>刷卡金额</th>
                                   </tr>
                               </thead>
                               <tbody>
                                   <tr>
                                       <td>1</td>
                                       <td>15566666</td>
                                       <td>15566666</td>
                                       <td>15566666</td>
                                   </tr>
                                   <tr>
                                       <td>2</td>
                                       <td>56435364367</td>
                                       <td>15566666</td>
                                       <td>15566666</td>
                                   </tr>
                                   <tr>
                                       <td>2</td>
                                       <td>56435364367</td>
                                       <td>15566666</td>
                                       <td>15566666</td>
                                   </tr>
                               </tbody>
                           </table>
                        </div>
                        <div className="Payout-detail Vipstats">
                           <div className="Payout-detail-title">赔付明细 <b>共记录<i>456</i>条记录</b></div>
                           <table>
                               <thead>
                                   <tr>
                                       <th></th>
                                       <th>卡编号</th>
                                       <th>卡号</th>
                                       <th>发卡店</th>
                                       <th>客户电话</th>
                                       <th>店员姓名</th>
                                       <th>金额</th>
                                       <th>类别</th>
                                       <th>日期</th>
                                       <th>时间</th>
                                       <th>是否上传</th>
                                       <th>卡余额</th>
                                       <th>是否上传</th>
                                       <th>卡余额</th>
                                       <th>客户姓名</th>
                                       <th>卡类型</th>
                                       <th>单位</th>
                                       <th>流水号</th>
                                       <th>导出</th>
                                       <th>卡面值</th>
                                       <th>卡型</th>
                                       <th>联盟卡</th>
                                       <th>增加信用额度</th>
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