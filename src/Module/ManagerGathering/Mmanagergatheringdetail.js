/**
 * 经理收款明细
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import './ManagerGathering.css';
import Page from '../../UI/Page';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            result:[],
            page: 1,
            count: 0,
        }
        this.limit = 20;
        this.query = this.query.bind(this);
    };
    componentDidMount(){
        this.query();  
    }
    query(page){
        page = page || this.state.page;
        let done;
        tool.ui.loading(handle => done = handle);
        api.post('managerGatheringDetail', {token: 'token'.getData(),page: page,limit: this.limit}
            , (res, ver, handle) => {
                console.log(res)
                done();
                if (ver && res) {
                    console.log(res)
                    this.setState({ result: res.result.list,page: page,count: res.result.count });
                    
                } else {
                    handle();
                }
            }, () => done());
        }
    render() {
        let result=this.state.result.map((item,index)=>
        <tr key={'item'+index}>                             
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
        </tr>
        );
        return (
            <Window title='经理收款-查看明细' onClose={this.props.onClick} >
              <div id="ManagerGathering-detail">
                    <table className='ui-table-base man-gat-tab'>
                        <thead>
                            <tr>                                       
                                <th>流水号</th>
                                <th>店员姓名</th>
                                <th>衣服件数</th>
                                <th>金额</th>
                                <th>实收金额</th>
                                <th>折扣率</th>
                                <th>收款类型</th>
                                <th>客户电话</th>
                                <th>客户姓名</th>
                                <th>时间</th>
                            </tr>                                  
                        </thead>
                        <tbody>
                            {result}
                        </tbody>
                    </table>
                        <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)} />
                </div>
            </Window>

        );
    }
}