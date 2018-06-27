/**
 * 经理查询
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import './managerquery.css'

export default class extends Component {
    constructor(props) {
        super(props);
        this.setState={
            list:[],
            
        }
    };
    query(){
        api.post('managerSearch', {
            start_time:this.state.startdate,
            end_time:this.state.enddate,
            token:'token'.getData(),
            operator:''
        }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({itemCount:res.result.itemCount,item:res.result.item,discount_amount:res.result.discount_amount,amount:res.result.amount,list:res.result.list});
                
            }
        }
        );
    }
    render() {
        return (

            <Window title='经理查询' onClose={this.props.closeView}>
               <div className="Succession_data">
                            <div className="Succession_dataLeft managerquery_dataLeft">
                                <div>操作员：<Select option={['经理','店员','老板']} selected='店员' readOnly={true} onChange={value => console.log(value)}/></div>                           
                                <div>开始日期：<input type="date" onChange={e=>this.setState({startdate:e.target.value})}/></div>
                                <div>结束日期：<input type="date" onChange={e=>this.setState({enddate:e.target.value})}/></div>
                            </div>
                            <button className="e-btn managerquery_btn" onClick={this.query}>查询</button> 
                </div>                                    
                <table className='ui-table-base man-que-tab' id="man-que-tab">
                    <thead>
                        <tr>
                            <td>收银类型</td>
                            <td>金额</td>
                            <td>实收金额</td>
                            <td>衣物数量</td>                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>收衣</td>
                            <td></td>
                            <td></td>
                            <td></td>                           
                        </tr>                                                                                             
                        <tr>
                            <td>合计</td>
                            <td></td>
                            <td></td>
                            <td></td>                           
                        </tr>
                    </tbody>
                </table>
                <table className='ui-table-base man-que-tab-two'>
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>4</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                    </tbody>
                </table>                          
            </Window>
        );
    }
}