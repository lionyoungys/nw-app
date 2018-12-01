/**
 * 挂失详情页面
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import '../Hangon/Hangon.css'
import './LossReissueChangePublic.css'

export default class extends Component {
    constructor(props) {
        super(props);
        this.lossReport=this.lossReport.bind(this);
    };
    lossReport(){
        api.post('lossCard', {
            token:'token'.getData(),
            id:this.props.data.id,
            
        }, (res, ver,handle) => {
            if (ver && res) {
                console.log(res)
                this.props.onClose();
                this.props.refresh();
            }
            handle();
        });
    }
    render() {
        var arr = ['发卡店', '发卡店ID', '卡类型', '卡号', '卡ID', '姓名', '手机号', '折扣率', '余额'].map((item, index) => <span key={index} >{item}</span>);
        var count = [this.props.data.mname, this.props.data.mid, this.props.data.card_name, this.props.data.recharge_number, this.props.data.id, this.props.data.user_name, this.props.data.user_mobile, this.props.data.discount, this.props.data.balance].map((item, index) => <span key={index} >{item}</span>);
        return (
            <Window title='挂失' onBack={this.props.onBack} onClose={this.props.onClose} width='567' height='382'>
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
                    <p>挂失后，该卡余额将被冻结，无法支付您确定要挂失该卡吗？</p>
                    <div className='loss-rep-right-btn'>
                        <button className="e-btn" onClick={this.lossReport}>挂失</button>
                        <button className="e-btn" onClick={this.props.onClose}>取消</button>
                    </div>
                </div>
            </Window>

        );
    }
}