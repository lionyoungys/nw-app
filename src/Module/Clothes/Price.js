/**
 * 工艺加价列表组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {value:''};
        this.handleClick = this.handleClick.bind(this);
        this.onChoice = this.onChoice.bind(this);
    }

    handleClick() {
        '' !== this.state.value
        &&
        'function' === typeof this.props.callback
        &&
        this.props.callback(this.state.value);
    }

    onChoice(e) {this.setState({value:e.target.innerText + '；' + this.state.value})}

    render() {
        if ('undefined' === typeof this.props.data || !(this.props.data instanceof Array)) return null;
        let html = this.props.data.map(obj =>
            <div className='clothes-price' key={obj.id}>
                <div><input type='checkbox' className='e-checkbox'/>&nbsp;{obj.name}</div>
                <div><input type='text' className='e-input'/>&nbsp;元</div>
                <div><input type='checkbox' className='e-checkbox'/>&nbsp;允许打折</div>
                <div>
                    <button type='button' className='e-btn'>取消</button>&nbsp;
                    <button type='button' className='e-btn'>确认</button>
                </div>
            </div>
        );
        return (
            <Window title='编辑衣物信息' height='454' width='648' onClose={this.props.onClose}>
                <div className='clothes-editor-top'>
                    <span>工艺加价</span>
                    <button type='button' className='e-btn' onClick={this.props.onClick}>确定</button>
                </div>
                <div className='clothes-problem-body'>{html}</div>
            </Window>
        );
    }
}