/**
 * 经营日报组件
 * @author ranchong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import '../RevokeData/RevokeData.css';
import './OperateIncome.css';
import Table from '../../UI/Table';


export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state = {
            show: false,
            result:[],
            startdate: tool.date('Y-m-d') +'  00：00：00', enddate: tool.date('Y-m-d  H：i：s'),
        };        
        this.handlePrint = this.handlePrint.bind(this);
    }; 
    // 获取数据
    componentDidMount() {
        api.post('operateIncome1', { token: 'token'.getData() }, (res, ver, handle) => {
            console.log(res)
            if (ver && res) {
                this.setState({result: res.result});
            } else {
                handle();
            }
        });
    }
    handlePrint() {
        EventApi.print('daily', {list:this.state.result}, 'printer'.getData());
    }
   
    render() {
        var arr = this.state.result.map((item,index) =><tr>
            <td>{item.pay_type}{item.name}</td>
            <td>{item.amount}{item.total_amount}</td>
            <td>{item.real_amount}</td>
            <td>{item.reduce_price}</td>
            <td>{item.work_number}</td>
        </tr>)
        
        return(
        <div>
            <Window title='经营日报' onClose={this.props.closeView}>  
                <div className="ope-inc-head">
                    <a>统计时间：{this.state.startdate} 至 {this.state.enddate}</a>
                    {/* <button className='e-btn' onClick={this.print}>打印</button> */}
                    <a>操作员：{'aname'.getData()}</a>
                    <button className='e-btn' onClick={this.handlePrint}>打印</button>
                </div>
                {/* 表格部分 欠费衣物信息*/}
                <div className='ope-inc-tab'>
                    <Table>
                        <thead>
                            <tr>
                                <th>收银类型</th>
                                <th>金额</th>
                                <th>实收金额</th>
                                <th>优惠金额</th>
                                <th>衣物数量</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arr}
                        </tbody>
                    </Table>
                </div>
            </Window>  
        </div>
        )
    }
}