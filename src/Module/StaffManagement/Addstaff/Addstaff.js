/**
 * 员工界面组件
 * @author wangjun & fanyerong
 */
import React, {Component} from 'react';
import '../../../UI/bothpages.css' ; //公共样式
import '../StaffManagement.css';
import Dish from '../../../UI/Dish';
import LayerBox from '../../../UI/LayerBox';
import Select from '../../../UI/Select'; 
export default class extends Component {   
    constructor(props) {
        super(props);     
        this.state = {
            show:false,
            show1:false,
            show2:false,
            operatorlist:[],
            aname : '',
            user_permissions :'',  
            id:'',
            auth_name:[],
            auto:[],
            index:0,
            write:'',
            mobile:'',
            password:''
        }   
        this.operatorAdd = this.operatorAdd.bind(this); 
        this.ask2 = this.ask2.bind(this);
        this.addstaff = this.addstaff.bind(this);
        this.onchange = this.onchange.bind(this);
        this.modOperator = this.modOperator.bind(this);
        this.updatemobile = this.updatemobile.bind(this);
        this.updatepassword = this.updatepassword.bind(this);
        this.modOperatorSuccess = this.modOperatorSuccess.bind(this);
        this.modpasswdSuccess = this.modpasswdSuccess.bind(this);
        this.resetPas = this.resetPas.bind(this);
    }; 
    componentDidMount() {
        api.post('operatorList', { token: 'token'.getData() }, (res, ver, handle) => {
            if (ver && res) {
                console.log(res)
                this.setState({ operatorlist: res.result });
            }
        });
    }
    //员工与权限 新增员工
    operatorAdd () {
       if(''==this.state.aname)
       return tool.ui.error({msg:'请输入姓名',callback:(close) => {close(); }});
       if(''==this.state.mobile)
       return tool.ui.error({msg:'请输入手机号',callback:(close) => {close(); }});
        api.post('operatorAdd', {
            token:'token'.getData(),
            aname:this.state.aname,
            account:this.state.mobile,
            auth:this.state.auth[this.state.index].id,
           
        }, (res, ver,handle) => {
                if (ver && res) {
                    console.log(res)
                    this.setState({show:false});
                    this.componentDidMount();   
                }
                handle();
            }
        );4
    }
    // 编辑员工
    modOperator (e){
        var write = e.target.dataset.index
        this.setState({
            show1:true,
            write:write,
            aname:this.state.operatorlist[write].aname,
            mobile:this.state.operatorlist[write].account,
            auth:this.state.operatorlist[write].auth_name
        });  
        this.staffauthlist();
       
    }
    ask2(e) {

        var index = e.target.dataset.index;
        var operatorlist=this.state.operatorlist;
        tool.ui.ask({title:'删除员工',info:'提示:该操作不可逆转。删除员工后，该账号将被强<br/>制下线并永久封停，但该员工的操作历史仍将保留。<br/>', callback:(close, event) => {
              //点击按钮或关闭符号时关闭弹窗
              //删除员工
              console.log(event)
              if(event=='close'){
                  close();
              }else{
              api.post('delOperator', {
                token:'token'.getData(),
                id:this.state.operatorlist[index].id,
                }, (res, ver) => {
                        if (ver && res) {
                            console.log(res);
                            close();
                            operatorlist.splice(index,1)  
                            this.setState({operatorlist:operatorlist})   
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
               
        }});
    }
    onchange(value){
        this.setState({index:value.inObjArray(this.state.auth, 'auth_name')});
    }
    //员工列表显示
    addstaff(){
        this.setState({
            show:true,
            aname:'',
            mobile:'',
        });
        this.staffauthlist();
        
       
    }
    //请求员工权限列表
    staffauthlist(){
        api.post('authList', {
            token:'token'.getData(),
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res)
                    this.setState({auth_name:res.result.typeArray('auth_name'),auth:res.result});
                }
            }
        );
    }
    modOperatorSuccess(){
       if(''==this.state.aname)
       return tool.ui.error({msg:'请输入姓名',callback:(close) => {close(); }});
       if(''==this.state.mobile)
       return tool.ui.error({msg:'请输入手机号',callback:(close) => {close(); }});
        console.log(this.state.account)
        api.post('modOperator', {
            token:'token'.getData(),
            id:this.state.operatorlist[this.state.write].id,
            aname:this.state.aname,
            account:this.state.mobile,
            auth:this.state.auth[this.state.index].id,
        }, (res, ver,handle) => {
                if (ver && res) {
                    this.setState({show1:false})
                    console.log(res)
                   this.componentDidMount();
                }
                handle();
            }
        );
    }
    updatepassword(){
        // this.setState({show1:true,write:write}); 
        console.log('aaa')
        this.input2.removeAttribute('disabled'); 
        
    }
    modpasswdSuccess(){
      
        api.post('resetPasswd', {
            token:'token'.getData(),
            id:this.state.operatorlist[this.state.index].id
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res)
                    this.setState({show2:false})
                   this.componentDidMount();
                }
            }
        );
    }
    updatemobile(){
        console.log(this.input);
        this.input.removeAttribute('disabled');
        console.log(this.input);
    }
    
    // 重置密码调用
   resetPas(e){

       var index = e.target.dataset.index;
       var operatorlist = this.state.operatorlist;
       tool.ui.ask({
           title: '重置密码', msg: '提示:该操作不可逆转。重置密码后密码将被修改为123456。', callback: (close, event) => {
               //点击按钮或关闭符号时关闭弹窗
               console.log(event)
               if (event == 'close') {
                   close();
               } else {
                   api.post('resetPasswd', {
                       token: 'token'.getData(),
                       id: operatorlist[index].id,
                    }, (res, ver) => {
                       
                       if (ver && res) {
                           console.log(res);
                           close();
                           tool.ui.success({
                               callback: (close, event) => {
                                   close();
                               }
                           }); 

                       } else {
                           console.log(res.msg);
                           tool.ui.error({
                               msg: res.msg, callback: (close) => {   
                                   close();
                               }
                           });
                       }
                    }
                   );
               }
           }
       });
   } 
    render() {  
      
        let operatorlist= this.state.operatorlist.map((item,index) => 
        <tr key= {'item'+index}>
            <td>{index+1}</td>
            <td>{item.aname}</td>
            <td>{item.account}</td>
            <td>{item.auth_name}</td>
            <td ><i onClick={this.modOperator} data-index={index}>编辑</i><i onClick={this.ask2} data-index={index}>删除</i><i onClick={this.resetPas} data-index={index}>重置密码</i></td>
        </tr>
        );
        return ( 
                <div>
                    <div className="addstaff" onClick={this.addstaff}>新增员工</div> 
                    {
                    this.state.show
                    &&       
                    <Dish title='新增员工' width='360' height='260' onClose={() => this.setState({ show: false })}>
                        <div className='addstaffborder'>
                            <div className='margintop'>
                                <span >姓名:</span><input type='text' onChange={e => this.setState({ aname: e.target.value })} value={this.state.aname} autoFocus='autoFocus' />
                            </div>
                            <div>
                                <span>手机号:</span><input type='text' onChange={e => this.setState({ mobile: e.target.value })} value={this.state.mobile} />
                            </div>
                            <div >
                                <span >权限:</span><Select option={this.state.auth_name} selected={this.state.auth_name[0]} onChange={this.onchange} />
                            </div>
                            <div>
                                <span className='passlimit'>初始密码为123456</span>
                            </div>
                        </div>
                        <div className='handle-div'>
                            <button type="button" class="e-btn" onClick={this.operatorAdd}>确定</button>
                            <button type="button" class="e-btn-b" onClick={() => this.setState({ show: false })}>取消</button>
                        </div>
                    </Dish>           
                    // <LayerBox title='新增员工' onClose={() => this.setState({show:false})} onClick={this.operatorAdd}>
                    //     {
                            
                    //     }
                    // </LayerBox>
                }
                    <div className="bothpages_count">                           
                        <div className="bothpages_count_title Addstaff_count_list">
                            <span></span>
                            <span>姓名</span>
                            <span>手机号</span>
                            <span>权限</span>
                            <span>操作</span>
                        </div>                                        
                        <table className="bothpages_count_list " cellPadding="0" cellSpacing="0" border="0">  
                            <tbody>                            
                               {operatorlist}
                            </tbody>
                        </table>
                    </div>                    
                    {
                    this.state.show1
                    &&                   
                    <LayerBox title='编辑员工' onClose={() => this.setState({show1:false})} onClick={this.modOperatorSuccess} >
                        {
                            <div className='updatestaffborder'>
                                <div className='margintop'>
                                    <span >姓名:</span><input  type='text' value = {this.state.aname} onChange={e => this.setState({aname:e.target.value})} autoFocus='autoFocus'/>
                                </div>
                                <div className='mobilephone'>
                                    <span>手机号:</span><input type='text'  ref={input => this.input = input}  onChange={e => this.setState({mobile:e.target.value})} value={this.state.mobile} disabled/><span className='updatemobile' onClick={this.updatemobile}>修改手机号</span>
                                </div>
                              {/* <div>
                              <span>密码:</span><input type='text'  ref={input2 => this.input2 = input2} onChange={e => this.setState({password:e.target.value})} value={this.state.password} disabled/><span className='updatemobile' onClick={this.updatepassword}>修改密码</span>
                              </div> */}
                            <div>
                               <span >权限:</span>&nbsp;&nbsp;<Select option={this.state.auth_name} selected={this.state.auth} onChange={this.onchange}/>
                        </div>
                    </div>
                     }
                    </LayerBox>
                }                
                </div>
        );            
    };
}