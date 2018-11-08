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
            online:1,//在线接单
            has_discount:1,//允许折扣
            transfer:1,//价格可调
            min_discount:'0',//折扣下限
            min_transfer:'0',//可调下限
            gradename:'',//档次
            help_num:'',//助记码
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
        this.query=this.query.bind(this);
        this.search=this.search.bind(this);
    };  
    componentDidMount() {
        this.query();
    } 
    search(e){
        // if(''==this.state.item_name)
        // { }else
        // {
        if(''==e.target.value)
        return;
        this.setState({item_name:e.target.value})
        api.post('itemImage', {
            token:'token'.getData(),
            item_name:e.target.value
    }, (res, ver,handle) => {
            if (ver && res) {
                console.log(res)
                this.setState({list:res.result.list,count:res.result.count,image_url:res.result.list[0].url,image_id:res.result.list[0].id})
            }else{
                handle();
            }
        }
        ); 
    }
    query(){
        let done;
        tool.ui.loading(handle => done = handle);
        api.post('itemList', {
            token: 'token'.getData(),
            limit: this.limit,
            page:this.state.page,
        }, (res, ver) => {
            done();
            if (ver && res) {
                console.log(res)
                this.setState({ itemLists: res.result.type, type: res.result.type.typeArray('name'), })
            }
        },()=>done());
    }
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
                    cate_name:res.result.cate_type[0].name,
                    disposetype:res.result.dispose_type[0].name,
                    gradename:res.result.grade[0].grade,
                    materialsname:res.result.materials[0].name,
                    gridname:res.result.grid[0].name,
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
            console.log(aaaaaaa);
            this.state.grid.push('任意格架')
            this.setState({
            // cate_id:this.state.cate_types[0].id,
            // cate_name:this.state.cate_type[0],
            // disposetype:this.state.dispose_type[0].name,
            // gradename:this.state.grade[0].grade,
            gridname:'X',
            // materialsname:this.state.materials[0].name,
            })
        });   
    }
    addcheanprice(){
        this.setState({show:true});
        this.request(); 
        this.setState({
            item_name: '',//衣物名称
            item_cycle: '',//洗护周期
            item_off_price: '',//线下价格
            min_discount: '0',//折扣下限
            item_online_price: '',//线上价格
            image_id: '',//图片id
            image_url: '',//图片url
            // online: 1,//在线接单
            has_discount: 1,//允许折扣
            transfer: 1,//价格可调
            min_transfer:'0',//可调下线
            disposetype:this.state.dispose_types[0].name,
            gradename:this.state.grade[0].grade,
            materialsname:this.state.materialss[0].name       
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
        // if(this.state.min_discount.number) return tool.ui.error({msg:'折扣下限只能输入数字！',callback:close => close()});
        // if(this.state.min_transfer.number) return tool.ui.error({msg:'调节下限只能输入数字！',callback:close => close()});
        let mod={
            token:'token'.getData(),
            id:this.state.server_id,
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
                this.setState({show1:false});
                this.componentDidMount();
            }
            handle();
        });    
    }
    addYES(){
        // console.log(this.state.cate_types[this.state.catetype_index].id);
        if(''==this.state.item_name) return tool.ui.error({msg:'衣物名称不能为空！',callback:close => close()});
        if(''==this.state.item_cycle) return tool.ui.error({msg:'洗护周期不能为空！',callback:close => close()});
        if(''==this.state.item_off_price) return  tool.ui.error({msg:'线下价格不能为空！',callback:close => close()});
        // if(this.state.min_discount.number) return tool.ui.error({msg:'折扣下限只能输入数字！',callback:close => close()});
        // if(this.state.min_transfer.number) return tool.ui.error({msg:'调节下限只能输入数字！',callback:close => close()});
        let params={
            token:'token'.getData(),
            cate_id:this.state.cate_id == ''?'2035':this.state.cate_id,
            cate_name:this.state.cate_name ==''?'单烫类':this.state.cate_name,
            dispose_type:this.state.disposetype,
            item_name:this.state.item_name,
            item_off_price:this.state.item_off_price,
            grade:this.state.gradename,
            materials:this.state.materialsname,
            help_num:this.state.help_num,
            grid:this.state.gridname=='任意格架'?'X':this.state.gridname,
            // state: this.state.online,//是否在线
            transfer:this.state.transfer,
            has_discount:this.state.has_discount,
            min_discount:this.state.min_discount,
            item_cycle:this.state.item_cycle,
            item_online_price:this.state.item_online_price,
            image_id:this.state.image_id,
            min_transfer:this.state.min_transfer
        }
        console.log(params)
        api.post('addItem', params, (res, ver,handle) => {         
            if (ver && res) {
                console.log(res)
                this.componentDidMount();
                this.setState({show:false});
            }  
            handle();
        });
    }
    
    deleteYES(){
        api.post('delItem', {
                token:'token'.getData(),
                id:this.state.server_id,
        }, (res, ver,handle) => {           
                if (ver && res) {
                    console.log(res)
                    this.componentDidMount();
                    this.setState({show1:false});
                }
                   handle();
            }
        )
    }

    onClose(){
        this.setState({selectImg:false})
    }

    handle(e){
        this.request();
        console.log(e.target.dataset.index || e.target.parentNode.dataset.index);
        let good_index=e.target.dataset.index || e.target.parentNode.dataset.index;
        let good = this.state.itemLists[this.state.index].server[good_index];
        console.log(this.state.index);
        console.log(this.state.goodindex);
        console.log(good.dispose_type);
        console.log(good.grade)
        console.log(good.materials)       
        console.log(good.cate_name);
        this.setState({           
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
                // online: good.state,//在线接单
                transfer: good.transfer,//价格可调
                has_discount:good.has_discount,//允许折扣
                min_transfer:good.min_transfer,//可调下限
            });     
    }
    onchange(value){
        // console.log(this.state.cate_types[value.inObjArray(this.state.cate_types, 'name')].id)
        this.setState({
            catetype_index:value.index,
            cate_id:this.state.cate_types[value.index].id,
            cate_name:value.value
        })
    }
    render() {
        let itemLists = this.state.itemLists.map((item,index)=>
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
                <tr key={'item1'+index} data-index={index} onClick={this.handle}   
                > 
                    <td>{item.id}</td>
                    <td>{item.item_name}</td>
                    <td>{item.dispose_type}</td>
                    <td>{item.materials}</td>
                    <td>{item.grade}</td>
                    <td>{item.item_off_price}</td>
                    <td>{item.item_online_price}</td>
                    <td>{item.item_discount}%</td>
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
            <div className='e-container'>
                <div className='price-setting-btn-area'>
                    <button className='e-btn larger' onClick={this.clothestypemanage}>衣物类别管理</button>
                    &emsp;
                    <button className='e-btn larger' onClick={this.addcheanprice}>+新增洗护价格</button>
                </div >
                <div className='price-setting-box'>
                    <div><section>{itemLists}</section></div>
                    <div>
                        <Table>
                            <thead>
                                <tr><th style={{minWidth:'80px'}}>id</th><th style={{minWidth:'80px'}}>衣物名称</th><th style={{minWidth:'80px'}}>处理类别</th><th style={{minWidth:'80px'}}>材料</th><th style={{minWidth:'80px'}}>档次</th><th
                                style={{minWidth:'80px'}}>线下价格</th><th style={{minWidth:'80px'}}>线上价格</th><th style={{minWidth:'80px'}}>在线接单</th><th
                                style={{minWidth:'80px'}}>价格可调</th>
                                <th style={{minWidth:'80px'}}>允许折扣</th><th
                                style={{minWidth:'80px'}}>衣物类别</th><th style={{minWidth:'80px'
                            }}>洗护周期</th><th
                                style={{minWidth:'80px'}}>助记码</th><th style={{minWidth:'80px'}}>格架</th></tr>
                            </thead>
                            <tbody>
                                {itemList}
                            </tbody>
                        </Table>    
                    </div>  
                </div>
                {
                    this.state.show
                    &&
                    <Dish title='新增洗护价格' onClose={() => this.setState({show:false})} width="690" height="475">
                        <div className="addnewprice-one">
                            <div className="addnewprice-one-left">
                                <div><span><i>*</i> 衣物类别：</span><Select option={this.state.cate_type} onChange={this.onchange}  value={this.state.cate_name}/></div>
                                <div><span><i>*</i> 衣物名称：</span><input className='e-input addnewprice-input-long' type="text"  onChange={this.search} /></div>
                                <div><span>处理类别：</span><Select option={this.state.dispose_type} onChange={value => this.setState({disposetype:value.value})} selected="无" value={this.state.disposetype}/></div>
                                <div><span>档次：</span><Select option={this.state.grade} onChange={value => this.setState({gradename:value.value})} selected="无"  value={this.state.gradename}/></div>
                                <div><span>材料：</span><Select option={this.state.materials} onChange={value => this.setState({materialsname:value.value})} selected="无" value={this.state.materialsname}/></div>
                                <div><span><i>*</i> 洗护周期：</span><input className='e-input addnewprice-input' type="number" value={this.state.item_cycle} onChange={e=>this.setState({item_cycle:e.target.value})}/>天</div>
                                <div><span><i>*</i> 助记码：</span><input className='e-input addnewprice-input' type="text" value={this.state.help_num} onChange={e=>this.setState({help_num:e.target.value})}/></div>
                            </div>
                            <div className="addnewprice-one-right">
                                <img src={this.state.image_url}></img>
                                <button className="e-btn" onClick={()=>this.setState({selectImg:true})}>修改图片</button>
                            </div>
                            <div className="addnewprice-one-bootom" id="addnewprice-one-bootom">
                                <div>
                                <span><i>*</i> 格架：</span><Select option={this.state.grid} selected='任意格架' onChange={value=>this.setState({gridname:value.value})} value={this.state.gridname}/>
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
                            <button className="e-btn" onClick={this.addYES}>确定</button>
                            <button className="e-btn-b" onClick={()=>this.setState({show:false})}>取消</button>
                        </div>
                    </Dish>
                }
                 {
                    this.state.show1
                    &&
                    <Dish title='编辑洗护价格' onClose={() => this.setState({show1:false})} width="690" height="475">
                        <div className="addnewprice-one">
                            <div className="addnewprice-one-left">
                                <div><span><i>*</i>衣物类别：</span><Select option={this.state.cate_type} selected={this.state.cate_name} onChange={this.onchange} value={this.state.cate_name}/></div>
                                <div><span><i>*</i>衣物名称：</span><input className='e-input addnewprice-input-long' type="text"  onChange={e=>this.setState({item_name:e.target.value})} value={this.state.item_name}/></div>
                                <div><span>处理类别：</span><Select option={this.state.dispose_type}  selected={this.state.disposetype==null||this.state.disposetype==''?'无':this.state.disposetype} onChange={value => this.setState({disposetype:value.value})} value={this.state.disposetype==null||this.state.disposetype==''?'无':this.state.disposetype}/></div>
                                <div><span>档次：</span><Select option={this.state.grade} selected={this.state.gradename==null||this.state.gradename==''?'无':this.state.gradename} onChange={value => this.setState({gradename:value.value})} value={this.state.gradename==null||this.state.gradename==''?'无':this.state.gradename}/></div>
                                <div><span>材料：</span><Select option={this.state.materials} selected={this.state.materialsname==null||this.state.materialsname==''?'无':this.state.materialsname} onChange={value => this.setState({materialsname:value.value})} value={this.state.materialsname==null||this.state.materialsname==''?'无':this.state.materialsname}/></div>
                                <div><span><i>*</i>洗护周期：</span><input className='e-input addnewprice-input' type="number" value={this.state.item_cycle} onChange={e=>this.setState({item_cycle:e.target.value})}/>天</div>
                                <div><span><i>*</i> 助记码：</span><input className='e-input addnewprice-input' type="text" value={this.state.help_num} onChange={e=>this.setState({help_num:e.target.value})}/></div>
                            </div>
                            <div className="addnewprice-one-right">
                                <img src={this.state.image_url}></img>
                                <button className="e-btn" onClick={()=>this.setState({selectImg:true})}>修改图片</button>
                            </div>
                            <div className="addnewprice-one-bootom" id="addnewprice-one-bootom">
                                <div>
                                <span><i>*</i>格架：</span><Select option={this.state.grid} selected={this.state.gridname}  onChange={value=>this.setState({ gridname:value})} value={this.state.gridname}/>
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
                            <button className="e-btn-b" onClick={() => this.setState({ show1: false })}>取消</button>
                        </div>
                    </Dish>
                }
                    {
                        this.state.selectImg && <PhotoGallery onClose={this.onClose} item_name={this.state.item_name} callback={(id,url) => this.setState({image_id:id,image_url:url})}/>
                    }
                    {
                        this.state.clothestypemanageshow&&<ColthesClassifyManagment onClose={()=>this.setState({clothestypemanageshow:false})} refresh={this.query}/>
                    }
            </div>
            // </Window>
        );
    }
}