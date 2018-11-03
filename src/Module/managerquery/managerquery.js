/**
 * 营业日报
 * @author  wangjun
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import Table from '../../UI/Table';
import './Managerquery.css'
import Page from '../../UI/Page';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startdate:tool.date('Y-m-01'),enddate:tool.date('Y-m-d'),
            show: false,
            result: [],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            list:[],
            page: 1,
            count: 0,
            selectVal:'店员'
        };
        this.limit = 10;       
        this.query = this.query.bind(this);   
    };
    componentDidMount() { this.query()}
    query(page){
        page = page || this.state.page;
        let done;
        tool.ui.loading(handle => done = handle);
        api.post('managerSearch1', {
            start_time:this.state.startdate,
            end_time:this.state.enddate,
            token:'token'.getData(),
            operator:'',
            page: page, 
            limit:this.limit
        }, (res, ver, handle) => {
            done();
            if (ver && res) {
                console.log(res)
                this.setState({
                    result:res.result.info,
                    list:res.result.list,
                    count:res.result.count,
                    page:page
                });
            }else{
                handle();
            }
        },()=>done());
    }
    render() {
        var arr = this.state.result.map((item,index) =><tr>
          <td>{item.pay_type}</td>
          <td>{item.amount}</td>
          <td>{item.real_amount}</td>
          <td>{item.work_number}</td>
        </tr>)
        var list = this.state.list.map((item, index) => <tr key={'item'+index}>
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
            <Window title='营业统计' onClose={this.props.closeView}>
               <div className="Succession_data">
                            <div className="Succession_dataLeft managerquery_dataLeft">
                                <div>操作员：<Select option={['经理','店员','老板']} readOnly={true} onChange={value => this.setState({selectVal:value.value})} value={this.state.selectVal}/></div>                           
                                <div>开始日期：<input type="date" value={this.state.startdate} onChange={e => this.setState({startdate:e.target.value})} className="e-date"/></div>
                                <div>结束日期：<input type="date" value={this.state.enddate} onChange={e => this.setState({enddate:e.target.value})} className="e-date"/></div>
                                <div>
                                    <button className="e-btn managerquery_btn" onClick={() => this.query(this.state.page)}>查询</button> 
                                </div>    
                            </div>
                          
                </div>   
                <div className='man-que-tab'> 
                    <div className='man-que-tab-one'>                                
                        <Table>
                            <thead>
                                <tr>
                                    <th>收银类型</th>
                                    <th>金额</th>
                                    <th>实收金额</th>
                                    <th>衣物数量</th>                            
                                </tr>
                            </thead>
                            <tbody>
                                {arr}
                            </tbody>
                        </Table>
                    </div>
                    <div className='man-que-tab-two'>
                        <Table>
                            <thead>
                                <tr>
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
                        </Table> 
                    </div>
                    <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)} />
            </div>                         
            </Window>
        );
    }
}