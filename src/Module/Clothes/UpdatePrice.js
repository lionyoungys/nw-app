/**
 * 修改单价组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {value:''};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        'function' === typeof this.props.callback && this.props.callback(this.state);
    }

    render() {
        return (
            <Window title='编辑衣物信息' width='333' height='260' onClose={this.props.onClose}>
                <div className='clothes-temp-top'>单价修改</div>
                <div className='clothes-update-price'>
                    <div><span>请输入价格：</span><input type='text' value={this.state.value} onChange={e => this.setState({value:e.target.value})}/>&nbsp;&nbsp;元</div>
                    <div><span></span><span style={{color:'#ff0000'}}>价格不得低于***</span></div>
                </div>
                <div style={{textAlign:'right', marginRight:'16px'}}>
                    <button type='button' className='e-btn' onClick={this.handleClick}>确定</button>
                </div>
            </Window>
        );
    }
}