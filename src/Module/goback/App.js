/**
 * 返流界面组件
 * @author yangyunlong
 */

import React from 'react';
import OptionBox from '../../Elem/OptionBox';
import Select from '../../UI/Select';
import Dish from '../../UI/Dish';
import './App.css';

export default class extends React.Component {
    constructor(props) {
        super(props);  
        this.state = {
            number:'',
            name:this.props.name,
            module:[],
            backwhy:['衣物未清洗干净需重新去渍','衣物未烘干完全需重新烘干','衣物未熨烫平整需重新熨烫','衣物操作中污染需重新清洗','衣物操作中褶皱需重新熨烫'],
            value:'',
            alert:false,
            images:[],
        }
        this.textwhy = this.textwhy.bind(this);
        this.updatebrandYES = this.updatebrandYES.bind(this);
        this.upload = this.upload.bind(this);        
        this.del = this.del.bind(this);
    }
    componentDidMount (){
        let done;
        tool.ui.loading(handle => done = handle);
        api.post('back_data', {           
            token:'token'.getData(),
            wid:this.props.wid,
        }, (res, ver) => {
            console.log(res)
            if (ver && res) {
                done();
                var num = parseInt(res.result.clothing_number)
                this.setState({
                    number:num,
                    name:res.result.clothing_name,
                    module:res.result.status,
                    images:res.result.img
                })
            }else{
                tool.ui.error({title:'错误提示',msg:res.msg,button:['确定'],callback:(close, event) => {
                    close();
                }});
            }
        });
    }
    // 自定义原因
    textwhy (){
     this.setState({alert:true})
    }
    updatebrandYES(){
        this.setState({
            value:this.state.value,
            alert:false
        })
        
    }
    upload() {
        if (this.state.images.length > 2) return;
        dialog.showOpenDialog({
            filters: [{name: 'Images', extensions: ['jpg','png','jpeg','bmp','JPG','PNG','JPEG','BMP']}],
            properties: ['openFile']
        },(filePaths) => {
            if (filePaths instanceof Array) {
                
            }
        });
    }
    del(e) {
        let url = e.target.dataset.url;
        axios.post(api.U('go_back_delete'), api.D({token:this.props.token,url:url}))
        .then(response => {
            if (api.V(response.data)) {
                this.state.data.back_img.splice(url.inArray(this.state.data.back_img), 1);
                this.setState({data:this.state.data});
            }
        });
    }
    render() {
        var step = this.state.module.map( (obj, index) =><span>
                <OptionBox type='checkbox'></OptionBox>{obj.name}&emsp;</span>
        );
        var images = this.state.images.map(obj =>
            <div key={obj} className='m-img-box'>
                <img src={obj}/>
                <i 
                    className='m-img-delete'
                    onClick={this.del}
                    data-url={obj}
                ></i>
            </div>
        );
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
                <div className={className} style={style} >
                    <div >
                        <span style={'string' === typeof this.props.icon ? {backgroundImage:'url(images/' + this.props.icon + ')'} : null}>返流</span>
                        <i onClick={this.props.onClose}></i>
                    </div>
                    <div className='go-back-title'><span>衣物名称:{this.state.name}</span></div>
                    <div className='go-back-title'><span>衣物编码:{JSON.stringify(this.state.number)}</span></div>
                    <div className='go-back-box up_photo'>
                        <span><a>*</a>上传照片:</span>  
                        {images}
                        {this.state.images.length > 2 ? null : (<div className='m-img-box upload' onClick={this.upload}></div>)} 
                        <a className="up">最多可上传三张图片</a>                    
                    </div>
                    <div className='go-back-box'>
                        <span><a>*</a>返流原因:</span>
                        <div className='textarea'>
                           <Select option={this.state.backwhy} onChange={value => {this.setState({value:value.value})}} value={this.state.value}/>
                           <b onClick = {this.textwhy}>自定义返流原因</b>
                        </div>
                    </div>
                    <div className='go-back-box'>
                        <span><a>*</a>返流类型:</span>
                        <OptionBox type='checkbox'></OptionBox>是&emsp;
                        <OptionBox type='checkbox'></OptionBox>否&emsp;
                    </div>
                    <div className='go-back-box'>
                        <span><a>*</a>返流步骤:</span>
                        {step}
                    </div>
                    <div className="btn_back">
                        <button className='e-btn ' type='button' >确认</button>
                    </div>
                </div>
                {
                    this.state.alert && 
                    <Dish title='定义返流原因' onClose={() => this.setState({alert:false})} width="389" height='194'>
                        <div className="addbrand-div">
                            <div className="brand-name">返流原因</div>
                            <input  type="text" className="brand-text" value={this.state.value} onChange={e => this.setState({value:e.target.value})}/>
                        </div>
                        <div className="addbrand-footer">
                            <button onClick = {this.updatebrandYES}>保 存</button>
                        </div>
                    </Dish>
                }
            </div>
        );
    }
}