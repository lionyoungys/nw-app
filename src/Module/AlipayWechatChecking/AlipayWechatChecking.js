/**
 * 支付宝 微信对账
 * @author ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Pages from '../../UI/Page';
import Select from '../../UI/Select';
import './AlipayWechatChecking.css';
import Nodata from '../../UI/nodata';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: tool.date('Y-m-01'),
            endDate: tool.date('Y-m-d'),
            nodatas:false,
            page:1,
            bankInfo:{},
            list:[],
            count:0,
            selectType: '',//2,微信。3，支付宝默认全部)
        }
        this.type = ['全部', '支付宝', '微信'];
        this.limit = 15;
        this.query = this.query.bind(this);
        this.changePayType = this.changePayType.bind(this);
    }
    componentDidMount(){
        this.query();
    }
    changePayType(value){
        var pay_type = value;
        console.log(pay_type);
        if (pay_type == '全部') {
            this.setState({ selectType:''})
        } else if (pay_type == '支付宝') {
            this.setState({ selectType: '3' })
        } else if (pay_type == '微信') {
            this.setState({ selectType: '2' })
        }
    }
    query(page){
        page = page || this.state.page;
        let pramas = {
            token: 'token'.getData(),
            page: this.state.page,
            limit: this.limit,
            pay_way: this.state.selectType,
            start_time: this.state.startDate,
            end_time: this.state.endDate,
        }
        console.log(pramas);
        api.post('aliWechatPayInfo', pramas, (res, ver, handle) => {
            if (ver && res) {
                console.log(res);
                this.setState({ bankInfo: res.result.bankInfo, list: res.result.list, count: res.result.count, page: page, nodatas: res.result.list.length > 0 ? false : true,})
            }else{
                handle();
            } 
        });
    }
    render() {
        var list = this.state.list.map((item,index)=>
            <tr key= {'item'+index}>
                <td className='ali-wechat-check-tab-1'>{item.trade_sn}</td>
                <td className='ali-wechat-check-tab-2'>{item.pay_type}</td>
                <td className='ali-wechat-check-tab-3'>{item.remark}</td>
                <td className='ali-wechat-check-tab-4'>{item.amount}</td>
                <td className='ali-wechat-check-tab-6'>{item.balance}</td>
                <td className='ali-wechat-check-tab-7'>{item.time}</td>
            </tr>
        );
        return (
            <Window title='支付宝、微信对账' onClose={this.props.closeView}>
            <div>
                <div className="ali-wechat-check-head">
                    <p>温馨提示：微信、支付宝收款结算周期为T+7，平台将通过银行打款结算至<b>{this.state.bankInfo.bank || '********'}{this.state.bankInfo.account || '********'}</b>账户，每个账期内余额借款最低1000元起，不满1000元将累计至下一个账期结算。</p>
                    <p>余额：¥{this.state.bankInfo.balance || '0'}</p>
                </div>
                <div style={{margin:'18px 0 14px 18px'}}>余额明细</div>
                <div className="ali-wechat-check-title">
                    <button type='button' className='e-btn' onClick={() => this.query(1)}>查询</button>
                    <span>
                        <a><b>*</b>结束时间：</a>
                        <input type='date' className='e-date' value={this.state.endDate} onChange={e => this.setState({ endDate: e.target.value })} />
                    </span>
                    <span>
                        <a><b>*</b>开始时间：</a>
                        <input type='date' className='e-date' value={this.state.startDate} onChange={e => this.setState({ startDate: e.target.value })} />
                    </span>
                    <span>
                        <a><b>*</b>交易通道：</a>
                        <Select option={this.type} onChange={value=>this.changePayType(value)} />
                    </span>  
                </div>
                <table className='ui-table-base ali-wechat-check-tab'>
                    <thead>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>交易单号</td>
                            <td className='ali-wechat-check-tab-2'>交易类型</td>
                            <td className='ali-wechat-check-tab-3'>交易用途</td>
                            <td className='ali-wechat-check-tab-4'>交易金额</td>
                            <td className='ali-wechat-check-tab-6'>余额</td>
                            <td className='ali-wechat-check-tab-7'>交易时间</td>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                        {this.state.nodatas && <Nodata />}
                    </tbody>
                </table>
                <Pages current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)}/>
            </div>
            </Window>
        );
    }
}