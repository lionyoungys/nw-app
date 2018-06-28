/**
 * 经营明细界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import './OperatingDetails.css';

export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state = {
            startdate:tool.date('Y-m-d'),enddate:tool.date('Y-m-d'),
            pay_type:'现金',
            list:[],
        }        
        this.Operatingdetail = this.Operatingdetail.bind(this);          
    }; 
    Operatingdetail (){
        console.log(this.state.pay_type)
        api.post('Operating', {
            token:'token'.getData(),
            pay_type:this.state.pay_type,
            start_time:this.state.startdate,
            end_time:this.state.enddate,            
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res);
                    this.setState({list:res.result})
                }else{
                    console.log(res.msg);
                }
            }
        );
    }
    render() {
        var list =  this.state.list.map((item,index) =>
           <tr>
                <td>{index+1}</td>
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
            <Window title='经营明细' onClose={this.props.closeView}>
                 <div className="Succession_data">
                            <div className="Succession_dataLeft managerquery_dataLeft">
                                <div>收款类型：<Select  option={['现金','支付宝','微信','会员卡']} onChange={value => this.setState({pay_type:value})}/></div>                           
                                <div>开始日期：<input type="date" value={this.state.startdate} onChange={e => this.setState({startdate:e.target.value})}/></div>
                                <div>结束日期：<input type="date" value={this.state.enddate} onChange={e => this.setState({enddate:e.target.value})}/></div>
                            </div>
                            <button className="e-btn managerquery_btn" onClick = {this.Operatingdetail}>查询</button> 
                </div>  
                <div className="Takeclothes-div-title">已为您找到<b>{this.state.list.length}</b>条数据</div>
                    <div className="Takeclothes-tab Takeclothesdetail-tab">
                        <table cellPadding="0" cellSpacing="0" border="0">
                           <thead>
                               <tr>
                                   <th></th>
                                   <th>流水号</th>
                                   <th>店员姓名</th>
                                   <th>衣物件数</th>
                                   <th>金额</th>
                                   <th>实收金额</th>
                                   <th>折扣率</th>
                                   <th>收款类型</th>
                                   <th>客户电话</th>
                                   <th>客户姓名</th>
                                   <th>时间</th>
                                   <th>卡号</th>
                                   <th>卡类型</th>
                               </tr>
                           </thead>
                           <tbody> 
                               {list}                             
                           </tbody>
                        </table> 
                    </div>                   
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
    }
}