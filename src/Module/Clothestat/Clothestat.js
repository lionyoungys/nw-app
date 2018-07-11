/**
 * 衣物统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Page from '../../UI/Page';
import './Clothestat.css';

export default class extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            startdate:tool.date('Y-m-01'),
            enddate:tool.date('Y-m-d'),
            allcount:0,
            list: [],
            allist:[],
            user_total: '',
            total_amount: '',
            list: [],
            page: 1,
            count: 1, 
            states:'',
        } 
        this.limit = 15;
        this.query = this.query.bind(this);                  
    };       
    
    query(page) {
        console.log(page);
        api.post('clothestate', { 
            token: 'token'.getData(), 
            start_time: this.state.startdate, 
            end_time:this.state.enddate,
            page:page, 
            limit:this.limit,
         }, (res, ver, handle) => {
            if (ver && res) {
                console.log(res);
                this.setState({
                    list: res.result.list,
                    page:page,
                    allist:res.result.type,
                    allcount:res.result.total_count,
                    total_amount: res.result.total_amount, 
                    count: res.result.count,                   
                });  
            } else {
                console.log(res);
                handle();
            }
        });
    }

    render() {
       var arr = ['查询'].map((item,index) =><button key={index} data-index={index} onClick={()=>this.query(1)}>{item}</button>);
       var list = this.state.allist.map((item,index) =>
          <tr key = {'item'+index}>
              <td>{item.name}</td>
              <td>{item.count}</td>
          </tr>
        )
        var indexlist = this.state.list.map((item,index) =>
          <tr key = {'item' + index}>
              <td>{index + 1 + (this.state.page - 1) * this.limit}</td>
              <td>{item.operator}</td>
              <td>{item.user_mobile}</td>
              <td>{item.serialsn}</td>
              <td>{item.clothing_number}</td>
              <td>{item.clothing_name}</td>
              <td>{item.clothing_color}</td>
              <td>{item.clothing_grids}</td>
              <td>{item.clothing_type}</td>
              <td>{item.raw_price}</td>
              <td>{item.sign}</td>
              <td>{item.discount_price}</td>
              <td>{item.status=='3'?'未取走':item.status=='4'?'已取走':'已撤单'}</td>
              <td>{item.collect_time}</td>
              <td>{item.collect_time}</td>
              <td>{item.deal_time}</td>
              <td>{item.grid_num}</td>
              <td>{item.addition_remark}</td>
              <td>{item.addition_price}</td>
              <td>{item.forecast}</td>
              <td>{item.work_number}</td>
              <td>{item.user_name}</td>
              <td>{item.card_number}</td>
              <td>{item.card_type}</td>
              <td>{item.address}</td>
              <td>{item.discount}</td>
          </tr>
        )
       return (             
            <Window title='衣物统计' onClose={this.props.closeView}>   
                      <div className="revokedata_data">
                         <div className="revokedata_dataLeft">
                            <div>开始日期：<input type="date"  value={this.state.startdate} onChange={e=>this.setState({startdate:e.target.value})}/></div>                           
                            <div>结束日期：<input type="date" value={this.state.enddate} onChange={e=>this.setState({enddate:e.target.value})}/></div>
                         </div>
                         <div className="revokedata_dataright">
                           {arr}
                         </div>
                         <div className="vipstats-detail"><input type="checkbox" style={{display:'none'}}/>明细</div>
                      </div>
                       <div className="clothall" >类别合计</div>
                        <table className="clothall-tab clothestat-tab">
                          <thead>
                              <tr>
                                  <th>衣物类别</th>
                                  <th>数量</th>
                              </tr>
                          </thead>
                          <tbody>
                              {list}
                          </tbody>
                        </table>  
                      
                      
                      <div className="revokedata_list revokedata_last clothestat-tab clothestat-tab">
                        <div>衣物明细<b>共有 <a>{this.state.allcount}</a> 条</b><span className="revokedata_prompt"></span></div>
                        <table className="clothestat-tab">
                               <thead>
                                   <tr>
                                       <th></th>
                                       <th>店员姓名</th>
                                       <th>客户电话</th>
                                       <th>流水号</th>                                      
                                       <th>衣物编码</th>
                                       <th>衣物名称</th>
                                       <th>衣物颜色</th>
                                       <th>衣物网格</th>
                                       <th>衣物类别</th>
                                       <th>价格</th>
                                       <th>品牌</th>
                                       <th>折后价</th>                                      
                                       <th>状态</th>                                       
                                       <th>时间</th>
                                       <th>交活定期</th>
                                       <th>交活日期</th>
                                       <th>衣挂号</th>                                      
                                       <th>工艺加价</th>
                                       <th>附加费</th>
                                       <th>洗后预估</th>
                                       <th>衣物件数</th>
                                       <th>客户姓名</th>
                                       <th>卡号</th>
                                       <th>卡类型</th>                                                                             
                                       <th>住址</th>
                                      
                                       <th>折扣率</th>
                                   </tr>                                  
                               </thead>
                               <tbody> 
                                 {indexlist}                                    
                               </tbody>
                           </table>                       
                      </div>
                      <Page current={this.state.page} total={this.state.count} fetch = {this.limit} callback={page=> this.query(page)}/>
             </Window> 
        );
    }
}