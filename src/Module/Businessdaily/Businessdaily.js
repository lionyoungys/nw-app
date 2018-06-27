/**
 * 经营日报界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import './Businessdaily.css';
export default class extends Component {   
    constructor(props) {
        super(props);    
        this.state={
            startdate:tool.date('Y-m-01'),
            enddate:tool.date('Y-m-d'),
        }
    }; 
    
    render() {
       var arr = ['打印'].map((item,index) =><button key={index} data-index={index} onClick={this.arrbutton}>{item}</button>);
       
      
       return (             
            <Window title='经营日报' onClose={this.props.closeView}>   
                <div className="revokedata_data">
                         <div className="revokedata_dataLeft">
                            <div>开始日期：<input type="date" value={this.state.startdate} onChange={e=>this.setState({startdate:e.target.value})} /></div>                           
                            <div>结束日期：<input type="date" value={this.state.enddate} onChange={e=>this.setState({enddate:e.target.value})}/></div>
                         </div>
                         <div className="revokedata_dataright">
                           {arr}
                         </div>
                </div>
               <div className="ui-check-res">操作员：<b>荣仔</b></div>
               <table className='ui-table-base bus-daily-tab'>
                   <thead>
                       <tr>
                           <td></td>
                           <td>卡号</td>
                           <td>卡类型</td>
                           <td>折扣率</td>
                           <td>姓名</td>
                           <td>手机号</td>
                           <td>余额</td>
                           <td>办卡时间</td>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td>1</td>
                           <td>111</td>
                           <td>22</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>1</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>1</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>1</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>1</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>1</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           
                       </tr>
                       <tr>
                           <td>1</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>

                       </tr>
                       <tr>
                           <td>1</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>1</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>1</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>1</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>

                       </tr>
                       <tr>
                           <td>1</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>2</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>3</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>

                       <tr>
                           <td>4</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>4</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>4</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>4</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>4</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>4</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                       <tr>
                           <td>4</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                   </tbody>
               </table>
                      
                      
                   
             
             </Window> 
        );
    }
}