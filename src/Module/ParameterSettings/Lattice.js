/**
 * 格架界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import LayerBox from '../../UI/LayerBox';
import Page from '../../UI/Page'
export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state = {show:false,
            show1:false,
            name:'',
            max_number:'',
            start_number:'',
            end_number:'',
            id:'',
            grid:[],
            write:'',  
            page:1,
            count:1,
        };      
        this.limit = 15;    
        this.addlatticeYES = this.addlatticeYES.bind(this);   
        this.updatelatticeYES = this.updatelatticeYES.bind(this);
        this.modlattice = this.modlattice.bind(this); 
        this.error2 = this.error2.bind(this);
        

    };
    
    // 删除格架操作 
    error2(e) {
        var write = e.target.dataset.write
        this.setState({id:this.state.grid[write].id})
        tool.ui.error({title:'提示',msg:'将删除格架,格架上的衣物信息可能丢失',button:'确定',callback:(close, event) => {
            console.log(event)
            if(event=='click'){
            api.post('delGrid', {token:'token'.getData(),
            id:this.state.id
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res);
                    console.log(11111)
                    tool.ui.success({callback:(close, event) => {
                        close();
                    }}); 
                }else{
                    console.log(res.msg);
                    tool.ui.error({msg:res.msg,callback:(close) => {
                        close();
                    }});
                    
                }
                close();
                this.componentDidMount();
            }
            );
         }else{
             close();
         }
        }});
    }
    componentDidMount() {
         this.query();
    }
    query(page) {
        page = page || this.state.page;
        api.post('grid', {token:'token'.getData(),
        gridPage: page, 
        gridLimit: this.limit
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({grid:res.result.grid, count: res.result.gridCount, page:page})
            }else{
                console.log(res.msg);
                tool.ui.error({msg:res.msg,callback:(close) => {
                    close();
                }});
                
            }
        }
        );
    }
    // 新增格架操作
    addlatticeYES (){      
        // this.setState({show:false})
        if ('' == this.state.name) return tool.ui.error({msg:'请输入格架名称！',callback:close => close()});
        if ('' == this.state.start_number) return tool.ui.error({msg:'请输入首数！',callback:close => close()});
        if ('' == this.state.end_number) return tool.ui.error({msg:'请输入尾数！',callback:close => close()});
        if ('' == this.state.max_number) return tool.ui.error({msg:'请输入挂衣数量！',callback:close => close()});
        if(! /^\d+$/.test(this.state.start_number)){
            this.setState({start_number:'',end_number:'',max_number:''})
            tool.ui.error({title:'提示',msg:'请输入正整数',button:'确定',callback:(close, event) => {
                close();
            }});
        }else if(! /^\d+$/.test(this.state.end_number)){
            this.setState({start_number:'',end_number:'',max_number:''})
            tool.ui.error({title:'提示',msg:'请输入正整数',button:'确定',callback:(close, event) => {
                close();
            }});
        }else if(! /^\d+$/.test(this.state.max_number)){
            this.setState({start_number:'',end_number:'',max_number:''})
            tool.ui.error({title:'提示',msg:'请输入正整数',button:'确定',callback:(close, event) => {
                close();
            }});
        }else{
            api.post('addGrid', {token:'token'.getData(),
            name:this.state.name,
            max_number:this.state.max_number,
            start_number:this.state.start_number,
            end_number:this.state.end_number
            }, (res, ver) => {
                if (ver && res) {
                    console.log(res)
                    tool.ui.success({callback:(close, event) => {
                        this.componentDidMount();
                        this.setState({name:'',max_number:'',start_number:'',end_number:'',show:false})
                        close();
                    }}); 
                }else{
                    console.log(res.msg);
                    tool.ui.error({msg:res.msg,callback:(close) => {
                        close();
                    }});
                    
                }
            }
            );
        }
        
    }
    updatelatticeYES (e){      
        // this.setState({show:false})
        if ('' == this.state.max_number) return tool.ui.error({msg:'请输入挂衣数量！',callback:close => close()});
        api.post('modGrid', {token:'token'.getData(),
        id:this.state.id,
        name:this.state.name,
        max_number:this.state.max_number,
        start_number:this.state.start_number,
        end_number:this.state.end_number
    }, (res, ver) => {
            if (ver && res) {
                console.log(111)    
                tool.ui.success({callback:(close, event) => {
                    
                    this.setState({show1:false})
                    this.componentDidMount();
                    close();
                }}); 
            }else{
                console.log(不成功);
                tool.ui.error({msg:res.msg,callback:(close) => {
                    close();
                }});
                
            }
        }
        );
    }
     // 编辑格架
     modlattice (e){
        var write = e.target.dataset.write
        this.setState({
            show1:true,
            write:write,
            id:this.state.grid[write].id,
            name:this.state.grid[write].name,
            start_number:this.state.grid[write].start_number,
            end_number:this.state.grid[write].end_number,
            max_number:this.state.grid[write].max_number
        });
         
    }
    render() {      
        let grid = this.state.grid.map((item,index)=>
        <tr>
                <td>{index+1+(this.state.page-1)*this.limit}</td>
                <td>{item.name}</td>
                <td>{item.start_number}</td>
                <td>{item.end_number}</td>
                <td>{item.max_number}</td>
                <td>  
                    <b onClick={this.modlattice} data-write={index}>编辑</b>
                    <i  onClick={this.error2} data-write={index}>删除</i>
                </td>
              
        </tr>
        
   );
  
        return ( 
                <div>
                    <div className="lattic">
                       <button className="lattic-btn" onClick={e => this.setState({show:true,name:'',start_number:'',end_number:'',max_number:''})}>新 增 格 架</button>
                       <div className="lattic-tab">
                          <table border='0' cellPadding="0" cellSpacing="0">
                              <thead>
                                  <tr>
                                      <th>ID</th>
                                      <th>格架名称</th>
                                      <th>首数</th>
                                      <th>尾数</th>
                                      <th>每衣挂号最大挂衣数</th>                                   
                                      <th>操作</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {grid}
                              </tbody>
                          </table>
                          <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)}/>
                       </div>
                    </div>
                    {
                        this.state.show
                        &&
                        <Window title='新增格架' onClose={() => this.setState({show:false})} width="340" height='264'>
                            <div className="addlattice-div">
                                 <div><span>格架名称：</span><input type='text' value={this.state.name} onChange={e => this.setState({name:e.target.value})}/></div>
                                 <div><span>首数：</span><input type='number' value={this.state.start_number} onChange={e => this.setState({start_number:e.target.value})} /></div>
                                 <div><span>尾数：</span><input type='number'  value={this.state.end_number} onChange={e => this.setState({end_number:e.target.value})}  /></div>
                                 <div><span>每衣挂号最大挂衣数：</span><input type='number' value={this.state.max_number} onChange={e => this.setState({max_number:e.target.value})} min="0"/></div>
                            </div>
                            <div className="addlattice-footer">
                               <button onClick = {this.addlatticeYES}>新 增</button>
                            </div>
                        </Window>
                    }
                     {
            this.state.show1
            &&
            <Window title='编辑格架' onClose={() => this.setState({show1:false})} width="340" height='264'>
                <div className="addlattice-div">
                     <div><span>格架名称：</span><input type='text' value={this.state.name} onChange={e => this.setState({name:e.target.value})} disabled/></div>
                     <div><span>首数：</span><input type='number' value={this.state.start_number} onChange={e => this.setState({start_number:e.target.value})} disabled /></div>
                     <div><span>尾数：</span><input type='number'  value={this.state.end_number} onChange={e => this.setState({end_number:e.target.value})} disabled /></div>
                     <div><span>每衣挂号最大挂衣数：</span><input type='number' value={this.state.max_number} onChange={e => this.setState({max_number:e.target.value})} min="0" /></div>
                </div>
                <div className="addlattice-footer">
                   <button onClick = {this.updatelatticeYES}>保 存</button>
                </div>
            </Window>
        }
                </div>
                
        );            
    };
}