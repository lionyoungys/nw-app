/**
 * 烘干界面组件
 * @author yangyunlong
 */

import React from 'react';
// import Search from '../UI/search/App';
import Window from '../../UI/Window';
import OptionBox from '../../Elem/OptionBox';        //新增
import ImageLightbox from '../../Elem/ImageLightbox';   //新增
import UploadToast from '../UI/upload-toast/App';    //新增
const state = 50, word = '烘干';

export default class extends React.Component {
    constructor(props) {
        super(props);
        // this.props.onRef(this);
        this.state = {
            value:'',
            data:[],
            checked:[],
            all:false,
            loading:null,
            uploadShow:false,
            lightboxShow:false,
            index:null
        };
        this.onSearch = this.onSearch.bind(this);
        this.handleAllChecked = this.handleAllChecked.bind(this);
        this.handleCleaned = this.handleCleaned.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.query = this.query.bind(this);
        this.goBack = this.goBack.bind(this);
        this.upload = this.upload.bind(this);
        this.delete = this.delete.bind(this);
        this.uploadShow = this.uploadShow.bind(this);
        this.lightboxShow = this.lightboxShow.bind(this);
    }

    componentDidMount() {this.query()}
    query() {
        api.post('dry_over', {           
            token:'token'.getData(),
        }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({
                    data:res.result,
                    value:'',
                })
            }
        });
    }

    // 烘干里边通过衣服编码搜索加到烘干目录
    onSearch() {
        api.post('take_dry', {           
            token:'token'.getData(),
            status:state,
            clothing_number:this.state.value
        }, (res, ver) => {
            if (ver && res) {
                this.query();
            }else{
                let index = this.state.value.inObjectArray(this.state.data, 'clothing_number');
                if (-1 != index) {
                    if (this.state.data[index].assist == 1) return;
                    let index2 = this.state.data[index].id.inArray(this.state.checked);
                    if (-1 === index2) {
                        this.state.checked.push(this.state.data[index].id);
                        this.setState({checked:this.state.checked});
                    }
                } else {
                    this.setState({value:''});
                    alert(res.msg);
                }
                this.setState({value:''});
            }
        });
    }

    handleAllChecked(value, checked) {
        if (checked) {
            this.setState({checked:[],all:false});
        } else {
            let data = this.state.data,
                len = data.length,
                checked = [];
            for (let i = 0;i < len;++i) {
                if (data[i].state==false) checked.push(data[i].id);
            }
            this.setState({checked:checked,all:true});
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
    handleCleaned() {
        console.log(this.state.checked)
        if (this.state.checked.length < 1) return;
        api.post('dry_over', {           
            token:'token'.getData(),
            wid:this.state.checked.toString(),
            moduleid:state
        }, (res, ver) => {
            if (ver && res) {
                this.setState({
                    checked:[], 
                    all:'false',
                })
                this.query();
            }else{
                alert(res.msg);
            }
        });
    }
    
    goBack() {
        if (this.state.checked.length != 1) return alert('返流项目需选中单个项目返流');
        this.props.changeView({view:'go_back',param:{state:state,id:this.state.checked[0]}});
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
                    this.state.data[index].tempImages.push(res.data.result);
                     } else {
                        this.state.data[index].tempImages = [res.data.result];
                    }
                     this.state.data[index].image.push(res.data.result);
                    this.setState({data:this.state.data});
            }
        });
    }

    delete(urlIndex) {
        let index = this.state.index,
            url = this.state.data[index].tempImages[index];
            api.post('unload', {           
                token:'token'.getData(),
                item_id:this.state.data[index].id,
                url:url
            }, (res, ver) => {
                if (ver && res) {
                    let realIndex = url.inArray(this.state.data[index].tempImages),
                            realIndex2 = url.inArray(this.state.data[index].image);
                            -1 !== realIndex && this.state.data[index].tempImages.splice(realIndex, 1);
                            -1 !== realIndex2 && this.state.data[index].image.splice(realIndex2, 1);
                            this.setState({data:this.state.data});
                }
            });
    }
    //新增方法
    uploadShow(e) {
        this.setState({uploadShow:true, index:e.target.dataset.index});
    }
    lightboxShow(e) {
        this.setState({lightboxShow:true, index:e.target.dataset.index});
    }

    render() {
        let html = this.state.data.map((obj,index) =>
            <tr key={obj.id} className={obj.assist != 1 ? null : 'disabled'}>
                <td>
                    {
                        obj.assist != 1
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
                <td>{obj.problem}</td>
                <td>{obj.remark}</td>
                <td>{obj.forecast}</td>
                <td>{obj.forecast}</td>
                <td>￥:0.00</td>
                <td>￥:23.00</td>
                <td>
                    <span className='e-orange e-pointer' data-index={index} onClick={this.lightboxShow}>{obj.img.length}张</span>
                    &emsp;
                    <b className='photo-btn' data-index={index} onClick={this.uploadShow}>上传图片</b>
                </td>
            </tr>
        );
        return (
        <Window title='烘干' onClose={this.props.closeView}>
             <div className='right'>
                <input type="text" value={this.state.value} onChange={e=>this.setState({value:e.target.value})} autoFocus={true}  placeholder='请输入或扫描衣物编码'/>                       
                <button className="e-btn hangon-btn" onClick={this.onSearch}>查询</button>
             </div> 
            <div className='clean'>               
                <div className='e-box'>
                    <table className='e-table border'>
                    <thead><tr><th>衣物编码</th><th>名称</th><th>颜色</th><th>瑕疵</th><th>品牌</th><th>洗后预估</th><th>工艺加价</th><th>单价</th><th>上传图片</th></tr></thead>
                        <tbody>{html}</tbody>
                    </table>
                </div>
                <UploadToast
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
                />
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
                        <button type='button' className='e-btn confirm' onClick={this.goBack}>返流</button>
                    </div>                   
                </div>               
            </div> 
        </Window>
        );
    }
}
