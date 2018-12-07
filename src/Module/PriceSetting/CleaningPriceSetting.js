/**
 * 洗护价格设置
 * @author  ranchong
 */
import React, { Component } from 'react';
import Select from '../../UI/Select';
import Table from '../../UI/Table';
import PhotoGallery from './PhotoGallery/PhotoGallery';
import './CleaningPriceSetting.css';
import './addnewprice.css';
import Dish from '../../UI/Dish';
import ColthesClassifyManagment from '../CommodityManagementDic/ColthesClassifyManagment';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_add:false,    //展示新增组件
            show_mod:false,    //展示修改组件
            show_cate:false,    //展示分类处理
            itemLists:[],      //数据集
            index:0,           //当前分类索引
            data:{},    //商家添加服务项目所需数据总汇,请求接口返回的结果集
            page: 1,
        }
        this.limit = 1000;
        this.handleClick=this.handleClick.bind(this);
        this.onClose=this.onClose.bind(this);
        this.showAdd=this.showAdd.bind(this);
        this.showCate=this.showCate.bind(this);
        this.searchImage = this.searchImage.bind(this);
        this.query=this.query.bind(this);
        this.handleCheckItem = this.handleCheckItem.bind(this);
      
    };  
    componentDidMount() {
        this.query();
        api.post('needInfo', {token:'token'.getData()}, (res, ver, handle) => {
            if (ver) {
                console.log(res);
                res.result.grid.unshift({id:'0', name:'任意格架'});
                this.setState({data:res.result});
            }else{
                handle();
            }
        }); 
    } 
   
    query(){
        let done;
        tool.ui.loading(handle => done = handle);
        api.post(
            'itemList', 
            {token: 'token'.getData(), limit: this.limit, page:this.state.page}, 
            (res, ver) => {
            done();
                if (ver) {
                    console.log(res)
                    this.setState({itemLists:res.result.type});
                }
            },
            ()=>done()
        );
    }
    searchImage(value, callback){
        if ('string' == typeof value && '' != value && 'function' == typeof callback) {
            api.post('itemImage', {token:'token'.getData(), item_name:value}, (res, ver, handle) => {
                if (ver) {
                    let result = res.result;
                    callback({
                        id:res.result.list.getObjectType(0, 'id', String).toString(),
                        url:result.list.getObjectType(0, 'url', String).toString(),
                        count:result.count,
                        list:result.list
                    });
                }else{
                    handle();
                }
            });
        } 
    }
    showCate(){this.setState({show_cate:true});}
    showAdd(){this.setState({show_add:true});}
    handleClick(e){
        this.setState({index:e.target.dataset.index});
    } 
   
    
  
    onClose(){
        this.setState({selectImg:false})
    }

    handleCheckItem(e){
        this.setState({goods_index: (e.target.dataset.index || e.target.parentNode.dataset.index), show_mod:true});     
    }
  
    render() {
        let style = {minWidth:'80px'}
        ,   itemLists = this.state.itemLists.map((item, index)=>
            <div 
                key={'item'+index} 
                data-index={index} 
                data-checked={this.state.index == index ? 'checked' : null}
                onClick={this.handleClick}
            >{item.name}</div>
        );
        let itemList;
        if(
            'undefined' !== typeof this.state.itemLists[this.state.index]
            && 
            'undefined' !== typeof this.state.itemLists[this.state.index].server
        ) {
            itemList = this.state.itemLists[this.state.index].server.map((item,index)=>
                <tr key={'item1'+index} data-index={index} onClick={this.handleCheckItem}> 
                    <td>{item.id}</td>
                    <td>{item.item_name}</td>
                    <td>{item.dispose_type}</td>
                    <td>{item.materials}</td>
                    <td>{item.grade}</td>
                    <td>{item.item_off_price}</td>
                    <td>{item.item_online_price}</td>
                    <td>{item.state==1?'在使用':'不在使用'}</td>                                     
                    <td>{item.transfer==1?'是':'否'}</td>
                    <td>{item.has_discount==1?'是':'否'}</td>
                    <td>{item.cate_name}</td>
                    <td>{item.item_cycle}</td>
                    <td>{item.help_num}</td>
                    <td>{item.grid}</td>
                </tr>
            );  
        }
        return (
            <div className='e-container'>
                <div className='price-setting-btn-area'>
                    <button className='e-btn larger' onClick={this.showCate}>衣物类别管理</button>
                    &emsp;
                    <button className='e-btn larger' onClick={this.showAdd}>+新增洗护价格</button>
                </div >
                <div className='price-setting-box'>
                    <div><section>{itemLists}</section></div>
                    <div>
                        <Table>
                            <thead>
                                <tr>
                                    <th style={style}>id</th>
                                    <th style={style}>衣物名称</th>
                                    <th style={style}>处理类别</th>
                                    <th style={style}>材料</th>
                                    <th style={style}>档次</th>
                                    <th style={style}>线下价格</th>
                                    <th style={style}>线上价格</th>
                                    <th style={style}>在线接单</th>
                                    <th style={style}>价格可调</th>
                                    <th style={style}>允许折扣</th>
                                    <th style={style}>衣物类别</th>
                                    <th style={style}>洗护周期</th>
                                    <th style={style}>助记码</th>
                                    <th style={style}>格架</th>
                                </tr>
                            </thead>
                            <tbody>{itemList}</tbody>
                        </Table>    
                    </div>  
                </div>
                {
                    this.state.show_add
                    && 
                    <Add 
                        data={this.state.data}
                        searchImage={this.searchImage}
                        query={this.query}
                        onClose={() => this.setState({show_add:false})}
                    />
                }
                {
                    this.state.show_mod
                    &&
                    <Mod 
                        onClose={() => this.setState({show_mod:false})}
                        index={this.state.index}
                        searchImage={this.searchImage}
                        goods_index={this.state.goods_index}
                        data={this.state.data}
                        itemLists={this.state.itemLists}
                        query={this.query} 
                    />
                }
                {this.state.show_cate && <ColthesClassifyManagment onClose={()=>this.setState({show_cate:false})} refresh={this.query}/>}
            </div>
        );
    }
}
 export class Add extends Component {
    constructor(props) {
        super(props);
        this.state={
            item_name: '',   //衣物名称
            image_url: '',   //图片地址
            image_id: '',    //图片id
            show:false,
            cate_index:0,    //分类索引
            dispose_index:0,    //处理类别索引
            grade_index:0,    //档次索引
            materials_index:0,    //材料索引
            grid_index:0,    //搁架索引
            help_num:'',//助记码
            item_off_price:'',//线下价格
            online:1,//在线接单
            has_discount:1,//允许折扣
            transfer:1,//价格可调
            min_discount:'0',//折扣下限
            min_transfer:'0',//可调下限
            item_cycle: '',//洗护周期
            item_online_price:'',//线上价格
            image_id:'',//图片id
            image_url:'',//图片url
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;
        this.setState({item_name:value});
        this.props.searchImage(value, obj => this.setState({image_id:obj.id, image_url:obj.url}));
    }
    handleAdd(){
        if(''==this.state.item_name) return tool.ui.error({msg:'衣物名称不能为空！',callback:close => close()});
        if(''==this.state.item_cycle) return tool.ui.error({msg:'洗护周期不能为空！',callback:close => close()});
        if(''==this.state.item_off_price) return  tool.ui.error({msg:'线下价格不能为空！',callback:close => close()});
        // if(this.state.min_discount.number) return tool.ui.error({msg:'折扣下限只能输入数字！',callback:close => close()});
        // if(this.state.min_transfer.number) return tool.ui.error({msg:'调节下限只能输入数字！',callback:close => close()});
        let grid = this.props.data.grid.getObjectType(this.state.grid_index, 'name', String).toString();
        if ('任意格架' == grid) {
            grid = 'X';
        }
        let params={
            token:'token'.getData(),
            cate_id:this.props.data.cate_type.getObjectType(this.state.cate_index, 'id', String).toString(),
            cate_name:this.props.data.cate_type.getObjectType(this.state.cate_index, 'name', String).toString(),
            dispose_type:this.props.data.dispose_type.getObjectType(this.state.dispose_index, 'name', String).toString(),
            item_name:this.state.item_name,
            item_off_price:this.state.item_off_price,
            grade:this.props.data.grade.getObjectType(this.state.grade_index, 'grade', String).toString(),
            materials:this.props.data.materials.getObjectType(this.state.materials_index, 'name', String).toString(),
            help_num:this.state.help_num,
            grid:grid,
            // state: this.state.online,//是否在线
            transfer:this.state.transfer,
            has_discount:this.state.has_discount,
            min_discount:this.state.min_discount,
            item_cycle:this.state.item_cycle,
            item_online_price:this.state.item_online_price,
            image_id:this.state.image_id,
            min_transfer:this.state.min_transfer
        }
        api.post('addItem', params, (res, ver,handle) => {         
            if (ver) {
                this.props.query();
                this.props.onClose();
            }  
            handle();
        });
    }
    render() {
        return (
            <Dish title='新增洗护价格' onClose={this.props.onClose} width="690" height="475">
                <div className="addnewprice-one">
                    <div className="addnewprice-one-left">
                        <div>
                            <span><i>*</i> 衣物类别：</span>
                            <Select 
                                option={this.props.data.cate_type} 
                                pair={['id', 'name']} 
                                onChange={obj => this.setState({cate_index:obj.index})} 
                                value={this.props.data.cate_type.getObjectType(this.state.cate_index, 'name', String).toString()}
                            />
                        </div>
                        <div>
                            <span><i>*</i> 衣物名称：</span>
                            <input className='e-input' type="text"  onChange={this.handleChange} value={this.state.item_name}/>
                        </div>
                        <div>
                            <span>处理类别：</span>
                            <Select 
                                option={this.props.data.dispose_type} 
                                pair={['id', 'name']} 
                                onChange={obj => this.setState({dispose_index:obj.index})}
                                value={this.props.data.dispose_type[this.state.dispose_index].name}
                            />
                        </div>
                        <div>
                            <span>档次：</span>
                            <Select 
                                option={this.props.data.grade} 
                                pair={['id', 'grade']} 
                                onChange={obj => this.setState({grade_index:obj.index})}
                                value={this.props.data.grade[this.state.grade_index].grade}
                            />
                        </div>
                        <div>
                            <span>材料：</span>
                            <Select 
                                option={this.props.data.materials} 
                                pair={['id', 'name']} 
                                onChange={obj => this.setState({materials_index:obj.index})} 
                                value={this.props.data.materials[this.state.materials_index].name}
                            />
                        </div>
                        <div>
                            <span><i>*</i> 洗护周期：</span>
                            <input
                                className='e-input'
                                style={{width:'146px'}}
                                type="number"
                                value={this.state.item_cycle}
                                onChange={e => this.setState({item_cycle:e.target.value})}
                            />&nbsp;天
                        </div>
                        <div>
                            <span>助记码：</span>
                            <input
                                className='e-input'
                                type="text"
                                value={this.state.help_num}
                                onChange={e => this.setState({help_num:e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="addnewprice-one-right">
                        <img src={this.state.image_url}></img>
                        <button className="e-btn" onClick={()=>this.setState({show:true})}>修改图片</button>
                    </div>
                    <div className="addnewprice-one-bootom" id="addnewprice-one-bootom">
                        <div>
                            <span><i>*</i> 格架：</span>
                            <Select 
                                option={this.props.data.grid} 
                                pair={['id', 'name']} 
                                onChange={obj => this.setState({grid_index:obj.index})}
                                value={this.props.data.grid[this.state.grid_index].name}
                            />
                        </div>                         
                    </div>
                    
                </div>
                <div className="addnewprice-two">
                    <div><span><i>*</i> 线下价格：</span><input className='e-input addnewprice-input' type="text" value={this.state.item_off_price} onChange={e=>this.setState({item_off_price:e.target.value,item_online_price:e.target.value})}/>元</div>
                    <div><span>折扣下限：</span><input className='e-input addnewprice-input' type="text" value={this.state.min_discount} onChange={e=>this.setState({min_discount:e.target.value})}/>%</div>
                    <div><span>线上价格： </span><input className='e-input addnewprice-input' type="text" value={this.state.item_online_price} onChange={e=>this.setState({item_online_price:e.target.value})}/>元</div>
                    <div><span>调价下限：</span><input className='e-input addnewprice-input' type="text" value={this.state.min_transfer} onChange={e=>this.setState({min_transfer:e.target.value})}/>元</div>
                    <div className="add-select-part" id="add-select-part"> 
                        {/* <div><input type="checkbox" checked={this.state.online == 1 ? true : false} onChange={e => this.setState({ online: e.target.checked ? 1 : 0 })} />在线接单</div> */}
                        <div><input type="checkbox" checked={this.state.has_discount == 1 ? true : false} onChange={e=>this.setState({has_discount:e.target.checked?1:0})} />允许折扣</div>
                        <div><input type="checkbox" checked={this.state.transfer == 1 ? true : false} onChange={e=>this.setState({transfer:e.target.checked?1:0})} />价格可调</div>
                    </div>
                </div>
                
                <div className="addnewprice-btn">
                    <button className="e-btn" onClick={this.handleAdd}>确定</button>
                    <button className="e-btn-b" onClick={()=>this.setState({show:false})}>取消</button>
                </div>
                {
                    this.state.show
                    &&
                    <PhotoGallery
                        onClose={() => this.setState({show:false})}
                        item_name={this.state.item_name}
                        callback={(id,url) => this.setState({image_id:id,image_url:url})}
                    />
                }
            </Dish>
        );
    }
}
export class Mod extends Component {
    constructor(props) {
        super(props);
        let goods = tool.clone(this.props.itemLists[this.props.index].server[this.props.goods_index]);
        for (let k in goods) {
            if (null == goods[k]) {
                goods[k] = '';
            }
        }
        this.state={
            item_name: goods.item_name,//衣物名称
            cate_name:goods.cate_name,//衣物类别
            disposetype:goods.dispose_type,//处理类别
            item_off_price:goods.item_off_price,//线下价格
            // online:1,//在线接单
            has_discount:goods.has_discount,//允许折扣
            transfer:goods.transfer,//价格可调
            min_discount:goods.min_discount,//折扣下限
            min_transfer:goods.min_transfer,//可调下限
            gradename:goods.grade,//档次
            help_num:goods.help_num,//助记码
            materialsname:goods.materials,//材料名称
            goods_index:this.props.goods_index,
            item_cycle: goods.item_cycle,//洗护周期
            item_online_price:goods.item_online_price,//线上价格
            gridname:goods.grid,//格架名称
            image_id:goods.image_id,//图片id
            image_url:goods.image_url,//图片url
            id:goods.id,//服务id
            cate_id:goods.cate_id,//衣物类别id
        }
        this.modYES = this.modYES.bind(this);
        this.onchange = this.onchange.bind(this);
        this.deleteYES = this.deleteYES.bind(this);
    }
    deleteYES(){
        api.post('delItem', {
                token:'token'.getData(),
                id:this.state.id,
        }, (res, ver,handle) => {           
                if (ver && res) {
                    console.log(res)
                    this.props.query();
                    'function' == typeof this.props.onClose && this.props.onClose();
                }
                   handle();
            }
        )
    }

    onchange(value){
        this.setState({
            catetype_index:value.index,
            cate_id:value.key,
            cate_name:value.value
        })
    }
    modYES(){
        if(''==this.state.item_name) return tool.ui.error({msg:'衣物名称不能为空！',callback:close => close()});
        if(''==this.state.item_cycle) return tool.ui.error({msg:'洗护周期不能为空！',callback:close => close()});
        if(''==this.state.item_off_price) return  tool.ui.error({msg:'线下价格不能为空！',callback:close => close()});
        // if(this.state.min_discount.number) return tool.ui.error({msg:'折扣下限只能输入数字！',callback:close => close()});
        // if(this.state.min_transfer.number) return tool.ui.error({msg:'调节下限只能输入数字！',callback:close => close()});
        let mod={
            token:'token'.getData(),
            id:this.state.id,
            cate_id:this.state.cate_id,
            cate_name:this.state.cate_name||'',
            dispose_type:this.state.disposetype||'',
            item_name:this.state.item_name,
            item_off_price:this.state.item_off_price,
            grade:this.state.gradename||'',
            materials:this.state.materialsname||'',
            grid:this.state.gridname=='任意格架'?'X':this.state.gridname||'',
            help_num:this.state.help_num,
            // state: this.state.online,//是否在线
            transfer:this.state.transfer,
            has_discount:this.state.has_discount,
            min_discount:this.state.min_discount,
            item_cycle:this.state.item_cycle,
            item_online_price:this.state.item_online_price,
            image_id:this.state.image_id,
            min_transfer:this.state.min_transfer
        }
        console.log(mod)
        api.post('modItem',mod, (res, ver,handle) => {
            if (ver && res) {
                console.log(res) 
                this.props.query();
                'function' == typeof this.props.onClose && this.props.onClose();
            }
            handle();
        });    
    }
   
    render() {

        return (
            <Dish title='编辑洗护价格' onClose={this.props.onClose} width="690" height="475">
                <div className="addnewprice-one">
                    <div className="addnewprice-one-left">
                        <div><span><i>*</i>衣物类别：</span><Select option={this.props.data.cate_type} pair={['id', 'name']} selected={this.state.cate_name} onChange={this.onchange} value={this.state.cate_name}/></div>
                        <div><span><i>*</i>衣物名称：</span><input className='e-input' type="text"  onChange={e=>this.setState({item_name:e.target.value})} value={this.state.item_name}/></div>
                        <div><span>处理类别：</span><Select option={this.props.data.dispose_type} pair={['id', 'name']} selected={this.state.disposetype==null||this.state.disposetype==''?'无':this.state.disposetype} onChange={value => this.setState({disposetype:value.value})} value={this.state.disposetype==null||this.state.disposetype==''?'无':this.state.disposetype}/></div>
                        <div><span>档次：</span><Select option={this.props.data.grade} pair={['id', 'grade']} selected={this.state.gradename==null||this.state.gradename==''?'无':this.state.gradename} onChange={value => this.setState({gradename:value.value})} value={this.state.gradename==null||this.state.gradename==''?'无':this.state.gradename}/></div>
                        <div><span>材料：</span><Select option={this.props.data.materials} pair={['id', 'name']} selected={this.state.materialsname==null||this.state.materialsname==''?'无':this.state.materialsname} onChange={value => this.setState({materialsname:value.value})} value={this.state.materialsname==null||this.state.materialsname==''?'无':this.state.materialsname}/></div>
                        <div><span><i>*</i>洗护周期：</span><input className='e-input' style={{width:'146px'}} type="number" value={this.state.item_cycle} onChange={e=>this.setState({item_cycle:e.target.value})}/>天</div>
                        <div><span>助记码：</span><input className='e-input' type="text" value={this.state.help_num} onChange={e=>this.setState({help_num:e.target.value})}/></div>
                    </div>
                    <div className="addnewprice-one-right">
                        <img src={this.state.image_url}></img>
                        <button className="e-btn" onClick={()=>this.setState({selectImg:true})}>修改图片</button>
                    </div>
                    <div className="addnewprice-one-bootom" id="addnewprice-one-bootom">
                        <div>
                        <span><i>*</i>格架：</span><Select option={this.props.data.grid} pair={['id', 'name']} selected={this.state.gridname}  onChange={value=>this.setState({ gridname:value.value})} value={(this.state.gridname==null || this.state.gridname=='X')?'任意格架':this.state.gridname}/>
                        </div>
                
                    </div>
                </div>
                <div className="addnewprice-two">
                    <div><span><i>*</i>线下价格：</span><input className='e-input addnewprice-input' type="number" value={this.state.item_off_price} onChange={e=>this.setState({item_off_price:e.target.value})}/>元</div>
                    <div><span>折扣下限：</span><input className='e-input addnewprice-input' type="number" value={this.state.min_discount} onChange={e=>this.setState({min_discount:e.target.value})}/>%</div>
                    <div><span>线上价格：</span><input className='e-input addnewprice-input' type="number" value={this.state.item_online_price} onChange={e=>this.setState({item_online_price:e.target.value})}/>元</div>                           
                    <div><span>调节下限：</span><input className='e-input addnewprice-input' type="number" value={this.state.min_transfer} onChange={e=>this.setState({min_transfer:e.target.value})}/>元</div>
                    <div className="add-select-part" id="add-select-part">
                            {/* <div><input type="checkbox" checked={this.state.online == 1 ? true : false} onChange={e=>this.setState({online:e.target.checked?1:0})} />在线接单</div> */}
                            <div><input type="checkbox" checked={this.state.has_discount == 1 ? true : false} onChange={e=>this.setState({has_discount:e.target.checked?1:0})} />允许折扣</div>
                            <div><input type="checkbox" checked={this.state.transfer == 1 ? true: false} onChange={e=>this.setState({transfer:e.target.checked?1:0})} />价格可调</div>
                    </div>
                </div>
                
                
                <div className="addnewprice-btn">
                    <button className="e-btn" onClick={this.modYES}>确定</button>
                    <button className="e-btn" onClick={this.deleteYES}>删除</button>
                    <button className="e-btn-b" onClick={this.props.onClose}>取消</button>
                </div>
            </Dish>
        );
    }
 
}
