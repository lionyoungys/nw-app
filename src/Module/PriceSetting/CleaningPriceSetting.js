/**
 * 洗护价格设置
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import './CleaningPriceSetting.css';
import './addnewprice.css';
import ClothesCategoryManage from './ClothesCategoryManage'
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {show:false,
            // serveTypes:[],
            index:0,
            itemLists:[],
            itemList:[]
        }
        this.handleClick=this.handleClick.bind(this);
    };   
    handleClick(e){
        this.setState({index:e.target.dataset.index});
    } 
    componentDidMount(){
    //     api.post('serveType', {
    //         token:'token'.getData()
    // }, (res, ver) => {
    //         if (ver && res) {
    //             console.log(res)
    //             this.setState({serveTypes:res.result})
    //         }
    //     }
    //     ); 
        api.post('itemList', {
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
        'undefined' !== typeof this.state.itemLists[this.state.index].server
    ) {
        itemList = this.state.itemLists[this.state.index].server.map((item,index)=>
            <tr>
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
        return (
            // <Window title='洗护价格设置' onClose={this.props.closeView} >
            <div className='cleaning_price_all'>
                <div className="cleaning_price_set_btn">
                    <button className='e-btn middle'>洗护分类管理</button>
                    <button className='e-btn middle' onClick={<ClothesCategoryManage/>}>衣物类别管理</button>
                    <button className='e-btn middle' onClick={() => this.setState({show:true})}>+新增洗护价格</button>
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
                        {/* <tr>
                            <td>1</td>
                            <td>wwkskskskk看书看书看书看</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr> */}
                    </tbody>
                </table> 
                {
                    this.state.show
                    &&
                    <Window title='新增洗护价格' onClose={() => this.setState({show:false})} width="510" height="312">
                        <div className="addnewprice">
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-select"><span>衣物处理：</span><Select option={['干洗','水洗','烘干']} selected='干洗' onChange={value => console.log(value)} /></div>
                                <div className="addnewprice-div-select"><span>衣物类别：</span><Select option={['上衣','裤装','小件']} selected='上衣' onChange={value => console.log(value)}/></div>
                            </div>
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-nor"><span>名称：</span><input  type="text"/></div>
                                <div className="addnewprice-div-select"><span>档次：</span><Select option={['普通','高档']} selected='普通' onChange={value => console.log(value)}/></div>
                            </div>
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-nor"><span>交活天数：</span><input  type="text"/></div>
                                <div className="addnewprice-div-nor"><span>格架系数：</span><input  type="text"/></div>
                            </div>
                            <div className="addnewprice-div">
                                <div className="addnewprice-div-nor"><span>价格：</span><input  type="text"/></div>
                                <div className="addnewprice-div-nor"><span>折扣下限：</span><input  type="text" className="addnewprice-dicount"/> %</div>
                            </div>
                            <div className="addnewprice-money">
                                <input type="checkbox" />价格可调
                            </div>
                            <div className="addnewprice-dcount">
                                <input type="checkbox" />允许折扣
                            </div>
              
                        </div>
                        <button className="e-btn addnewprice-e-btn">保存</button>
                    </Window>
                }
            </div>
            // </Window>
        );
    }
}