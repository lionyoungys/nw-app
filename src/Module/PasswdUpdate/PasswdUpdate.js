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
    }; 
    render() {
        return(
                <LayerBox 
                    title='密码修改'
                    onClose={this.props.closeView}
                    onClick={this.props.closeView}
                    onCancel={this.props.closeView}
                    hasCancel={true}
                > {
                    <div className='passwdupdate'>
                        <div className='passwdupdateborder'>
                            <div>
                                <span>&emsp;&emsp;&emsp;原密码:</span><input type='text' className='inputborder'/>
                            </div>
                            <div className='passwdupdate_pass'>
                                <span>&emsp;&emsp;&emsp;新密码:</span><input type='text' className='inputborder'/>
                            </div>
                            <div >
                                <label>6位以上,且不能输入数字</label>
                            </div>
                            <div>
                                <span>再次输入密码:</span><input type='text' className='inputborder'/>
                            </div>

                         </div>
                    </div>
                    }
                </LayerBox>
        );
    }
}