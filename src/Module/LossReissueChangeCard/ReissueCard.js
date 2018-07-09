/**
 * 挂失详情页面
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import '../Hangon/Hangon.css'
import './LossReissueChangePublic.css'
const token = 'token'.getData();
export default class extends Component {
    constructor(props) {
        super(props);
        this.success=this.success.bind(this);
        this.state={
        id:this.props.data.id,
        recharge_number:'',
        made_price:this.props.data.made_price
        }

    };
    success(){
        let params={
            token:token,
            id:this.state.id,
            recharge_number:this.state.recharge_number,
        }
        console.log(params)
        api.post('repairCards',params, (res, ver,handle) => {
            if (ver && res) {
                console.log(res)
                this.props.refresh();
                this.props.onClose();
            }else{
                handle();
            }
        });
    }
    render() {
        var arr = ['发卡店', '发卡店ID', '卡类型', '卡号', '卡ID', '姓名', '手机号', '折扣率', '余额'].map((item, index) => <span key={index} >{item}</span>);
        var count = [this.props.data.mname, this.props.data.mid, this.props.data.card_name, this.props.data.recharge_number, this.props.data.card_id, this.props.data.user_name, this.props.data.user_mobile, this.props.data.discount+'%', this.props.data.balance].map((item, index) => <span key={index} >{item}</span>);
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
                        <span>制卡费：¥{this.state.made_price}</span>
                        <button className="e-btn" onClick={this.success}>确定</button>
                    </div>
                </div>
            </Window>

        );
    }
}