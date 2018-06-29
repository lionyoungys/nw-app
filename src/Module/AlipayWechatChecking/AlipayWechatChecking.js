/**
 * 支付宝 微信对账
 * @author ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Pages from '../../UI/Page';
import './AlipayWechatChecking.css';
export default class extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Window title='支付宝、微信对账' onClose={this.props.closeView}>
                <div className="ali-wechat-check-head">
                    <p>温馨提示：微信、支付宝收款结算周期为T+7，平台将通过银行打款结算至<a>建设银行</a><b>622******2828383</b>账户，每个账期内余额借款最低1000元起，不满1000元将累计至下一个账期结算。</p>
                    <p>余额：¥12345</p>
                </div>
                <div className="ali-wechat-check-title">
                    <a>余额明细</a>
                    <span>
                        <a><b>*</b>开始时间：</a>
                        <input type='date' className='ui-date'/>
                    </span>
                    <span>
                        <a><b>*</b>结束时间：</a>
                        <input type='date' className='ui-date' />
                    </span>
                    <button type='button' className='e-btn'>查询</button>
                </div>
                <table className='ui-table-base ali-wechat-check-tab'>
                    <thead>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>交易单号</td>
                            <td className='ali-wechat-check-tab-2'>备注</td>
                            <td className='ali-wechat-check-tab-3'>类型</td>
                            <td className='ali-wechat-check-tab-4'>金额</td>
                            <td className='ali-wechat-check-tab-5'>余额</td>
                            <td className='ali-wechat-check-tab-6'>交易时间</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>

                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>

                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>345876543876555</td>
                            <td className='ali-wechat-check-tab-2'>质量不合格</td>
                            <td className='ali-wechat-check-tab-3'>退款</td>
                            <td className='ali-wechat-check-tab-4'>支出</td>
                            <td className='ali-wechat-check-tab-5'>0</td>
                            <td className='ali-wechat-check-tab-6'>2018-10-26 12：00：00</td>
                        </tr>

                    </tbody>
                </table>
                <Pages />
            </Window>
        );
    }
}