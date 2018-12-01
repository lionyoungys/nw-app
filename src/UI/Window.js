/**
 * 弹窗组件
 * @author Edwin Young
 * @desc 界面弹出层  title:标题;onBack:返回上级事件;onClose:关闭事件;children:内部内容;width:宽;height:高;className:追加自定义class;style:自定义样式;
 */

import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let style = this.props.style || {};
        if (this.props.padding) {
            if ('boolean' === typeof this.props.padding) {
                style.padding = '16px';
            } else {
                style.padding = this.props.padding;
            }
        }
        return (
            <div className='ui-window'>
                <div className='ui-window-head'>
                    <i onClick={this.props.onBack || this.props.onClose}>返回上一级</i>
                    {this.props.title}
                    <span onClick={this.props.onClose}></span>
                </div>
                <div className='ui-window-body'>
                    <div style={style}>{this.props.children}</div>
                </div>
            </div>
        );
    }
}