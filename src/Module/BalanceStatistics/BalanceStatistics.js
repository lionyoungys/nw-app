/**
 * 余额统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import '../../UI/bothpages.css';
import './BalanceStatistics.css';
import Page from '../../UI/Page';
import Nodata from '../../UI/nodata';

export default class extends Component {   
    constructor(props) {
        super(props);  
        this.state={
            user_total:'0',
            balance_total:'0',
            list:[],
            page:1,
            count:0,
            nodatas:false,
        };     
        this.limit = 15;
        this.query = this.query.bind(this);
    }; 
    componentDidMount() {
        this.query()
    }
    // 网络请求
    query(page) {
        console.log(page);
        page = page || this.state.page;
        api.post('balanceTotal', { token: 'token'.getData(), page: page, limit: this.limit }, (res, ver, handle) => {
            if (ver && res) {
                console.log(res)
                this.setState({
                    user_total: res.result.user_total || '0',
                    balance_total: res.result.balance_total || '0',
                    list: res.result.list,
                    count: res.result.count || 0,
                    page: res.result.list.length > 0 ? page:this.state.page,
                    nodatas: res.result.list.length > 0 ?false :true,
                });
                
            } else {
                handle();
            }
        });
    } 
    render() {    
        var list=this.state.list.map((item,index) => <tr key={'item'+index}>
            <td>{index+1+(this.state.page-1)*this.limit}</td>
            <td>{item.card_number}</td>
            <td>{item.card_name}</td>
            <td>{item.discount}%</td>
            <td>{item.user_name}</td>
            <td>{item.user_mobile}</td>
            <td>{item.balance}</td>
            <td>{item.time}</td>
        </tr>
        )
        return ( 
            <div>
               <Window title='余额统计' onClose={this.props.closeView}>   
                    <div className="bal-head" >
                        <span>累计会员数：<b>{this.state.user_total}</b></span>
                        <span>累计会员余额：<b>￥{this.state.balance_total}</b>元</span>
                    </div>
                    <table className='ui-table-base bal-sta-tab bal-tab'>
                        <thead>
                            <tr>
                                <td>序号</td>
                                <td>卡号</td>
                                <td>卡类型</td>
                                <td>折扣率</td>
                                <td>姓名</td>
                                <td>手机号</td>
                                <td>余额</td>
                                <td>办卡时间</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                            {this.state.nodatas&&<Nodata />}
                        </tbody>  
                    </table>
                    <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)}/>   
               </Window> 
            </div>
        );            
    };
}