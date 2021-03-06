/**
 * 会员消费统计界面组件
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
               <Window title='会员消费统计' onClose={this.props.closeView}>                  
                        <div className="bothpages_list">
                            <div>累计充值金额 :<b>256485元</b></div>
                            <div>累计赠送金额 :<b>123456485元</b></div>
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
                                        <td>4587521456852148855</td>
                                        <td>2018.12.5</td>
                                        <td>12.00</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>4587521456852148855</td>
                                        <td>2018.12.5</td>
                                        <td>12.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>                          
                      
                </Window> 
        );            
    };
}