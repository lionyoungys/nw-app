/**
 * 附带下拉框的搜索框组件
 * @author Edwin Young
 * @desc placeholder:文本框注释文字;value:默认值option:选项列表[value,value,value];callback:回调操作(value,option);selected:默认选中的选项
 */

import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'string' === typeof this.props.value ? this.props.value : '', 
            selected:'string' === typeof this.props.selected && '' !== this.props.selected ? this.props.selected : this.props.option[0], 
            show:false,
            height_light:false,
            focus:false,
            hover:false,
            minWidth:null
        };
        this.handleChange = this.handleChange.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    }

    componentDidMount() {
        this.input.onkeydown = ( e => {'Enter' === e.code && this.props.callback(this.state.value, this.state.selected)} );
        this.setState({minWidth:this.div.offsetWidth});
    }
    handleChange(e) {this.setState({selected:e.target.innerText, show:false, height_light:false})}
    toggleShow() {this.setState({show:!this.state.show})}
    
    render() {
        let len = this.props.option.length,
            option = [];
        for (let i = 0;i < len;++i) {
            if (this.state.selected === this.props.option[i]) continue;
            option.push(
                <div
                    key={this.props.option[i]}
                    onClick={this.handleChange}
                >{this.props.option[i]}</div>
            );
        }
        return (
            <div 
                className={`ui-select-search${this.state.height_light ? ' ui-select-search-blue' : ''}`} 
                onMouseOver={() => this.setState({height_light:true, hover:true})}
                onMouseOut={() => this.setState({hover:false, height_light:this.state.focus})}
            >
                <div
                    className={this.state.show ? 'ui-select-search-option-show' : null}
                    style={{minWidth:this.state.minWidth}}
                >
                    <i onClick={this.toggleShow}></i>
                    <div
                        className='ui-select-search-selected'
                        onClick={this.toggleShow}
                    >{this.state.selected}</div>
                    <div ref={div => this.div = div} className='ui-select-search-option'>{option}</div>
                </div>
                <input 
                    type='text' 
                    placeholder={this.props.placeholder} 
                    value={this.state.value}
                    ref={input => this.input = input}
                    onChange={e => this.setState({value:e.target.value})}
                    onFocus={() => this.setState({focus:true})}
                    onBlur={() => this.setState({focus:false, height_light:this.state.hover})}
                />
                <button type='button' onClick={() => this.props.callback(this.state.value, this.state.selected)}></button>
            </div>
        );
    }
}