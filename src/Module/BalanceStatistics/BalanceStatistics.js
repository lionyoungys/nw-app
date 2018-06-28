/**
 * 余额统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import '../../UI/bothpages.css'
import './BalanceStatistics.css'
export default class extends Component {   
    constructor(props) {
        super(props);  
        this.state={
            user_total:'',
            balance_total:'',
            list:[],
            startdate:tool.date('Y-m-01'),
            enddate:tool.date('Y-m-d'),
            page:1,
            limit:15,
            pageCount: 1,
            count:1,
        };         
    }; 
    componentDidMount() {
        api.post('balanceTotal', {token:'token'.getData(),page:this.state.page,limit:this.state.limit}, (res, ver,handle) => {
            if (ver && res) {
                console.log(res)
                this.setState({user_total:res.result.user_total,balance_total:res.result.balance_total,list:res.result.list,count:res.result.count});
            }else{
                handle();
            }
        });
    }
    render() {    
        var list=this.state.list.map((item,index) => <tr key={'item'+index}>
            <td>{index+1+(this.state.page-1)*10}</td>
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
            <div>
               <Window title='余额统计' onClose={this.props.closeView}>   
                   <div className="balancestatistics_title">
                     <div className="unpaidstatistics_dataLeft" id="balancestatistics_title_left" style={{marginLeft:'0px'}}>
                            <div>开始日期：<input type="date" value={this.state.startdate} onChange={e=>this.setState({startdate:e.target.value})} /></div>
                            <div>结束日期：<input type="date" value={this.state.enddate} onChange={e=>this.setState({enddate:e.target.value})}/></div>
                      </div>
                      <div className="balancestatistics_title_left" >
                         <span>累计会员数： <b>{this.state.user_total}</b></span>
                         <span>累计会员余额： <b>￥{this.state.balance_total}</b></span>
                         <button>查询</button>
                      </div>
                      <div className="balancestatistics_title_right"></div>
                    </div>
                    <table className='ui-table-base bal-sta-tab'>
                        <thead>
                            <tr>
                                <td></td>
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
                        </tbody>  
                    </table>
                    <div className="bothpages-footer">
                       <div className="bothpages-footer-btn">
                            <span>首页</span>
                            <span>上一页</span>
                            <span>下一页</span>
                            <span>尾页</span>
                       </div>
                       <div className="bothpages-footer-all">第 <span>{this.state.page}</span> 页/共 <span>{this.state.pageCount}</span> 页</div>
                       <div className="bothpages-footer-both">每页 <span>{this.state.limit}</span> 条，共 <span>{this.state.count}</span> 条</div>
                    </div>
               </Window> 
            </div>
        );            
    };
}