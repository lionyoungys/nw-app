/**
 * 前台统计界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import '../../UI/bothpages.css';
import './ForegroundStatistics.css';

export default class extends Component {   
    constructor(props) {
        super(props);           
    }; 
    render() {
        return (             
            <Window title='前台统计' onClose={this.props.closeView}>   
                     <div className="tableC_title">
                        <div  className="tableC_title_right">
                            <div><input type="checkbox" />明细</div><button>打印</button><button>退出</button>
                        </div>
                      </div>
                      <div className="tableC_box">
                         <div className="tableC_box_div">
                           <span>财务合计</span>                           
                           <table className="ForegroundStatistics_thody">
                                <thead><tr><th></th><th>合计</th><th>现金</th><th>欠费额</th></tr></thead>
                                <tbody >
                                    <tr>
                                        <td>1</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>                           
                         </div>
                         <div className="tableC_box_div ">
                           <span>衣物合计</span>                          
                                <table className="ForegroundStatistics_thody">
                                    <thead><tr><th></th><th>合计</th><th>合计</th><th>合计</th><th>合计</th><th>合计</th><th>合计</th><th>裙子</th><th>外套</th><th>小件</th><th>小件</th><th>小件</th><th>小件</th><th>小件</th><th>小件</th><th>小件</th><th>小件</th></tr></thead>
                                    <tbody >
                                        <tr>
                                            <td>1</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>1</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>1</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                        </tr>
                                    </tbody>
                                </table>                            
                         </div>

                        <div className="tableC_box_div ">
                           <span>衣物合计<b>共记录 <a>456</a> 条</b></span>                          
                                <table className="ForegroundStatistics_thody">
                                    <thead><tr><th></th><th>合计</th><th>合计</th><th>合计</th><th>合计</th><th>合计</th><th>合计</th><th>裙子</th><th>外套</th><th>小件</th><th>小件</th><th>小件</th><th>小件</th><th>小件</th><th>小件</th><th>小件</th><th>小件</th></tr></thead>
                                    <tbody >
                                        <tr>
                                            <td>1</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>1</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>1</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>1</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>1</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                        </tr>
                                    </tbody>
                                </table>                            
                         </div>
                      </div>
                      
             </Window> 
        );
    }
}