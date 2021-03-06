/**
 * 衣物查询
 * @author  wangjun
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import './ClothesQuery.css';
import Page from '../../UI/Page'
import Nodata from '../../UI/nodata'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {show:false,
            start_time:tool.date('Y-m-d'),
            end_time:tool.date('Y-m-d'),
            status:'未取走',
            serialsn:'',
            user_name:'',
            cardNumber:'',
            user_mobile:'',
            clothing_name:'',
            clothing_color:'',
            grid_num:'',
            clothes:[],
            count:0,
            page:1,
            nodatas:true,
        }
        this.limit = 15;
        this.query = this.query.bind(this)
        this.clear = this.clear.bind(this)
    }; 
    clear(){
        this.setState({clothes:[],count:0,page:1})
    }  
    query(page){
        console.log(page);
        page = page || this.state.page;
        let params= {token:'token'.getData(),
        start_time:this.state.start_time,
        end_time:this.state.end_time,
        status:this.state.status=='未取走'?'3':this.state.status=='已取走'?'4':'5',
        serialsn:this.state.serialsn,
        user_name:this.state.user_name,
        cardNumber:this.state.cardNumber,
        user_mobile:this.state.user_mobile,
        clothing_name:this.state.clothing_name,
        clothing_color:this.state.clothing_color,
        grid_num:this.state.grid_num,
        page:page,
        limit:this.limit,
    }
        console.log(params)
        api.post('clothesQuery',params, (res, ver,handle) => {
            if (ver && res) {
                console.log(res);
                if(res.result.list.length>0){
                    this.setState({clothes:res.result.list,count:res.result.count,page:page,nodatas:false})
                }else{
                    this.setState({nodatas:true,clothes:[],count:0})
                }
                
            }else{
                handle;
            }
        });
    }
    render() {
        
        let clothes = this.state.clothes.map((item,index)=>
            <tr key={'item'+index}>
                <td>{index+1+(this.state.page-1)*this.limit}</td>
                <td>{item.serialsn==null?item.ordersn:item.serialsn}</td>
                <td>{item.clothing_number}</td>
                <td>{item.clothing_name}</td>
                <td>{item.clothing_color}</td>
                <td>{item.grid_num}</td>
                <td>{item.status == 3 ? '未取走' : item.status == 4 ? '已取走' : '已撤单'}</td>
                <td>{item.user_name}</td>
                <td>{item.user_mobile}</td>
                <td>{item.card_number}</td>
            </tr>
       );
        return (
            <Window title='衣物查询' onClose={this.props.closeView} width='901' height='623'>
                <div className='clothesquery_top'> 
                    <div className='clothesquery_top_one'>
                        <div>
                            <span>&emsp;&emsp;状态：</span><Select  option={['未取走','已取走','已撤单']} selected='未取走' onChange={value => this.setState({status:value})}/>
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
                            <span>开始日期：</span><input type='date' className='inputselectborder clo-date' value = {this.state.start_time} onChange={e=>this.setState({start_time:e.target.value})}/>
                            <span>结束日期：</span><input type='date' className='inputselectborder clo-date' value = {this.state.end_time} onChange={e=>this.setState({end_time:e.target.value})}/>
                        </div> 
                        <div>
                            <span>&emsp;&emsp;电话：</span><input type='text' className='e-input'  onChange={e => this.setState({user_mobile:e.target.value})}/>
                        </div>   
                        <div>
                            <span>&emsp;衣挂号：</span><input type='text' className='e-input' onChange={e => this.setState({grid_num:e.target.value})}/>
                        </div>
                        <div className='clothesquery_top_btn'>
                            <button className='e-btn' onClick={this.clear}>清空</button>
                            <button className='e-btn' onClick={()=>this.query(1)}>查询</button>
                        </div>     
                    </div>
                    
                </div>
                <div className='clothesquery_text'>
                    已为您找到
                    <label>{this.state.count}</label>条数据
                </div>
                <table className='ui-table-base clo-que-tab' id="clo-que-tab">
                    <thead>
                        <tr>
                            <td></td>
                            <td>流水号/订单号</td>
                            <td>衣物编码</td>
                            <td>衣物名称</td>
                            <td>颜色</td>
                            <td>衣挂号</td>
                            <td>状态</td>
                            <td>姓名</td>
                            <td>手机</td>
                            <td>卡号</td>
                        </tr>
                    </thead>
                    <tbody>
                        {clothes}
                        {this.state.nodatas&&<Nodata />}
                    </tbody>
                </table>  
                <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)} />
            </Window>
        )
    }
}