/**
 * 弹窗组件
 * @author Edwin Young
 * @desc 界面弹出层  title:标题;onClose:关闭事件;children:内部内容
 */

import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='e-layer-bg'>
                <div className='ui-window'>
                    <div>{this.props.title}<i onClick={this.props.onClose}></i></div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}