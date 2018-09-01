/**
 * 待接单界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Page from '../../UI/Page'
import Nodata from '../../UI/nodata'

export default class extends Component {   
    constructor(props) {
        super(props); 
        this.waiting = ['预约单号','下单时间','衣物名称','件数','合计','客户信息','操作'],
        this.state = {  
              nodatas:false,    
              waitinglist:[],
              page:1,
              count:0,
              id:'',
              number:this.props.value
        }; 
        this.props.onRef(this);
        this.limit = 10;  
        this.query = this.query.bind(this);  
        this.take_waiting = this.take_waiting.bind(this); // 接单
        this.no_waiting = this.no_waiting.bind(this); // 取消预约        
    };         
    // 显示待接单列表  
    componentDidMount (){        
        this.query();
    };
    //网络请求     
    query(page, value) {
        console.log(page);
        value = value || '';
        page = page || this.state.page;
        let params= {
            token:'token'.getData(), 
            // mid:'mid'.getData(),  
            page: page, 
            limit: this.limit ,  
            value:value,                
        }
        console.log(params)
        api.post('pending_order',params, (res,ver) => { 
            console.log('result', res);         
            if (ver && res) {
                if(res.result.order.length>0){
                    this.setState({  
                        count:res.result.count,                     
                        waitinglist:res.result.order,
                        page:page,
                        nodatas:false,
                    })
                    this.props.callParent(res.result.count);
                }else{
                    this.setState({
                        nodatas:true,
                        count:0,
                        waitinglist:[],
                        page:1,                      
                    })
                    this.props.callParent(res.result.count);
                    console.log('没有客户订单,敬请等待')
                }             
            }
        })
    } 
    // 接单
    take_waiting (e){
        var id = e.target.dataset.id;        
        api.post('order_taking',{
            token:'token'.getData(),
            oid:id
        }, (res,ver) => {  
            console.log('成功接单')        
            if (ver && res) {
                this.setState({waitinglist:[]});
                this.componentDidMount();     
            }
        })               
    }
    // 取消预约
    no_waiting (e){
        var id = e.target.dataset.id;
        this.setState({id:id})
        let params={
            token:'token'.getData(),
            oid:id
        }
        console.log(params)
        api.post('cancel_reservation',params, (res,ver) => {  
            console.log(ver)         
            if (ver && res) {
                console.log('成功取消')
                this.setState({waitinglist:[]});
                this.componentDidMount();                     
            }
        })  
    }
    render() {  
        var waiting = this.waiting.map((item,index) =><th key={'item'+index}>{item}</th>);      
        var waitinglist = this.state.waitinglist.map((item,index) =><tr key={'item'+index}>
            <td>{item.ordersn}</td>
            <td>{item.otime};订单来源:{item.is_online==0? '线下' : '线上' }</td>
            <td>{
               item.work.map((item,index)=>
                <span>{item.clothing_name}</span>
                )
            }
            </td>
            <td>{
               item.work.map((item,index) =>
                 <span>{item.work_number}</span>
               )
            }
            </td>
            <td>共{item.count}件,约<i>￥{item.total}</i></td>
            <td>客户姓名：{item.work[0].user_name}<br/> 客户电话：{item.work[0].user_mobile}<br/> 地址：{item.work[0].address}</td>
            <td>
                <s data-id={item.id} onClick = {this.no_waiting} >取消预约</s>
                <s data-id={item.id} onClick = {this.take_waiting} >接单</s>
            </td>
        </tr>
        )    
        return ( 
        <div>    
            <div className="waiting">
                <table className="waiting-list">
                    <thead>
                    <tr>
                        {waiting}
                    </tr>
                    </thead>
                    <tbody>  
                        {this.state.nodatas&&<Nodata />}                             
                        {waitinglist}
                    </tbody>
                </table>
            </div>
            <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)}/>
        </div>            
        )           
    };
}