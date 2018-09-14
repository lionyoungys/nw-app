/**
 * 开钱箱界面搭建
 * @author Edwin Young
 */

import React, {Component} from 'react';
import Window from '../UI/Window';

export default class extends Component {   
    constructor(props) {
        super(props);
        this.state = {passwd:''};
        this.style = {margin:'10px', height:'44px', lineHeight:'44px', border:'1px solid #8eb3e3', textAlign:'center'};
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };
    handleClick() {
        if ('' !== this.state.passwd) {
            api.post('verify_passwd', {token:'token'.getData(), pass:this.state.passwd}, (res, ver) => {
                if (ver) {
                    printer.openCashbox();
                    this.props.closeView();
                } else {
                    tool.ui.error({msg:'密码错误!', callback:close => close()});
                }
            });
        }
    }
    handleChange(e) {this.setState({passwd:e.target.value})}
    render() {
        return (
            <Window title='开钱箱' onClose={this.props.closeView} width='320' height='100'>
                <div style={this.style}>
                    <input type='password' value={this.state.passwd} placeholder='请输入密码' className='e-input' onChange={this.handleChange}/>
                    &emsp;
                    <button type='button' className='e-btn' onClick={this.handleClick}>确定</button>
                </div>
            </Window>
        );
    }
}