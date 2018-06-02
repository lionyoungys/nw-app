/**
 * 余额统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import '../../UI/bothpages.css'
import './BalanceStatistics.css'
export default class extends Component {   
    constructor(props) {
        super(props);  
        this.state={user_total:'',balance_total:'',list:[]};         
    }; 
    componentDidMount() {
        api.post('balanceTotal', {token:'token'.getData()}, (res, ver) => {
            if (ver && res) {
                console.log(res)
               this.setState({user_total:res.result.user_total,balance_total:res.result.balance_total,list:res.result.list});
            }
        }
        );
    }
    render() {      
        var list=this.state.list.map((item,index) => <tr>
        <td>{index+1}</td>
        <td>{item.user_mobile}</td>
        <td>{item.user_name}</td>
        <td>{item.card_name}</td>
        <td>{item.balance}</td>
        <td>{item.time}</td>
        <td>查看详情</td>
    </tr>)
        return ( 
            <div>
               <Window title='余额统计' onClose={this.props.closeView}>   
                   <div className="balancestatistics_title">
                      <div className="balancestatistics_title_left">
                         <span>累计会员数: <b>{this.state.user_total}</b></span>
                         <span>累计会员余额: <b>￥{this.state.balance_total}</b></span>
                         <button>下载</button>
                      </div>
                      <div className="balancestatistics_title_right"></div>
                   </div>
                   <div className="bothpages_count">                           
                              <div className="bothpages_count_title balancestatistics_count_title">
                                 <span></span>
                                 <span>会员手机号</span>
                                 <span>姓名</span>
                                 <span>会员类型</span>
                                 <span>余额</span>
                                 <span>办理时间</span>
                                 <span>操作</span>
                              </div>                                                     
                            <table className="bothpages_count_list balancestatistics_count_list" cellPadding="0" cellSpacing="0" border="0">  
                                <tbody>                            
                                   {list}
                                </tbody>
                            </table>
                        </div>   
               </Window> 
            </div>
        );            
    };
}