/**
 * 经理收款
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Mmanagergatheringdetail from './Mmanagergatheringdetail';
import './ManagerGathering.css';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            startdate:tool.date('Y-m-01'),
            enddate:tool.date('Y-m-d'),
        }
    };
    render() {
        return (

            <Window title='经理收款' onClose={this.props.closeView} height='494'>
               <div className="Succession_data">
                         <div className="Succession_dataLeft">
                            <div>开始日期：<input type="date" value={this.state.startdate} onChange={e=>this.setState({startdate:e.target.value})}/></div>                           
                            <div>结束日期：<input type="date" value={this.state.enddate} onChange={e=>this.setState({enddate:e.target.value})}/></div>
                         </div>                         
                </div>
                {/* 表格部分 欠费衣物信息*/}               
                <div className='unpaidstatistics_table_part table_div ManagerGathering-div'>
                    <table className='unpaidstatistics_table_Arrearage table_part ManagerGathering-tab'>
                        <thead>
                            <tr>
                                <td >统计类目</td>
                                <td>会员卡</td>
                                <td>现金</td>
                                <td>微信</td>
                                <td>支付宝</td>
                                <td>欠款</td>
                                <td>充值卡</td>
                                <td>代金券</td>
                                <td>优惠</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td onClick = {e =>this.setState({show:true})}>收衣</td>
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
                                <td>撤单</td>
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
                                <td>赔付</td>
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
                                <td>售卡</td>
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
                                <td>充值</td>
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
                                <td>退卡</td>
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
                                <td>扣款</td>
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
                                <td>合计</td>
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
                       上次上缴：<input type="text" /> &emsp;&emsp;&emsp;本次余额：<input type="text" />   现金是否一致：<input type="text" />
                    </div>
                    <div className="manager_gathering_part_row text_area_row">
                        经营情况说明：<textarea></textarea>
                    </div>
                </div>
                <div className='manager_gathering_part_btn'>
                    <button type='button' className='e-btn '>查看明细</button>                 
                    <button type='button' className='e-btn '>开钱箱</button>
                    <button type='button' className='e-btn '>交款</button>
                </div>
                {
                    this.state.show
                    &&
                    <Mmanagergatheringdetail />
                }
            </Window>

        );
    }
}