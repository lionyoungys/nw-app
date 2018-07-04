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
import ColthesClassifyManagment from '../CommodityManagementDic/ColthesClassifyManagment';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            show1:false,
            requestHave:false,//记录是否已请求过数据
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
            page: 1,

            catetype_index: 0,
            item_name: '',//衣物名称
            cate_name:'',//衣物类别
            disposetype:'',//处理类别
            item_off_price:'',//线下价格
            online:0,//在线接单
            has_discount:1,//允许折扣
            transfer:1,//价格可调
            min_discount:'',//折扣下限
            gradename:'',//档次
            materialsname:'',//材料名称
            goodindex:0,
            item_cycle: '',//洗护周期
            item_online_price:'',//线上价格
            gridname:'',//格架名称
            image_id:'',//图片id
            image_url:'',//图片url
            server_id:'',//服务id
            cate_id:'',//衣物类别id
        }
        this.limit = 1000;
        this.handleClick=this.handleClick.bind(this);
        this.onClose=this.onClose.bind(this);
        this.addcheanprice=this.addcheanprice.bind(this);
        this.clothestypemanage=this.clothestypemanage.bind(this);
        this.addYES=this.addYES.bind(this); 
        this.deleteYES=this.deleteYES.bind(this);
        this.modYES=this.modYES.bind(this);
        this.handle=this.handle.bind(this);
        this.onchange=this.onchange.bind(this);
    };   
    clothestypemanage(){
        this.setState({clothestypemanageshow:true});
    }
    request(){
        if (this.state.requestHave) return;//请求国数据无需多次调用
        api.post('needInfo', {
            token:'token'.getData()
        }, (res, ver, handle) => {
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
                    grids:res.result.grid,
                    requestHave:true,
                })
            }else{
                handle();
            }
        });   
    }
    addcheanprice(){
        this.setState({show:true});
        this.request(); 
        this.setState({
            item_name: '',//衣物名称
            item_cycle: '',//洗护周期
            item_off_price: '',//线下价格
            min_discount: '',//折扣下限
            item_online_price: '',//线上价格
            image_id: '',//图片id
            image_url: '',//图片url
            online: 0,//在线接单
            has_discount: 1,//允许折扣
            transfer: 1,//价格可调
        })
    }
    handleClick(e){
        console.log(e)
        this.setState({index:e.target.dataset.index});
    } 
    modYES(){
        if(''==this.state.item_name) return tool.ui.error({msg:'衣物名称不能为空！',callback:close => close()});
        if(''==this.state.item_cycle) return tool.ui.error({msg:'洗护周期不能为空！',callback:close => close()});
        if(''==this.state.item_off_price) return  tool.ui.error({msg:'线下价格不能为空！',callback:close => close()});
        let mod={
            token:'token'.getData(),
            id:this.state.server_id,
            cate_id:this.state.cate_id,
            cate_name:this.state.cate_name,
            dispose_type:this.state.disposetype,
            item_name:this.state.item_name,
            item_off_price:this.state.item_off_price,
            grade:this.state.gradename,
            materials:this.state.materialsname,
            grid:this.state.gridname,
            state: this.state.online,//是否在线
            transfer:this.state.transfer,
            has_discount:this.state.has_discount,
            min_discount:this.state.min_discount,
            item_cycle:this.state.item_cycle,
            item_online_price:this.state.item_online_price,
            image_id:this.state.image_id
        }
        console.log(mod)
        api.post('modItem',mod, (res, ver) => {
            if (ver && res) {
                console.log(res)
                tool.ui.success({callback:(close, event) => {
                    close();
                }}); 
            }else{
                tool.ui.error({msg:res.msg,callback:(close, event) => {
                    close();
                }});
            }
        }
    ); 
    }
    addYES(){
        // console.log(this.state.cate_types[this.state.catetype_index].id);
        if(''==this.state.item_name) return tool.ui.error({msg:'衣物名称不能为空！',callback:close => close()});
        if(''==this.state.item_cycle) return tool.ui.error({msg:'洗护周期不能为空！',callback:close => close()});
        if(''==this.state.item_off_price) return  tool.ui.error({msg:'线下价格不能为空！',callback:close => close()});
       
        let params={
            token:'token'.getData(),
            cate_id:this.state.cate_id,
            cate_name:this.state.cate_name,
            dispose_type:this.state.disposetype,
            item_name:this.state.item_name,
            item_off_price:this.state.item_off_price,
            grade:this.state.gradename,
            materials:this.state.materialsname,
            grid:this.state.gridname,
            state: this.state.online,//是否在线
            transfer:this.state.transfer,
            has_discount:this.state.has_discount,
            min_discount:this.state.min_discount,
            item_cycle:this.state.item_cycle,
            item_online_price:this.state.item_online_price,
            image_id:this.state.image_id
        }
        console.log(params)
        api.post('addItem', params, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.componentDidMount();
                tool.ui.success({callback:(close, event) => {
                    close();
                }}); 
            }else{
                tool.ui.error({msg:res.msg,callback:(close, event) => {
                    close();
                }});
            }
        });
    }
    
    deleteYES(){
        api.post('delItem', {
            token:'token'.getData(),
            id:this.state.server_id,
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.componentDidMount();
                tool.ui.success({callback:(close, event) => {
                    close();
                }}); 
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
            token:'token'.getData(),
            page: this.state.page, 
            limit: this.limit
    }, (res, ver) => { 
            if (ver && res) {
                console.log(res)
                this.setState({itemLists:res.result.type,type:res.result.type.typeArray('name'),})
            }
        });   
    }
    onClose(){
        this.setState({selectImg:false})
    }
    handle(e){

        this.request();
        console.log(e.target.dataset.index || e.target.parentNode.dataset.index);
        let good_index=e.target.dataset.index || e.target.parentNode.dataset.index;
        let good = this.state.itemLists[this.state.index].server[good_index];
        this.setState(
            {
                goodindex: good_index,
                show1:true,
                server_id: good.id,
                cate_id: good.cate_id,
                item_name: good.item_name,
                item_cycle: good.item_cycle,
                item_off_price: good.item_off_price,
                min_discount: good.min_discount,
                item_online_price: good.item_online_price,
                cate_name: good.cate_name,
                disposetype: good.dispose_type,
                gradename: good.grade,
                materialsname: good.materials,
                gridname: good.grid,
                image_url: good.image_url,
                online: good.state,//在线接单
                transfer: good.transfer,//价格可调
                has_discount:good.has_discount,//允许折扣
            });     
    }

    onchange(value){
        console.log(this.state.cate_types[value.inObjArray(this.state.cate_types, 'name')].id)
        this.setState({
            catetype_index:value.inObjArray(this.state.cate_type, 'name'),
            cate_id:this.state.cate_types[value.inObjArray(this.state.cate_types, 'name')].id,
            cate_name:value
        })
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
                    <td>{item.state==1?'在使用':'不在使用'}</td>
                    <td>{item.transfer==1?'是':'否'}</td>
                    <td>{item.has_discount==1?'是':'否'}</td>
                    <td>{item.cate_name}</td>
                    <td>{item.item_cycle}</td>
                    <td>{item.grid}</td>
                </tr>
            );  
        }
        return (
            <div className='cleaning_price_all'>
                <div className="cleaning_price_set_btn">
                    <button className='e-btn middle' onClick={this.clothestypemanage}>衣物类别管理</button>
                    <button className='e-btn middle' onClick={this.addcheanprice}>+新增洗护价格</button>
                </div >
                <div className='cleaning_price_set_left_table_div'>
                    <div className='cleaning_price_set_left_table'>
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
                                <div><span><i>*</i> 衣物类别：</span><Select option={this.state.cate_type} onChange={this.onchange} /></div>
                                <div><span><i>*</i> 衣物名称：</span><input className='e-input addnewprice-input-long' type="text"  onChange={e=>this.setState({item_name:e.target.value})}/></div>
                                <div><span>处理类别：</span><Select option={this.state.dispose_type} onChange={value => this.setState({disposetype:value})} /></div>
                                <div><span>档次：</span><Select option={this.state.grade} onChange={value => this.setState({gradename:value})} /></div>
                                <div><span>材料：</span><Select option={this.state.materials} onChange={value => this.setState({materialsname:value})} /></div>
                                <div><span><i>*</i> 洗护周期：</span><input className='e-input addnewprice-input' type="text" value={this.state.item_cycle} onChange={e=>this.setState({item_cycle:e.target.value})}/>天</div>
                            </div>
                            <div className="addnewprice-one-right">
                                <img src={this.state.image_url}></img>
                                <button className="e-btn" onClick={()=>this.setState({selectImg:true})}>修改图片</button>
                            </div>
                            <div className="addnewprice-one-bootom">
                                <div>
                                <span><i>*</i> 格架：</span><Select option={this.state.grid} selected='任意格架' onChange={value=>this.setState({ gridname:value})}/>
                                </div>
                          
                            </div>
                        </div>

                        <div className="addnewprice-two">
                            <div><span><i>*</i> 线下价格：</span><input className='e-input addnewprice-input' type="text" value={this.state.item_off_price} onChange={e=>this.setState({item_off_price:e.target.value,item_online_price:e.target.value})}/>元</div>
                            <div><span>折扣下限：</span><input className='e-input addnewprice-input' type="text" value={this.state.min_discount} onChange={e=>this.setState({min_discount:e.target.value})}/>%</div>
                            <div><span>线上价格：
                                </span><input className='e-input addnewprice-input' type="text" value={this.state.item_online_price} onChange={e=>this.setState({item_online_price:e.target.value})}/>元
                                    <div className="add-select-part"> 
                                        {/* <div><input type="checkbox"  onChange={e=>this.setState({online:e.target.checked?1:0})}/>在线接单</div> */}
                                    <div><input type="checkbox" checked={this.state.online == 1 ? true : false} onChange={e => this.setState({ online: e.target.checked ? 1 : 0 })} />在线接单</div>
                                        <div><input type="checkbox" checked={this.state.has_discount == 1 ? true : false} onChange={e=>this.setState({has_discount:e.target.checked?1:0})} />允许折扣</div>
                                        <div><input type="checkbox" checked={this.state.transfer == 1 ? true : false} onChange={e=>this.setState({transfer:e.target.checked?1:0})} />价格可调</div>
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
                                <div><span><i>*</i>衣物类别：</span><Select option={this.state.cate_type} selected={this.state.cate_name} onChange={value => this.setState({catetype_index:value.inObjArray(this.state.cate_type, 'name')})} /></div>
                                <div><span><i>*</i>衣物名称：</span><input className='e-input addnewprice-input-long' type="text"  onChange={e=>this.setState({item_name:e.target.value})} value={this.state.item_name}/></div>
                                <div><span>处理类别：</span><Select option={this.state.dispose_type}  selected={this.state.disposetype} onChange={value => this.setState({disposetype:value})} /></div>
                                <div><span>档次：</span><Select option={this.state.grade} selected={this.state.gradename} onChange={value => this.setState({gradename:value})} /></div>
                                <div><span>材料：</span><Select option={this.state.materials} selected={this.state.materialsname} onChange={value => this.setState({materialsname:value})} /></div>
                                <div><span><i>*</i>洗护周期：</span><input className='e-input addnewprice-input' type="text" value={this.state.item_cycle} onChange={e=>this.setState({item_cycle:e.target.value})}/>天</div>
                            </div>
                            <div className="addnewprice-one-right">
                                <img src={this.state.image_url}></img>
                                <button className="e-btn" onClick={()=>this.setState({selectImg:true})}>修改图片</button>
                            </div>
                            <div className="addnewprice-one-bootom">
                                <div>
                                <span><i>*</i>格架：</span><Select option={this.state.grid} selected={this.state.gridname}  onChange={value=>this.setState({ gridname:value})}/>
                                </div>
                          
                            </div>
                        </div>

                        <div className="addnewprice-two">
                            <div><span><i>*</i>线下价格：</span><input className='e-input addnewprice-input' type="text" value={this.state.item_off_price} onChange={e=>this.setState({item_off_price:e.target.value})}/>元</div>
                            <div><span>折扣下限：</span><input className='e-input addnewprice-input' type="text" value={this.state.min_discount} onChange={e=>this.setState({min_discount:e.target.value})}/>%</div>
                            <div><span>线上价格：
                                </span><input className='e-input addnewprice-input' type="text" value={this.state.item_online_price} onChange={e=>this.setState({item_online_price:e.target.value})}/>元
                                    <div className="add-select-part">
                                        <div><input type="checkbox" checked={this.state.online == 1 ? true : false} onChange={e=>this.setState({online:e.target.checked?1:0})} />在线接单</div>
                                    <div><input type="checkbox" checked={this.state.has_discount == 1 ? true : false} onChange={e=>this.setState({has_discount:e.target.checked?1:0})} />允许折扣</div>
                                    <div><input type="checkbox" checked={this.state.transfer == 1 ? true: false} onChange={e=>this.setState({transfer:e.target.checked?1:0})} />价格可调</div>
                                    </div>
                            </div>
                        </div>
                        <div className="addnewprice-btn">
                            <button className="e-btn" onClick={this.deleteYES}>删除</button>
                            <button className="e-btn" onClick={()=>this.setState({show1:false})}>取消</button>
                            <button className="e-btn" onClick={this.modYES}>确定</button>
                        </div>
                    </Window>
                }
                    {
                        this.state.selectImg && <PhotoGallery onClose={this.onClose} callback={(id,url) => this.setState({image_id:id,image_url:url})}/>
                    }
                    {
                        this.state.clothestypemanageshow&&<ColthesClassifyManagment onClose={()=>this.setState({clothestypemanageshow:false})}/>
                    }
            </div>
            // </Window>
        );
    }
}