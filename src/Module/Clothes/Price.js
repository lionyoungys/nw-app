/**
 * 工艺加价列表组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {value:'', checked:[]};    //checked:[{id:string,name:string,discount:bool}]
        this.handleClick = this.handleClick.bind(this);
        this.handleChecked = this.handleChecked.bind(this);    //项目选中事件处理
        this.handleDiscount = this.handleDiscount.bind(this);    //打折处理
    }

    handleClick() {
        '' !== this.state.value
        &&
        'function' === typeof this.props.callback
        &&
        this.props.callback(this.state.value);
    }
    handleChecked(e) {
        let data = e.target.parentNode.parentNode.dataset
        ,   id = data.id
        ,   name = data.name
        ,   index = id.inObjArray(this.state.checked, 'id');
        if (-1 === index) {
            this.state.checked.push({id:id, name:name, discount:false});
        } else {
            this.state.checked.splice(index, 1);
        }
        this.setState({checked:this.state.checked});
    }

    handleDiscount(e) {
        let id = e.target.parentNode.parentNode.dataset.id
        ,   index = id.inObjArray(this.state.checked, 'id');
        if (-1 !== index) {
            this.state.checked[index].discount = !this.state.checked[index].discount;
            this.setState({checked:this.state.checked});
        }
    }


    render() {
        if ('undefined' === typeof this.props.data || !(this.props.data instanceof Array)) return null;
        let html = this.props.data.map(obj => {
            let index = obj.id.inObjArray(this.state.checked, 'id')
            ,   hasChecked = (-1 !== index);
            return (
                <div className='clothes-price' key={obj.id} data-id={obj.id} data-name={obj.name}>
                    <div>
                        <input 
                            type='checkbox' 
                            className='e-checkbox' 
                            checked={hasChecked ? 'checked' : ''} 
                            onClick={this.handleChecked}
                        />&nbsp;{obj.name}
                    </div>
                    <div><input type='text' className='e-input'/>&nbsp;元</div>
                    <div>
                        <input
                            type='checkbox' 
                            className='e-checkbox' 
                            checked={hasChecked && this.state.checked[index].discount ? 'checked' : ''}
                            onClick={this.handleDiscount}
                        />&nbsp;允许打折
                    </div>
                </div>
            );
        });
        return (
            <Window title='工艺加价' height='360' width='436' onClose={this.props.onClose}>
                <div className='clothes-price-main'>{html}</div>
                <div className='clothes-price-bottom'>
                    <button type='button' className='e-btn' onClick={this.props.onClose}>取消</button>
                    &nbsp;&nbsp;
                    <button type='button' className='e-btn' onClick={this.handleClick}>确认</button>
                </div>
            </Window>
        );
    }
}