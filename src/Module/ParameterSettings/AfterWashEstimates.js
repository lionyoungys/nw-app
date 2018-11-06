/**
 * 洗后预估界面组件
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
            brandlist:[],
            brandname:'',
            index:0,
            brandid:'',
            page:1,
            count:1,
        };    
        this.limit = 15;          
        this.addbrandYES = this.addbrandYES.bind(this);    
        this.deleteBrand = this.deleteBrand.bind(this);
        this.updatebrandYES = this.updatebrandYES.bind(this);
    }; 
    addbrandYES (){
        if ('' == this.state.brandname) return tool.ui.error({msg:'请输入洗后预估名称！',callback:close => close()});
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
        if ('' == this.state.brandname) return tool.ui.error({msg:'请输入洗后预估名称！',callback:close => close()});
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
                    tool.ui.error({msg:'且须修改一项',callback:(close) => {
                        close();
                    }});
                    
                }
            }
        );
    }
    query(page) {
        page = page || this.state.page;
        api.post('forecastList', {
            token:'token'.getData(),
            page: page, 
            limit: this.limit
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res)
                    this.setState({brandlist:res.result.list, count: res.result.count, page:page });
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
    deleteBrand(e){
        let index=e.target.dataset.index;
        this.setState({index:index,brandid:this.state.brandlist[index].id});
        tool.ui.error({title:'提示',msg:'将删除洗后预估,洗后预估上的衣物信息可能丢失',button:['确定'],callback:(close, event) => {
            if(event=='确定'){
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
        }else{
            close();
        }
        }});

    }
    render() {      
        let brandlist = this.state.brandlist.map((item,index) => 
        <tr key = {'item'+index}>
            <td>{index+1+(this.state.page-1)*this.limit}</td>
            <td>{this.state.brandlist[index].forecast}</td>
            <td><span className='e-blue'  onClick={e => this.setState({show1:true,
                brandname:this.state.brandlist[index].forecast,
                brandid:this.state.brandlist[index].id
                })}>修改</span>&nbsp;&nbsp;<span  className='e-blue' onClick={this.deleteBrand} data-index={index}>删除</span></td>
         </tr>

    );
        return ( 
                <div>
                    <div >
                        <div className='brand_div'>
                       <button className="brand-btn" onClick={e => this.setState({show:true,brandname:''})}>新增洗后预估</button>
                       </div>
                       <Table style={{height:'294px',marginLeft:'10px',marginRight:'10px'}}>
                            <thead>
                                 <tr><th>ID</th><th>洗后预估名称</th><th>操作</th></tr>
                            </thead>
                            <tbody> 
                                  {brandlist}                         
                              </tbody>
                    </Table>    
                       {/* <div className="brand-tab">
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
                          </table> */}
                          <Page  current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)}/>
                       {/* </div> */}
                    </div>
                    {
                        this.state.show
                        &&
                        <Dish title='新增洗后预估' onClose={() => this.setState({show:false})} width="389" height='194'>
                            <div className="addbrand-div">
                                <div className="brand-name">洗后预估名称</div>
                                <input  type="text" className="brand-text" value={this.state.brandname} onChange={e => this.setState({brandname:e.target.value})}/>
                            </div>
                            <div className="addbrand-footer">
                               <button onClick = {this.addbrandYES}>新 增</button>
                            </div>
                        </Dish>
                    }
                     {
                        this.state.show1
                        &&
                        <Dish title='修改洗后预估' onClose={() => this.setState({show1:false})} width="389" height='194'>
                            <div className="addbrand-div">
                                <div className="brand-name">洗后预估名称</div>
                                <input  type="text" className="brand-text" value={this.state.brandname} onChange={e => this.setState({brandname:e.target.value})}/>
                            </div>
                            <div className="addbrand-footer">
                               <button onClick = {this.updatebrandYES}>保 存</button>
                            </div>
                        </Dish>
                    }
                </div>
                
        );            
    };
}