/**
 * 支付充值
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import './Payandrecharge.css';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={selectcash:true,selectwechat:false,selectalipay:false}
        this.cash=this.cash.bind(this)
        this.wechat=this.wechat.bind(this)
        this.alipay=this.alipay.bind(this)
    };   
    cash(){
        this.setState({selectcash:true,selectwechat:false,selectalipay:false})
    }
    wechat(){
        this.setState({selectcash:false,selectwechat:true,selectalipay:false})
    } 
    alipay(){
        console.log("aaa");
        this.setState({selectcash:false,selectwechat:false,selectalipay:true})
    } 
    render() {
        return (            
            <Window title='收银' width="630" height="430" onClose={this.props.closeView}>
               <div className="Payandrecharge">
                   <div className="Payandrecharge-information">
                      <div className="Payandrecharge-information-title">核对信息</div>
                      <div className="Payandrecharge-information-div">
                          <div>
                              <p><i>卡类型：</i><b>七折卡</b></p>
                              <p><i>折扣率：</i><b>70%</b></p>
                          </div>
                          <div>
                              <p><i>充值金额：</i><b>￥500.00</b></p>
                              <p><i>原金额：</i><b>￥200.00</b></p>
                          </div>
                          <div>
                              <p><i>赠送金额：</i><b>￥100.00</b></p>
                              <p><i>充后余额额：</i><b>￥600.00</b></p>
                          </div>
                      </div>
                   </div>
                   <div className="Payandrecharge-payment">
                      <div className="Payandrecharge-payment-title">收款方式</div>
                      <div className="payment-method">
                         <div className="payment-method-div">
                            <div  className={this.state.selectcash?'payment-method-money pay-success':'payment-method-money'} onClick={this.cash} >
                               <div>现金</div>
                            </div>
                            <div  className={this.state.selectwechat?'payment-method-money pay-success':'payment-method-money'} onClick={this.wechat}>
                               <div>微信</div>
                            </div>
                            <div className={this.state.selectalipay?'payment-method-money pay-success':'payment-method-money'} onClick={this.alipay}>
                               <div>支付宝</div>
                            </div>
                         </div>
                         <div className="pay-money">
                            {/* 第一种现金支付方式 */}
                            {this.state.selectcash?
                                <div className="cash-payment">实收金额：<input type="text" />元</div>:this.state.selectwechat?
                                    <div className="we-chatPay">
                                         <div>请扫描或输入微信付款码</div>
                                     <div>
                                 <input /><input /><input /><input />
                                </div>
                              </div>:
                            <div className="we-chatPay">
                                <div>请扫描或输入支付宝付款码</div>
                                <div>
                                    <input /><input /><input /><input />
                                </div>
                            </div> 
                        
                        
                        }
                            
                            {/* 第二种微信支付方式 */}
                           
                            {/* 第三种支付宝支付方式  ali-pay*/}
                           
                         </div>
                         <div className="payment-method-foot">
                                <div>应收:<b>￥2523.00</b></div>
                                <div>找零:<b>￥20.00</b></div>
                         </div>
                      </div>                     
                   </div>
                   <div className="Payandrecharge-btn">
                     <button>立即付款</button>
                   </div>
               </div>
            </Window>
        );
    }
}