/**
 * 品牌列表组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Dish from '../../UI/Dish';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {value:this.props.default || ''};
        this.handleClick = this.handleClick.bind(this);
        this.onChoice = this.onChoice.bind(this);
    }

    handleClick() {'function' === typeof this.props.callback && this.props.callback(this.state.value)}

    onChoice(e) {this.setState({value:e.target.innerText})}

    render() {
        if ('undefined' === typeof this.props.data || !(this.props.data instanceof Array)) return null;
        let html = this.props.data.map(obj =>
            <i key={obj.id} onClick={this.onChoice}>{obj.name}</i>
        );
        return (
            <Dish title='编辑衣物信息' onClose={this.props.onClose}>
                <div className='clothes-problem-top'>
                    <span>品牌：</span>
                    <input className='e-input' value={this.state.value} onChange={e => this.setState({value:e.target.value})}/>
                    <button type='button' className='e-btn' onClick={this.handleClick}>确定</button>
                </div>
                <div className='clothes-problem-body'>{html}</div>
            </Dish>
        );
    }
}