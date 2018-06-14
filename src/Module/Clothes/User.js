/**
 * 填写客户信息组件
 * @author Edwin Young
 */
import React from 'react';
import Window from '../../UI/Window';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addr:'string' === typeof this.props.addr ? this.props.addr : '', 
            phone:'string' === typeof this.props.phone ? this.props.phone : '', 
            name:'string' === typeof this.props.name ? this.props.name : '',
            number:'string' === typeof this.props.number ? this.props.number : ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if ('' == this.state.phone) return tool.ui.warn({msg:'手机不能为空', callback:close => close()});
        if ('' == this.state.name) return tool.ui.warn({msg:'姓名不能为空', callback:close => close()});
        'function' === typeof this.props.callback && this.props.callback(this.state);
    }
    render() {
        return (
            <Window title='填写客户信息' height='532' width='782' onClose={this.props.onClose}>
                <div className='clothes-user-top'>
                    <div>
                        <div>
                            <span><i>*</i>&nbsp;手机：</span>
                            <input
                                type='text'
                                className='e-input'
                                value={this.state.phone}
                                onChange={e => this.setState({phone:e.target.value})}
                            />
                            <span><i>*</i>&nbsp;姓名：</span>
                            <input
                                type='text'
                                className='e-input'
                                value={this.state.name}
                                onChange={e => this.setState({name:e.target.value})}
                            />
                            <span>卡号：</span>
                            <input
                                type='text'
                                className='e-input'
                                value={this.state.number}
                                style={{marginRight:'0'}}
                                onChange={e => this.setState({number:e.target.value})}
                            />
                        </div>
                        <div>
                            <span>地址：</span>
                            <input type='text' className='e-input' style={{width:'549px'}} value={this.state.addr} onChange={e => this.setState({addr:e.target.value})}/>
                        </div>
                    </div>
                    <button type='button' className='e-btn' onClick={this.handleClick}>确定</button>
                </div>
                <div className='clothes-user-main'>
                    <div><div>用户ID</div><div>姓名</div><div>手机</div><div>卡号</div><div>余额</div><div>消费金额</div><div>地址</div></div>
                    <div className='clothes-user-main-body'>
                        <div><div>用户ID</div><div>姓名</div><div>手机</div><div>卡号</div><div>余额</div><div>消费金额</div><div>地址</div></div>
                        <div><div>用户ID</div><div>姓名</div><div>手机</div><div>卡号</div><div>余额</div><div>消费金额</div><div>地址</div></div>
                        <div><div>用户ID</div><div>姓名</div><div>手机</div><div>卡号</div><div>余额</div><div>消费金额</div><div>地址</div></div>
                        <div><div>用户ID</div><div>姓名</div><div>手机</div><div>卡号</div><div>余额</div><div>消费金额</div><div>地址</div></div>
                        <div><div>用户ID</div><div>姓名</div><div>手机</div><div>卡号</div><div>余额</div><div>消费金额</div><div>地址</div></div>
                        <div><div>用户ID</div><div>姓名</div><div>手机</div><div>卡号</div><div>余额</div><div>消费金额</div><div>地址</div></div>
                        <div><div>用户ID</div><div>姓名</div><div>手机</div><div>卡号</div><div>余额</div><div>消费金额</div><div>地址</div></div>
                        <div><div>用户ID</div><div>姓名</div><div>手机</div><div>卡号</div><div>余额</div><div>消费金额</div><div>地址</div></div>
                        <div><div>用户ID</div><div>姓名</div><div>手机</div><div>卡号</div><div>余额</div><div>消费金额</div><div>地址</div></div>
                    </div>
                </div>
            </Window>
        );
    }
}