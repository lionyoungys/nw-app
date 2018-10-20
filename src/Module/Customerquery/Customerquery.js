/**
 * 客户信息查询页面
 * @author  fanyerong&wangjun
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Page from '../../UI/Page';
import './Customerquery.css';
import './Membersdetail.css';
import Select from '../../UI/Select';
import Nodata from '../../UI/nodata';

const token = 'token'.getData();
export default class extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            show:false,
            user_mobile:'',
            user_name:'',
            recharge_number:'',
            card_name:'',//卡类型
            types:[],
            list:[],
            page: 1,
            count: 0,
            index:0,
            countdetail:0,
            listdetail:[],
            pagedetail:1,
            nodatas:false,   
            alldata:false,        
        }     
        this.limit = 15;
        this.query = this.query.bind(this);      
        this.handleClick = this.handleClick.bind(this);       
        this.M1Read = this.M1Read.bind(this); 
    };  
    componentDidMount(){
        api.post('cardType', {token:token}, (res,ver) => {
            if (ver && res) {
                console.log(res)
                if (res.result.cardsType.length > 0) {
                    
                    this.setState({card_name:res.result.cardsType[0].card_type ,types: res.result.cardsType.typeArray('card_type')});
                    this.state.types.push('全部')
                    this.query();

                }
            }else{
                handle();
            }
        });
    }
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
            this.query(1);
        }
      
        EventApi.M1Read(obj);
      
    }
    query(page){
        console.log(page);
        page = page || this.state.page;
        api.post('balanceTotal', {
            token:token,
            recharge_number:this.state.recharge_number,
            user_mobile:this.state.user_mobile,
            user_name:this.state.user_name,
            card_name:this.state.card_name=='全部'?'':this.state.card_name,
            page:page,
            limit:this.limit
        }, (res,ver,handle) => {
            if (ver && res) {
                console.log(res)
                if(res.result.list.length>0){
                    this.setState({ 
                        list: res.result.list,
                        count:res.result.user_total,
                        page: page,
                        nodatas:false,
                    });
                }else{
                    this.setState({
                        nodatas:true,
                        list:[],
                        count:0,
                    })
                } 
            }else{
                handle();
            }
        });
    }
    handleClick(e){
        
        var index = e.target.dataset.index || e.target.parentNode.dataset.index; 
        if ('' == this.state.list[index].recharge_number || null == this.state.list[index].recharge_number) return tool.ui.error({
            title: '提示', msg: '无卡号用户不支持详情查询', button: '确定', callback: (close, event) => {
                close();
            }
        });
        console.log('点击了' + index);
        let pramas = {
            token: token,
            recharge_number: this.state.list[index].recharge_number,
            // user_mobile: this.state.list[index].user_mobile,
            // user_name: this.state.list[index].user_name,
            page: 1,
            limit: 1000,
        }
        console.log(pramas);
        api.post('userPayInfo', pramas, (res,ver,handle) => {
            if (ver && res) {
                console.log(res);
                this.setState({ listdetail: res.result.list, countdetail: res.result.count, alldata: res.result.list.length > 0 ?false:true });
            }else{
                this.setState({ listdetail: [], countdetail: 0, alldata: true });
                handle();
            }
        });
        this.setState({ show: true, index: index })
    }
    render() {   
        let list=this.state.list.map((item,index)=>
            <tr data-index={index} onClick={this.handleClick} key={'item'+index}>
            <td>{index+1+(this.state.page-1)*this.limit}</td>
            <td>{item.recharge_number}</td>
            <td>{item.user_name}</td>
            <td>{item.user_mobile}</td>
            <td>{item.card_name}</td>
            <td>{item.balance}</td> 
            <td>{item.time}</td>                             
        </tr>       
        );
        let listdetail = this.state.listdetail.map((item,index)=>
        <tr key={'itemdetail'+index}>
            <td>{index+1}</td>
            <td>{item.serialsn}</td>                      
            <td>{item.operator}</td>
            <td>{item.work_number}</td>
            <td>{item.amount}</td>
            <td>{item.real_amount}</td>
            <td>{item.discount}%</td>
            <td>{item.pay_type}</td>
            <td>{item.time}</td>
            <td>{item.recharge_number}</td>
            <td>{item.card_type}</td>

        </tr>
        );
        return (       
        <div>
            <Window title='客户信息查询' onClose={this.props.closeView}>
                <div className="Customerquery">
                   <div className="Customerquery-title" id="Customerquery-title">
                        <div><span>客户电话：</span><input type="text" className='e-input' value={this.state.user_mobile} onChange={e=>this.setState({user_mobile:e.target.value})}/></div>
                        <div><span>客户姓名：</span><input type="text" className='e-input' value={this.state.user_name} onChange={e=>this.setState({user_name:e.target.value})}/></div>
                        <div><span>卡号：</span><input type="text" className='e-input'  value={this.state.recharge_number} onChange={e=>this.setState({recharge_number:e.target.value})}/></div>
                        <div><span>卡类型：</span><Select option={this.state.types}  value={this.state.card_name} onChange={value => this.setState({card_name:value.value})}/></div>
                   </div>
                   <div className="Customerquery-right">
                      <button className="Customerquery-query" onClick={()=>this.query(1)}>查询</button>
                      <button className="Customerquery-over" onClick={this.M1Read} >读卡</button>
                    </div>
                </div>
                <div className="Customerquery-tab cust-tab" id="cust-tab">
                  <div className="Customerquery-tab-title">已为您找到<b>{this.state.count}</b>条数据</div>
                  <table border="0" cellSpacing="0" cellPadding="0">
                      <thead>
                          <tr>
                              <th>序号</th>                             
                              <th>卡号</th>
                              <th>会员姓名 </th>
                              <th>会员手机号 </th>
                              <th>卡类型</th>
                              <th>余额 </th> 
                              <th>发卡时间 </th>                            
                          </tr>
                      </thead>
                      <tbody>
                         {list}
                         {this.state.nodatas && <Nodata />}
                      </tbody>
                  </table>
                </div>
                <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)} />                 
            </Window>  
            {
                    this.state.show
                    &&
                    <Window title='客户信息详情'  onClose={()=>this.setState({show:false})}>
                        <div className="Membersdetail " id="Membersdetail">
                            <div>卡号：<span>{this.state.list[this.state.index].recharge_number}</span></div>
                            <div>姓名：<span>{this.state.list[this.state.index].user_name}</span></div>
                            <div>手机号：<span>{this.state.list[this.state.index].user_mobile}</span></div>
                            <div>发卡店：<span>{this.state.list[this.state.index].mname}</span></div>
                            <div>卡类型：<span>{this.state.list[this.state.index].card_name}</span></div>
                            <div>折扣率：<span>{this.state.list[this.state.index].discount}%</span></div>
                            <div>余额：<span>{this.state.list[this.state.index].balance}</span></div>
                            <div>发卡时间：<span>{this.state.list[this.state.index].time}</span></div>
                            <div>性别：<span>{this.state.list[this.state.index].sex}</span></div> 
                            <div>生日：<span>{this.state.list[this.state.index].birthday}</span></div>   
                            <div>地址：<span>{this.state.list[this.state.index].address}</span></div>                
                        </div> 
                        <div className="Membersdetail-tab cust-tab">
                            <div className="Membersdetail-tab-title">已为您找到<span>{this.state.countdetail}</span>条记录</div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>流水号</th>                                       
                                        <th>店员姓名</th>
                                        <th>衣物件数</th>
                                        <th>金额</th>
                                        <th>实收金额</th>
                                        <th>折扣率 </th>
                                        <th>收银类型</th>
                                        <th>时间</th>
                                        <th>卡号</th>
                                        <th>卡类型</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {listdetail} 
                                   {this.state.alldata && <Nodata />}                      
                                </tbody>
                            </table>
                        </div>                              
                </Window>
                 }       
        </div>    
        );
    }
}