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
                console.log(res);
                if(res.result.mstatus==12){
                    this.setState({tstate:11})
                }else{
                   this.setState({tstate:res.result.mstatus}) //状态 10-正常营业 11-休息中 12-未开通  
                }
                this.setState({                                       
                    Service:res.result.mrange, //服务范围                                     
                    Doorto:res.result.freight_price ,// 上门服务费
                    Doortonumber:res.result.freight_free_num , //上门满减数量
                    Doortomoney:res.result.freight_free_amount , // 上门满减金额
                })
            }
        })
    }

    //开始接单按钮
    on_start (e){
        if (e.target.value != this.state.tstate) {
            '11' == this.state.tstate ? this.setState({tstate: '10'}) : this.setState({tstate: '11'});
        }
    }

    // 提交修改
    onlinesave(){   
           
        var parment = {
            token:'token'.getData(),
            mrange:this.state.Service,
            mstatus:this.state.tstate,
            freight_price:this.state.Doorto,
            freight_free_num:this.state.Doortonumber,
            freight_free_amount:this.state.Doortomoney, 
        }
        console.log(parment);
        api.post('modOnline', parment, (res, ver) => {
                    if (ver && res) {
                        tool.ui.success({callback:(close, event) => {
                            close()
                        }}); 
                    }else{
                        tool.ui.error({title:'提示',msg:'请选择至少选择修改一项，或者直接关闭',button:'确定',callback:(close, event) => {
                            close();
                        }});
                    }
                }
        );
    }
    render(){
        return  (          
            <div className='store_management_content_onlineStore'>
                                
                <div className='store_management_content_onlineStore_open'>
                    <div>
                        &emsp;接单状态：&emsp;
                        <input type="radio" name="take_order" value='10' checked={this.state.tstate==10?true:false} onClick={this.on_start}/> 开始接单&emsp;<input type="radio" name="take_order" onClick={this.on_start} checked={this.state.tstate=='11'?true:false} value='11'/> 停止接单
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