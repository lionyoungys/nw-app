/**
 * 售卡
 * @author wangjun
 */
import React, {Component} from 'react';
import './SaleCard.css'
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import Payandrecharge from '../PayAndRecharge/Payandrecharge'
export default class extends Component {   
    constructor(props) {
        super(props);     
    this.state={
        cardtype:[], 
        index:0,
        cardnumber:'',
        username:'',
        passwd1:'',
        mobilephone:'',
        passwd2:'',
        birthday:'1970-01-01',
        sex:'',
        address:'',
        cards:[],
        show:false,
    };    
    this.cashier=this.cashier.bind(this);
    this.onchange=this.onchange.bind(this);
    this.onclose=this.onclose.bind(this);
    }; 
    onclose(){
        this.setState({show:false});
    }
    componentDidMount() {
        api.post('cardType', {token:'token'.getData()}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({cardtype:res.result.typeArray('card_type'),cards:res.result});
            }
        }
        );
    }
    cashier(){
        this.setState({show:true});
        console.log(this.state.show)
        // this.props.closeView();
       
    }
    onchange(value){
        this.setState({index:value.inObjArray(this.state.cards, 'card_type')});
    }
    render() {
        let card = this.state.cards.length > 0 ? this.state.cards[this.state.index] : {};      
        return ( 
               <Window title='售卡' onClose={this.props.closeView} width='512' height='440'>  
                    <div className='salecard'>
                    <div className='top'>
                        <div>
                        <span>卡类型:</span>&nbsp;&nbsp;<Select option={this.state.cardtype} selected={this.state.cardtype[0]}  onChange={this.onchange}/>
                        </div>
                        <div>
                        <span>卡号:</span><input className='cardnumber' value={this.state.cardnumber} onChange={e => this.setState({cardnumber:e.target.value})}/><label>卡号为空时，仅创建电子卡&nbsp;&nbsp;<span className='imghelp'></span></label>
                        </div>
                    </div>
                    <div className='middle'>
                    <div>
                        <span className='salecard_leftdirection'>
                        <span><label>*</label>姓名:</span>
                        <input type='text' className='inputborder' value={this.state.username} onChange={e => this.setState({username:e.target.value})}/>
                        </span>
                        <span className='salecard_rightdirection' value={this.state.passwd1} onChange={e => this.setState({passwd1:e.target.value})}>
                        <span>密码1次:</span><input type='text' className='inputborder'/>
                         </span>
                     </div>
                    <div>
                        <span className='salecard_leftdirection'>
                       <span> <label>*</label>手机号:</span><input type='text' className='inputborder'  value={this.state.mobilephone} onChange={e => this.setState({mobilephone:e.target.value})}/>
                        </span>
                         <span className='salecard_rightdirection'>
                        <span>密码2次:</span><input type='text' className='inputborder' value={this.state.passwd2} onChange={e => this.setState({passwd2:e.target.value})}/>
                    </span>
                    </div>
                <div>
                     <span className='salecard_leftdirection'>
                    <span>性别:</span>&nbsp;&nbsp;<Select option={['未知','男','女']} selected='未知' value={this.state.sex} onChange={value => this.setState({sex:value})}/>
                    </span>
                 <span className='salecard_rightdirection'>
                    <span>生日:</span><input type='date' className='inputselectborder' value={this.state.birthday} onChange={e => this.setState({birthday:e.target.value})}/>
                </span>
                </div>
            <div>
            <span className='salecard_leftdirection'>
            <span>地址:</span><input type='text' className='inputborder' value={this.state.address} onChange={e => this.setState({address:e.target.value})}/>
            </span>
            </div>
                    </div>
                    <div className='bottom'>
                    <div>
                    <span>充值:</span><label>￥{card.price}</label>
                    </div>
                    <div>
                    <span>赠送:</span><label>￥{card.give_price}</label>
                    </div>
                    <div>
                        <span>折扣率:</span><label>{card.discount}%</label>
                    </div>
                    <div>
                        <span>制卡费:</span><label>￥{card.made_price}</label>
                    </div>
                        <span className='textred'>应收合计：￥{card.real_price}</span>
                        <button type='button' className='e-btn' onClick={this.cashier}>收银</button>
                        {this.state.show&&<Payandrecharge onclose={this.onclose} info={{
                        user_name:this.state.username,
                        user_mobile:this.state.mobilephone,
                        recharge_number:this.state.cardnumber,
                        card_name:this.state.cards[this.state.index].card_type,
                        discount:this.state.cards[this.state.index].discount,
                        sex:this.state.sex,
                        birthday:this.state.birthday,
                        address:this.state.address,
                        password:this.state.passwd1,
                        price:'0.01',
                        // this.state.cards[this.state.index].price,
                        give_price:this.state.cards[this.state.index].give_price,
                        made_price:'0.01',
                        // this.state.cards[this.state.index].made_price,
                        
                        balance:'0.01',
                        // Number(this.state.cards[this.state.index].price)+Number(this.state.cards[this.state.index].give_price)
                        }}/>}
                    </div>
                    </div>
               </Window>
        )
    }
}