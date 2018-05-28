/**
 * 余额统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import '../../UI/bothpages.css'
import './BalanceStatistics.css'
export default class extends Component {   
    constructor(props) {
        super(props);           
    }; 
    render() {      
        return ( 
            <div>
               <Window title='余额统计' onClose={this.props.closeView}>   
                   <div className="balancestatistics_title">
                      <div className="balancestatistics_title_left">
                         <span>累计会员数: <b>45687</b></span>
                         <span>累计会员余额: <b>￥15874562</b></span>
                         <button>下载</button>
                      </div>
                      <div className="balancestatistics_title_right"></div>
                   </div>
                   <div className="bothpages_count">                           
                              <div className="bothpages_count_title balancestatistics_count_title">
                                 <span></span>
                                 <span>会员手机号</span>
                                 <span>姓名</span>
                                 <span>会员类型</span>
                                 <span>余额</span>
                                 <span>办理时间</span>
                                 <span>操作</span>
                              </div>                                                     
                            <table className="bothpages_count_list balancestatistics_count_list" cellPadding="0" cellSpacing="0" border="0">  
                                <tbody>                            
                                    <tr>
                                        <td>1</td>
                                        <td>12584521585</td>
                                        <td>王军</td>
                                        <td>企业会员卡</td>
                                        <td>645.00</td>
                                        <td>2018.12.14 12:54:12</td>
                                        <td>查看详情</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>12584521585</td>
                                        <td>王军</td>
                                        <td>企业会员卡</td>
                                        <td>645.00</td>
                                        <td>2018.12.14 12:54:12</td>
                                        <td>查看详情</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>12584521585</td>
                                        <td>王军</td>
                                        <td>企业会员卡</td>
                                        <td>645.00</td>
                                        <td>2018.12.14 12:54:12</td>
                                        <td>查看详情</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>   
               </Window> 
            </div>
        );            
    };
}