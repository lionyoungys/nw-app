/**
 * 输入框组件
 * @author Edwin Young
 * @desc 
 */

import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <label className={'ui-input' + ('string' === typeof this.props.className ? (' ' + this.props.className) : '')} style={this.props.style}>
                <i className={'ui-input-' + ('string' === typeof this.props.icon ? this.props.icon : 'shop')}></i>
                <input type={this.props.type || 'text'} placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.onChange}/>
            </label>
        );
    }
}