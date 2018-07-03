/**
 * 赔付统计界面组件
 * @author fanyerong && ranchong
 * 修改日志:6/30 调试完成接口（ranchong）
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Page from '../../UI/Page';
import './Payoutstats.css';

export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state = {
            startdate: tool.date('Y-m-01'),
            enddate: tool.date('Y-m-d'),
            total_amount: '',
            card_amount: '',//刷卡退款
            cash_amount: '',//现金退款
            voucher_amount: '',//收券退款
            list: [],
            item:{},
            page: 1,
            count: 1,
        }
        this.limit = 15;
        this.query = this.query.bind(this); 
        this.handleclick = this.handleclick.bind(this);
        this.arrbutton = this.arrbutton.bind(this);             
    }; 
    query(page) {
        console.log(page);
        page = page || this.state.page;
        api.post('compensate', { token: 'token'.getData(), start_time: this.state.startdate, end_time: this.state.enddate, page: page, limit: this.limit }, (res, ver, handle) => {
            console.log(res);
            if (ver && res) {   
                this.setState({ total_amount: res.result.total_amount, card_amount: res.result.card_amount, cash_amount: res.result.cash_amount, voucher_amount: res.result.voucher_amount, list: res.result.list, count: res.result.count, page: page });
            } else {
                handle();
            }
        });
    }
    handleclick(index) {
        console.log(index);
        this.setState({item:this.state.list[index]});
    }
    // 点击查询0、打印1、退出2
    arrbutton(index){
        
        if (index == 0) {//查询
            this.query(1);
        }else if (index==1) {
            console.log('打印');
            
        }else{
            console.log('退出');
            this.props.closeView();
        }
    }
    render() {
        var list = this.state.list.map((item, index) => <tr key={'item' + index} onClick={()=>this.handleclick(index)}>
        
            <td>{index + 1 + (this.state.page - 1) * this.limit}</td>
            <td>{item.serialsn}</td>
            <td>{item.user_name}</td>
            <td>{item.user_mobile}</td>
            <td>{item.back_amount}</td>
            <td>{item.time}</td>
            <td>{item.operator}</td>
            <td>{item.type}</td>
            <td>{item.clothing_name}</td>
            <td>{item.clothing_type}</td>
            <td>{item.cause}</td>
            <td>{item.back_type}</td>
            <td>{item.feedback}</td>
        </tr>
        )  
       var arr = ['查询','打印','退出'].map((item,index) =><button key={index} onClick={()=>this.arrbutton(index)}>{item}</button>);
       return (             
            <Window title='赔付统计' onClose={this.props.closeView}>   
            <div className="revokedata_data">
                <div className="revokedata_dataLeft">
                    <div>开始日期：<input type="date" value={this.state.startdate} onChange={e => this.setState({ startdate: e.target.value })}/></div>                           
                    <div>结束日期：<input type="date" value={this.state.enddate} onChange={e => this.setState({ enddate: e.target.value })}/></div>
                </div>
                <div className="revokedata_dataright">
                    {arr}
                </div>
            </div>
            <div className="Payoutstats">
                <div className="Payoutstats-boxdiv">
                    <div className="Payoutstats-div">
                        <span>客户姓名：</span><input type="text" value={this.state.item.user_name}/>
                    </div>
                    <div className="Payoutstats-div">
                        <span>客户电话：</span><input type="text" value={this.state.item.user_mobile}/>
                    </div>
                    <div className="Payoutstats-div">
                           <span>日期：</span><input type="text" value={this.state.item.time}/>
                    </div>
                    <div className="Payoutstats-div">
                           <span>类别：</span><input type="text" value={this.state.item.type}/>
                    </div>
                    <div className="Payoutstats-text">
                        <span>退赔原因：</span>
                           <textarea>{this.state.item.cause}</textarea>
                    </div>
                </div>
                <div className="Payoutstats-boxdiv">
                    <div className="Payoutstats-div">
                           <span>流水号：</span><input type="text" value={this.state.item.serialsn}/>
                    </div>
                    <div className="Payoutstats-div">
                           <span>衣物名称：</span><input type="text" value={this.state.item.clothing_name}/>
                    </div>
                    <div className="Payoutstats-div">
                           <span>衣物类别：</span><input type="text" value={this.state.item.clothing_type}/>
                    </div>
                    <div className="Payoutstats-div">
                           <span>退款方式：</span><input type="text" value={this.state.item.back_type}/>
                    </div>
                    <div className="Payoutstats-text">
                        <span>经验反馈：</span>
                           <textarea>{this.state.item.feedback}</textarea>
                    </div>
                </div>
            </div>
            <div className="Pay-tatol">
                <div className="Pay-tatol-title">赔付合计</div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>合计</th>
                            <th>收券退款</th>
                            <th>刷卡退款</th>
                            <th>现金退款</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>{this.state.total_amount || 0}</td>
                            <td>{this.state.voucher_amount || 0}</td>
                            <td>{this.state.card_amount || 0}</td>
                            <td>{this.state.cash_amount || 0}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="Payout-detail bothpayout-detail" id="bothpayout-detail">
                <div className="Payout-detail-title">赔付明细 <b>共记录<i>{this.state.list.length}</i>条</b></div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>流水号</th>
                            <th>用户名字</th>
                            <th>用户电话</th>
                            <th>退赔金额</th>
                            <th>日期</th>
                            <th>经手人</th>
                            <th>类别</th>
                            <th>衣物名称</th>
                            <th>衣物类别</th>
                            <th>退赔原因</th>
                            <th>退赔方式</th>
                            <th>经验反馈</th> 
                        </tr>                                  
                    </thead>
                    <tbody >
                        {list}
                    </tbody>
                </table>                       
            </div>
            <Page />
             </Window> 
        );
    }
}