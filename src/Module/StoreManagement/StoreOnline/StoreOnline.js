//网店

import React, {Component} from 'react';

export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state = {            
            Service:'', //    //服务范围         
            tstate:'',       //状态  
            Doorto:'', //上门服务费   
            Doortonumber:'',// 上门满减数量 
            Doortomoney:'' //上门满减金额   
        } 
        this.onlinesave = this.onlinesave.bind(this) ;
        this.on_start = this.on_start.bind(this);
    }
 
    componentDidMount() {
        api.post('online', {token:'token'.getData()}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({                                       
                    Service:res.result.mrange, //服务范围
                    tstate:res.result.mstatus, //状态 10-正常营业 11-休息中 12-未开通                   
                    Doorto:res.result.freight_price ,// 上门服务费
                    Doortonumber:res.result.freight_free_num , //上门满减数量
                    Doortomoney:res.result.freight_free_amount , // 上门满减金额
                })
            }
        })
    }
    //开始接单按钮
    on_start (defaultChecked){
       
    }
    // 提交修改
    onlinesave(){
        
        var parment = {
            mrange:this.state.Service,
            mstatus:this.state.tstate,
            freight_price:this.state.Doorto,
            freight_free_num:this.state.Doortonumber,
            freight_free_amount:this.state.Doortomoney, 
        }
        console.log(parment)
        api.post('modOnline', {
                token:'token'.getData(),
                parment,
            }, (res, ver) => {
                    if (ver && res) {
                        tool.ui.success({callback:(close, event) => {
                            console.log(res)
                        }}); 
                    }else{
                        console.log(parment)
                    }
                }
        );
    }
    render(){
        return  (          
            <div className='store_management_content_onlineStore'>
                <p className='store_management_content_title'>网店设置：</p>
                <div className='store_management_content_onlineStore_no_open' style={{display:this.state.tstate==12?'block':'none'}}>
                    <img width='177px' height='111'></img>
                    <p>您还没有开通网店</p>                   
                </div>
                <div className='store_management_content_onlineStore_open' style={{display:this.state.tstate==12?'none':'block'}}>
                    <div>
                        &emsp;接单状态：&emsp;
                        <input type="radio" name="take_order"  defaultChecked={this.state.tstate==10?"true":false} onClick={this.on_start}/> 开始接单&emsp;<input type="radio" name="take_order" defaultChecked={this.state.tstate=='11'?"true":"false"}/> 停止接单
                    </div>
                    <div>&emsp;服务范围：&emsp;<input type='text' className='e-input' value={this.state.Service} onChange={e=>this.setState({Service:e.target.value})}/><a>km</a></div>
                    <div>上门服务费：&emsp;<input type='text' className='e-input' value={this.state.Doorto} onChange={e=>this.setState({Doorto:e.target.value})}/><a>元</a></div>
                    <div>&emsp;满减件数：&emsp;<input type='text' className='e-input' value={this.state.Doortonumber} onChange={e=>this.setState({Doortonumber:e.target.value})}/><a>件</a></div>
                    <div>&emsp;满减金额：&emsp;<input type='text' className='e-input' value={this.state.Doortomoney} onChange={e=>this.setState({Doortomoney:e.target.value})}/><a>元</a></div>
                    <button className='e-btn' onClick={this.onlinesave}>保存</button>
                </div>
            </div>
        );
    }
}