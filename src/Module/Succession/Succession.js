/**
 * 交班界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Succession from './Succession.css'

export default class extends Component {   
    constructor(props) {
        super(props);
        this.state = {startdate:tool.date('Y-m-d'),enddate:tool.date('Y-m-d')};
                   
    }; 
    render() {
        return (
            <Window title='交班' onClose={this.props.closeView}>
                <div className="Succession_data">
                         <div className="Succession_dataLeft">
                            <div>开始日期：<input type="date" value = {this.state.startdate} onChange={e => this.setState({startdate:e.target.value})}/></div>                           
                            <div>结束日期：<input type="date" value = {this.state.enddate} onChange={e => this.setState({enddate:e.target.value})}/></div>
                         </div>                         
                </div>
                <div className="Succession-name">操作员：<b>荣仔</b></div> 
                <div className="Succession-tab">
                   <table>
                       <thead>
                           <tr>
                               <th>统计科目</th>
                               <th>会员卡</th>
                               <th>现金</th>
                               <th>微信</th>
                               <th>支付宝</th>
                               <th>欠费</th>
                               
                           </tr>
                       </thead>
                       <tbody>
                           <tr>
                               <td>收衣</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           
                           <tr>
                               <td>赔付</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                              
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               
                           </tr>
                           
                       </tbody>
                   </table>
                </div>  
            </Window>

       );
    }
}