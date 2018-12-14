/**
 * 返流界面组件
 * @author yangyunlong
 */
//const {dialog} = window.require('nw').remote;
import React from 'react';
import OptionBox from '../../Elem/OptionBox';
import Select from '../../UI/Select';
import Dish from '../../UI/Dish';
import './App.css';
const fs = window.require('fs');

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
            img:[],
            index:'',
            openshow:false,
            tstate:0,
            get_type:'',
            aa:0,
        }
        this.textwhy = this.textwhy.bind(this);
        this.updatebrandYES = this.updatebrandYES.bind(this);
        this.upload = this.upload.bind(this);        
        this.del = this.del.bind(this);
        this.query = this.query.bind(this);
        this.open = this.open.bind(this);
        this.backYES = this.backYES.bind(this);
        this.on_start = this.on_start.bind(this);
        this.backReturn = this.backReturn.bind(this);
    }
    componentDidMount (){
        this.query()
    }
    query(){
        let done;
        tool.ui.loading(handle => done = handle);
        api.post('back_data', {           
            token:'token'.getData(),
            wid:this.props.wid,
        }, (res, ver) => {
            console.log(this.props.wid)
            console.log(res)
            if (ver && res) {
                done();
                var num = parseInt(res.result.clothing_number)
                this.setState({
                    number:num,
                    name:res.result.clothing_name,
                    module:res.result.status,
                    img:res.result.img,
                    clothing_number:res.result.clothing_number
                })
            }else{
                tool.ui.error({title:'错误提示',msg:res.msg,button:'确定',callback:(close, event) => {
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
    upload(e) {        
        var value = e.target.value;        
       // console.log(value);       
        if (this.state.img.length > 2) {return false} ;       
                api.post(
                    'item_img_upload',
                    {
                        token:'token'.getData(),
                        wid:this.props.wid,
                        pic:fs.createReadStream(value)
                    },
                    (response, verify) => {
                        console.log(response)    
                        if (verify) {                                                   
                            this.state.img.push(response.result);
                            this.setState({img:this.state.img});
                        }
                    }
                );
    }         
    
    del(e) {
        let url = e.target.dataset.url;         
        let index = e.target.dataset.id;
        this.setState({aa:index})
          console.log(index) ;
          if(this.state.img.length<2){
            tool.ui.error({title:'提示',msg:'至少添加一张图片',button:['确定'],callback:(close, event) => {
                close();               
            }});
          }else{
            api.post(
                'item_img_delete',
                {
                    token:'token'.getData(),
                    wid:this.props.wid,
                    pic:url
                },
                (response, verify) => {
                    console.log(response);                                    
                    if (verify) {
                        this.state.img.splice(index, 1);
                        this.setState({img:this.state.img});
                    }      
                }
            );
          }        
    }
    open (e){
        console.log(1)
        var url = e.target.dataset.url;
        this.setState({
            openshow:true,
            url:url
        })
    }
    // 正常非正常返流
    
    on_start (e){
        if (e.target.value != this.state.tstate) {
            '0' == this.state.tstate ? this.setState({tstate: '1'}) : this.setState({tstate: '0'});
        }
    }
    backReturn (e){
        console.log(e.target.value);
        this.setState({get_type:e.target.value});
        if(e.target.value != this.state.get_type){
           var u = e.target.value;
           console.log(u);
           this.setState({get_type:u})
        } 
    }
    // 确定返流操作
    backYES (){       
        if(this.state.img.length < 0 ){
            tool.ui.error({title:'提示',msg:'请添加返流图片',button:['确定'],callback:(close, event) => {
                close();               
            }});
        } else if (this.state.value==''){
            tool.ui.error({title:'提示',msg:'请添加返流说明',button:['确定'],callback:(close, event) => {
                close();               
            }});
        }else{
            api.post(
                'returnBack',
                {
                    token:'token'.getData(),
                    wid:this.props.wid,
                    backflow_type:this.state.tstate,
                    status:this.state.get_type,
                    backflow_cause:this.state.value,
                    pic:JSON.stringify(this.state.img),
                },
                (response, verify) => {
                   if(verify){
                       console.log(response)
                    tool.ui.success({callback:(close, event) => {
                        close();
                        this.props.callback();
                        this.props.onClose();
                    }});
                   }else{
                        tool.ui.error({title:'错误提示',msg:response.msg,button:'确定',callback:(close, event) => {
                            close();
                        }});
                   }
                }
            );
        }
        
    }
    render() {
        console.log(this.state.img)
        let step = this.state.module.map((obj, index) =>
           <span key={obj} className="back_f">
                <label className="radiobox">
                    <input type="radio" name="take" onClick={this.backReturn} value={obj.id} checked={this.state.get_type == obj.id?true:false}/> {obj.name}
                </label>
            </span>
        );
        let images =this.state.img.map((obj, index) =>
            <div key={obj} className='m-img-box'>
                <img src={obj} onClick = {this.open} data-url={obj}/>
                <i 
                    className='m-img-delete'
                    onClick={this.del}
                    data-url={obj} 
                    data-id={index}                 
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
                    <div className='go-back-title'><span>衣物编码:{this.state.clothing_number}</span></div>
                    <div className='go-back-box up_photo'>
                        <span><a>*</a>上传照片:</span>  
                        {images}
                        {this.state.img.length > 2 ? null : (<div className='ui-img-upload-window-add upload' ><input type='file' onChange={this.upload} accept='.jpg,.jpeg,.png,.bmp'/></div>)} 
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
                        <label className="radiobox">
                            <input type="radio" name="take_order" value='0' checked={this.state.tstate==0?true:false} onClick={this.on_start}/> 正常返流
                        </label>&emsp;
                        <label className="radiobox">
                            <input type="radio" name="take_order" onClick={this.on_start} checked={this.state.tstate==1?true:false} value='1'/> 非正常返流
                        </label>
                    </div>
                    <div className='go-back-box'>
                        <span><a>*</a>返流步骤:</span>
                        {step}
                    </div>
                    <div className="btn_back">
                        <button className='e-btn ' type='button' onClick={this.backYES} >确认</button>
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
                {
                    this.state.openshow &&
                    <Dish title='查看图片' onClose={() => this.setState({openshow:false})} width="252" height='215'>
                       <img src={this.state.url} className="open_img"/>
                    </Dish>
                }
            </div>
        );
    }
}