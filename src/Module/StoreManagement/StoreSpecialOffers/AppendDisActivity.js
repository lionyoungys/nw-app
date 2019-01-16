/**
 * 新增满减活动/折扣活动、袋洗/件洗
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
            cid: '',//优惠券id
            couponName: '',//优惠券名称
            couponType: '满减', //活动类型  
            couponTypeID:1,       
            cloSelTypeArr: [], //已选择衣物品类 
            getType: '0',//是否与优惠券通用
            useWithCard:false,//允许与折扣卡同时使用
            cloTypeArr: [],
            merArr: [],
            merNameArr: [],
            merSelectArr: [],
            useRole: '', //使用规则
            startime: tool.date('Y-m-d'), //开始时间
            endtime: tool.date('Y-m-d'), //结束时间
            totalPrice: '',//满减金额
            subPrice: '',//减去金额
            notiContent: '可减去',//可减去/可享受/可以洗
            notiContentUnit: '元',//元/折/袋/件
            SelectCloShow: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.changeCouponType = this.changeCouponType.bind(this);
        this.selectMemPart = this.selectMemPart.bind(this);
        this.selectWithCard = this.selectWithCard.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
    }
    componentDidMount() {

        let cid = this.props.data || '';
        if (cid) {
            this.setState({ cid: cid });
        }
        console.log(cid, 1111);
        var pram = pram = {
            token: 'token'.getData(),
            aid: cid
        }
        console.log(pram);
        
        api.post(cid ? 'salePromotionDetail' : 'addCoupon_getDate', pram, (res, ver) => {
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
                    let activityType = res.result.activity.type;
                    this.setState({
                        couponName: res.result.activity.name,
                        couponType: activityType == '1' ? '满减' : (activityType == '2' ? '折扣' : (activityType == '3' ? '多件洗' : '袋洗')),
                        cloSelTypeArr: res.result.item,
                        cloTypeArr: res.result.item_name,
                        merArr: MerArr,
                        merNameArr: MerArr.typeArray('mname'),
                        merSelectArr: selectMerArr,
                        startime: tool.date('Y-m-d', res.result.activity.start_time),
                        endtime: tool.date('Y-m-d', res.result.activity.end_time),
                        totalPrice: res.result.activity.full_money,
                        subPrice: activityType == '2' ? res.result.activity.discount * 0.1 : res.result.activity.money,
                        notiContent: activityType == '1' ? '可减去' : (activityType == '2' ? '可享受' : '可以洗'),//可减去/可享受/可以洗
                        notiContentUnit: activityType == '1' ? '元' : (activityType == '2' ? '折' : (activityType == '3' ? '件' : '袋')),//元/折/件/袋
                        getType: res.result.activity.whether,
                        useRole: res.result.activity.remarks,
                        couponTypeID: activityType,
                        
                    })

                } else {

                    this.setState({ cloTypeArr: res.result.item_name, merArr: res.result.merchant, merNameArr: res.result.merchant.typeArray('mname') })
                }
            }
        });

    }
    changeCouponType(obj) {
        let type = obj.value;
        this.setState({ couponType: type });
        if (type == '满减') {
            
            this.setState({ notiContent: '可减去', notiContentUnit: '元', couponTypeID: 1, subPrice: '', });
        } else if (type == '折扣') {
            
            this.setState({ notiContent: '可享受', notiContentUnit: '折', couponTypeID: 2, subPrice: ''});
        } else if (type == '袋洗') {

            this.setState({ notiContent: '可以洗', notiContentUnit: '袋', couponTypeID: 4, subPrice: '1', getType: '0'});
        }else{

            this.setState({ notiContent: '可以洗', notiContentUnit: '件', couponTypeID: 3, subPrice: '', getType: '0'});
        }
    }
    selectMemPart(e) {
        console.log(e.target.value)
        if (e.target.value != this.state.getType) {
            var u = e.target.value;
            console.log(u)
            this.setState({ getType: u })
        }
    }
    selectWithCard(e) {
        console.log(e)
        this.setState({ useWithCard: e })
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

        if (this.state.couponName == '' || this.state.merSelectArr.length == 0 || this.state.cloSelTypeArr.length == 0  || this.state.startime == '' || this.state.endtime == '' || this.state.totalPrice == '' || this.state.subPrice == '' || this.state.get_type == '') {
            return tool.ui.error({
                msg: '内容不能为空！', callback: (close, event) => {
                    close();
                }
            });
        }
        if (this.state.subPrice * 1 <= 0) {
            return tool.ui.error({
                msg: '参数设置可享金额/折扣大于0！', callback: (close, event) => {
                    close();
                }
            });
        }
        var pra = {
            
            token: 'token'.getData(),
            aid: this.state.cid ? this.state.cid : '',
            name: this.state.couponName,
            type: this.state.couponTypeID,
            mid: this.state.merSelectArr.typeArray('id').toString(),
            item_name: this.state.cloSelTypeArr.toString(),
            start_time: this.state.startime,
            end_time: this.state.endtime,
            full_money: this.state.totalPrice,
            discount: this.state.couponType == '折扣' ? this.state.subPrice * 10 : 100,
            money: this.state.couponType != '折扣' ? this.state.subPrice : '0',
            remarks: this.state.useRole,
            whether: this.state.getType * 1,
        }
        console.log(pra);
        api.post(this.state.cid ? 'SalePromotionEdit' :'addSalePromotion', pra, (res, ver) => {
            if (ver && res) {
                console.log(res);
                tool.ui.success({
                    callback: (close, event) => {
                        close();
                        'function' == typeof this.props.onClose && this.props.onClose();
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
            <Dish title='新增优惠活动' onClose={this.props.onClose} width="690" height="440">
                <div className="app_cou_content">
                    <div className="app_cou_left">
                        <div> <span><b>*</b>活动名称:</span><input type='text' className='e-input' placeholder='请输入活动名称' value={this.state.couponName} onChange={e => this.setState({ couponName: e.target.value })} /></div>
                        <div> <span>促销类型:</span><Select option={['满减', '折扣','袋洗', '多件洗']} value={this.state.couponType} onChange={obj => this.changeCouponType(obj)} /></div>
                        <div> <span>衣物品类:</span><div className='app-cou-sel-clo' placeholder='请选择衣物品类' onClick={() => this.setState({ SelectCloShow: true })}>{this.state.cloSelTypeArr.toString()}</div></div>
                    </div>
                    <div className="app_cou_right">

                        <div> <span>适用门店:</span>
                            <MultiSelect value={this.state.merSelectArr.typeArray('mname').toString()}>
                                {this.state.merNameArr.map(value => <span key={tool.UUID()} data-checked={-1 === value.inObjArray(this.state.merSelectArr, 'mname') ? '' : 'checked'} onClick={this.handleChoose}>{value}</span>)}
                            </MultiSelect>
                        </div>
                        <div> <span>开始时间:</span><input type='date' className='e-date' placeholder='请选择开始时间' value={this.state.startime} onChange={e => this.setState({ startime: e.target.value })} /></div>
                        <div> <span>结束时间:</span><input type='date' className='e-date' placeholder='请选择结束时间' value={this.state.endtime} onChange={e => this.setState({ endtime: e.target.value })}/></div>
                    </div>
                    <div className="app_cou_bottom"> <span><b>*参数设置:</b></span>适用品类总价满足 <input type='number' className='e-input' style={{ width: '50px' }} value={this.state.totalPrice} onChange={e => this.setState({ totalPrice: e.target.value })} /> 元；
                    {this.state.notiContent} <input type='number' className='e-input' style={{ width: '50px' }} disabled={this.state.couponTypeID == 4 ? 'disabled' : ''} value={this.state.subPrice} onChange={e => this.setState({ subPrice: e.target.value })} /> {this.state.notiContentUnit}</div>
                    <div className="app_cou_offer_user">
                        <div style={{ height: '26px' }}>使用限制:</div>
                        <div >
                            <label><input type='checkbox' className='e-checkbox' value='0' disabled={(this.state.couponTypeID == 4 || this.state.couponTypeID == 3) ? 'disabled' : ''} checked={this.state.getType == '0' ? true : false} onClick={this.selectMemPart} /> 不与优惠券同时使用</label>
                            <label><input type='checkbox' className='e-checkbox' value='1' disabled={(this.state.couponTypeID == 4 || this.state.couponTypeID == 3) ? 'disabled' : ''} checked={this.state.getType == '1' ? true : false} onClick={this.selectMemPart} /> 可以与优惠券同时使用</label>
                            
                        </div>
                    </div>
                    <div className="app_cou_use_role">
                        <div>使用规则:</div>
                        <textarea className='e-textarea' placeholder='请输入活动使用规则' rows='10' cols='50' value={this.state.useRole} onChange={e => this.setState({ useRole: e.target.value })}></textarea>
                        <div style={{marginLeft:'86px',marginTop:'80px', height: '26px' }}>
                            <label><input type='checkbox' className='e-checkbox' checked={this.state.useWithCard} onClick={e=>this.selectWithCard(e.target.checked)} />允许与折扣卡同时使用</label>
                        </div>
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