/**
 * 会员业务统计
 * @author wangjun
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            startdate:tool.date('Y-m-d'),
            enddate:tool.date('Y-m-d'),
    }
    };
    render() {
        
        return (
            <Window title='会员业务统计'  onClose={this.props.closeView}>
            <div>      
                     <div className="revokedata_data">
                         <div className="revokedata_dataLeft">
                            <div>开始时间：<input type="date" value = {this.state.startdate} onChange={e => this.setState({startdate:e.target.value})}/></div>                           
                            <div>结束时间：<input type="date" value = {this.state.enddate} onChange={e => this.setState({enddate:e.target.value})}/></div>
                         </div>
                         <div className="revokedata_dataLeft">
                            <div>姓名：<input type="text" value = {this.state.startdate} onChange={e => this.setState({startdate:e.target.value})}/></div>                           
                            <div>手机：<input type="text" value = {this.state.enddate} onChange={e => this.setState({enddate:e.target.value})}/></div>
                            <div>卡号：<input type="text" value = {this.state.enddate} onChange={e => this.setState({enddate:e.target.value})}/></div>
                        
                         </div>
                         <div className="revokedata_dataright">
                         </div>
                         <div className="revokedata_list">
                        <div>撤单合计</div>
                        <ul className="revokedata_list_box">
                            <li id="revokedata_list_box_li">
                                <span></span>
                                <span>合计</span>
                                <span>衣物合计</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span>435435</span>
                                <span>4324324</span>
                            </li>
                        </ul>
                      </div>
                      <div className="revokedata_list revokedata_last">
                        <div>撤单明细<b>共记录 <a>fsdf</a> 条</b><span className="revokedata_prompt"></span></div>
                        <ul className="revokedata_list_box">
                            <li id="revokedata_list_box_li">
                                <span></span>
                                4324234
                            </li>
                        
                            <li>
                              4324234
                            </li>
                        </ul>
                      </div>
                         </div>


            </div>
            </Window>
        );
    }
}