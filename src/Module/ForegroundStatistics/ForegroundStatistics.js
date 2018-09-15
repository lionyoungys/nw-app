/**
 * 前台情况界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Nodata from '../../UI/nodata';
import './ForegroundStatistics.css';
import Page from '../../UI/Page';


export default class extends Component {   
    constructor(props) {
        super(props);     
        this.state = {
            startdate:tool.date('Y-m-d'),enddate:tool.date('Y-m-d'),          
            list:[],
            nodatas:false,
            page: 1,
            count: 0,
        }  ;
        this.limit = 10; 
        this.query = this.query.bind(this);
    }; 
    componentDidMount(){ this.query() }
    query(page){
        page = page || this.state.page;
        api.post('Operating', {
            token:'token'.getData() ,
            page: page, 
            limit:this.limit  
        }, (res, ver,handle) => {
            if (ver && res) {
                console.log(res);
                if(res.result.list.length>0){
                    this.setState({
                        list:res.result.list,
                        nodatas:false,
                        count:res.result.count,
                        page:page
                    })
                }else{
                    this.setState({nodatas:true,list:[],count:'0'})
                }
                  
            }else{
                console.log(res.msg);
                handle();
            }
        });
    }

    render() {
        var list =  this.state.list.map((item,index) =>
        <tr key={'item'+index}>
             <td>{item.serialsn}</td>
             <td>{item.operator}</td>
             <td>{item.work_number}</td>
             <td>{item.amount}</td>
             <td>{item.real_amount}</td>
             <td>{item.discount}%</td>
             <td>{item.pay_type}</td>
             <td>{item.user_mobile}</td>
             <td>{item.user_name}</td>
             <td>{item.time}</td>
             <td>{item.recharge_number}</td>
             <td>{item.card_type}</td>
        </tr>
     )   
        return (             
            <Window title='前台情况' onClose={this.props.closeView}>   
                <div className="ope-inc-head for-sta-head">
                    <a>统计时间：{tool.date('Y-m-d') +'  00：00：00'} 至{tool.date('Y-m-d  H：i：s')}</a>
                    <a>衣物件数：{this.state.list.length}件</a>
                </div>
                <div class="ui-check-res ReportLossQuery">已为您找到：<b>{this.state.count}</b>条记录</div>
                <table className='ui-table-base for-sta-tab'>
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
                <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)} />
             </Window> 
        );
    }
}