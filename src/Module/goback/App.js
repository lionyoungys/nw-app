/**
 * 返流界面组件
 * @author yangyunlong
 */

import React from 'react';
import OptionBox from '../../Elem/OptionBox';
import Select from '../../UI/Select';
import './App.css';

export default class extends React.Component {
    constructor(props) {
        super(props);  
        this.state = {
            number:'',
            name:this.props.name,
        }
    }
    componentDidMount (){
        let done;
        tool.ui.loading(handle => done = handle);
        api.post('back_data', {           
            token:'token'.getData(),
            wid:JSON.stringify(this.props.wid),
        }, (res, ver) => {
            console.log(res)
            if (ver && res) {
                done();
                this.setState({
                    number:res.result.clothing_number,
                    name:res.result.clothing_name,
                })
            }else{
                tool.ui.error({title:'错误提示',msg:res.msg,button:['确定'],callback:(close, event) => {
                    close();
                }});
            }
        });
    }
    render() {
        var aa= JSON.stringify(this.state.number);        
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
                    <div className='go-back-title'><span>衣物名称:{this.state.name}</span></div>
                    <div className='go-back-title'><span>衣物编码:{JSON.stringify(this.state.number)}</span></div>
                    <div className='go-back-box up_photo'>
                        <span><a>*</a>上传照片:</span>                       
                    </div>
                    <div className='go-back-box'>
                        <span><a>*</a>返流原因:</span>
                        <div className='textarea'>
                           <Select />
                        </div>
                    </div>
                    <div className='go-back-box'>
                        <span><a>*</a>返流类型:</span>
                        <OptionBox ></OptionBox>是&emsp;
                        <OptionBox ></OptionBox>否&emsp;
                    </div>
                    <div className='go-back-box'>
                        <span><a>*</a>返流步骤:</span>
                    </div>
                    <div className="btn_back">
                        <button className='e-btn ' type='button' >确认</button>
                    </div>
                </div>
            </div>
        );
    }
}