/**
 * 撤单统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import './RevokeData.css';
import Window from '../../UI/Window';
export default class extends Component {   
    constructor(props) {
        super(props);    
        this.state={startdate:tool.date('Y-m-d'),enddate:tool.date('Y-m-d'),
        orderBack:[],item:[],orderCount:'',itemCount:''};
        this.arrbutton = this.arrbutton.bind(this);   
    }; 
    arrbutton(e){
        console.log(e.target.dataset.index)
        if(e.target.dataset.index==0){
            api.post('orderBack', {start_time:this.state.startdate,end_time:this.state.enddate,token:'token'.getData()}, (res, ver) => {
                if (ver && res) {
                    console.log(res)
                    this.setState({orderCount:res.result.orderCount,itemCount:res.result.itemCount,orderBack:res.result.orderBack,item:res.result.item});
                }
            }
            );
        }else if(e.target.dataset.index==1){

        }else{
            closeView();   
        }
    }
    render() {
       var arr = ['查询','打印','退出'].map((item,index) =><button key={index} data-index={index} onClick={this.arrbutton}>{item}</button>);
       var revokedata_detail = ['流水号','撤单日期','操作店员','撤单原因','原金额','金额','客户电话','客户姓名'].map((item,index)=><span>{item}</span>)
       var revokedata_clothes = ['店员姓名','客户电话','流水号','水洗条码号','衣物编码','衣物名称','衣物颜色','衣物网格','价格','品牌','折后价格','备注','状态','收衣时间','交货日期','格架号','附加服务','衣物件数','客户姓名','充值卡号','卡类型','住址','折扣率'
       ].map((item,index)=><span>{item}</span>)
       var orderBack = this.state.orderBack.map((item,index)=>  <li>
       <span>{item.id}</span>
       <span>{item.serialsn}</span>
       <span>{item.time}</span>
       <span>{item.operator}</span>
       <span>{item.cause}</span>
       <span>{item.amount}</span>
       <span>{item.amount_back}</span>
       <span>{item.user_mobile}</span>
       <span>{item.user_name}</span>
        </li>
       )
       var item = this.state.item.map((item,index)=>  <li>
           <span>{item.id}</span>
           <span>{item.operator}</span>
           <span>{item.user_mobile}</span>
           <span>{item.serialsn}</span>
           <span>{item.clean_sn}</span>
           <span>{item.clothing_number}</span>
           <span>{item.clothing_name}</span>
           <span>{item.clothing_color}</span>
           <span>{item.clothing_grids}</span>
           <span>{item.raw_price}</span>
           <span>{item.sign}</span>
           <span>{item.discount_price}</span>
           <span>{item.deal_time}</span>
           
            <span>{item.remark}</span>
            <span>{item.status}</span>
            <span>{item.collect_time}</span>
          
            <span>{item.discount_price}</span>
            <span>{item.grid_num}</span>
            <span>{item.addition_remark}</span>
            <span>{item.work_number}</span>
            <span>{item.user_name}</span>
            <span>{item.card_number}</span>
            <span>{item.card_type}</span>
            <span>{item.address}</span>
            <span>{item.discount}</span>


           </li>
       )
       return (             
            <Window title='撤单统计' onClose={this.props.closeView}>   
                      <div className="revokedata_data">
                         <div className="revokedata_dataLeft">
                            <div>开始日期：<input type="date" value = {this.state.startdate} onChange={e => this.setState({startdate:e.target.value})}/></div>                           
                            <div>结束日期：<input type="date" value = {this.state.enddate} onChange={e => this.setState({enddate:e.target.value})}/></div>
                         </div>
                         <div className="revokedata_dataright">
                           {arr}
                         </div>
                      </div>
                      <div className="revokedata_list">
                        <div>撤单合计</div>
                        <ul className="revokedata_list_box">
                            <li id="revokedata_list_box_li">
                                <span></span>
                                <span>合计</span>
                                <span>衣物合计</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>{this.state.orderCount}</span>
                                <span>{this.state.itemCount}</span>
                            </li>
                        </ul>
                      </div>
                      <div className="revokedata_list revokedata_last">
                        <div>撤单明细<b>共记录 <a>{this.state.orderBack.length}</a> 条</b><span className="revokedata_prompt"></span></div>
                        <ul className="revokedata_list_box">
                            <li id="revokedata_list_box_li">
                                <span></span>
                                 {revokedata_detail}
                            </li>
                        
                            <li>
                                {orderBack}
                            </li>
                        </ul>
                      </div>
                      <div className="revokedata_list revokedata_last">
                        <div>撤单衣物明细<b>共记录 <a>{this.state.item.length}</a> 件</b><span className="revokedata_prompt"></span></div>
                        <ul className="revokedata_list_box">
                            <li id="revokedata_list_box_li">
                                 <span></span>
                                 {revokedata_clothes}
                            </li>
                            <li>
                               {item}
                            </li>
                        </ul>
                      </div>
                   
             
             </Window> 
        );
    }
}