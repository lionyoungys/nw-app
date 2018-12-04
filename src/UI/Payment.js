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
 * @param {object} data {total_amount:原价,dis_amount:可折金额,amount:不可折金额,discount:折扣率,pay_amount:折后价,special_pay_amount:特殊情况下支付额}
 * @param {function} M1Read 读卡方法 [回调参数:卡号]
 * @param {function} callback 回调方法 回调参数:{gateway:gateway,amount:amount,pay_amount:pay_amount,passwd:passwd,[authcode:authcode]}
 */
export default class extends Component {
    constructor(props) {
        super(props);
        let zero = ( 0 == parseFloat(this.props.data.total_amount || 0) );
        this.state = {
            zero: zero, 
            gateway: ( zero ? 1 : 999 ),
            authCode:['','','',''], 
            amount:'', 
            number:'',
            coupon:'', 
            passwd:'',
            option:[],
            show:false
        };
        this.input = [];
        this.waiting = false;
        this.handleGateway = this.handleGateway.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setAuthCode = this.setAuthCode.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.query = this.query.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentDidMount() {
        this.input[3].onkeydown = ( e => {'Enter' === e.code && this.onConfirm()} )
    }

    handleGateway(e) {
        let gateway = e.target.dataset.gateway || e.target.parentNode.dataset.gateway;
        this.setState({gateway:gateway});
        1 == gateway && EventApi.open_case();
    }

    query() {'' != this.state.number && 'function' === typeof this.props.M1Read && this.props.M1Read(this.state.number)}

    handleChange(e) {
        let value = e.target.value;
        !isNaN(value) && this.setState({amount:value});
    }

    setAuthCode(e) {
        let value = e.target.value,
            index = Number(e.target.dataset.index),
            len = value.length;
        (3 !== index && 4 === len) && this.input[index + 1].focus();
        if (( 3 !== index && 4 >= len ) || ( 3 === index && 6 >= len )) {
            this.state.authCode[index] = value;
            this.setState({authCode:this.state.authCode});
        }
    }
    onKeyPress(e){
        13 == (e.keyCode || e.which) && this.query();
    }
    handleClick() {
        if (0 == this.state.gateway || 999 == this.state.gateway) {    //会员卡支付
            this.setState({show:true});
        } else {
            this.onConfirm();
        }
    }

    onConfirm() {
        this.setState({show:false});
        if ('function' !== typeof this.props.callback || this.waiting) return;
        this.waiting = true;
        let authCode = this.state.authCode
        ,   obj = {gateway:this.state.gateway,amount:parseFloat(this.state.amount || 0), pay_amount:parseFloat(this.props.data.total_amount || 0), change:0};
        if (999 == obj.gateway) obj.gateway = 0;
        if (0 == obj.gateway) {    //会员卡支付
            obj.pay_amount = this.props.data.pay_amount;
            obj.passwd = this.state.passwd;
        } else if (1 == obj.gateway) {
            if (this.props.data.special_pay_amount) obj.pay_amount = parseFloat(this.props.data.special_pay_amount);
            if (obj.amount < 0 || obj.pay_amount > obj.amount) {
                this.waiting = false;
                return;
            }
            if (obj.amount != obj.pay_amount) obj.change = obj.amount.subtract(obj.pay_amount);
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
                this.waiting = false;
                return;
            }
        }
        this.props.callback(obj);
        this.waiting = false;
    }

    render() {
        let data = this.props.data || {}
        ,   authCode = this.state.authCode
        ,   gateway = this.state.gateway
        ,   discount = data.discount || 100
        ,   amount = 0 == gateway ? data.pay_amount : (data.special_pay_amount || data.total_amount);
        amount = ('function' === typeof this.props.calculate ? this.props.calculate(isNaN(amount) ? 0 : amount) : amount);
        var change = '' == this.state.amount || 1 != gateway ? 0 : this.state.amount.subtract(amount);
        if (0 != gateway && 999 != gateway) discount = 100;
        return (
            <Window title='收银' width='632' height='420' onClose={this.props.onClose}>
                <div className='ui-payment-title'>核对信息</div>
                <div className='ui-payment-order'>
                    <div>
                        <div><span>不可折金额：</span>&yen;{data.amount}</div>
                        <div><span>原价：</span>&yen;{data.total_amount}</div>
                    </div>
                    <div>
                        <div><span>可折金额：</span>&yen;{data.dis_amount}</div>
                        <div><span>折后价：</span>&yen;{
                            0 != gateway && 999 != gateway ? ('function' === typeof this.props.calculate ? this.props.calculate(data.total_amount) : data.total_amount) : data.pay_amount
                        }</div>
                    </div>
                    <div>
                        <div><span>折扣率：</span>{discount}%</div>
                        <div style={(0 == gateway || 999 == gateway) ? null : {display:'none'}}><span>卡余额：</span>&yen;{data.balance}</div>
                    </div>
                </div>
                {/* <div className='ui-payment-title2'>活动优惠</div>
                <div className='ui-payment-reduce'>
                    <div><span>优惠：</span><Select option={this.state.option}/></div>
                    <div>
                        <span>使用代金券：</span>
                        <input type='text' className='e-input' value={this.state.coupon} onChange={e => this.setState({coupon:e.target.value})}/>
                        &nbsp;&nbsp;
                        <button type='button' className='e-btn'>使用</button>
                    </div>
                </div> */}
                <div className='ui-payment-title2'>收款方式</div>
                <div className='ui-payment-pay'>
                    <div className='ui-payment-gateway'>
                        <div className={'e-fieldset' + (999 == gateway ? ' checked' : '')} style={this.state.zero ? {display:'none'} : null} data-gateway='999' onClick={this.handleGateway}>
                            <img src='img/e-icon-elec.png'/>&nbsp;&nbsp;电子卡
                        </div>
                        <div className={'e-fieldset' + (0 == gateway ? ' checked' : '')} style={this.state.zero ? {display:'none'} : null} data-gateway='0' onClick={this.handleGateway}>
                            <img src='img/e-icon-ic.png'/>&nbsp;&nbsp;IC卡
                        </div>
                        <div className={'e-fieldset' + (1 == gateway ? ' checked' : '')} data-gateway='1' onClick={this.handleGateway}>
                            <img src='img/e-icon-cash.png'/>&nbsp;&nbsp;现金
                        </div>
                        <div className={'e-fieldset' + (2 == gateway ? ' checked' : '')} style={this.state.zero ? {display:'none'} : null} data-gateway='2' onClick={this.handleGateway}>
                            <img src='img/e-icon-wechat.png'/>&nbsp;&nbsp;微信
                        </div>
                        <div className={'e-fieldset' + (3 == gateway ? ' checked' : '')} style={this.state.zero ? {display:'none'} : null} data-gateway='3' onClick={this.handleGateway}>
                            <img src='img/e-icon-ali.png'/>&nbsp;&nbsp;支付宝
                        </div>
                    </div>
                    <div className='ui-payment-handle' style={{display:(999 == gateway ? 'block' : 'none')}}>
                        <div style={data.type ? {display:'none'} : null}>
                            <div style={style}>请客户打开微信公众号【速洗达洗衣公众平台】出示付款码</div>
                            <input type='input' ref={input => {!this.state.show && 0 == gateway && tool.is_object(input) && input.focus()}} className='e-input' value={this.state.number} onChange={e => this.setState({number:e.target.value})} onKeyPress={this.onKeyPress}/>&nbsp;
                            <button type='button' className='e-btn' onClick={this.query}>查询</button>
                        </div>
                        <div style={data.type ? {border:'1px solid #9ec8ff',padding:'0 20px'} : {display:'none'}}>
                            <div style={{lineHeight:'40px'}}><span style={{display:'inline-block',width:'212px'}}><span style={{color:'#063781',fontWeight:'bold'}}>卡号：</span>{data.number}</span><span><span style={{color:'#063781',fontWeight:'bold'}}>卡类型：</span>{data.type}</span></div>
                            <div style={{lineHeight:'40px'}}><span style={{display:'inline-block',width:'212px'}}><span style={{color:'#063781',fontWeight:'bold'}}>余额：</span>{data.balance}</span><span><span style={{color:'#063781',fontWeight:'bold'}}>折扣率：</span>{discount}%</span></div>
                        </div>
                    </div>
                    <div className='ui-payment-handle' style={{display:(0 == gateway ? 'block' : 'none')}}>
                        <div style={data.type ? {display:'none'} : {textAlign:'center',height:'100%',lineHeight:'54px'}}>
                            <button type='button' className='e-btn' onClick={this.props.M1Read}>读卡</button>
                        </div>
                        <div style={data.type ? {border:'1px solid #9ec8ff',padding:'0 20px'} : {display:'none'}}>
                            <div style={{lineHeight:'40px'}}><span style={{display:'inline-block',width:'212px'}}><span style={{color:'#063781',fontWeight:'bold'}}>卡号：</span>{data.number}</span><span><span style={{color:'#063781',fontWeight:'bold'}}>卡类型：</span>{data.type}</span></div>
                            <div style={{lineHeight:'40px'}}><span style={{display:'inline-block',width:'212px'}}><span style={{color:'#063781',fontWeight:'bold'}}>余额：</span>{data.balance}</span><span><span style={{color:'#063781',fontWeight:'bold'}}>折扣率：</span>{discount}%</span></div>
                        </div>
                    </div>
                    <div className='ui-payment-handle' style={{display:(1 == gateway ? 'block' : 'none')}}>
                        <div className='ui-payment-cash'>
                            实收金额：<input type='input' ref={input => {!this.state.show && 1 == gateway && tool.is_object(input) && input.focus()}} className='e-input' value={this.state.amount} onChange={this.handleChange}/>&nbsp;&nbsp;元
                            &emsp;&emsp;&emsp;&emsp;找零：<span style={{color:'red'}}>&yen;{change}</span>
                        </div>
                    </div>
                    <div className='ui-payment-handle ui-payment-wechat' style={{display:(2 == gateway || 3 == gateway ? 'block' : 'none')}}>
                        <div style={style}>请扫描或输入{2 == gateway ? '微信' : '支付宝'}付款码</div>
                        <input 
                            type='text' 
                            className='e-input' 
                            value={authCode[0]} 
                            onChange={this.setAuthCode} 
                            data-index='0' 
                            ref={input => {
                                this.input[0] = input;
                                !this.state.show && (2 == gateway || 3 == gateway) && authCode[0].length < 4 && tool.is_object(input) && input.focus();
                            }}
                        />
                        <input type='text' className='e-input' value={authCode[1]} onChange={this.setAuthCode} data-index='1' ref={input => this.input[1] = input}/>
                        <input type='text' className='e-input' value={authCode[2]} onChange={this.setAuthCode} data-index='2' ref={input => this.input[2] = input}/>
                        <input type='text' className='e-input' value={authCode[3]} onChange={this.setAuthCode} data-index='3' ref={input => this.input[3] = input}/>
                    </div>
                    {/* <div className='ui-payment-amount'>
                        <div>应收：<span>&yen;{amount}</span></div>
                        <div>找零：<span>&yen;{change}</span></div>
                        <div>欠费：<span>&yen;{change > 0 ? 0 : (change * -1)}</span></div>
                    </div> */}
                </div>
                <div className='ui-payment-confirm'>
                    <button type='button' className='e-btn' onClick={this.handleClick}>立即收款</button>
                </div>
                {
                    this.state.show
                    &&
                    <Window title='请输入会员卡密码' width='260' height='100' onClose={() => this.setState({show:false})}>
                        <div style={{textAlign:'center',marginTop:'14px'}}>
                            <input type='password' className='e-input' value={this.state.passwd} onChange={e => this.setState({passwd:e.target.value})}/>
                            &nbsp;&nbsp;
                            <button type='button' className='e-btn' onClick={this.onConfirm}>确认</button>
                        </div>
                    </Window>
                }
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
        let zero = ( 0 == parseFloat(this.props.data.recharge || 0) );
        this.state = {zero:zero,gateway:1,authCode:['','','',''],amount:''};
        this.input = [];
        this.waiting = false;
        this.handleGateway = this.handleGateway.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setAuthCode = this.setAuthCode.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        //EventApi.open_case();
    }

    componentDidMount() {
        this.input[3].onkeydown = ( e => {'Enter' === e.code && this.onConfirm()} )
    }

    handleGateway(e) {
        let gateway = e.target.dataset.gateway || e.target.parentNode.dataset.gateway;
        this.setState({gateway:gateway});
        1 == gateway && EventApi.open_case();
    }
    handleChange(e) {
        let value = e.target.value;
        !isNaN(value) && this.setState({amount:value});
    }

    setAuthCode(e) {
        let value = e.target.value,
            index = Number(e.target.dataset.index),
            len = value.length;
        (3 !== index && 4 === len) && this.input[index + 1].focus();
        if (( 3 !== index && 4 >= len ) || ( 3 === index && 6 >= len )) {
            this.state.authCode[index] = value;
            this.setState({authCode:this.state.authCode});
        }
    }

    onConfirm() {
        if ('function' !== typeof this.props.callback || this.waiting) return;
        this.waiting = true;
        let authCode = this.state.authCode
        ,   obj = {gateway:this.state.gateway,amount:parseFloat(this.state.amount || 0)};
        if (1 == obj.gateway) {
            if (parseFloat(this.props.data.amount || 0) > obj.amount) {
                this.waiting = false;
                return;
            }
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
                this.waiting = false;
                return;
            }
        }
        this.props.callback(obj);
        this.waiting = false;
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
                        <div className={'e-fieldset' + (2 == gateway ? ' checked' : '')} style={this.state.zero ? {display:'none'} : null} data-gateway='2' onClick={this.handleGateway}>
                            <img src='img/e-icon-wechat.png'/>&nbsp;&nbsp;微信
                        </div>
                        <div className={'e-fieldset' + (3 == gateway ? ' checked' : '')} style={this.state.zero ? {display:'none'} : null} data-gateway='3' onClick={this.handleGateway}>
                            <img src='img/e-icon-ali.png'/>&nbsp;&nbsp;支付宝
                        </div>
                    </div>
                    <div className='ui-payment-handle' style={{display:(1 == gateway ? 'block' : 'none')}}>
                        <div className='ui-payment-cash'>
                            实收金额：<input type='input' ref={input => {1 == gateway && tool.is_object(input) && input.focus()}} className='e-input' value={this.state.amount} onChange={this.handleChange}/>&nbsp;&nbsp;元
                        </div>
                    </div>
                    <div className='ui-payment-handle ui-payment-wechat' style={{display:(2 == gateway || 3 == gateway ? 'block' : 'none')}}>
                        <div style={style}>请扫描或输入{2 == gateway ? '微信' : '支付宝'}付款码</div>
                        <input 
                            type='text' 
                            className='e-input' 
                            value={authCode[0]} 
                            onChange={this.setAuthCode} 
                            data-index='0' 
                            ref={input => {
                                this.input[0] = input;
                                (2 == gateway || 3 == gateway) && authCode[0].length < 4 && tool.is_object(input) && input.focus();
                            }}
                        />
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

/**
 * 补换卡支付弹窗
 * @param {object} data {type:卡类型,discount:折扣率,made_price:制卡费,amount:补换卡应收金额}
 * @param {function} callback 回调方法 回调参数:{gateway:gateway,amount:amount,[authcode:authcode]}
 */
export class UpdateCard extends Component {
    constructor(props) {
        super(props);
        this.state = {gateway:1,authCode:['','','',''], amount:''};
        this.input = [];
        this.waiting = false;
        this.handleGateway = this.handleGateway.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setAuthCode = this.setAuthCode.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        //EventApi.open_case();
    }

    componentDidMount() {
        this.input[3].onkeydown = ( e => {'Enter' === e.code && this.onConfirm()} )
    }

    handleGateway(e) {
        let gateway = e.target.dataset.gateway || e.target.parentNode.dataset.gateway;
        this.setState({gateway:gateway});
        1 == gateway && EventApi.open_case();
    }
    handleChange(e) {
        let value = e.target.value;
        !isNaN(value) && this.setState({amount:value});
    }

    setAuthCode(e) {
        let value = e.target.value,
            index = Number(e.target.dataset.index),
            len = value.length;
        (3 !== index && 4 === len) && this.input[index + 1].focus();
        if (( 3 !== index && 4 >= len ) || ( 3 === index && 6 >= len )) {
            this.state.authCode[index] = value;
            this.setState({authCode:this.state.authCode});
        }
    }

    onConfirm() {
        if ('function' !== typeof this.props.callback || this.waiting) return;
        this.waiting = true;
        let authCode = this.state.authCode
        ,   obj = {gateway:this.state.gateway,amount:parseFloat(this.state.amount || 0)};
        if (1 == obj.gateway) {
            if ('' == obj.amount || obj.amount <= 0 || parseFloat(this.props.data.amount || 0) > obj.amount) {
                this.waiting = false;
                return;
            }
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
                this.waiting = false;
                return;
            }
        }
        this.props.callback(obj);
        this.waiting = false;
    }

    render() {
        let data = this.props.data || {}
        ,   amount = data.amount || 0
        ,   made_price = data.made_price || 0
        ,   authCode = this.state.authCode
        ,   gateway = this.state.gateway;
        return (
            <Window title='收银' width='632' height='360' onClose={this.props.onClose}>
                <div className='ui-payment-update-card'>
                    <div><span>卡类型：</span>{data.type}</div>
                    <div><span>折扣率：</span>{data.discount || '100'}%</div>
                    <div><span>制卡费：</span>{made_price}</div>
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
                            实收金额：<input type='input' ref={input => {1 == gateway && tool.is_object(input) && input.focus()}} className='e-input' value={this.state.amount} onChange={this.handleChange}/>&nbsp;&nbsp;元
                        </div>
                    </div>
                    <div className='ui-payment-handle ui-payment-wechat' style={{display:(2 == gateway || 3 == gateway ? 'block' : 'none')}}>
                        <div style={style}>请扫描或输入{2 == gateway ? '微信' : '支付宝'}付款码</div>
                        <input 
                            type='text' 
                            className='e-input' 
                            value={authCode[0]} 
                            onChange={this.setAuthCode} 
                            data-index='0' 
                            ref={input => {
                                this.input[0] = input;
                                (2 == gateway || 3 == gateway) && authCode[0].length < 4 && tool.is_object(input) && input.focus();
                            }}
                        />
                        <input type='text' className='e-input' value={authCode[1]} onChange={this.setAuthCode} data-index='1' ref={input => this.input[1] = input}/>
                        <input type='text' className='e-input' value={authCode[2]} onChange={this.setAuthCode} data-index='2' ref={input => this.input[2] = input}/>
                        <input type='text' className='e-input' value={authCode[3]} onChange={this.setAuthCode} data-index='3' ref={input => this.input[3] = input}/>
                    </div>
                    <div className='ui-payment-amount' style={{paddingRight:'238px'}}>
                        <div>应收：<span>&yen;{amount || '0.00'}</span></div>
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