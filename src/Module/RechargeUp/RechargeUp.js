/**
 * 充值统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';

export default class extends Component {   
    constructor(props) {
        super(props);           
    }; 
    render() {      
        return ( 
               <Window title='充值统计' onClose={this.props.closeView}>  
                                        
                        <div className="bothpages_list">                                
                            <div className="unpaidstatistics_dataLeft" id="balancestatistics_title_left">
                                <div>开始日期：<input type="date"  /></div>
                                <div>结束日期：<input type="date"  /></div>
                            </div>
                            <div id="balancestatistics-leiji">累计充值金额 :<b>256485元</b></div>
                            <div id="balancestatistics-zengsong">累计赠送金额 :<b>123456485元</b></div>
                        </div>
                        <div className="bothpages_count">                           
                              <div className="bothpages_count_title">
                                 <span></span>
                                 <span>会员手机号</span>
                                 <span>时间</span>
                                 <span>充值金额</span>
                                 <span>赠送金额</span>
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
                                </tbody>
                            </table>
                        </div>                          
                      
                </Window> 
        );            
    };
}