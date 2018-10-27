/**
 * 图片上传窗口组件
 * @author Edwin Young
 * @desc onClose:窗口关闭事件;onDelete(图片地址, 图片索引):删除事件;onUpload({path:文件路径, stream:可读的文件流对象}):文件上传事件;imgs:包含图片url的一维数组
 */
import React from 'react';
import Dish from './Dish';
const fs = window.require('fs');

export default class extends React.Component{
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }

    onDelete(e) {    //图片删除事件
        let data = e.target.dataset;
        'function' === typeof this.props.onDelete && this.props.onDelete(data.url, data.index);
    }

    //上传图片事件
    onUpload(e) {
        let path = e.target.value;
        'function' === typeof this.props.onUpload && this.props.onUpload({path:path, stream:fs.createReadStream(path)});
    }

    render() {
        return (
            <Dish title='图片上传' onClose={this.props.onClose} width='348' height='350'>
                <div className='ui-img-upload-window'>
                    {(this.props.imgs || []).map((obj, index) =>
                        <div key={tool.UUID()}>
                            <i onClick={this.onDelete} data-index={index} data-url={obj}></i>
                            <img src={obj}/>
                        </div>
                    )}
                    <div className='ui-img-upload-window-add'>
                        <input type='file' onChange={this.onUpload} accept='.jpg,.jpeg,.png,.bmp'/>
                    </div>
                </div>
            </Dish>
        );
    }
}