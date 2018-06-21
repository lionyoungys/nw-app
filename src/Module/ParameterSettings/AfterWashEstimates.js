/**
 * 洗后预估界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
export default class extends Component {   
    constructor(props) {
        super(props); 
        this.state = {show:false,
            show1:false,
            brandlist:[],
            brandname:'',
            index:0,
            brandid:''
        };         
        this.addbrandYES = this.addbrandYES.bind(this);    
        this.deleteBrand = this.deleteBrand.bind(this);
        this.updatebrandYES = this.updatebrandYES.bind(this);
    }; 
    addbrandYES (){
        api.post('addForecast', {
            token:'token'.getData(),
            forecast:this.state.brandname,
            tyep:'',
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
    updatebrandYES(){
        api.post('modForecast', {
            token:'token'.getData(),
            id:this.state.brandid,
            forecast:this.state.brandname,
            tyep:'',
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
        api.post('forecastList', {
            token:'token'.getData(),
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res)
                    this.setState({brandlist:res.result});
                }else{
                    console.log(res.msg);
                    tool.ui.error({msg:res.msg,callback:(close) => {
                        close();
                    }});
                    
                }
            }
        );
    }
    deleteBrand(e){
        let index=e.target.dataset.index;
        this.setState({index:index,brandid:this.state.brandlist[index].id});
        tool.ui.error({title:'提示',msg:'将删除洗后预估,洗后预估上的衣物信息可能丢失',button:'确定',callback:(close, event) => {
            api.post('delForecast', {token:'token'.getData(),
            id:this.state.brandid
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res)
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
        }});

    }
    render() {      
        let brandlist = this.state.brandlist.map((item,index) => 
        <tr>
            <td>{index+1}</td>
            <td>{this.state.brandlist[index].forecast}</td>
            <td><b onClick={e => this.setState({show1:true,
                brandname:this.state.brandlist[index].forecast,
                brandid:this.state.brandlist[index].id
                })}>修改</b><i onClick={this.deleteBrand} data-index={index}>删除</i></td>
         </tr>

    );
        return ( 
                <div>
                    <div className="brand">
                       <button className="brand-btn" onClick={e => this.setState({show:true,brandname:''})}>新增洗后预估</button>
                       <div className="brand-tab">
                          <table>
                              <thead>
                                  <tr>
                                      <th>ID</th>
                                      <th>洗后预估名称</th>
                                      <th>操作</th>
                                  </tr>
                              </thead>
                              <tbody> 
                                  {brandlist}                         
                              </tbody>
                          </table>
                       </div>
                    </div>
                    {
                        this.state.show
                        &&
                        <Window title='新增洗后预估' onClose={() => this.setState({show:false})} width="230" height='160'>
                            <div className="addbrand-div">
                                <div className="brand-name">洗后预估名称</div>
                                <input  type="text" className="brand-text" value={this.state.brandname} onChange={e => this.setState({brandname:e.target.value})}/>
                            </div>
                            <div className="addbrand-footer">
                               <button onClick = {this.addbrandYES}>新 增</button>
                            </div>
                        </Window>
                    }
                     {
                        this.state.show1
                        &&
                        <Window title='修改洗后预估' onClose={() => this.setState({show1:false})} width="230" height='160'>
                            <div className="addbrand-div">
                                <div className="brand-name">洗后预估名称</div>
                                <input  type="text" className="brand-text" value={this.state.brandname} onChange={e => this.setState({brandname:e.target.value})}/>
                            </div>
                            <div className="addbrand-footer">
                               <button onClick = {this.updatebrandYES}>保 存</button>
                            </div>
                        </Window>
                    }
                </div>
                
        );            
    };
}