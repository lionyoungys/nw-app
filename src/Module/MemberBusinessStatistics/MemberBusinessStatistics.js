/**
 * 会员业务统计
 * @author ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import './MemberBusinessStatistics.css';
import Page from '../../UI/Page'
import { retry } from 'rxjs/operators';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startdate: tool.date('Y-m-d'), enddate: tool.date('Y-m-d'),
            name:'',
            mobile:'',
            cardNum:'',
            total:{},//tab1数据
            list:[],
            page: 1,
            count: 0,
        }
        this.limit = 10;
        this.searchRes = this.searchRes.bind(this);  
        this.clear = this.clear.bind(this);  
        this.pageCallback = this.pageCallback.bind(this);  
    };
    searchRes(page){
        if ('' == this.state.name && '' == this.state.mobile && '' == this.state.cardNum) 
        return tool.ui.error({
            title: '提示', msg: '姓名/手机号/卡号至少填写一项信息', button: '确定', callback: (close, event) => {
                close();
            }
        });
        api.post('memSta', {
            token: 'token'.getData(),
            user_name: this.state.name,
            user_mobile: this.state.mobile,
            card_num: this.state.cardNum,
            start_time: this.state.startdate,
            end_time: this.state.enddate,
            page: page,
            limit: this.limit,     
        }, (res, ver,handle) => {
            if (ver && res) {
                console.log(res);
                this.setState({ count: res.result.count, total: res.result.total, list: res.result.list,page:page})
            } else {
                handle();
            }
        });
    }
    clear(){

        this.setState({ name: '', mobile: '', cardNum: '', total: {}, list: [], page: 1, count: 0})
    }
    pageCallback(page){
        this.searchRes(page);
    }
    render() {
 
        var list = this.state.list.map((item, index) =>
            <tr key = {'item'+index}>
                <td>{item.card_coding}</td>
                <td>{item.card_num}</td>
                <td>{item.mid}</td>
                <td>{item.user_mobile}</td>
                <td>{item.operator}</td>
                <td>{item.money ? ('¥' + item.money) : ''}</td>
                <td>{item.operate_type}</td>
                <td>{item.time}</td>
                <td>{''}</td>
                <td>{item.balance}</td>
                <td>{item.user_name}</td>
                <td>{item.card_type}</td>
                <td>{''}</td>
                <td>{item.deal_sn}</td>
                <td>{''}</td>
                <td>{item.card_value}</td>
                <td>{''}</td>
                <td>{''}</td>
            </tr>
        )
        return (
            <Window title='会员业务统计'  onClose={this.props.closeView}>    
                <div className="mem_bus_sta_top">
                    <div className='mem_bus_sta_top_one'>
                        <div>&emsp;开始时间：<input type="date" className='ui-date' value = {this.state.startdate} onChange={e => this.setState({startdate:e.target.value})}/></div>                           
                        <div>&emsp;结束时间：<input type="date" className='ui-date' value = {this.state.enddate} onChange={e => this.setState({enddate:e.target.value})}/></div>
                        <button className='e-btn' onClick={this.clear}>清空</button>
                         </div>
                    <div className='mem_bus_sta_top_two'>
                        <div>&emsp;&emsp;&emsp;姓名：<input type="text" className='e-input' value={this.state.name} onChange={e=>this.setState({name:e.target.value})}/></div>                           
                        <div>&emsp;&emsp;&emsp;手机：<input type="text" className='e-input' value={this.state.mobile} onChange={e => this.setState({ mobile: e.target.value })}/></div>
                        <div>&emsp;&emsp;&emsp;卡号：<input type="text" className='e-input' value={this.state.cardNum} onChange={e => this.setState({ cardNum: e.target.value })}/></div>
                        <button className='e-btn' onClick={()=>this.searchRes(1)}>查询</button>
                    </div>
                </div>
                <p className='mem-bus-sta-p'>财务合计</p>
                <table className='ui-table-base auto-width mem-bus-auto-tab' >
                        <thead>
                            <tr>
                                <td>合计</td>
                                <td>发卡</td>
                                <td>充值</td>
                                <td>刷卡</td>
                                <td>刷卡补交</td>
                                <td>退卡</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.total.amount || 0}</td>
                                <td>{this.state.total.send || 0}</td>
                                <td>{this.state.total.recharge || 0}</td>
                                <td>{this.state.total.cardpay || 0}</td>
                                <td>{this.state.total.repair || 0}</td>
                                <td>{this.state.total.return || 0}</td>
                            </tr>
                        </tbody>
                    </table>
                <p className='mem-bus-sta-p'>消费明细</p>
                    <table className='ui-table-base mem_bus_sta_table_two'>
                        <thead>
                            <tr>
                                <td>卡编号</td>
                                <td>卡号</td>
                                <td>发卡店</td>
                                <td>客户电话</td>
                                <td>店员姓名</td>
                                <td>金额</td>
                                <td>类别</td>
                                <td>日期</td>
                                <td>是否上传</td>
                                <td>卡余额</td>
                                <td>客户姓名</td>
                                <td>卡类型</td>
                                <td>单位</td>
                                <td>流水号</td>
                                <td>导出</td>
                                <td>卡面值</td>
                                <td>联盟卡</td>
                                <td>增加信用额度</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
                    <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page=>this.pageCallback(page)} />
                         
            </Window>
        );
    }
}   