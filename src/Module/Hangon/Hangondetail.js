/**
 * 上挂详情
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import './Hangon.css'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            grid:[],
            gridname:[],
            clothnums:'',//衣挂号
            clothnum:'',//衣挂号名称
            clothindex:-1,//衣挂号索引
        }
        this.handleClick=this.handleClick.bind(this);
        this.putOn=this.putOn.bind(this);
    };
    componentDidMount(){
        api.post('grid', {
            token:'token'.getData(),
            limit:200,
            page:1
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({grid:res.result.grid,gridname:res.result.grid.typeArray('name')});
                let len = res.result.grid.length;
                for (let i = 0;i < len;++i) {
                    if (this.props.data.grid_num.indexOf(res.result.grid[i].name + '-') == 0) {
                        api.post('putNumber', {
                            token:'token'.getData(),
                            id:res.result.grid[i].id,  
                            limit:200000
                        }, (res, ver) => {
                            if (ver && res) {
                                console.log(res)
                                this.setState({clothnums:res.result.list,clothnum:res.result.list.typeArray('number')})
                            }else{
                                console.log(res)
                            }
                        });
                        break;
                    }
                }
            }else{
                console.log(res.msg);
                tool.ui.error({msg:res.msg,callback:(close) => {
                    close();
                }});
            }
        }
        );
      
    }
    handleClick(value){
        api.post('putNumber', {
            token:'token'.getData(),
            id:this.state.grid[value.inObjArray(this.state.grid, 'name')].id,  
            limit:200000
        }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({clothnums:res.result.list,clothnum:res.result.list.typeArray('number')})
            }else{
                console.log(res)
            }
        });
    }
    putOn(){
        console.log(this.state.clothnums[this.state.clothindex])
        let puton={
            token:'token'.getData(),
            id:this.props.data.id,   
            put_id:-1==this.state.clothindex?"":this.state.clothnums[this.state.clothindex].id
        }
        console.log(puton)
        api.post('putOn',
        puton, (res, ver) => {
            if (ver) {
                tool.ui.success({callback:(close) => {
                    close();    
                    this.props.onclose();             
                }}); 
            }else{
                tool.ui.error({msg:res.msg,callback:(close) => {
                    close();
                }});
            }
                }
               );
   }
    render() {
        var arr = ['衣物编码','名称','品牌','颜色','瑕疵','洗后预估','衣挂号','交活定期','状态'].map((item,index) =><span key={'item'+index} >{item}</span>);
        var count = [this.props.data.clothing_number,
            this.props.data.clothing_name,
            this.props.data.sign,
            this.props.data.clothing_color,
            this.props.data.remark,
            this.props.data.forecast,
            this.props.data.grid_num,
            this.props.data.deal_time,
            this.props.data.status==3?'未取走':this.props.data.status==4?'已取走':'已撤单'].map((item,index) =><span key={'item'+index} >{item}</span>);
        return (
            <Window title='上挂详情' onClose={this.props.onClose} width='567' height='382'>
                <div className="Hangon-left">
                   <div className="Hangon-left-title">
                      {arr}
                   </div>
                   <div className="Hangon-left-count">
                     {count}
                   </div>
                </div>
                <div className="Hangon-right">
                   <div className="Hangon-right-select">
                      <span>格架: </span><Select option={this.state.gridname}  onChange={this.handleClick} selected={this.props.data.grid_num.split('-')[0]}/>
                   </div>
                   <div className="Hangon-right-select">
                      <span>衣挂号: </span><Select option={this.state.clothnum}  onChange={(value)=>this.setState({clothindex:value.inObjArray(this.state.clothnums, 'number')})} selected={this.props.data.grid_num.split('-')[1]}/>
                   </div>
                   <button className="e-btn Hangon-right-btn" onClick={this.props.onClose}>取消</button><button className="e-btn Hangon-right-btn" onClick={this.putOn}>上挂</button>
                </div>
            </Window>
           
        );
    }
}