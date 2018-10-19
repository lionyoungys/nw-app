/**
 * 下拉框组件
 * @author Edwin Young
 * @desc option:选项列表[value,value,value]|[{key:'', value:''},{key:'', value:''}];onChange:回调操作({key:'',value:'',index:''});value:选中的选项;pair:[key, value]通过给定数组对应寻找option中对应的key,value;style:追加的style;className:追加的css类名
 */

import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show:true};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({show:false});
        if ('function' === typeof this.props.onChange) {
            this.props.onChange({key:e.target.dataset.key, value:e.target.innerText, index:Number(e.target.dataset.index)});
        }
        setTimeout(() => this.setState({show:true}), 100);
    }
    
    render() {
        let K = 'key'
        ,   V = 'value'
        ,   value = this.props.value
        ,   options = tool.isArray(this.props.option) ? this.props.option : []
        ,   len = options.length
        ,   arr = []
        ,   tmp;    //临时key
        if (tool.isArray(this.props.pair)) {
            if ('string' === typeof this.props.pair[0] || 'number' === typeof this.props.pair[0]) K = this.props.pair[0];
            if ('string' === typeof this.props.pair[1] || 'number' === typeof this.props.pair[1]) V = this.props.pair[1];
        }
        if ('string' !== typeof value && 'number' !== typeof value) {    //判断value是否传入,未传入时使用第一个为;
            if ('string' === typeof options[0] || 'number' === typeof options[0]) {
                value = options[0];
            } else if (
                tool.isObject(options[0]) 
                && 
                ('string' === typeof options[0][V] || 'number' === typeof options[0][V])
            ) {
                value = options[0][V];
            } else {
                value = '';
            }
        }
        for (var i = 0;i < len;++i) {
            if ('string' === typeof options[i] || 'number' === typeof options[i]) {
                if (value === options[i]) continue;
                tmp = tool.UUID();
                arr.push(<div key={tmp} data-key={tmp} data-index={i} onClick={this.handleChange}>{options[i]}</div>);
            } else if (tool.isObject(options[i])) {
                if ('undefined' === typeof options[i][V] || value === options[i][V]) continue;
                tmp = options[i][K];
                if ('string' !== typeof tmp && 'number' !== typeof tmp) tmp = tool.UUID();
                arr.push(<div key={tmp} data-key={tmp} data-index={i} onClick={this.handleChange}>{options[i][V]}</div>);
            }
        }
        return (
            <div
                className={'ui-select' + ( 'string' === typeof this.props.className ? (' ' + this.props.className) : '' )} 
                style={this.props.style}
            >
                <i></i>
                <input className='e-input' type='text' disabled placeholder='请选择...' value={value}/>
                <section style={this.state.show ? null : {display:'none'}}>
                    <div>{arr}</div>
                </section>
            </div>
        );
    }
}