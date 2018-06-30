/**
 * 退卡界面
 * @author wangjun 
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import ReturnCard from './ReturnCard.css'
import Select from '../../UI/Select';

export default class extends Component {   
    constructor(props) {
        super(props);   
        let card = this.props.card || {};
        this.state = {
            show:false,    //是否显示
            index:0,    //索引
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
    }; 
    M1Read(e) {
        let obj = {};
        // if (e.target.dataset.query) {
        //     if ('' == this.state.number) return tool.ui.error({msg:'请输入会员卡号',callback:close => close()});
        //     obj.number = this.state.number;
        // }
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
        return (
 <Window title='退卡' onClose={this.props.closeView} width='632' height='356'>
                    <div className='reportloss'>
                    <div className='cardnumber'>卡ID：{this.state.cid} </div>
                    <div className='border'>
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
                             <label className='e-label'>&emsp;发卡店：</label><div>施奈尔大望路店</div>
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
                             <label className='e-label'>发卡点ID：</label><div>25105598356888</div>
                             <label className='e-label'>&emsp;&emsp;余额：</label><div>&yen;{this.state.balance}</div>
                         </div>
                     </div>
                     <div className='refundbutton'>
                          <button type='button' className='e-btn' onClick={this.M1Read}>读卡</button>
                          <div className='refundinput'>
                             <div >
                                <label className='e-label'>退款金额：</label><input type='text' className='e-input'/>
                             </div>
                             <div>
                               <label className='e-label'>退款方式：</label><Select option={['现金','微信','支付宝']}  onChange={value => console.log(value)}/>
                             </div>
                          </div>
                          <button type='button' className='e-btn' readOnly>退卡</button>
                     </div>
                  
                    
                     </div>
                     </div>
                    </Window>

       );
    }
}