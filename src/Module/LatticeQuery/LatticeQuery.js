/**
 * 格架查询
 * @author  ranchong
 */
import React, { Component } from 'react';
import './LatticeQuery.css';
import Window from '../../UI/Window';
import Table from '../../UI/Table';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {           
            selectLatDic:{},
            gridname:[],
            index:0,
            list:[],  
            indexselect:-1,       
        }  
        this.handleclick = this.handleclick.bind(this);   
        this.listquest = this.listquest.bind(this);          
    }; 
    handleclick (e){
        console.log(e.target.dataset.index || e.target.parentNode.dataset.index);
        var index = e.target.dataset.index || e.target.parentNode.dataset.index;
        this.setState({
            index:index,
            selectLatDic:this.state.gridname[index],
        });
        
    }
    listquest (e){
        var item = e.target.dataset.item || e.target.parentNode.dataset.item;
        var eng = this.state.selectLatDic.name;
        this.setState({indexselect:e.target.dataset.index || e.target.parentNode.dataset.index});
        var op =eng +'-'+ item;
        console.log(op)
        api.post('clothesQuery', {
            status:3,    //衣物状态
            token:'token'.getData(),
            grid_num:op,
            page:1,
            limit:10000000,             
        }, (res, ver,handle) => {
            if (ver && res) {
                 console.log(res);
                this.setState({list:res.result.list});                
            }else{
                handle();
            }
        });
    }
    
    componentDidMount() {
        let done;
        tool.ui.loading(handle => done = handle);
        api.post('grid', {
            token:'token'.getData(),
            page:1,
            limit:10000000,             
        }, (res, ver,handle) => {
            done();
            if (ver && res) {
                console.log(res);
                if(res.result.grid.length>0){
                    this.setState({
                        gridname:res.result.grid,
                        selectLatDic:res.result.grid[this.state.index],
                    })
                }
            }else{
                handle();
            }
        },()=>done());
    }
    
    render() { 
        let name = this.state.gridname.map((item,index) =><span key={'item'+index} data-index={index} className={this.state.index==index?'selected':null} onClick = {this.handleclick}>{item.name}</span>)                      
        let use_detail;
        if(
            'undefined' !== typeof this.state.gridname[this.state.index]
            && 
            'undefined' !== typeof this.state.gridname[this.state.index].use_detail
        ) {           
            use_detail = this.state.gridname[this.state.index].use_detail.map((item,index)=>         
                <span className={item.put_num>0?'index':null} onClick = {this.listquest} data-item ={item.number} data-index={index} id={this.state.indexselect==index?'latticeselect':null}>{item.number}#{item.put_num}件</span>          
            );
        }
        let lists = this.state.list.map((item,index) =>
           <tr key={index}>
              <td>{item.serialsn}</td>
              <td>{item.clothing_number}</td>
              <td>{item.clothing_name}</td>
              <td>{item.clothing_color}</td>
              <td>{item.grid_num}</td>
              <td >{item.status.getItemStatusName()}</td>
              <td>{item.user_name}</td>
              <td>{item.user_mobile}</td>
              <td>{item.card_number}</td>
           </tr>
        )
        
        return (
            <Window title='格架查询' onClose={this.props.closeView}>
                <div className="lattice-title">
                     <span>格架名称：{this.state.selectLatDic.name}</span>
                     <span>首数：{this.state.selectLatDic.start_number}</span>
                     <span>尾数：{this.state.selectLatDic.end_number}</span>
                     <span>每衣挂号最大挂衣数：{this.state.selectLatDic.max_number}</span>
                     <span>使用率：<a>{this.state.selectLatDic.use_total}/{this.state.selectLatDic.total}</a></span>
                </div> 
                <div className="lattice-div">
                    <div className="lattice-div-left">
                          {name}
                    </div>
                    <div className="lattice-div-right">
                        {use_detail}                      
                    </div>
                </div> 
                <div className="lattice bothpayout-detail" id="bothpayout-detail">               
                    <Table>
                        <thead>
                            <tr>
                                <th>流水号</th>
                                <th>衣物编码</th>
                                <th>衣物名称</th>
                                <th>颜色</th>
                                <th>衣挂号</th>
                                <th>状态</th>
                                <th>姓名</th>
                                <th>手机</th>
                                <th>卡号</th> 
                            </tr>                                  
                        </thead>
                        <tbody>
                           {lists}
                        </tbody>
                    </Table>                       
                </div>
            </Window>
        );
    }
}