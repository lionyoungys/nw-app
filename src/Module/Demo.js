/**
 * Demo组件
 * @author Edwin Young
 */

import React from 'react';
import Window from '../UI/Window';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    ask() {
        tool.ui.ask({callback:(close, event) => {
            console.log(event);
            close();    //点击按钮或关闭符号时关闭弹窗
        }});
    }
    ask2() {
        tool.ui.ask({info:'Q：如何重置密码？<br/>A：如果您是店员，请联系店长重置密码，<br/>如果您是店长请点击找回密码', callback:(close, event) => {
            console.log(event);
            close();    //点击按钮或关闭符号时关闭弹窗
        }});
    }
    error() {
        tool.ui.error({callback:(close, event) => {
            close();
        }});
    }
    error2() {
        tool.ui.error({title:'自定义标题',msg:'自定义弹出错误内容',button:'点我啦！',callback:(close, event) => {
            close();
        }});
    }
    warn() {
        tool.ui.warn({callback:(close, event) => {
            close();
        }}); 
    }

    success() {
        tool.ui.success({callback:(close, event) => {
            close();
        }}); 
    }
    render() {
        return (
            <Window title='测试窗口' onClose={this.props.closeView}>
                正常按钮样式：<button type='button' className='e-btn'>确认</button>
                <br/>
                禁用按钮样式：<button type='button' className='e-btn' readOnly>取消</button>
                <br/>
                <button type='button' className='e-btn' onClick={this.ask}>询问弹框</button>
                <button type='button' className='e-btn' onClick={this.error}>错误弹框</button>
                <button type='button' className='e-btn' onClick={this.warn}>警告弹框</button>
                <button type='button' className='e-btn' onClick={this.success}>成功弹框</button>
                <br/>
                弹窗并附带提示信息：<button type='button' className='e-btn' onClick={this.ask2}>询问弹框</button>
                <br/>
                自定义弹窗信息及标题和按钮：<button type='button' className='e-btn' onClick={this.error2}>错误弹框</button>
            </Window>
        );
    }
}