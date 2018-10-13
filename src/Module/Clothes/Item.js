/**
 * 衣物列表组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Dish from '../../UI/Dish';

export default class extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        'function' === typeof this.props.callback && this.props.callback(e.target.dataset.index || e.target.parentNode.dataset.index);
    }

    render() {
        if ('undefined' === typeof this.props.data || !(this.props.data instanceof Array)) return null;
        let html = this.props.data.map((obj, index) =>
            <div key={obj.id} data-index={index} onClick={this.handleClick}>
                <div>{obj.item_name}</div><div>{obj.dispose_type}</div><div>{obj.materials}</div><div>{obj.grade}</div><div>{obj.item_cycle}</div><div>{obj.item_off_price}</div>
            </div>
        );
        return (
            <Dish title='编辑衣物信息' height='454' width='648' onClose={this.props.onClose}>
                <div className='clothes-editor-top'>
                    <span>价格</span>
                    <button type='button' className='e-btn' onClick={this.props.onCancel}>取消</button>
                </div>
                <div className='clothes-item-body'>
                    <div className='clothes-item-header'>
                        <div>名称</div><div>处理类别</div><div>材料</div><div>档次</div><div>交活天数</div><div>价格</div>
                    </div>
                    <div className='clothes-items'>{html}</div>
                </div>
            </Dish>
        );
    }
}