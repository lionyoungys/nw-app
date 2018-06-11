/**
 * 充值界面
 * @author Edwin Young
 */

import React from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import './App.css';
import Payandrecharge from '../PayAndRecharge/Payandrecharge'
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        index:0, //索引
        cardtype:[],//充值卡类型
        cards:[],//卡类型信息
        cardNumber:'',//输入卡号
        card_number:'',//卡编号
        user_mobile:'',//电话
        user_name:'',//姓名
        sex:'',//性别
        birthday:'',//生日
        address:'',//地址
        integrals:'',//积分
        balance:'',//余额
        recharge_number:'',//卡号
        card_name:'',//卡类型
        discount:'',//折扣
        time:'',//售卡日期
        show:false,//是否显示
        cid:''//卡id
    }
        this.query=this.query.bind(this);
        this.onchange=this.onchange.bind(this);
        this.cashier=this.cashier.bind(this);
        this.onclose=this.onclose.bind(this);
    }
    cashier(){
        this.setState({show:true});
        console.log(this.state.show)
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
    onchange(value){
        this.setState({index:value.inObjArray(this.state.cards, 'card_type')});
    }
    onclose(){
        this.setState({show:false});
    }
    query(){
        api.post('readCard', {token:'token'.getData(),cardNumber:this.state.cardNumber}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({card_number:res.result[0].card_number,
                    user_mobile:res.result[0].user_mobile,
                    user_name:res.result[0].user_name,
                    sex:res.result[0].sex,
                    birthday:res.result[0].birthday,
                    address:res.result[0].address,
                    integrals:res.result[0].integrals,
                    balance:res.result[0].balance,
                    recharge_number:res.result[0].recharge_number,
                    card_name:res.result[0].card_name,
                    discount:res.result[0].discount,
                    time:res.result[0].time,
                    cid:res.result[0].id
                });
            }
        }
        );
    }
    render() {
        let card = this.state.cards.length > 0 ? this.state.cards[this.state.index] : {}; 
        return (
            <Window title='充值' onClose={this.props.closeView} width='632' height='430'>
                <div className='recharge recharge-first'>
                    <div>
                        <label htmlFor='card_id' className='e-label'>卡号：</label>
                        <input id='card_id' className='e-input' type='text' value={this.state.cardNumber} onChange={e => this.setState({cardNumber:e.target.value})}/>&nbsp;
                        <button type='button' className='e-btn' onClick={this.query}>查询</button>&nbsp;
                        <button type='button' className='e-btn'>读卡</button>
                    </div>
                    <div><label className='e-label'>卡编号：</label>{this.state.card_number}</div>
                </div>
                <div className='recharge recharge-second'>
                    <div>
                        <label className='e-label'>卡号：</label><div>{this.state.recharge_number}</div>
                        <label className='e-label'>&emsp;卡类型：</label><div>{this.state.card_name}</div>
                    </div>
                    <div>
                        <label className='e-label'>姓名：</label><div>{this.state.user_name}</div>
                        <label className='e-label'>&emsp;折扣率：</label><div>{this.state.discount}</div>
                    </div>
                    <div>
                        <label className='e-label'>电话：</label><div>{this.state.user_mobile}</div>
                    </div>
                    <div>
                        <label className='e-label'>性别：</label><div>{this.state.sex}</div>
                        <label className='e-label'>售卡日期：</label><div>{this.state.time}</div>
                    </div>
                    <div>
                        <label className='e-label'>生日：</label><div>{this.state.birthday}</div>
                        <label className='e-label'>&emsp;&emsp;积分：</label><div>{this.state.integrals}</div>
                    </div>
                    <div>
                        <label className='e-label'>地址：</label><div>{this.state.address}</div>
                        <label className='e-label'>&emsp;&emsp;余额：</label><div>&yen;{this.state.balance}</div>
                    </div>
                </div>
                <div className='recharge recharge-third'>
                    <div>
                        <div><label className='e-label'>充值卡类型：</label><Select option={this.state.cardtype} selected={this.state.cardtype[0]} onChange={this.onchange}/></div>
                        <div><label className='e-label'>&emsp;&emsp;&emsp;充值：</label>&yen;{card.price}</div>
                        <div><label className='e-label'>&emsp;&emsp;&emsp;赠送：</label>&yen;{card.give_price}</div>
                        <div><label className='e-label'>&emsp;&emsp;新折扣：</label>{card.discount}%</div>
                    </div>
                    <div className="recharge-four">
                        <div style={{color:'#ff0000',marginBottom:'22px',fontSize:'14px',fontWeight:'bold'}}>应收：&yen;{card.real_price}</div>
                        <button type='button' className='e-btn recharge-btn' onClick={this.cashier}>收银</button>
                        {this.state.show&&<Payandrecharge onclose={this.onclose} info={{
                        user_mobile:this.state.user_mobile,
                        user_name:this.state.user_name,
                        sex:this.state.sex,
                        birthday:this.state.birthday,
                        address:this.state.address,
                        integrals:this.state.integrals,
                        balance:this.state.balance,
                        recharge_number:this.state.recharge_number,
                        card_name:this.state.card_name,
                        discount:this.state.discount,
                        time:this.state.time,
                        price:card.price,
                        give_price:card.give_price,
                        cid:this.state.cid
                        }}/>}
                    </div>
                </div>
            </Window>
        );
    }
}