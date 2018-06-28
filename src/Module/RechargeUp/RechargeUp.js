/**
 * 充值统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';

export default class extends Component {   
    constructor(props) {
        super(props);  
        this.state={
            user_total: '',
            balance_total: '',
            list: [],
            startdate: tool.date('Y-m-01'),
            enddate: tool.date('Y-m-d'),
            page: 1,
            limit: 15,
            pageCount: 1,
            count: 1,
        }         
    }; 
    componentDidMount() {
        api.post('balanceTotal', { token: 'token'.getData(), page: this.state.page, limit: this.state.limit }, (res, ver, handle) => {
            if (ver && res) {
                console.log(res)
                this.setState({ user_total: res.result.user_total, balance_total: res.result.balance_total, list: res.result.list, count: res.result.count });
            } else {
                handle();
            }
        });
    }
    render() {   

        var list = this.state.list.map((item, index) => <tr key={'item' + index}>
                <td>{index + 1 + (this.state.page - 1) * 10}</td>
                <td>{item.card_number}</td>
                <td>{item.card_name}</td>
                <td>{item.discount}</td>
                <td>{item.user_name}</td>
                <td>{item.user_mobile}</td>
                <td>{item.balance}</td>
                <td>{item.time}</td>
            </tr>
        )  
        return ( 
               <Window title='充值统计' onClose={this.props.closeView}>  
                                        
                        <div className="bothpages_list">                                
                            <div className="unpaidstatistics_dataLeft" id="balancestatistics_title_left">
                                <div>开始日期：<input type="date"  value={this.state.startdate} onChange={e=>this.setState({startdate:e.target.value})}/></div>
                                <div>结束日期：<input type="date"  value={this.state.enddate} onChange={e=>this.setState({enddate:e.target.value})}/></div>
                            </div>
                            <button className="e-btn recharg-btn">查询</button>
                            <div id="balancestatistics-leiji">累计充值金额 :<b>25648元</b></div>
                            <div id="balancestatistics-zengsong">累计赠送金额 :<b>123元</b></div>                            
                        </div>
                        <table className='ui-table-base bal-sta-tab'>
                        <thead>
                            <tr>
                                <td></td>
                                <td>卡号</td>
                                <td>卡类型</td>
                                <td>充值金额</td>
                                <td>赠送金额</td>
                                <td>姓名</td>
                                <td>手机号</td>
                                <td>交易时间</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>  
                    </table>
                        <div className="bothpages-footer">
                            <div className="bothpages-footer-btn">
                                    <span>首页</span>
                                    <span>上一页</span>
                                    <span>下一页</span>
                                    <span>尾页</span>
                            </div>
                            <div className="bothpages-footer-all">第<span>1</span>页/共<span>4</span>页</div>
                            <div className="bothpages-footer-both">每页<span>20</span>条，共<span>112</span>条</div>
                        </div>
                </Window> 
        );            
    };
}