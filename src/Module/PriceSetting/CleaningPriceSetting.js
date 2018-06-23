/**
 * 洗护价格设置
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import PhotoGallery from './PhotoGallery/PhotoGallery';
import './CleaningPriceSetting.css';
import './addnewprice.css';
import ColthesClassifyManagment from '../CommodityManagementDic/ColthesClassifyManagment'
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            show1:false,
            // serveTypes:[],
            index:0,
            itemLists:[],
            itemList:[],
            selectImg:false,
            clothestypemanageshow:false,
            cate_type:[],
            cate_types:[],
            dispose_type:[],
            dispose_types:[],
            grade:[],
            grades:[],
            materials:[],
            materialss:[],
            grid:[],
            grids:[],
            item_name:'',
            item_cycle:'',
            catetype_index:0,
            disposetype:'',
            item_off_price:'',//线下价格
            online:false,//在线接单
            has_discount:false,//允许折扣
            transfer:false,//价格可调
            min_discount:'',//最低折扣
            gradename:'',//档次
            materialsname:'',//材料名称
            goodindex:0
        }

        this.handleClick=this.handleClick.bind(this);
        this.onClose=this.onClose.bind(this);
        this.addcheanprice=this.addcheanprice.bind(this);
        this.clothestypemanage=this.clothestypemanage.bind(this);
        this.addYES=this.addYES.bind(this); 
        this.deleteYES=this.deleteYES.bind(this);
        this.handle=this.handle.bind(this);
    };   
    clothestypemanage(){
      
        this.setState({clothestypemanageshow:true});
    }
    request(){
        api.post('needInfo', {
            token:'token'.getData()
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({
                    cate_type:res.result.cate_type.typeArray('name'),
                    cate_types:res.result.cate_type,
                    dispose_type:res.result.dispose_type.typeArray('name'),
                    dispose_types:res.result.dispose_type,
                    grade:res.result.grade.typeArray('grade'),
                    grades:res.result.grade,
                    materials:res.result.materials.typeArray('name'),
                    materialss:res.result.materials,
                    grid:res.result.grid.typeArray('name'),
                    grids:res.result.grid

                })
            }else{
                tool.ui.error({msg:res.msg,callback:(close, event) => {
                    close();
                }});
            }
        }
        ); 
    }
    addcheanprice(){
       this.setState({show:true});
       this.request();  
    }
    handleClick(e){
        console.log(e)
        this.setState({index:e.target.dataset.index});
    } 
    addYES(){
        console.log(this.state.cate_types[this.state.catetype_index].id);
        if(''==this.state.item_name) return tool.ui.error({msg:'衣物名称不能为空！',callback:close => close()});
        if(''==this.state.item_cycle) return tool.ui.error({msg:'洗护周期不能为空！',callback:close => close()});
        api.post('addItem', {
            token:'token'.getData(),
            cate_id:this.state.cate_types[this.state.catetype_index].id,
            cate_name:this.state.cate_types[this.state.catetype_index].name,
            dispose_type:this.state.disposetype,
            item_name:this.state.item_name,
            item_off_price:this.state.item_off_price,
            grade:this.state.gradename,
            materials:this.state.materialsname,
            grid:'',
            transfer:this.state.transfer,
            has_discount:this.state.has_discount,
            min_discount:this.state.min_discount,
            item_cycle:this.state.item_cycle
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                close();
            }else{
                tool.ui.error({msg:res.msg,callback:(close, event) => {
                    close();
                }});
            }
        }
    );
    }
    
    deleteYES(){
        api.post('delItem', {
            token:'token'.getData(),
            id:this.state.itemLists[this.state.goodindex].id,
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                close();
            }else{
                tool.ui.error({msg:res.msg,callback:(close, event) => {
                    close();
                }});
            }
        }
    );
    }
    componentDidMount(){
        api.post('itemList', {
            token:'token'.getData()
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({itemLists:res.result,type:res.result.typeArray('name'),})
            }
        }
        ); 
       
    }
    onClose(){
        this.setState({selectImg:false})
    }
    handle(e){
        console.log(e.target.dataset.index || e.target.parentNode.dataset.index);
        this.setState({goodindex:e.target.dataset.index || e.target.parentNode.dataset.index,show1:true});
        this.request();
        
    }
    render() {
        let itemLists = this.state.itemLists.map((item,index)=>
            <span 
                key={'item'+index} 
                data-index={index} 
                className={this.state.index==index?'selected_row':null}
                onClick={this.handleClick}
            >{item.name}</span>
        );
        let itemList;
        if(
            'undefined' !== typeof this.state.itemLists[this.state.index]
            && 
            'undefined' !== typeof this.state.itemLists[this.state.index].server
        ) {
            itemList = this.state.itemLists[this.state.index].server.map((item,index)=>
                <tr key={'item1'+index} data-index={index} onClick={this.handle}   
                > 
                    <td>{index+1}</td>
                    <td>{item.item_name}</td>
                    <td>{item.dispose_type}</td>
                    <td>{item.materials}</td>
                    <td>{item.grade}</td>
                    <td>{item.item_off_price}</td>
                    <td>{item.item_online_price}</td>
                    <td>{item.item_discount}</td>
                    <td></td>
                    <td></td>
                    <td>{item.has_discount}</td>
                    <td>{item.cate_name}</td>
                    <td>{item.item_cycle}</td>
                    <td>{item.grid}</td>
                </tr>
            );  
        }
        console.log(itemList);
        let gridss;
        if(
            'undefined' !== typeof this.state.grid[this.state.index]
            && 
            'undefined' !== typeof this.state.grids[this.state.index].name
        ) {
            gridss = this.state.grid.map((item,index)=>
                <div key={'item2'+index}><input type="checkbox" onChange={e=>this.setState({discount:e.target.checked})}/>{item}</div>
            );
        }
        return (
            // <Window title='洗护价格设置' onClose={this.props.closeView} >
            <div className='cleaning_price_all'>
                <div className="cleaning_price_set_btn">
                    <button className='e-btn middle' onClick={this.clothestypemanage}>衣物类别管理</button>
                    <button className='e-btn middle' onClick={this.addcheanprice}>+新增洗护价格</button>
                </div >
                <div className='cleaning_price_set_left_table_div'>
                    <div className='cleaning_price_set_left_table'>
                        {/* <span className='selected_row'>外套类</span> */}
                        {itemLists}
                    </div> 
                </div>

                {/* 表格部分 欠费衣物信息*/}

                <table className='change_card_table right_table'>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>衣物名称</td>
                            <td>处理类别</td>
                            <td>材料</td>
                            <td>档次</td>
                            <td>线下价格</td>
                            <td>线上价格</td>
                            <td>折扣率</td>
                            <td>在线接单</td>
                            <td>价格可调</td>
                            <td>允许折扣</td>
                            <td>衣物类别</td>
                            <td>洗护周期</td>
                             <td>格架</td>
                        </tr>
                    </thead>
                    <tbody>
                        {itemList}
                    </tbody>
                </table> 
                {
                    this.state.show
                    &&
                    <Window title='新增洗护价格' onClose={() => this.setState({show:false})} width="648" height="477">
                        <div className="addnewprice-one">
                            <div className="addnewprice-one-left">
                                <div><span><i>*</i>衣物类别：</span><Select option={this.state.cate_type} selected={this.state.cate_type[0]} onChange={value => this.setState({catetype_index:value.inObjArray(this.state.cate_type, 'name')})} /></div>
                                <div><span><i>*</i>衣物名称：</span><input className='e-input addnewprice-input-long' type="text"  onChange={e=>this.setState({item_name:e.target.value})}/></div>
                                <div><span>处理类别：</span><Select option={this.state.dispose_type} selected={this.state.dispose_type[0]} onChange={value => this.setState({disposetype:value})} /></div>
                                <div><span>档次：</span><Select option={this.state.grade} selected={this.state.grade[0]} onChange={value => this.setState({gradename:value})} /></div>
                                <div><span>材料：</span><Select option={this.state.materials} selected={this.state.materials[0]} onChange={value => this.setState({materialsname:value})} /></div>
                                <div><span><i>*</i>洗护周期：</span><input className='e-input addnewprice-input' type="text" value={this.state.item_cycle} onChange={e=>this.setState({item_cycle:e.target.value})}/>天</div>
                            </div>
                            <div className="addnewprice-one-right">
                                <img></img>
                                <button className="e-btn" onClick={()=>this.setState({selectImg:true})}>修改图片</button>
                            </div>
                            <div className="addnewprice-one-bootom">
                                <span><i>*</i>格架：</span>
                                <div className="add-select-part">
                                {gridss}
                                </div>
                            </div>
                        </div>

                        <div className="addnewprice-two">
                            <div><span>线下价格：</span><input className='e-input addnewprice-input' type="text" value={this.state.item_off_price} onChange={e=>this.setState({item_off_price:e.target.value})}/>元</div>
                            <div><span>折扣下限：</span><input className='e-input addnewprice-input' type="text" value={this.state.min_discount} onChange={e=>this.setState({min_discount:e.target.value})}/>%</div>
                            <div><span>线上价格：
                                </span><input className='e-input addnewprice-input' type="text" />元
                                    <div className="add-select-part">
                                        <div><input type="checkbox" onChange={e=>this.setState({online:e.target.checked?0:1})}/>在线接单</div>
                                        <div><input type="checkbox" onChange={e=>this.setState({has_discount:e.target.checked?0:1})}/>允许折扣</div>
                                        <div><input type="checkbox" onChange={e=>this.setState({transfer:e.target.checked?0:1})}/>价格可调</div>
                                    </div>
                            </div>
                        </div>
                        <div className="addnewprice-btn">
                            <button className="e-btn" onClick={()=>this.setState({show:false})}>取消</button>
                            <button className="e-btn" onClick={this.addYES}>确定</button>
                        </div>
                    </Window>

                }
                 {
                    this.state.show1
                    &&
                    <Window title='编辑洗护价格' onClose={() => this.setState({show1:false})} width="648" height="477">
                        <div className="addnewprice-one">
                            <div className="addnewprice-one-left">
                                <div><span><i>*</i>衣物类别：</span><Select option={this.state.cate_type} selected={this.state.cate_type[0]} onChange={value => this.setState({catetype_index:value.inObjArray(this.state.cate_type, 'name')})} /></div>
                                <div><span><i>*</i>衣物名称：</span><input className='e-input addnewprice-input-long' type="text"  onChange={e=>this.setState({item_name:e.target.value})}/></div>
                                <div><span>处理类别：</span><Select option={this.state.dispose_type} selected={this.state.dispose_type[0]} onChange={value => this.setState({disposetype:value})} /></div>
                                <div><span>档次：</span><Select option={this.state.grade} selected={this.state.grade[0]} onChange={value => this.setState({gradename:value})} /></div>
                                <div><span>材料：</span><Select option={this.state.materials} selected={this.state.materials[0]} onChange={value => this.setState({materialsname:value})} /></div>
                                <div><span><i>*</i>洗护周期：</span><input className='e-input addnewprice-input' type="text" value={this.state.item_cycle} onChange={e=>this.setState({item_cycle:e.target.value})}/>天</div>
                            </div>
                            <div className="addnewprice-one-right">
                                <img></img>
                                <button className="e-btn" onClick={()=>this.setState({selectImg:true})}>修改图片</button>
                            </div>
                            <div className="addnewprice-one-bootom">
                                <span><i>*</i>格架：</span>
                                <div className="add-select-part">
                                {gridss}
                                </div>
                            </div>
                        </div>

                        <div className="addnewprice-two">
                            <div><span>线下价格：</span><input className='e-input addnewprice-input' type="text" value={this.state.item_off_price} onChange={e=>this.setState({item_off_price:e.target.value})}/>元</div>
                            <div><span>折扣下限：</span><input className='e-input addnewprice-input' type="text" value={this.state.min_discount} onChange={e=>this.setState({min_discount:e.target.value})}/>%</div>
                            <div><span>线上价格：
                                </span><input className='e-input addnewprice-input' type="text" />元
                                    <div className="add-select-part">
                                        <div><input type="checkbox" onChange={e=>this.setState({online:e.target.checked?0:1})}/>在线接单</div>
                                        <div><input type="checkbox" onChange={e=>this.setState({has_discount:e.target.checked?0:1})}/>允许折扣</div>
                                        <div><input type="checkbox" onChange={e=>this.setState({transfer:e.target.checked?0:1})}/>价格可调</div>
                                    </div>
                            </div>
                        </div>
                        <div className="addnewprice-btn">
                            <button className="e-btn" onClick={this.deleteYES}>删除</button>
                            <button className="e-btn" onClick={()=>this.setState({show1:false})}>取消</button>
                            <button className="e-btn" onClick={this.addYES}>确定</button>
                        </div>
                    </Window>

                }
                {
                    this.state.selectImg && <PhotoGallery onClose={this.onClose}/>
                }
                {
                    this.state.clothestypemanageshow&&<ColthesClassifyManagment onClose={()=>this.setState({clothestypemanageshow:false})}/>
                }
            </div>
            // </Window>
        );
    }
}