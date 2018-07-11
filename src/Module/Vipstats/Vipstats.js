/**
 * 会员分类统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import { WSAEINVALIDPROCTABLE } from 'constants';
import Window from '../../UI/Window';
import Page from '../../UI/Page';
import './Vipstats.css';

export default class extends Component {   
    constructor(props) {
        super(props);   
        this.state = {
            startdate:tool.date('Y-m-01'),
            enddate:tool.date('Y-m-d'),            
            list:[],
            allcount:0,           
            card_type:[],
            user_total: '',
            total_amount: '', 
            page: 1,
            count: 1,     
        }  
        this.limit = 10;      
        this.query = this.query.bind(this);                     
    } 
    query(page) {
        console.log();
        api.post('vipstate', { 
            token: 'token'.getData(), 
            start_time: this.state.startdate, 
            end_time: this.state.enddate,
            page:page, 
            limit:this.limit,
        }, (res, ver, handle) => {
            if (ver && res) {
                console.log(res);
                this.setState({
                    card_type:res.result.cardType,
                    allcount:res.result.count,
                    list:res.result.list,
                    total_amount: res.result.total_amount, 
                    count: res.result.count,
                    page:page,
                });
            } else {
                handle();
            }
        });
    }
    render() {
       var arr = ['查询'].map((item,index) =><button key={index} data-index={index} onClick={()=>this.query(1)}>{item}</button>);
       var list = this.state.card_type.map((item,index) =>
           <tr key = {'item' + index}>
                <td>{index + 1}</td>
                <td>{item.card_type}</td>
                <td>{item.number}</td>
                <td>{item.amount}</td>
           </tr>
       )
        var detail = this.state.list.map((item,index) =>
          <tr key={'item'+index}>
            <td>{index + 1 + (this.state.page - 1) * this.limit}</td>
            <td>{item.card_coding}</td>
            <td>{item.card_num}</td>
            <td>{item.mid}</td>
            <td>{item.user_mobile}</td>
            <td>{item.operator}</td>              
            <td>{item.money}</td>             
            <td>{item.time}</td>
            <td>{item.balance}</td>
            <td>{item.user_name}</td>
            <td>{item.card_type}</td>             
            <td>{item.deal_sn}</td>
            <td>{item.card_value}</td>
            <td>{item.operate_type}</td>
            <td>{item.card_discount}</td> 
        </tr>
        )
       return (             
            <Window title='会员分类统计' onClose={this.props.closeView}>   
                        <div className="revokedata_data">
                            <div className="revokedata_dataLeft">
                                <div>开始日期：<input type="date" value={this.state.startdate} onChange={e=>this.setState({startdate:e.target.value})}/></div>                           
                                <div>结束日期：<input type="date" value={this.state.enddate} onChange={e=>this.setState({enddate:e.target.value})}/></div>                               
                            </div>                            
                            <div className="revokedata_dataright">
                              {arr}
                            </div>
                        </div>                        
                        <div className="Pay-tatol">
                           <div className="Pay-tatol-title">分类合计</div>
                           <table>
                               <thead>
                                   <tr>
                                       <th></th>
                                       <th>卡类型</th>
                                       <th>刷卡数</th>
                                       <th>刷卡金额</th>
                                   </tr>
                               </thead>
                               <tbody> 
                                  {list}
                               </tbody>
                           </table>
                        </div>
                        <div className="Payout-detail Vipstats">
                           <div className="Payout-detail-title vip-sta-tab">消费明细</div>
                           <table>
                               <thead>
                                   <tr>
                                       <th></th>
                                       <th>卡ID</th>
                                       <th>卡号</th>
                                       <th>发卡店</th>
                                       <th>客户电话</th>
                                       <th>店员姓名</th>
                                       <th>金额</th>                                                                            
                                       <th>时间</th>                                      
                                       <th>卡余额</th>                                                                            
                                       <th>客户姓名</th>
                                       <th>卡类型</th>                                       
                                       <th>流水号</th>                                      
                                       <th>卡面值</th>
                                       <th>交易类型</th>  
                                       <th>折扣率</th>                                     
                                   </tr>                                  
                               </thead>
                               <tbody>
                                      {detail}                               
                               </tbody>
                           </table>                       
                        </div>
                        <Page current={this.state.page} total={this.state.count} fetch = {this.limit} callback={page=> this.query(page)}/>                            
             </Window> 
        );
    }
}