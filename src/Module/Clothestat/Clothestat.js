/**
 * 衣物统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Page from '../../UI/Page';
import './Clothestat.css';
import Table from '../../UI/Table';
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
    componentDidMount() {
        
        this.query();
    }

    query(page) {
        page = page || this.state.page;
        let pram = {
            token: 'token'.getData(),
            start_time: this.state.startdate,
            end_time: this.state.enddate,
            page: page || this.state.page,
            limit: this.limit,
        };
        // console.log(page, pram);
        api.post('clothestate', pram, (res, ver, handle) => {
             console.log(res);
            if (ver && res) {
                
                this.setState({
                    list: res.result.list,
                    page:page,
                    allist:res.result.type,
                    allcount:res.result.total_count,
                    total_amount: res.result.total_amount, 
                    count: res.result.count,                   
                });  
            } else {
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
               <div className="Succession_data">
                   <div className="Succession_dataLeft managerquery_dataLeft">
                            <div>开始日期：<input type="date" className='e-date' value={this.state.startdate} onChange={e=>this.setState({startdate:e.target.value})}/></div>                           
                            <div>结束日期：<input type="date" className='e-date' value={this.state.enddate} onChange={e=>this.setState({enddate:e.target.value})}/></div>
                            <div className="clothestat_dataright">
                               {arr}
                           </div> 
                         </div>
                        
                      </div>
               <div className='man-que-tab clo-tab'>
                   <div className='man-que-tab-one clo-sta-tab-one'> 
                       <div class="Takeclothes-div-title operating-detail clo-title">衣物合计</div>
                        <Table>
                          <thead>
                              <tr>
                                  <th>衣物名称</th>
                                  <th>数量</th>
                              </tr>
                          </thead>
                          <tbody>
                              {list}
                          </tbody>
                       </Table>  
                    </div>
                   <div className='man-que-tab-two clo-sta-tab-two'>
                       <div class="Takeclothes-div-title operating-detail clo-title">衣物明细 共有<b>{this.state.allcount}</b>条</div>
                       <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>店员姓名</th>
                                    <th>客户电话</th>
                                    <th>流水号/订单号</th>                                      
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
                       </Table>                       
                    </div>
                    <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)} />
                </div>
             </Window> 
        );
    }
}