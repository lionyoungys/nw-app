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
        }

        this.handleClick=this.handleClick.bind(this);
        this.onClose=this.onClose.bind(this);
        this.addcheanprice=this.addcheanprice.bind(this);
        this.clothestypemanage=this.clothestypemanage.bind(this);
        this.addYES=this.addYES.bind(this); 
    };   
    clothestypemanage(){
        this.setState({clothestypemanageshow:true});
    }
    addcheanprice(){
        api.post('needInfo', {
            token:'token'.getData()
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({
                    show:true,
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
            }
        }
        ); 
    }
    handleClick(e){
        this.setState({index:e.target.dataset.index});
    } 
    addYES(){
        api.post('addItem', {
            token:'token'.getData(),
            cate_id:'',
            cate_name:'',
            dispose_type:'',
            item_name:'',
            item_off_price:'',
            grade:'',
            materials:'',
            grid:'',
            transfer:'',
            has_discount:'',
            min_discount:'',
            item_cycle:''
    }, (res, ver) => {
            if (ver && res) {

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
        'undefined' !== typeof this.state.itemLists[this.state.index].server
    ) {
        itemList = this.state.itemLists[this.state.index].server.map((item,index)=>
            <tr key={item}>
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
     let gridss;
        if(
         'undefined' !== typeof this.state.grid[this.state.index]
         && 
         'undefined' !== typeof this.state.grids[this.state.index].name
        ) {
        gridss=this.state.grid.map((item,index)=>
        <div><input type="checkbox" />{item}</div>
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
                                <div><span><i>*</i>衣物类别：</span><Select option={this.state.cate_type} selected={this.state.cate_type[0]} onChange={value => console.log(value)} /></div>
                                <div><span><i>*</i>衣物名称：</span><input className='e-input addnewprice-input-long' type="text" /></div>
                                <div><span>处理类别：</span><Select option={this.state.dispose_type} selected={this.state.dispose_type[0]} onChange={value => console.log(value)} /></div>
                                <div><span>档次：</span><Select option={this.state.grade} selected={this.state.grade[0]} onChange={value => console.log(value)} /></div>
                                <div><span>材料：</span><Select option={this.state.materials} selected={this.state.materials[0]} onChange={value => console.log(value)} /></div>
                                <div><span><i>*</i>洗护周期：</span><input className='e-input addnewprice-input' type="text" />天</div>
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
                            <div><span>线下价格：</span><input className='e-input addnewprice-input' type="text" />元</div>
                            <div><span>折扣下限：</span><input className='e-input addnewprice-input' type="text" />%</div>
                            <div><span>线上价格：
                                </span><input className='e-input addnewprice-input' type="text" />元
                                    <div className="add-select-part">
                                        <div><input type="checkbox" />在线接单</div>
                                        <div><input type="checkbox" />允许折扣</div>
                                        <div><input type="checkbox" />价格可调</div>
                                    </div>
                            </div>
                        </div>
                        <div className="addnewprice-btn">
                            <button className="e-btn">取消</button>
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