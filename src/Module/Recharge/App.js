/**
 * 充值界面
 * @author Edwin Young
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
            time: card.time || ''    //售卡日期
        }
        this.M1Read = this.M1Read.bind(this);
        this.callback = this.callback.bind(this);
    }
    componentDidMount() {
        api.post('cardType', {token:token}, (res, ver,handle) => {
            if (ver && res) {
                console.log(res)
                this.setState({ types: res.result.cardsType.typeArray('card_type'), cards:res.result.cardsType});
            }else{
                handle();
            }
        });
    }

    callback(obj) {
        if ('' == this.state.cid && '' == this.state.recharge_number) return tool.ui.error({msg:'会员卡不存在',callback:close => close()});
        let card = this.state.cards[this.state.index];
        if ('object' !== typeof card || 'undefined' === typeof card.id)  return tool.ui.error({msg:'请选择充值卡类型',callback:close => close()});
        let loadingEnd;
        tool.ui.loading(handle => loadingEnd = handle);
        api.post(
            'recharge', 
            {token:token, cid:this.state.cid, number:this.state.recharge_number, gateway:obj.gateway, authcode:obj.authcode || '', recharge_id:card.id}, 
            (res, ver, handle) => {
                loadingEnd();
                if (ver) {
                    console.log(res);
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
            <Window title='充值' onClose={this.props.closeView} width='632' height='430'>
                <div className='recharge recharge-first'>
                    <div>
                        <label htmlFor='card_id' className='e-label'>卡号：</label>
                        <input id='card_id' className='e-input' type='text' value={this.state.number} onChange={e => this.setState({number:e.target.value})}/>&nbsp;
                        <button type='button' className='e-btn' data-query='1' onClick={this.M1Read}>查询</button>&nbsp;
                        <button type='button' className='e-btn' onClick={this.M1Read}>读卡</button>
                    </div>
                    <div><label className='e-label'>卡ID：</label>{this.state.cid}</div>
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
                        <div><label className='e-label'>充值卡类型：</label><Select option={this.state.types} onChange={value => this.setState({index:value.inObjArray(this.state.cards, 'card_type')})}/></div>
                        <div><label className='e-label'>&emsp;&emsp;&emsp;充值：</label>&yen;{card.price}</div>
                        <div><label className='e-label'>&emsp;&emsp;&emsp;赠送：</label>&yen;{card.give_price}</div>
                        <div><label className='e-label'>&emsp;&emsp;新折扣：</label>{card.discount}%</div>
                    </div>
                    <div className="recharge-four">
                        <div style={{ color: '#ff0000', marginTop: '24px', fontSize: '14px', fontWeight: 'bold', width: '100%', textAlign:'center',}}>应收：&yen;{card.real_price}</div>
                        <button type='button' className='e-btn recharge-btn' onClick={() => '' != this.state.cid && this.setState({show:true})}>收银</button>
                    </div>
                </div>
                {
                    this.state.show 
                    && 
                    <Recharge
                        data={{
                            type:this.state.card_name,
                            discount:this.state.discount,
                            recharge:card.price,
                            balance:this.state.balance,
                            give:card.give_price,
                            price: 0,
                            amount:card.real_price
                        }}
                        callback={this.callback}
                        onClose={() => this.setState({show:false})}
                    />
                }
            </Window>
        );
    }
}