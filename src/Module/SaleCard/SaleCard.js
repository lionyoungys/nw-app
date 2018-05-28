/**
 * 售卡
 * @author wangjun
 */
import React, {Component} from 'react';
import './SaleCard.css'
import Window from '../../UI/Window';

export default class extends Component {   
    constructor(props) {
        super(props);           
    }; 
    render() {      
        return ( 
               <Window title='售卡' onClose={this.props.closeView} width='512' height='440'>  
                    <div className='salecard'>
                    <div className='top'>
                        <div>
                        <span>卡类型:</span><input/>
                        </div>
                        <div>
                        <span>卡号:</span><input/><label>卡号为空时，仅创建电子卡</label>
                        </div>

                    </div>
                    <div className='middle'>
                    <div>
                        <span className='salecard_leftdirection'>
                        <span>姓名:</span>
                        <input type='text' className='inputborder'/>
                        </span>
                        <span className='salecard_rightdirection'>
                        <span>密码1次:</span><input type='text' className='inputborder'/>
                         </span>
                     </div>
                    <div>
                        <span className='salecard_leftdirection'>
                        <span>手机号:</span><input type='text' className='inputborder'/>
                        </span>
                         <span className='salecard_rightdirection'>
                        <span>密码2次:</span><input type='text' className='inputborder'/>
                    </span>
                    </div>
                <div>
                     <span className='salecard_leftdirection'>
                    <span>性别:</span><input type='text' className='inputselectborder'/>
                    </span>
                 <span className='salecard_rightdirection'>
                    <span>生日:</span><input type='text' className='inputselectborder'/>
                </span>
                </div>
            <div>
            <span className='salecard_leftdirection'>
            <span>地址:</span><input type='text' className='inputborder'/>
            </span>
            </div>
                    </div>
                    <div className='bottom'>
                    <div>
                    <span>充值:</span><label>34234234324</label>
                    </div>
                    <div>
                    <span>赠送:</span><label>34234234324</label>
                    </div>
                    <div>
                        <span>折扣率:</span><label>34234234324</label>
                    </div>
                    <div>
                        <span>制卡费:</span><label>34234234324</label>
                    </div>
                        <span className='textred'>应收合计：￥323</span>
                        <button type='button' className='e-btn'>收银</button>
                    </div>
                    </div>
                   
               </Window>
        )
    }
}