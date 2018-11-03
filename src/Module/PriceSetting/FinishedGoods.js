/**
 * 库存商品
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import Dish from '../../UI/Dish'
import Table from '../../UI/Table';
import '../CleaningPriceSetting/addnewprice.css';
import '../ChangeCard/ChangeCard.css'
import CommodityClassifyManagement from '../CommodityManagementDic/CommodityClassifyManagement'
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {show:false,
            show1:false,
            // serveTypes:[],
            index:0,
            itemLists:[],
            itemList:[],
            typeList:[],
            typeLists:[],
            typeindex:0,
            id:'',
            goodindex:0,
            discount:0,//是否打折  0不打折 1打折
            name:'',
            stock:'',
            price:'',
            goods_type:'',//类别
            goods_number:'',//商品编码
            upgoods_type:''//修改类别
        }
        this.limit = 1000;
        this.handleClick=this.handleClick.bind(this);
        this.add=this.add.bind(this);
        this.typemanage=this.typemanage.bind(this);
        this.onclose=this.onclose.bind(this);
        this.addYES=this.addYES.bind(this);
        this.delete=this.delete.bind(this);
        this.onchange=this.onchange.bind(this);
        this.mod=this.mod.bind(this);
        this.modYES=this.modYES.bind(this);
        this.query=this.query.bind(this);
    };  
    componentDidMount() {
        this.query();
    }
    query(){
        let done;
        tool.ui.loading(handle => done = handle);
        console.log('申请数据1');
        api.post('goodsList', {
            token: 'token'.getData(),
            page: 1,
            limit: this.limit
        }, (res, ver,handle) => {
            console.log('申请数据');
            done();
            if (ver && res) {
                console.log(res)
                this.setState({ itemLists: res.result })
            } else {
                handle();
            }
        }, () => done());
    }
    add(){
        this.setState({
            show:true,
            name:'',
            stock:'',
            discount:0,
            price:'' 
        });
        this.getGoodTypeList();
    } 
    //获取商品类别列表
    getGoodTypeList(){
        api.post('goodtypeList', {
            token: 'token'.getData(),
            limit:this.limit
        }, (res, ver, handle) => {
            if (ver && res) {
                console.log(res)
                this.setState({
                    typeLists: res.result.list,
                    typeList: res.result.list.typeArray('name'),
                    goods_type:res.result.list[0].name
                })
            } else {
                handle();
            }
        }); 
    }
    onchange(value){
        this.setState({typeindex:value.index,upgoods_type:value.value,goods_type:value.value});
        // console.log(value.inObjArray(this.state.typeLists, 'name'));
    } 
    addYES(){
        if(''==this.state.name)
        return  tool.ui.error({msg:'请输入名称',callback:(close) => { close()}});
        if(''==this.state.stock)
        return  tool.ui.error({msg:'请输入库存',callback:(close) => { close()}});
        if(''==this.state.price)
        return  tool.ui.error({msg:'请输入价格',callback:(close) => { close()}});
        let params={
            token:'token'.getData(),
            fid:this.state.typeLists[this.state.typeindex].id,
            name:this.state.name,
            price:this.state.price,
            stock:this.state.stock,
            has_discount:this.state.discount,
            goods_number:this.state.goods_number
        }
        console.log(this.state.typeLists[this.state.typeindex].id)
        api.post('addGoods',params, (res, ver,handle) => {
            if (ver && res) {
                console.log(res)
                this.setState({show:false});
                this.componentDidMount();
            }else{
                
            }
            handle();
        }); 
    }
    onclose(){
        this.setState({show1:false});
    }
    typemanage(){
        this.setState({show1:true});
    }
    handleClick(e){    
        this.setState({index:e.target.dataset.index});
        console.log(this.state.index)
    } 
    delete(e){
        let write = e.target.dataset.write;
        this.setState({id:this.state.itemLists[this.state.index].goods[write].id});
        tool.ui.error({title:'提示',msg:'确定删除商品？',button:['确定'],callback:(close, event) => {
                if(event=='确定'){
                api.post('delGoods', {token:'token'.getData(),
                id:this.state.id
            }, (res, ver,handle) => {         
                close();
                if (ver && res) {
                    this.componentDidMount();
                    handle({msg:'删除成功！'});
                }else{
                    handle();
                } 
            });
        }else{
            close();
        }}});
    }

    mod(e){

        if (this.state.typeLists.length == 0 || this.state.typeList.length == 0) 
        this.getGoodTypeList();
        let write = e.target.dataset.write;
        this.setState({
            show2:true,
            goodindex:write,
            upgoods_type:this.state.itemLists[this.state.index].goods[write].goods_type,
            name:this.state.itemLists[this.state.index].goods[write].name,
            stock:this.state.itemLists[this.state.index].goods[write].stock,
            price:this.state.itemLists[this.state.index].goods[write].price,
            discount:this.state.itemLists[this.state.index].goods[write].has_discount,
            goods_number:this.state.itemLists[this.state.index].goods[write].goods_number
        });
    }
    modYES(){
        if(''==this.state.name)
        return  tool.ui.error({msg:'请输入名称',callback:(close) => { close();}});
        if(''==this.state.stock)
        return  tool.ui.error({msg:'请输入库存',callback:(close) => { close();}});
        if(''==this.state.price)
        return  tool.ui.error({msg:'请输入价格',callback:(close) => { close();}});
        let params = {
            token: 'token'.getData(),
            id: this.state.itemLists[this.state.index].goods[this.state.goodindex].id,
            fid: this.state.typeLists[this.state.typeindex].id,
            name: this.state.name,
            price: this.state.price,
            stock: this.state.stock,
            has_discount: this.state.discount,
            goods_number:this.state.goods_number
        } 
        console.log(params);
        api.post('modGoods', params, (res, ver,handle) => {
            if (ver && res) {
                console.log(res)
                this.setState({show2:false}); 
                this.componentDidMount();
                handle({msg:'修改成功！'});
            }else{
                handle();
            }
        }); 
    }
    render() {

        let itemLists = this.state.itemLists.map((item,index)=>
            <span  key={'item'+index} 
            data-index={index} 
            className={this.state.index==index?'selected_row':null}
            onClick={this.handleClick}>{item.name}</span>
        );
        let itemList;
            if(
                'undefined' !== typeof this.state.itemLists[this.state.index]
                && 
                'undefined' !== typeof this.state.itemLists[this.state.index].goods
            ) {
                itemList = this.state.itemLists[this.state.index].goods.map((item,index)=>
                    <tr key={'item'+index}>
                        <td>{item.goods_number}</td>
                        <td>{item.name}</td>
                        <td>{item.has_discount=='1'?'是':'否'}</td>
                        <td>{item.stock}</td>
                        <td>{item.price}</td>
                        <td> <span onClick={this.mod} data-write={index} className='e-blue'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;<span onClick={this.delete} data-write={index} className='e-blue'>删除</span></td>
                    </tr>
            );
        }
        return (
        
            <div className='cleaning_price_all'>
                <div className="cleaning_price_set_btn">
                    <button className='e-btn middle' onClick={this.typemanage}>库存商品分类管理</button>
                    <button className='e-btn middle' onClick={this.add}>+新增商品价格</button>
                </div >
                <div className='cleaning_price_set_left_table_div'>
                    <div className='cleaning_price_set_left_table'>
                        {itemLists}
                    </div> 
                </div>

                {/* 表格部分 欠费衣物信息*/}
                <Table style={{height:'294px',marginLeft:'117px',marginRight:'10px'}}>
                    <thead>
                        <tr><th>商品条码</th><th>商品名称</th><th>允许折扣</th><th>库存</th><th>单价</th><th>操作</th></tr>
                    </thead>
                    <tbody>
                        {itemList}
                    </tbody>
                </Table>    
                 {/* <table className='change_card_table right_table' id="right_table">
                    <thead>
                        <tr>
                            <td>商品条码</td>
                            <td>商品名称</td>
                            <td>允许折扣</td>
                            <td>库存</td>
                            <td>单价</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        {itemList}
                    </tbody>
                </table>  */}
                {
                    this.state.show
                    &&
                    <Dish title='新增商品价格' onClose={() => this.setState({show:false})} width="510" height="312">
                        <div className="addnewprice">
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-select"><span>商品类别：</span><Select option={this.state.typeList}  onChange={this.onchange} value={this.state.goods_type}/></div>
                            </div>
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-nor"><span><b>*</b>名称：</span><input  type="text" className='e-input' onChange={e=>this.setState({name:e.target.value})} value={this.state.name}/></div>
        
                            </div>
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-nor"><span><b>*</b>库存：</span><input  type="number" className='e-input' onChange={e=>this.setState({stock:e.target.value})} value={this.state.stock}/></div>
                            
                            </div>
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-nor"><span><b>*</b>价格：</span><input  type="number" className='e-input' onChange={e=>this.setState({price:e.target.value})} value={this.state.price}/></div>
                
                            </div>
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-nor"><span>商品条码：</span><input  type="number"  className='e-input' onChange={e=>this.setState({goods_number:e.target.value})} value={this.state.goods_number}/>&nbsp;请扫描商品条码</div>
                
                            </div>
                            <div className="addnewprice-money">
                                <input type='checkbox' className='e-checkbox' value={this.state.discount} className='e-input' onChange={e=>this.setState({discount:e.target.checked?1:0})}/>允许折扣
                            </div>
              
                        </div>
                        <button className="e-btn addnewprice-e-btn" onClick={this.addYES}>保存</button>
                    </Dish>
                }
                   {
                    this.state.show2
                    &&
                    <Dish title='编辑商品价格' onClose={() => this.setState({show2:false})} width="510" height="312">
                        <div className="addnewprice">
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-select"><span>商品类别：</span><Select option={this.state.typeList}  onChange={this.onchange} value={this.state.upgoods_type}/></div>
                            </div>
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-nor"><span>名称：</span><input className='e-input'  type="text" onChange={e=>this.setState({name:e.target.value})} value={this.state.name}/></div>
        
                            </div>
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-nor"><span>库存：</span><input className='e-input'  type="number" onChange={e=>this.setState({stock:e.target.value})} value={this.state.stock}/></div>
                            
                            </div>
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-nor"><span>价格：</span><input className='e-input'  type="number" onChange={e=>this.setState({price:e.target.value})} value={this.state.price}/></div>
                
                            </div>
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-nor"><span>商品条码：</span><input className='e-input'  type="number" onChange={e=>this.setState({goods_number:e.target.value})} value={this.state.goods_number}/>&nbsp;请扫描商品条码</div>
                
                            </div>
                            <div className="addnewprice-money">
                                <input type="checkbox" checked = {this.state.discount == 0? false : true} onChange={e=>this.setState({discount:e.target.checked?1:0})} />允许折扣
                            </div>
              
                        </div>
                        <button className="e-btn addnewprice-e-btn" onClick={this.modYES}>保存</button>
                    </Dish>
                }
                 {
                     this.state.show1&&<CommodityClassifyManagement onclose={this.onclose} onrefresh={this.query}/>
                 }
            </div>
        );
    }
}