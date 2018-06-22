/**
 * 支付弹窗组件
 * @author Edwin Young
 * @desc 
 */

import React, {Component} from 'react';
import Window from './Window';
import Select from './Select';

const style = {marginBottom:'8px', fontSize:'12px'};
/**
 * 订单支付弹窗
 * @param {object} data {total_amount:原价,dis_amount:可折金额,amount:不可折金额,discount:折扣率,pay_amount:折后价}
 * @param {function} callback 回调方法 回调参数:{gateway:gateway,amount:amount,[authcode:authcode]}
 */
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {gateway:0,authCode:['','','',''], amount:'', number:'',coupon:'', option:[]};
        this.input = [];
        this.handleGateway = this.handleGateway.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setAuthCode = this.setAuthCode.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.M1Read = this.M1Read.bind(this);
    }

    componentDidMount() {
        this.input[3].onkeydown = ( e => {'Enter' === e.code && this.onConfirm()} )
    }

    handleGateway(e) {
        let gateway = e.target.dataset.gateway || e.target.parentNode.dataset.gateway;
        this.setState({gateway:gateway});
    }

    handleChange(e) {
        let value = e.target.value;
        if (!isNaN(value)) {
            this.setState({amount:value});
        }
    }

    M1Read() {
        let card = M1Reader.get();
        if (card.error) return tool.ui.error({msg:'读卡失败',callback:close => close()});
        if (card.empty) return tool.ui.error({msg:'卡片数据为空',callback:close => close()});
        'function' === typeof this.props.M1Read && this.props.M1Read(card);
    }
    setAuthCode(e) {
        let value = e.target.value,
            index = Number(e.target.dataset.index),
            len = value.length;
        (3 !== index && 4 === len) && this.input[index + 1].focus();
        if (( 3 !== index && 4 >= len ) || ( 3 === index && 6 >= len )) {
            this.state.authCode[index] = value
            this.setState({authCode:this.state.authCode});
        }
    }

    onConfirm() {
        if ('function' !== typeof this.props.callback) return;
        let authCode = this.state.authCode
        ,   obj = {gateway:this.state.gateway,amount:this.state.amount};
        if (0 == obj.gateway) {
            if (!this.props.number && !this.props.cid) return;
            obj.number = this.props.number || '';
            obj.cid = this.props.cid || '';
        } else if (1 == obj.gateway) {
            if ('' == obj.amount || obj.amount <= 0) return;
        } else {
            if (
                4 === authCode[0].length && !isNaN(authCode[0])
                &&
                4 === authCode[1].length && !isNaN(authCode[1])
                &&
                4 === authCode[2].length && !isNaN(authCode[1])
                &&
                6 === authCode[3].length && !isNaN(authCode[1])
            ) {
                obj.authcode = (authCode[0] + authCode[1] + authCode[2] + authCode[3]);
            } else {
                return;
            }
        }
        this.props.callback(obj);
    }

    render() {
        let data = this.props.data || {}
        ,   authCode = this.state.authCode
        ,   gateway = this.state.gateway
        ,   change = '' == this.state.amount ? 0 : this.state.amount.subtract(data.total_amount);
        return (
            <Window title='收银' width='632' height='532' onClose={this.props.onClose}>
                <div className='ui-payment-title'>核对信息</div>
                <div className='ui-payment-order'>
                    <div>
                        <div><span>不可折金额：</span>&yen;{data.amount}</div>
                        <div><span>原价：</span>&yen;{data.total_amount}</div>
                    </div>
                    <div>
                        <div><span>可折金额：</span>&yen;{data.dis_amount}</div>
                        <div><span>折后价：</span>&yen;{data.pay_amount}</div>
                    </div>
                    <div>
                        <div><span>折扣率：</span>{data.discount || 100}%</div>
                    </div>
                </div>
                <div className='ui-payment-title2'>活动优惠</div>
                <div className='ui-payment-reduce'>
                    <div><span>优惠：</span><Select option={this.state.option}/></div>
                    <div>
                        <span>使用代金券：</span>
                        <input type='text' className='e-input' value={this.state.coupon} onChange={e => this.setState({coupon:e.target.value})}/>
                        &nbsp;&nbsp;
                        <button type='button' className='e-btn'>使用</button>
                    </div>
                </div>
                <div className='ui-payment-title2'>收款方式</div>
                <div className='ui-payment-pay'>
                    <div className='ui-payment-gateway'>
                        <div className={'e-fieldset' + (0 == gateway ? ' checked' : '')} data-gateway='0' onClick={this.handleGateway}>
                            <img src='img/e-icon-vip.png'/>&nbsp;&nbsp;会员卡
                        </div>
                        <div className={'e-fieldset' + (1 == gateway ? ' checked' : '')} data-gateway='1' onClick={this.handleGateway}>
                            <img src='img/e-icon-cash.png'/>&nbsp;&nbsp;现金
                        </div>
                        <div className={'e-fieldset' + (2 == gateway ? ' checked' : '')} data-gateway='2' onClick={this.handleGateway}>
                            <img src='img/e-icon-wechat.png'/>&nbsp;&nbsp;微信
                        </div>
                        <div className={'e-fieldset' + (3 == gateway ? ' checked' : '')} data-gateway='3' onClick={this.handleGateway}>
                            <img src='img/e-icon-ali.png'/>&nbsp;&nbsp;支付宝
                        </div>
                    </div>
                    <div className='ui-payment-handle' style={{display:(0 == gateway ? 'block' : 'none')}}>
                        <div style={style}>请扫描或输入会员卡号</div>
                        <input type='input' className='e-input' value={this.state.number} onChange={e => this.setState({number:e.target.value})}/>&nbsp;
                        <button type='button' className='e-btn'>查询</button>&nbsp;
                        <button type='button' className='e-btn' onClick={this.M1Read}>读卡</button>
                    </div>
                    <div className='ui-payment-handle' style={{display:(1 == gateway ? 'block' : 'none')}}>
                        <div className='ui-payment-cash'>
                            实收金额：<input type='input' className='e-input' value={this.state.amount} onChange={this.handleChange}/>&nbsp;&nbsp;元
                        </div>
                    </div>
                    <div className='ui-payment-handle ui-payment-wechat' style={{display:(2 == gateway || 3 == gateway ? 'block' : 'none')}}>
                        <div style={style}>请扫描或输入{2 == gateway ? '微信' : '支付宝'}付款码</div>
                        <input type='text' className='e-input' value={authCode[0]} onChange={this.setAuthCode} data-index='0' ref={input => this.input[0] = input}/>
                        <input type='text' className='e-input' value={authCode[1]} onChange={this.setAuthCode} data-index='1' ref={input => this.input[1] = input}/>
                        <input type='text' className='e-input' value={authCode[2]} onChange={this.setAuthCode} data-index='2' ref={input => this.input[2] = input}/>
                        <input type='text' className='e-input' value={authCode[3]} onChange={this.setAuthCode} data-index='3' ref={input => this.input[3] = input}/>
                    </div>
                    <div className='ui-payment-amount'>
                        <div>应收：<span>&yen;{data.total_amount}</span></div>
                        <div>找零：<span>&yen;{change}</span></div>
                        <div>欠费：<span>&yen;{change > 0 ? 0 : (change * -1)}</span></div>
                    </div>
                </div>
                <div className='ui-payment-confirm'>
                    <button type='button' className='e-btn'>立即收款</button>
                </div>
            </Window>
        );
    }
}

/**
 * 售卡或充值支付弹窗
 * @param {object} data {type:卡类型,discount:折扣率,recharge:充值金额,balance:原金额,give:赠送金额,amount:收费}
 * @param {function} callback 回调方法 回调参数:{gateway:gateway,amount:amount,[authcode:authcode]}
 */
export class Recharge extends Component {
    constructor(props) {
        super(props);
        this.state = {gateway:1,authCode:['','','',''], amount:''};
        this.input = [];
        this.handleGateway = this.handleGateway.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setAuthCode = this.setAuthCode.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    componentDidMount() {
        this.input[3].onkeydown = ( e => {'Enter' === e.code && this.onConfirm()} )
    }

    handleGateway(e) {
        let gateway = e.target.dataset.gateway || e.target.parentNode.dataset.gateway;
        this.setState({gateway:gateway});
    }
    handleChange(e) {
        let value = e.target.value;
        if (!isNaN(value)) {
            this.setState({amount:value});
        }
    }

    setAuthCode(e) {
        let value = e.target.value,
            index = Number(e.target.dataset.index),
            len = value.length;
        (3 !== index && 4 === len) && this.input[index + 1].focus();
        if (( 3 !== index && 4 >= len ) || ( 3 === index && 6 >= len )) {
            this.state.authCode[index] = value
            this.setState({authCode:this.state.authCode});
        }
    }

    onConfirm() {
        if ('function' !== typeof this.props.callback) return;
        let authCode = this.state.authCode
        ,   obj = {gateway:this.state.gateway,amount:this.state.amount};
        if (1 == obj.gateway) {
            if ('' == obj.amount || obj.amount <= 0) return;
        } else {
            if (
                4 === authCode[0].length && !isNaN(authCode[0])
                &&
                4 === authCode[1].length && !isNaN(authCode[1])
                &&
                4 === authCode[2].length && !isNaN(authCode[1])
                &&
                6 === authCode[3].length && !isNaN(authCode[1])
            ) {
                obj.authcode = (authCode[0] + authCode[1] + authCode[2] + authCode[3]);
            } else {
                return;
            }
        }
        this.props.callback(obj);
    }

    render() {
        let data = this.props.data || {}
        ,   recharge = data.recharge || 0
        ,   give = data.give || 0
        ,   balance = data.balance || 0
        ,   amount = data.amount || 0
        ,   authCode = this.state.authCode
        ,   gateway = this.state.gateway;
        return (
            <Window title='收银' width='632' height='430' onClose={this.props.onClose}>
                <div className='ui-payment-title'>核对信息</div>
                <div className='ui-payment-order'>
                    <div>
                        <div><span>卡类型：</span>{data.type}</div>
                        <div><span>折扣率：</span>{data.discount || '100'}%</div>
                    </div>
                    <div>
                        <div><span>充值金额：</span>&yen;&nbsp;{recharge}</div>
                        <div><span>原金额：</span>&yen;&nbsp;{balance}</div>
                    </div>
                    <div>
                        <div><span>赠送金额：</span>&yen;&nbsp;{give}</div>
                        <div><span>充后余额：</span>&yen;&nbsp;{balance.add(recharge, give)}</div>
                    </div>
                </div>
                <div className='ui-payment-title2'>收款方式</div>
                <div className='ui-payment-pay'>
                    <div className='ui-payment-gateway'>
                        <div className={'e-fieldset' + (1 == gateway ? ' checked' : '')} data-gateway='1' onClick={this.handleGateway}>
                            <img src='img/e-icon-cash.png'/>&nbsp;&nbsp;现金
                        </div>
                        <div className={'e-fieldset' + (2 == gateway ? ' checked' : '')} data-gateway='2' onClick={this.handleGateway}>
                            <img src='img/e-icon-wechat.png'/>&nbsp;&nbsp;微信
                        </div>
                        <div className={'e-fieldset' + (3 == gateway ? ' checked' : '')} data-gateway='3' onClick={this.handleGateway}>
                            <img src='img/e-icon-ali.png'/>&nbsp;&nbsp;支付宝
                        </div>
                    </div>
                    <div className='ui-payment-handle' style={{display:(1 == gateway ? 'block' : 'none')}}>
                        <div className='ui-payment-cash'>
                            实收金额：<input type='input' className='e-input' value={this.state.amount} onChange={this.handleChange}/>&nbsp;&nbsp;元
                        </div>
                    </div>
                    <div className='ui-payment-handle ui-payment-wechat' style={{display:(2 == gateway || 3 == gateway ? 'block' : 'none')}}>
                        <div style={style}>请扫描或输入{2 == gateway ? '微信' : '支付宝'}付款码</div>
                        <input type='text' className='e-input' value={authCode[0]} onChange={this.setAuthCode} data-index='0' ref={input => this.input[0] = input}/>
                        <input type='text' className='e-input' value={authCode[1]} onChange={this.setAuthCode} data-index='1' ref={input => this.input[1] = input}/>
                        <input type='text' className='e-input' value={authCode[2]} onChange={this.setAuthCode} data-index='2' ref={input => this.input[2] = input}/>
                        <input type='text' className='e-input' value={authCode[3]} onChange={this.setAuthCode} data-index='3' ref={input => this.input[3] = input}/>
                    </div>
                    <div className='ui-payment-amount' style={{paddingRight:'238px'}}>
                        <div>应收：<span>&yen;{amount}</span></div>
                        <div>找零：<span>&yen;{'' == this.state.amount ? 0 : this.state.amount.subtract(amount)}</span></div>
                    </div>
                </div>
                <div className='ui-payment-confirm'>
                    <button type='button' className='e-btn' onClick={this.onConfirm}>立即收款</button>
                </div>
            </Window>
        );
    }
}