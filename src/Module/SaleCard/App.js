/**
 * 售卡
 * @author wangjun && Edwin Young && ranchong 
 * 修改日志：6/29 修改了返回数据复制（ranchong）
 */
import React from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import {Recharge} from '../../UI/Payment';
import './App.css'

const token = 'token'.getData();
export default class extends React.Component {   
    constructor(props) {
        super(props);     
        this.state={
            cards:[], 
            types:[], 
            index:0, 
            number:'', 
            name:'', 
            passwd:'', 
            passwd2:'', 
            phone:'', 
            birthday:'1970-01-01', 
            sex:'男', 
            addr:'', 
            amount:'',
            give:'',
            discount:100,
            made_price:'',
            show:false,
            writeData:{},
            type:'射频卡'
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.callback = this.callback.bind(this);
    }; 
    componentDidMount() {
        api.post('cardType', {token:token,limit:200}, (res,ver,handle) => {
            if (ver && res) {
                console.log(res)
                let cards = res.result.cardsType
                ,   first = cards.length > 0 ? cards[0] : {real_price:0,made_price:0,give_price:0,discount:100};
                this.setState({ 
                    cards: cards, 
                    types: cards.typeArray('card_type'), 
                    amount:first.real_price,
                    give:first.give_price,
                    discount:first.discount,
                    made_price:first.made_price
                });
            }else{
                handle();
            }
        });
    }

    handleChange(value) {
        let index = value.inObjArray(this.state.cards, 'card_type')
        ,   card = this.state.cards[index];
        this.setState({index:index,amount:card.real_price, give:card.give_price, discount:card.discount, made_price:card.made_price});
    }

    handleClick() {
        if ('' == this.state.name) return tool.ui.error({msg:'姓名不能为空！',callback:close => close()});
        if ('' == this.state.phone) return tool.ui.error({msg:'手机号不能为空！',callback:close => close()});
        if (isNaN(this.state.phone) || 11 != this.state.phone.length) return tool.ui.error({msg:'手机号格式不正确！',callback:close => close()});
        if (this.state.passwd != this.state.passwd2) return tool.ui.error({msg:'2次密码不正确！',callback:close => close()});
        if (isNaN(this.state.amount) || this.state.amount < 0) return tool.ui.error({msg:'充值金额不正确！',callback:close => close()});
        if (isNaN(this.state.discount) || this.state.discount < 0) return tool.ui.error({msg:'折扣率不正确！',callback:close => close()});
        if ('' != this.state.number && '射频卡' == this.state.type) {
            EventApi.M1Write({sn:this.state.number, success:() => this.setState({show:true})});
        } else {
            this.setState({show:true});
        }
    }

    callback(obj) {
        let loadingEnd;
        tool.ui.loading(handle => loadingEnd = handle);
        let card = this.state.cards[this.state.index];
        obj.token = token;
        obj.user_name = this.state.name;
        obj.user_mobile = this.state.phone;
        obj.recharge_number = this.state.number;
        obj.card_name = card.card_type;
        obj.discount = this.state.discount;
        obj.sex = this.state.sex;
        obj.birthday = this.state.birthday;
        obj.address = this.state.addr;
        obj.password = this.state.passwd;
        obj.price = this.state.amount;
        obj.give_price = (isNaN(this.state.give) || this.state.give < 0 ? 0 : this.state.give);
        obj.made_price = (isNaN(this.state.made_price) || this.state.made_price < 0 ? 0 : this.state.made_price);
        obj.balance = this.state.amount.add(obj.give_price);
        api.post('saleCard', obj, (res, ver, handle) => {
            if (ver) {
                //console.log(res);
                let param = {
                    sn:res.result.sn,
                    addr:res.result.addr,
                    mphone:res.result.phone,
                    phone:obj.user_mobile,
                    name:obj.user_name,
                    number:obj.recharge_number,
                    balance:0,
                    give:obj.give_price,
                    discount:(obj.discount / 10),
                    recharge:obj.price,
                    gateway:(1 == obj.gateway ? '现金' : (2 == obj.gateway ? '微信' : '支付宝'))
                };
                var limit = false;
                EventApi.print(
                    'card', 
                    param, 
                    'printer'.getData(),
                    () => {
                        tool.ui.success({msg:'本页已打印完成，请撕纸', callback:close => {
                            if (limit) return;
                            limit = true;
                            EventApi.print(
                                'card2', 
                                param, 
                                'printer'.getData()
                            );
                            close();
                        }});
                    }
                );
                handle({callback:this.props.closeView});
            }else{
                handle();
            }
            loadingEnd();
        }, () => loadingEnd());
    }
    render() {
        let card = this.state.cards.length > 0 ? this.state.cards[this.state.index] : {}
        ,   total = (this.state.amount || 0).add(this.state.made_price || 0); 
        return ( 
                <Window title='售卡' onClose={this.props.closeView} width='512' height='440'>
                    <div className='salecard'>
                       <div className='top'>
                        <div>
                            <span>卡类型:</span>&nbsp;&nbsp;
                            <Select 
                                option={this.state.types} 
                                onChange={this.handleChange}
                            />
                            &emsp;&emsp;
                            <span>卡型号:</span>&nbsp;&nbsp;
                            <Select 
                                option={['射频卡', '磁条卡']} 
                                onChange={value => this.setState({type:value})}
                            />
                        </div>
                        <div>
                        <span>卡号:</span><input type='text' className='cardnumber' value={this.state.number} onChange={e => this.setState({number:e.target.value})}/><label>卡号为空时，仅创建电子卡&nbsp;&nbsp;<span className='imghelp'></span></label>
                        </div>
                    </div>
                    <div className='middle'>
                    <div>
                        <span className='salecard_leftdirection'>
                        <span><label>*</label>姓名:</span>
                        <input type='text' className='inputborder' value={this.state.name} onChange={e => this.setState({name:e.target.value})}/>
                        </span>
                        <span className='salecard_rightdirection' value={this.state.passwd} onChange={e => this.setState({passwd:e.target.value})}>
                        <span>密码1次:</span><input type='password' className='inputborder'/>
                         </span>
                     </div>
                    <div>
                        <span className='salecard_leftdirection'>
                       <span> <label>*</label>手机号:</span><input type='text' className='inputborder'  value={this.state.phone} onChange={e => this.setState({phone:e.target.value})}/>
                        </span>
                         <span className='salecard_rightdirection'>
                        <span>密码2次:</span><input type='password' className='inputborder' value={this.state.passwd2} onChange={e => this.setState({passwd2:e.target.value})}/>
                    </span>
                    </div>
                <div>
                     <span className='salecard_leftdirection'>
                    <span>性别:</span>&nbsp;&nbsp;<Select option={['男','女']} onChange={value => this.setState({sex:value})}/>
                    </span>
                 <span className='salecard_rightdirection'>
                    <span>生日:</span><input type='date' className='inputselectborder' value={this.state.birthday} onChange={e => this.setState({birthday:e.target.value})}/>
                </span>
                </div>
            <div>
            <span className='salecard_leftdirection'>
            <span>地址:</span><input type='text' className='inputborder' value={this.state.addr} onChange={e => this.setState({addr:e.target.value})}/>
            </span>
            </div>
                    </div>
                    <div className='bottom'>
                    <div>
                    <span>充值:</span><label><input className='e-input'  type='number' value={this.state.amount} onChange={e => this.setState({amount:e.target.value})}/></label>
                    </div>
                    <div>
                    <span>赠送:</span><label><input className='e-input' type='number' value={this.state.give} onChange={e => this.setState({give:e.target.value})}/></label>
                    </div>
                    <div>
                        <span>折扣率:</span><label><input className='e-input' type='number' value={this.state.discount} onChange={e => this.setState({discount:e.target.value})}/>%</label>
                    </div>
                    <div>
                        <span>制卡费:</span><label><input className='e-input' type='number' value={this.state.made_price} onChange={e => this.setState({made_price:e.target.value})}/></label>
                    </div>
                        <span className='textred'>应收合计：&yen;{total}</span>
                        <button type='button' className='e-btn' onClick={this.handleClick}>收银</button>
                    </div>
                    </div>
                    {
                        this.state.show 
                        && 
                        <Recharge
                            data={{
                                type:card.card_type,
                                discount:this.state.discount,
                                recharge:this.state.amount,
                                balance:0,
                                give:this.state.give,
                                price:this.state.made_price,
                                amount:total
                            }}
                            callback={this.callback}
                            onClose={() => this.setState({show:false})}
                        />
                    }
                </Window>
        )
    }
}