/**
 * 送洗界面组件
 * @author yangyunlong
 */

import React from 'react';
import Window from '../../UI/Window';
import OptionBox from '../../Elem/OptionBox';        //新增
import ImageLightbox from '../../Elem/ImageLightbox';   //新增
import Select from '../../UI/Select';
import ImgUploadWindow from '../../UI/ImgUploadWindow';
import './App.css';
//import { stat } from 'fs';
const token = 'token'.getData();

export default class extends React.Component {
    constructor(props) {
        super(props);
        //this.props.onRef(this);
        this.state = {
            shop_id:'',
            data:[],
            checked:[],
            all:false,
            loading:null,
            //新增state属性
            uploadShow:false,
            lightboxShow:false,
            index:null, 
            selected_shop:[],
            selected_id:'',
            select_shop:'',
            sel_id:''
        };

        this.onSearch = this.onSearch.bind(this); //搜索
        this.handleAllChecked = this.handleAllChecked.bind(this); //全选
         this.handleCleaned = this.handleCleaned.bind(this); //入厂
        this.handleChecked = this.handleChecked.bind(this); // 单选
        this.handleClick = this.handleClick.bind(this); //送洗
        this.onUpload = this.onUpload.bind(this);   //文件上传
        this.query = this.query.bind(this);      // 方法
        this.onDelete = this.onDelete.bind(this);  // 删除
        //新增
         this.uploadShow = this.uploadShow.bind(this);
         this.lightboxShow = this.lightboxShow.bind(this);
         this.select_factory = this.select_factory.bind(this); //入厂列表
         this.onKeyPress = this.onKeyPress.bind(this);
    }
    onKeyPress(e){
        13 == (e.keyCode || e.which) && this.onSearch();
    }   
    componentDidMount() {
        this.input.focus();
        this.query();
    }
    query() {
        let done;
        tool.ui.loading(handle => done = handle);
        api.post('laundry_wash', {           
            token:'token'.getData(),
        }, (res, ver) => {
            if (ver && res) {
                console.log(res);
                done();
                this.setState({
                    data:res.result,
                    value:'',
                    show:false,
                })
            }
        },()=>done());
    }
    
    // 点击选择要入的工厂
    select_factory (){
        api.post('factory_id', {           
            token:'token'.getData(),
        }, (res, ver) => {
            if (ver && res) {
                console.log(res);
                let len = res.result.length
                ,   tmp_arr = [];
                for (var i = 0;i < len;++i) {
                    tmp_arr.push({key:res.result[i].id, value:res.result[i].mname});
                }
                this.setState({select_shop:tmp_arr});
                //this.setState({select_shop:res.result.typeArray('mname'), })           
            }
        });
    }
    onSearch() { 
               
                let index = this.state.value.inObjArray(this.state.data, 'clothing_number');
                 if (-1 != index) {
                     if (this.state.data[index].state == true) return;
                     let index2 = this.state.data[index].id.inArray(this.state.checked);
                 if (-1 === index2) {
                        this.state.checked.push(this.state.data[index].id);
                        this.setState({checked:this.state.checked});
                    }
                    } else {                     
                        tool.ui.error({title:'提示',msg:'此衣物编码不存在或已操作过此步骤，请核对编码是否正确',button:'确定',callback:(close, event) => {
                            close();
                            this.setState({value:''});
                        }});  
                    }
                this.setState({value:''});
                this.input.focus()
    }       
    
    //全选
    handleAllChecked(value, checked) {       
        if (checked==false) {
            let data = this.state.data,
                len = data.length,
                checked = [];
            for (let i = 0;i < len;++i) {
                if (data[i].state == false) checked.push(data[i].id);
            }
            this.setState({checked:checked,all:true});            
        } else {
            this.setState({
                checked:[],
                all:false
            });     
        }
    }
    //单选
    handleChecked(value,checked) {
        if (checked) {
            let index = value.inArray(this.state.checked);
            if (-1 !== index) {
                this.state.checked.splice(index, 1);
                this.setState({checked:this.state.checked,all:false});
            }
        } else {
            this.state.checked.push(value);
            this.setState({checked:this.state.checked});
        }
    }
    //入厂
    handleCleaned() {  
        console.log(this.state.sel_id)                  
        if(this.state.checked.length < 1) return;      
        api.post('take_factory', {  
            wid:JSON.stringify(this.state.checked), 
            rid:this.state.sel_id,                 
            token:'token'.getData(),
        }, (res, ver) => {
            console.log(res)
            if (ver && res) {   
                printer.intoFactory('printer'.getData(), res.result);                 
                tool.ui.success({callback:(close, event) => {
                    close();
                    this.setState({
                        checked:[],
                        all:false,
                    });
                    this.query();
                }});                                                      
            }else{
                tool.ui.error({title:'提示',msg:res.msg,button:'确定',callback:(close, event) => {
                    close();
                }});
            }
        });            
    }

    onUpload(file) {    //文件上传
        let done;
        tool.ui.loading(handle => done = handle);
        let index = this.state.index;
        api.post(
            'item_img_upload', 
            {token:token, wid:this.state.data[index].id, pic:file.stream}, 
            (res, ver, notice) => {
                done();
                if (ver) {
                    this.state.data[index].img.push(res.result);
                    this.setState({data:this.state.data});
                } else {
                    notice();
                }
            }, 
            () => {done()}
        );

    }

    onDelete(url, index) {    //文件删除
        let item_index = this.state.index;
        api.post('item_img_delete', {token:token, wid:this.state.data[item_index].id, pic:url}, (res, ver) => {
            if (ver) {
                this.state.data[item_index].img.splice(index, 1);
                this.setState({data:this.state.data});
            }
        });
        console.log(url, index);
    }    
    //新增方法
    uploadShow(e) {
        this.setState({uploadShow:true, index:e.target.dataset.index});
    }
    lightboxShow(e) {
        this.setState({lightboxShow:true, index:e.target.dataset.index});
    }
    
    //送洗操作
    handleClick() {              
         if (this.state.checked.length < 1) return;
         api.post('wsah_btn', {  
            wid:JSON.stringify(this.state.checked),                  
            token:'token'.getData(),
        }, (res, ver) => {
            console.log(res)
            if (ver && res) {
               // console.log(res)
               tool.ui.success({callback:(close, event) => {
                close();
                this.setState({
                    checked:[],
                    all:false,
                });
                this.query();
               }});                                
            }else{
                tool.ui.error({title:'提示',msg:res.msg,button:'确定',callback:(close, event) => {
                    close();
                }});
            }
        });
    }
    render() {
        let html = this.state.data.map( (obj, index) =>
            <tr key={obj.id} className={!(obj.state == false ) ? null : 'disabled'}>
                <td>
                    {
                        (obj.state == false)
                        ?
                        <OptionBox
                            type='checkbox'
                            checked={-1 !== obj.id.inArray(this.state.checked)}
                            value={obj.id}
                            onClick={this.handleChecked}
                        >{obj.clothing_number}</OptionBox>
                        :
                        obj.clothing_number
                    }
                </td>
                <td>{obj.clothing_name}</td>
                <td>{obj.clothing_color}</td>
                <td>{obj.remark}</td>
                <td>{obj.sign}</td>
                <td>{obj.forecast}</td>               
                <td>{obj.addition_price}</td>
                <td>{obj.raw_price}</td>
                <td>
                    <span className='e-orange e-pointer' data-index={index} onClick={this.lightboxShow}>{obj.img.length}张</span>
                    &emsp;
                    <b  className='photo-btn' data-index={index} onClick={this.uploadShow}>上传图片</b>
                </td>
            </tr>
        );
        return (
        <Window title='送洗' onClose={this.props.closeView}> 
            <div className="out-title">
                <div className='right1 out-left'>
                    <input type="text" value={this.state.value} onChange={e => this.setState({value:e.target.value.trim()})} autoFocus={true}  placeholder='请输入或扫描衣物编码' ref={input => this.input = input} onKeyPress={this.onKeyPress}/>                       
                    <button className="e-btn hangon-btn" onClick={this.onSearch}>添加</button>
                </div> 
                <div className='right1 out-right' onClick = {this.select_factory}>
                    选择工厂：<Select  option={this.state.select_shop}  onChange={value => this.setState({sel_id:value})} selected="请选择厂家"/>
                </div>
            </div>
            <div className='clean laundry'>                   
                    <div className='e-box'>
                        <table className='e-table border'>
                            <thead><tr><th>衣物编码</th><th>名称</th><th>颜色</th><th>瑕疵</th><th>品牌</th><th>洗后预估</th><th>工艺加价</th><th>单价</th><th>上传图片</th></tr></thead>
                            <tbody>{html}</tbody>
                        </table>
                    </div>
                    {
                        this.state.uploadShow 
                        && 
                        <ImgUploadWindow 
                            onClose={() => this.setState({uploadShow:false})} 
                            onDelete={this.onDelete}
                            onUpload={this.onUpload}
                            imgs={this.state.data[this.state.index].img}
                        />
                    }
                    <ImageLightbox
                        show={this.state.lightboxShow}
                        images={
                            null !== this.state.index && tool.isSet(this.state.data[this.state.index].image)
                            ? 
                            this.state.data[this.state.index].image : []
                        }
                        onClose={() => this.setState({lightboxShow:false})}
                    />
                    <div className='clean-top'>
                        <div className='left'>
                            <OptionBox type='checkbox' checked={this.state.all} onClick={this.handleAllChecked}>全选</OptionBox>
                            &emsp;&emsp;
                            已选择<span className='e-orange'>&nbsp;{this.state.checked.length}&nbsp;</span>件
                            &emsp;&nbsp;
                            <button type='button' className='e-btn confirm' onClick={this.handleCleaned}>入厂</button>
                            &emsp;
                            <button className='e-btn confirm' onClick={this.handleClick}>已送洗</button>
                        </div>                       
                    </div>               
            </div>
        </Window>
        );
    }
}