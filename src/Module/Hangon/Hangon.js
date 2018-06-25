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
            result:''
        }
        this.onclose=this.onclose.bind(this);
        this.query=this.query.bind(this);

    };
    onclose(){

        this.setState({show:false});
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
                // () => this.setState({ show: true, click: true })
            }else{
                console.log(res)
            }
        }
    );
    }
    render() {
        return (
            <Window title='上挂' onClose={this.props.closeView}>
                <div className="Hangon-div">
                    <span>请输入衣物编码</span>
                    <input type="text" value={this.state.clothing_number} onChange={e=>this.setState({clothing_number:e.target.value})}/>
                    <button className="e-btn hangon-btn" onClick={this.query}>查询</button>
              
                </div>
                {/* <div class="Succession-name ReportLossQuery">
                    已为您找到：
                    <b>2345</b>
                    条数据，请选择您要操作的衣物
                </div> */}
                <table class='ui-table-base hangon-sear-res-tab'>
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
                        <tr onClick={()=>this.setState({show:true})}>
                            <td>{this.state.result.clothing_number}</td>
                            <td>{this.state.result.clothing_name}</td>
                            <td>{this.state.result.clothing_color}</td>
                            <td>{this.state.result.sign}</td>
                            <td>{this.state.result.grid_num}</td>
                            <td>{this.state.result.user_name}</td>
                            <td>{this.state.result.user_mobile}</td>
                        </tr>
                    </tbody>
                </table>
                {
                    this.state.show
                    &&
                        <Hangondetail onClose={this.onclose} /> 
                        // <HangonSearchRes onClose={this.onclose} />) 
                }
            </Window>
           
        );
    }
}