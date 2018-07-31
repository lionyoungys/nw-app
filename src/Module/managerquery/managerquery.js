/**
 * 经理查询
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import './Managerquery.css'
import Page from '../../UI/Page';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startdate:tool.date('Y-m-01'),enddate:tool.date('Y-m-d'),
            show: false,
            result: {},
            list:[],
            page: 1,
            count: 0,
        };
        this.limit = 10;
        this.map = {
            free: '免费',
            freeBackCard: '免费退卡',
            cardPay: '刷卡',
            cardOther: '刷卡其他',
            cardReplenish: '刷卡补交',
            cardGroup: '刷集团卡',
            cardGroupOther: ' 刷集团卡其他',
            cardGroupReplenish: '刷集团卡补交',
            cardHand: '手持机刷卡',
            cardHandReplenish: '手持机刷卡补交',
            noPay: '未付款',
            noPayReplenish: '未付款补交',
            cash: '现金',
            cashRecharge: '现金充值',
            cashOther: '现金其他',
            cashCard: '现金发卡',
            cashReplenish: '现金补交',
            cashBackCard: '现金退卡',
            ticket: '赠券',
            ticketRecharge: '赠券充值',
            ticketOther: '赠券其他',
            ticketCard: '赠券发卡',
            ticketReplenish: '赠券补交',
            ticketBackCard: '赠券退卡',
            total: '合计'
        };
        this.query = this.query.bind(this);   
    };
    componentDidMount() { this.query()}
    query(page){
        page = page || this.state.page;
        let done;
        tool.ui.loading(handle => done = handle);
        api.post('managerSearch', {
            start_time:this.state.startdate,
            end_time:this.state.enddate,
            token:'token'.getData(),
            operator:''
        }, (res, ver,handle) => {
            done();
            if (ver && res) {
                console.log(res)
                this.setState({ result: res.result,list:res.result.list,count:res.result.count,page:page});
            }else{
                handle()
            }
        },()=>done());
    }
    render() {
        let arr = [],
            result = this.state.result,
            temp;
        for (let k in this.map) {
            temp = result[k] || {};
            arr.push(
                <tr key = {k}>
                    <td onClick={() => this.setState({ show: true })}>{this.map[k]}</td>
                    <td>{temp.amount || 0}</td>
                    <td>{temp.real_amount || 0}</td>
                    <td>{temp.work_number || 0}</td>
                </tr>
            );
        } 
        var list = this.state.list.map((item, index) => <tr key={'item'+index}>
            <td>{item.serialsn}</td>
            <td>{item.operator}</td>
            <td>{item.work_number}</td>
            <td>{item.amount}</td>
            <td>{item.real_amount}</td>
            <td>{item.discount}</td>
            <td>{item.pay_type}</td>
            <td>{item.user_mobile}</td>
            <td>{item.user_name}</td>
            <td>{item.time}</td>
            <td>{item.recharge_number}</td>
            <td>{item.card_type}</td>
        </tr>
        )
        return (
            <Window title='经理查询' onClose={this.props.closeView}>
               <div className="Succession_data">
                            <div className="Succession_dataLeft managerquery_dataLeft">
                                <div>操作员：<Select option={['经理','店员','老板']} selected='店员' readOnly={true} onChange={value => console.log(value)}/></div>                           
                                <div>开始日期：<input type="date" value={this.state.startdate} onChange={e => this.setState({startdate:e.target.value})}/></div>
                                <div>结束日期：<input type="date" value={this.state.enddate} onChange={e => this.setState({enddate:e.target.value})}/></div>
                            </div>
                            <button className="e-btn managerquery_btn" onClick={() => this.query(this.state.page)}>查询</button> 
                </div>                                    
                <table className='ui-table-base man-que-tab'>
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
                <table className='ui-table-base man-que-tab-two'>
                    <thead>
                        <tr>
                            <td>流水号</td>
                            <td>店员姓名</td>
                            <td>衣物件数</td>
                            <td>金额</td>
                            <td>实收金额</td>
                            <td>折扣率</td>
                            <td>收款类型</td>
                            <td>客户电话</td>
                            <td>客户姓名</td>
                            <td>时间</td>
                            <td>卡号</td>
                            <td>卡类型</td>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table> 
                <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)} />                         
            </Window>
        );
    }
}