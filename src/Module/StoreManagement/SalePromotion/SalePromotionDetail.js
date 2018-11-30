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
            promoName: '满100减30',//促销活动名称
            promoType: '', //促销类型         
            promoMethod: '', //促销方案 
            cloType:'',//衣物品类 
            cloCode: '',// 品类编码
            useRole: '', //使用规则
            useMer: '', //使用门店
            startime: '', //开始时间
            endtime: '', //结束时间
            totalPrice: '',//满减金额
            subPrice: '',//减去金额
        };
    }

    // 获取数据
    componentDidMount() {
        // api.post('', { token: 'token'.getData() }, (res, ver, handle) => {
        //     console.log(res);
        //     if (ver && res) {
        //         this.setState({
        //             // list: res.result.info,
        //             // starttime: res.result.dateStartTime,
        //             // endtime: res.result.dateEndTime,
        //             // mlist: res.result.info
        //         });
        //     } else {
        //         handle();
        //     }
        // });
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
                        <img src='images/sale_pro_method.png' /><span>促销方案:&emsp;{this.state.promoMethod}</span>
                    </div>
                    <div>
                        <img src='images/sale_pro_clo_type.png' /><span>衣物品类:&emsp;{this.state.cloType}</span>
                    </div>
                    <div>
                        <img src='images/sale_pro_code.png' /><span>品类编码:&emsp;{this.state.cloCode}</span>
                    </div>
                    <div>
                        <img src='images/sale_pro_mer.png' /><span>使用门店:&emsp;{this.state.useMer}</span>
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