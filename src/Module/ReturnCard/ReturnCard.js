/**
 * 退卡界面
 * @author wangjun 
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import ReturnCard from './ReturnCard.css'
import Select from '../../UI/Select';

export default class extends Component {   
    constructor(props) {
        super(props);           
    }; 
    render() {
        return (
 <Window title='退卡' onClose={this.props.closeView} width='632' height='356'>
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
                     <div className='refundbutton'>
                          <button type='button' className='e-btn'>读卡</button>
                          <div className='refundinput'>
                             <div >
                                <label className='e-label'>退款金额：</label><input type='text' className='e-input'/>
                             </div>
                             <div>
                               <label className='e-label'>退款方式：</label><Select option={['现金','微信','支付宝']} selected='密码' onChange={value => console.log(value)}/>
                             </div>
                          </div>
                          <button type='button' className='e-btn' readOnly>退卡</button>
                     </div>
                  
                    
                     </div>
                     </div>
                    </Window>

       );
    }
}