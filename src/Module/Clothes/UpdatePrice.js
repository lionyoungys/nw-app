/**
 * 修改单价组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Dish from '../../UI/Dish';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(e) {
        let value = e.target.value;
        if (isNaN(value)) return;
        this.setState({value:value})
    }
    handleClick() {
        let value = parseFloat(this.state.value)
        ,   min_price = this.props.min_price;
        if (isNaN(min_price)) min_price = 0;
        '' !== value && value >= min_price && 'function' === typeof this.props.callback && this.props.callback(value);
    }

    render() {
        return (
            <Dish title='编辑衣物信息' width='333' height='260' onClose={this.props.onClose}>
                <div className='clothes-temp-top'>单价修改</div>
                <div className='clothes-update-price'>
                    <div><span>请输入价格：</span><input type='text' value={this.state.value} onChange={this.handleChange} className='e-input'/>&nbsp;元</div>
                    <div><span></span><span style={{color:'#ff0000'}}>价格不得低于{this.props.min_price}</span></div>
                </div>
                <div style={{textAlign:'right', marginRight:'16px'}}>
                    <button type='button' className='e-btn' onClick={this.handleClick}>确定</button>
                </div>
            </Dish>
        );
    }
}