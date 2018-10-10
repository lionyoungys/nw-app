/**
 * 分页组件
 * @author Edwin Young
 * @desc current:当前页数,默认1;total:总条目,默认0;fetch:每页条目,默认20;callback:点击页码处理,返回参数为跳转的页码;
 */

import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value:''}
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(e) {'function' === typeof this.props.callback && this.props.callback(Number(e.target.dataset.val))}
    handleChange(e) {
        let value = e.target.value;
        if (!isNaN(value)) {
            let total = this.props.total || 0
            ,   fetch = this.props.fetch || 20
            ,   last = Math.ceil(total / fetch);
            last >= value && this.setState({value: Number(value)});
        }
    }
    render() {
        let current = this.props.current || 1
        ,   total = this.props.total || 0
        ,   fetch = this.props.fetch || 20
        ,   last = Math.ceil(total / fetch);
        return (
            <div className="ui-page">
                <span>共{total}条</span>
                <i className='ui-page-previous'></i>
                <i className='ui-page-current'>1</i>
                <i>2</i>
                <i className='ui-page-next'></i>
                <button type='button'>{fetch}条/页</button>
                <span>跳至</span>
                <input type='text' value={this.state.value} onChange={this.handleChange}/>
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