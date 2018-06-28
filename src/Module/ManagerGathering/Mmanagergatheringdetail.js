/**
 * 经理收款明细
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import './ManagerGathering.css';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            result:[]
        }
    };
    componentDidMount(){
        api.post('managerGatheringDetail',{
            token:'token'.getData()
            }  
          , (res, ver, handle) => {
                if (ver) {
                    this.setState({result:res.result})      
                    console.log(res)                                                                              
                }else{
                    handle();                
                }
            }
          );
    }
    render() {
        let result=this.state.result.map((item,index)=>
        <tr key={'item'+index}>                             
            <td>{item.serialsn}</td>
            <td>{item.user_mobile}</td>
            <td>{item.work_number}</td>
            <td>{item.amount}</td>
            <td>{item.real_amount}</td>
            <td>{item.discount}</td>
            <td>{item.pay_type}</td>
            <td>{itme.user_mobile}</td>
            <td>{item.user_name}</td>
            <td>{item.time}</td>
        </tr>
        );
        return (
            <Window title='经理收款-查看明细' onClose={this.props.onClick} >
              <div className="Payout-detail " id="ManagerGathering-detail">
                           <table>
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
                        
                        </div>
            </Window>

        );
    }
}