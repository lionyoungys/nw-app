/**
 * 交期预警
 * @author  fanyerong&wangjun
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Deliverywarning from './Deliverywarning.css';
import Page from '../../UI/Page'
import Nodata from '../../UI/Nodata'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            page:1,
            clothing_number:'',//衣物编码
            list:[],
            count:1,
            nodatas:false,
        }
        this.limit=15;
        this.query=this.query.bind(this);
    };
    query(page){
       
        if(this.state.clothing_number == '' ){
            tool.ui.error({title:'提示',msg:'请输入衣物编码',button:'确定',callback:(close, event) => {
                close();
            }});          
        }else{
            page = page || this.state.page;
            api.post('past', {
                token:'token'.getData(),
                clothing_number:this.state.clothing_number,
                limit:this.limit,
                page:page
            }, (res, ver,handle) => {
                if (ver && res) {
                    console.log(res);
                    if(res.result.list.length>0){
                        this.setState({
                            list:res.result.list,
                            count:res.result.count,
                            page:page,
                            nodatas:false,
                        });
                    }else{
                        this.setState({nodatas:true,list:[],count:1})
                    }
                    
    
                }else{
                    handle();
                }
            }        
            );
        }
          
    }
    render() {
        let list=this.state.list.map((item,index)=>
        <tr>
            <td>{item.clothing_number}</td>
            <td>{item.clothing_name}</td>
            <td>{item.clothing_color}</td>
            <td>{item.pastTime}</td>
            <td>{item.user_name}</td>
            <td>{item.card_number}</td>
            <td>{item.user_mobile}</td>
        </tr>
        );
        return (
            <Window title='交期预警' onClose={this.props.closeView} >
               <div className="Deliverywarning-title">
                  <span>衣物编码:</span><input type="text" className='e-input del-war-input' value={this.state.clothing_number   
                } onChange={e=>this.setState({clothing_number:e.target.value})}/> <button className="e-btn" onClick={()=>this.query(1)}>查询</button>
               </div>
               <div className="deliverywarning-tab">
                  <table>
                      <thead>
                          <tr>
                              <th>衣物编码</th>
                              <th>名称</th>
                              <th>颜色</th>
                              <th>过期天数</th>
                              <th>姓名</th>
                              <th>卡号</th>
                              <th>电话</th>
                          </tr>
                      </thead>
                      <tbody>
                         {list}
                            {
                               this.state.nodatas
                                &&
                               <Nodata />
                            }
                         
                      </tbody>
                  </table>
                  <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)}/>
               </div>
             
            </Window>
           
        );
    }
}
