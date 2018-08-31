/**
 * 送洗界面组件
 * @author yangyunlong
 */

import React from 'react';
import Window from '../../UI/Window';
import Search from '../UI/search/App';
import OptionBox from '../../Elem/OptionBox';        //新增
import ImageLightbox from '../../Elem/ImageLightbox';   //新增
import UploadToast from '../UI/upload-toast/App';    //新增
import Select from '../../UI/Select';
import ImgUploadWindow from '../../UI/ImgUploadWindow';
import './App.css';
const state = 3, word = '清洗';

export default class extends React.Component {
    constructor(props) {
        super(props);
        //this.props.onRef(this);
        this.state = {
            value:'',
            data:[],
            checked:[],
            all:false,
            loading:null,
            //新增state属性
            uploadShow:false,
            lightboxShow:false,
            index:null, 
            selected_shop:[],
            selected_id:''          
        };
        this.onSearch = this.onSearch.bind(this);
        this.handleAllChecked = this.handleAllChecked.bind(this);
        this.handleCleaned = this.handleCleaned.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.query = this.query.bind(this);
        this.upload = this.upload.bind(this);
        this.delete = this.delete.bind(this);
        //新增
        this.uploadShow = this.uploadShow.bind(this);
        this.lightboxShow = this.lightboxShow.bind(this);
        this.select_factory = this.select_factory.bind(this);
    }

    componentDidMount() {this.query();}
    query() {
        api.post('laundry_wash', {           
            token:'token'.getData(),
        }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({
                    data:res.result,
                    value:'',
                    show:false,
                })
            }
        });
    }
    
    // 点击选择要入的工厂
    select_factory (){
        api.post('factory_id', {           
            token:'token'.getData(),
        }, (res, ver) => {
            if (ver && res) {
                console.log(res)    ;
                this.setState({select_shop:res.result.typeArray('mname'), })           
            }
        });
    }
    //通过衣服编码查询操作
    onSearch() { 
        console.log(this.state.value)
        api.post('take_laundry', {           
            token:'token'.getData(),
            status:state,
            clothing_number:this.state.value,
        }, (res, ver) => {
            if (ver && res) {
                tool.ui.success({callback:(close, event) => {
                    close();
                    this.query();
                }});               
            }else{
                let index = this.state.value.inObjectArray(this.state.data, 'clothing_number');
                 if (-1 != index) {
                     if (this.state.data[index].assist == 1 || this.state.data[index].clean_state == 1) return;
                    let index2 = this.state.data[index].id.inArray(this.state.checked);
                 if (-1 === index2) {
                        this.state.checked.push(this.state.data[index].id);
                        this.setState({checked:this.state.checked});
                    }
                 } else {
                    alert(res.msg);
                }
                this.setState({value:''});
            }
        });
    }
    handleAllChecked(value, checked) {
        //console.log(this.state.data.length)
        //console.log(checked); false
        if (checked==false) {
            let data = this.state.data,
                len = data.length,
                checked = [];
            for (let i = 0;i < len;++i) {
                if (data[i].state == false) checked.push(data[i].id);
            }
            this.setState({checked:checked,all:true});
            // this.setState({
            //     checked:[],
            //     all:false
            // });
        } else {
            this.setState({
                checked:[],
                all:false
            });
            // let data = this.state.data,
            //     len = data.length,
            //     checked = [];
            // for (let i = 0;i < len;++i) {
            //     if (data[i].assist == 0 && data[i].clean_state == 0) checked.push(data[i].id);
            // }
            // this.setState({checked:checked,all:true});
        }
    }
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
        //item_cleaned
        //console.log(this.state.checked)
        if(this.state.checked.length < 1) return;
        api.post('take_factory', {  
            wid:this.state.checked.toString(),                   
            token:'token'.getData(),
        }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                if(res.result.state==true){
                    tool.ui.success({callback:(close, event) => {
                        close();
                        this.setState({
                            checked:[],
                            all:false,
                        });
                        this.query();
                    }});                                       
                } 
            }
        });            
    }
    upload(base64, image) {
         let index = this.state.index;
         api.post('item_upload', {                      
            token:'token'.getData(),
            item_id:this.state.data[index].id,
            image:image
         }, (res, ver) => {
            if (ver && res) {
                if (tool.isSet(this.state.data[index].tempImages)) {
                    this.state.data[index].tempImages.push(response.data.result);
                    } else {
                         this.state.data[index].tempImages = [response.data.result];
                        }
                        this.state.data[index].image.push(response.data.result);
                        this.setState({data:this.state.data});
            }
         });       
    }

    delete(url, index) {
        console.log(url, index);
        // let index = this.state.index,
        //     url = this.state.data[index].tempImages[index];
        //  api.post(
        //     'unload', 
        //      {token:this.props.token,item_id:this.state.data[index].id,url:url},
        //      (response, verify) => {
        //          if (verify) {
        //             let realIndex = url.inArray(this.state.data[index].tempImages),
        //                  realIndex2 = url.inArray(this.state.data[index].image);
        //              -1 !== realIndex && this.state.data[index].tempImages.splice(realIndex, 1);
        //              -1 !== realIndex2 && this.state.data[index].image.splice(realIndex2, 1);
        //              this.setState({data:this.state.data});
        //          }
        //     }
        // );
    }
    //新增方法
    uploadShow(e) {
        this.setState({uploadShow:true, index:e.target.dataset.index});
    }
    lightboxShow(e) {
        this.setState({lightboxShow:true, index:e.target.dataset.index});
    }
    // 送洗操作
    handleClick() {   
        console.log(this.state.checked)       
         if (this.state.checked.length < 1) return;
         api.post('wsah_btn', {  
            wid:this.state.checked,                  
            token:'token'.getData(),
        }, (res, ver) => {
            console.log(res)
            if (ver && res) {
               // console.log(res)
                this.setState({
                    checked:[],
                    all:false,
                });
                this.query();
            }else{
                alert(res.msg);
            }
        });
    }
    render() {
        let html = this.state.data.map( (obj, index) =>
            <tr key={obj.id} className={!(obj.assist == 1 || obj.clean_state == 1) ? null : 'disabled'}>
                <td>
                    {
                        !(obj.assist == 1 || obj.clean_state == 1)
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
                <td>{obj.forecast}</td>
                <td>￥:20.00</td>
                <td>￥:0.00</td>
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
                <div className='right out-left'>
                    <input type="text" value={this.state.value} onChange={e => this.setState({value:e.target.value})} autoFocus={true}  placeholder='请输入或扫描衣物编码'/>                       
                    <button className="e-btn hangon-btn" onClick={this.onSearch}>查询</button>
                </div> 
                <div className='right out-right' onClick = {this.select_factory}>
                        选择工厂：<Select  option={this.state.select_shop}  onChange={value => this.setState({selected_id:value=='全部'?'':value})} selected="请选择厂家"/>
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
                            onDelete={this.delete}
                            onUpload={stream => console.log(stream)}
                            imgs={[
                                'http://snltest.oss-cn-beijing.aliyuncs.com/clean/2017/12/08/5a2a4cbc92a221.04314417.png',
                                'http://snltest.oss-cn-beijing.aliyuncs.com/clean/2018/02/24/5a91092a4361e6.52455338.png',
                                'http://snltest.oss-cn-beijing.aliyuncs.com/clean/2018/02/24/5a910919623317.71434187.png',
                            ]}
                        />
                    }
                    {/* <UploadToast
                        show={this.state.uploadShow}
                        images={
                            null !== this.state.index && tool.isSet(this.state.data[this.state.index].tempImages) 
                            ? 
                            this.state.data[this.state.index].tempImages : []
                        }
                        infinite={true}
                        onDelete={this.delete}
                        onChoose={this.upload}
                        onClose={() => this.setState({uploadShow:false})}
                    /> */}
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