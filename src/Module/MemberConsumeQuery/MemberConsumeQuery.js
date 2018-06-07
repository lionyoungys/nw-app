/**
 * 会员消费查询页面
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {show:false,show1:false,cardNumber:'',user_name:'',user_mobile:'',user_info:[],index:0} 
        this.query = this.query.bind(this)   
        
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
    render() {
        var userinfo=this.state.user_info.map((item,index) => <tr>
        <td>{index+1}</td>
        <td>{item.recharge_number}</td>
        <td>{item.user_name}</td>
        <td>{item.user_mobile}</td>
        <td>{item.card_name}</td>
        <td>{item.balance}</td>
        <td onClick={() => this.setState({show:true,id:item.id,index:index})}>换卡</td>
        {
                //     this.state.show
                //     &&
                //     <Window title='新卡设定' onClose={() => this.setState({show:false})} width="530" height="430">
                //         <div className="NewCardbinding-box">
                //             <div className="NewCardbinding-box-div">
                //                <span>原卡信息</span>
                //                <div>
                //                   <div>
                //                     <span>卡类型：</span><b>{this.state.user_info[this.state.index].card_name} </b>
                //                   </div>
                //                   <div>
                //                     <span>卡号：</span><b>{this.state.user_info[this.state.index].recharge_number}</b>
                //                   </div>
                //                   <div>
                //                     <span>卡编号：</span><b>{this.state.user_info[this.state.index].card_number}</b>
                //                   </div>
                //                   <div>
                //                     <span>姓名：</span><b>{this.state.user_info[this.state.index].user_name}</b>
                //                   </div>
                //                   <div>
                //                     <span>电话：</span><b>{this.state.user_info[this.state.index].user_mobile}</b>
                //                   </div>
                //                   <div>
                //                     <span>折扣率：</span><b>{this.state.user_info[this.state.index].discount}%</b>
                //                   </div>
                //                   <div>
                //                     <span>余额：</span><b>￥{this.state.user_info[this.state.index].balance}</b>
                //                   </div>
                //                </div>
                //             </div>
                //             <div className="NewCardbinding-box-div">
                //                <span>新卡信息</span>
                //                <div id='select'>                                  
                //                     <span >卡类型</span>                      
                //                     <Select option={['金卡','银卡','平台卡']} selected='银卡' onChange={value => console.log(value)} />                                   
                //                   <div>
                //                     <span>卡号：</span><input type="text"/>
                //                   </div>
                //                   <div>
                //                     <span>卡编号：</span><b>0258</b>
                //                   </div>
                //                   <div>
                //                     <span>姓名：</span><b>吱吱</b>
                //                   </div>
                //                   <div>
                //                     <span>电话：</span><b>18310963932</b>
                //                   </div>
                //                   <div>
                //                     <span>折扣率：</span><b>0.5%</b>
                //                   </div>
                //                   <div>
                //                     <span>余额：</span><b>￥254536</b>
                //                   </div>
                //                </div>
                //             </div>
                //             <div id="NewCardbinding_foot">
                //                <div>制卡手续费：<span>￥20</span></div>
                //                <div>
                //                    <button onClick={() => this.setState({show:false})}>取消</button>
                //                    <button>换卡</button>
                //                 </div>
                //             </div>
                //          </div>
                //    </Window>
                }         
        </tr>
        );
        return (
            
            <div>
            <Window title='会员消费查询' onClose={this.props.closeView}>
                <div className="change_card_date">
                    <div className="change_card_date_left">
                        <div>卡号：<input type="text" value={this.state.cardNumber} onChange={e => this.setState({cardNumber:e.target.value})}/></div>
                        <div>姓名：<input type="text" value={this.state.user_name} onChange={e => this.setState({user_name:e.target.value})}/></div>
                        <div>手机号：<input type="text" value={this.state.user_mobile} onChange={e => this.setState({user_mobile:e.target.value})}/></div>
                    </div>
                    <button type='button' className='e-btn ' onClick={this.query}>查询</button>
                    <button type='button' className='e-btn ' onClick={this.query}>读卡</button>
                </div>
                {/* 表格部分 欠费衣物信息*/}
                <p className='change_card_result_title'>已找到<a>{this.state.user_info.length}</a>条结果</p>
                <table className='change_card_table'>
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
                       { userinfo}
                    </tbody>
                </table>                  
            </Window>           
        </div>    
        );
    }
}