/**
 * 充值界面
 * @author Edwin Young
 * 修改日志：6/29  更改接口数据处理，修改右下角布局（ranchong）
 */

import React from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import {Recharge} from '../../UI/Payment';
import './App.css';

const token = 'token'.getData();
export default class extends React.Component {
    constructor(props) {
        super(props);
        let card = this.props.card || {};
        this.state = {
            show:false,    //是否显示
            index:0,    //索引
            number:'',    //输入卡号
            types:[],    //充值卡类型
            cards:[],    //卡类型信息
            cid: card.id || '',    //卡编号id
            user_mobile: card.user_mobile || '',    //电话
            user_name: card.user_name || '',    //姓名
            sex: card.sex || '',    //性别
            birthday: card.birthday || '',    //生日
            address: card.address || '',    //地址
            integrals: card.integral,    //积分
            balance: card.balance || '',    //余额
            recharge_number: card.recharge_number || '',    //卡号
            card_name: card.card_name || '',    //卡类型
            discount: card.discount || '',    //折扣
            time: card.time || '',    //售卡日期
            amount:'',
            give:'',
            selectVal:'',
            discountt:''//新折扣
        
        }
        this.M1Read = this.M1Read.bind(this);
        this.callback = this.callback.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }
    componentDidMount() {
        api.post('cardType', {token:token,limit:200}, (res, ver,handle) => {
            if (ver && res) {
                console.log(res)
                let cards = res.result.cardsType
                ,   first = cards.length > 0 ? cards[0] : {real_price:0,made_price:0,give_price:0,discount:100};
                this.setState({  selectVal:first.cardsType,cards: cards, types: cards.typeArray('card_type'), amount:first.real_price, give:first.give_price,discountt:first.discount});
            }else{
                handle();
            }
        });
    }

    handleChange(obj) {
        let value = obj.value
        ,   index = obj.index
        ,   card = this.state.cards[index];
        this.setState({selectVal:value,index:index,amount:card.real_price, give:card.give_price,discountt:card.discount});
    }

    handleClick() {
        if ('' == this.state.cid) return;
        if (isNaN(this.state.amount) || this.state.amount < 0) return tool.ui.error({msg:'充值金额不正确！',callback:close => close()});
        this.setState({show:true})
    }
    onKeyPress(e){
        13 == (e.keyCode || e.which) && this.M1Read();
    }   
    callback(obj) {
        if ('' == this.state.cid && '' == this.state.recharge_number) return tool.ui.error({msg:'会员卡不存在',callback:close => close()});
        let card = this.state.cards[this.state.index];
        if ('object' !== typeof card || 'undefined' === typeof card.id)  return tool.ui.error({msg:'请选择充值卡类型',callback:close => close()});
        let loadingEnd;
        tool.ui.loading(handle => loadingEnd = handle);
        let give = (isNaN(this.state.give) || this.state.give < 0 ? 0 : this.state.give);
        api.post(
            'recharge', 
            {token:token,cid:this.state.cid,number:this.state.recharge_number,gateway:obj.gateway,authcode:obj.authcode || '',recharge_id:card.id,price:this.state.amount,give_price:give,discount:this.state.discountt}, 
            (res, ver, handle) => {
                loadingEnd();
                if (ver) {
                    console.log(res);
                    let param = {
                        sn:res.result.sn,
                        addr:res.result.addr,
                        mphone:res.result.phone,
                        phone:this.state.user_mobile,
                        name:this.state.user_name,
                        number:this.state.recharge_number,
                        balance:this.state.balance,
                        discount:(this.state.discountt / 10),
                        give:give,
                        recharge:this.state.amount,
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
                    tool.ui.success({callback:close => {
                        close();
                        this.props.closeView();
                    }});
                }else{
                    handle();
                }
            },
            () => loadingEnd()
        );
    }

    M1Read(e) {
        let obj = {};
        if (e.target.dataset.query) {
            if ('' == this.state.number) return tool.ui.error({msg:'请输入卡号',callback:close => close()});
            obj.number = this.state.number;
        }
        obj.callback = (res) => {
            this.setState({
                cid:res.id,
                user_mobile:res.user_mobile,
                user_name:res.user_name,
                sex:res.sex,
                birthday:res.birthday,
                balance:res.balance,
                integrals:res.integrals,
                card_name:res.card_name,
                discount:res.discount,
                time:res.time,
                recharge_number:res.recharge_number,
                address:res.address,
            });
        }
        EventApi.M1Read(obj);
    }
    render() {
        let card = this.state.cards.length > 0 ? this.state.cards[this.state.index] : {};
        return (
            <Window title='充值' onClose={this.props.closeView} >
                <div className='recharge recharge-first'>
                    <div>
                        <label htmlFor='card_id' className='e-label'>卡号/手机号：</label>
                        <input id='card_id' className='recharge_input' type='text' value={this.state.number} onChange={e => this.setState({number:e.target.value})} onKeyPress={this.onKeyPress}/>&nbsp;&nbsp;
                       
                        <button type='button' className='e-btn' onClick={this.M1Read}>读卡</button>&nbsp;&nbsp;
                        <button type='button' className='e-btn-b' data-query='1' onClick={this.M1Read}>查询</button>
                    </div>
                    <div><label className='e-label'>卡ID：</label>{this.state.cid || '0'}</div>
                </div>
                <div className='recharge recharge-second'>
                    <div>
                        <label className='e-label'>卡号：</label><div>{this.state.recharge_number}</div>
                        <label className='e-label'>&emsp;卡类型：</label><div>{this.state.card_name}</div>
                    </div>
                    <div>
                        <label className='e-label'>姓名：</label><div>{this.state.user_name}</div>
                        <label className='e-label'>&emsp;折扣率：</label><div>{(this.state.discount ? this.state.discount + '%' : '')}</div>
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
                        <div><label className='e-label'>选择充值类型：</label><Select option={this.state.types} onChange={this.handleChange} value={this.state.selectVal}/></div>
                        <div><label className='e-label'>&emsp;&emsp;&emsp;&emsp;充值：</label><input className='e-input'  type='number' value={this.state.amount} onChange={e => this.setState({amount:e.target.value})}/></div>
                        <div><label className='e-label'>&emsp;&emsp;&emsp;&emsp;赠送：</label><input className='e-input' type='number' value={this.state.give} onChange={e => this.setState({give:e.target.value})}/></div>
                        <div><label className='e-label'>&emsp;&emsp;&emsp;新折扣：</label><input className='e-input' type='number' value={this.state.discountt} onChange={e=>this.setState({discountt:e.target.value})}/>%</div>
                    </div>
                   
                </div>
                <div className="recharge-four">
                        <div>
                       
                        <div style={{ color: '#ff0000', marginTop: '28px',marginRight:'10px', fontSize: '14px', fontWeight: 'bold',textAlign:'center'}}>应收：&yen;{this.state.amount}</div>
                        <button type='button' className='salecard_e-btn' style={{marginTop:'22px'}} onClick={this.handleClick}>收银</button>
                        </div>
                </div>
                {
                    this.state.show 
                    && 
                    <Recharge
                        data={{
                            type:this.state.card_name,
                            discount:this.state.discountt,
                            recharge:this.state.amount,
                            balance:this.state.balance,
                            give:this.state.give,
                            price: 0,
                            amount:this.state.amount
                        }}
                        callback={this.callback}
                        onClose={() => this.setState({show:false})}
                    />
                }
            </Window>
        );
    }
}