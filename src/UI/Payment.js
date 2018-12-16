/**
 * 支付弹窗组件
 * @author Edwin Young
 * @desc 
 */

import React, {Component} from 'react';
import Dish from './Dish';
import Triangle from './Triangle';
import Select from '../UI/Select';
import CardList from '../Module/Clothes/CardList';

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
        this.template = {id:'', recharge_number:'', card_name:'', discount:100, balance:0};
        this.state = {
            gateway: '_',
            authCode:['','','',''], 
            amount:'', 
            number:'',
            card:this.template,
            cards:[],
            passwd:'',
            activities:[],
            coupons:[],
            act_index:0,
            cou_index:0,
            ac_show:false,    //判断是否展示优惠券及活动信息:当传入优惠券或活动字段时展示,否则隐藏
            show:false
        };
        this.data = {};    //计算结果数据对象
        this.card = {};    //选中使用的卡信息
        this.coupon = null;    //选中的优惠券
        this.activity = null;    //选中的活动
        this.input = [];
        this.waiting = false;
        this.handleGateway = this.handleGateway.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setAuthCode = this.setAuthCode.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.M1Read = this.M1Read.bind(this);
        this.handleSelectCoupon = this.handleSelectCoupon.bind(this);
        this.handleSelectActivity = this.handleSelectActivity.bind(this);
    }

    componentDidMount() {
        this.input[3].onkeydown = ( e => {'Enter' === e.code && this.onConfirm()} )
        let phone = this.props.phone
        ,   oid = this.props.oid;
        if ('string' == typeof phone && !isNaN(oid) && this.data.debt) {
            //获取满足当前条件的优惠券及活动列表信息
            api.post('order_ac_query', {user_mobile:phone, oid:oid, token:'token'.getData()}, (res, ver) => {
                console.log('ui/payment/api:order_ac_query', res);
                if (ver) {
                    var act = res.result.activity
                    ,   cou = res.result.coupon
                    ,   a_len = act.length
                    ,   c_len = cou.length;
                    if (a_len < 1) {
                        act.unshift({id:'_act_', name:'无促销活动可参加'});
                    } else {
                        act.unshift({id:'_act_', name:a_len + '个促销活动可参加'});
                    }
                    if (c_len < 1) {
                        cou.unshift({id:'_cou_', name:'无优惠券可使用'});
                    } else {
                        cou.unshift({id:'_cou_', name:c_len + '张优惠券可使用'});
                    }
                    this.setState({coupons:cou, activities:act, ac_show:true});
                }
            });
        }
    }


    M1Read(e) {
        let number = this.state.number;
        if ('读卡' == e.target.innerText) {
            number = null;
        } else if (number.length < 1) {
            return;
        }
        let obj = {number:number, callback: res => {
            if (res.cardList.length > 1) {
                this.setState({cards:res.cardList});
            } else {
                this.setState({card:res});
            }
        }};
        EventApi.M1Read(obj);
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
    onKeyPress(e){
        13 == (e.keyCode || e.which) && this.M1Read();
    }

    handleSelectCoupon(obj) {
        if (0 == this.state.act_index || 1 == this.state.activities[this.state.act_index].whether) {
            this.setState({cou_index:obj.index});
        }
    }

    handleSelectActivity(obj) {
        let whether = this.state.activities[obj.index].whether;
        if ('undefined' == typeof whether) {
            whether = 1;
        }
        if (0 == this.state.cou_index || (0 != this.state.cou_index && 1 == whether)) {
            this.setState({act_index:obj.index});
        }
    }

    handleClick() {
        if (0 == this.data.gateway || '_' == this.data.gateway) {    //会员卡支付
            this.setState({show:true});
        } else {
            this.onConfirm();
        }
    }

    onConfirm() {
        if ('function' == typeof this.props.callback && !this.waiting) {
            this.waiting = true;
            this.data.passwd = this.state.passwd;    //密码
            this.data.authcode = '';
            if ('_' == this.data.gateway) {
                this.data.gateway = '0';
            }
            this.data.activity = ('0' != this.state.act_index) ? this.activity : null;        //判断是否使用活动
            this.data.coupon = ('0' != this.state.cou_index) ? this.coupon : null;    //判断是否使用优惠券
            let authCode = this.state.authCode;
            if ('1' == this.data.gateway && this.data.change < 0) {
                this.waiting = false;
                return;
                //if (this.props.data.special_pay_amount) this.data.pay_amount = parseFloat(this.props.data.special_pay_amount);
            } else if ('2' == this.data.gateway || '3' == this.data.gateway) {
                if (
                    4 === authCode[0].length && !isNaN(authCode[0])
                    &&
                    4 === authCode[1].length && !isNaN(authCode[1])
                    &&
                    4 === authCode[2].length && !isNaN(authCode[1])
                    &&
                    6 === authCode[3].length && !isNaN(authCode[1])
                ) {
                    this.data.authcode = (authCode[0] + authCode[1] + authCode[2] + authCode[3]);
                } else {
                    this.waiting = false;
                    return;
                }
            }
            this.props.callback(this.data);
            this.waiting = false;
        }
    }

    render() {
        let authCode = this.state.authCode    //支付码
        ,   items = this.props.items || []    //项目列表
        ,   card = tool.isObject(this.props.card) && this.props.card.id ? this.props.card : this.template    //会员卡信息
        ,   ac_show = this.state.ac_show
        ,   activities = this.state.activities
        ,   coupons = this.state.coupons
        ,   act_index = this.state.act_index
        ,   cou_index = this.state.cou_index;

        if (this.state.card.id) {
            card = this.state.card;
        }

        if (act_index > 0 || cou_index > 0) {    //判断是否使用促销活动或优惠券 
            if (tool.isObject(activities[act_index])) {
                this.activity = activities[act_index];
            }
            if (tool.isObject(coupons[cou_index])) {
                this.coupon = coupons[cou_index];
            }
        }
        this.data = this.props.calculator.setData(items)
                                         .setDebt(this.props.debt)    //欠款对象
                                         .matchAC(activities[act_index], coupons[cou_index])
                                         .setCash(this.state.amount)
                                         .get();    //设置项目数据
        let isZero = (0 == this.data.calc_amount)    //判断金额是否为零,为零时只能现金支付
        ,   gateway = (isZero ? 1 : this.state.gateway);    //支付方式
        this.data = this.props.calculator.setDiscount('1' == gateway ? 100 : card.discount).get();
        //赋值数据于data
        this.data.gateway = gateway;
        this.data.card = card;
        return (
            <Dish title='收银' width='560' height={ac_show ? '480' : '390'} icon='icons-payment.png' onClose={this.props.onClose}>
                <div className='ui-payment'>
                    <div className='ui-payment-head'>核对信息</div>
                    <div className='ui-payment-detail'>
                        <div>
                            <div>不可折金额：&yen;{this.data.no_dis_amount}</div>
                            <div>原价：&yen;{this.data.total}</div>
                        </div>
                        <div>
                            <div>可折金额：&yen;{this.data.dis_amount}</div>
                            <div>折后价：&yen;{this.data.calc_amount}</div>
                        </div>
                        <div>
                            <div>折扣率：{this.data.discount}%</div>
                            <div style={(0 == gateway || '_' == gateway) ? null : {display:'none'}}>卡余额：<span className='e-red e-fb'>&yen;{card.balance}</span></div>
                        </div>
                    </div>
                    {ac_show && <div className='ui-payment-head'>优惠信息</div>}
                    {
                        ac_show
                        &&
                        <div className='ui-payment-detail3'>
                            <span>优惠券：<Select option={coupons} value={coupons[cou_index] ? coupons[cou_index].name : ''} pair={['id', 'name']} onChange={this.handleSelectCoupon}/></span>
                            <span>促销活动：<Select option={activities} value={activities[act_index] ? activities[act_index].name : ''} pair={['id', 'name']} onChange={this.handleSelectActivity}/></span>
                        </div>
                    }
                    <div className='ui-payment-head'>收款方式</div>
                    <div className='ui-payment-pattern'>
                        <div>
                            <span className={'e-payment-option vip' + ('_' == gateway ? ' checked' : '')} style={isZero ? {display:'none'} : null} data-gateway='_' onClick={this.handleGateway}><i></i>电子卡</span>
                            <span className={'e-payment-option ic' + (0 == gateway ? ' checked' : '')} style={isZero ? {display:'none'} : null} data-gateway='0' onClick={this.handleGateway}><i></i>ic卡</span>
                            <span className={'e-payment-option cash' + (1 == gateway ? ' checked' : '')} data-gateway='1' onClick={this.handleGateway}><i></i>现金</span>
                            <span className={'e-payment-option wechat' + (2 == gateway ? ' checked' : '')} style={isZero ? {display:'none'} : null} data-gateway='2' onClick={this.handleGateway}><i></i>微信</span>
                            <span className={'e-payment-option alipay' + (3 == gateway ? ' checked' : '')} style={isZero ? {display:'none'} : null} data-gateway='3' onClick={this.handleGateway}><i></i>支付宝</span>
                        </div>
                        <div className='ui-payment-pattern-handle' style={{display:('_' == gateway ? 'block' : 'none')}}>
                            <Triangle className='ui-payment-triangle vip'/>
                            <div style={card.id ? {display:'none'} : null}>
                                <div style={style}>请客户打开微信公众号【速洗达洗衣公众平台】出示卡号或手机号</div>
                                <input 
                                    type='input' 
                                    ref={input => {!this.state.show && 0 == gateway && tool.is_object(input) && input.focus()}} 
                                    className='e-input' 
                                    value={this.state.number} 
                                    onChange={e => this.setState({number:e.target.value})} onKeyPress={this.onKeyPress}/>&nbsp;
                                <button type='button' className='e-btn' onClick={this.M1Read}>查询</button>
                            </div>
                            <div className='ui-payment-pattern-handle-vip' style={card.id ? null : {display:'none'}}>
                                <div><span>卡号：{card.recharge_number}</span>卡类型：{card.card_name}</div>
                                <div><span>余额：{card.balance}</span>折扣率：<span className='e-red e-fb'>{card.discount}%</span></div>
                            </div>
                        </div>
                        <div className='ui-payment-pattern-handle' style={{display:(0 == gateway ? 'block' : 'none')}}>
                            <Triangle className='ui-payment-triangle ic'/>
                            <div style={card.id ? {display:'none'} : {textAlign:'center'}}>
                                <button type='button' className='e-btn' onClick={this.M1Read}>读卡</button>
                            </div>
                            <div className='ui-payment-pattern-handle-vip' style={card.id ? null : {display:'none'}}>
                                <div><span>卡号：{card.recharge_number}</span>卡类型：{card.card_name}</div>
                                <div><span>余额：{card.balance}</span>折扣率：<span className='e-red e-fb'>{card.discount}%</span></div>
                            </div>
                        </div>
                        <div className='ui-payment-pattern-handle' style={{display:(1 == gateway ? 'block' : 'none')}}>
                            <Triangle className={'ui-payment-triangle ' + (isZero ? 'vip' : 'cash')}/>
                            <div>
                                实收金额：<input type='input' ref={input => {!this.state.show && 1 == gateway && tool.is_object(input) && input.focus()}} className='e-input' value={this.state.amount} onChange={this.handleChange}/>&nbsp;&nbsp;元
                                &emsp;&emsp;&emsp;&emsp;找零：<span style={{color:'red'}}>&yen;{this.data.change}</span>
                            </div>
                        </div>
                        <div className='ui-payment-pattern-handle ui-payment-wechat' style={{display:(2 == gateway || 3 == gateway ? 'block' : 'none')}}>
                            <Triangle className={'ui-payment-triangle ' + (2 == gateway ? 'wechat' : 'alipay')}/>
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
                    </div>
                    <div className='ui-payment-confirm'>
                        <button type='button' className='e-btn larger' onClick={this.handleClick}>立即收款</button>
                    </div>
                </div>
                {
                    this.state.show
                    &&
                    <Dish title='请输入会员卡密码' width='280' height='100' onClose={() => this.setState({show:false})}>
                        <div style={{textAlign:'center',marginTop:'14px'}}>
                            <input type='password' className='e-input' value={this.state.passwd} onChange={e => this.setState({passwd:e.target.value})}/>
                            &nbsp;&nbsp;
                            <button type='button' className='e-btn' onClick={this.onConfirm}>确认</button>
                        </div>
                    </Dish>
                }
                {
                    this.state.cards.length > 1 
                    && 
                    <CardList data={this.state.cards} onClose={() => this.setState({cards:[]})} callback={obj => this.setState({card:obj,cards:[]})}/>
                }
            </Dish>
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
            <Dish title='收银' width='560' height='420' onClose={this.props.onClose}>
                <div className='ui-payment'>
                    <div className='ui-payment-head'>核对信息</div>
                    <div className='ui-payment-detail'>
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
                    <div className='ui-payment-head'>收款方式</div>
                    <div className='ui-payment-pattern'>
                        <div>
                            <span className={'e-payment-option cash' + (1 == gateway ? ' checked' : '')} data-gateway='1' onClick={this.handleGateway}><i></i>现金</span>
                            <span className={'e-payment-option wechat' + (2 == gateway ? ' checked' : '')} data-gateway='2' onClick={this.handleGateway}><i></i>微信</span>
                            <span className={'e-payment-option alipay' + (3 == gateway ? ' checked' : '')} data-gateway='3' onClick={this.handleGateway}><i></i>支付宝</span>
                        </div>
                        <div className='ui-payment-pattern-handle' style={{display:(1 == gateway ? 'block' : 'none')}}>
                            <Triangle className='ui-payment-triangle vip'/>
                            <div className='ui-payment-cash'>
                                实收金额：<input type='input' ref={input => {1 == gateway && tool.is_object(input) && input.focus()}} className='e-input' value={this.state.amount} onChange={this.handleChange}/>&nbsp;&nbsp;元
                            </div>
                        </div>
                        <div className='ui-payment-pattern-handle ui-payment-wechat' style={{display:(2 == gateway || 3 == gateway ? 'block' : 'none')}}>
                            <Triangle className={'ui-payment-triangle ' + (2 == gateway ? 'ic' : 'cash')}/>
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
                    </div>
                    <div className='ui-payment-amount' style={{paddingRight:'238px'}}>
                        <div>应收：<span>&yen;{amount}</span></div>
                        <div>找零：<span>&yen;{'' == this.state.amount ? 0 : this.state.amount.subtract(amount)}</span></div>
                    </div>
                    <div className='ui-payment-confirm'>
                        <button type='button' className='e-btn' onClick={this.onConfirm}>立即收款</button>
                    </div>
                </div>
            </Dish>
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
            <Dish title='收银' width='560' height='360' onClose={this.props.onClose}>
                <div className='ui-payment'>
                    <div className='ui-payment-detail2'>
                        <div><span>卡类型：</span>{data.type}</div>
                        <div><span>折扣率：</span>{data.discount || '100'}%</div>
                        <div><span>制卡费：</span>{made_price}</div>
                    </div>
                    <div className='ui-payment-head'>收款方式</div>
                    <div className='ui-payment-pattern'>
                        <div>
                            <span className={'e-payment-option cash' + (1 == gateway ? ' checked' : '')} data-gateway='1' onClick={this.handleGateway}><i></i>现金</span>
                            <span className={'e-payment-option wechat' + (2 == gateway ? ' checked' : '')} data-gateway='2' onClick={this.handleGateway}><i></i>微信</span>
                            <span className={'e-payment-option alipay' + (3 == gateway ? ' checked' : '')} data-gateway='3' onClick={this.handleGateway}><i></i>支付宝</span>
                        </div>
                        <div className='ui-payment-pattern-handle' style={{display:(1 == gateway ? 'block' : 'none')}}>
                            <Triangle className='ui-payment-triangle vip'/>
                            <div className='ui-payment-cash'>
                                实收金额：<input type='input' ref={input => {1 == gateway && tool.is_object(input) && input.focus()}} className='e-input' value={this.state.amount} onChange={this.handleChange}/>&nbsp;&nbsp;元
                            </div>
                        </div>
                        <div className='ui-payment-pattern-handle ui-payment-wechat' style={{display:(2 == gateway || 3 == gateway ? 'block' : 'none')}}>
                            <Triangle className={'ui-payment-triangle ' + (2 == gateway ? 'ic' : 'cash')}/>
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
                    </div>
                    <div className='ui-payment-amount' style={{paddingRight:'238px'}}>
                        <div>应收：<span>&yen;{amount || '0.00'}</span></div>
                        <div>找零：<span>&yen;{'' == this.state.amount ? 0 : this.state.amount.subtract(amount)}</span></div>
                    </div>
                    <div className='ui-payment-confirm'>
                        <button type='button' className='e-btn larger' onClick={this.onConfirm}>立即收款</button>
                    </div>
                </div>
            </Dish>
        );
    }
}


/*class PaymentPattern extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.patterns = [
            {no:'_', name_en:'vip', name_zh:'电子卡'},
            {no:0, name_en:'ic', name_zh:'IC卡'},
            {no:0, name_en:'cash', name_zh:'现金'},
            {no:0, name_en:'wechat', name_zh:'微信'},
            {no:0, name_en:'alipay', name_zh:'支付宝'}
        ];
    }

    handleChange(e) {
        'function' === typeof this.props.onChange && this.props.onChange(Number(e.target.dataset.no));
    }
    render() {
        let checked = isNaN(this.props.checked) ? '_' : this.props.checked
        ,   patterns = this.patterns.map((obj) => {
            return (
                <span className={'e-payment-option ' + obj.name_en + (obj.no == checked ? ' checked' : '')} style={this.props.zero ? {display:'none'} : null} data-no={obj.no} onClick={this.handleChange}><i></i>电子卡</span>
            );
        });
        return (
            <div className='ui-payment-pattern'>
                <div>{patterns}</div>
                <div className='ui-payment-handle' style={{display:('_' == gateway ? 'block' : 'none')}}>
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
            </div>
        );
    }
}*/