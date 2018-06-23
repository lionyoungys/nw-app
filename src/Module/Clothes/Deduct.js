/**
 * 卡扣款组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';

const token = 'token'.getData();
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cid:this.props.cid || '',
            number:this.props.number || '',
            name:this.props.name || '', 
            phone:this.props.phone || '',
            balance:this.props.balance || '',
            value:'',
            amount:'',
            cause:'',
        };
        this.loadingHandle = null;
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.M1Read = this.M1Read.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;
        !isNaN(value) && this.setState({amount:value});
    }
    handleClick() {
        if ('' == this.state.number && '' == this.state.cid) return tool.ui.error({msg:'此用户不是会员',callback:close => close()});
        if ('' == this.state.amount || this.state.amount < 0) return tool.ui.error({msg:'扣款金额不能为空',callback:close => close()});
        console.log({token:token,id:this.state.cid,recharge_number:this.state.number,money:this.state.amount});
        api.post(
            'deduct', 
            {token:token,id:this.state.cid,recharge_number:this.state.number,money:this.state.amount}, 
            (res, ver, handle) => {
                if (!ver) return handle();
                'function' === typeof this.props.callback && this.props.callback(this.state);
            }
        );
    }
    M1Read() {
        EventApi.M1Read({
            callback:(res) => {
                this.setState({
                    number:res.recharge_number,
                    cid:res.id,
                    phone:res.user_mobile,
                    name:res.user_name,
                    balance:res.balance
                });
            }
        });
    }

    render() {
        return (
            <Window title='编辑衣物信息' height='420' width='533' onClose={this.props.onClose}>
                <div className='clothes-deduct-top'>
                    <div style={{marginBottom:'10px'}}>请客户打开微信公众号【速洗达洗衣平台】，出示付款码</div>
                    <input 
                        type='text' 
                        className='e-input' 
                        style={{width:'267px',marginRight:'16px'}} 
                        value={this.state.value} 
                        onChange={e => this.setState({value:e.target.value})}
                    />
                    <button type='button' className='e-btn' style={{marginRight:'43px'}}>查询</button>
                    <button type='button' className='e-btn' onClick={this.M1Read}>读卡</button>
                </div>
                <div className='clothes-deduct-body'>
                    <div><span>姓名：</span>{this.state.name}</div>
                    <div><span>手机：</span>{this.state.phone}</div>
                    <div><span>余额：</span>{this.state.balance}</div>
                    <div>
                        <span>扣款额：</span>
                        <input type='text' className='e-input' value={this.state.amount} onChange={this.handleChange}/>&nbsp;&nbsp;元
                    </div>
                    <div>
                        <span>扣款原因：</span>
                        <textarea value={this.state.cause} onChange={e => this.setState({cause:e.target.value})}></textarea>
                    </div>
                    <div style={{textAlign:'right',marginRight:'17px',display:'block'}}>
                        <button type='button' className='e-btn' onClick={this.handleClick}>确认</button>
                    </div>
                </div>
            </Window>
        );
    }
}