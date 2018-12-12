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
            <div className="e-layer-bg" onClose={this.props.onClose}>
                <div className={className} style={style} >
                    <div>
                        <span style={'string' === typeof this.props.icon ? {backgroundImage:'url(images/' + this.props.icon + ')'} : null}>{this.props.title}</span>
                        <i></i>
                    </div>
                    <div className='go-back-title'><span>衣物名称：{this.props.name}</span></div>
                    <div className='go-back-title'><span>衣物编码:{this.props.wid}</span></div>
                    <div className='go-back-box'>
                        <span><a>*</a>上传照片：</span>                                               
                    </div>
                    <div className='go-back-box'>
                        <span>文字描述：</span>
                        <div className='textarea'>
                            <textarea></textarea>
                            <i className='m-counter'></i>
                        </div>
                    </div>
                    <div className='go-back-box'>
                        <span>是否正常返流：</span>
                        <OptionBox  >是&emsp;</OptionBox>
                        <OptionBox >否&emsp;</OptionBox>
                    </div>
                    <div className='go-back-box'>
                        <span>返流步骤：</span>
                    </div>
                    <div>
                        <button className='m-btn confirm middle' type='button'  >取消</button>
                        &emsp;
                        <button className='m-btn confirm middle' type='button' >确认</button>
                    </div>
                </div>
            </div>
        );
    }
}