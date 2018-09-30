/**
 * Demo组件
 * @author Edwin Young
 */

import React from 'react';
import Window from '../UI/Window';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.handleClickForSuccess = this.handleClickForSuccess.bind(this);
        this.handleClickForError = this.handleClickForError.bind(this);
        this.handleCLickForWarn = this.handleCLickForWarn.bind(this);
    }
    handleClickForSuccess() {
        tool.ui.success({callback:close => close()})
    }
    handleClickForError() {
        tool.ui.error({callback:close => close()});
    }
    handleCLickForWarn() {
        tool.ui.warn({callback:close => close()});
    }
    render() {
        return (
            <Window title='测试窗口' onClose={this.props.closeView}>
                <button type='button' className='e-btn' onClick={this.handleClickForSuccess}>成功弹窗</button>&nbsp;
                <button type='button' className='e-btn' onClick={this.handleCLickForWarn}>警告弹窗</button>&nbsp;
                <button type='button' className='e-btn' disabled>样式禁用</button>&nbsp;
                <button type='button' className='e-btn-b' onClick={this.handleClickForError}>失败弹窗</button><br/>
                <input type='checkbox' className='e-checkbox' value='111' onClick={e => console.log(e.target)}/> 你好 <br/>
                <input type='radio' className='e-radio' value='222' name='r'/> 你好 &emsp;
                <input type='radio' className='e-radio' value='333' name='r'/> 不好 <br/>
                <input type='text' className='e-input' placeholder='输入内容'/><br/>
           </Window>
        );
    }
}