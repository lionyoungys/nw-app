/**
 * 挂失 补换卡
 * @author ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import './LossReissueChangeCard.css';
import LossReport from './LossReport';//挂失
import ChangeCard from './ChangeCard';//换卡
import ReissueCard from './ReissueCard';//补卡
import RemoveLossCard from './RemoveLossCard';//解除挂失


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            clickNum:-1,
        }
        
        this.onclose = this.onclose.bind(this);
        this.views = [<ReissueCard onClose={this.onclose} />, <ChangeCard onClose={this.onclose} />, <RemoveLossCard onClose={this.onclose} />, <LossReport onClose={this.onclose}/>] 
    }
    onclose() {

        this.setState({ clickNum: null });
    }
    render() {
        return (
            <Window title='挂失、补换卡' onClose={this.props.closeView}>
                <div className="change_card_date">
                    <div className="change_card_date_left">
                        <div>卡号：<input type="text"/></div>
                        <div>姓名：<input type="text"/></div>
                        <div>手机号：<input type="text"/></div>
                    </div>
                    <button type='button' className='e-btn ' onClick={this.query}>查询</button>
                </div>
                <div className='bothpages-place'>
                    <div className='bothpages-block-center'>
                        <img src='./img/no_data_place.png' />
                        <p>没有找到符合条件的数据</p>
                    </div>
                </div>
                <table className='ui-table-base lrc-card-tab'>
                    <thead>
                        <tr> 
                            <td>发卡店</td>
                            <td>卡号</td>
                            <td>姓名</td>
                            <td>手机号</td>
                            <td>卡类型</td>
                            <td>金额</td>
                            <td>挂失状态</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox"/>345876543876555</td>
                            <td >111</td>
                            <td>222</td>
                            <td>支出</td>
                            <td>0</td>
                            <td>0</td>
                            <td>2018</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" />345876543876555</td>
                            <td >111</td>
                            <td>222</td>
                            <td>支出</td>
                            <td>0</td>
                            <td>0</td>
                            <td>2018</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" />345876543876555</td>
                            <td >111</td>
                            <td>222</td>
                            <td>支出</td>
                            <td>0</td>
                            <td>0</td>
                            <td>2018</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" />345876543876555</td>
                            <td >111</td>
                            <td>222</td>
                            <td>支出</td>
                            <td>0</td>
                            <td>0</td>
                            <td>2018</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" />345876543876555</td>
                            <td >111</td>
                            <td>222</td>
                            <td>支出</td>
                            <td>0</td>
                            <td>0</td>
                            <td>2018</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" />345876543876555</td>
                            <td >111</td>
                            <td>222</td>
                            <td>支出</td>
                            <td>0</td>
                            <td>0</td>
                            <td>2018</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" />345876543876555</td>
                            <td >111</td>
                            <td>222</td>
                            <td>支出</td>
                            <td>0</td>
                            <td>0</td>
                            <td>2018</td>
                        </tr>
                    </tbody>
                </table>
                <div className='bothpages-btn-part'>
                    
                    <button type='button' className='e-btn' onClick={() => this.setState({clickNum: 3 })}>挂失</button>
                    <button type='button' className='e-btn' onClick={() => this.setState({clickNum: 2 })}>解除挂失</button>
                    <button type='button' className='e-btn' onClick={() => this.setState({clickNum: 1 })}>换卡</button>
                    <button type='button' className='e-btn' onClick={() => this.setState({clickNum: 0 })}>补卡</button>
                </div>
                {null !==this.state.clickNum && this.views[this.state.clickNum]}
                
            </Window>
        );
    }
}