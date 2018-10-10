/**
 * 下拉框组件
 * @author Edwin Young
 * @desc option:选项列表[value,value,value]|[{key:'', value:''},{key:'', value:''}];onChange:回调操作(value);value:选中的选项
 */

import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    } 

    handleChange(e) {
        if ('function' === typeof this.props.onChange) {
            let value = e.target.innerText
            ,   key = e.target.dataset.key;
            if ('string' === typeof key) {
                this.props.onChange({key:key, value:value});
            } else {
                this.props.onChange({key:'', value:value});
            }
        }
    }
    
    render() {
        let value = this.props.value || ''
        ,   options = tool.isArray(this.props.option) ? this.props.option : []
        ,   len = options.length
        ,   arr = [];
        for (var i = 0;i < len;++i) {
            if ('string' === typeof options[i]) {
                if (value === options[i]) continue;
                arr.push(<div key={options[i] + '_' + i} onClick={this.handleChange}>{options[i]}</div>)
            } else if (tool.isObject(options[i])) {
                if (value === options[i].value) continue;
                arr.push(<div key={options[i].key} data-key={options[i].key} onClick={this.handleChange}>{options[i].value}</div>);
            }
        }
        return (
            <div className='ui-select'>
                <input className='e-input' type='text' disabled placeholder='请选择...' value={value}/>
                <section>
                    <div>{arr}</div>
                </section>
            </div>
        );
    }
}