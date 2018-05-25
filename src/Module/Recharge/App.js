/**
 * 充值界面
 * @author Edwin Young
 */

import React from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import './App.css';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {card_id:''}
    }

    render() {
        return (
            <Window title='充值' onClose={this.props.closeView} width='632' height='430'>
                <div className='recharge recharge-first'>
                    <div>
                        <label htmlFor='card_id' className='e-label'>卡号：</label>
                        <input id='card_id' className='e-input' type='text' value={this.state.card_id} onChange={e => this.setState({card_id:e.target.value})}/>&nbsp;
                        <button type='button' className='e-btn'>查询</button>&nbsp;
                        <button type='button' className='e-btn'>读卡</button>
                    </div>
                    <div><label className='e-label'>卡编号：</label>11874572954745</div>
                </div>
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
                <div className='recharge recharge-third'>
                    <div>
                        <div><label className='e-label'>充值卡类型：</label><Select option={['手机号','用户名','密码']} selected='密码' onChange={value => console.log(value)}/></div>
                        <div><label className='e-label'>&emsp;&emsp;&emsp;充值：</label>&yen;100.00</div>
                        <div><label className='e-label'>&emsp;&emsp;&emsp;赠送：</label>&yen;100.00</div>
                        <div><label className='e-label'>&emsp;&emsp;新折扣：</label>90%</div>
                    </div>
                    <div>
                        <div style={{color:'#ff0000',marginBottom:'22px',fontSize:'14px',fontWeight:'bold'}}>应收：&yen;120.00</div>
                        <button type='button' className='e-btn'>收银</button>
                    </div>
                </div>
            </Window>
        );
    }
}