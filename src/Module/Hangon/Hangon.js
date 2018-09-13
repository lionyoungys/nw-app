/**
 * 上挂
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Hangondetail from './Hangondetail';
import './Hangon.css'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            clothing_number:'',
            result:[],
            index:0
        }
        this.onclose=this.onclose.bind(this);
        this.onClose=this.onClose.bind(this);
        this.query=this.query.bind(this);
        this.handleClick=this.handleClick.bind(this);

    };
    onclose(){

        this.setState({show:false});
        this.props.closeView();
    }
    onClose(){

        this.setState({show:false});
    }
    handleClick(e){
           console.log(e.target.dataset.index || e.target.parentNode.dataset.index)
           this.setState({show:true,index:e.target.dataset.index || e.target.parentNode.dataset.index})
    }
    query(){
        if(this.state.clothing_number=='')
        return tool.ui.error({msg:'请输入衣物编码',callback:(close) => {
            close();
        }});
            api.post('hang', {
                token:'token'.getData(),
                clothing_number:this.state.clothing_number,   
            }, (res, ver) => {
                if (ver && res) {
                    console.log(res)
                    this.setState({result:res.result})
                    if(res.result.length==1){
                        this.setState({show:true});
                    }
                    // () => this.setState({ show: true, click: true })
                }else{
                        console.log(res);
                        tool.ui.error({title:'提示',msg:res.msg,button:'确定',callback:(close, event) => {
                            this.setState({result:[]})
                            close();
                        }});
                   }
               }
            );
    }
    render() {
        let result=this.state.result.map((item,index)=>
            <tr onClick={this.handleClick} key={'item'+index} data-index={index}>
                <td>{item.clothing_number}</td>
                <td>{item.clothing_name}</td>
                <td>{item.clothing_color}</td>
                <td>{item.sign}</td>
                <td>{item.grid_num}</td>
                <td>{item.user_name}</td>
                <td>{item.user_mobile}</td>
            </tr>
        );
        return (
            <Window title='上挂' onClose={this.props.closeView}>
                <div className="Hangon-div">
                    <span>请输入衣物编码</span>
                    <input type="text" value={this.state.clothing_number} onChange={e=>this.setState({clothing_number:e.target.value.trim()})} autoFocus='autoFocus'/>
                    <button className="e-btn hangon-btn" onClick={this.query}>查询</button>             
                </div>
                <table className='ui-table-base hangon-sear-res-tab'>
                    <thead>
                        <tr>
                            <td>衣物编码</td>
                            <td>衣物名称</td>
                            <td>颜色</td>
                            <td>品牌</td>
                            <td>衣挂号</td>
                            <td>客户姓名</td>
                            <td>客户电话</td>
                        </tr>
                    </thead>
                    <tbody>
                        {result}
                    </tbody>
                </table>
                {
                    this.state.show
                    &&
                        <Hangondetail onclose={this.onclose} onClose={this.onClose}
                            refresh={this.query} data={{
                            id:this.state.result[this.state.index].id,
                            clothing_number:this.state.result[this.state.index].clothing_number,
                            clothing_name:this.state.result[this.state.index].clothing_name,
                            clothing_color:this.state.result[this.state.index].clothing_color,
                            sign:this.state.result[this.state.index].sign,
                            grid_num:this.state.result[this.state.index].grid_num,
                            user_name:this.state.result[this.state.index].user_name,
                            user_mobile:this.state.result[this.state.index].user_mobile,
                            remark:this.state.result[this.state.index].remark,
                            forecast:this.state.result[this.state.index].forecast,
                            status:this.state.result[this.state.index].status,
                            deal_time:this.state.result[this.state.index].deal_time
                        }}/> 
                        // <HangonSearchRes onClose={this.onclose} />) 
                }
            </Window>
           
        );
    }
}