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
                            <button className="e-btn recharg-btn">查询</button>
                            <div id="balancestatistics-leiji">累计订单数 :<b>256485</b></div>
                            <div id="balancestatistics-zengsong">累计订单总额 :<b>12345元</b></div>
                            
                        </div>
                        <table className='ui-table-base bal-sta-tab consun-tab'>
                        <thead>
                            <tr>
                                <td></td>
                                <td>订单号</td>
                                <td>商品类型</td>
                                <td>交易金额</td>
                                <td>姓名</td>
                                <td>手机号</td>                                
                                <td>交易时间</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
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
                                
                            </tr>
                            <tr>
                                <td>1</td>
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
                                
                            </tr>
                            <tr>
                                <td>1</td>
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
                                
                            </tr>
                            <tr>
                                <td>1</td>
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
                                
                            </tr>
                            <tr>
                                <td>1</td>
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
                                
                            </tr>
                            <tr>
                                <td>1</td>
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
                                
                            </tr>
                            <tr>
                                <td>2</td>
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
                                
                            </tr>

                            <tr>
                                <td>4</td>
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
                                
                            </tr>
                            <tr>
                                <td>4</td>
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
                                
                            </tr>
                            <tr>
                                <td>4</td>
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
                                
                            </tr>
                            <tr>
                                <td>4</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                
                            </tr>
                        </tbody>  
                    </table>                          
                    <div className="bothpages-footer">
                        <div className="bothpages-footer-btn">
                                <span>首页</span>
                                <span>上一页</span>
                                <span>下一页</span>
                                <span>尾页</span>
                        </div>
                        <div className="bothpages-footer-all">第<span>1</span>页/共<span>4</span>页</div>
                        <div className="bothpages-footer-both">每页<span>20</span>条，共<span>112</span>条</div>
                    </div>
                </Window> 
        );            
    };
}






