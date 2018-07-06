/**
 * 挂失 补换卡
 * @author ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Nodata from '../../UI/Nodata';
import './LossReissueChangeCard.css';
import LossReport from './LossReport';//挂失
import ChangeCard from './ChangeCard';//换卡
import ReissueCard from './ReissueCard';//补卡
import RemoveLossCard from './RemoveLossCard';//解除挂失


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            clickNum:null,
            cardNumber:'',
            recharge_number:'',
            user_name:'',
            user_mobile:'',
            discount:'',
            user_info:[],
            index:0,
            nodatas:false,
        }
        this.router = {LossReport:LossReport, ChangeCard:ChangeCard, ReissueCard:ReissueCard, RemoveLossCard:RemoveLossCard};
        this.query=this.query.bind(this);
        this.handleclick=this.handleclick.bind(this);
        this.hasUser = this.hasUser.bind(this);
  }
    hasUser() {return (this.state.user_info.length - 1) >= this.state.index}
    query(){
        console.log('点击了查询');
        if(''==this.state.recharge_number && ''==this.state.user_name &&''==this.state.user_mobile)
        return   tool.ui.error({msg:'至少输入一个参数',callback:(close) => {close();}});
        let pramas = {
            token: 'token'.getData(),
            cardNumber: this.state.recharge_number,
            user_name: this.state.user_name,
            user_mobile: this.state.user_mobile,
            limit: 1000,
        }
        api.post('balanceTotal', pramas, (res, ver, handle) => {
            console.log(res)
            if (ver && res && res.result.list.length > 0) { 
                this.setState({ user_info: res.result.list, nodatas: false });
            }else{
                this.setState({ user_info: [], nodatas: true });
            }
        });
    }
    handleclick(e){
        console.log(e.target.dataset.index || e.target.parentNode.dataset.index);
        this.setState({index:e.target.dataset.index || e.target.parentNode.dataset.index});
    }
    render() {
        let V = null === this.state.clickNum ? null : this.router[this.state.clickNum];
        var userinfo=this.state.user_info.map((item,index) => 
        <tr key={'item'+index} data-index={index} onClick={this.handleclick} id={this.state.index==index?'selecttr':null}>
            <td>{item.mname}</td>
            <td>{item.recharge_number}</td>
            <td>{item.user_name}</td>
            <td>{item.user_mobile}</td>
            <td>{item.card_name}</td>
            <td>{item.balance}</td>
            <td>{item.type==1?'可用':(item.type==2?'挂失':'冻结')}</td>
        </tr>
        );
        return (
            <Window title='挂失、补换卡' onClose={this.props.closeView}>
            <div>
                <div className="change_card_date">
                    <div className="change_card_date_left">
                        <div>卡号：<input type="text" value={this.state.recharge_number} onChange={e => this.setState({recharge_number:e.target.value})}/></div>
                        <div>姓名：<input type="text" value={this.state.user_name} onChange={e => this.setState({user_name:e.target.value})}/></div>
                        <div>手机号：<input type="text" value={this.state.user_mobile} onChange={e => this.setState({user_mobile:e.target.value})}/></div>
                    </div>
                    <button type='button' className='e-btn ' onClick={this.query}>查询</button>
                </div>               
                <table className='ui-table-base lrc-card-tab' >
                    <thead>
                        <tr> 
                            <td>发卡店</td>
                            <td>卡号</td>
                            <td>姓名</td>
                            <td>手机号</td>
                            <td>卡类型</td>
                            <td>金额</td>
                            <td>挂失状态</td>
                        </tr>
                    </thead>
                    <tbody>
                      {userinfo}
                      {this.state.nodatas && <Nodata />}
                    </tbody>
                </table>
                <div className='bothpages-btn-part'>
                    <button type='button' className='e-btn' onClick={() => this.hasUser() && this.setState({clickNum: 'LossReport' })}>挂失</button>
                    <button type='button' className='e-btn' onClick={() => this.hasUser() && this.setState({clickNum: 'RemoveLossCard' })}>解除挂失</button>
                    <button type='button' className='e-btn' onClick={() => this.hasUser() && this.setState({clickNum: 'ChangeCard' })}>换卡</button>
                    <button type='button' className='e-btn' onClick={() => this.hasUser() && this.setState({clickNum: 'ReissueCard' })}>补卡</button>
                </div>
            </div>
            {
                V && 
                <V 
                    data={{
                        cardNumber:this.state.user_info[this.state.index].card_number,
                        discount:this.state.user_info[this.state.index].discount,
                        user_name:this.state.user_info[this.state.index].user_name,
                        balance:this.state.user_info[this.state.index].balance,
                        user_mobile:this.state.user_info[this.state.index].user_mobile,
                        card_name:this.state.user_info[this.state.index].card_name,
                        recharge_number:this.state.user_info[this.state.index].recharge_number,
                        id:this.state.user_info[this.state.index].id,
                        mname:this.state.user_info[this.state.index].mname,
                        mid:this.state.user_info[this.state.index].mid
                    }} 
                    refresh={this.query}
                    onClose={() => this.setState({ clickNum: null})}
                />
            }
            </Window>
        );
    }
}