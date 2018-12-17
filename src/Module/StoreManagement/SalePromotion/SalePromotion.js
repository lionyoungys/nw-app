/**
 * 促销活动
 */
import React, {Component} from 'react';
import Table from '../../../UI/Table';
import Select from '../../../UI/Select';
import Nodata from '../../../UI/nodata';
import AppendDisActivity from '../StoreSpecialOffers/AppendDisActivity'
import SalePromotionDetail from './SalePromotionDetail'
const token = 'token'.getData();
export default class extends Component {   
    constructor(props) {
        super(props);  
        this.state = {
            appendShow: false,
            proDetailShow:false,
            detaiCouShow:false,
            type:'全部', //类型
            status:'全部',   //状态
            start_time:'',
            end_time:'',
            discountname:'',//优惠名称
            creator:'',     //创建人
            arr:[],
            nodatas:true,
            count:'',
            id:''//点击的id
        }
        this.onClose = this.onClose.bind(this); 
        this.editCouClose = this.editCouClose.bind(this);
        this.query = this.query.bind(this);
        this.reset = this.reset.bind(this);
        this.editCoupon = this.editCoupon.bind(this);
        this.log = this.log.bind(this);
        this.startuser =this.log.bind(this);
        this.suspend = this.suspend.bind(this);
    }  
     // 日志
     log (e){
        e.stopPropagation();
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
     suspend(e){
         var id = e.target.dataset.id;
         console.log(id)
         api.post('salePromotionSuspend', {
             token:token,
             aid:id
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
     // 启用优惠券
     startuser (e){
        e.stopPropagation();
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
    onClose() {

        this.setState({ appendShow: false, proDetailShow:false });
        this.query();
    }
    reset(){

    }
    editCouClose() {
        this.setState({ detaiCouShow: false });
        this.query();
    }
    query(){
        let params={
            token:token,
            type:this.state.type=='全部'?'':this.state.type=='满减'?'1':this.state.type=='折扣'?'2':this.state.type=='多件洗'?'3':'4',
            name:this.state.discountname,
            operator:this.state.creator,
            start_time:this.state.start_time,
            end_time:this.state.end_time,
            status:this.state.status=='全部'?'':this.state.status=='未开始'?'1':this.state.status=='进行中'?"2":'3'
        }
        console.log(params)
        api.post('salePromotion', params, (res,ver) => {
            if (ver && res) {
                console.log(res)    
                if(res.result.data.length>0){
                    this.setState({arr:res.result.data,
                        // ,count:res.result.count,page:page,
                        nodatas:false
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
    render(){
        let list =this.state.arr.map((item,index)=>
        <tr key={'item'+index} >
            <td >{item.id}</td>
            <td >{item.type=='1'?'满减':item.type=='2'?'折扣':item.type=='3'?'多件洗':'袋洗'}</td>
            <td>{item.name}</td>
            <td title={item.item_name}>{item.item_name.substring(0,20)}</td>
            <td style={{ maxWidth: '130px', lineHeight: '18px', margin: '0 5px'}}>{item.mname}</td>
            <td>{tool.date('Y-m-d', item.start_time)}</td>
            <td>{tool.date('Y-m-d', item.end_time)}</td>
            <td >{item.status}</td>
            <td style={{ minWidth: '120px' }}>
                {item.status=='未开始'?
                        <span><span onClick={this.editCoupon} data-write={index} className='e-blue' data-id={item.id}>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;<span onClick={() => this.setState({ proDetailShow: true,id:item.id })} data-write={index} data-id={item.id} className='e-blue'>详情</span></span>
                :item.status=='进行中'?<span><span onClick={() => this.setState({ proDetailShow: true,id:item.id })} data-write={index} className='e-blue'>详情</span>&nbsp;&nbsp;&nbsp;&nbsp;<span  onClick={this.suspend} data-write={index} className='e-blue' data-id={item.id} data-status={item.status} data-type={item.type}>中止</span></span>
                : <span  onClick={() => this.setState({ proDetailShow: true,id:item.id })} data-write={index} className='e-blue' data-id={item.id}>详情</span>  
            }
            </td>
        </tr>
        );
        return (
            <div style={{ height: '100%' }}>
                <div className='storespecialofferstopbg'>
                    <div className='storespecialofferstop_one'>
                        <div>
                            <span>类&emsp;型：</span><Select option={['全部','满减', '折扣', '多件洗', '袋洗']} style={{ width: '153px' }} value={this.state.type} onChange={obj => this.setState({ type: obj.value })} />
                        </div>
                        <div>
                            <span>创建人：</span><input type="text" className='e-input storespecialofferstop_inputwidth' />
                        </div>
                    </div>
                    <div className='storespecialofferstop_two'>
                        <div>
                            <span>活动名称：</span><input type="text" className='e-input storespecialofferstop_inputwidth' />
                        </div>
                        <div>
                            <span>状&emsp;&emsp;态：</span><Select option={['全部','未开始', '进行中', '已结束']} style={{ width: '153px' }} value={this.state.status} onChange={obj => this.setState({ status: obj.value })} />
                        </div>
                    </div>
                    <div className='storespecialofferstop_three'>
                        <div >
                            <label>开始时间：</label><input type="date" className='e-date storespecialofferstop_datewidth' value={this.state.start_time} onChange={e => this.setState({ start_time: e.target.value })} />
                            - <input type="date" className='e-date storespecialofferstop_datewidth' value={this.state.end_time} onChange={e => this.setState({ end_time: e.target.value })} />
                        </div>
                        <div>
                            <button onClick={this.M1Read} className='e-btn-b' onClick={this.reset}>重置</button> &emsp;
                            <button onClick={this.M1Read} className='e-btn' onClick={() => this.setState({ appendShow: true })}>新增</button>  &emsp;
                            <button onClick={this.M1Read} className='e-btn' onClick={this.query}>查询</button>
                        </div>
                    </div>
                </div>    
                <div className='storespecialoffersbottom'>
                    <Table style={{height:'100%'}}>
                        <thead>
                            <tr>
                                <th style={{minWidth:'50px'}}>编号</th>                             
                                <th style={{minWidth:'80px'}}>促销类型 </th>
                                <th style={{minWidth:'90px'}}>活动名称 </th>
                                <th style={{minWidth:'80px'}}>适用品类</th>
                                <th style={{minWidth:'74px'}}>适用门店 </th>  
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
                    this.state.appendShow && <AppendDisActivity onClose={this.onClose} />
                }
                {
                    this.state.proDetailShow && <SalePromotionDetail onClose={this.onClose} id={this.state.id} />
                }
                {
                    this.state.detaiCouShow && <AppendDisActivity data={this.state.cid} onClose={this.editCouClose} />
                }
        </div>
        );
    }
}