/**
 * 商品管理/商品分类管理
 * @author  ranchong
 */
import React, { Component } from 'react';
import './CommodityClassifyManagement.css';
import Window from '../../UI/Window';
import CleaningClassifyManagementEdit from '../CommodityManagementDic/CleaningClassifyManagementEdit'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            goodtypelist:[],
            show:false,
            id:'',
            addshow:false,
            modshow:false,
            page:1
        };
        this.limit=200;
        this.addYES=this.addYES.bind(this);
        this.update=this.update.bind(this);
        this.onclose=this.onclose.bind(this);
        this.delete=this.delete.bind(this);
        this.save=this.save.bind(this);
    };
    componentDidMount(){
        api.post('goodtypeList', {
            token:'token'.getData(),
            limit:this.limit,
            page:this.state.page
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({goodtypelist:res.result.list})
            }
        }
        ); 
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
    update(e){
        let index=e.target.dataset.write;
        this.setState({show:true,id:this.state.goodtypelist[index].id,name:this.state.goodtypelist[index].name});
    }
    onclose(){
        this.setState({show:false})
    }
    save(){
        api.post('goodmodType', {
            token:'token'.getData(),
            id:this.state.id,
            name:this.state.name
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({name:'',show:false})
                this.componentDidMount();
            }
        }
        ); 
    }
    delete(){
        api.post('gooddelType', {
            token:'token'.getData(),
            id:this.state.id
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({show:false})
                this.componentDidMount();
            }
        }
        ); 
    }
    render() {
        let goodtypelist=this.state.goodtypelist.map((item,index)=>
        <tr>
             <td>{index+1}</td>
             <td>{item.name}</td>
             <td data-write={index} onClick={this.update}>编辑</td>
        </tr>
    );
        return (

            <Window title='商品分类管理' onClose={this.props.onclose} width='632' height='411'>
                {/* 左侧table */}
                <div className="commodity_classify_management_left">

                    <table className='commodity_classify_management_left_table'>
                        <thead>
                            <tr>
                                <td>id</td>
                                <td>分类名称</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody>
                           {goodtypelist}
                        </tbody>
                    </table>
                </div>
                {/* 右侧板块 */}
                <div className="commodity_classify_management_right">
                    <div className='commodity_classify_management_right_btn'>
                        <button onClick={()=>this.setState({addshow:true})}>+添加分类</button>
                    </div>
                    {}
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
            </Window>
            
        );
    }
}