/**
 * 待上门界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Page from '../../UI/Page'
import Nodata from '../../UI/nodata'

export default class extends Component {   
    constructor(props) {
        super(props); 
        this.door = ['预约单号','下单时间','衣物名称','件数','合计','客户信息','操作'],
        this.state = {            
              doorlist:[],
              page:1,
              count:0,
              id:'',
              checked:this.props.checked,
              value:this.props.number,
              nodatas:false,
        }; 
        this.props.onRef(this);
        this.limit = 10;  
        this.query = this.query.bind(this);  
        this.no_door = this.no_door.bind(this);  
        this.come_door = this.come_door.bind(this);            
    };         
    // 显示待上门单列表  
    componentDidMount (){        
        this.query();
    }; 
    come_door (e){      
        var id = e.target.dataset.id;        
        api.post('come',{
            token:'token'.getData(),
            oid:id
        }, (res,ver) => {  
            console.log('已上门')        
            if (ver) {
                this.setState({doorlist:[],count:0,page:1});
                this.componentDidMount();     
            }
        })  

    }
    // 网络请求
    query(page, value){
        console.log(this.state.checked,page)
        value = value || '';
        page = page || this.state.page;
        let params= {
            token:'token'.getData(), 
            mid:'mid'.getData(),
            page:page,
            limit:this.limit, 
            value:value,             
        }
        console.log(params)
        api.post('come_door',params, (res,ver) => {           
            if (ver && res) {
                console.log(res); 
                if(res.result.order.length>0){
                    this.setState({  
                        count:res.result.count,                    
                        doorlist:res.result.order,
                        page:page,
                        nodatas:false,

                    })
                    this.props.callParent(res.result.count);
                }else{
                    this.setState({
                        nodatas:true,
                        count:0,  
                        doorlist:[],  
                        page:1,
                        
                    })
                    this.props.callParent(res.result.count);
                    console.log('没有客户订单,敬请等待')
                }             
            }
        })
    } 
    // 取消预约
    no_door (e){
        var id = e.target.dataset.id; 
        console.log(id)       
        api.post('cancel_reservation',
          {
            token:'token'.getData(),
            oid:id,
          },
        (res,ver) => {  
            console.log(ver)         
            if (ver && res) {
                console.log('成功取消')
                this.setState({doorlist:[]});
                this.componentDidMount();                     
            }
        })
    } 
    render() {  
        var door = this.door.map((item,index) =><th key={'item'+index}>{item}</th>);       
        var doorlist = this.state.doorlist.map((item,index) =><tr key={'item'+index}>
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
            <td index={index}>客户姓名：{item.work[0].user_name}<br/>客户电话：{item.work[0].user_mobile}<br/>地址：{item.work[0].address}</td>
            <td>
                <s data-id={item.id} onClick = {this.no_door}>取消预约</s>
                <s data-id={item.id} onClick = {this.come_door}>已上门</s>
            </td>
        </tr>
        )    
        return (
        <div> 
            <div className="waiting">
                <table className="waiting-list">
                    <thead>
                    <tr>
                        {door}
                    </tr>
                    </thead>
                    <tbody> 
                        {this.state.nodatas&&<Nodata />}                              
                        {doorlist}
                    </tbody>
                </table>
            </div> 
            <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)}/>
        </div>        
        )           
    };
}