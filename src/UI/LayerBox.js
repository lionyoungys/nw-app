/**
 * 弹窗容器组件
 * @author Edwin Young
 * @desc 界面弹出层  title:标题;onClose:关闭事件;onClick:点击按钮事件;children:内部内容;button:'按钮内容';hasCancel:是否有取消按钮;onCancel:取消按钮点击事件;button2:取消按钮内容
 */

import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {tool.ui.center(this.box)}

    render() {
        return (
            <div className='e-layer-bg'>
                <div className='ui-layer-box' ref={box => this.box = box}>
                    <div>{this.props.title}<i onClick={this.props.onClose}></i></div>
                    <div>{this.props.children}</div>
                    <div>
                        <button
                            type='button'
                            className='e-btn'
                            style={{marginRight:'16px',display:(this.props.hasCancel ? null : 'none')}}
                            onClick={this.props.onCancel}
                        >{'string' === typeof this.props.button2 ? this.props.button2 : '取消'}</button>
                        <button
                            type='button'
                            className='e-btn'
                            onClick={this.props.onClick}
                        >{'string' === typeof this.props.button ? this.props.button : '确定'}</button>
                    </div>
                </div>
            </div>
        );
    }
}