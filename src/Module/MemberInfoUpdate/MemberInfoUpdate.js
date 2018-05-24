/**
 * 会员信息修改界面组件
 * @author wang jun
 */
import React, {Component} from 'react';
import './MemberInfoUpdate.css';
export default class extends Component {   
    constructor(props) {
        super(props);           
    }; 
    render() {
        return(
        <div className="memberinfoupdate">
        <div className='memberinfoupdate_box'>
        <div className="memberinfoupdate_title">会员信息修改<span className="memberinfoupdate_close" onClick={this.props.closeView}></span></div>
        <div className="memberinfoupdate_border">
            <div>
            <span className='memberinfoupdate_leftdirection'>
           <span>卡号:</span>
           <input type='text' className='inputborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>发电卡:</span><input type='text' className='inputborder'/>
           </span>
            </div>
            <div>
        <span className='memberinfoupdate_leftdirection'>
           <span>卡类型:</span><input type='text' className='inputselectborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>售卡日期:</span><input type='text' className='inputselectborder'/>
           </span>
        </div>
        <div>
        <span className='memberinfoupdate_leftdirection'>
           <span>顾客姓名:</span><input type='text' className='inputborder'/>
        </span>
        <span className='memberinfoupdate_rightdirection'>
           <span>性别:</span><input type='text' className='inputselectborder'/>
           </span>
        </div>
        <div>
        <span className='memberinfoupdate_leftdirection'>
           <span>顾客电话:</span><input type='text' className='inputborder'/>
        </span>
        <span className='memberinfoupdate_rightdirection'>
           <span>证件号码:</span><input type='text' className='inputborder'/>
           </span>
        </div>
        <div>
        <span className='memberinfoupdate_longdirection'>
           <span>地址:</span><input type='text' className='inputlongborder'/>
        </span>
        </div>
        
        <div>
        <span className='memberinfoupdate_customerdirection'>
           <span>顾客单位:</span><input type='text' className='inputborder'/>
        </span>
        </div>
        <div>
            <span className='memberinfoupdate_leftdirection'>
           <span>使用区域:</span>
           <input type='text' className='inputselectborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>客人类别:</span><input type='text' className='inputselectborder'/>
           </span>
            </div>
            <div>
            <span className='memberinfoupdate_leftdirection'>
           <span>顾客生日:</span>
           <input type='text' className='inputselectborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>原折扣:</span><input type='text' className='inputborder'/>
           </span>
            </div>
            <div>
            <span className='memberinfoupdate_leftdirection'>
           <span>积分:</span>
           <input type='text' className='inputthreeborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>&nbsp;充值额:</span><input type='text' className='inputthreeborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>&nbsp;&nbsp;圈额:</span><input type='text' className='inputthreeborder'/>
           </span>
            </div>
            <div>
            <span className='memberinfoupdate_leftdirection'>
           <span>消费额:</span>
           <input type='text' className='inputthreeborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>充值次数:</span><input type='text' className='inputthreeborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>使用次数:</span><input type='text' className='inputthreeborder'/>
           </span>
            </div>
            <div>
            <span className='memberinfoupdate_leftdirection'>
           <span>卡金额:</span>
           <input type='text' className='inputborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>有效期:</span><input type='text' className='inputborder'/>
           </span>
            </div>
            <div>
            <span className='memberinfoupdate_leftdirection'>
           <span>原密码:</span>
           <input type='text' className='inputborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>新密码:</span><input type='text' className='inputborder'/>
           </span>
            </div>
            <div>
        <span className='memberinfoupdate_customerdirection'>
           <span>卡编号:</span><input type='text' className='inputborder'/>
        </span>
        </div>
        <div>
            <div className='memberinfoupdate_button'>
                <button type='button' className='e-btn'>读卡</button>
                <button type='button' className='e-btn' readOnly>修改</button>
                <button type='button' className='e-btn' readOnly>改卡密码</button>
                <button type='button' className='e-btn' onClick={this.props.closeView}>退出</button>
            </div>
        </div>
        </div>
        </div>
        </div>);
    }
}