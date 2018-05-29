/**
 * 未付款统计界面组件
 * @author ranchong
 */
import React, { Component } from 'react';
import './UnpaidStatistics.css';
import Window from '../../UI/Window';
export default class extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            
            <Window title='未付款统计' onClose={this.props.closeView}>
                <div className="unpaidstatistics_data">
                    <div className="unpaidstatistics_dataLeft">
                        <div>开始日期：<input type="date" value='2018-05-19' /></div>
                        <div>结束日期：<input type="date" value='2018-06-19' /></div>
                    </div>
                    <div className="unpaidstatistics_dataright">
                        <button type='button' className='e-btn '>查询</button>
                        <button type='button' className='e-btn '>打印</button>
                        <button type='button' className='e-btn ' onClick={this.props.closeView}>退出</button>
                    </div>
                </div>
                <div className="unpaidstatistics_Statistics">
                    <span>  总衣物：<a>**件</a></span>
                    <span>  可折金额：<a>**元</a></span>
                    <span>  不可折金额：<a>**元</a></span>
                </div>
                {/* 表格部分 欠费信息*/}
                <span className='unpaidstatistics_title'>欠费信息</span>
                <div className='unpaidstatistics_table_part'>
                    <table className='unpaidstatistics_table_Arrearage'>
                        <thead>
                            <tr>
                                <td></td>
                                <td>店员姓名</td>
                                <td>流水号</td>
                                <td>衣物件数</td>
                                <td>可折额</td>
                                <td>不可折额</td>
                                <td>客户电话</td>
                                <td>客户姓名</td>
                                <td>日期</td>
                                <td>时间</td>
                                <td>地点</td>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>时间</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>时间</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>时间</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td></td>
                            </tr>
                        </tbody>

                    </table>

                </div>
                
                {/* 表格部分 欠费衣物信息*/}
                <span className='unpaidstatistics_title'>欠费信息<a className='span-a-one'>共有记录</a><a className='span-a-two'>245</a><a>条</a></span>
                <div className='unpaidstatistics_table_part'>
                    <table className='unpaidstatistics_table_Arrearage'>
                        <thead>
                            <tr>
                                <td></td>
                                <td>店员姓名</td>
                                <td>客户电话</td>
                                <td>流水号</td>
                                <td>水洗条码号</td>
                                <td>衣物编码</td>
                                <td>衣物名称</td>
                                <td>衣物颜色</td>
                                <td>衣物网格</td>
                                <td>衣物处理</td>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                                <td>uwuwuwu</td>
                            </tr>
                        </tbody>

                    </table>

                </div>
            </Window>
        );
    }
}