/**
 * 售卡
 * @author wangjun
 */
import React, {Component} from 'react';
import './SaleCard.css'
import Window from '../../UI/Window';
import Select from '../../UI/Select';

export default class extends Component {   
    constructor(props) {
        super(props);     
    this.state={'cardtype':[],'cardnumber':'',name:'',passwd1:'',mobilephone:'',passwd2:''};    
    this.cashier=this.cashier.bind(this)  
    }; 
    componentDidMount() {
        api.post('cardType', {token:'token'.getData()}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({cardtype:res.result.typeArray('card_type')});
            }
        }
        );
    }
    cashier(){

    }
    render() {      
        return ( 
               <Window title='售卡' onClose={this.props.closeView} width='512' height='440'>  
                    <div className='salecard'>
                    <div className='top'>
                        <div>
                        <span>卡类型:</span>&nbsp;&nbsp;<Select option={this.state.cardtype}  onChange={value => console.log(value)}/>
                        </div>
                        <div>
                        <span>卡号:</span><input value={this.state.cardnumber} onChange={e => this.setState({cardnumber:e.target.value})}/><label>卡号为空时，仅创建电子卡</label>
                        </div>

                    </div>
                    <div className='middle'>
                    <div>
                        <span className='salecard_leftdirection'>
                        <span>姓名:</span>
                        <input type='text' className='inputborder' onChange={e => this.setState({name:e.target.value})}/>
                        </span>
                        <span className='salecard_rightdirection' onChange={e => this.setState({passwd1:e.target.value})}>
                        <span>密码1次:</span><input type='text' className='inputborder'/>
                         </span>
                     </div>
                    <div>
                        <span className='salecard_leftdirection'>
                        <span>手机号:</span><input type='text' className='inputborder' onChange={e => this.setState({mobilephone:e.target.value})}/>
                        </span>
                         <span className='salecard_rightdirection'>
                        <span>密码2次:</span><input type='text' className='inputborder' onChange={e => this.setState({passwd2:e.target.value})}/>
                    </span>
                    </div>
                <div>
                     <span className='salecard_leftdirection'>
                    <span>性别:</span><input type='text' className='inputselectborder'/>
                    </span>
                 <span className='salecard_rightdirection'>
                    <span>生日:</span><input type='date' className='inputselectborder'/>
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
                        <button type='button' className='e-btn' onClick={this.cashier}>收银</button>
                    </div>
                    </div>
                   
               </Window>
        )
    }
}