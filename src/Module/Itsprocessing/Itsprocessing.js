/**
 * 撤单处理界面
 * @author fanyerong && ranchong
 * 日志：7.9 重新布局 fanyerong
 *      7.9  编写业务逻辑 ranchong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import './Itsprocessing.css';
import Table from '../../UI/Table';
export default class extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            comeinCloth: [],//收进衣物
            returnCloth: [],//赔退衣物
            cause: '',//撤单原因
            orderNum:'',//订单号/流水号
            // orderNum_save: '',//数据请求后保存订单号/流水号
            cardPay:false,//是否卡付款
            returnCash:'',//退现金金额
            returnCard:'',//退卡金额
            maxReturn:'0',//最大退款金额
        }
        this.searchOrder = this.searchOrder.bind(this);
        this.doCompensate = this.doCompensate.bind(this);
        this.handleAllArr = this.handleAllArr.bind(this);
        this.handlePartArr = this.handlePartArr.bind(this);
        this.handleMaxReturn = this.handleMaxReturn.bind(this);           
    };  
    //查询订单
    searchOrder() {

        if ("" == this.state.orderNum) return tool.ui.error({
            title: '提示', msg: '订单号/流水号不能为空！', button: ['确定'], callback: (close, event) => {
                close();
            }
        });
        api.post('revocation', { token: 'token'.getData(), search_sn:this.state.orderNum }, (res, ver, handle) => {
            console.log(res);
            if (ver && res) {
               
                let ress = res.result.list;
                if (ress.length == 0) {
                    tool.ui.error({
                        title: '提示', msg: '该订单没有可撤单衣物！', button: ['确定'], callback: (close, event) => {
                            close();
                        }
                    });
                }
                this.setState({ cardPay: res.result.card == 1 ? true : false, comeinCloth: ress, returnCloth: [], maxReturn: '0' })
                
            } else {
                handle();
            }
        });
    }
    //点击确认
    doCompensate() {

        if (this.state.returnCloth.length == 0) return tool.ui.error({title: '提示', msg: '待退衣物不能为空！', button: ['确定'], callback: (close, event) => { close(); }});
        // if (this.state.orderNum !== this.state.orderNum_save) return tool.ui.error({ title: '提示', msg: '订单号/流水号已改变，请重新获取数据！', button: '确定', callback: (close, event) => { close(); } });
        if (this.state.orderNum.length == 0) return tool.ui.error({ title: '提示', msg: '订单号/流水号不能为空！', button: ['确定'], callback: (close, event) => { close(); } });
        if (!this.state.cardPay && this.state.returnCard.length > 0 ) return tool.ui.error({ title: '提示', msg: '订单非卡支付，只能现金退款！', button: ['确定'], callback: (close, event) => { close(); } });
        if (!this.state.cardPay && this.state.returnCash.length == 0) return tool.ui.error({ title: '提示', msg: '现金退款不能为空！', button: ['确定'], callback: (close, event) => { close(); } });
        if (!this.state.cardPay && this.state.returnCash * 1 > (this.state.maxReturn * 1)) return tool.ui.error({ title: '提示', msg: '现金退款金额不能大于最大退款金额！', button: ['确定'], callback: (close, event) => { close(); } });
        if (this.state.cardPay && this.state.returnCash.length == 0 && this.state.returnCard.length == 0 ) return tool.ui.error({ title: '提示', msg: '请填写至少一种退款金额！', button: ['确定'], callback: (close, event) => { close(); } });
        if (this.state.cardPay && (this.state.returnCash *1+ this.state.returnCard*1) >(this.state.maxReturn *1)) return tool.ui.error({ title: '提示', msg: '现金与退卡金额不能大于最大金额！', button: ['确定'], callback: (close, event) => { close(); } });
        let params = {
            token: 'token'.getData(), 
            ids: '[' + this.state.returnCloth.typeArray('id').join(',')+']',
            // oid: this.state.orderNum_save,
            cause: this.state.cause, 
            cash_amount: this.state.returnCash, 
            card_amount: this.state.returnCard, 
        }
        console.log(params);
        api.post('doRevocation', params,(res, ver, handle) => {

            console.log(res);
            handle(); 
            if (ver && res) {
                this.props.closeView();
            }      
        });   
    }
    //点击了尖号 1 全部右移 2全部左移
    handleAllArr(index) {
        console.log('点击了片区' + index);
        console.log(this.state.returnCloth.concat(this.state.comeinCloth));
        if (index == 1) {
            if (this.state.comeinCloth.length == 0) return;
            let allArr = this.state.returnCloth.concat(this.state.comeinCloth);
            this.setState({ returnCloth: allArr, comeinCloth: [] });
            this.handleMaxReturn(allArr);

        } else {
            if (this.state.returnCloth.length == 0) return;
            let allArr = this.state.comeinCloth.concat(this.state.returnCloth);
            this.setState({ comeinCloth: this.state.comeinCloth.concat(this.state.returnCloth), returnCloth: [] });
            this.handleMaxReturn([]);
        }
    }
    //点击了 1 左侧某个 2右侧某个
    handlePartArr(index, cellIndex) {
        console.log('点击了左右侧' + index + '-' + cellIndex);
        if (index == 1) {
            this.state.returnCloth.push(this.state.comeinCloth[cellIndex]);
            this.state.comeinCloth.splice(cellIndex, 1);
            this.setState({ returnCloth: this.state.returnCloth, comeinCloth: this.state.comeinCloth });
        } else {
            this.state.comeinCloth.push(this.state.returnCloth[cellIndex]);
            this.state.returnCloth.splice(cellIndex, 1);
            this.setState({ comeinCloth: this.state.comeinCloth, returnCloth: this.state.returnCloth });
        }
        this.handleMaxReturn(this.state.returnCloth);
    }  
    //计算最大退款额
    handleMaxReturn(returnArr){
        if (returnArr.length == 0){
            this.setState({maxReturn:'0'});
        }else{
            this.setState({ maxReturn: returnArr.addKeyInArray('discount_price')})
        }
        console.log('退款最大'+this.state.maxReturn);
    }
    render() {
        var list_left = this.state.comeinCloth.map((item, index) =>
            <tr onClick={() => this.handlePartArr(1, index)} key={'item' + index}>
                <td>{item.clothing_number}</td>
                <td>{item.clothing_name}</td>
                <td>{item.clothing_color}</td>
                <td>{item.discount_price}</td>
            </tr>
        )
        var list_right = this.state.returnCloth.map((item, index) =>
            <tr onClick={() => this.handlePartArr(2, index)} key={'item' + index}>
                <td>{item.clothing_number}</td>
                <td>{item.clothing_name}</td>
                <td>{item.clothing_color}</td>
                <td>{item.discount_price}</td>
            </tr>
        )
       return (             
            <Window title='撤单处理' onClose={this.props.closeView} width="902" height="626"> 
            <div className='its-all-div'>
                <div className="Deliverywarning-title Itsprocessing-title">
                  <input type="text" className='e-input its-pro-input' onChange = {e=>this.setState({orderNum:e.target.value})} placeholder="订单号/流水号"/> 
                   <button className="e-btn" onClick={this.searchOrder}>查询</button>                  
                </div>  
                <div className="Itsprocessing-count">
                   <div className="Itsprocessing-count-left">
                       <div className="Itsprocessing-count-title">收进衣物<span>共<b>{this.state.comeinCloth.length}</b>件</span></div>
                       <div className="Itsprocessing-count-take ">
                            <Table>
                                <thead>
                                    <tr>
                                           <th>衣物编码</th>
                                           <th>衣物名称</th>
                                           <th>颜色</th>
                                           <th>价格</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list_left}
                                </tbody>  
                            </Table>                      
                       </div>                      
                    </div>
                    <div className="Itsprocessing-count-transfer">
                       <span onClick={() => this.handleAllArr(1)}><a title="全选" href="javascript:"></a></span>
                       <span onClick={() => this.handleAllArr(2)}><a title="全不选" href="javascript:"></a></span>
                    </div>
                    <div className="Itsprocessing-count-left  Itsprocessing-count-right">
                       <div className="Itsprocessing-count-title">待退衣物<span>共<b>{this.state.returnCloth.length}</b>件</span></div>
                       <div className="Itsprocessing-count-take">
                               <Table>
                                <thead>
                                    <tr>
                                           <th>衣物编码</th>
                                           <th>衣物名称</th>
                                           <th>颜色</th>
                                           <th>价格</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {list_right}
                                </tbody>  
                               </Table>                             
                       </div>                       
                    </div>
                </div> 
                <div className="Itsprocessing-footer">
                    <div className="Itsprocessing-footer-left">                     
                        <span>撤单原因：</span><textarea className="Itsprocessing-footer-text" onChange={e => this.setState({ cause: e.target.value })}></textarea>
                    </div>                 
                    <div className="Itsprocessing-footer-div">
                        <span>退款金额：</span><input type="number" className='e-input' onChange={e => this.setState({ returnCash: e.target.value })}/><s>元</s>
                    </div>
                    <div className="Itsprocessing-footer-div">
                        <span>卡退款：</span><input type="number" className='e-input' onChange={e => this.setState({ returnCard: e.target.value })} /><s>元</s> <b className="no-save" onClick={this.props.closeView}>取消</b><b className="sure-save" onClick={this.doCompensate}>确定</b>
                    </div>
                </div> 
            </div>
            </Window> 
        );
    }
}