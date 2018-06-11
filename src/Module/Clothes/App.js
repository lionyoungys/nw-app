/**
 * 收衣界面
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import './App.css';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {phone:'',name:'',number:'',addr:'',time:''};
        this.M1read = this.M1read.bind(this);    //读卡
        this.add = this.add.bind(this);    //添加衣物
        this.cost = this.cost.bind(this);    //收银
        this.recharge = this.recharge.bind(this);    //充值
        this.dec = this.dec.bind(this);    //卡扣款
    }

    M1read() {

    }
    add() {

    }
    cost() {

    }
    recharge() {

    }
    dec() {

    }


    render() {
        return (
            <Window title='收衣' onClose={this.props.closeView} >
                <div className='clothes-user'>
                    手机：<input type='text' className='e-input' style={{width:'126px'}} value={this.state.phone} readOnly/>
                    姓名：<input type='text' className='e-input' style={{width:'100px'}} value={this.state.name} readOnly/>
                    卡号：<input type='text' className='e-input' style={{width:'126px'}} value={this.state.number} readOnly/>
                    地址：<input type='text' className='e-input' style={{width:'196px'}} value={this.state.addr} readOnly/>
                    <button type='button' className='e-btn' onClick={this.M1read}>读卡</button>
                </div>
                <div className='clothes-header'>
                    <div>衣物编码</div><div>衣物名称</div><div>颜色</div><div>瑕疵</div><div>品牌</div>
                    <div>洗后预估</div><div>工艺加价</div><div>单价</div><div>数量</div><div>操作</div>
                </div>
                <div className='clothes-body'>
                    <div>
                        <div>2</div><div>2</div><div>2</div><div>2</div><div>2</div><div>2</div><div>2</div><div>2</div><div>2</div><div>2</div>
                    </div>
                </div>
                <div style={{padding:'10px 20px'}}><button type='button' className='e-btn' onClick={this.add}>添加衣物</button></div>
                <div className='clothes-footer'>
                    <div className='clothes-footer-left'>
                        <div>
                            <div>总件数：1件</div>
                            <div>总金额：&yen;18.00</div>
                            <div style={{fontSize:'14px',color:'red'}}>折后价：&yen;12.00</div>
                        </div>
                        <div>
                            <div>卡余额：&yen;0.00</div>
                            <div>折扣率：80%</div>
                            <div>取衣时间：<input type="date" class="ui-date" value={this.state.time} onChange={e => this.setState({time:e.target.value})}/></div>
                        </div>
                    </div>
                    <div className='clothes-footer-right'>
                        <div><button type='button' className='e-btn middle high' onClick={this.cost}>收银</button></div>
                        <div>
                            <button type='button' className='e-btn' onClick={this.props.changeView} data-event='open_case'>开钱箱</button>&nbsp;
                            <button type='button' className='e-btn' onClick={this.recharge}>充值</button>&nbsp;
                            <button type='button' className='e-btn' onClick={this.dec}>卡扣款</button>
                        </div>
                    </div>
                </div>
            </Window>
        );
    }
}