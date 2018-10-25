/**
 * 商品管理/洗护分类管理_编辑分类
 * @author  ranchong
 */
import React, { Component } from 'react';
import './CleaningClassifyManagementEdit.css';
import Window from '../../UI/Window';
import Dish from '../../UI/Dish'
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            goodtypelist:[],
            name:''
        
        }
        this.delete=this.delete.bind(this);
        this.save=this.save.bind(this);
    };
    componentDidMount(){
        api.post('goodtypeList', {
            token:'token'.getData(),
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({goodtypelist:res.result.list})
            }
        }
        ); 
    }
    save(){
        api.post('goodmodType', {
            token:'token'.getData(),
            id:this.props.id,
            name:this.state.name
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.componentDidMount();
                // this.setState({goodtypelist:res.result})
            }
        }
        ); 
    }
    delete(){
        api.post('gooddelType', {
            token:'token'.getData(),
            id:this.props.id
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.componentDidMount();
            }
        }); 
    }
    render() {
        let goodtypelist=this.state.goodtypelist.map((item,index)=>
        <tr key={'item'+index}>
             <td>{index+1}</td>
             <td>{item.name}</td>
             <td data-write={index} onClick={this.update}>编辑</td>
        </tr>
        );
        return (

            <Dish title='商品分类管理' onClose={this.props.onclose} width='632' height='411'>
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
                        <button>+添加分类</button>
                    </div>
                    <div className='commodity_classify_management_right_bottom cleaning_classify_management_edit_btn'>
                        <a>编辑分类</a>
                        <p>分类名称:</p>
                        <input className='e-input' value={this.state.name} onChange={e=>this.setState({name:e.target.value})}></input>
                        <button className='e-btn' onClick={this.save}>保存</button>
                        <button className='e-btn' onClick={this.props.onclose}>取消</button>
                        <button className='e-btn' onClick={this.delete}>删除</button>

                    </div>
                </div>
            </Dish>
        );
    }
}