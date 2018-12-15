/**
 * 新增优惠券、折扣券样式通用/修改优惠券
 * ranchong
 */
import React, { Component } from 'react';
import './AppendCoupon.css'
import Dish from '../../../UI/Dish'
import Select from '../../../UI/Select'
import MultiSelect from '../../../UI/MultiSelect';
import Clothes from '../../../UI/Clothes';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cid:'',//优惠券id
            couponName: '',//优惠券名称
            couponType: '现金券', //优惠券类型         
            cloSelTypeArr: [], //已选择衣物品类 
            getType:'6',
            cloTypeArr:[], 
            merArr:[],
            merNameArr: [],
            merSelectArr:[],
            useRole: '', //使用规则
            startime: tool.date('Y-m-d'), //开始时间
            endtime: tool.date('Y-m-d'), //结束时间
            totalPrice:'',//满减金额
            subPrice: '',//减去金额
            customMobile:'',//自定义手机号
            notiContent:'可减去',//可减去/可享受
            notiContentUnit: '元',//元/折
            SelectCloShow:false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.changeCouponType = this.changeCouponType.bind(this);
        this.selectMemPart = this.selectMemPart.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
    }
    componentDidMount() {

        let cid =  this.props.data || '';
        if (cid) {
            this.setState({cid:cid});
        }
        console.log(cid,1111);
        api.post(cid ?'CouponDetail' :'addCoupon_getDate', {
            token: 'token'.getData(),
            cid:cid,
        }, (res, ver) => {
            console.log(res)
            if (ver && res) {
                
                if (cid) {//存在优惠券id
                    
                    //根据选择店铺id进行处理
                    let selectMerArrID = res.result.mids;
                    let selectMerArr = [];
                    let MerArr = res.result.merchant;
                    if (selectMerArrID.length) {
                        for (let index = 0; index < selectMerArrID.length; index++) {
                            let sel_index = selectMerArrID[index].inObjArray(MerArr, 'id');
                            if (-1 != sel_index) selectMerArr.push(MerArr[sel_index]);
                        }
                    }
                    console.log(selectMerArr);
                    this.setState({
                        couponName: res.result.coupon.name,
                        couponType: res.result.coupon.type == '1' ? "现金券":'折扣券',
                        cloSelTypeArr: res.result.item,
                        cloTypeArr: res.result.item_name,
                        merArr: MerArr,
                        merNameArr: MerArr.typeArray('mname'),
                        merSelectArr: selectMerArr,
                        startime: tool.date('Y-m-d', res.result.coupon.start_time),
                        endtime: tool.date('Y-m-d', res.result.coupon.end_time),
                        totalPrice: res.result.coupon.full_money,
                        subPrice: res.result.coupon.type == '1' ? res.result.coupon.money : res.result.coupon.discount * 0.1,
                        notiContent: res.result.coupon.type == '1' ?'可减去':'可享受',//可减去/可享受
                        notiContentUnit: res.result.coupon.type == '1' ? '元' : '折',//元/折
                        customMobile: res.result.coupon.user_mobile,
                        getType: res.result.coupon.send_type,
                        useRole: res.result.coupon.remarks, 
                    })

                }else{
                    this.setState({ cloTypeArr: res.result.item_name, merArr: res.result.merchant, merNameArr: res.result.merchant.typeArray('mname')})
                }
            }
        });

    }
    changeCouponType(obj){
        let type = obj.value;
        this.setState({ couponType: type});
        if (type == '现金券') {

            this.setState({ notiContent:'可减去',notiContentUnit:'元'});
        }else{

            this.setState({ notiContent: '可享受', notiContentUnit: '折'});
        }
    }
    selectMemPart(e) {
        console.log(e.target.value)
        if (e.target.value != this.state.getType) {
            var u = e.target.value;
            console.log(u)
            this.setState({ getType: u })
            if (e.target.value != '0') {//非自定义
                this.setState({ customMobile: '' })
            }
        }
    }
    //选择店铺处理
    handleChoose(e) {
        let value = e.target.innerText;
        if (e.target.dataset.checked == 'checked') {
            let index = value.inObjArray(this.state.merSelectArr, 'mname');
            if (-1 != index) this.state.merSelectArr.splice(index, 1);
        } else {
            let disIndex = value.inObjArray(this.state.merArr, 'mname');
            if (-1 != disIndex) this.state.merSelectArr.push(this.state.merArr[disIndex]);
        }
        this.setState({ merSelectArr: this.state.merSelectArr });
    }
    handleClick() {

        if (this.state.couponName == '' || this.state.merSelectArr.length == 0 || this.state.cloSelTypeArr.length == 0 || this.state.startime == '' || this.state.endtime == '' || this.state.totalPrice == '' || this.state.subPrice == '' || this.state.get_type =='') {
            return tool.ui.error({
                msg: '内容不能为空！', callback: (close, event) => {
                    close();
                }
            });
        } 
        if (this.state.subPrice * 1 ==0) {
            return tool.ui.error({
                msg: '参数设置可享金额/折扣大于0！', callback: (close, event) => {
                    close();
                }
            });
        }
        let arr = this.state.merSelectArr.typeArray('id');
        console.log(this.state.cid);
        var pram = {
            token: 'token'.getData(),
            cid: this.state.cid ? this.state.cid * 1 : '',
            name: this.state.couponName,
            type: this.state.couponType == '现金券' ? 1 : 2,
            mid: this.state.merSelectArr.typeArray('id').toString(),
            item_name: this.state.cloSelTypeArr.toString(),
            start_time: this.state.startime,
            end_time: this.state.endtime,
            full_money: this.state.totalPrice,
            discount: this.state.couponType != '现金券' ? this.state.subPrice * 10 : 100,
            money: this.state.couponType == '现金券' ? this.state.subPrice : '0',
            send_type: this.state.getType * 1,
            user_mobile: this.state.customMobile,
            remarks: this.state.useRole,
        }
        console.log(this.state.cid,pram);
        api.post(this.state.cid ? 'CouponEdit':'addCoupon', pram, (res, ver) => {
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
            console.log(this.state.merNameArr, this.state.merSelectArr),
            
            <Dish title='新增优惠券' onClose={this.props.onClose} width="690" height="450">
            <div className="app_cou_content">
                <div className="app_cou_left">
                    <div> <span><b>*</b>优惠券名称:</span><input type='text' className='e-input' placeholder='请输入优惠券名称' value={this.state.couponName} onChange={e => this.setState({ couponName: e.target.value })} /></div>
                    <div> <span>优惠类型:</span><Select option={['现金券', '折扣券']} value={this.state.couponType} onChange={obj=>this.changeCouponType(obj)} /></div>
                    <div> <span>衣物品类:</span><div className='app-cou-sel-clo' placeholder='请选择衣物品类' onClick={() => this.setState({ SelectCloShow: true })}>{this.state.cloSelTypeArr.toString()}</div></div>
                    <div> <span><b>*参数设置:</b></span>总价满足 <input type='number' className='e-input' style={{ width: '50px' }} value={this.state.totalPrice} onChange={e => this.setState({ totalPrice: e.target.value })} /> 元；
                    {this.state.notiContent} <input type='number' className='e-input' style={{ width: '50px' }} value={this.state.subPrice} onChange={e => this.setState({ subPrice: e.target.value })} /> {this.state.notiContentUnit}</div>
                </div>
                <div className="app_cou_right">
                        
                        <div> <span>使用门店:</span>
                            <MultiSelect value={this.state.merSelectArr.typeArray('mname').toString()}>
                                {this.state.merNameArr.map(value => <span key={tool.UUID()} data-checked={-1 === value.inObjArray(this.state.merSelectArr, 'mname') ? '' : 'checked'} onClick={this.handleChoose}>{value}</span>)}
                            </MultiSelect>
                        </div>
                        <div> <span>开始时间:</span><input type='date' className='e-date' placeholder='请选择开始时间' value={this.state.startime} onChange={e => this.setState({ startime: e.target.value })} /></div>
                        <div> <span>结束时间:</span><input type='date' className='e-date' placeholder='请选择结束时间' value={this.state.endtime} onChange={e => this.setState({ endtime: e.target.value })}/></div>
                    
                </div>
                <div className="app_cou_offer_user">
                    <div style={{height:'60px'}}>发放用户:</div>
                    <div >
                            <label><input type='checkbox' className='e-checkbox' value='1' checked={this.state.getType == '1' ? true : false} onClick={this.selectMemPart}  /> 全部会员</label>
                            <label><input type='checkbox' className='e-checkbox' value='2' checked={this.state.getType == '2' ? true : false} onClick={this.selectMemPart}/> 全部持卡</label>
                            <label><input type='checkbox' className='e-checkbox' value='3' checked={this.state.getType == '3' ? true : false} onClick={this.selectMemPart}/> 一年内有消费会员</label>
                            <label><input type='checkbox' className='e-checkbox' value='4' checked={this.state.getType == '4' ? true : false} onClick={this.selectMemPart}/> 半年内有消费会员</label>
                            <label><input type='checkbox' className='e-checkbox' value='5' checked={this.state.getType == '5' ? true : false} onClick={this.selectMemPart}/> 三个月内有消费会员</label>
                            <label><input type='checkbox' className='e-checkbox' value='0' checked={this.state.getType == '0' ? true : false} onClick={this.selectMemPart}/> 自定义&emsp;<input type='text' className='e-input' placeholder='请输入用户手机号使用逗号隔开' value={this.state.customMobile} onChange={e => this.setState({ customMobile: e.target.value })} /></label>
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
                {this.state.SelectCloShow && <Clothes data={this.state.cloTypeArr} onClose={() => this.setState({ SelectCloShow: false })} callback={checked => this.setState({ cloSelTypeArr: checked, SelectCloShow: false })} />}
            </Dish>
        );
        
        }
}