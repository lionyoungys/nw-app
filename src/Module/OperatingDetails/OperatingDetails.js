/**
 * 经营明细界面组件
 * @author ranchong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import Nodata from '../../UI/nodata';
import './OperatingDetails.css';
import Page from '../../UI/Page';

export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state = {
            startdate:tool.date('Y-m-01'),enddate:tool.date('Y-m-d'),
            pay_type:'',
            list:[],
            page: 1,
            count: 0,
            nodatas:false,
        }   
        this.limit = 15;     
        this.query = this.query.bind(this);          
    }; 
    componentDidMount(){
        this.query();
    }
    query (page){
        console.log(this.state.pay_type)
        page = page || this.state.page;
        var prames = {
            token: 'token'.getData(),
            pay_type: this.state.pay_type,
            start_time: this.state.startdate,
            end_time: this.state.enddate,
            page: page,
            limit: this.limit  
        }
        console.log(prames);
        api.post('Operating',prames, (res, ver) => {
                if (ver && res) {
                    console.log(res);
                    this.setState({count:res.result.count});
                    res.result.list.length > 0 ? this.setState({ list: res.result.list,page:page, nodatas: false }) : this.setState({ nodatas: true, list: [] });
                }else{
                    console.log(res.msg);
                }
            }
        );
    }
    render() {
        var list =  this.state.list.map((item,index) =>
           <tr key = {'item'+index}>
                <td>{index+1+(this.state.page-1)*this.limit}</td>
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
            <div>
                 <div className="Succession_data">
                            <div className="Succession_dataLeft managerquery_dataLeft">
                                <div>收款类型：<Select  option={['全部','免费','免费补交','免费充值','免费发卡',
                            '免费退卡','收券退款','手持机刷卡','手持机刷卡补交','刷集团卡','刷集团卡补交',
                            '刷集团卡其他','刷卡','刷卡补交','刷卡其他','刷卡退款','微信','微信补交','微信充值','微信发卡',
                            '微信其他','微信退卡','微信退款','未付款','未付款补交','现金','现金补交','现金充值','现金发卡','现金其他',
                            '现金退卡','现金退款','赠券','赠券补交','赠券充值','赠券发卡','赠券其他','赠券退卡','支付宝','支付宝补交',
                            '支付宝充值','支付宝发卡','支付宝其他','支付宝退卡','支付宝退款','现金销售商品','微信销售商品','支付宝销售商品','刷卡销售商品'
                            ]} onChange={value => this.setState({pay_type:value})}/></div>                           
                                <div>开始日期：<input type="date" value={this.state.startdate} onChange={e => this.setState({startdate:e.target.value})} className="e-date"/></div>
                                <div>结束日期：<input type="date" value={this.state.enddate} onChange={e => this.setState({enddate:e.target.value})} className="e-date"/></div>
                            </div>
                        <button className="e-btn managerquery_btn" onClick={() => this.query(1)}>查询</button> 
                </div>  
                <div className="Takeclothes-div-title">已为您找到<b>{this.state.count}</b>条数据</div>
                    <div className="Takeclothes-tab Takeclothesdetail-tab" id="operating-div">
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
                               {this.state.nodatas&&<Nodata />}                            
                           </tbody>
                        </table> 
                    </div> 
            </div>   
            <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)} />                      
            </Window>  
            
        );
    }
}