/**
 * 取衣界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Takeclothesdetail from './Takeclothesdetail';
import { WSAEINVALIDPROCTABLE } from 'constants';
import './Takeclothes.css';

export default class extends Component {   
    constructor(props) {
        super(props);   
        this.state = {
            show:false,
            number:'',
            list:[],
            count:'0', 
            id:0, 
            index:0,                            
        };
        this.onclose = this.onclose.bind(this); 
        this.takecloth = this.takecloth.bind(this);  
        this.takeclothesdetail = this.takeclothesdetail.bind(this);    
    };   
    onclose (){
        this.setState({show:false});
    } 
    // 搜索订单号查询订单
    takecloth() {
        if(this.state.number=='')
        return tool.ui.error({msg:'请输入关键词',callback:close => close()});
        api.post('takeclothes', {
            token:'token'.getData(),
            keywords:this.state.number,
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res);
                    this.setState({
                        list:res.result.list,
                        count:res.result.count,
                        
                    })
                }else{
                    console.log(res.msg);
                }
            }
        );
    }
    // 查询订单服务项目信息
    takeclothesdetail (e){
        var id = e.target.dataset.id || e.target.parentNode.dataset.id;
        var index = e.target.dataset.index;
        this.setState({show:true,id:id,index:index});       
    }
    render() {  
        var list=this.state.list.map((item,index) => 
        <tr onClick = {this.takeclothesdetail} data-id={item.id} data-index = {index} key={'item'+index}>
            <td >{index+1}</td>
            <td >{item.ordersn}</td>
            <td>{item.user_name}</td>
            <td>{item.user_mobile}</td>
            <td>{item.card_number}</td>
            <td>{item.total_count}</td>
            <td>{item.pay_amount}</td>
            <td>{item.debt}</td>
            <td>{item.end_count}</td>
        </tr>
        )
           return (
                <Window title='取衣' onClose={this.props.closeView}>   
                    <div className="Takeclothes-title">
                       <button className="e-btn Takeclothes-title-btn">读卡</button>
                       <button className="e-btn Takeclothes-title-btn" onClick = {this.takecloth}>查询</button>
                       <input type="text" className="Takeclothes-title-text" placeholder='姓名,手机号,订单号,卡号' value={this.state.number} onChange={e => this.setState({number:e.target.value})}/>
                    </div>  
                    <div className="Takeclothes-div-title">已为您找到<b>{this.state.count}</b>条数据</div>
                    <div className="Takeclothes-tab Takeclothesdetail-tab">
                        <table cellPadding="0" cellSpacing="0" border="0">
                           <thead>
                               <tr>
                                   <th></th>
                                   <th>订单号</th>
                                   <th>姓名</th>
                                   <th>手机号</th>
                                   <th>卡号</th>
                                   <th>衣物数量</th>
                                   <th>价格</th>
                                   <th>欠款</th>
                                   <th>进度</th>
                               </tr>
                           </thead>
                           <tbody>
                               {list}
                           </tbody>
                        </table> 
                    </div>
                    {
                        this.state.show
                        &&
                        <Takeclothesdetail   
                             id={this.state.id}
                             onClick = {this.onclose}    
                            
                             />
                    }
                </Window> 
        )
    }
}