/**
 * 分页组件
 * @author Edwin Young
 * @desc current:当前页数,默认1;total:总条目,默认0;fetch:每页条目,默认20;show:展示页码条目数;callback:点击页码处理,返回参数为跳转的页码;
 */

import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value:''}
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.defaultShow = 4;
    }

    handleClick(e) {
        if ('function' === typeof this.props.callback) {
            let value = Number(e.target.dataset.val)
            ,   current = isNaN(this.props.current) ? 1 : Number(this.props.current)
            ,   total = this.props.total || 0
            ,   fetch = this.props.fetch || 20
            ,   last = Math.ceil(total / fetch);
            current != value && value > 0 && last >= value && this.props.callback(value)
        }
    }
    handleChange(e) {
        this.setState({value: e.target.value});
    }
    handleKeyPress(e) {
        e.persist();
        let code = e.keyCode || e.which;
        13 === code && !isNaN(this.state.value) && 'function' === typeof this.props.callback && this.props.callback(Number(this.state.value));
    }
    render() {
        let current = isNaN(this.props.current) ? 1 : Number(this.props.current)
        ,   show = isNaN(this.props.show) ? this.defaultShow : Number(this.props.show)
        ,   total = this.props.total || 0
        ,   fetch = this.props.fetch || 20
        ,   last = Math.ceil(total / fetch)
        ,   pages = []
        ,   start = 1;
        if (current > last) current = 1;
        if (show < 1) show = this.defaultShow;
        pages.push(
            <i 
                className={'ui-page-previous' + (2 > current ? ' disabled' : '')} 
                onClick={this.handleClick}
                data-val={current - 1}
            ></i>
        );
        if (last > show) {
            if (current <= show / 2 + 1) {
                start = 1;
            } else if (current > show / 2 + 1) {
                start = current - show / 2;
            }
        }
        while(start <= last) {
            pages.push(
                <i 
                    className={start == current ? 'ui-page-current' : null} 
                    onClick={this.handleClick}
                    data-val={start}
                >{start}</i>
            );
            ++start;
            --show;
            if (0 === show) break; 
        }
        pages.push(
            <i 
                className={'ui-page-next' + (last > current ? '' : ' disabled')} 
                onClick={this.handleClick}
                data-val={current + 1}
            ></i>
        );
        return (
            <div className="ui-page">
                <span>共{total}条</span>
                <div><button type='button'>{fetch}条/页</button></div>
                {pages}
                {/* <i className='ui-page-previous' onClick={this.handleClick} data-val={1 == current ? 1 : (current - 1)}></i>
                <i className='ui-page-current'>1</i>
                <i>2</i>
                <i className='ui-page-next' onClick={this.handleClick} data-val={last == current ? last : (current + 1)}></i> */}
                <span>跳至</span>
                <input type='text' value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                <span>页</span>
                {/* 第<i>{current}</i>页/共<i>{last}</i>页
                每页<i>{fetch}</i>条，共<i>{total}</i>条
                <span onClick={this.handleClick} data-val='1'>首页</span>
                <span onClick={this.handleClick} data-val={1 == current ? 1 : (current - 1)}>上一页</span>
                <span onClick={this.handleClick} data-val={last == current ? last : (current + 1)}>下一页</span>
                <span onClick={this.handleClick} data-val={last}>尾页</span> */}
            </div>
        );
    }
}