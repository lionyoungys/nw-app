/**
 * 挂失界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Page from '../../UI/Page';
import ReportLossQuery from './ReportLossQuery.css'

export default class extends Component {   
    constructor(props) {
        super(props);
        this.state = {startdate:tool.date('Y-m-d'),enddate:tool.date('Y-m-d')};                  
    }; 
    render() {
        return (
            <Window title='挂失查询' onClose={this.props.closeView}>
                <div className="Succession_data">
                         <div className="Succession_dataLeft">
                            <div>开始日期：<input type="date" value = {this.state.startdate} onChange={e => this.setState({startdate:e.target.value})}/></div>                           
                            <div>结束日期：<input type="date" value = {this.state.enddate} onChange={e => this.setState({enddate:e.target.value})}/></div>
                            <button className="e-btn loss-query">查询</button>
                         </div>                         
                </div>
                <div className="ui-check-res ReportLossQuery">已为您找到：<b>2345</b>条记录</div> 
                <div className="Succession-tab ReportLossQuery-tab">
                   <table>
                       <thead>
                           <tr>
                               <th>挂失卡号</th>
                               <th>姓名</th>
                               <th>手机</th>
                               <th>卡类型</th>
                               <th>余额</th>
                               <th>折扣率</th>
                               <th>挂失时间</th>
                               <th>操作员</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr>
                               <td>收衣</td>
                               <td>111</td>
                               <td>222</td>
                               <td>555</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               <td>555</td>
                           </tr>
                           
                           <tr>
                               <td>赔付</td>
                               <td>111</td>
                               <td>222</td>
                               <td>555</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               <td>555</td>
                           </tr>
                           <tr>
                               <td>售卡</td>
                               <td>111</td>
                               <td>555</td>
                               <td>222</td>
                               <td>333</td>
                               <td>444</td>
                               <td>555</td>
                               <td>555</td>
                           </tr>
                       </tbody>
                   </table>
                </div> 
                <Page /> 
            </Window>

       );
    }
}