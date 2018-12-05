/**
 * 衣物类别组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Dish from './Dish';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {show:false, checked:[]};
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCheckAll = this.handleCheckAll.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleConfirm() {
        if (this.state.checked.length > 0) {
            this.setState({show:true});
        } else {
            tool.ui.warn({msg:'请选择衣物类别', button:['确认'], callback:close => close()});
        }
    }
    handleClose() {this.setState({show:false})}

    handleCheckAll() {
        let len = this.props.data.length
        ,   arr = [];
        for (let i = 0;i < len;++i) {
            arr.push(i);
        }
        this.setState({checked:arr});
    }

    handleCheck(e) {
        if ('checked' == e.target.dataset.checked) {
            let index = e.target.dataset.index.inArray(this.state.checked);
            if (-1 != index) {
                this.state.checked.splice(index, 1);
            }
        } else {
            this.state.checked.push(Number(e.target.dataset.index));
        }
        this.setState({checked:this.state.checked});
    }


    render() {
        if ('undefined' === typeof this.props.data || !(this.props.data instanceof Array)) {
            return null;
        }
        let html = this.props.data.map((obj, index) =>
            <i
                key={obj.id}
                className='e-option'
                data-checked={-1 == obj.index.inArray(this.state.checked) ? '' : 'checked'}
                data-index={index}
                onClick={this.handleCheck}
            >{obj.name}</i>
        );
        return (
            <Dish title='选择衣物分类' onClose={this.props.onClose}>
                <div className='clothes-cate-top'>
                    <span>衣物类别</span>
                    <span>
                        <button type='button' className='e-btn-b larger' onClick={this.handleCheckAll}>全选</button>
                        &emsp;
                        <button type='button' className='e-btn larger' onClick={this.handleConfirm}>确认</button>
                    </span>
                </div>
                <div className='clothes-cate-body'>{html}</div>
                {this.state.show && <Items checked={this.state.checked} data={this.props.data} onClose={this.handleClose}/>}
            </Dish>
        );
    }
}

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {checked:[], value:''};
        this.handleCheck = this.handleCheck.bind(this);
        this.handleCheckAll = this.handleCheckAll.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleCheck(e) {
        if ('checked' == e.target.dataset.checked) {
            let index = e.target.dataset.index.inArray(this.state.checked);
            if (-1 != index) {
                this.state.checked.splice(index, 1);
            }
        } else {
            this.state.checked.push(e.target.dataset.index);
        }
        this.setState({checked:this.state.checked});
    }

    handleCheckAll() {
        let len = this.props.checked.length
        ,   arr = [];
        for (let i = 0;i < len;++i) {
            this.props.data[i].server.map((obj, index) => {
                arr.push(i + '_' + index);
            });
        }
        this.setState({checked:arr});
    }

    handleChange(e) {this.setState({value:e.target.value})}

    render() {
        if ('undefined' === typeof this.props.data || !(this.props.data instanceof Array)) {
            return null;
        } else if ('undefined' === typeof this.props.checked || !(this.props.checked instanceof Array)) {
            return null;
        }
        let len = this.props.checked.length
        ,   html = []
        ,   tmp;
        
        for (let i = 0;i < len;++i) {
            this.props.data[i].server.map((obj, index) => {
                if (
                    '' == this.state.value 
                    || 
                    -1 !== obj.item_name.indexOf(this.state.value)
                    ||
                    -1 !== obj.help_num.indexOf(this.state.value)
                ) {
                    tmp = i + '_' + index;
                    html.push(
                        <i
                            key={obj.id}
                            className='e-option'
                            data-checked={-1 == tmp.inArray(this.state.checked) ? '' : 'checked'}
                            data-index={tmp}
                            onClick={this.handleClick}
                        >{obj.item_name}</i>
                    );
                }
            });
        }
        return (
            <Dish title='选择衣物' onClose={this.props.onClose}>
                <div className='clothes-cate-top'>
                    <span>衣物列表</span>
                    <span>
                        <input type='text' placeholder='助记码/名称' className='e-input' value={this.state.value} onChange={this.handleChange}/>
                        &nbsp;&nbsp;
                        <button type='button' className='e-btn-b' onClick={this.handleCheckAll}>全选</button>
                    </span>
                </div>
                <div className='clothes-cate-body'>{html}</div>
            </Dish>
        );
    }
}