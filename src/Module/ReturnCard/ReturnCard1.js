/**
 * 充值界面
 * @author Edwin Young
 * 修改日志：6/29  更改接口数据处理，修改右下角布局（ranchong）
 */

import React from 'react';
import Window from '../../UI/Window';
import './ReturnCard.css';

const token = 'token'.getData();

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}                      
    }
    render() {
        return (
            <Window title='退卡' onClose={this.props.closeView} width='632' height='430'>
                <div className='recharge recharge-first'>
                    <div>
                        <label htmlFor='card_id' className='e-label'>卡号：</label>
                        <input id='card_id' className='e-input' type='text' value={this.state.number} onChange={e => this.setState({number:e.target.value})}/>&nbsp;
                        <button type='button' className='e-btn' data-query='1' >查询</button>&nbsp;
                        <button type='button' className='e-btn' >读卡</button>
                    </div>
                    <div><label className='e-label'>卡ID：</label></div>
                </div>
                <div className='recharge recharge-second return-div'>
                    <div>
                        <label className='e-label'>卡号：</label><div></div>
                        <label className='e-label'>&emsp;卡类型：</label><div></div>
                    </div>
                    <div>
                        <label className='e-label'>姓名：</label><div></div>
                        <label className='e-label'>&emsp;发卡店：</label><div></div>
                    </div>
                    <div>
                        <label className='e-label'>电话：</label><div></div>
                        <label className='e-label'>售卡日期：</label><div></div>
                    </div>
                    <div>
                        <label className='e-label'>性别：</label><div></div>
                        <label className='e-label'>&emsp;&emsp;积分：</label><div></div>
                    </div>
                    <div>
                        <label className='e-label'>生日：</label><div></div>
                        <label className='e-label'>&emsp;&emsp;地址：</label><div></div>
                    </div>                   
                </div>
                <div className='recharge recharge-third'>
                    <div>                       
                        <div><label className='e-label'>&emsp;&emsp;&emsp;赠送：</label>&yen;</div>
                        <div><label className='e-label'>&emsp;&emsp;新折扣：</label></div>
                        <div><label className='e-label' style={{color: '#ff0000', fontSize: '14px', fontWeight: 'bold',}}>&emsp;&emsp;&emsp;余额：&yen;</label></div>
                    </div> 
                    <div className="recharge-four" >
                        <span style={{color:'#063781', fontSize: '14px', fontWeight: 'bold',marginTop:'10px',display:'block'}} >退款金额：</span>
                        <input type="number" className="e-input" style={{marginTop:'10px'}}/>&emsp;&emsp;元
                        <button type='button' className='e-btn recharge-btn' style={{marginLeft:'10px'}}>退卡</button>
                    </div>                        
                </div> 
                          
            </Window>
        );
    }
}