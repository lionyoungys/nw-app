/**
 * 修改单价组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.minPrice = ( (Math.floor(this.props.discount * 10) * this.props.price) / 100 );
    }
    handleChange(e) {
        let value = e.target.value;
        if (isNaN(value) || value > this.minPrice) return;
        this.setState({value:value})
    }
    handleClick() {
        'function' === typeof this.props.callback && this.props.callback(this.state.value);
    }

    render() {
        return (
            <Window title='编辑衣物信息' width='333' height='260' onClose={this.props.onClose}>
                <div className='clothes-temp-top'>单价修改</div>
                <div className='clothes-update-price'>
                    <div><span>请输入价格：</span><input type='text' value={this.state.value} onChange={this.handleChange}/>&nbsp;&nbsp;元</div>
                    <div><span></span><span style={{color:'#ff0000'}}>价格不得低于{this.minPrice}</span></div>
                </div>
                <div style={{textAlign:'right', marginRight:'16px'}}>
                    <button type='button' className='e-btn' onClick={this.handleClick}>确定</button>
                </div>
            </Window>
        );
    }
}