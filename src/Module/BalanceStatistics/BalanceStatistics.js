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
        <td>{item.discount}</td>
    </tr>)
        return ( 
            <div>
               <Window title='余额统计' onClose={this.props.closeView}>   
                   <div className="balancestatistics_title">
                     <div className="unpaidstatistics_dataLeft" id="balancestatistics_title_left">
                            <div>开始日期：<input type="date"  /></div>
                            <div>结束日期：<input type="date"  /></div>
                      </div>
                      <div className="balancestatistics_title_left" >
                         <span>累计会员数 ： <b>{this.state.user_total}</b></span>
                         <span>累计会员余额 ： <b>￥{this.state.balance_total}</b></span>
                         <button>下载</button>
                      </div>
                      <div className="balancestatistics_title_right"></div>
                   </div>
                   <div className="bothpages_count">                           
                            <div className="bothpages_count_title balancestatistics_count_title">
                                 <span></span>
                                 <span>卡号</span>
                                 <span>姓名</span>
                                 <span>会员类型</span>
                                 <span>余额</span>
                                 <span>办理时间</span>
                                 <span>折扣率</span>
                            </div>                                                     
                            <table className="bothpages_count_list balancestatistics_count_list" cellPadding="0" cellSpacing="0" border="0">  
                                <tbody>                            
                                   {list}
                                </tbody>
                            </table>
                    </div>   
                    <div className="bothpages-footer">
                       <div className="bothpages-footer-btn">
                            <span>首页</span>
                            <span>上一页</span>
                            <span>下一页</span>
                            <span>尾页</span>
                       </div>
                       <div className="bothpages-footer-all">第<span>一</span>页/共<span>四</span>页</div>
                       <div className="bothpages-footer-both">每页<span>20</span>条，共<span>112</span>条</div>
                    </div>
               </Window> 
            </div>
        );            
    };
}