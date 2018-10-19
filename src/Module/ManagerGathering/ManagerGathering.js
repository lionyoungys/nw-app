/**
 * 经理收款
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Mmanagergatheringdetail from './Mmanagergatheringdetail';
import './ManagerGathering.css';
import Select from '../../UI/Select';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false, 
            arr:[],
            amount:0,//余额  
            lastbalance:0,//上次余额
            gathering:'',
            balance:'',
            fit:1,
            remark:'',
            dateStartTime:'',
            dateEndTime:'',

        }        
        this.payment=this.payment.bind(this);
        this.onclose = this.onclose.bind(this);
        this.query = this.query.bind(this);
    };
    onclose (){
        this.setState({show:false})
    }
    componentDidMount(){
       this.query();
    }
    query() {
        api.post('managerGathering1',{token:'token'.getData()}  , (res, ver, handle) => {
            console.log(res)
            if (ver) {
                this.setState({
                    arr:res.result.info,
                    amount:res.result.total.amount,
                    lastbalance:res.result.balance,                   
                    dateStartTime:res.result.dateStartTime,
                    dateEndTime:res.result.dateEndTime,
                })                                                                                    
            }else{
                handle();                
            }
        }
      );
    }
    payment(){
        api.post('doManagerGathering',{
            token:'token'.getData(),
            gathering:this.state.gathering,
            balance:this.state.balance,
            fit:this.state.fit,
            remark:this.state.remark
            }  
          , (res, ver, handle) => {
                if (ver) {
                    console.log(res)
                    tool.ui.success({msg:'操作成功', callback:close => close()});
                    this.query();
                    //this.setState({arr:res.result.info})                                                                                    
                }else{
                    handle();                
                }
            }
          );
       
    }
    render() {
        var arr = this.state.arr.map((item,index) =><tr>
            <td>{item.pay_type}{item.name}</td>
            <td>{item.amount}</td>
            <td>{item.real_amount}</td>
            <td>{item.work_number}</td>
        </tr>)
        return (
            <Window title='经理收款' onClose={this.props.closeView} height='494'>
               <div className="man-head">
                    <a>收款情况</a>   
                     <a>统计时间：{this.state.dateStartTime} 至{this.state.dateEndTime}</a>                     
                </div>
                {/* 表格部分 欠费衣物信息*/}               
                <table className='ui-table-base ManagerGathering-tab'>
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
                <div className="manager_gathering_bottom">
                    <div className="manager_gathering_part three_part">
                        <div className="manager_gathering_part_row">
                            上次余额：<span>{this.state.lastbalance}</span> &emsp;&emsp;本次收现金：<span>{this.state.amount}</span> &emsp;&emsp;&emsp;&emsp;总现金：<span>{Number(this.state.amount)+Number(this.state.lastbalance)}</span>
                        </div>
                        <div className="manager_gathering_part_row">
                            本次上缴：<input type="text" value={this.state.gathering} onChange={e=>this.setState({gathering:e.target.value})}/> &emsp;本次余额：<input type="text" value={this.state.balance} onChange={e=>this.setState({balance:e.target.value})}/> &emsp;现金是否一致：<Select value={1 == this.state.fit ? '是' : '否'} option={['是','否']} onChange={value =>this.setState({fit:'是' == value.value?1:0})}/>
                        </div>
                        <div className="manager_gathering_part_row text_area_row">
                            <a>经营情况说明：</a><textarea value={this.state.remark} onChange={e=>this.setState({remark:e.target.value})}></textarea>
                        </div>
                        <div className='manager_gathering_part_btn'>
                            <button type='button' className='e-btn ' onClick={() => this.setState({ show: true })}>查看明细</button>
                            <button type='button' className='e-btn ' onClick={this.props.changeView} data-event='open_case'>开钱箱</button>
                            <button type='button' className='e-btn ' onClick={this.payment}>交款</button>
                        </div>
                    </div>
                    
                </div>
                {
                    this.state.show
                    &&
                    <Mmanagergatheringdetail  onClick = {this.onclose}/>
                }
            </Window>

        );
    }
}