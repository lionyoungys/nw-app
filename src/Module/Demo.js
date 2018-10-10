/**
 * Demo组件
 * @author Edwin Young
 */

import React from 'react';
import Window from '../UI/Window';
import Dish from '../UI/Dish';
import Empty from '../UI/Empty';
import Page from '../UI/Page';
import Select from '../UI/Select';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dish:false, selectVal:'麻辣香锅'}
        this.handleClickForSuccess = this.handleClickForSuccess.bind(this);
        this.handleClickForError = this.handleClickForError.bind(this);
        this.handleCLickForWarn = this.handleCLickForWarn.bind(this);
        this.handleEat = this.handleEat.bind(this);
        this.handleEat2 = this.handleEat2.bind(this);
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
    handleEat() {
        tool.ui.error({title:'品尝失败', msg:'我姐竟然不给吃！', button:['吃另一盘'],callback:(close, value) => {
            console.log(value);
            close();
        }});
    }
    handleEat2() {
        tool.ui.warn({title:'偷偷摸摸搞事情中...', msg:'尝尝麻辣小龙虾？', button:['高冷离开', '低调品尝'],callback:(close, value) => {
            console.log(value);
            close();
        }});
    }
    render() {
        return (
            <Window title='偷窥厨房的窗口' onClose={this.props.closeView} padding={true}>
                <button type='button' className='e-btn' onClick={this.handleClickForSuccess}>成功弹窗</button>&nbsp;
                <button type='button' className='e-btn' onClick={this.handleCLickForWarn}>警告弹窗</button>&nbsp;
                <button type='button' className='e-btn' disabled>样式禁用</button>&nbsp;
                <button type='button' className='e-btn-b' onClick={this.handleClickForError}>失败弹窗</button><br/>
                <button type='button' className='e-btn' onClick={() => this.setState({dish:true})}>盘子里的菜</button><br/>
                <label><input type='checkbox' className='e-checkbox' value='111' onClick={e => console.log(e.target)}/> 你好</label><br/>
                <label><input type='radio' className='e-radio' value='222' name='r'/> 你好</label>&emsp;
                <label><input type='radio' className='e-radio' value='333' name='r'/> 不好</label><br/>
                <input type='text' className='e-input' placeholder='输入内容'/>&emsp;<input type='text' className='e-input e-error' placeholder='输入内容'/><br/>
                <Select option={['麻辣香锅', '水煮鱼', '西芹淮山炒百合']} value={this.state.selectVal} onChange={obj => this.setState({selectVal:obj.value})}/><br/>
                {
                    this.state.dish 
                    && 
                    <Dish title='盘子' onClose={() => this.setState({dish:false})}>
                        <div className='e-red'>麻辣小龙虾</div>
                        <div className='e-blue'>三文鱼北极贝刺身拼盘</div>
                        <button type='button' className='e-btn-b' onClick={this.handleEat}>尝尝刺身</button>
                        &nbsp;
                        <button type='button' className='e-btn-b' onClick={this.handleEat2}>尝尝小龙虾</button>
                    </Dish>
                }
                <Page/>
                <Empty>暂无数据</Empty>
           </Window>
        );
    }
}