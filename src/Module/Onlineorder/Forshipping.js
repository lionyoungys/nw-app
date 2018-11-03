/**
 * 待配送界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Page from '../../UI/Page';
import Nodata from '../../UI/nodata'

export default class extends Component {   
    constructor(props) {
        super(props); 
        this.forshipping = ['订单号','衣物编码','衣物名称','颜色','瑕疵','工艺加价','衣挂号','客户信息','操作'],
        this.state = { 
            nodatas:false,           
            forshippinglist:[],
            page:1,
            count:0,
            id:'',
        }; 
        this.props.onRef(this);
        this.limit = 10;  
        this.query = this.query.bind(this); 
        this.take_forshipping = this.take_forshipping.bind(this);            
    };         
    // 显示待配送列表  
    componentDidMount (){
        this.query();
        console.log(this.state.forshippinglist)
    };   
    query(page, value) {
        value = value || '';
        page = page || this.state.page;
        let params= {
            oid:this.state.id,
            token:'token'.getData(), 
            mid:'mid'.getData(),
            page:page,
            limit:this.limit,
            value:value,                    
        }
        console.log(params)
        api.post('pending_distribution',params, (res,ver) => {           
            if (ver && res) {
                console.log(res); 
                if(res.result.order.length>0){
                    this.setState({   
                        count:res.result.count,                   
                        forshippinglist:res.result.order,
                        page:page,
                        nodatas:false,
                    })
                    this.props.callParent(res.result.count);
                }else{
                    this.setState({
                        nodatas:true,
                        count:0,
                        forshippinglist:[],
                        page:1
                    })
                    this.props.callParent(res.result.count);
                    console.log('没有要配送的订单,敬请等待')
                }             
            }
        })    
    }

    // 配送
    take_forshipping (e){
        var id = e.target.dataset.id;
        this.setState({id:id})
        tool.ui.error({title:'提示',msg:'配送操作不可返回，是否确认提交',button:'确定',callback:(close, event) => {
            console.log(event)
            if(event=='click'){
            api.post('dispatching', {
            token:'token'.getData(),
            oid:this.state.id,
            }, (res, ver) => {
                if (ver) {
                    tool.ui.success({callback:(close, event) => {
                        close();
                    }}); 
                }else{
                    console.log(res.msg);
                    if(res.code==1000){
                        tool.ui.error({msg:'该订单可能存在别的操作，暂时无法配送',callback:(close) => {
                            close();
                        }}); 
                    }else{
                        tool.ui.error({msg:res.msg,callback:(close) => {
                            close();
                        }});
                    }                                     
                }
                    close();              
                    this.query();
                }
            );
         }else{
             close();
         }
        }});       
    }
    render() {  
        var forshipping = this.forshipping.map((item,index) =><th key={'item'+index}>{item}</th>) 
        var forshippinglist = this.state.forshippinglist.map((item,index) =><tr>
          <td>{item.ordersn}</td>
          <td>{item.work.map((item,index) =><span>{item.clothing_number}</span>)}</td>
          <td>{item.work.map((item,index) =><span>{item.clothing_name}</span>)}</td>
          <td>{item.work.map((item,index) =><span>{item.clothing_color}</span>)}</td>
          <td>{item.work.map((item,index) =><span>{item.remark}</span>)}</td>
          <td>{item.work.map((item,index) =><span>{item.addition_remark}</span>)}</td>
          <td>{item.work.map((item,index) =><span>{item.grid_num}</span>)}</td>
          <td index={index}>客户姓名：{item.user_name}<br/> 客户电话：{item.user_mobile}<br/> 地址：{item.address}</td>
          <td><span>订单状态:</span>{item.ostatus}<b data-id={item.id} onClick={this.take_forshipping}>配送</b></td> 
        </tr>
        )
        return ( 
        <div className="online-div">
            <div className="waiting" id="forshipping1">
              <table className="waiting-list" id="forshipping">
                <thead>
                   <tr>
                       {forshipping}
                   </tr>
                </thead>
                <tbody>
                    {this.state.nodatas&&<Nodata />} 
                    {forshippinglist}                       
                </tbody>
            </table>
        </div> 
        <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)}/>
       </div>
        )           
    };
}









