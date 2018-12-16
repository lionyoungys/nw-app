/**
 * 已上门界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Page from '../../UI/Page'
import Nodata from '../../UI/nodata'
import Table from '../../UI/Table';

export default class extends Component {   
    constructor(props) {
        super(props); 
        this.overorder = ['预约单号','下单时间','衣物名称','件数','合计','客户信息','操作'],
        this.state = { 
            nodatas:false,           
            overorderlist:[],
            page:1,
            count:0,
        };  
        this.props.onRef(this);
        this.limit = 15;  
        this.query = this.query.bind(this);             
    };         
    // 显示订单完成列表  
    componentDidMount (){       
        this.query();
    };  
    // 网络请求
    query(page, value){
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
        api.post('off_thestocks',params, (res,ver) => {           
            if (ver && res) {
                console.log(res); 
                if(res.result.order.length>0){
                    this.setState({  
                        count:res.result.count,                    
                        overorderlist:res.result.order,
                        page:page,
                        nodatas:false

                    })
                    this.props.callParent(res.result.count);
                }else{
                    this.setState({
                        nodatas:true,
                        count:0,
                        overorderlist:[],
                        page:1
                    })
                    this.props.callParent(res.result.count);
                    console.log('没有客户订单,敬请等待')
                }             
            }
        })
    }  
    render() {  
        var overorder = this.overorder.map((item,index) =><th key={'item'+index}>{item}</th>);       
        var overorderlist = this.state.overorderlist.map((item,index) =><tr key={'item'+index}>
            <td>{item.ordersn}</td>
            <td>{item.otime};订单来源:<i>{item.is_online==0? '线下' : '线上' }</i></td>
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
            <td>共{item.count}件,约<i>￥{item.total}元</i></td>
            <td index={index}>客户姓名：{item.user_name}<br/>客户电话：{item.user_mobile}<br/>地址：{item.address}</td>
            <td>                              
                <s>已完成</s>
            </td>
        </tr>
        )    
        return ( 
        <div className="online-div">
            <div className="waiting">
                <Table >
                    <thead>
                    <tr>
                        {overorder}
                    </tr>
                    </thead>
                    <tbody> 
                        {this.state.nodatas&&<Nodata />}                               
                        {overorderlist}
                    </tbody>
                    </Table>
                    <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)} />
            </div>
           
        </div>         
        )           
    };
}