/**
 * 待配送界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Page from '../../UI/Page';

export default class extends Component {   
    constructor(props) {
        super(props); 
        this.forshipping = ['订单号','衣物编码','衣物名称','颜色','瑕疵','工艺加价','衣挂号','客户信息','操作'],
        this.state = {            
            forshippinglist:[],
            page:1,
            count:0,
        }; 
        this.limit = 10;  
        this.query = this.query.bind(this);             
    };         
    // 显示待配送列表  
    componentDidMount (){
        this.query();
        console.log(this.state.forshippinglist)
    };   
    query(page) {
        page = page || this.state.page;
        let params= {
            token:'token'.getData(), 
            mid:'mid'.getData(),
            page:this.state.page,
            limit:this.limit                     
        }
        console.log(params)
        api.post('pending_distribution',params, (res,ver) => {           
            if (ver && res) {
                console.log(res); 
                if(res.result.count>0){
                    this.setState({   
                        count:res.result.count,                   
                        forshippinglist:res.result.order,
                        page:page
                    })
                }else{
                    console.log('没有要配送的订单,敬请等待')
                }             
            }
        })    
    }
    render() {  
        var forshipping = this.forshipping.map((item,index) =><th key={'item'+index}>{item}</th>) 
        var forshippinglist = this.state.forshippinglist.map((item,index) =><tr>
          <td><span>{item.ordersn}</span></td>
          <td>{item.work.map((item,index) =><span>{item.clothing_number}</span>)}</td>
          <td>{item.work.map((item,index) =><span>{item.clothing_name}</span>)}</td>
          <td>{item.work.map((item,index) =><span>{item.clothing_color}</span>)}</td>
          <td>{item.work.map((item,index) =><span>{item.remark}</span>)}</td>
          <td>{item.work.map((item,index) =><span>{item.addition_remark}</span>)}</td>
          <td>{item.work.map((item,index) =><span>{item.grid_num}</span>)}</td>
          <td index={index}><span>客户姓名：{item.work[0].user_name}<br/> 客户电话：{item.work[0].user_mobile}<br/> 地址：{item.work[0].address}</span></td>
          <td><span>订单状态</span><b>配送</b></td> 
        </tr>
        )
        return ( 
        <div>

            <div className="waiting">
              <table className="waiting-list" id="forshipping">
                <thead>
                   <tr>
                       {forshipping}
                   </tr>
                </thead>
                <tbody>
                    {forshippinglist}                       
                </tbody>
            </table>
        </div> 
        <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)}/>
       </div>
        )           
    };
}









