/**
 * 填写客户信息组件
 * @author Edwin Young
 */
import React from 'react';
import Window from '../../UI/Window';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addr:'string' === typeof this.props.addr ? this.props.addr : '', 
            phone:'string' === typeof this.props.phone ? this.props.phone : '', 
            name:'string' === typeof this.props.name ? this.props.name : '',
            number:'string' === typeof this.props.number ? this.props.number : '',
            balance:0, discount:'',type:'',
            data:[]
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.query = this.query.bind(this);
        this.setUser = this.setUser.bind(this);
    }

    componentDidMount() {
        tool.KeyCode.listen(this.numberInput, value => {
            let obj = {number:value};
            this.setState(obj);
            this.query(obj);
        });
    }

    handleChange(e) {
        let key = e.target.dataset.key
        ,   obj = {[key]:e.target.value};
        this.setState(obj);
        if ('undefined' === typeof obj.addr && '' !== obj[key]) this.query(obj);
    }

    query(obj) {
        obj.number = obj.number || this.state.number;
        obj.name = obj.name || this.state.name;
        obj.phone = obj.phone || this.state.phone
        if ('' === obj.number && '' === obj.phone && '' === obj.name) return;
        api.post(
            'readCard', 
            {token:'token'.getData(), cardNumber:obj.number, user_name:obj.name, user_mobile:obj.phone}, 
            (res, ver) => {
                if (ver) {
                    this.setState({data:res.result});
                }
            }
        );
    }

    handleClick() {
        if ('' == this.state.phone) return tool.ui.warn({msg:'手机不能为空', callback:close => close()});
        if ('' == this.state.name) return tool.ui.warn({msg:'姓名不能为空', callback:close => close()});
        let data = this.state;
        delete data.data;
        'function' === typeof this.props.callback && this.props.callback(data);
    }

    setUser(e) {
        let index = e.target.dataset.index || e.target.parentNode.dataset.index
        ,   data = this.state.data[index];
        this.setState({
            name:data.user_name || '', 
            number:data.card_number || '', 
            phone:data.user_mobile || '', 
            addr:data.address || '', 
            balance:data.balance || 0,
            discount:data.discount || '',
            type:data.card_name || ''
        });
    }
    render() {
        let html = this.state.data.map((obj, index) => 
            <div key={obj.id} data-index={index} onClick={this.setUser}>
                <div>{obj.id}</div>
                <div>{obj.user_name}</div>
                <div>{obj.user_mobile}</div>
                <div>{obj.card_number}</div>
                <div>{obj.balance}</div><div>消费金额</div>
                <div>{obj.address}</div>
            </div>
        );
        return (
            <Window title='填写客户信息' height='532' width='782' onClose={this.props.onClose}>
                <div className='clothes-user-top'>
                    <div>
                        <div>
                            <span><i>*</i>&nbsp;手机：</span>
                            <input
                                type='text'
                                className='e-input'
                                value={this.state.phone}
                                data-key='phone'
                                onChange={this.handleChange}
                            />
                            <span><i>*</i>&nbsp;姓名：</span>
                            <input
                                type='text'
                                className='e-input'
                                value={this.state.name}
                                data-key='name'
                                onChange={this.handleChange}
                            />
                            <span>卡号：</span>
                            <input
                                type='text'
                                className='e-input'
                                value={this.state.number}
                                style={{marginRight:'0'}}
                                ref={input => this.numberInput = input}
                            />
                        </div>
                        <div>
                            <span>地址：</span>
                            <input type='text' className='e-input' style={{width:'549px'}} value={this.state.addr} data-key='addr' onChange={this.handleChange}/>
                        </div>
                    </div>
                    <button type='button' className='e-btn' onClick={this.handleClick}>确定</button>
                </div>
                <div className='clothes-user-main'>
                    <div><div>用户ID</div><div>姓名</div><div>手机</div><div>卡号</div><div>余额</div><div>消费金额</div><div>地址</div></div>
                    <div className='clothes-user-main-body'>{html}</div>
                </div>
            </Window>
        );
    }
}