/**
 * 解除挂失页面
 * @author  fanyerong
 */
import React, { Component } from 'react';
import '../ReportLossMain/ReportLossMain.css';
import './Solutiontohang.css'
import Window from '../../UI/Window';
import {Table} from '../../UI/Table';
import LayerBox from '../../Ui/LayerBox';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {judge:true}
        this.losecard = this.losecard.bind(this);      
    }; 
    losecard() {
        api.post('removeLossCard', {token:'token'.getData(),id:'56756'}, (res, ver) => {
            if (ver && res) {
                console.log(res);
                this.setState({judge:false})
            }else{
                this.setState({judge:true})
                console.log(res)
            }
        }
        );
    }     
    render() {
        return (
            <Window title='解除挂失( 仅实体店卡 )' onClose={this.props.closeView} width='632' height='337'>           
                <div className='reportloss'>
                        <div className='cardnumber'>卡编号：1254879652 <b>(已挂失)</b></div>
                        <div className='border'>
                            <div className='recharge recharge-second'>
                                    <div>
                                        <label className='e-label'>卡号：</label><div>12548585422</div>
                                        <label className='e-label'>&emsp;卡类型：</label><div>普通卡</div>
                                    </div>
                                    <div>
                                        <label className='e-label'>姓名：</label><div>范叶荣</div>
                                        <label className='e-label'>&emsp;折扣率：</label><div>50%</div>
                                    </div>
                                    <div>
                                        <label className='e-label'>电话：</label><div>13546079987</div>
                                        <label className='e-label'>发卡店：</label><div>大望路洗衣店</div>
                                    </div>
                                    <div>
                                        <label className='e-label'>性别：</label><div>男</div>
                                        <label className='e-label'>售卡日期：</label><div>2015-12-25</div>
                                    </div>
                                    <div>
                                        <label className='e-label'>生日：</label><div>1996-05-02</div>
                                        <label className='e-label'>&emsp;&emsp;积分：</label><div>215</div>
                                    </div>
                                    <div>
                                        <label className='e-label'>地址：</label><div>大望路</div>
                                        <label className='e-label'>&emsp;&emsp;余额：</label><div>￥254852.00</div>
                                    </div>
                            </div>
                            <div className="card-detail">
                               <button className="e-btn" onClick = {this.losecard()}>读卡</button>
                            </div>
                            <div className='button'>                            
                                <button type='button' className='e-btn' onClick={this.props.closeView}>取消</button>&nbsp;&nbsp;
                                <button type='button' className='e-btn' readOnly = {this.state.judge}>解除挂失</button>
                            </div>
                        </div>
                    </div>        
            </Window>            
        );
    }
}