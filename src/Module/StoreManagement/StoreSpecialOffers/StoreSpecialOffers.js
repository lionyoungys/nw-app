/**
 * 优惠活动
 */


import React, {Component} from 'react';
import './storespecialoffers.css'
import Table from '../../../UI/Table';
import Select from '../../../UI/Select';
import Nodata from '../../../UI/nodata';
import AppendCoupon from './AppendCoupon'
export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state={
            newincrease:false,
            type:'抵扣', 
            status:'',
            start_time:tool.date('Y-m-d'),
            end_time:tool.date('Y-m-d'),
        } 
        this.onClose = this.onClose.bind(this);
        this.query = this.query.bind(this);
        this.reset = this.reset.bind(this);
    }  
    onClose(){

        this.setState({newincrease:false})
    }
    query(){

    }
    reset(){

    }
    render(){
        return (
         <div >
           <div className='storespecialofferstopbg'>
              <div className='storespecialofferstop_one'>
                 <div> 
                    <span>类&emsp;型：</span><Select  option={['抵扣','折扣券']} style={{width:'153px'}} value={this.state.type} onChange={obj => {this.setState({type:obj.value})}} />
                 </div>
                 <div>
                    <span>创建人：</span><input type="text" className='e-input storespecialofferstop_inputwidth'/>
                 </div>
              </div>
              <div  className='storespecialofferstop_two'>
                 <div>
                    <span>优惠名称：</span><input type="text" className='e-input storespecialofferstop_inputwidth'/>
                 </div>
                 <div>    
                    <span>状&emsp;&emsp;态：</span><Select  option={['已使用','未使用']}  style={{width:'153px'}} value={this.state.status} onChange={obj => {this.setState({status:obj.value})}}/>
                 </div>
              </div>
              <div className='storespecialofferstop_three'>
                 <div >
                    <label>开始时间：</label><input type="date"  className='e-date storespecialofferstop_datewidth' value = {this.state.start_time} onChange={e=>this.setState({start_time:e.target.value})}/> 
                    - <input type="date"  className='e-date storespecialofferstop_datewidth' value = {this.state.end_time} onChange={e=>this.setState({end_time:e.target.value})}/>
                 </div>
                 <div>    
                    <button  onClick={this.M1Read} className='e-btn-b' onClick={this.reset}>重置</button> &emsp; 
                    <button  onClick={this.M1Read} className='e-btn' onClick={() =>this.setState({newincrease:true})}>新增</button>  &emsp;
                    <button  onClick={this.M1Read} className='e-btn' onClick={this.query}>查询</button>  
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
                            {/* {list}
                            {this.state.nodatas && <Nodata />} */}
                        </tbody>
                    </Table>
                    </div>
                    {
                        this.state.newincrease && <AppendCoupon onClose={this.onClose} />
                    }
        </div> 
        );
    }
    }