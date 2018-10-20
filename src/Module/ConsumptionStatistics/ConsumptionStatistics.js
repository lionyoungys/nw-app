/**
 * 消费统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import './ConsumptionStatistics.css'
import Window from '../../UI/Window';
import Page from '../../UI/Page';
import Nodata from '../../UI/nodata';

export default class extends Component {   
    constructor(props) {
        super(props);  
        this.state={
            startdate: tool.date('Y-m-01'),
            enddate: tool.date('Y-m-d'),
            order_total: '0',
            amount_total: '0',//应收
            real_total: '0',//实收
            list: [],
            page: 1,
            count: 1,
            nodatas:false,
        }  
        this.limit = 15;
        this.query = this.query.bind(this);        
    }; 
    componentDidMount() { this.query()};
    query(page) { 
        console.log(page);
        page = page || this.state.page;
        api.post('consumeSta', { token: 'token'.getData(), page: page, limit: this.limit, start_time: this.state.startdate, end_time:this.state.enddate }, (res, ver, handle) => {
            if (ver && res) {
                console.log(res);
                if(res.result.list.length > 0){
                    this.setState({ 
                        order_total: res.result.order_total, 
                        amount_total: res.result.amount_total, 
                        real_amount: res.result.real_amount_total,
                        list: res.result.list, 
                        count: res.result.count, 
                        page: page,
                        nodatas:false,
                     });
                }else{
                    this.setState({
                        nodatas:true,
                        list:[],
                        count:1,
                        page:1,
                        order_total: '0',
                        amount_total: '0',
                        real_amount:'0',
                    })
                }
            } else {
                handle();
            }
        });
    }
    render() { 
        var list = this.state.list.map((item, index) => <tr key={'item' + index}>
            <td>{index+1}</td>
            <td>{item.serialsn}</td>
            <td>{item.work_number}</td>
            <td>{item.amount}</td>
            <td>{item.real_amount}</td>
            <td>{item.discount}</td>
            <td>{item.pay_type}</td>
            <td>{item.user_name}</td>
            <td>{item.user_mobile}</td>   
            <td>{item.time}</td>
            <td>{item.state == 0? '否':'是'}</td>
            <td>{item.join_state == 0 ? '否' : '是'}</td>    
        </tr>
        )       
        return ( 
               <Window title='消费统计' onClose={this.props.closeView}>  
                                        
                <div className="bothpages_list">
                    <div className="unpaidstatistics_dataLeft" id="balancestatistics_title_left">
                        <div>开始日期：<input type="date" className='e-date' value={this.state.startdate} onChange={e=>this.setState({startdate:e.target.value})}/></div>
                        <div>结束日期：<input type="date" className='e-date' value={this.state.enddate} onChange={e=>this.setState({enddate:e.target.value})}/></div>
                    </div>
                    <button className="e-btn recharg-btn" onClick={()=>this.query(1)}>查询</button>
                    
                </div>
                <div className='con-sta-total'>
                    <div>累计订单数：<b>{this.state.order_total}</b></div>
                    <div>合计应收金额：<b>¥{this.state.amount_total}元</b></div>
                    <div>合计实收金额：<b>¥{this.state.real_amount}元</b></div>
                </div>
                <table className='ui-table-base bal-sta-tab consun-tab'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>流水号/订单号</td>
                            <td>数量</td>
                            <td>应收金额</td>
                            <td>实收金额</td>
                            <td>折扣率</td>
                            <td>收银类型</td>
                            <td>姓名</td>
                            <td>手机号</td>                               
                            <td>交易时间</td>
                            <td>上缴</td> 
                            <td>交班</td> 
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                        {this.state.nodatas&&<Nodata />}
                    </tbody>  
                </table>                          
                <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)} />   
                </Window> 
        );            
    };
}






