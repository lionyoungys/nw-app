/**
 * 会员信息修改界面组件
 * @author wang jun
 */
import React, {Component} from 'react';
import './MemberInfoUpdate.css';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
export default class extends Component {   
    constructor(props) {
        super(props);       
        this.state = {card_id:''}    
    }; 
    render() {
        return(
        <Window title='资料修改' width='634' height='388' onClose={this.props.closeView}>
        <div className="memberinfoupdate">
        <div className="recharge recharge-first">
            <div>
                        <label htmlFor='card_id' className='e-label'>卡号：</label>
                        <input id='card_id' className='e-input' type='text' value={this.state.card_id} onChange={e => this.setState({card_id:e.target.value})}/>&nbsp;
                        <button type='button' className='e-btn'>查询</button>&nbsp;
                        <button type='button' className='e-btn'>读卡</button>
            </div>
            <div><label className='e-label'>卡编号：</label>11874572954745</div>
            </div>
            <div className="memberinfoupdate_bottomborder">
            <div>
        <span className='memberinfoupdate_leftdirection'>
           <span>手机号:</span><input type='text' className='inputborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>密码1次:</span><input type='text' className='inputborder'/>
           </span>
        </div>
        <div>
        <span className='memberinfoupdate_leftdirection'>
           <span>姓名:</span><input type='text' className='inputborder'/>
        </span>
        <span className='memberinfoupdate_rightdirection'>
           <span>密码2次:</span><input type='text' className='inputborder'/>
           </span>
        </div>
        <div>
        <span className='memberinfoupdate_customerdirection'>
           <span>性别:</span><input type='text' className='inputselectborder'/>
        </span>
        <span className='memberinfoupdate_leftdirection'>
           <span>生日:</span><input type='text' className='inputborder'/>
        </span>
        <span className='memberinfoupdate_rightdirection'>
           <span>顾客单位:</span><input type='text' className='inputborder'/><img />
        </span>
        </div>
        <div>
        <span className='memberinfoupdate_longdirection'>
           <span>地址:</span><input type='text' className='inputlongborder'/>
        </span>
        </div>
       
        </div>
        <div>
            <div className='memberinfoupdate_button'>
                <button type='button' className='e-btn' >取消</button>
                <button type='button' className='e-btn' >保存</button>
            </div>
        </div>
        </div>
        </Window>    
    );
    }
}