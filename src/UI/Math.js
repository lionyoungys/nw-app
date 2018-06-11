/**
 * 数学处理组件
 * @author Edwin Young
 * @desc 加减框,
 */

import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span className='ui-math'>
                <i className='ui-math-sub' onClick={this.props.onSub}></i>
                {this.props.children}
                <i className='ui-math-add' onClick={this.props.onAdd}></i>
            </span>
        );
    }
}