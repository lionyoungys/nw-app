/**
 * 线上订单处理
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Tab, {BlueTab} from '../../UI/Tab';
import Page from '../../UI/Page';
import Waitinglist from './Waitinglist';  //待接单
import Door from './Door';  // 待上门
import Outdoor from './Outdoor';  // 已上门
import Forshipping from './Forshipping';  //待配送
import Overorder from './Overorder';  //已完成
import './Onlineorder.css';

export default class extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.tab = ['待接单','待上门','已上门','待配送','已完成'],
        this.view = [<Waitinglist />, <Door />,<Outdoor/>,<Forshipping/>,<Overorder/>]
        this.state = {
            tabindex:0,           
            checked:0,                                 
        }        
    }; 
    // 刷新 获取input光标  
    componentDidMount (){
        this.input.focus();      
    };     
    // 切换tab 显示内容
    onChange (i){
        console.log(i);
        this.input.focus();
        this.setState({
            checked:i,
            tabindex:i,
        });               
    };
    render() {        
        return(
            <div>
                <Window title='线上订单处理' onClose={this.props.closeView}>
                    <BlueTab tabs={this.tab} checked={this.state.checked} onChange={(i) => this.onChange(i)}>                        
                        <input type="text" className="findonline" placeholder="订单号,流水号,姓名,卡号,手机号" ref={input =>this.input = input}/><button className="e-btn">查询</button>                       
                    </BlueTab> 
                    {this.view[this.state.tabindex]}
                </Window>
            </div>
        )
    }
}