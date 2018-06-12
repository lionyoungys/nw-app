/**
 * 卡扣款组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {name:'', phone:'',balance:'',deduct:'',cause:''};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        'function' === typeof this.props.callback
        &&
        this.props.callback(this.state);
    }

    render() {
        return (
            <Window title='编辑衣物信息' height='420' width='533' onClose={this.props.onClose}>
                <div className='clothes-deduct-top'>
                    <div style={{marginBottom:'10px'}}>请客户打开微信公众号【速洗达洗衣平台】，出示付款码</div>
                    <input type='text' className='e-input' style={{width:'267px',marginRight:'16px'}}/>
                    <button type='button' className='e-btn' style={{marginRight:'43px'}}>查询</button>
                    <button type='button' className='e-btn'>读卡</button>
                </div>
                <div className='clothes-deduct-body'>
                    <div><span>姓名：</span>{this.state.name}</div>
                    <div><span>手机：</span>{this.state.phone}</div>
                    <div><span>余额：</span>{this.state.balance}</div>
                    <div>
                        <span>扣款额：</span>
                        <input type='text' className='e-input' value={this.state.deduct} onChange={e => this.setState({deduct:e.target.deduct})}/>&nbsp;&nbsp;元
                    </div>
                    <div>
                        <span>扣款原因：</span>
                        <textarea value={this.state.cause} onChange={e => this.setState({cause:e.target.value})}></textarea>
                    </div>
                    <div style={{textAlign:'right',marginRight:'17px',display:'block'}}>
                        <button type='button' className='e-btn' onClick={this.handleClick}>确认</button>
                    </div>
                </div>
            </Window>
        );
    }
}