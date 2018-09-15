/**
 * 营业统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Nodata from '../../UI/nodata';
import './Businesstats.css';
import Page from '../../UI/Page';
export default class extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            startdate:tool.date('Y-m-01'),enddate:tool.date('Y-m-d'),
            pay_type:'',
            list:[],
            page:1,
            count:0,
            nodatas:false,
        }
        this.limit = 10;
        this.arrbutton = this.arrbutton.bind(this);       
    }; 
    componentDidMount(){
        this.arrbutton();
    }
    arrbutton (page){
        page = page || this.state.page;
        api.post('Operating', {
            token:'token'.getData(),
            pay_type:this.state.pay_type,
            start_time:this.state.startdate,
            end_time:this.state.enddate,    
            page: page,
            limit: this.limit        
        }, (res, ver,handle) => {
                if (ver && res) {
                    console.log(res);
                    this.setState({count:res.result.count});
                    res.result.list.length > 0 ? this.setState({ list: res.result.list, nodatas: false, page: page}) : this.setState({ nodatas: true, list: [] });
                }else{
                    handle();
                }
            }
        );
    }
    render() {
        var list =  this.state.list.map((item,index) =>
        <tr key= {'item'+index}>
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
       var arr = ['查询'].map((item,index) =><button key={index} data-index={index} onClick={()=>this.arrbutton(1)}>{item}</button>);             
       return (             
            <Window title='营业统计' onClose={this.props.closeView}>   
                <div className="revokedata_data">
                         <div className="revokedata_dataLeft">
                            <div>开始日期：<input type="date" value={this.state.startdate} onChange={e => this.setState({startdate:e.target.value})}/></div>                           
                            <div>结束日期：<input type="date" value={this.state.enddate} onChange={e => this.setState({enddate:e.target.value})}/></div>
                         </div>
                         <div className="revokedata_dataright">
                           {arr}
                         </div>
                </div>
               <div className="ui-check-res">已为您找到<b>{this.state.count}</b>条数据</div>                  
               <table className='ui-table-base bus-sta-tab'>
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
                        {this.state.nodatas&&<Nodata />}
                    </tbody>
                </table>   
                <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.arrbutton(page)}/>   
             </Window> 
        );
    }
}