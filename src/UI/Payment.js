/**
 * 支付弹窗组件
 * @author Edwin Young
 * @desc 加减框,
 */

import React, {Component} from 'react';
import Window from './Window';
import Select from './Select';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {gateway:null};
        this.handleGateway = this.handleGateway.bind(this);
    }

    handleGateway(e) {
        let gateway = e.target.dataset.gateway || e.target.parentNode.dataset.gateway;
        this.setState({gateway:gateway});
    }

    render() {
        return (
            <Window title='收银' width='632' height='532' onClose={this.props.onClose}>
                <div className='ui-payment-title'>核对信息</div>
                <div className='ui-payment-order'>
                    <div>
                        <div><span>不可折金额：</span>&yen;1000</div>
                        <div><span>原价：</span>&yen;1000</div>
                    </div>
                    <div>
                        <div><span>可折金额：</span>&yen;1000</div>
                        <div><span>折后价：</span>&yen;1000</div>
                    </div>
                    <div>
                        <div><span>折扣率：</span>&yen;1000</div>
                    </div>
                </div>
                <div className='ui-payment-title2'>活动优惠</div>
                <div className='ui-payment-reduce'>
                    <div><span>优惠：</span><Select option={['测试', '测试2']}/></div>
                    <div>
                        <span>使用代金券：</span>
                        <input type='text' className='e-input'/>
                        &nbsp;&nbsp;
                        <button type='button'>使用</button>
                    </div>
                </div>
                <div className='ui-payment-title2'>收款方式</div>
                <div className='ui-payment-pay'>
                    <div className='ui-payment-gateway'>
                        <div className={'e-fieldset' + (0 == this.state.gateway ? ' checked' : '')} data-gateway='0' onClick={this.handleGateway}>
                            <img src='img/e-icon-vip.png'/>&nbsp;&nbsp;会员卡
                        </div>
                        <div className={'e-fieldset' + (1 == this.state.gateway ? ' checked' : '')} data-gateway='1' onClick={this.handleGateway}>
                            <img src='img/e-icon-cash.png'/>&nbsp;&nbsp;现金
                        </div>
                        <div className={'e-fieldset' + (2 == this.state.gateway ? ' checked' : '')} data-gateway='2' onClick={this.handleGateway}>
                            <img src='img/e-icon-wechat.png'/>&nbsp;&nbsp;微信
                        </div>
                        <div className={'e-fieldset' + (3 == this.state.gateway ? ' checked' : '')} data-gateway='3' onClick={this.handleGateway}>
                            <img src='img/e-icon-ali.png'/>&nbsp;&nbsp;支付宝
                        </div>
                    </div>
                    <div className='ui-payment-pay-handle' style={{display:(0 == this.state.gateway ? 'block' : 'none')}}>
                        <div style={{marginBottom:'8px'}}>请扫描或输入会员卡号</div>
                        <input type='input' className='e-input'/>&nbsp;
                        <button type='button'>查询</button>&nbsp;
                        <button type='button'>读卡</button>
                    </div>
                    <div className='ui-payment-pay-handle' style={{display:(1 == this.state.gateway ? 'block' : 'none')}}>
                        <div style={{height:'100%',lineHeight:'54px',fontSize:'14px',fontWeight:'bold'}}>
                            实收金额：<input type='input' className='e-input'/>&nbsp;&nbsp;元
                        </div>
                    </div>
                    <div className='ui-payment-pay-handle' style={{display:(2 == this.state.gateway || 3 == this.state.gateway ? 'block' : 'none')}}>
                    
                    </div>
                    <div className='ui-payment-amount'>
                        <div>应收：<span>&yen;500</span></div>
                        <div>找零：<span>&yen;500</span></div>
                        <div>欠费：<span>&yen;500</span></div>
                    </div>
                </div>
            </Window>
        );
    }
}