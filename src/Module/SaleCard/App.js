/**
 * 售卡
 * @author wangjun && Edwin Young
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
            show:false,
            writeData:{}
        };
        this.handleClick = this.handleClick.bind(this);
        this.writeCard = this.writeCard.bind(this);
        this.callback = this.callback.bind(this);
    }; 
    componentDidMount() {
        api.post('cardType', {token:token}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({cards:res.result, types:res.result.typeArray('card_type')});
            }
        });
    }

    handleClick() {
        if ('' == this.state.name) return tool.ui.error({msg:'姓名不能为空！',callback:close => close()});
        if ('' == this.state.phone) return tool.ui.error({msg:'手机号不能为空！',callback:close => close()});
        if (isNaN(this.state.phone) || 11 != this.state.phone.length) return tool.ui.error({msg:'手机号格式不正确！',callback:close => close()});
        if (this.state.passwd != this.state.passwd2) return tool.ui.error({msg:'2次密码不正确！',callback:close => close()});
        this.setState({show:true})
    }

    writeCard(obj) {
        obj = obj || this.state.writeData;
        console.log(obj);
        let result = true;
        try {
            result = M1Reader.set(obj);
            console.log('false');
        } catch (e) {
            console.log(e);
            result = false;
        }
        if (!result) {
            tool.ui.error({msg:'写卡失败',button:'重试',callback:(close, event) => {
                if ('click' == event) {
                    close();
                    this.writeCard();
                } else {
                    close();
                }
            }});
        } else {
            tool.ui.success({callback:close => {
                close();
                this.setState({show:false});
            }});
        }
    }

    callback(obj) {
        let card = this.state.cards[this.state.index];
        obj.token = token;
        obj.user_name = this.state.name;
        obj.user_mobile = this.state.phone;
        obj.recharge_number = this.state.number;
        obj.card_name = card.card_type;
        obj.discount = card.discount;
        obj.sex = this.state.sex;
        obj.birthday = this.state.birthday;
        obj.address = this.state.addr;
        obj.password = this.state.passwd;
        obj.price = card.price;
        obj.made_price = card.made_price;
        obj.balance = card.price.add(card.give_price);
        api.post('saleCard', obj, (res, ver, handle) => {
            if (ver) {
                console.log(res);
                if ('' == this.state.number) {
                    tool.ui.success({callback:close => {
                        close();
                        this.setState({show:false});
                    }});
                } else {
                    //sn:卡号,cid:卡ID,mid:商户id
                    let writeData = {cid:res.result.card_id,mid:res.result.mid,sn:this.state.number};
                    this.setState({writeData:writeData});
                    this.writeCard(writeData);
                }
            }else{
                handle();
            }
        });
    }
    render() {
        let card = this.state.cards.length > 0 ? this.state.cards[this.state.index] : {}
        ,   amount = card.real_price ? card.real_price.add(card.made_price) : 0; 
        return ( 
                <Window title='售卡' onClose={this.props.closeView} width='512' height='440'>
                    <div className='salecard'>
                       <div className='top'>
                        <div>
                            <span>卡类型:</span>&nbsp;&nbsp;
                            <Select 
                                option={this.state.types} 
                                onChange={value => this.setState({index:value.inObjArray(this.state.cards, 'card_type')})}
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
                    <span>充值:</span><label>&yen;{card.price}</label>
                    </div>
                    <div>
                    <span>赠送:</span><label>&yen;{card.give_price}</label>
                    </div>
                    <div>
                        <span>折扣率:</span><label>{card.discount}%</label>
                    </div>
                    <div>
                        <span>制卡费:</span><label>&yen;{card.made_price}</label>
                    </div>
                        <span className='textred'>应收合计：&yen;{amount}</span>
                        <button type='button' className='e-btn' onClick={this.handleClick}>收银</button>
                    </div>
                    </div>
                    {
                        this.state.show 
                        && 
                        <Recharge
                            data={{
                                type:card.card_type,
                                discount:card.discount,
                                recharge:card.price,
                                balance:0,
                                give:card.give_price,
                                price:card.made_price,
                                amount:amount
                            }}
                            callback={this.callback}
                            onClose={() => this.setState({show:false})}
                        />
                    }
                </Window>
        )
    }
}