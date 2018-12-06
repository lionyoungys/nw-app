/**
 * 促销详情
 * ranchong
 */
import React, { Component } from 'react';
import './SalePromotionDetail.css'
import Dish from '../../../UI/Dish'
import Select from '../../../UI/Select'
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promoName: '',//促销活动名称
            promoType: '', //促销类型
            cloSelTypeArr:[],//衣物品类 
            merSelectArr:[],//使用门店         
            notiContent:'',
            notiContentUnit:'',
            cloType:'',//衣物品类 
            useRole: '', //使用规则
            startime: '', //开始时间
            endtime: '', //结束时间
            totalPrice: '',//满减金额
            subPrice: '',//减去金额
        };
    }

    // 获取数据
    componentDidMount() {
        console.log(this.props.id,this.props.index);
        let index = this.props.index;
        api.post(this.props.index == 1 ? 'CouponDetail':'salePromotionDetail', { 
            token: 'token'.getData(),
            aid: index == 1 ? '' : this.props.id,
            cid: index == 1 ? this.props.id :'',
         }, (res, ver, handle) => {
            console.log(res);
            if (ver && res) {

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
                let resCouAct = res.result.activity || res.result.coupon;
                let couptype = resCouAct.type
                this.setState({
                    promoName:resCouAct.name,
                    cloSelTypeArr: res.result.item,
                    merSelectArr: selectMerArr,
                    promoType: index == 1 ? (couptype == '1' ? '现金券' : '折扣券'): (couptype == '1' ? '满减' : (couptype == '2' ? '折扣' : (couptype == '3' ? '多件洗' : '袋洗'))),
                    notiContent: couptype == '1' ? '可减去' : (couptype == '2' ? '可享受' : '可以洗'),//可减去/可享受/可以洗
                    notiContentUnit: couptype == '1' ? '元' : (couptype == '2' ? '折' : (couptype == '3' ? '件' : '袋')),//元/折/件/袋
                    totalPrice: resCouAct.full_money,
                    subPrice: couptype == '2' ? resCouAct.discount * 0.1 : resCouAct.money,
                    useRole:resCouAct.remarks,
                    startime: tool.date('Y-m-d H: i: s', resCouAct.start_time),
                    endtime: tool.date('Y-m-d H: i: s', resCouAct.end_time),
                });
            } else {
                handle();
            }
        });
    }
    render() {
        return (
            <Dish title='促销活动详情' onClose={this.props.onClose} width="650" height="450">
                <div className="sale_pro_content">
                    <div>
                        <img src='images/sale_pro_name.png' /><span>促销活动:&emsp;<a>{this.state.promoName}</a></span>
                    </div>
                    <div>
                        <img src='images/sale_pro_type.png' /><span>促销类型:&emsp;{this.state.promoType}</span>
                    </div>
                    <div>
                        <img src='images/sale_pro_method.png' /><span>促销方案:&emsp;总价满足 {this.state.totalPrice} 元；{this.state.notiContent} {this.state.subPrice} {this.state.notiContentUnit}</span>
                    </div>
                    <div>
                        <img src='images/sale_pro_clo_type.png' /><span>衣物品类:&emsp;{this.state.cloSelTypeArr.toString()}</span>
                    </div>
                    <div>
                        <img src='images/sale_pro_mer.png' /><span>使用门店:&emsp;{this.state.merSelectArr.typeArray('mname').toString()}</span>
                    </div>
                    <div>
                        <img src='images/sale_pro_role.png' /><span>使用规则:&emsp;{this.state.useRole}</span>
                    </div>
                    <div>
                        <img src='images/sale_pro_date.png' /><span>开始时间:&emsp;{this.state.startime} ~ 结束时间:&emsp;{this.state.endtime}</span>
                    </div>
                </div>
            </Dish>
        );
    }
}