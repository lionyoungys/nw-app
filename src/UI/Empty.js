/**
 * 空数据组件
 * @author Edwin Young
 * @desc className:追加的css类;style:添加的style
 */

import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);      
    }  
    render() {
        let className = 'ui-empty' + ('string' === typeof this.props.className ? (' ' + this.props.className) : '');
        return (<div className={className} style={this.props.style}>{this.props.children || '没有找到符合条件的数据'}</div>);
    }
}