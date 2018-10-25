/**
 * 图片库
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../../UI/Window';
import Dish from '../../../UI/Dish'
import './PhotoGallery.css';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            item_name:this.props.item_name,
            list:[],
            count:0,
            index:-1,
            id:''
        }
        this.search=this.search.bind(this);
        this.handleclick=this.handleclick.bind(this);
    };
    componentDidMount() {
        // this.search();
    } 
    search(){
        if(''==this.state.item_name)
        return  tool.ui.error({msg:'请输入图片名称',callback:(close) => {
            close();
        }});
        api.post('itemImage', {
            token:'token'.getData(),
            item_name:this.state.item_name,
            page:1,
            limit:1000
    }, (res, ver,handle) => {
            if (ver && res) {
                console.log(res)
                this.setState({list:res.result.list,count:res.result.count})
            }else{
                handle();
            }
        }
        ); 
      
    }
    handleclick(e){  
        console.log(e.target.dataset.index);
        this.setState({index:e.target.dataset.index,id:e.target.dataset.id});
        'function' === typeof this.props.callback && this.props.callback(e.target.dataset.id,e.target.dataset.url)
        this.props.onClose();
    }
    render() { 
        let list= this.state.list.map((item,index)=>
        <img key={'item'+index} src={item.url} data-index={index} onClick={this.handleclick} 
        data-id={item.id} data-url={item.url}
        className={this.state.index==index?'photo-gal-img-selected':null}></img>
        );
        return (
            <Dish title='图片库' onClose={this.props.onClose} width="535" height="346">
                    <div className='photo-gal'>
                        <div className="photo-gal-head">
                            图片名称：
                            <input className='e-input photo-gal-input' type="text" onChange={e=>this.setState({item_name:e.target.value})} value={this.state.item_name}/>
                            <button className="e-btn" onClick={this.search}>搜索</button>
                        </div>
                        <p>以为您找到<b>{this.state.count}</b>张图片</p>
                        <div className="photo-gal-img">
                            {list}
                        </div>
                    </div>
                </Dish>

        );
    }
}