/**
 * 返流界面组件
 * @author yangyunlong
 */

import React from 'react';
import OptionBox from '../../Elem/OptionBox';
import './App.css';

export default class extends React.Component {
    constructor(props) {
        super(props);  
    }
    render() {
        let className = 'ui-dish'
        ,   style = {};
        if ('string' === typeof this.props.className) className += (' ' + this.props.className);
        if (tool.isObject(this.props.style)) {
            for (var k in this.props.style) {
                style[k] = this.props.style[k];
            }
        }
        if (!isNaN(this.props.width)) {
            style.width = this.props.width + 'px';
            style.marginLeft = (-1 * this.props.width / 2) + 'px';
        }
        if (!isNaN(this.props.height)) {
            style.height = this.props.height + 'px';
            style.marginTop = (-1 * this.props.height / 2) + 'px';
        }   
        return (
            <div className="e-layer-bg">
                <div className={className} style={style}>
                    <div>
                        <span style={'string' === typeof this.props.icon ? {backgroundImage:'url(images/' + this.props.icon + ')'} : null}>{this.props.title}</span>
                        <i></i>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}