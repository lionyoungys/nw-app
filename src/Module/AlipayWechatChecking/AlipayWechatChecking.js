/**
 * 支付宝 微信对账
 * @author ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Pages from '../../UI/Page';
import Select from '../../UI/Select';
import './AlipayWechatChecking.css';
import Nodata from '../../UI/Nodata';

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
            selectType:'全部',
        }
        this.type =['全部','支付宝','微信'];
        this.limit = 15;
        this.query = this.query.bind(this);
    }
    componentDidMount(){
        this.query();
    }
    query(page){
        page = page || this.state.page;
        let pramas = {
            token: 'token'.getData(),
            page: this.state.page,
            limit: this.limit,
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
                <td className='ali-wechat-check-tab-1'>{item.serialsn}</td>
                <td className='ali-wechat-check-tab-2'>{item.pay_type}</td>
                <td className='ali-wechat-check-tab-3'>{item.pay_type}</td>
                <td className='ali-wechat-check-tab-4'>{item.real_amount}</td>
                <td className='ali-wechat-check-tab-5'>{item.real_amount * 0.01}</td>
                <td className='ali-wechat-check-tab-6'>{item.balance}</td>
                <td className='ali-wechat-check-tab-7'>{item.time}</td>
            </tr>
        );
        return (
            <Window title='支付宝、微信对账' onClose={this.props.closeView}>
            <div>
                <div className="ali-wechat-check-head">
                    <p>温馨提示：微信、支付宝收款结算周期为T+7，平台将通过银行打款结算至<a>{this.state.bankInfo.bank || '********'}</a><b>{this.state.bankInfo.account || '********'}</b>账户，每个账期内余额借款最低1000元起，不满1000元将累计至下一个账期结算。</p>
                    <p>余额：¥{this.state.bankInfo.balance || '0'}</p>
                </div>
                <div className="ali-wechat-check-title">
                    <a>余额明细</a>
                    <button type='button' className='e-btn' onClick={() => this.query(1)}>查询</button>
                    <span>
                        <a><b>*</b>结束时间：</a>
                        <input type='date' className='ui-date' value={this.state.endDate} onChange={e => this.setState({ endDate: e.target.value })} />
                    </span>
                    <span>
                        <a><b>*</b>开始时间：</a>
                        <input type='date' className='ui-date' value={this.state.startDate} onChange={e => this.setState({ startDate: e.target.value })} />
                    </span>
                    <span>
                        <a><b>*</b>交易类型：</a>
                        <Select option={this.type} onChange={value => this.setState({ selectType: value })} />
                    </span>  
                </div>
                <table className='ui-table-base ali-wechat-check-tab'>
                    <thead>
                        <tr>
                            <td className='ali-wechat-check-tab-1'>交易单号</td>
                            <td className='ali-wechat-check-tab-2'>交易类型</td>
                            <td className='ali-wechat-check-tab-3'>备注</td>
                            <td className='ali-wechat-check-tab-4'>交易金额</td>
                            <td className='ali-wechat-check-tab-5'>交易手续费</td>
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