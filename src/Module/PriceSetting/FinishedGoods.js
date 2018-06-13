/**
 * 库存商品
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import { ETIME } from 'constants';
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
            typeList:[]
        }
        this.handleClick=this.handleClick.bind(this);
        this.add=this.add.bind(this);
        this.typemanage=this.typemanage.bind(this);
        this.onclose=this.onclose.bind(this);
    };  
    add(){
        this.setState({show:true});
        api.post('goodtypeList', {
            token:'token'.getData()
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({itemLists:res.result,typeList:res.result.typeArray('name'),})
            }
        }
        ); 
    } 
    addYES(){
        api.post('goodtypeList', {
            token:'token'.getData(),
            fid:'',
            name:'',
            price:'',
            stock:'',
            discount:''
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({itemLists:res.result,typeList:res.result.typeArray('name'),})
            }
        }
        ); 
    }
    onclose(){
        this.setState({show1:false});
    }
    typemanage(){
        this.setState({show1:true});
    }
    handleClick(e){
        this.setState({index:e.target.dataset.index});
    } 
    componentDidMount(){
        api.post('goodsList', {
            token:'token'.getData()
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({itemLists:res.result})
            }
        }
        ); 
       
    }
    render() {
        let itemLists = this.state.itemLists.map((item,index)=>
        <span  key={item} 
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
            <tr key={item}>
                <td></td>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.discount}</td>
                <td>{item.stock}</td>
                <td>{item.price}</td>
                <td> <b onClick={this.mod} data-write={index}>编辑</b>&nbsp;<i  onClick={this.delete} data-write={index}>删除</i></td>
            </tr>
        );
    }
        return (
            // <Window title='洗护价格设置' onClose={this.props.closeView} >
            <div className='cleaning_price_all'>
                <div className="cleaning_price_set_btn">
                    <button className='e-btn middle' onClick={this.typemanage}>库存商品分类管理</button>
                    <button className='e-btn middle' onClick={this.add}>+新增商品价格</button>
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
                            <td></td>
                            <td>商品编号</td>
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
                </table> 
                {
                    this.state.show
                    &&
                    <Window title='新增商品价格' onClose={() => this.setState({show:false})} width="510" height="312">
                        <div className="addnewprice">
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-select"><span>商品类别：</span><Select option={this.state.typeList} selected={this.state.typeList[0]} onChange={value => console.log(value)}/></div>
                            </div>
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-nor"><span>名称：</span><input  type="text" onChange={e=>this.setState({name:e.target.value})}/></div>
        
                            </div>
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-nor"><span>库存：</span><input  type="text" onChange={e=>this.setState({stock:e.target.value})}/></div>
                            
                            </div>
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-nor"><span>价格：</span><input  type="text" onChange={e=>this.setState({price:e.target.value})}/></div>
                
                            </div>
                            <div className="addnewprice-money">
                                <input type="checkbox" />允许折扣
                            </div>
              
                        </div>
                        <button className="e-btn addnewprice-e-btn" onClick={this.addYES}>保存</button>
                    </Window>
                }
                 {
                     this.state.show1&&<CommodityClassifyManagement onclose={this.onclose}/>
                 }
            </div>
            // </Window>
        );
    }
}