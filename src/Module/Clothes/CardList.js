/**
 * 品牌列表组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';

export default class extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        let index = e.target.dataset.index || e.target.parentNode.dataset.index;
        'function' === typeof this.props.callback && this.props.callback(this.props.data[index]);
    }

    render() {
        let data = tool.isArray(this.props.data) ? this.props.data : []
        ,   html = data.map((obj, index) => 
                <div key={'index_' + index} data-index={index} style={{padding:'0 16px', height:'30px', lineHeight:'30px',cursor:'default'}} onClick={this.handleClick}>
                    <span style={{width:'200px', display:'inline-block'}}>卡号：{obj.recharge_number}</span>
                    <span style={{width:'100px', display:'inline-block'}}>卡类型：{obj.card_name}</span>
                    <span style={{width:'100px', display:'inline-block'}}>余额：{obj.balance}</span>
                    <span style={{width:'100px', display:'inline-block'}}>折扣率：{obj.discount}%</span>
                </div>
            );
        return (
            <Window title='会员卡选择' width='632' height='420' onClose={this.props.onClose}><div style={{height:'384px',overflow:'auto'}}>{html}</div></Window>
        );
    }
}