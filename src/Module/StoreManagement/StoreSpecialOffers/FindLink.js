
/**
 * 优惠券展示二维码
 * @author fanyerong
 */
import React, { Component } from 'react';
import Dish from '../../../UI/Dish'
import './AppendCoupon.css'
export default class extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

        console.log(this.props.url);
        //URL地址扫描
        new QRCode(this.div2, { text: "http://www.suxida.com.cn/", width: 140, height: 140, correctLevel: QRCode.CorrectLevel.H });
    }
    render() {
        return (
            <Dish title='微信扫描以下二维码进行领取' onClose={this.props.onClose} width="400" height="300">
                <div className='link_img_ewm' ref={div => this.div2 = div}></div>
            </Dish>
        );
    }
}