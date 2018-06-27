/**
 * 交班界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import './Succession.css'

export default class extends Component {   
    constructor(props) {
        super(props);
                   
    }; 
    render() {
        return (
            <Window title='交班' onClose={this.props.closeView}>
                <div className="ope-inc-head">
                    <a>统计时间：2018-06-21 22：00：57 至2018-06-22 19：00：00</a>
                    <button className='e-btn'>交班</button>
                    <a>操作员：ranchong</a>
                </div>
                <table className='ui-table-base succession-tab'>
                    <thead>
                        <tr>
                            <td>统计类目</td>
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
                            <td>收衣</td>
                            <td>111</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>撤单</td>
                            <td>111</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>赔付</td>
                            <td>111</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>售卡</td>
                            <td>111</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>充值</td>
                            <td>111</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>退卡</td>
                            <td>111</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>扣款</td>
                            <td>111</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>合计</td>
                            <td>111</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>

                    </tbody>
                </table>  
            </Window>

       );
    }
}