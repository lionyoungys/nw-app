/**
 * 密码修改
 * @author wangjun
 */
import React, {Component} from 'react';
import LayerBox from '../../UI/LayerBox';
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
                <LayerBox 
                    title='密码修改'
                    onClose={this.props.closeView}
                    onClick={this.changeSave}
                    onCancel={this.props.closeView}
                    hasCancel={true}
                > {
                    <div className='passwdupdate'>
                        <div className='passwdupdateborder'>
                            <div>
                                <span>&emsp;&emsp;&emsp;原密码:</span><input type='text' className='inputborder' value={this.state.oldPas} onChange={e => this.setState({ oldPas: e.target.value })}/>
                            </div>
                            <div className='passwdupdate_pass'>
                                <span>&emsp;&emsp;&emsp;新密码:</span><input type='text' className='inputborder' value={this.state.newPasOne} onChange={e => this.setState({ newPasOne: e.target.value })}/>
                            </div>
                            <div >
                                <label>6位以上，且不能为纯数字</label>
                            </div>
                            <div>
                                <span>再次输入密码:</span><input type='text' className='inputborder' value={this.state.newPasTwo} onChange={e => this.setState({ newPasTwo: e.target.value })}/>
                            </div>

                         </div>
                    </div>
                    }
                </LayerBox>
        );
    }
}