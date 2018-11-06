/**
 * 颜色界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Page from '../../UI/Page'
import Dish from '../../UI/Dish';
import Table from '../../UI/Table'
export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state = {show:false,
            show1:false,
            colorlist:[],
            colorname:'',
            index:0,
            colorid:'',
            page:1,
            count:1,
        };  
        this.limit = 15;       
        this.addColorYES = this.addColorYES.bind(this);    
        this.deleteColor = this.deleteColor.bind(this);
        this.updateColorYES = this.updateColorYES.bind(this);
    }; 
    addColorYES (){
        if ('' == this.state.colorname) return tool.ui.error({msg:'请输入颜色名称！',callback:close => close()});
        api.post('addColor', {
            token:'token'.getData(),
            name:this.state.colorname,
            help_num:'',
            forecast:''
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res);
                    this.setState({show:false});
                    this.componentDidMount();
                }else{
                    console.log(res.msg);
                    tool.ui.error({msg:res.msg,callback:(close) => {
                        close();
                    }});
                    
                }
            }
        );
    }
    updateColorYES(){
        if ('' == this.state.colorname) return tool.ui.error({msg:'请输入颜色名称！',callback:close => close()});
        api.post('modColor', {
            token:'token'.getData(),
            id:this.state.colorid,
            name:this.state.colorname,
            help_num:'',
            forecast:''
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res);
                    this.setState({show1:false});
                    this.componentDidMount();
                }else{
                    console.log(res.msg);
                    tool.ui.error({msg:'且须修改一项',callback:(close) => {
                        close();
                    }});
                    
                }
            }
        );
    }
    query(page) {
        page = page || this.state.page;
        api.post('colorList', {
            token:'token'.getData(),
            page: page, 
            limit: this.limit
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res)
                    this.setState({colorlist:res.result.list, count: res.result.count, page:page});
                }else{
                    console.log(res.msg);
                    tool.ui.error({msg:res.msg,callback:(close) => {
                        close();
                    }});
                    
                }
            }
        );
    }
    componentDidMount(){
         this.query();
    }
    deleteColor(e){
        let index=e.target.dataset.index;
        this.setState({index:index,colorid:this.state.colorlist[index].id});
        tool.ui.error({title:'提示',msg:'将删除颜色,颜色上的衣物信息可能丢失',button:['确定'],callback:(close, event) => {
            if(event=='确定'){
            api.post('delColor', {token:'token'.getData(),
            id:this.state.colorid
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res)
                    tool.ui.success({callback:(close, event) => {
                        close();
                    }}); 
                }else{
                    tool.ui.error({callback:(close, event) => {
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
    render() {      
        let colorlist = this.state.colorlist.map((item,index) => 
        <tr key={'item'+index}>
            <td>{index+1+(this.state.page-1)*this.limit}</td>
            <td>{this.state.colorlist[index].name}</td>
            <td><span className='e-blue' onClick={e => this.setState({show1:true,
                colorname:this.state.colorlist[index].name,
                colorid:this.state.colorlist[index].id
                })}>修改</span>&nbsp;&nbsp;<span className='e-blue' onClick={this.deleteColor} data-index={index}>删除</span></td>
         </tr>

    );
        return ( 
                <div>
                    <div >
                       <div className='brand_div'>
                       <button className="brand-btn" onClick={e => this.setState({show:true,colorname:''})}>新 增 颜 色</button>
                       </div>
                       <Table style={{height:'294px',marginLeft:'10px',marginRight:'10px'}}>
                            <thead>
                                 <tr><th>ID</th><th>颜色名称</th><th>操作</th></tr>
                            </thead>
                            <tbody> 
                                  {colorlist}                         
                              </tbody>
                    </Table>    
                       {/* <div className="brand-tab">
                          <table>
                              <thead>
                                  <tr>
                                      <th>ID</th>
                                      <th>颜色名称</th>
                                      <th>操作</th>
                                  </tr>
                              </thead>
                              <tbody> 
                                  {colorlist}                         
                              </tbody>
                          </table> */}
                          <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)}/>
                       {/* </div> */}
                    </div>
                    {
                        this.state.show
                        &&
                        <Dish title='新增颜色' onClose={() => this.setState({show:false})} width="389" height='194'>
                            <div className="addbrand-div">
                                <div className="brand-name">颜色名称</div>
                                <input  type="text" className="brand-text" value={this.state.colorname} onChange={e => this.setState({colorname:e.target.value})}/>
                            </div>
                            <div className="addbrand-footer">
                               <button onClick = {this.addColorYES}>新 增</button>
                            </div>
                        </Dish>
                    }
                     {
                        this.state.show1
                        &&
                        <Dish title='修改颜色' onClose={() => this.setState({show1:false})} width="389" height='194'>
                            <div className="addbrand-div">
                                <div className="brand-name">颜色名称</div>
                                <input  type="text" className="brand-text" value={this.state.colorname} onChange={e => this.setState({colorname:e.target.value})}/>
                            </div>
                            <div className="addbrand-footer">
                               <button onClick = {this.updateColorYES}>保 存</button>
                            </div>
                        </Dish>
                    }
                </div>
                
        );            
    };
}