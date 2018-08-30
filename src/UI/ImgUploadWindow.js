/**
 * 图片上传窗口组件
 * @author Edwin Young
 * @desc onClose:窗口关闭事件;onDelete(图片地址, 图片索引):删除事件;onUpload(文件流对象):文件上传事件;imgs:包含图片url的一维数组
 */
import React from 'react';
import Window from './Window';
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
    onUpload(e) {'function' === typeof this.props.onUpload && this.props.onUpload(fs.createReadStream(e.target.value));}

    render() {
        return (
            <Window title='图片上传' onClose={this.props.onClose} width='350' height='350'>
                <div className='ui-img-upload-window'>
                    {(this.props.imgs || []).map((obj, index) =>
                        <div key={obj + '_' + index}>
                            <i onClick={this.onDelete} data-index={index} data-url={obj}></i>
                            <img src={obj}/>
                        </div>
                    )}
                    <div className='ui-img-upload-window-add'>
                        <input type='file' onChange={this.onUpload} accept='.jpg,.jpeg,.png,.bmp'/>
                    </div>
                </div>
            </Window>
        );
    }
}