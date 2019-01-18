/**
 * 优惠券列表
 */


import React, {Component} from 'react';
import './storespecialoffers.css'
import Table from '../../../UI/Table';
import Select from '../../../UI/Select';
import Nodata from '../../../UI/nodata';
import AppendCoupon from './AppendCoupon';
import Log from './Log';
import Record from './Record';
import FindLink from './FindLink'
import SalePromotionDetail from '../SalePromotion/SalePromotionDetail';
const token = 'token'.getData();
export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state={
            newincrease:false,
            detaiCouShow:false,
            link:false,//查看链接
            type:'全部', //类型
            status:'全部',   //状态
            start_time:'',
            end_time:'',
            discountname:'',//优惠名称
            creator:'',     //创建人
            arr:[],
            nodatas:true,
            count:'',
            record_list:[],
            log_list:[],
            cid:'',
            on_coupon:false,   
            coupon_Name:'' , //优惠券名称
            coupon_Type:'' , //优惠类型
            coupon_Method:'' , //优惠方案
            cloType:'' ,// 货品品类
            cloCode:'' , //品类编码
            useMer:'' , // 使用门店
            useRole:'' ,  // 使用规则
            useNumber:'', // 总数量
            startime:'', // 开始时间 
            endtime:'', // 结束时间
            id:'',//选中行id
            url:'',//选中链接
            numberid:''//编号
        } 
        this.onClose = this.onClose.bind(this);
        this.editCouClose = this.editCouClose.bind(this);
        this.editCoupon = this.editCoupon.bind(this);
        this.query = this.query.bind(this);
        this.reset = this.reset.bind(this);
        this.record = this.record.bind(this);   //查看使用记录 
        this.log = this.log.bind(this) ;   //查看日志
        this.startuser = this.startuser.bind(this);         //启用优惠券
        this.link = this.link.bind(this);
        this.commonRoll = this.commonRoll.bind(this); //常用卷
        this.immediateUse = this.immediateUse.bind(this);//立即使用
    }
    componentDidMount() {
        this.query();
    }
    onClose(){
        this.setState({ newincrease: false,on_coupon:false,numberid:''});
    }
    editCouClose(){
        this.setState({ detaiCouShow: false });
        this.query();
    }
    //立即使用
    immediateUse(e){
        e.stopPropagation();
        let id=e.target.dataset.id;
        console.log(id);
        this.setState({ newincrease: true,numberid:id});
    }
    query(){
        let params={
            token:token,
            type:this.state.type=='全部'?'':this.state.type=='现金券'?'1':'2',
            name:this.state.discountname,
            creater:this.state.creator,
            start_time:this.state.start_time,
            end_time:this.state.end_time,
            status:this.state.status=='全部'?'':this.state.status=='未启用'?'0':this.state.status=='已启用'?"1":'2'
        }
        console.log(params)
        api.post('discountsearch', params, (res,ver) => {
            if (ver && res) {
                console.log(res)    
                if(res.result.data.length>0){
                    this.setState({arr:res.result.data
                        // ,count:res.result.count,page:page,nodatas:false
                    })
                }else{
                    this.setState({nodatas:true,arr:[],count:0})
                }         
               
                //console.log(this.state.checkedArr)
            }else{
                handle();
            }
        });
    }
    reset(){
        this.setState({
            type:'全部', //类型
            status:'全部',   //状态
            start_time:'',
            end_time:'',
            discountname:'',//优惠名称
            creator:'',     //创建人
        });
    }
    // 记录弹框
    record (e){
        e.stopPropagation()
        var id = e.target.dataset.id;  //优惠券编码      
        api.post('recordList', {
            token:token,
            cid:id
           } ,(res,ver) => {
                if (ver && res) {
                    console.log(res)    
                    if(res.result.data.length>0){
                        this.setState({record_list:res.result.data})
                    }else{
                        tool.ui.error({title:'提示', msg:'暂无记录', button:['确定'],callback:(close, value) => {                            
                            close();
                        }});                 
                    }                           
                }else{
                    handle();
                }
            });
    }
    // 日志
    log (e){
       // console.log(1)
       e.stopPropagation()
        var id = e.target.dataset.id;
        console.log(id)
        api.post('logList', {
            token:token,
            cid:id
        }, (res,ver) => {
                if (ver && res) {
                    console.log(res)
                    if(res.result.cou_log.length>0){
                        this.setState({log_list:res.result.cou_log});
                        
                    }else{
                        tool.ui.error({title:'提示', msg:'暂无日志', button:['确定'],callback:(close, value) => {                          
                            close();
                        }});
                    }                  
                }else{
                    handle();
                }
            });
    }
    // 启用优惠券
    startuser (e){
        e.stopPropagation()
        var id = e.target.dataset.id;
        console.log(id)
        api.post('start_using', {
            token:token,
            cid:id
        }, (res,ver) => {
                if (ver && res) {
                    console.log(res)
                    tool.ui.success({callback:(close, event) => {
                        close();                       
                        this.query();
                    }});
                }else{
                    console.log(res)
                    tool.ui.error({msg:res.msg,callback:(close) => {
                            close();
                            this.query();
                    }});
                }
            });
    }
    //修改优惠券
    editCoupon(e){
        e.stopPropagation()
        var id = e.target.dataset.id;
        console.log(id);
        this.setState({ cid: id, detaiCouShow:true})
    }
    //常用卷
    commonRoll(){
         console.log("bbbbbb");
         this.setState({arr:[
                 {id:1,type:1,name:'5元现金卷',remarks:'满30可立减xx元',stock:'0',receive:'0',start_time:'',end_time:'',status:'3'},
                 {id:2,type:1,name:'10元现金卷',remarks:'满30可立减xx元',stock:'0',receive:'0',start_time:'',end_time:'',status:'3'},
                 {id:3,type:1,name:'20元现金卷',remarks:'满30可立减xx元',stock:'0',receive:'0',start_time:'',end_time:'',status:'3'},
                 {id:4,type:2,name:'7折折扣卷',remarks:'满50打7折',stock:'0',receive:'0',start_time:'',end_time:'',status:'3'},
                 {id:5,type:2,name:'8折折扣卷',remarks:'满50打8折',stock:'0',receive:'0',start_time:'',end_time:'',status:'3'}

             ]});
    }
    //查看链接
    link(e){
        e.stopPropagation();
        let url = e.target.dataset.id;
        // console.log('1111'+e.target.dataset.id);
        if (!tool.isSet(url)){

            return tool.ui.error({
                title: '提示', msg: '暂无链接查询', button: ['确定'], callback: (close, value) => {
                    close();
                }
            });
        } 
        this.setState({url:url, link:true})
    }
    render(){   
        console.log(this.state.on_coupon)     
        let list =this.state.arr.map((item,index)=>
            <tr key={'item' + index} data-index={index} onClick={item.status==3?"":() => this.setState({ on_coupon: true, id: item.id })}>
            <td>{item.id}</td>
            <td>{item.type==1?'现金券':'折扣券'}</td>
            <td>{item.name}</td>
            <td>{item.remarks}</td>
            <td>{item.stock}\{item.receive}</td>
            <td>{item.start_time}</td>
            <td>{item.end_time}</td>
            <td>{item.status==0?'未启用':item.status==1?'已启用':item.status==2?'已过期':'未启用'}</td>
            <td>
                {item.status==0?
                        <span><span onClick={this.startuser} data-write={index} className='e-blue' data-id={item.id}>启用</span>&nbsp;&nbsp;<span onClick={this.editCoupon} data-write={index} data-id={item.id} className='e-blue'>修改</span>&nbsp;&nbsp;<span  onClick={this.log} data-write={index} className='e-blue' data-id={item.id}>日志</span>&nbsp;&nbsp;<span  onClick={this.link}  data-write={index} className='e-blue' data-id={item.id}>查看链接</span></span>
                :item.status==1?<span><span  onClick={this.record} data-write={index} className='e-blue' data-id={item.id} data-status={item.status} data-type={item.type}>记录</span>&nbsp;&nbsp;<span  onClick={this.log} data-write={index} className='e-blue' data-id={item.id}>日志</span>&nbsp;&nbsp;<span  onClick={this.link} data-write={index} className='e-blue' data-id={item.id}>查看链接</span></span>
                : item.status==2? <span><span onClick={this.log} data-write={index} className='e-blue' data-id={item.id}>日志</span> &nbsp;&nbsp;<span onClick={this.link} data-url={item.id} className='e-blue' data-id={item.id}>查看链接</span> </span>
                :<span className='e-blue' onClick={this.immediateUse} data-id={item.id}>立即使用</span>
                }
            </td>
        </tr>
    );
        return (
        <div style={{ height: '100%' }}>
           <div className='storespecialofferstopbg'>
              <div className='storespecialofferstop_one'>
                 <div> 
                    <span>类&emsp;型：</span><Select  option={['全部','现金券','折扣券']} style={{width:'153px'}} value={this.state.type} onChange={obj => this.setState({type:obj.value})} />
                 </div>
                 <div>
                    <span>创建人：</span><input type="text" className='e-input storespecialofferstop_inputwidth' onChange={e=>this.setState({creator:e.target.value})} value={this.state.creator}/>
                 </div>
              </div>
              <div  className='storespecialofferstop_two'>
                 <div>
                    <span>优惠名称：</span><input type="text" className='e-input storespecialofferstop_inputwidth' onChange={e=>this.setState({discountname:e.target.value})} value={this.state.discountname}/>
                 </div>
                 <div>    
                    <span>状&emsp;&emsp;态：</span><Select  option={['全部','未启用','已启用','已过期']}  style={{width:'153px'}} value={this.state.status} onChange={obj => this.setState({status:obj.value})}/>
                 </div>
              </div>
              <div className='storespecialofferstop_three'>
                 <div >
                    <label>开始时间：</label><input type="date"  className='e-date storespecialofferstop_datewidth' value = {this.state.start_time} onChange={e=>this.setState({start_time:e.target.value})}/> 
                    - <input type="date"  className='e-date storespecialofferstop_datewidth' value = {this.state.end_time} onChange={e=>this.setState({end_time:e.target.value})}/>
                 </div>
                 <div>
                     <button   className='e-btn' onClick={this.commonRoll}>常用卷</button>&nbsp;
                     <button   className='e-btn-b' onClick={this.reset}>重置</button> &nbsp;
                    <button   className='e-btn' onClick={() =>this.setState({newincrease:true})}>新增</button>  &nbsp;
                    <button   className='e-btn' onClick={this.query}>查询</button>  
                 </div>
              </div>            
           </div>    
            <div className='storespecialoffersbottom'>
                <Table style={{ height: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{minWidth:'50px'}}>编号</th>                             
                            <th style={{minWidth:'80px'}}>优惠类型 </th>
                            <th style={{minWidth:'90px'}}>优惠卷名称 </th>
                            <th style={{minWidth:'80px'}}>优惠方案</th>
                            <th style={{minWidth:'74px'}}>总数量\已用 </th>  
                            <th style={{minWidth:'75px'}}>开始时间 </th>   
                            <th style={{minWidth:'75px'}}>结束时间 </th>                            
                            <th style={{minWidth:'65px'}}>状态 </th>   
                            <th style={{minWidth:'120px'}}>操作 </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                        {/* {this.state.nodatas && <Nodata />} */}
                    </tbody>
                </Table>
                </div>
                {
                    this.state.newincrease && <AppendCoupon onClose={this.onClose} data_id={this.state.numberid} />
                }
                {
                    this.state.record_list.length>0 && <Record data = {this.state.record_list} onClose={() => this.setState({record_list:[]})} />
                }
                {
                    this.state.log_list.length >0 && <Log  data = {this.state.log_list} onClose={() => this.setState({log_list:[]})} />
                }
                {
                this.state.detaiCouShow && <AppendCoupon data={this.state.cid} onClose={this.editCouClose} />
                }
                {
                this.state.on_coupon && <SalePromotionDetail id={this.state.id} index ='1' onClose={this.onClose}  />
                }
                {
                    this.state.link && <FindLink url={this.state.url} onClose={() => this.setState({ link: false })}/>
                }
        </div> 
        );
    }
    }