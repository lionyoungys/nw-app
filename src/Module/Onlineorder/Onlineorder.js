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
        this.tab = ['待接单'+1,'待上门','已上门','待配送','已完成'];
        this.waiting = ['预约单号','下单时间','衣物名称','件数','合计','客户信息','操作']
        this.state = {
            checked:0,
            tab1:false,
            tab2:false,
            tab3:false,
            tab4:true,
            tab5:false,
        }
        
    };  
    componentDidMount(){
        this.input.focus();
    } 
    onChange (){
        this.input.focus();
    } 
    render() { 
        var waiting = this.waiting.map((item,index) =><th key={'item'+index}>{item}</th>)        
        return(
            <div>
                    <Window title='线上订单处理' onClose={this.props.closeView}>
                    <BlueTab tabs={this.tab} checked={this.state.checked} onChange={i => this.setState({checked:i})}>                        
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
                                        <button className="e-btn">配送</button>
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
                                        <button className="e-btn">配送</button>
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