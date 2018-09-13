/**
 * 质检界面组件
 * @author yangyunlong
 */

import React from 'react';
//import Search from '../UI/search/App';
import Window from '../../UI/Window';
import OptionBox from '../../Elem/OptionBox';        //新增
import ImageLightbox from '../../Elem/ImageLightbox';   //新增
import UploadToast from '../UI/upload-toast/App';    //新增
import ImgUploadWindow from '../../UI/ImgUploadWindow';
const state = 52, word = '质检';
const token = 'token'.getData();
// import { stat } from 'fs';

export default class extends React.Component {
    constructor(props) {
        super(props);
        //this.props.onRef(this);
        this.state = {value:'',data:[],checked:[],all:false,loading:null,uploadShow:false,lightboxShow:false,index:null};
        this.onSearch = this.onSearch.bind(this);
        this.handleAllChecked = this.handleAllChecked.bind(this);
        this.handleCleaned = this.handleCleaned.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.query = this.query.bind(this);
       // this.goBack = this.goBack.bind(this);
        
        this.onUpload = this.onUpload.bind(this);       
        this.onDelete = this.onDelete.bind(this);  // 删除
        this.uploadShow = this.uploadShow.bind(this);
        this.lightboxShow = this.lightboxShow.bind(this);
    }

    componentDidMount() {this.query()}
    query() {
        let done;
        tool.ui.loading(handle => done = handle);
        api.post('check_over', {           
            token:'token'.getData(),
            state:state
        }, (res, ver) => {
            if (ver && res) {
                console.log(res);
                done();
                this.setState({
                    data:res.result,
                    value:'',
                })
            }
        },()=>done());
    }
     // 搜索查询
    onSearch() {
        api.post('take_check', {           
            token:'token'.getData(),
            clothing_number:this.state.value
        }, (res, ver) => {
            if (ver && res) {
                tool.ui.success({callback:(close, event) => {
                    close();
                    this.query();
                }});    
            }else{
                //console.log(res)
                let index = this.state.value.inObjArray(this.state.data, 'clothing_number');
                console.log(this.state.data,this.state.value)
               // console.log(index)
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
            }
        });
    }
    //全选
    handleAllChecked(value, checked) {
        //console.log(this.state.data.length)
        if (checked) {
            this.setState({checked:[],all:false});
        } else {
            let data = this.state.data,
                len = data.length,
                checked = [];
            for (let i = 0;i < len;++i) {
                if (data[i].state == false) checked.push(data[i].id);
            }
            this.setState({checked:checked,all:true});
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
    // 已质检
    handleCleaned() {
        //console.log(this.state.checked);
        if (this.state.checked.length < 1) return;
        api.post('check_btn', {           
            token:'token'.getData(),
            wid:JSON.stringify(this.state.checked)           
        }, (res, ver) => {
            if (ver && res) {
                tool.ui.success({callback:(close, event) => {
                    close();
                    this.setState({
                        checked:[],
                        all:false
                    });
                    this.query();
                }});
            }else{
                tool.ui.error({title:'错误提示',msg:res.msg,button:'确定',callback:(close, event) => {
                    close();
                }});
            }
        });
    }
    //反流
    // goBack() {
    //     if (this.state.checked.length != 1) return alert('返流项目需选中单个项目返流');
    //     this.props.changeView({view:'go_back',param:{state:state,id:this.state.checked[0]}});
    // }

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
    render() {
        let html = this.state.data.map( (obj, index) =>
            <tr key={obj.id} className={obj.state ==  false ? null : 'disabled'}>
                <td>
                    {
                        obj.state == false
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
                <td>{obj.forecast}</td>
                <td>{obj.sign}</td>
                <td>{obj.addition_price}</td>
                <td>{obj.raw_price}</td>
                <td>
                    <span className='e-orange e-pointer' data-index={index} onClick={this.lightboxShow}>{obj.img.length}张</span>
                    &emsp;
                    <b className='photo-btn' data-index={index} onClick={this.uploadShow}>上传图片</b>
                </td>
            </tr>
        );
        return (
         <Window title='质检' onClose={this.props.closeView}>
            <div className='right1'>
                <input type="text" value={this.state.value} onChange={e=>this.setState({value:e.target.value.trim()})} autoFocus={true}  placeholder='请输入或扫描衣物编码'/>                       
                <button className="e-btn hangon-btn" onClick={this.onSearch}>查询</button>
            </div> 
            <div className='clean'>
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
                        <button type='button' className='e-btn confirm' onClick={this.handleCleaned}>已{word}</button>
                        &emsp;
                        {/* <button type='button' className='e-btn confirm' onClick={this.goBack}>返流</button> */}
                    </div>                   
                </div>              
            </div>
        </Window>
        );
    }
}
