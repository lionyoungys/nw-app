/**
 * 工艺加价列表组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Dish from '../../UI/Dish';


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {show:false, tempIndex:null};
        this.editor = this.editor.bind(this);
        this.callback = this.callback.bind(this);
    }

    editor(e) {
        this.setState({show:true, tempIndex:e.target.parentNode.dataset.index});
    }
    callback(checked) {
        let len = checked.length
        ,   remark = ''
        ,   disPrice = 0
        ,   price = 0;
        for (let i = 0;i < len;++i) {
            if ('' == checked[i].value || checked[i].value <= 0) continue;
            if (checked[i].discount) {
                disPrice = disPrice.add(checked[i].value);
            } else {
                price = price.add(checked[i].value);
            }
            remark += checked[i].name + checked[i].value + '元;';
        }
        this.props.callback({index:this.state.tempIndex, remark:remark, disPrice:disPrice, price:price, json:JSON.stringify(checked)});
        this.setState({show:false});
    }

    render() {
        let html = this.props.data.map((obj, index) => {
            return (
                <div
                    key={'data' + index}
                    data-index={index}
                    style={(this.props.currentIndex != index && obj.parent != this.props.data[this.props.currentIndex].DATATAG) ? {display:'none'} : null}
                >
                    <div>{obj.clothing_number}</div>
                    <div>{obj.addition_remark}</div>
                    <div onClick={this.editor}>编辑</div>
                </div>
            );
        });
        return (
            <Dish title='编辑衣物信息' width='648' height='452' onClose={this.props.onClose}>
                <div className='clothes-editor-top'><span>工艺加价</span></div>
                <div className='clothes-price-data'>
                    <div><div>衣物编码</div><div>工艺加价</div><div>操作</div></div>
                    {html}
                </div>
                {
                    this.state.show 
                    && 
                    <Layer json={this.props.data[this.state.tempIndex].json} price={this.props.price} onClose={() => this.setState({show:false})} callback={this.callback}/>
                }
            </Dish>
        );
    }
}


class Layer extends Component {
    constructor(props) {
        super(props);
        var arr = [];
        if (this.props.json) {
            try {
                arr = JSON.parse(this.props.json);
            } catch (e) {}
        }
        this.state = {checked:arr};    //checked:[{id:string,name:string,value:string,discount:bool}]
        this.handleClick = this.handleClick.bind(this);
        this.handleChecked = this.handleChecked.bind(this);    //项目选中事件处理
        this.handleDiscount = this.handleDiscount.bind(this);    //打折处理
        this.handleChange = this.handleChange.bind(this);    //加价金额处理
    }

    handleClick() {
        'function' === typeof this.props.callback && this.props.callback(this.state.checked);
    }
    handleChecked(e) {
        let data = e.target.parentNode.parentNode.dataset
        ,   id = data.id
        ,   name = data.name
        ,   index = id.inObjArray(this.state.checked, 'id');
        if (-1 === index) {
            this.state.checked.push({id:id, name:name, value:'', discount:false});
        } else {
            this.state.checked.splice(index, 1);
        }
        this.setState({checked:this.state.checked});
    }

    handleChange(e) {
        let index = e.target.parentNode.parentNode.dataset.id.inObjArray(this.state.checked, 'id')
        ,   value = e.target.value;
        if (-1 !== index && !isNaN(value)) {
            this.state.checked[index].value = value;
            this.setState({checked:this.state.checked});
        }
    }

    handleDiscount(e) {
        let index = e.target.parentNode.parentNode.dataset.id.inObjArray(this.state.checked, 'id');
        if (-1 !== index) {
            this.state.checked[index].discount = !this.state.checked[index].discount;
            this.setState({checked:this.state.checked});
        }
    }


    render() {
        if ('undefined' === typeof this.props.price || !(this.props.price instanceof Array)) return null;
        let tempIndex, hasChecked
        ,   html = this.props.price.map(obj => {
            tempIndex = obj.id.inObjArray(this.state.checked, 'id');
            hasChecked = (-1 !== tempIndex);
            return (
                <div className='clothes-price' key={obj.id} data-id={obj.id} data-name={obj.name}>
                    <div>
                        <input 
                            type='checkbox' 
                            className='e-checkbox' 
                            checked={hasChecked ? 'checked' : ''} 
                            onChange={this.handleChecked}
                        />&nbsp;{obj.name}
                    </div>
                    <div>
                        <input 
                            type='text' 
                            className='e-input' 
                            value={hasChecked ? this.state.checked[tempIndex].value : ''} 
                            onChange={this.handleChange}
                        />&nbsp;元</div>
                    <div>
                        <input
                            type='checkbox' 
                            className='e-checkbox' 
                            checked={hasChecked && this.state.checked[tempIndex].discount ? 'checked' : ''}
                            onClick={this.handleDiscount}
                        />&nbsp;允许打折
                    </div>
                </div>
            );
        });
        return (
            <Dish title='工艺加价' height='360' width='436' onClose={this.props.onClose}>
                <div className='clothes-price-main'>{html}</div>
                <div className='clothes-price-bottom'>
                    <button type='button' className='e-btn' onClick={this.props.onClose}>取消</button>
                    &nbsp;&nbsp;
                    <button type='button' className='e-btn' onClick={this.handleClick}>确认</button>
                </div>
            </Dish>
        );
    }
}