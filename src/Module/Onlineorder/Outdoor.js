/**
 * 已上门界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Page from '../../UI/Page'
import App from '../clothes/App'
import Nodata from '../../UI/nodata'

export default class extends Component {   
    constructor(props) {
        super(props); 
        this.outdoor = ['预约单号','下单时间','衣物名称','件数','合计','客户信息','操作'],
        this.state = {   
            nodatas:false,         
            outdoorlist:[],
            page:1,
            count:0,
            app:false,
            phone:'',
            id:'',
            name:'',
        };
        this.props.onRef(this);
        this.limit = 10;  
        this.query = this.query.bind(this);   
        this.outdoor_no = this.outdoor_no.bind(this); 
        this.take_clothes = this.take_clothes.bind(this);  
              
    };         
    // 显示已上门单列表  
    componentDidMount (){
        this.query() ;     
    }; 
    // 取消预约
    outdoor_no (e){
      var id = e.target.dataset.id;
      api.post('cancel_reservation',{
        token:'token'.getData(),
        oid:id
      }, (res,ver) => {  
        console.log('成功取消')        
        if (ver) {
            this.setState({outdoorlist:[]});
            this.componentDidMount();     
        }
      })
    }
    take_clothes (e){
        var id = e.target.dataset.id;
        var phone = e.target.dataset.phone;
        var name = e.target.dataset.name;
        console.log(id +'...'+phone+'...'+ name);
        this.setState({
            id:id,
            phone:phone,
            name:name,
        })
        this.setState({app:true})
    }
    // 网络请求
    query(page, value){
        value = value || '';
        page = page || this.state.page;
        let params= {
            token:'token'.getData(), 
            mid:'mid'.getData(),  
            page:this.state.page,
            limit:this.limit,
            value:value,                    
        }
        console.log(params)
        api.post('have_door',params, (res,ver) => {           
            if (ver && res) {
                console.log(res); 
                if(res.result.order.length>0){
                    this.setState({ 
                        count:res.result.count,                     
                        outdoorlist:res.result.order,
                        page:page,
                        nodatas:false
                    })
                    this.props.callParent(res.result.count);
                }else{
                    this.setState({
                        nodatas:true,
                        count:0,
                        outdoorlist:[],
                        page:1
                    })
                    this.props.callParent(res.result.count);
                    console.log('没有客户订单,敬请等待')
                }             
            }
        })
    }   
    render() {  
        var outdoor = this.outdoor.map((item,index) =><th key={'item'+index}>{item}</th>);       
        var outdoorlist = this.state.outdoorlist.map((item,index) =><tr key={'item'+index} >
            <td>{item.ordersn}</td>
            <td>{item.otime};订单来源:{item.is_online==0? '线下' : '线上' }</td>
            <td>{item.work.map((item,index)=> <span>{item.clothing_name}</span>)}</td>
            <td>{item.work.map((item,index) =><span>{item.work_number}</span>)}</td>
            <td>共{item.count}件,约<i>￥{item.total}</i></td>
            <td index={index}>客户姓名：{item.work[0].user_name}<br/>客户电话：{item.work[0].user_mobile}<br/> 地址：{item.work[0].address}</td>
            <td>
                <s data-id={item.id} onClick = {this.outdoor_no}>取消预约</s>
                <s data-id={item.id} onClick={this.take_clothes} data-phone={item.work[0].user_mobile} data-name={item.work[0].user_name}>收衣</s>
            </td>
        </tr>
        )    
        return (
        <div> 
            <div className="waiting">
                <table className="waiting-list">
                    <thead>
                    <tr>
                        {outdoor}
                    </tr>
                    </thead>
                    <tbody>   
                        {this.state.nodatas&&<Nodata />}                             
                        {outdoorlist}
                    </tbody>
                </table>
            </div>
            {
                this.state.app
                &&
                <App   id={this.state.id} phone={this.state.phone} name={this.state.name} closeView={() => this.setState({app:false})}/>
            }
            <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)}/>            
        </div>         
        )           
    };
}