/**
 * 衣物查询
 * @author  wangjun
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import './ClothesQuery.css';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {show:false,
            start_time:tool.date('Y-m-d'),
            end_time:tool.date('Y-m-d'),
            status:'',
            serialsn:'',
            user_name:'',
            cardNumber:'',
            user_mobile:'',
            clothing_name:'',
            clothing_color:'',
            grid_num:'',
            clothes:[],
            count:0
        }
        this.query = this.query.bind(this)
        this.clear = this.clear.bind(this)
    }; 
    clear(){
        this.setState({clothes:[],count:0})
    }  
    query(){
        api.post('clothesQuery', {token:'token'.getData(),
        start_time:this.state.start_time,
        end_time:this.state.end_time,
        status:this.state.status,
        serialsn:this.state.serialsn,
        user_name:this.state.user_name,
        cardNumber:this.state.cardNumber,
        user_mobile:this.state.user_mobile,
        clothing_name:this.state.clothing_name,
        clothing_color:this.state.clothing_color,
        grid_num:this.state.grid_num
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({clothes:res.result.list,count:res.result.count})
            }
        }
        );
    }
    render() {
        var revokedata_detail = ['流水号','衣物编码','衣物名称','颜色','格架号','状态','姓名','手机','卡号'].map((item,index)=><span>{item}</span>)
        let clothes = this.state.clothes.map((item,index)=>
            <li>
                <span>{index+1}</span>
                <span>{item.serialsn}</span>
                <span>{item.clothing_number}</span>
                <span>{item.clothing_name}</span>
                <span>{item.clothing_color}</span>
                <span>{item.grid_num}</span>
                <span>{item.status}</span>
                <span>{item.user_name}</span>
                <span>{item.user_mobile}</span>
                <span>{item.card_number}</span>

                <span></span>
            </li>
       );
       
        return (
            <Window title='衣物查询' onClose={this.props.closeView} width='901' height='623'>
                <div className='clothesquery_top'>
                    <div className='clothesquery_top_one'>
                            <div>
                                <span>&emsp;&emsp;状态：</span><input type='text' className='e-input' onChange={e => this.setState({status:e.target.value})}/>
                            </div> 
                            <div>
                            <span>&emsp;&emsp;姓名：</span><input type='text' className='e-input' onChange={e => this.setState({user_name:e.target.value})}/>
                            </div>
                            <div>
                            <span>衣物名称：</span><input type='text' className='e-input' onChange={e => this.setState({clothing_name:e.target.value})} />
                            </div>
                        </div>
                    <div className='clothesquery_top_two'>
                            <div>
                                <span>&emsp;流水号：</span><input type='text' className='e-input' onChange={e => this.setState({serialsn:e.target.value})}/>
                            </div> 
                            <div>
                                <span>&emsp;&emsp;卡号：</span><input type='text' className='e-input' onChange={e => this.setState({cardNumber:e.target.value})}/>
                            </div>
                            <div>
                                <span>&emsp;&emsp;颜色：</span><input type='text' className='e-input' onChange={e => this.setState({clothing_color:e.target.value})}/>
                            </div>
                        </div>
                    <div className='clothesquery_top_three'>
                            <div>
                                <span>收衣时间:</span><input type='date' className='inputselectborder' value = {this.state.start_time}/><input type='date' className='inputselectborder' value = {this.state.start_time}/>
                            </div> 
                            <div>
                                <span>&emsp;&emsp;电话：</span><input type='text' className='e-input'  onChange={e => this.setState({user_mobile:e.target.value})}/>
                            </div>   
                            <div>
                                <span>&emsp;格架号：</span><input type='text' className='e-input' onChange={e => this.setState({grid_num:e.target.value})}/>
                            </div>
                        <div className='clothesquery_top_btn'>
                                <button className='e-btn' onClick={this.clear}>清空</button>
                                <button className='e-btn' onClick={this.query}>查询</button>
                            </div>
                            
                        </div>
                    
                </div>
                <div className='clothesquery_text'>
                    已为您找到
                    <label>{this.state.count}</label>条数据
                </div>
                <div className='clothesquery_bottom'>
                        <div className="revokedata_list revokedata_last OperatingDetails_list">
                        <ul className="revokedata_list_box clothesquery_bottom_list_box">
                            <li id="revokedata_list_box_li">
                                <span></span>
                                 {revokedata_detail}
                            </li>
                          {clothes}
                        </ul>
                    </div>
               </div>
               <div className="bothpages-footer">
                       <div className="bothpages-footer-btn">
                            <span>首页</span>
                            <span>上一页</span>
                            <span>下一页</span>
                            <span>尾页</span>
                       </div>
                       <div className="bothpages-footer-all">第<span>一</span>页/共<span>四</span>页</div>
                       <div className="bothpages-footer-both">每页<span>20</span>条，共<span>112</span>条</div>
                </div>   
            </Window>
        )
    }
}