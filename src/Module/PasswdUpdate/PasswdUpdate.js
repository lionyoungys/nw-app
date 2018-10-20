/**
 * 密码修改
 * @author wangjun
 */
import React, {Component} from 'react';
import Dish from '../../UI/Dish';

export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state={
            oldPas:'',
            newPasOne:'',
            newPasTwo:'',
        }   
        this.changeSave = this.changeSave.bind(this)
    }; 
    changeSave() {
        if (this.state.oldPas == '' || this.state.newPasOne == '' || this.state.newPasTwo == '') {
            return tool.ui.error({
                msg: '密码不能为空！', callback: (close, event) => {
                    close();
                }
            });
        }
        if(this.state.newPasOne != this.state.newPasTwo){

            return tool.ui.error({
                 msg: '新密码两次输入不一致！', callback: (close, event) => {
                    close();
                }
            });
        }
        if (this.state.newPasOne.length < 6) {
            return tool.ui.error({msg:'密码必须大于等于6位',callback:(close) => {
                 close();
             }});
         }
         if (!isNaN(this.state.newPasOne)) {
             return tool.ui.error({msg:'密码不能为纯数字',callback:(close) => {
                 close();
             }});
         }
        api.post('changePas', { token: 'token'.getData(), old_pass: this.state.oldPas, new_pass: this.state.newPasOne}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                tool.ui.success({
                    callback: (close, event) => {
                        close();
                    }
                });
            } else {
                console.log(res.msg);
                tool.ui.error({
                    msg: res.msg, callback: (close) => {
                        close();
                    }
                    });
                }
            }
        );
    }
    render() {
        return(
            <Dish title='密码修改'onClose={this.props.closeView} width='328' height='242' icon='icons-passwd.png'>
                <div style={{padding:'14px 30px 0 0',textAlign:'right'}}>
                    <div className='e-input-row'>
                        <label>&emsp;&emsp;&emsp;原密码：
                            <input placeholder='请输入原始密码' type='password' className='e-input' value={this.state.oldPas} onChange={e => this.setState({ oldPas: e.target.value })}/>
                        </label>
                    </div>
                    <div className='e-input-row'>
                        <label>
                            &emsp;&emsp;&emsp;新密码：
                            <input placeholder='6位以上，且不能为纯数字' type='password' className='e-input' value={this.state.newPasOne} onChange={e => this.setState({ newPasOne: e.target.value })}/>
                        </label>
                    </div>
                    <div className='e-input-row' style={{marginBottom:'22px'}}>
                        <label>
                            再次输入密码：
                            <input placeholder='请再次确认输入密码' type='password' className='e-input' value={this.state.newPasTwo} onChange={e => this.setState({ newPasTwo: e.target.value })}/>
                        </label>
                    </div>
                    <div className='e-text-r'>
                        <button type='button' className='e-btn-b' onClick={this.props.closeView}>取消</button>
                        &emsp;
                        <button type='button' className='e-btn' onClick={this.changeSave}>修改</button>
                    </div>
                </div>
            </Dish>
        );
    }
}