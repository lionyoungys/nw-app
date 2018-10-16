/**
 * 密码修改
 * @author wangjun
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import './PasswdUpdate.css';

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
                <Window title='密码修改'onClose={this.props.closeView}>
                    <div className='passwdupdate'>
                        <div className='passwdupdateborder'>
                            <div>
                                <span>&emsp;&emsp;&emsp;原密码:&nbsp;</span><input type='password' className='e-input' value={this.state.oldPas} onChange={e => this.setState({ oldPas: e.target.value })}/>
                            </div>
                            <div className='passwdupdate_pass'>
                                <span>&emsp;&emsp;&emsp;新密码:&nbsp;</span><input type='password' className='e-input' value={this.state.newPasOne} onChange={e => this.setState({ newPasOne: e.target.value })}/>
                            </div>
                            <div >
                                <label>6位以上，且不能为纯数字</label>
                            </div>
                            <div>
                                <span>再次输入密码:&nbsp;</span><input type='password' className='e-input' value={this.state.newPasTwo} onChange={e => this.setState({ newPasTwo: e.target.value })}/>
                            </div>
                            <div style={{padding:'20px 0 0 105px'}}>
                                <button type='button' className='e-btn' onClick={this.changeSave}>确认</button>&emsp;
                                <button type='button' className='e-btn-b' onClick={this.props.closeView}>取消</button>
                            </div>
                         </div>
                    </div>
                </Window>
        );
    }
}