/**
 * 经理收款
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Mmanagergatheringdetail from './Mmanagergatheringdetail';
import './ManagerGathering.css';
import Select from '../../UI/Select';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false, 
            result:{},
            amount:0,//余额  
            lastbalance:0,//上次余额
            gathering:'',
            balance:'',
            fit:0,
            remark:'',
        }
        this.map = {
            free:'免费',
            freeBackCard:'免费退卡',
            cardPay:'刷卡',
            cardOther:'刷卡其他',
            cardReplenish:'刷卡补交',
            cardGroup:'刷集团卡',
            cardGroupOther:' 刷集团卡其他',
            cardGroupReplenish:'刷集团卡补交',
            cardHand:'手持机刷卡',
            cardHandReplenish:'手持机刷卡补交',
            noPay:'未付款',
            noPayReplenish:'未付款补交',
            cash:'现金',
            cashRecharge:'现金充值',
            cashOther:'现金其他',
            cashCard:'现金发卡',
            cashReplenish:'现金补交',
            cashBackCard:'现金退卡',
            ticket:'赠券',
            ticketRecharge:'赠券充值',
            ticketOther:'赠券其他',
            ticketCard:'赠券发卡',
            ticketReplenish:'赠券补交',
            ticketBackCard:'赠券退卡',
            total:'合计'
        };
        this.payment=this.payment.bind(this);
        this.onclose = this.onclose.bind(this);
    };
    onclose (){
        this.setState({show:false})
    }
    componentDidMount(){
        api.post('managerGathering',{token:'token'.getData()}  , (res, ver, handle) => {
            if (ver) {
                this.setState({
                    result:res.result,
                    amount:res.result.total.amount,
                    lastbalance:res.result.balance
                })                                                                                    
            }else{
                handle();                
            }
        }
      );
       
    }
    payment(){
        api.post('doManagerGathering',{
            token:'token'.getData(),
            gathering:this.state.gathering,
            balance:this.state.balance,
            fit:this.state.fit,
            remark:this.state.remark
            }  
          , (res, ver, handle) => {
                if (ver) {
                    console.log(res)
                    this.setState({result:res.result})                                                                                    
                }else{
                    handle();                
                }
            }
          );
       
    }
    render() {
        let arr = [],
            result = this.state.result,   
            temp;
        for (let k in this.map) {
            temp = result[k] || {};
            arr.push(
                <tr>
                    <td >{this.map[k]}</td>
                    <td>{temp.amount || 0}</td>
                    <td>{temp.real_amount || 0}</td>
                    <td>{temp.work_number || 0}</td>
                </tr>
            );
        } 
        return (
            <Window title='经理收款' onClose={this.props.closeView} height='494'>
               <div className="man-head">
                    <a>收款情况</a>   
                    <a>统计时间：{this.state.result.dateStartTime} 至{this.state.result.dateEndTime}</a>                    
                </div>
                {/* 表格部分 欠费衣物信息*/}               
                <table className='ui-table-base ManagerGathering-tab'>
                    <thead>
                        <tr>
                            <td>收银类型</td>
                            <td>金额</td>
                            <td>实收金额</td>
                            <td>衣物数量</td>
                        </tr>
                    </thead>
                    <tbody>
                        {arr}
                    </tbody>
                </table>
                <div className="manager_gathering_bottom">
                    <div className="manager_gathering_part three_part">
                        <div className="manager_gathering_part_row">
                            上次余额：<span>{this.state.lastbalance}</span> &emsp;&emsp;本次收现金：<span>{this.state.amount}</span> &emsp;&emsp;&emsp;&emsp;总现金：<span>{Number(this.state.amount)+Number(this.state.lastbalance)}</span>
                        </div>
                        <div className="manager_gathering_part_row">
                            本次上缴：<input type="text" value={this.state.gathering} onChange={e=>this.setState({gathering:e.target.value})}/> &emsp;&emsp;&emsp;本次余额：<input type="text" value={this.state.balance} onChange={e=>this.setState({balance:e.target.value})}/> &emsp;现金是否一致：<Select option={['是','否']} onChange={value =>this.setState({fit:value?1:0})}/>
                        </div>
                        <div className="manager_gathering_part_row text_area_row">
                            <a>经营情况说明：</a><textarea value={this.state.remark} onChange={e=>this.setState({remark:e.target.value})}></textarea>
                        </div>
                    </div>
                    <div className='manager_gathering_part_btn'>
                        <button type='button' className='e-btn ' onClick={() => this.setState({ show: true })}>查看明细</button>
                        <button type='button' className='e-btn '>开钱箱</button>
                        <button type='button' className='e-btn ' onClick={this.payment}>交款</button>
                    </div>
                </div>
                {
                    this.state.show
                    &&
                    <Mmanagergatheringdetail  onClick = {this.onclose}/>
                }
            </Window>

        );
    }
}