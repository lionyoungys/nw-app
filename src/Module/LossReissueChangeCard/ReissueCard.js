/**
 * 补卡详情页面
 * @author  ranchong && Edwin Young
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import {UpdateCard} from '../../UI/Payment';
import '../Hangon/Hangon.css'
import './LossReissueChangePublic.css'
const token = 'token'.getData();
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:this.props.data.id,
            recharge_number:'',
            show:false
        }
        this.handleClick = this.handleClick.bind(this);
        this.success = this.success.bind(this);
    };
    success(obj){
        let params={
            token:token,
            id:this.state.id,
            recharge_number:this.state.recharge_number,
            made_price:this.props.data.made_price || 0,
            authcode:obj.authcode || '',
            pay_type:obj.gateway
        }
        console.log(params)
        api.post('repairCards',params, (res, ver,handle) => {
            if (ver && res) {
                console.log(res)
                tool.ui.success({msg:'补卡成功！', callback:close => {
                    close();
                    this.props.refresh();
                    this.props.onClose();
                }});
            }else{
                handle();
            }
        });
    }
    handleClick() {
        EventApi.M1Write({sn:this.state.recharge_number, success:() => {
            let made_price = parseFloat(this.props.data.made_price || 0);
            if (0 == made_price) {
                this.success({gateway:1,authcode:''});
            } else {
                this.setState({show:true});
            }
        }});
    }
    render() {
        let data = this.props.data || {};
        var arr = ['发卡店', '发卡店ID', '卡类型', '卡号', '卡ID', '姓名', '手机号', '折扣率', '余额'].map((item, index) => <span key={index} >{item}</span>);
        var count = [data.mname, data.mid, data.card_name, data.recharge_number, data.id, data.user_name, data.user_mobile, data.discount+'%', data.balance].map((item, index) => <span key={index} >{item}</span>);
        return (
            <Window title='补卡' onClose={this.props.onClose} width='567' height='382'>
                <p className='loss-rep-title'>原卡信息</p>
                <div className="Hangon-left loss-rep-left">
                    <div className="Hangon-left-title">
                        {arr}
                    </div>
                    <div className="Hangon-left-count">
                        {count}
                    </div>
                </div>
                <div className="loss-rep-right">
                    <p>注意：补换卡业务仅支持实体卡、IC卡</p>
                    <a><b>*</b>新卡号</a>
                    <input type="text" className='e-input loss-rep-input' onChange={e=>this.setState({recharge_number:e.target.value})}/>
                    <div className='loss-rep-right-btn'>
                        <span>制卡费：¥{data.made_price || '0.00'}</span>
                        <button className="e-btn" onClick={this.handleClick}>确定</button>
                    </div>
                </div>
                {/* type:卡类型,discount:折扣率,made_price:制卡费,amount:补换卡应收金额 */}
                {
                    this.state.show 
                    && 
                    <UpdateCard 
                        data={{
                            made_price:data.made_price,
                            discount:data.discount,
                            type:data.card_name,
                            amount:data.made_price
                        }}
                        callback={this.success}
                        onClose={() => this.setState({show:false})}
                    />
                }
            </Window>

        );
    }
}