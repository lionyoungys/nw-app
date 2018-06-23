import React, {Component} from 'react';
export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state={
            freight_price:'',
            mrange:'',
            mstatus:'',
        }  
    }

    componentDidMount() {
        api.post('online', {token:'token'.getData()}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({freight_price:res.result.freight_price,
                    mrange:res.result.mrange,
                    mstatus:res.result.mstatus
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
        freight_price:this.state.freight_price,
        mrange:this.state.mrange
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
                    <input type="radio" name="take_order"  /> 开始接单&emsp;<input type="radio" name="take_order"  /> 停止接单
                </div>
                <div>&emsp;服务范围：&emsp;<input type='text' className='e-input' value={this.state.mrange}/><a>km</a></div>
                <div>上门服务费：&emsp;<input type='text' className='e-input' value={this.state.freight_price}/><a>元</a></div>
                <button className='e-btn' onClick={this.onlinesave}>保存</button>
            </div>
            </div>

        );
    }
}