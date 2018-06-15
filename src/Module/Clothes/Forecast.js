/**
 * 洗后预估列表组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {value:this.props.default || ''};
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
            <i key={obj.id} onClick={this.onChoice}>{obj.forecast}</i>
        );
        return (
            <Window title='编辑衣物信息' height='454' width='648' onClose={this.props.onClose}>
                <div className='clothes-problem-top'>
                    <span>颜色：</span>
                    <input className='e-input' value={this.state.value} onChange={e => this.setState({value:e.target.value})}/>
                    <button type='button' className='e-btn' onClick={this.handleClick}>确定</button>
                </div>
                <div className='clothes-problem-body'>{html}</div>
            </Window>
        );
    }
}