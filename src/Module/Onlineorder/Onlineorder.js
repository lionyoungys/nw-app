/**
 * 线上订单处理
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Tab, {BlueTab} from '../../UI/Tab';
import Page from '../../UI/Page';
import './Onlineorder.css'

export default class extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.tab = ['待接单','待上门','已上门','待配送','已完成'],
        this.waiting = ['预约单号','下单时间','衣物名称','件数','合计','客户信息','操作'],
        this.forshipping = ['订单号','衣物编码','衣物名称','颜色','瑕疵','工艺加价','衣挂号','客户信息','操作'],
        this.state = {
            waitinglist:[],
            checked:0,           
            tab1:true,
            tab2:false,
            tab3:false,
            tab4:false,
            tab5:false,
            waitingcount:'',
            
        }        
    };
    // 显示待接单列表  
    componentDidMount (){
        this.input.focus();
        let params= {
            token:'token'.getData(), 
            mid:'mid'.getData(),                     
        }
        console.log(params)
        api.post('pending_order',params, (res,ver) => {           
            if (ver && res) {
                console.log(res); 
                if(res.result.count>0){
                    this.setState({
                        waitingcount:res.result.count,
                        waitinglist:res.result.order,
                    })
                }else{
                      console.log('没有客户订单,敬请等待')
                }             
            }
        })
    }; 
    // 切换tab 显示内容
    onChange (i){
        console.log(i)
        this.setState({checked:i})
        this.input.focus();
        var index = i;
        if(i==1){
            alert(1)
        }
    };
    render() { 
        var waiting = this.waiting.map((item,index) =><th key={'item'+index}>{item}</th>);
        var forshipping = this.forshipping.map((item,index) =><th key={'item'+index}>{item}</th>) 
        var waitinglist = this.state.waitinglist.map((item,index) =><tr key={'item'+index}>
            <td><span>{item.ordersn}</span></td>
            <td><span>{item.otime};订单来源:{item.is_online==0? '线下' : '线上' }</span></td>
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
            <td><span>共{item.count}件,约<i>￥{item.total}</i></span></td>
            <td index={index}><span>客户姓名：{item.work[0].user_name}; 客户电话：{item.work[0].user_mobile}; 地址：{item.work[0].address}</span></td>
            <td>
                <button className="e-btn">取消预约</button>
                <button className="e-btn">接单</button>
            </td>
        </tr>
        ) 
        return(
            <div>
                    <Window title='线上订单处理' onClose={this.props.closeView}>
                    <BlueTab tabs={this.tab} checked={this.state.checked} onChange={(i) => this.onChange(i)}>                        
                        <input type="text" className="findonline" placeholder="订单号,流水号,姓名,卡号,手机号" ref={input =>this.input = input}/><button className="e-btn">查询</button>
                        
                    </BlueTab> 
                    {/* 待接单  */}
                    {
                        this.state.tab1&&
                        <div className="waiting">
                        <table className="waiting-list">
                            <thead>
                               <tr>
                                   {waiting}
                               </tr>
                            </thead>
                            <tbody>                               
                                {waitinglist}
                            </tbody>
                        </table>
                    </div>                       
                    }                   
                    {/* 待上门 */}
                    {this.state.tab2&&<div className="waiting">
                        <table className="waiting-list">
                            <thead>
                               <tr>
                                   {waiting}
                               </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span>183109639321234</span>
                                    </td>
                                    <td>
                                        <span>2018-7-28 12:42:25 订单来源:微信</span>
                                    </td>
                                    <td>
                                        <span>裤子</span>
                                        <span>袜子</span>
                                        <span>褂子</span>
                                        <span>鞋</span>
                                    </td>
                                    <td>
                                        <span>2件</span>
                                        <span>2件</span>
                                        <span>2件</span>
                                        <span>2件</span>
                                    </td>
                                    <td><span>共10件约<i>￥52.02</i></span></td>
                                    <td><span>姓名:张先生 手机号:18310963932 地址:万达广场3号楼1902</span></td>
                                    <td>
                                        <button className="e-btn">取消预约</button>
                                        <button className="e-btn">已上门</button>
                                    </td>
                                </tr> 
                                <tr>
                                    <td>
                                        <span>183109639321234</span>
                                    </td>
                                    <td>
                                        <span>2018-7-28 12:42:25 订单来源:微信</span>
                                    </td>
                                    <td>
                                        <span>裤子</span>                                       
                                    </td>
                                    <td>
                                        <span>2件</span>                                      
                                    </td>
                                    <td><span>共10件约<i>￥52.02</i></span></td>
                                    <td><span>姓名:张先生 手机号:18310963932 地址:万达广场3号楼1902</span></td>
                                    <td>
                                        <button className="e-btn">取消预约</button>
                                        <button className="e-btn">已上门</button>
                                    </td>
                                </tr>                              
                            </tbody>
                        </table>
                    </div>
                    }
                    
                    {/* 已经上门 */}
                    {
                        this.state.tab3
                        &&
                        <div className="waiting">
                        <table className="waiting-list">
                            <thead>
                               <tr>
                                   {waiting}
                               </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span>183109639321234</span>
                                    </td>
                                    <td>
                                        <span>2018-7-28 12:42:25 订单来源:微信</span>
                                    </td>
                                    <td>
                                        <span>裤子</span>
                                        <span>袜子</span>
                                        <span>褂子</span>
                                        <span>鞋</span>
                                    </td>
                                    <td>
                                        <span>2件</span>
                                        <span>2件</span>
                                        <span>2件</span>
                                        <span>2件</span>
                                    </td>
                                    <td><span>共10件约<i>￥52.02</i></span></td>
                                    <td><span>姓名:张先生 手机号:18310963932 地址:万达广场3号楼1902</span></td>
                                    <td>
                                        <button className="e-btn">取消预约</button>
                                        <button className="e-btn">收衣</button>
                                    </td>
                                </tr> 
                                <tr>
                                    <td>
                                        <span>183109639321234</span>
                                    </td>
                                    <td>
                                        <span>2018-7-28 12:42:25 订单来源:微信</span>
                                    </td>
                                    <td>
                                        <span>裤子</span>                                       
                                    </td>
                                    <td>
                                        <span>2件</span>                                      
                                    </td>
                                    <td><span>共10件约<i>￥52.02</i></span></td>
                                    <td><span>姓名:张先生 手机号:18310963932 地址:万达广场3号楼1902</span></td>
                                    <td>
                                        <button className="e-btn">取消预约</button>
                                        <button className="e-btn">收衣</button>
                                    </td>
                                </tr>                              
                            </tbody>
                        </table>
                    </div>
                    }
                    {/* 待配送 */}
                    {
                        this.state.tab4
                        &&
                        <div className="waiting">
                        <table className="waiting-list" id="forshipping">
                            <thead>
                               <tr>
                                   {forshipping}
                               </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span>1831096393212345</span>
                                    </td>
                                    <td>
                                        <span>1831096393212345</span>
                                        <span>1831096393212345</span>
                                        <span>1831096393212345</span>
                                        <span>1831096393212345</span>                                       
                                    </td>
                                    <td>
                                        <span>半袖</span>
                                        <span>裤子</span>
                                        <span>帽子</span>
                                        <span>袜子</span>
                                    </td>
                                    <td>
                                        <span>蓝色</span>
                                        <span>绿色</span>
                                        <span>红色</span>
                                        <span>黄色</span>
                                    </td>
                                    <td>
                                        <span>污渍</span>
                                        <span>黄渍</span>
                                        <span>抽丝</span>
                                        <span>发黄</span>
                                    </td>
                                    <td>
                                        <span>缝补</span>
                                        <span>上色</span>
                                        <span>布线</span>
                                        <span>清洗</span>
                                    </td>
                                    <td>
                                        <span>A#25</span>
                                        <span>B#258</span>
                                        <span>H#22</span>
                                        <span>G#14</span>
                                    </td>
                                    <td>
                                        <span>姓名:范叶荣  手机:18310963932  地址:大望路万达广场3号楼1902</span>                                       
                                    </td>
                                    <td>
                                        <span>订单状态</span> 
                                        <b>配送</b>                                      
                                    </td>
                                </tr>                         
                            </tbody>
                        </table>
                    </div>
                    }
                    {/* 已经完成 */}
                    {
                        this.state.tab5
                        &&
                        <div className="waiting">
                        <table className="waiting-list">
                            <thead>
                               <tr>
                                   {waiting}
                               </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span>183109639321234</span>
                                    </td>
                                    <td>
                                        <span>2018-7-28 12:42:25 订单来源:微信</span>
                                    </td>
                                    <td>
                                        <span>裤子</span>
                                        <span>袜子</span>
                                        <span>褂子</span>
                                        <span>鞋</span>
                                    </td>
                                    <td>
                                        <span>2件</span>
                                        <span>2件</span>
                                        <span>2件</span>
                                        <span>2件</span>
                                    </td>
                                    <td><span>共10件约<i>￥52.02</i></span></td>
                                    <td><span>姓名:张先生 手机号:18310963932 地址:万达广场3号楼1902</span></td>
                                    <td>
                                        <button className="e-btn">取消预约</button>
                                        <button className="e-btn">接单</button>
                                    </td>
                                </tr> 
                                <tr>
                                    <td>
                                        <span>183109639321234</span>
                                    </td>
                                    <td>
                                        <span>2018-7-28 12:42:25 订单来源:微信</span>
                                    </td>
                                    <td>
                                        <span>裤子</span>                                       
                                    </td>
                                    <td>
                                        <span>2件</span>                                      
                                    </td>
                                    <td><span>共10件约<i>￥52.02</i></span></td>
                                    <td><span>姓名:张先生 手机号:18310963932 地址:万达广场3号楼1902</span></td>
                                    <td>
                                        <button className="e-btn">取消预约</button>
                                        <button className="e-btn">接单</button>
                                    </td>
                                </tr>                              
                            </tbody>
                        </table>
                    </div>
                    }
                    <Page   />
                    </Window>
            </div>
        )
    }
}