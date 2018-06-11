/**
 * 收衣界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import './clothes.css';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {phone:'',name:'',number:'',addr:''};
        this.M1read = this.M1read.bind(this);    //读卡
        this.add = this.add.bind(this);    //添加衣物
    }

    M1read() {

    }
    add() {

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
                <div className='clothes-footer'></div>
            </Window>
        );
    }
}