/**
 * 营业日报组件
 * @author ranchong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import '../RevokeData/RevokeData.css';
import './OperateIncome.css';

export default class extends Component {   
    constructor(props) {
        super(props);           
    }; 
    render() {
        return(<div>
            <Window title='营业日报' onClose={this.props.closeView}>  
                <div className="ope-inc-head">
                    <a>统计时间：2018-06-21 22：00：57 至2018-06-22 19：00：00</a>
                    <button className='e-btn'>打印</button>
                    <a>操作员：ranchong</a>
                </div>
                {/* 表格部分 欠费衣物信息*/}
                <table className='ui-table-base ManagerGathering-tab ope-inc-tab'>
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
            </Window>  

        </div>)
    }
}