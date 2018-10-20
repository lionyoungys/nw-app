import React, {Component} from 'react';
export default class extends Component {   
    constructor(props) {
        super(props);   
        this.state = {
            id:'',
            mname:'',
            phone_number:'',
            province:'',
            city:'',
            mstatus:'',
            maddress:'',
            info:'',
        }  
        this.storesave = this.storesave.bind(this);
    }
    componentDidMount() {
        api.post('merchantInfo', {token:'token'.getData()}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({
                    id:res.result.id,
                    mname:res.result.mname,
                    phone_number:res.result.phone_number,
                    province:res.result.province,
                    city:res.result.city,
                    mstatus:res.result.mstatus,
                    maddress:res.result.maddress
                });
        
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
    storesave(){
        api.post('modInfo', {
            token:'token'.getData(),
            phone_number:this.state.phone_number,
            mdesc:this.state.info
        },(res, ver) => {
            if (ver && res) {
                console.log(res)
                tool.ui.success({callback:(close, event) => {
                    close();
                }}); 
            }else{
                console.log(res.msg);
                tool.ui.error({msg:res.msg,callback:(close) => {
                    close();
                }});
            }
        }); 
    }
    render(){
        return  (
        // {/* 基本信息 */}
        <div className='store_management_content_baseInfo store_management_content_selected'>                
                <div>门店编号：&emsp;<a>{this.state.id}</a></div>
                <div>网店状态：&emsp;<a>{this.state.mstatus=='12'?'未开通':this.state.mstatus=='11'?'休息中':'正常营业'}</a></div>
                <div>门店名称：&emsp;<span className='store_management_disable_span'>{this.state.mname}</span></div>
                <div>
                    所在区域：&emsp;
                    <span className='store_management_select_span'>
                        <i></i>{this.state.province}
                    </span>
                    <span className='store_management_select_span'>
                        <i></i>{this.state.city}
                    </span>
                </div>
                <div>详细地址：&emsp;<span className='store_management_disable_span'>{this.state.maddress}</span></div>
                <div>服务热线：&emsp;<input type='text' className='e-input store_management_able_input' value={this.state.phone_number} onChange={e => this.setState({phone_number:e.target.value})}/></div>
                <div className="store-detail"><span>店铺说明：</span>&emsp;<textarea className="e-input in-fo" value={this.state.info} onChange={e=>{this.setState({info:e.target.value})}}></textarea></div>
                <button className='e-btn'  onClick={this.storesave}>保存</button>
        </div> 
        );
    }
}