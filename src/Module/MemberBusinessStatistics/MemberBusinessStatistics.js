/**
 * 会员业务统计
 * @author ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import './MemberBusinessStatistics.css';
import { Table } from '../../UI/Table';

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
            <Window title='会员业务统计'  onClose={this.props.closeView}>    
                <div className="mem_bus_sta_top">
                    <div className='mem_bus_sta_top_one'>
                        <div>&emsp;开始时间：<input type="date" className='ui-date' value = {this.state.startdate} onChange={e => this.setState({startdate:e.target.value})}/></div>                           
                        <div>&emsp;结束时间：<input type="date" className='ui-date' value = {this.state.enddate} onChange={e => this.setState({enddate:e.target.value})}/></div>
                            <button className='e-btn'>清空</button>
                         </div>
                    <div className='mem_bus_sta_top_two'>
                        <div>&emsp;&emsp;&emsp;姓名：<input type="text" /></div>                           
                        <div>&emsp;&emsp;&emsp;手机：<input type="text" /></div>
                        <div>&emsp;&emsp;&emsp;卡号：<input type="text" /></div>
                        <button className='e-btn'>查询</button>
                    </div>
                </div>
                <p>财务合计</p>
                <table className='ui-table-base auto-width' >
                        <thead>
                            <tr>
                                <td>合计</td>
                                <td>发卡</td>
                                <td>充值</td>
                                <td>刷卡</td>
                                <td>刷卡补交</td>
                                <td>退卡</td>
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
                            </tr>
                        </tbody>
                    </table>
                    <p>消费明细</p>
                <table id='mem_bus_sta_table_two' className='ui-table-base'>
                        <thead>
                            <tr>
                                <td>卡编号</td>
                                <td>卡号</td>
                                <td>发卡店</td>
                                <td>客户电话</td>
                                <td>店员姓名</td>
                                <td>金额</td>
                                <td>类别</td>
                                <td>日期</td>
                                <td>时间</td>
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
                                <td>11</td>
                                <td></td>
                                <td>11</td>
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
                                <td>11</td>
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
                                <td>11</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>11</td>
                                <td></td>
                                <td>11</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>11</td>
                                <td></td>
                                <td>11</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>11</td>
                                <td></td>
                                <td>11</td>
                            </tr>
                        <tr>
                            <td>1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>11</td>
                            <td></td>
                            <td>11</td>
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
                            <td>11</td>
                        </tr>
                       
                        </tbody>
                    </table>
                         
            </Window>
        );
    }
}   