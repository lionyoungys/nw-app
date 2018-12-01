/**
 * 衣物列表组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {value:''};
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(e) {
        'function' === typeof this.props.callback && this.props.callback(e.target.dataset.index || e.target.parentNode.dataset.index);
    }

    handleChange(e) {this.setState({value:e.target.value})}

    render() {
        if ('undefined' === typeof this.props.data || !(this.props.data instanceof Array)) return null;
        let html = this.props.data.map((obj, index) => {
            if (
                '' == this.state.value 
                || 
                -1 !== obj.item_name.indexOf(this.state.value)
                ||
                -1 !== obj.help_num.indexOf(this.state.value)
            ) {
                return (
                    <i key={obj.id} data-index={index} onClick={this.handleClick}>{obj.item_name}</i>
                );
            }
        });
        return (
            <Window title='编辑衣物信息' height='454' width='648' onClose={this.props.onClose}>
                <div className='clothes-editor-top'>
                    <span>{this.props.category}</span>
                    <div>
                        <input type='text' className='e-input' placeholder='助记码/名称' value={this.state.value} onChange={this.handleChange}/>
                        &nbsp;&nbsp;
                        <button type='button' className='e-btn' onClick={this.props.onCancel}>取消</button>
                    </div>
                </div>
                <div className='clothes-editor-body'>{html}</div>
            </Window>
        );
    }
}