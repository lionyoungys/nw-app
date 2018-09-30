/**
 * 盘子组件
 * @author Edwin Young
 * @desc 弹出来盛饭菜使用,用于二级界面  title:标题;onClose:关闭事件;children:内部内容;width:宽;height:高;className:追加自定义class;style:自定义样式;
 */

import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let className = 'ui-dish'
        ,   style = {};
        if ('string' === typeof this.props.className) className += (' ' + this.props.className);
        if (tool.isObject(this.props.style)) {
            for (var k in this.props.style) {
                style[k] = this.props.style[k];
            }
        }
        if (!isNaN(this.props.width)) {
            style.width = this.props.width + 'px';
            style.marginLeft = (-1 * this.props.width / 2) + 'px';
        }
        if (!isNaN(this.props.height)) {
            style.height = this.props.height + 'px';
            style.marginTop = (-1 * this.props.height / 2) + 'px';
        }
        return (
            <div className='e-layer-bg'>
                <div className={className} style={style}>
                    <div><span>{this.props.title}</span><i onClick={this.props.onClose}></i></div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}