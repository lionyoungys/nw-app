/**
 * 未付款统计界面组件
 * @author ranchong
 */
import React, { Component } from 'react';
import './UnpaidStatistics.css';
import Window from '../../UI/Window';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            startdate:tool.date('Y-m-d'),enddate:tool.date('Y-m-d'),
            item:[],
            list:[],
            discount_amount:'',
            itemCount:0,
            amount:''
        };
        this.order = this.order.bind(this);
    };
    order (){
        api.post('orderArrears', {start_time:this.state.startdate,end_time:this.state.enddate,token:'token'.getData()}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({itemCount:res.result.itemCount,item:res.result.item,discount_amount:res.result.discount_amount,amount:res.result.amount,list:res.result.list});
                
            }
            }
        );
    }
    render() {
        var list = this.state.list.map((item, index) => <tr key={'item' + index}>
            <td>{item.operator}</td>
            <td>{item.serialsn}</td>
            <td>{item.work_number}</td>
            <td>{item.discount_amount}</td>
            <td>{item.discount}</td>
            <td>{item.amount}</td>
            <td>{item.user_mobile}</td>
            <td>{item.user_name}</td>
            <td>{item.time}</td>
        </tr>
        )
        var item = this.state.item.map((item, index) => <tr key={'item' + index}>
            <td>{index+1}</td>
            <td>{item.operator}</td>
            <td>{item.user_mobile}</td>
            <td>{item.serialsn}</td>
            <td>{item.clean_sn}</td>
            <td>{item.clothing_number}</td>
            <td>{item.clothing_name}</td>
            <td>{item.clothing_color}</td>
            <td>{item.clothing_grids}</td>
            <td>{item.clothing_type}</td>
    </tr>
    )

        return (            
            <Window title='未付款统计' onClose={this.props.closeView}>
                <div className="unpaidstatistics_data">
                    <div className="unpaidstatistics_dataLeft">
                        <div>开始日期：<input type="date" value={this.state.startdate} onChange={e => this.setState({startdate:e.target.value})} /></div>
                        <div>结束日期：<input type="date" value={this.state.enddate} onChange={e => this.setState({enddate:e.target.value})} /></div>
                    </div>
                    <div className="unpaidstatistics_dataright">
                        <button type='button' className='e-btn ' onClick = {this.order}>查询</button>
                    </div>
                </div>
                <div className="unpaidstatistics_Statistics">
                    <span>  总衣物：<a>{this.state.itemCount}件</a></span>
                    <span>  可折金额：<a>{this.state.discount_amount}元</a></span>
                    <span>  不可折金额：<a>{this.state.amount}元</a></span>
                </div>
                <p className = 'unp-sta-res-num'>已为您找到{this.state.itemCount}条数据</p>
                {/* 表格部分 欠费信息*/}
                {/* <span className='unpaidstatistics_title'>欠费信息</span> */}
                <table className='ui-table-base unpaidstatistics_table_Arrearage'>
                    <thead>
                        <tr>
                            <td>店员姓名</td>
                            <td>流水号</td>
                            <td>衣物件数</td>
                            <td>可折额</td>
                            <td>折扣率</td>
                            <td>不可折额</td>
                            <td>客户电话</td>
                            <td>客户姓名</td>
                            <td>日期</td>
                        </tr>
                    </thead>
                    <tbody>                   
                                                        
                            {list}
                                                    
                    </tbody>
                </table>
                
                {/* 表格部分 欠费衣物信息*/}
                {/* <span className='unpaidstatistics_title'>欠费衣物信息 */}
                {/* <a className='span-a-one'>共有记录</a><a className='span-a-two'>245</a><a>条</a> */}
                {/* </span> */}
                {/* <div className='unpaidstatistics_table_part'>
                    <table className='unpaidstatistics_table_Arrearage'>
                        <thead>
                            <tr>
                                <td></td>
                                <td>店员姓名</td>
                                <td>客户电话</td>
                                <td>流水号</td>
                                <td>水洗条码号</td>
                                <td>衣物编码</td>
                                <td>衣物名称</td>
                                <td>衣物颜色</td>
                                <td>衣物网格</td>
                                <td>衣物类型</td>
                            </tr>
                        </thead>
                        <tbody>
                            
                               {item}                               
                            
                        </tbody>
                    </table>
                </div> */}
            </Window>
        );
    }
}