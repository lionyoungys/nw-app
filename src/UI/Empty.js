/**
 * 空数据组件
 * @author Edwin Young
 */

import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);      
    }  
    render() {       
        return (<div className='ui-empty'>{this.props.children || '没有找到符合条件的数据'}</div>);
    }
}