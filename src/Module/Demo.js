/**
 * Demo组件
 * @author Edwin Young
 */

import React from 'react';
import Window from '../UI/Window';
import {Table} from '../UI/Table';
import LayerBox from '../Ui/LayerBox';
import SelectSearch from '../UI/SelectSearch';
import Select from '../UI/Select';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show:false, show2:false}
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
    btn() {
        tool.ui.success({callback:(close, event) => {
            close();
        }}); 
    }
    render() {
        return (
            <Window title='测试窗口' onClose={this.props.closeView} width='600' height='600'>
                正常按钮样式：
                <button type='button' className='e-btn'>确认</button>
                <button type='button' className='e-btn middle'>确认</button>
                <button type='button' className='e-btn middle high'>确认</button>
                <button type='button' className='e-btn large'>确认</button>
                <br/>
                禁用按钮样式：
                <button type='button' className='e-btn' readOnly>取消</button>
                <button type='button' className='e-btn middle' readOnly>取消</button>
                <button type='button' className='e-btn large' readOnly>取消</button>
                <br/>
                <button type='button' className='e-btn' onClick={this.ask}>询问弹框</button>
                <button type='button' className='e-btn' onClick={this.error}>错误弹框</button>
                <button type='button' className='e-btn' onClick={this.warn}>警告弹框</button>
                <button type='button' className='e-btn' onClick={this.success}>成功弹框</button>
                <br/>
                弹窗并附带提示信息：<button type='button' className='e-btn' onClick={this.ask2}>询问弹框</button>
                <br/>
                自定义弹窗信息及标题和按钮：<button type='button' className='e-btn' onClick={this.error2}>错误弹框</button>
                <br/>
                弹出层容器<button type='button' className='e-btn' onClick={() => this.setState({show:true})}>容器弹框</button>
                弹出层容器2<button type='button' className='e-btn' onClick={() => this.setState({show2:true})}>容器取消</button>
                <br/>
                <SelectSearch placeholder='测试搜索' value='23333' option={['手机号','用户名','密码']} callback={(value, select) => {console.log(value);console.log(select)}}/>
                <Select option={['手机号','用户名','密码']} selected='密码' onChange={value => console.log(value)}/>
                &emsp;
                <Select option={['手机号','用户名','密码']} selected='密码' readOnly={true} onChange={value => console.log(value)}/>
                <div>&emsp;结束时间：<input type="date" className='ui-date' value={this.state.enddate} onChange={e => this.setState({ enddate: e.target.value })} /></div>

                <div style={{padding:'30px'}}></div>
                <label className='e-label'>label样式：</label><input type='text' className='e-input'/>
                <div style={{padding:'30px'}}></div>
                <input type='checkbox' className='e-checkbox'/>多选框样式
                <Table border={true} full={true}/>
                {
                    this.state.show
                    &&
                   
                    <LayerBox title='测试标题' onClose={() => this.setState({show:false})} onClick={() => this.setState({show:false})}>
                        {
                            <div className='ui-table'>
                            <div className='margintop'>
                            <span >姓名:</span><input  type='text'/>
                            </div>
                             <div>
                             <span>手机号:</span><input type='text'/>
                             </div>
                              <div>
                              <span>密码:</span><input type='text'/>
                              </div>
                              <div>
                                  <span className='passlimit'>密码必须6位以上，且不能为纯数字</span>
                                  </div>
                               <div  className='jurisdiction'>
                               <span >权限:</span><input type='text' />
                               </div>
                               </div>
                    }
                     
                    </LayerBox>
                   
                }
                {
                    this.state.show2
                    &&
                    <LayerBox
                        title='测试标题'
                        onClose={() => this.setState({show2:false})}
                        onClick={() => this.setState({show2:false})}
                        onCancel={() => this.setState({show2:false})}
                        hasCancel={true}
                    ></LayerBox>
                }
           </Window>
        );
    }
}