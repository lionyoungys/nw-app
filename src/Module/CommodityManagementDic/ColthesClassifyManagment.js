/**
 * 商品管理/衣物类别管理
 * @author  ranchong
 */
import React, { Component } from 'react';
import './ColthesClassifyManagment.css';
import Window from '../../UI/Window';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            itemLists:[],
            type:[]
        }
    };
    update(e){
        let index=e.target.dataset.write;
        this.setState({show:true,id:this.state.goodtypelist[index].id,name:this.state.goodtypelist[index].name});
    }
    addYES(){
        api.post('goodaddType', {
            token:'token'.getData(),
            name:this.state.name
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({name:'',addshow:false})
                this.componentDidMount()
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
    render() {
        let itemLists=this.state.itemLists.map((item,index)=>
        <tr>
           <td>{index+1}</td>
           <td>{item.name}</td>
           <td data-write={index} onClick={this.update}>编辑</td>
        </tr>
    );
        return (

            <Window title='衣物类别管理' onClose={this.props.onClose} width='632' height='411'>
                {/* 左侧table */}
                <div className="commodity_classify_management_left">

                    <table className='commodity_classify_management_left_table'>
                        <thead>
                            <tr>
                                <td>id</td>
                                <td>衣物类别</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody>  
                          {itemLists}
                        </tbody>
                    </table>
                </div>
                {/* 右侧板块 */}
                <div className="commodity_classify_management_right">
                    <div className='commodity_classify_management_right_btn'>
                        <button onClick={()=>this.setState({addshow:true})}>+添加分类</button>
                    </div>
                    {this.state.show&&<Window title='编辑分类' onClose={()=>this.setState({show:false})} width='290' height='300'>
                <div className='commodity_classify_management_right_bottom cleaning_classify_management_edit_btn'>
                        <p>分类名称:</p>
                        <input className='e-input' value={this.state.name} onChange={e=>this.setState({name:e.target.value})}></input>
                        <button className='e-btn' onClick={this.save}>保存</button>
                        <button className='e-btn' onClick={()=>this.setState({show:false})}>取消</button>
                        <button className='e-btn' onClick={this.delete}>删除</button>

                    </div>
                </Window>
                }
                {this.state.addshow&&<Window title='新增分类' onClose={()=>this.setState({addshow:false})} width='290' height='300'>
                    <div className='commodity_classify_management_right_bottom'>
                        <p>分类名称:</p>
                        <input className='e-input' value={this.state.name} onChange={e=>this.setState({name:e.target.value})}></input>
                        <button className='e-btn' onClick={()=>this.setState({addshow:false})}>取消</button>
                        <button className='e-btn' onClick={this.addYES}>保存</button>

                    </div>
                    </Window>
                 }
                </div>
            </Window>
        );
    }
}