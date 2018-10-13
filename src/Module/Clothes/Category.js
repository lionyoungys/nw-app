/**
 * 衣物类别组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Dish from '../../UI/Dish';

export default class extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        'function' === typeof this.props.callback && this.props.callback(e.target.dataset.index);
    }

    render() {
        if ('undefined' === typeof this.props.data || !(this.props.data instanceof Array)) return null;
        let html = this.props.data.map((obj, index) =>
            <i key={obj.id} data-index={index} onClick={this.handleClick}>{obj.name}</i>
        );
        return (
            <Dish title='编辑衣物信息' height='454' width='648' onClose={this.props.onClose}>
                <div className='clothes-editor-top'>
                    <span>衣物类别</span>
                    <button type='button' className='e-btn' onClick={this.props.onClick}>临时衣物</button>
                </div>
                <div className='clothes-editor-body'>{html}</div>
            </Dish>
        );
    }
}