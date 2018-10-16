/**
 * 临时衣物组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Dish from '../../UI/Dish';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {name:'',price:'',day:'',discount:false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if ('' === this.state.name) return tool.ui.warn({msg:'临时衣物名称不能为空',callback:close => close()});
        if (isNaN(this.state.price)) return tool.ui.warn({msg:'价格不正确',callback:close => close()});
        if (isNaN(this.state.day)) return tool.ui.warn({msg:'交活天数不正确',callback:close => close()});
        'function' === typeof this.props.callback && this.props.callback(this.state);
    }

    render() {
        return (
            <Dish title='编辑衣物信息' height='315' width='362' onClose={this.props.onClose}>
                <div className='clothes-temp-top'>临时衣物</div>
                <div className='clothes-temp-body'>
                    <div>
                        <span>临时衣物名称：</span>
                        <input type='text' className='e-input' value={this.state.name} onChange={e => this.setState({name:e.target.value})}/>
                    </div>
                    <div>
                        <span>价格：</span>
                        <input type='text' className='e-input' value={this.state.price} onChange={e => this.setState({price:e.target.value})}/>&nbsp;元
                    </div>
                    <div>
                        <span>交活天数：</span>
                        <input type='text' className='e-input' value={this.state.day} onChange={e => this.setState({day:e.target.value})}/>&nbsp;天
                    </div>
                    <div style={{height:'auto', lineHeight:1}}><span></span>
                        <input 
                            type='checkbox' 
                            className='e-checkbox'
                            checked={this.state.discount ? 'checked' : ''} 
                            onClick={() => this.setState({discount:!this.state.discount})}
                        />&nbsp;允许打折
                    </div>
                </div>
                <div className='clothes-temp-footer'>
                    <button type='button' className='e-btn' onClick={this.props.onCancel}>取消</button>
                    &nbsp;&nbsp;
                    <button type='button' className='e-btn' onClick={this.handleClick}>确认</button>
                </div>
            </Dish>
        );
    }
}