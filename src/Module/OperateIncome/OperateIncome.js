/**
 * 经营日报组件
 * @author ranchong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import '../RevokeData/RevokeData.css';
import './OperateIncome.css';

export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state = {
            show: false,
            result:[],
            startdate: tool.date('Y-m-d') +'  00：00：00', enddate: tool.date('Y-m-d  H：i：s'),
        };        
                  
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
    // 交班网络请求
   
    render() {
        var arr = this.state.result.map((item,index) =><tr>
            <td>{item.pay_type}{item.name}</td>
            <td>{item.amount}{item.total_amount}</td>
            <td>{item.real_amount}</td>
            <td>{item.work_number}</td>
        </tr>)
        
        return(
        <div>
            <Window title='经营日报' onClose={this.props.closeView}>  
                <div className="ope-inc-head">
                    <a>统计时间：{this.state.startdate} 至 {this.state.enddate}</a>
                    {/* <button className='e-btn' onClick={this.print}>打印</button> */}
                    <a>操作员：{'aname'.getData()}</a>
                </div>
                {/* 表格部分 欠费衣物信息*/}
                <table className='ui-table-base ManagerGathering-tab ope-inc-tab'>
                    <thead>
                        <tr>
                            <td>收银类型</td>
                            <td>金额</td>
                            <td>实收金额</td> 
                            <td>衣物数量</td>
                        </tr>
                    </thead>
                    <tbody>
                        {arr}
                    </tbody>
                </table>
            </Window>  
        </div>
        )
    }
}