/**
 * 选项框组件
 * @author Edwin Young
 * @desc 
 */

import React, {Component} from 'react';
export default class extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        'function' === typeof this.props.onClick && this.props.onClick({value:e.target.innerText, param:this.props.param, checked:this.props.checked});
    }

    render() {
        return (
            <span
                className={
                    'ui-option ui-option-'
                    +
                    ('string' === typeof this.props.icon ? this.props.icon : 'car')
                    +
                    ('string' === typeof this.props.className ? (' ' + this.props.className) : '')
                }
                style={this.props.style}
                data-checked={this.props.checked ? 'checked' : ''}
            ><span onClick={this.handleClick}></span><i></i>{this.props.value}</span>
        );
    }
}