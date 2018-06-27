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
        this.onclose = this.onclose.bind(this);
    };
    onclose (){
        this.setState({show:false})
    }
    render() {
        return (

            <Window title='经理收款' onClose={this.props.closeView} height='494'>
               <div className="man-head">
                    <a>收款情况</a>   
                    <a>统计时间：2018-06-21 22：00：57 至2018-06-22 19：00：00</a>                    
                </div>
                {/* 表格部分 欠费衣物信息*/}               
                <table className='ui-table-base ManagerGathering-tab'>
                    <thead>
                        <tr>
                            <td>收银类型</td>
                            <td>金额</td>
                            <td>实收金额</td>
                            <td>衣物数量</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>免费</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>免费退卡</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>刷卡</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>刷卡其他</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>刷卡补交</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>刷集团卡</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>刷集团卡其他</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>刷集团卡补交</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>手持机刷卡</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>手持机刷卡补交</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>未付款</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>未付款补交</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>现金</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>现金充值</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>现金其他</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>现金发卡</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>现金补交</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>现金退卡</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>赠券</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>赠券充值</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>赠券其他</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>赠券发卡</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>赠券补交</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>赠券退卡</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td onClick={e => this.setState({ show: true })}>合计</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div className="manager_gathering_bottom">
                    <div className="manager_gathering_part three_part">
                        <div className="manager_gathering_part_row">
                            上次余额：<input type="text" /> &emsp;&emsp;本次收现金：<input type="text" /> &emsp;&emsp;&emsp;&emsp;总现金：<input type="text" />
                        </div>
                        <div className="manager_gathering_part_row">
                            上次上缴：<input type="text" /> &emsp;&emsp;&emsp;本次余额：<input type="text" /> &emsp;现金是否一致：<input type="text" />
                        </div>
                        <div className="manager_gathering_part_row text_area_row">
                            <a>经营情况说明：</a><textarea></textarea>
                        </div>
                    </div>
                    <div className='manager_gathering_part_btn'>
                        <button type='button' className='e-btn '>查看明细</button>
                        <button type='button' className='e-btn '>开钱箱</button>
                        <button type='button' className='e-btn '>交款</button>
                    </div>
                </div>
                {
                    this.state.show
                    &&
                    <Mmanagergatheringdetail  onClick = {this.onclose}/>
                }
            </Window>

        );
    }
}