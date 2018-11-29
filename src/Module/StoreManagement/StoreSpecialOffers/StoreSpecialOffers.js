/**
 * 优惠活动
 */


import React, {Component} from 'react';
import './storespecialoffers.css'
import Table from '../../../UI/Table';
import Select from '../../../UI/Select';
import Nodata from '../../../UI/nodata';
export default class extends Component {   
    constructor(props) {
        super(props);   
        }  

    render(){
        return (
         <div >
           <div className='storespecialofferstopbg'>
              <div className='storespecialofferstop_one'>
                 <div> 
                    <span>类&emsp;型：</span><Select  option={['未取走','已取走','已撤单']} style={{width:'153px'}}/>
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
                    <span>状&emsp;&emsp;态：</span><Select  option={['未取走','已取走','已撤单']}  style={{width:'153px'}}/>
                 </div>
              </div>
              <div className='storespecialofferstop_three'>
                 <div >
                    <label>开始时间：</label><input type="date"  className='e-date storespecialofferstop_datewidth'/> - <input type="date"  className='e-date storespecialofferstop_datewidth'/>
                 </div>
                 <div>    
                    <button  onClick={this.M1Read} className='e-btn' >重置</button> &emsp; 
                    <button  onClick={this.M1Read} className='e-btn'>新增</button>  &emsp;
                    <button  onClick={this.M1Read} className='e-btn'>查询</button>  
                 </div>
              </div>            
           </div>    
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
        );
    }
    }