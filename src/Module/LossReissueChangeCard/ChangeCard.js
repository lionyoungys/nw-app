/**
 * 换卡详情页面
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import '../Hangon/Hangon.css'
import './LossReissueChangePublic.css'
const token = 'token'.getData();
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={ 
            types:[],
            index:0,
            id:this.props.data.id
         }
        this.success=this.success.bind(this);
    };
    componentDidMount() {
        api.post('cardType', {
            token:token,
            limit:200
        }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({cards:res.result.cardsType, types:res.result.cardsType.typeArray('card_type')});
            }else{
                handle();
            } 
        });
    }
    success(){
        let params={
            token:token,
            id:this.state.id,
            recharge_number:this.state.recharge_number,
            card_name:this.state.cards[this.state.index].card_type,
            discount:this.state.cards[this.state.index].discount
        }
        console.log(params)
        api.post('repairCards',params, (res, ver,handle) => {
            if (ver && res) {
                console.log(res)
                this.props.refresh();
                this.props.onClose();
            }else{
                handle();
            }
        });
    }
    render() {
        var arr = ['发卡店', '发卡店ID', '卡类型', '卡号', '卡ID', '姓名', '手机号', '折扣率', '余额'].map((item, index) => <span key={index} >{item}</span>);
        var count = [this.props.data.mname, this.props.data.mid, this.props.data.card_name, this.props.data.recharge_number, this.props.data.id, this.props.data.user_name, this.props.data.user_mobile, this.props.data.discount+'%', this.props.data.balance].map((item, index) => <span key={index} >{item}</span>);
        return (
            <Window title='换卡' onClose={this.props.onClose} width='567' height='382'>
                <p className='loss-rep-title'>原卡信息</p>
                <div className="Hangon-left loss-rep-left">
                    <div className="Hangon-left-title">
                        {arr}
                    </div>
                    <div className="Hangon-left-count">
                        {count}
                    </div>
                </div>
                <div className="loss-rep-right">
                    <p>注意：补换卡业务仅支持实体卡、IC卡</p>
                    <a><b>*</b>卡类型</a>
                    <Select option={this.state.types} 
                     onChange={value => this.setState({index:value.inObjArray(this.state.cards, 'card_type')})} />
                    <a><b>*</b>新卡号</a>
                    <input type="text" className='e-input loss-rep-input' onChange={e=>this.setState({recharge_number:e.target.value})}/>
                    <div className='loss-rep-right-btn'>
                        <span>制卡费：¥{this.state.type[this.state.index].made_price}</span>
                        <button className="e-btn" onClick={this.success}>确定</button>
                    </div>
                </div>
            </Window>

        );
    }
}