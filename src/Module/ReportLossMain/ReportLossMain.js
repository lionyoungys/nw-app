/**
 * 挂失主页面
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import {Table} from '../../UI/Table';
import LayerBox from '../../Ui/LayerBox';
import './ReportLossMain.css';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {show:false,cardNumber:'',user_name:'',user_mobile:'',user_info:[],id:'',index:0};
        this.query=this.query.bind(this);
        this.reportLoss=this.reportLoss.bind(this);
    };
    query(){
        api.post('readCard', {token:'token'.getData(),cardNumber:this.state.cardNumber,user_name:this.state.user_name,user_mobile:this.state.user_mobile}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({user_info:res.result});
            }
        }
        );
    }
    reportLoss(){
        api.post('lossCard', {token:'token'.getData(),id:this.state.id}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                tool.ui.success({callback:(close, event) => {
                    close();
                }}); 
            }else{
                tool.ui.error({callback:(close, event) => {
                    close();
                }});
            }
        }
        );
    }
    render() {
        var userinfo=this.state.user_info.map((item,index) => <tr>
        <td>{index+1}</td>
        <td>{item.recharge_number}</td>
        <td>{item.user_name}</td>
        <td>{item.user_mobile}</td>
        <td>{item.card_name}</td>
        <td>{item.balance}</td>
        <td onClick={() => this.setState({show:true,id:item.id,index:index})}>挂失</td>
                {
                    this.state.show
                    &&
                   
                    <Window title='挂失-卡信息详情' onClose={() => this.setState({show:false})} width='632' height='337'>
                        {
                    <div className='reportloss'>
                    <div className='cardnumber'>卡ID：{this.state.user_info[this.state.index].card_number} </div>
                    <div className='border'>
                    <div className='recharge recharge-second'>
                         <div>
                             <label className='e-label'>卡号：</label><div>{this.state.user_info[this.state.index].recharge_number}</div>
                             <label className='e-label'>&emsp;卡类型：</label><div>{this.state.user_info[this.state.index].card_name}</div>
                         </div>
                         <div>
                             <label className='e-label'>姓名：</label><div>{this.state.user_info[this.state.index].user_name}</div>
                             <label className='e-label'>&emsp;折扣率：</label><div>{this.state.user_info[this.state.index].discount}</div>
                         </div>
                         <div>
                             <label className='e-label'>电话：</label><div>{this.state.user_info[this.state.index].user_mobile}</div>
            
                         </div>
                         <div>
                             <label className='e-label'>性别：</label><div>{this.state.user_info[this.state.index].sex}</div>
                             <label className='e-label'>售卡日期：</label><div>{this.state.user_info[this.state.index].time}</div>
                         </div>
                         <div>
                             <label className='e-label'>生日：</label><div>{this.state.user_info[index].birthday}</div>
                             <label className='e-label'>&emsp;&emsp;积分：</label><div>{this.state.user_info[index].integral}</div>
                         </div>
                         <div>
                             <label className='e-label'>地址：</label><div>{this.state.user_info[this.state.index].address}</div>
                             <label className='e-label'>&emsp;&emsp;余额：</label><div>&yen;{this.state.user_info[this.state.index].balance}</div>
                         </div>
                     </div>
                     <div className='button'>
                     <button type='button' className='e-btn' onClick={() => this.setState({show:false})}>取消</button>&nbsp;&nbsp;
                     <button type='button' className='e-btn' onClick={this.reportLoss}>挂失</button>
                     </div>
                     </div>
                 </div>
                    }
                     
                    </Window>
                   
                }
        </tr>
        )
        return (

            <Window title='挂失（仅实体卡）' onClose={this.props.closeView}>
                <div className="report_loss_main_date">
                    <div className="report_loss_main_date_left">
                        <div>卡号：<input type="text" value={this.state.cardNumber} onChange={e => this.setState({cardNumber:e.target.value})}/></div>
                        <div>姓名：<input type="text" value={this.state.user_name} onChange={e => this.setState({user_name:e.target.value})}/></div>
                        <div>手机号：<input type="text" value={this.state.user_mobile} onChange={e => this.setState({user_mobile:e.target.value})}/></div>
                    </div>
                    <button type='button' className='e-btn ' onClick={this.query}>查询</button>
                </div>

                {/* 表格部分 欠费衣物信息*/}
                <p className='report_loss_main_result_title'>已找到<a>{this.state.user_info.length}</a>条结果</p>
                <table className='report_loss_main_table'>
                    <thead>
                        <tr>
                            <td></td>
                            <td>卡号</td>
                            <td>姓名</td>
                            <td>手机号</td>
                            <td>卡类型</td>
                            <td>余额</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        {userinfo}

                    </tbody>
                </table>
            </Window>
        );
    }
}