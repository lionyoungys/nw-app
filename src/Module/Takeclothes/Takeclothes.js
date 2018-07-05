/**
 * 取衣界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Nodata from '../../UI/nodata';
import Takeclothesdetail from './Takeclothesdetail';
import './Takeclothes.css';

export default class extends Component {   
    constructor(props) {
        super(props);   
        let card = this.props.card || {};
        this.state = {
            show:false,
            nodatas:false,
            number:'',
            list:[],
            count:'0', 
            id:0, 
            index:0, 
            cid: card.id || '',    //卡编号id
            user_mobile: card.user_mobile || '',    //电话
            user_name: card.user_name || '',    //姓名
            sex: card.sex || '',    //性别
            birthday: card.birthday || '',    //生日
            address: card.address || '',    //地址
            integrals: card.integral,    //积分
            balance: card.balance || '',    //余额
            recharge_number: card.recharge_number || '',    //卡号
            card_name: card.card_name || '',    //卡类型
            discount: card.discount || '',    //折扣
            time: card.time || ''    //售卡日期                           
        };
        this.takecloth = this.takecloth.bind(this);  
        this.takeclothesdetail = this.takeclothesdetail.bind(this);   
        this.M1Read = this.M1Read.bind(this); 
    };   
    M1Read(e) {
        let obj = {};
        obj.callback = (res) => {
            this.setState({
                cid:res.id,
                user_mobile:res.user_mobile,
                user_name:res.user_name,
                sex:res.sex,
                birthday:res.birthday,
                balance:res.balance,
                integrals:res.integrals,
                card_name:res.card_name,
                discount:res.discount,
                time:res.time,
                recharge_number:res.recharge_number,
                address:res.address,
            });
        }
        EventApi.M1Read(obj);
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
                    console.log(111)
                    if(res.result.list.length>0){
                        this.setState({
                            list:res.result.list,
                            count:res.result.count,   
                            nodatas:false,                    
                        })
                    }else{
                        this.setState({list:[],count:0,nodatas:true})
                    }
                    
                }else{
                    console.log(222)
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
        </tr>
        )
           return (
                <Window title='取衣' onClose={this.props.closeView}>   
                    <div className="Takeclothes-title">
                       <button className="e-btn Takeclothes-title-btn" onClick={this.M1Read}>读卡</button>
                       <button className="e-btn Takeclothes-title-btn" onClick = {this.takecloth}>查询</button>
                       <input type="text" className="Takeclothes-title-text" placeholder='姓名,手机号,订单号,卡号' value={this.state.number} onChange={e => this.setState({number:e.target.value})}/>
                    </div>  
                    <div className="Takeclothes-div-title">已为您找到<b>{this.state.count}</b>条数据</div>
                    <div className="Takeclothesdetail-title">
                      <div className="Takeclothesdetail-title-left">
                         <div>订单号：</div>
                         <div>衣物件数： </div>
                         <div>姓名：</div>
                         <div>手机号：</div>
                         <div>卡号：</div>
                      </div>
                    </div>
                    <div className="Takeclothes-tab Takeclothesdetail-tab">
                        <table cellPadding="0" cellSpacing="0" border="0">
                           <thead>
                               <tr>
                                   <th></th>
                                   <th>衣物编码</th>
                                   <th>衣物名称</th>
                                   <th>颜色</th>
                                   <th>瑕疵</th>
                                   <th>衣挂号</th>
                                   <th>洗护状态</th>
                               </tr>
                           </thead>
                           <tbody>
                               {list}
                               {
                                   this.state.nodatas
                                   &&
                                   <Nodata />
                                }
                           </tbody>
                        </table> 
                    </div>
                    {
                        this.state.show
                        &&
                        <Takeclothesdetail id={this.state.id} onClick={() => this.setState({show:false})} data={this.state} M1Read={this.M1Read} closeView={this.props.closeView}/>
                    }
                </Window> 
        )
    }
}