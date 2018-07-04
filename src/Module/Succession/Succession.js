/**
 * 交班界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import './Succession.css'

export default class extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            result:{},
        };
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
        this.successionHandle = this.successionHandle.bind(this);        
    }; 
    // 获取数据
    componentDidMount(){
        api.post('succession', {token: 'token'.getData() }, (res, ver,handle) => {
            console.log(res)
            if (ver && res) {  
                this.setState({ result: res.result});
            } else {
                handle();
            }
        });
    }
    // 交班网络请求
    successionHandle() {
        api.post('successionHandle', {token: 'token'.getData() }, (res, ver, handle) => {
            console.log(res)
            handle();
        });
    }
    render() {
        let arr = [],
            result = this.state.result,
            temp;
        for (let k in this.map) {
            temp = result[k] || {};
            arr.push(
                <tr>
                    <td onClick={() => this.setState({ show: true })}>{this.map[k]}</td>
                    <td>{temp.amount || 0}</td>
                    <td>{temp.real_amount || 0}</td>
                    <td>{temp.work_number || 0}</td>
                </tr>
            );
        } 
        return (
            <Window title='交班' onClose={this.props.closeView}>
                <div className="ope-inc-head">
                    <a>统计时间：{this.state.result.dateStartTime} 至 {this.state.result.dateEndTime}</a>
                    <button className='e-btn' onClick={this.successionHandle}>交班</button>
                    <a>操作员：{'aname'.getData()}</a>
                </div>
                <table className='ui-table-base succession-tab'>
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
            </Window>

       );
    }
}