/**
 * 促销详情
 * fanyerong
 */
import React, { Component } from 'react';
import '../SalePromotion/SalePromotionDetail.css'
import Dish from '../../../UI/Dish'
import Select from '../../../UI/Select'
export default class extends Component {
    constructor(props) {
        super(props);       
    }
    render() {
        return (
            <Dish title='优惠券详情' onClose={this.props.onClose} width="650" height="450">
                <div className="sale_pro_content">
                    <div>
                        <img src='../images/coupon_name.png' /><span>优惠券名称:&emsp;<a>{this.props.coupon_Name}</a></span>
                    </div>
                    <div>
                        <img src='../images/coupon_type.png' /><span>优惠类型:&emsp;{this.props.coupon_Type}</span>
                    </div>
                    <div>
                        <img src='../images/coupon_method.png' /><span>优惠方案:&emsp;{this.props.coupon_Method}</span>
                    </div>
                    <div>
                        <img src='../images/coupon_clothes_type.png' /><span>货品品类:&emsp;{this.props.cloType}</span>
                    </div>
                    <div>
                        <img src='../images/coupon_code.png' /><span>品类编码:&emsp;{this.props.cloCode}</span>
                    </div>
                    <div>
                        <img src='../images/coupon_mer.png' /><span>使用门店:&emsp;{this.props.useMer}</span>
                    </div>
                    <div>
                        <img src='../images/coupon_role.png' /><span>使用规则:&emsp;{this.props.useRole}</span>
                    </div>
                    <div>
                        <img src='../images/coupon_number.png' /><span>总数量:&emsp;{this.props.useNumber}</span>
                    </div>
                    <div>
                        <img src='../images/coupon_date.png' /><span>开始时间:&emsp;{this.props.startime} ~ 结束时间:&emsp;{this.props.endtime}</span>
                    </div>
                </div>
            </Dish>
        );
    }
}