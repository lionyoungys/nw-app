/**
 * 经理收款
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import './ManagerGathering.css';

export default class extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (

            <Window title='经理收款' onClose={this.props.closeView}>
                <div className="manager_gathering_part one_part">

                    <div className="manager_gathering_part_row">
                        &emsp;&emsp;营业额：<input type="text" /> &emsp;&emsp;&emsp;欠缴金额：<input type="text" /> &emsp;&emsp;&emsp;折前金额：<input type="text" /> &emsp;&emsp;&emsp;总计现金：<input type="text" />
                    </div>
                    <div className="manager_gathering_part_row">
                        &emsp;总计刷卡：<input type="text" /> &emsp;&emsp;&emsp;总计收券：<input type="text" /> &emsp;&emsp;总计银联卡：<input type="text" /> &emsp;&emsp;&emsp;收衣件数：<input type="text" />
                    </div>
                    <div className="manager_gathering_part_row">
                        &emsp;发衣件数：<input type="text" /> &emsp;&emsp;&emsp;附加服务：<input type="text" /> &emsp;&emsp;&emsp;&emsp;集团卡：<input type="text" />
                    </div>
                </div>

                <div className="manager_gathering_part two_part">

                    <div className="manager_gathering_part_row">
                        &emsp;现金消费：<input type="text" /> &emsp;&emsp;&emsp;数卡消费：<input type="text" /> &emsp;&emsp;&emsp;收券消费：<input type="text" /> &emsp;&emsp;银联卡消费：<input type="text" />
                    </div>
                    <div className="manager_gathering_part_row">
                        &emsp;售卡面额：<input type="text" /> &emsp;&emsp;&emsp;售卡金额：<input type="text" /> &emsp;&emsp;&emsp;充值面额：<input type="text" /> &emsp;&emsp;&emsp;充值金额：<input type="text" />
                    </div>
                    <div className="manager_gathering_part_row">
                        &emsp;现金退款：<input type="text" /> &emsp;&emsp;&emsp;刷卡退款：<input type="text" /> &emsp;&emsp;&emsp;收券退款：<input type="text" /> &emsp;&emsp;&emsp;退卡金额：<input type="text" />
                    </div>
                    <div className="manager_gathering_part_row">
                        &emsp;现金补交：<input type="text" /> &emsp;&emsp;&emsp;刷卡补交：<input type="text" /> &emsp;&emsp;&emsp;收券补交：<input type="text" /> &emsp;&emsp;银联卡补交：<input type="text" />
                    </div>
                    <div className="manager_gathering_part_row">
                        &emsp;微信消费：<input type="text" /> &emsp;&emsp;&emsp;&emsp;支付宝：<input type="text" /> &emsp;&emsp;&emsp;&emsp;优惠券：<input type="text" />
                    </div>
                </div>

                {/* 表格部分 欠费衣物信息*/}
                
                <div className='unpaidstatistics_table_part table_div'>
                    <table className='unpaidstatistics_table_Arrearage table_part'>
                        <thead>
                            <tr>
                                <td></td>
                                <td>流水号</td>
                                <td>店员姓名</td>
                                <td>衣物件数</td>
                                <td>金额</td>
                                <td>实收金额</td>
                                <td>折扣率</td>
                                <td>收银类型</td>
                                <td>客户电话</td>
                                <td>客户姓名</td>
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
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>

                    </table>

                </div>

                <div className="manager_gathering_part three_part">

                    <div className="manager_gathering_part_row">
                        上次余额：<input type="text" /> &emsp;&emsp;本次收现金：<input type="text" /> &emsp;&emsp;&emsp;&emsp;总现金：<input type="text" />
                    </div>
                    <div className="manager_gathering_part_row">
                        上次上缴：<input type="text" /> &emsp;&emsp;&emsp;本次余额：<input type="text" /> &emsp;&emsp;现金一直否：<input type="text" />
                    </div>
                    <div className="manager_gathering_part_row text_area_row">
                        经营情况说明：<textarea></textarea>
                    </div>
                </div>

                <div className='manager_gathering_part_btn'>
                    <button type='button' className='e-btn '>开钱箱</button>
                    <button type='button' className='manager_gathering_part_open_file_btn '></button>
                    <button type='button' className='e-btn '>交款</button>
                    <button type='button' className='e-btn '>退出</button>
                </div>

            </Window>
        );
    }
}