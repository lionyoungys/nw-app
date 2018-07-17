/**
 *无数据组件
 * @author fanyerong
 *
 */

import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);      
    }  
    render() {       
        return (
            <tr id="no-data"  style={{borderBottom:'none'}}><td id='no-data-noti'>没有找到符合条件的数据</td></tr>
        );
    }
}