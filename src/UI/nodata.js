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
            <div className="no-data">没有找到符合条件的数据</div>
        );
    }
}