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
                        <span>卡号:</span><input/>
                        </div>

                    </div>
                    <div className='middle'>
                    <div>
                        <span>姓名:</span><input/>
                        </div>
                        <div>
                        <span>手机号:</span><input/>
                        </div>
                    </div>
                    <div className='bottom'>
                    <div>
                    <span>充值:</span><span></span>
                    </div>
                    <div>
                    <span>赠送:</span><span></span>
                    </div>
                    <div>
                        <span>折扣率</span><span></span>
                    </div>
                    <div>
                        <span>制卡费:</span><span></span>
                    </div>
                    </div>
                    </div>
                   
               </Window>
        )
    }
}