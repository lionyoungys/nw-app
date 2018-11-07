/**
 * 分页组件
 * @author Edwin Young
 * @desc current:当前页数,默认1;total:总条目,默认0;fetch:每页条目,默认20;show:展示页码条目数;callback:点击页码处理,返回参数为跳转的页码;onUpdateFetch:当切换每页条目的回调函数,回调参数为条目数值
 */

import React from 'react';
import Triangle from './Triangle';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value:'',down:false}
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChangeFetch = this.handleChangeFetch.bind(this);
        this.handleMouseHover = this.handleMouseHover.bind(this);
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
    handleChangeFetch(e) {
        'function' === typeof this.props.onUpdateFetch && this.props.onUpdateFetch(Number(e.target.dataset.fetch));
    }
    handleMouseHover(e) {
        e.persist();
        if ('SECTION' === e.target.tagName) {
            if ((document.documentElement.clientHeight - e.target.getClientXY().y) < 176) {
                !this.state.down && this.setState({down:true});
            } else {
                this.state.down && this.setState({down:false});
            }
        }
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
            <div className={'ui-page' + ('string' === typeof this.props.className ? (' ' + this.props.className) : '')} style={this.props.style}>
                <span>共{total}条</span>
                <div>
                    <button type='button'>{fetch}条/页</button>
                    {/* <section className={'ui-page-fetch' + (this.state.down ? ' ui-page-fetch-down' : '')} onMouseOver={this.handleMouseHover}>
                        <div>
                            <Triangle className='ui-page-triangle' down={this.state.down}/>
                            <div data-fetch='20' data-checked={20 == fetch ? 'true' : ''} onClick={this.handleChangeFetch}>20条/页</div>
                            <div data-fetch='40' data-checked={40 == fetch ? 'true' : ''} onClick={this.handleChangeFetch}>40条/页</div>
                            <div data-fetch='60' data-checked={60 == fetch ? 'true' : ''} onClick={this.handleChangeFetch}>60条/页</div>
                            <div data-fetch='80' data-checked={80 == fetch ? 'true' : ''} onClick={this.handleChangeFetch}>80条/页</div>
                        </div>
                    </section> */}
                </div>
                {pages}
                <span>跳至</span>
                <input type='text' value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                <span>页</span>
            </div>
        );
    }
}