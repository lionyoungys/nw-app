/**
 * 消费统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import './ConsumptionStatistics.css'
import Window from '../../UI/Window';

export default class extends Component {   
    constructor(props) {
        super(props);  
        this.state={
            startdate:tool.date('Y-m-d'),
            enddate:tool.date('Y-m-d'),
        }         
    }; 
    render() {      
        return ( 
               <Window title='消费统计' onClose={this.props.closeView}>  
                                        
                        <div className="bothpages_list">
                            <div className="unpaidstatistics_dataLeft" id="balancestatistics_title_left">
                                <div>开始日期：<input type="date"  value={this.state.startdate} onChange={e=>this.setState({startdate:e.target.value})}/></div>
                                <div>结束日期：<input type="date" value={this.state.enddate} onChange={e=>this.setState({enddate:e.target.value})}/></div>
                            </div>
                            <div id="balancestatistics-leiji">累计订单数 :<b>256485</b></div>
                            <div id="balancestatistics-zengsong">累计订单总额 :<b>123456485元</b></div>
                        </div>
                        <div className="bothpages_count">                           
                              <div className="bothpages_count_title">
                                 <span></span>
                                 <span>会员手机号</span>
                                 <span>交易单号</span>
                                 <span>时间</span>
                                 <span>金额</span>
                               </div>                                                     
                            <table className="bothpages_count_list" cellPadding="0" cellSpacing="0" border="0">  
                                <tbody>                            
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>

                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr><tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>

                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>23456987</td>
                                        <td>1254875236</td>
                                        <td>1258963541</td>
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
        );            
    };
}






