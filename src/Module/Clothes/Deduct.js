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
        'function' === typeof this.props.callback
        &&
        this.props.callback(this.state);
    }
    M1Read() {
        tool.ui.loading(handle => this.loadingHandle = handle);
        let card = M1Reader.get();
        if (card.error) {
            this.loadingHandle();
            return tool.ui.error({msg:'读卡失败',callback:close => close()});
        }
        if (card.empty) {
            this.loadingHandle();
            return tool.ui.error({msg:'卡片数据为空',callback:close => close()});
        }
        this.loadingHandle();
        if (card.hasUpdate) {    //会员卡已更新为本平台的卡
            api.post('cardDetail', {token:token,id:card.cid}, (res, ver, handle) => {
                if (ver) {
                    //api对接
                    this.setState({
                        number:card.sn,
                        cid:card.cid,
                        phone:res.result.user_mobile,
                        name:res.result.user_name,
                        balance:res.result.balance
                    });
                } else {
                    handle();
                }
            });
        } else {
            this.setState({
                phone:card.phone,
                name:card.name,
                number:card.sn,
                balance:parseFloat(card.balance),
            });
        }
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