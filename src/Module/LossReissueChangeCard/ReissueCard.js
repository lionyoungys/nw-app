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
    };
    render() {
        var arr = ['发卡店', '发卡店ID', '卡类型', '卡号', '卡编号', '姓名', '手机号', '折扣率', '余额'].map((item, index) => <span key={index} >{item}</span>);
        var count = ['xxxxxx', '102982828228', '金卡', '0108928828', '3838383338', '王小胖', '136737384874', '70%', '¥215.00'].map((item, index) => <span key={index} >{item}</span>);
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
                    <input type="text" className='e-input loss-rep-input' />
                    <div className='loss-rep-right-btn'>
                        <span>制卡费：¥20.00</span>
                        <button className="e-btn">确定</button>
                    </div>
                </div>
            </Window>

        );
    }
}