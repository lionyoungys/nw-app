/**
 * 颜色界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state = {show:false,
            show1:false,
            colorlist:[],
            colorname:'',
            index:0,
            colorid:''
        };         
        this.addColorYES = this.addColorYES.bind(this);    
        this.deleteColor = this.deleteColor.bind(this);
        this.updateColorYES = this.updateColorYES.bind(this);
    }; 
    addColorYES (){
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
                    tool.ui.error({msg:res.msg,callback:(close) => {
                        close();
                    }});
                    
                }
            }
        );
    }
    componentDidMount(){
        api.post('colorList', {
            token:'token'.getData(),
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res)
                    this.setState({colorlist:res.result.list});
                }else{
                    console.log(res.msg);
                    tool.ui.error({msg:res.msg,callback:(close) => {
                        close();
                    }});
                    
                }
            }
        );
    }
    deleteColor(e){
        let index=e.target.dataset.index;
        this.setState({index:index,colorid:this.state.colorlist[index].id});
        tool.ui.error({title:'提示',msg:'将删除颜色,颜色上的衣物信息可能丢失',button:'确定',callback:(close, event) => {
            if(event=='click'){
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
        <tr>
            <td>{index+1}</td>
            <td>{this.state.colorlist[index].name}</td>
            <td><b onClick={e => this.setState({show1:true,
                colorname:this.state.colorlist[index].name,
                colorid:this.state.colorlist[index].id
                })}>修改</b><i onClick={this.deleteColor} data-index={index}>删除</i></td>
         </tr>

    );
        return ( 
                <div>
                    <div className="brand">
                       <button className="brand-btn" onClick={e => this.setState({show:true,colorname:''})}>新 增 颜 色</button>
                       <div className="brand-tab">
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
                          </table>
                       </div>
                    </div>
                    {
                        this.state.show
                        &&
                        <Window title='新增颜色' onClose={() => this.setState({show:false})} width="230" height='160'>
                            <div className="addbrand-div">
                                <div className="brand-name">颜色名称</div>
                                <input  type="text" className="brand-text" value={this.state.colorname} onChange={e => this.setState({colorname:e.target.value})}/>
                            </div>
                            <div className="addbrand-footer">
                               <button onClick = {this.addColorYES}>新 增</button>
                            </div>
                        </Window>
                    }
                     {
                        this.state.show1
                        &&
                        <Window title='修改颜色' onClose={() => this.setState({show1:false})} width="230" height='160'>
                            <div className="addbrand-div">
                                <div className="brand-name">颜色名称</div>
                                <input  type="text" className="brand-text" value={this.state.colorname} onChange={e => this.setState({colorname:e.target.value})}/>
                            </div>
                            <div className="addbrand-footer">
                               <button onClick = {this.updateColorYES}>保 存</button>
                            </div>
                        </Window>
                    }
                </div>
                
        );            
    };
}