/**
 * 未付款统计界面组件
 * @author ranchong
 */
import React, { Component } from 'react';
import './UnpaidStatistics.css';
import Window from '../../UI/Window';
import Nodata from '../../UI/nodata';
import Page from "../../UI/Page";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            startdate:tool.date('Y-m-d'),enddate:tool.date('Y-m-d'),
            nodatas:false,
            item:[],
            list:[],
            discount_amount:'',
            itemCount:0,
            amount:'',
            nodatas:false,
            count:0,
            page:1,
        };
        this.limit = 15;
        this.query = this.query.bind(this);
    };
    componentDidMount(){
        this.query();
    }
    query (page){
        page = page || this.state.page;
        let pramas = {
            start_time: this.state.startdate,
            end_time: this.state.enddate,
            page: page,
            limit: this.limit,
            token: 'token'.getData()
        }
        console.log(pramas);
        api.post('orderArrears', pramas, (res, ver,handle) => {
            if (ver && res) {
                console.log(res)
                if(res.result.list.length>0){
                    this.setState({
                        itemCount:res.result.itemCount,
                        item:res.result.item,
                        discount_amount:res.result.discount_amount,
                        amount:res.result.amount,
                        list:res.result.list,
                        nodatas:false,
                        page:page,
                        count:res.result.count,
                        nodatas:false,
                    });
                }else{
                    this.setState({nodatas:true,list:[],count:0,itemCount:0,discount_amount:0,amount:0,})
                    
                }                                
            }else{
                handle()
            }
        });
    }
    render() {
        var list = this.state.list.map((item, index) => <tr key={'item' + index}>
            <td>{item.operator}</td>
            <td>{item.serialsn}</td>
            <td>{item.work_number}</td>
            <td>{item.discount_amount}</td>
            <td>{item.discount}%</td>
            <td>{item.amount}</td>
            <td>{item.user_name}</td>
            <td>{item.user_mobile}</td>
            <td>{item.time}</td>
        </tr>) 
        return (            
            <Window title='未付款统计' onClose={this.props.closeView}>
                <div className="unpaidstatistics_data">
                    <div className="unpaidstatistics_dataLeft">
                        <div>开始日期：<input type="date" className='e-date' value={this.state.startdate} onChange={e => this.setState({startdate:e.target.value})} /></div>
                        <div>结束日期：<input type="date" className='e-date' value={this.state.enddate} onChange={e => this.setState({enddate:e.target.value})} /></div>
                    </div>
                    <div className="unpaidstatistics_dataright">
                        <button type='button' className='e-btn ' onClick={() => this.query(1)}>查询</button>
                    </div>
                </div>
                <div className="unpaidstatistics_Statistics">
                    <span>  总衣物：<a>{this.state.itemCount ||0}件</a></span>
                    <span>  可折金额：<a>{this.state.discount_amount || 0}元</a></span>
                    <span>  不可折金额：<a>{this.state.amount ||0}元</a></span>
                </div>
                <p className = 'unp-sta-res-num'>已为您找到{this.state.count}条数据</p>               
                <table className='ui-table-base unpaidstatistics_table_Arrearage'>
                    <thead>
                        <tr>
                            <td>店员姓名</td>
                            <td>流水号</td>
                            <td>衣物件数</td>
                            <td>可折额</td>
                            <td>折扣率</td>
                            <td>不可折额</td>
                            <td>客户姓名</td>
                            <td>客户电话</td>
                            <td>日期</td>
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