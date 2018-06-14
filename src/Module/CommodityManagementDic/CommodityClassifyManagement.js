/**
 * 商品管理/商品分类管理
 * @author  ranchong
 */
import React, { Component } from 'react';
import './CommodityClassifyManagement.css';
import Window from '../../UI/Window';
import { isThisMonth } from 'date-fns';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            goodtypelist:[]
        };
        this.addYES=this.addYES.bind(this);
    };
    componentDidMount(){
        api.post('goodtypeList', {
            token:'token'.getData(),
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({goodtypelist:res.result})
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
                this.setState({name:''})
                this.componentDidMount()
            }
        }
        ); 
    }
    render() {
        let goodtypelist=this.state.goodtypelist.map((item,index)=>
        <tr>
             <td>{index+1}</td>
             <td>{item.name}</td>
             <td>编辑</td>
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
                        <button>+添加分类</button>
                    </div>
                    <div className='commodity_classify_management_right_bottom'>
                        <a>新增分类</a>
                        <p>分类名称:</p>
                        <input className='e-input' value={this.state.name} onChange={e=>this.setState({name:e.target.value})}></input>
                        <button className='e-btn'>取消</button>
                        <button className='e-btn' onClick={this.addYES}>保存</button>

                    </div>
                </div>
            </Window>
        );
    }
}