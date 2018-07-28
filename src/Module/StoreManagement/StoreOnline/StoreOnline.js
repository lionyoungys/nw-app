import React, {Component} from 'react';
export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state={
            freight_price:'',
            mrange:'',
            mstatus:'',//状态
            freight_free_num:'', //免费件数
            freight_amout:'', //免费金额
        }  
    }

    componentDidMount() {
        api.post('online', {token:'token'.getData()}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({
                    freight_price:res.result.freight_price,
                    mrange:res.result.mrange,
                    mstatus:res.result.mstatus,
                    freight_free_num:res.result.freight_free_num,
                    freight_amout:res.result.freight_free_amount,
                }
            );
         }
         else{
            console.log(res.msg);
            tool.ui.error({msg:res.msg,callback:(close) => {
                close();
            }});
            
        }
        }
        );
      
           
    }
    onlinesave(){
        api.post('modOnline', {token:'token'.getData(),
        mstatus:this.state.mstatus,
        freight_price:this.state.freight_price,
        mrange:this.state.state.mrange,
        freight_free_num:this.state.freight_free_num,
        freight_free_amount:this.state.freight_amout,
        }, (res, ver) => {
            if (ver && res) {
                console.log(res)
              
         }
        }
        );
    }
    render(){
        return  (          
            <div className='store_management_content_onlineStore'>
            <p className='store_management_content_title'>网店设置</p>
            <div className='store_management_content_onlineStore_no_open' style={{display:this.state.mstatus=='12'?'true':'none'}}>
                <img width='177px' height='111'></img>
                <p>您还没有开通网店</p>
            </div>
            <div className='store_management_content_onlineStore_open' style={{display:'true'}}>
                <div>
                    &emsp;接单状态：&emsp;
                    <input type="radio" name="take_order"  defaultChecked={this.state.mstatus=='10'?"true":false}/> 开始接单&emsp;<input type="radio" name="take_order" defaultChecked={this.state.mstatus=='11'?"true":"false"}/> 停止接单
                </div>
                <div>&emsp;服务范围：&emsp;<input type='text' className='e-input' value={this.state.mrange} onChange = {e =>this.setState({mrange:e.target.value})}/><a>km</a></div>
                <div>上门服务费：&emsp;<input type='text' className='e-input' value={this.state.freight_price} onChange = {e =>this.setState({freight_price:e.target.value})}/><a>元</a></div>
                <div>&emsp;满减件数：&emsp;<input type='text' className='e-input' value={this.state.freight_free_num} onChange = {e =>this.setState({freight_free_num:e.target.value})}/><a>件</a></div>
                <div>&emsp;满减金额：&emsp;<input type='text' className='e-input' value={this.state.freight_amout} onChange = {e =>this.setState({freight_amout:e.target.value})}/><a>元</a></div>
                <button className='e-btn' onClick={this.onlinesave}>保存</button>
            </div>
            </div>

        );
    }
}