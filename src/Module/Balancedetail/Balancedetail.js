/**
 * 欠款明细界面组件
 * @author ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Nodata from '../../UI/nodata';
import Balancedetail from './Balancedetail.css'; 
export default class extends Component {
    constructor(props) {        
        super(props);  
            this.state={
                start_time:tool.date('Y-m-d'),
                end_time:tool.date('Y-m-d'),
                nodatas:false,
            }      
        }
    render(){
        return (            
            <Window title='欠款明细' onClose={this.props.closeView}>
                <div className="unpaidstatistics_data">
                    <div className="unpaidstatistics_dataLeft">
                        <div>开始日期：<input type="date"  value = {this.state.start_time} onChange={e=>this.setState({startdate:e.target.value})}/></div>
                        <div>结束日期：<input type="date"  value = {this.state.end_time} onChange={e=>this.setState({enddate:e.target.value})}/></div>
                    </div>
                    <div className="unpaidstatistics_dataright">                        
                        <button type='button' className='e-btn ' onClick = {this.order}>查询</button>
                    </div>
                </div>
                <div className="unpaidstatistics_Statistics">
                    <span>  总衣物：<a>76457547547</a></span>
                    <span>  可折金额：<a>64364754元</a></span>
                    <span>  不可折金额：<a>43745754757元</a></span>
                </div>             
                <div className="ui-check-res">已为您找到<b>25484</b>条数据</div>
                <table className='ui-table-base balance-det-tab'>
                    <thead>
                        <tr>
                            <td>店员姓名</td>
                            <td>流水号</td>
                            <td>衣物件数</td>
                            <td>可折额</td>
                            <td>折扣率</td>
                            <td>不可折额</td>
                            <td>客户电话</td>
                            <td>客户姓名</td>
                            <td>日期</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>店员姓名</td>
                            <td>流水号</td>
                            <td>衣物件数</td>
                            <td>可折额</td>
                            <td>折扣率</td>
                            <td>不可折额</td>
                            <td>客户电话</td>
                            <td>客户姓名</td>
                            <td>日期</td>
                        </tr>
                        <tr>
                            <td>店员姓名</td>
                            <td>流水号</td>
                            <td>衣物件数</td>
                            <td>可折额</td>
                            <td>折扣率</td>
                            <td>不可折额</td>
                            <td>客户电话</td>
                            <td>客户姓名</td>
                            <td>日期</td>
                        </tr>
                        <tr>
                            <td>店员姓名</td>
                            <td>流水号</td>
                            <td>衣物件数</td>
                            <td>可折额</td>
                            <td>折扣率</td>
                            <td>不可折额</td>
                            <td>客户电话</td>
                            <td>客户姓名</td>
                            <td>日期</td>
                        </tr>
                        <tr>
                            <td>店员姓名</td>
                            <td>流水号</td>
                            <td>衣物件数</td>
                            <td>可折额</td>
                            <td>折扣率</td>
                            <td>不可折额</td>
                            <td>客户电话</td>
                            <td>客户姓名</td>
                            <td>日期</td>
                        </tr>
                        {this.state.nodatas&&<Nodata />}
                    </tbody>
                </table>              
            </Window>
        );
    }
}