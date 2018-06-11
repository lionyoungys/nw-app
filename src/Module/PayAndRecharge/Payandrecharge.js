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
        this.cash=this.cash.bind(this)
        this.wechat=this.wechat.bind(this)
        this.alipay=this.alipay.bind(this)
        this.state = {authCode:['','','',''],selectcash:true,selectwechat:false,selectalipay:false}
        this.input = [];
        this.setAuthCode = this.setAuthCode.bind(this);
        this.payment = this.payment.bind(this)
    };   
    cash(){
        this.setState({selectcash:true,selectwechat:false,selectalipay:false,authCode:['','','','']})
    }
    wechat(){
        this.setState({selectcash:false,selectwechat:true,selectalipay:false,authCode:['','','','']})
    } 
    alipay(){
        console.log("aaa");
        this.setState({selectcash:false,selectwechat:false,selectalipay:true,authCode:['','','','']})
    } 
    payment(){
        let authCode = this.state.authCode;
        if (
            4 === authCode[0].length && !isNaN(authCode[0])
            &&
            4 === authCode[1].length && !isNaN(authCode[1])
            &&
            4 === authCode[2].length && !isNaN(authCode[1])
            &&
            6 === authCode[3].length && !isNaN(authCode[1])
        ) 
        // this.props.onConfirm((authCode[0] + authCode[1] + authCode[2] + authCode[3]));
        var gateway = ''
        if(this.state.selectcash){
           gateway ='1'
        }else if(this.state.selectwechat){
            gateway ='2'
        }else{
            gateway ='3'
        }
        if(this.props.info.password=='')
        {
         let obj ={
             token:'token'.getData(),
             amount:this.props.price,
             give:this.props.give_price,
             cid:this.props.cid,
             gateway:gateway,
             authcode:authCode[0] + authCode[1] + authCode[2] + authCode[3]
         }
         api.post(
            'recharge', 
            obj, (res, ver) => {
            if (ver && res) {
                console.log(res)
                tool.ui.success({callback:(close, event) => {
                    close();
                }}); 
            }else{
                console.log(res)
                tool.ui.error({callback:(close, event) => {
                    close();
                }});
            }
        }
        );
        }
        else{
         let obj = {
            token:'token'.getData(),
            user_name:this.props.info.user_name,
            user_mobile:this.props.info.user_mobile,
            recharge_number:this.props.info.recharge_number,
            card_name:this.props.info.card_name,
            discount:this.props.info.discount,
            sex:this.props.info.sex,
            birthday:this.props.info.birthday,
            address:this.props.info.address,
            password:this.props.info.password,
            price:this.props.info.price,
            made_price:this.props.info.made_price,
            gateway:gateway,
            authcode: authCode[0] + authCode[1] + authCode[2] + authCode[3],
            balance:this.props.info.balance
        };
        console.log(obj);
        api.post(
            'saleCard', 
            obj, (res, ver) => {
            if (ver && res) {
                console.log(res)
                tool.ui.success({callback:(close, event) => {
                    close();
                }}); 
            }else{
                console.log(res)
                tool.ui.error({callback:(close, event) => {
                    close();
                }});
            }
        }
        );
    }
    }
    componentDidMount() {
        // this.input[3].onkeydown = ( e => {'Enter' === e.code && this.payment()} )
        // console.log(this.state.selectcash)
    }
    
    setAuthCode(e) {
        let value = e.target.value,
            index = Number(e.target.dataset.index),
            len = value.length;
        (3 !== index && 4 === len) && this.input[index + 1].focus();
        if (( 3 !== index && 4 >= len ) || ( 3 === index && 6 >= len )) {
            this.state.authCode[index] = value
            this.setState({authCode:this.state.authCode});
        }
    }
    render() {
        return (            
            <Window title='收银' width="630" height="430" onClose={this.props.onclose}>
               <div className="Payandrecharge">
                   <div className="Payandrecharge-information">
                      <div className="Payandrecharge-information-title">核对信息</div>
                      <div className="Payandrecharge-information-div">
                          <div>
                              <p><i>卡类型：</i><b>{this.props.info.card_name}</b></p>
                              <p><i>折扣率：</i><b>{this.props.info.discount}%</b></p>
                          </div>
                          <div>
                              <p><i>充值金额：</i><b>￥{this.props.info.price}</b></p>
                              <p><i>原金额：</i><b>￥{this.props.info.balance}</b></p>
                          </div>
                          <div>
                              <p><i>赠送金额：</i><b>￥{this.props.info.give_price}</b></p>
                              <p><i>充后余额额：</i><b>￥{Number(this.props.info.balance)+Number(this.props.info.give_price)+Number(this.props.info.price)}</b></p>
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
                                     <input type='text' value={this.state.authCode[0]} onChange={this.setAuthCode} data-index='0' ref={input => this.input[0] = input}/>
                                     <input type='text' value={this.state.authCode[1]} onChange={this.setAuthCode} data-index='1' ref={input => this.input[1] = input}/>
                                     <input type='text' value={this.state.authCode[2]} onChange={this.setAuthCode} data-index='2' ref={input => this.input[2] = input}/>
                                     <input type='text' value={this.state.authCode[3]} onChange={this.setAuthCode} data-index='3' ref={input => this.input[3] = input}/>
                                </div>
                              </div>:
                            <div className="we-chatPay">
                                <div>请扫描或输入支付宝付款码</div>
                                <div>
                                    <input type='text' value={this.state.authCode[0]} onChange={this.setAuthCode} data-index='0' ref={input => this.input[0] = input}/>
                                    <input type='text' value={this.state.authCode[1]} onChange={this.setAuthCode} data-index='1' ref={input => this.input[1] = input}/>
                                    <input type='text' value={this.state.authCode[2]} onChange={this.setAuthCode} data-index='2' ref={input => this.input[2] = input}/>
                                    <input type='text' value={this.state.authCode[3]} onChange={this.setAuthCode} data-index='3' ref={input => this.input[3] = input}/>
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
                     <button onClick={this.payment}>立即付款</button>
                   </div>
               </div>
            </Window>
        );
    }
}