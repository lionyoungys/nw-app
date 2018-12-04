/**
 * 优惠活动
 */


import React, {Component} from 'react';
import './storespecialoffers.css'
import Table from '../../../UI/Table';
import Select from '../../../UI/Select';
import Nodata from '../../../UI/nodata';
import AppendCoupon from './AppendCoupon';
import Log from './Log';
import Record from './Record';
// import { CLIENT_RENEG_LIMIT } from 'tls';


const token = 'token'.getData();
export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state={
            newincrease:false,
            detaiCouShow:false,
            type:'现金券', //类型
            status:'未启用',   //状态
            start_time:tool.date('Y-m-d'),
            end_time:tool.date('Y-m-d'),
            discountname:'',//优惠名称
            creator:'',     //创建人
            arr:[],
            nodatas:true,
            count:'',
            record_list:[],
            log_list:[],
            cid:'',
        } 
        this.onClose = this.onClose.bind(this);
        this.editCouClose = this.editCouClose.bind(this);
        this.editCoupon = this.editCoupon.bind(this);
        this.query = this.query.bind(this);
        this.reset = this.reset.bind(this);
        this.record = this.record.bind(this);  //查看使用记录 
        this.log = this.log.bind(this) ;  //查看日志
        this.startuser = this.startuser.bind(this) //启用优惠券
    }  
    onClose(){

        this.setState({ newincrease: false})
    }
    editCouClose(){

        this.setState({ detaiCouShow: false });
        this.query();
    }
    query(){
        let params={
            token:token,
            type:this.state.type=='现金券'?'1':'2',
            name:this.state.discountname,
            creater:this.state.creator,
            start_time:this.state.start_time,
            end_time:this.state.end_time,
            status:this.state.status=='未启用'?'0':this.state.status=='已启用'?"1":'2'
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
        this.setState({discountname:'',creator:''});
    }
    // 记录弹框
    record (e){
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
                    tool.ui.error({callback:(close, event) => {
                        close();                       
                        this.query();
                    }});
                }
            });
    }
    //修改优惠券
    editCoupon(e){

        var id = e.target.dataset.id;
        console.log(id);
        this.setState({ cid: id, detaiCouShow:true})
    }
    render(){        
        let list =this.state.arr.map((item,index)=>
        <tr key={'item'+index}>
            <td>{index}</td>
            <td>{item.type==1?'现金券':'折扣券'}</td>
            <td>{item.name}</td>
            <td>{item.remarks}</td>
            <td>{item.stock}\{item.surplus}</td>
            <td>{item.start_time}</td>
            <td>{item.end_time}</td>
            <td>{item.status==0?'未启用':item.status==1?'已启用':'已过期'}</td>
            <td>
                {item.status==0?
                        <span><span onClick={this.startuser} data-write={index} className='e-blue' data-id={item.id}>启用</span>&nbsp;&nbsp;&nbsp;&nbsp;<span onClick={this.editCoupon} data-write={index} data-id={item.id} className='e-blue'>修改</span>&nbsp;&nbsp;&nbsp;&nbsp;<span  onClick={this.log} data-write={index} className='e-blue' data-id={item.id}>日志</span></span>
                :item.status==1?<span><span onClick={this.mod} data-write={index} className='e-blue'>停用</span>&nbsp;&nbsp;&nbsp;&nbsp;<span  onClick={this.record} data-write={index} className='e-blue' data-id={item.id} data-status={item.status} data-type={item.type}>记录</span>&nbsp;&nbsp;&nbsp;&nbsp;<span  onClick={this.log} data-write={index} className='e-blue' data-id={item.id}>日志</span></span>
                : <span  onClick={this.log} data-write={index} className='e-blue' data-id={item.id}>日志</span>  
            }
            </td>
        </tr>
    );
        return (
         <div >
           <div className='storespecialofferstopbg'>
              <div className='storespecialofferstop_one'>
                 <div> 
                    <span>类&emsp;型：</span><Select  option={['现金券','折扣券']} style={{width:'153px'}} value={this.state.type} onChange={obj => this.setState({type:obj.value})} />
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
                    <span>状&emsp;&emsp;态：</span><Select  option={['未启用','已启用','已过期']}  style={{width:'153px'}} value={this.state.status} onChange={obj => this.setState({status:obj.value})}/>
                 </div>
              </div>
              <div className='storespecialofferstop_three'>
                 <div >
                    <label>开始时间：</label><input type="date"  className='e-date storespecialofferstop_datewidth' value = {this.state.start_time} onChange={e=>this.setState({start_time:e.target.value})}/> 
                    - <input type="date"  className='e-date storespecialofferstop_datewidth' value = {this.state.end_time} onChange={e=>this.setState({end_time:e.target.value})}/>
                 </div>
                 <div>    
                    <button   className='e-btn-b' onClick={this.reset}>重置</button> &emsp; 
                    <button   className='e-btn' onClick={() =>this.setState({newincrease:true})}>新增</button>  &emsp;
                    <button   className='e-btn' onClick={this.query}>查询</button>  
                 </div>
              </div>            
           </div>    
                   <div className='storespecialoffersbottom'>
                    <Table>
                        <thead>
                            <tr>
                                <th>编号</th>                             
                                <th>优惠类型 </th>
                                <th>优惠卷名称 </th>
                                <th >优惠方案</th>
                                <th >总数量\已用 </th>  
                                <th >开始时间 </th>   
                                <th >结束时间 </th>                            
                                <th >状态 </th>   
                                <th >操作 </th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                            {/* {this.state.nodatas && <Nodata />} */}
                        </tbody>
                    </Table>
                    </div>
                    {
                        this.state.newincrease && <AppendCoupon onClose={this.onClose} />
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
        </div> 
        );
    }
    }