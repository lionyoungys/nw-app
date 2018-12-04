/**
 * 新增满减活动/折扣活动、袋洗/件洗
 * ranchong
 */
import React, { Component } from 'react';
import './AppendCoupon.css'
import Select from '../../../UI/Select'
import Dish from '../../../UI/Dish'
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            couponName: '',//优惠券名称
            couponType: '', //优惠券类型         
            cloType: '', //衣物品类  
            cloCode: '',// 品类编码
            useRole: '', //使用规则
            useMer: '', //使用门店
            startime: '', //开始时间
            endtime: '', //结束时间
            totalPrice: '',//满减金额
            subPrice: '',//减去金额
            customMobile: '',//自定义手机号
            notiContent: '可减去',//可减去/可享受/可以洗
            notiContentUnit: '元',//元/折/袋/件
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {

        api.post('', {
            token: 'token'.getData(),
            phone_number: this.state.phone_number,
            mdesc: this.state.info,
            money_type: this.state.get_type,
        }, (res, ver) => {
            if (ver && res) {
                console.log(res);
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
        });
    }
    render() {
        return (
            <Dish title='新增促销活动' onClose={this.props.onClose} width="650" height="400">
            <div className="app_cou_content">
                <div className="app_cou_left">
                    <div> <span><b>*</b>活动名称:</span><input type='text' className='e-input' placeholder='请输入优惠券名称' value={this.state.couponName} onChange={e => this.setState({ couponName: e.target.value })} /></div>
                    <div> <span>促销类型:</span><Select option={['折扣券', '优惠券', '代金券']} value={this.state.couponType} onChange={obj => { console.log(obj); this.setState({ couponType: obj.value }) }} /></div>
                    <div> <span>衣物品类:</span><Select option={['上衣', '帽子', '下装']} value={this.state.cloType} onChange={obj => { console.log(obj); this.setState({ cloType: obj.value }) }} /></div>
                    <div> <span>品类编码:</span><input type='text' className='e-input e-error' placeholder={this.state.cloCode} disabled /></div>
                </div>
                <div className="app_cou_right">
                    <div> <span>使用门店:</span><Select option={['折扣券', '优惠券', '代金券']} value={this.state.useMer} onChange={obj => { console.log(obj); this.setState({ useMer: obj.value }) }} /></div>
                    <div> <span>开始时间:</span><input type='date' className='e-date' placeholder='请选择开始时间' /></div>
                    <div> <span>结束时间:</span><input type='date' className='e-date' placeholder='请选择结束时间' /></div>
                        <div> <span><b>*参数设置:</b></span>总价满足 <input type='number' className='e-input' style={{ width: '40px' }} value={this.state.totalPrice} onChange={e => this.setState({ totalPrice: e.target.value })} /> 元；
                    {this.state.notiContent} <input type='number' className='e-input' style={{ width: '40px' }} value={this.state.subPrice} onChange={e => this.setState({ subPrice: e.target.value })} /> {this.state.notiContentUnit}</div>
                </div>
                <div className="app_cou_offer_user">
                    <div style={{ height: '20px' }}>使用限制:</div>
                    <div >
                        <label><input type='checkbox' className='e-checkbox' value='111' onClick={e => console.log(e.target)} /> 不可与优惠券同时使用</label>
                        <label><input type='checkbox' className='e-checkbox' value='111' onClick={e => console.log(e.target)} /> 可以与优惠券同时使用</label>
                    </div>
                </div>
                <div className="app_cou_use_role">
                    <div>使用规则:</div>
                    <textarea className='e-textarea' placeholder='请输入优惠券使用规则' rows='10' cols='50' value={this.state.useRole} onChange={e => this.setState({ useRole: e.target.value })}></textarea>
                </div>
                <div className='app_cou_btn'>
                    <button type='button' className='e-btn' onClick={this.handleClick}>提交</button>
                </div>
            </div>
            </Dish>
        );
    }
}