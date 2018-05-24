/**
 * 会员卡消费界面
 * @author ran chong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
export default class extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        
        return (
 <div className="memberinfoupdate">
        <div className='memberinfoupdate_box'>
        <div className="memberinfoupdate_title">会员卡消费<span className="memberinfoupdate_close" onClick={this.props.closeView}></span></div>
        <div className="memberinfoupdate_border">
            <div>
            <span className='memberinfoupdate_leftdirection'>
           <span>卡号:</span>
           <input type='text' className='inputborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>密码1次:</span><input type='text' className='inputborder'/>
           </span>
            </div>
            <div>
        <span className='memberinfoupdate_leftdirection'>
           <span>卡类型:</span><input type='text' className='inputborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>密码2次:</span><input type='text' className='inputborder'/>
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
           <span>全国通用:</span>
           <input type='text' className='inputselectborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>客人类别:</span><input type='text' className='inputselectborder'/>
           </span>
            </div>
            <div>
            <span className='memberinfoupdate_inputleftline'>
           <span>顾客生日:</span>
           <input type='text' className='inputselectborder'/>
           </span>
            </div>
            <div>
            <span className='memberinfoupdate_leftdirection'>
           <span>卡金额:</span>
           <input type='text' className='inputborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>赠送额:</span><input type='text' className='inputborder'/>
           </span>
            </div>
            <div>
            <span className='memberinfoupdate_leftdirection'>
           <span>折扣率:</span>
           <input type='text' className='inputborder'/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>收银额:</span><input type='text' className='inputborder'/>
           </span>
            </div>
            <div>
        <span className='memberinfoupdate_inputrightline'>
           <span>有效期:</span><input type='text' className='inputborder'/>
        </span>
        </div>
        <div>
        <span className='memberinfoupdate_lefttopdirection'>
           <span>卡编号:</span><b >324324234234</b>
        </span>
        <span className='memberinfoupdate_rightdirection'>
           <span>付款方式:</span><input type='text' className='inputselectborder'/>
           </span>
        </div>
        <div>
            <div className='memberinfoupdate_rightbutton'>
                <button type='button' className='e-btn' >售卡</button>
                <button type='button' className='e-btn' onClick={this.props.closeView}>退出</button>
            </div>
        </div>
        </div>
        </div>
        </div>
        );
    }
}