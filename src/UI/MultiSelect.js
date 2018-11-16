/**
 * 多选下拉框容器组件
 * @author Edwin Young
 * @desc children:内部子级内容;value:选中的选项列表;style:追加的style;className:追加的css类名
 */

import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show:true,up:false};
        this.handleMouseHover = this.handleMouseHover.bind(this);
    }

    handleMouseHover(e) {
        e.persist();
        if ((document.documentElement.clientHeight - e.target.getClientXY().y) < 184) {
            !this.state.up && this.setState({up:true});
        } else {
            this.state.up && this.setState({up:false});
        }
    }

    render() {
        return (
            <div
                className={'ui-multi-select' + (this.state.up ? ' ui-select-up' : '') + ( 'string' === typeof this.props.className ? (' ' + this.props.className) : '' )}
                data-disabled={this.props.disabled ? 'disabled' : ''}
                style={this.props.style}
            >
                <i></i>
                <input className='e-input' type='text' disabled placeholder='请选择...' value={this.props.value} title={this.props.value} onMouseOver={this.handleMouseHover}/>
                <section style={this.state.show ? null : {display:'none'}}>
                    <div>{this.props.children}</div>
                </section>
            </div>
        );
    }
}