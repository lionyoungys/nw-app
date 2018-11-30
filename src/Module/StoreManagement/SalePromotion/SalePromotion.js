/**
 * 促销活动
 */
import React, {Component} from 'react';
import Table from '../../../UI/Table';
import Select from '../../../UI/Select';
import Nodata from '../../../UI/nodata';
import AppendDisActivity from '../StoreSpecialOffers/AppendDisActivity'
import SalePromotionDetail from './SalePromotionDetail'
export default class extends Component {   
    constructor(props) {
        super(props);  
        this.state = {
            appendShow: false,
            proDetailShow:false,
        }
        this.onClose = this.onClose.bind(this); 
    }  
    onClose() {

        this.setState({ appendShow: false, proDetailShow:false })
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
                    <button  onClick={this.M1Read} className='e-btn-b' >重置</button> &emsp; 
                    <button  onClick={this.M1Read} className='e-btn' onClick={() => this.setState({ appendShow: true })}>新增</button>  &emsp;
                    <button onClick={this.M1Read} className='e-btn' onClick={() => this.setState({ proDetailShow: true })}>查询</button>  
                 </div>
              </div>            
           </div>    
                   <div className='storespecialoffersbottom'>
                    <Table>
                        <thead>
                            <tr>
                                <th>编号</th>                             
                                <th>促销类型 </th>
                                <th>活动名称 </th>
                                <th >适用品牌</th>
                                <th >适用门店 </th>  
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
                    this.state.appendShow && <AppendDisActivity onClose={this.onClose} />
                }
                {
                    this.state.proDetailShow && <SalePromotionDetail onClose={this.onClose} />
                }
        </div> 
        );
    }
    }