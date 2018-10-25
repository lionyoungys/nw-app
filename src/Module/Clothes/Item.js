/**
 * 衣物列表组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Dish from '../../UI/Dish';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {value:''};
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(e) {
        'function' === typeof this.props.callback && this.props.callback(e.target.dataset.index || e.target.parentNode.dataset.index);
    }

    handleChange(e) {this.setState({value:e.target.value})}

    render() {
        if ('undefined' === typeof this.props.data || !(this.props.data instanceof Array)) return null;
        let html = this.props.data.map((obj, index) => {
            if (
                '' == this.state.value 
                || 
                -1 !== obj.item_name.indexOf(this.state.value)
            ) {
                return (
                    <div key={obj.id} data-index={index} onClick={this.handleClick}>
                        <div>{obj.item_name}</div>
                        <div>{obj.dispose_type}</div>
                        <div>{obj.materials}</div>
                        <div>{obj.grade}</div>
                        <div>{obj.item_cycle}</div>
                        <div>{obj.item_off_price}</div>
                    </div>
                );
            }
        });
        return (
            <Dish title='编辑衣物信息' onClose={this.props.onClose} height='435'>
                <div className='clothes-cate-top' style={{marginBottom:'20px'}}>
                    <span>价格</span>
                    <input type='text' placeholder='助记码/名称' className='e-input' value={this.state.value} onChange={this.handleChange}/>
                </div>
                <div className='clothes-item-body'>
                    <div className='clothes-item-header'>
                        <div>名称</div><div>处理类别</div><div>材料</div><div>档次</div><div>交活天数</div><div>价格</div>
                    </div>
                    <div className='clothes-items'>{html}</div>
                </div>
                <div style={{textAlign:'right',margin:'20px 15px 0 0'}}><button type='button' className='e-btn-b' onClick={this.props.onCancel}>返回</button></div>
            </Dish>
        );
    }
}