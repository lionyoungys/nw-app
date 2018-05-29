/**
 * 挂失主页面
 * @author  ranchong
 */
import React, { Component } from 'react';
import './ReportLossMain.css';
import Window from '../../UI/Window';
import {Table} from '../../UI/Table';
import LayerBox from '../../Ui/LayerBox';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {show:false}
    };
    render() {
        return (

            <Window title='挂失（仅实体卡）' onClose={this.props.closeView}>
                <div className="report_loss_main_date">
                    <div className="report_loss_main_date_left">
                        <div>卡号：<input type="text" /></div>
                        <div>姓名：<input type="text" /></div>
                        <div>手机号：<input type="text" /></div>
                    </div>
                    <button type='button' className='e-btn '>查询</button>
                </div>

                {/* 表格部分 欠费衣物信息*/}
                <p className='report_loss_main_result_title'>已找到<a>145</a>条结果</p>
                <table className='report_loss_main_table'>
                    <thead>
                        <tr>
                            <td></td>
                            <td>卡号</td>
                            <td>姓名</td>
                            <td>手机号</td>
                            <td>卡类型</td>
                            <td>余额</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td onClick={() => this.setState({show:true})}>挂失</td>
                <Table border={true} full={true}/>
                {
                    this.state.show
                    &&
                   
                    <Window title='挂失-卡信息详情' onClose={() => this.setState({show:false})} width='632' height='337'>
                        {
                    <div className='reportloss'>
                    <div className='cardnumber'>卡编号：423432423423 </div>
                    <div className='border'>
                    <div className='recharge recharge-second'>
                         <div>
                             <label className='e-label'>卡号：</label><div>11874572954745</div>
                             <label className='e-label'>&emsp;卡类型：</label><div>金卡</div>
                         </div>
                         <div>
                             <label className='e-label'>姓名：</label><div>王小胖</div>
                             <label className='e-label'>&emsp;折扣率：</label><div>90%</div>
                         </div>
                         <div>
                             <label className='e-label'>电话：</label><div>15011540794</div>
                             <label className='e-label'>&emsp;发卡店：</label><div>施奈尔大望路店</div>
                         </div>
                         <div>
                             <label className='e-label'>性别：</label><div>女</div>
                             <label className='e-label'>售卡日期：</label><div>2018年5月19日</div>
                         </div>
                         <div>
                             <label className='e-label'>生日：</label><div>1996-11-12</div>
                             <label className='e-label'>&emsp;&emsp;积分：</label><div>2144</div>
                         </div>
                         <div>
                             <label className='e-label'>地址：</label><div>大望路万达广场3号楼1902室</div>
                             <label className='e-label'>&emsp;&emsp;余额：</label><div>&yen;300.00</div>
                         </div>
                     </div>
                     <div className='button'>
                     <button type='button' className='e-btn'>取消</button>&nbsp;&nbsp;
                     <button type='button' className='e-btn'>挂失</button>
                     </div>
                     </div>
                 </div>
                    }
                     
                    </Window>
                   
                }
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>挂失</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>挂失</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>挂失</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>挂失</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>挂失</td>
                        </tr>
                    </tbody>
                </table>
            </Window>
        );
    }
}