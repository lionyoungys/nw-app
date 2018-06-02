/**
 * 新增员工界面组件
 * @author wangjun & fanyerong
 */
import React, {Component} from 'react';
 import '../../../UI/bothpages.css'  //公共样式
import '../StaffManagement.css';
import {Table} from '../../../UI/Table';
import LayerBox from '../../../Ui/LayerBox';
import Select from '../../../UI/Select';
export default class extends Component {   
    constructor(props) {
        super(props);     
        this.state = {
            show:false,
            show1:false,
            operatorlist:[],
            user_name : '',
            user_phone : '', 
            user_permissions :'',  
            id:'',
            auth_name:[],
            auto:[],
            index:0,
            write:''
           
        }   
        this.operatorAdd = this.operatorAdd.bind(this); 
        this.ask2 = this.ask2.bind(this);
        this.addstaff = this.addstaff.bind(this);
        this.onchange = this.onchange.bind(this);
        this.modOperator = this.modOperator.bind(this);
    }; 
    //员工与权限 新增员工
    operatorAdd () {
       
        api.post('OperatorAdd', {
            token:'token'.getData(),
            aname:this.state.user_name,
            account:this.state.user_phone,
            auth:this.state.auth[this.state.index].id,
           
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res)
                    this.setState({show:false});
                }
            }
        );
    }
    // 编辑员工
    modOperator (e){
        var write = e.target.dataset.write
        this.setState({show1:true,write:write});  

    }
    ask2(e) {
        var id = e.target.dataset.id;
        var index = e.target.dataset.index;
        var operatorlist=this.state.operatorlist;
        tool.ui.ask({title:'删除员工',info:'提示:该操作不可逆转。删除员工后，该账号将被强<br/>制下线并永久封停，但该员工的操作历史仍将保留。<br/>', callback:(close, event) => {
              //点击按钮或关闭符号时关闭弹窗
              //删除员工
              api.post('delOperator', {
                token:'token'.getData(),
                id:id,
                }, (res, ver) => {
                        if (ver && res) {
                            console.log(res);
                            close();
                            operatorlist.splice(index,1)  
                            this.setState({operatorlist:operatorlist})                        
                        }else{
                            close();
                        }
                    }
               );
            
               
        }});
    }
    onchange(value){
        this.setState({index:value.inObjArray(this.state.auth, 'auth_name')});
    }
    addstaff(){
        this.setState({show:true});
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
    render() {  
        api.post('operatorList', {token:'token'.getData()}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({operatorlist:res.result});
            }
        }
        );    
        let operatorlist= this.state.operatorlist.map((item,index) => 
        <tr>
        <td>{index+1}</td>
        <td>{item.aname}</td>
        <td>{item.account}</td>
        <td>{item.auth_name}</td>
        <td ><i onClick={this.modOperator} data-write={index}>编辑</i><i onClick={this.ask2} data-id={item.id} data-index = {index}>删除</i></td>
        {
                    this.state.show1
                    &&
                   
                    <LayerBox title='编辑员工' onClose={() => this.setState({show1:false})} onClick={() => this.setState({show1:false})}>
                        {
                            <div className='updatestaffborder'>
                            <div className='margintop'>
                            <span >姓名:</span><input  type='text' value = {this.state.operatorlist[this.state.write].aname} />
                            </div>
                             <div className='mobilephone'>
                             <span>手机号:</span><input type='text' className='updatemobileinput' value={this.state.operatorlist[this.state.write].account}/><span className='updatemobile'>修改手机号</span>
                             </div>
                              <div>
                              <span>密码:</span><input type='text' className='updatemobileinput' disabled='disabled'/><span className='updatemobile'>修改密码</span>
                              </div>
                               <div>
                               <span >权限:</span><input type='text' value={this.state.operatorlist[this.state.write].auth}/>
                               </div>
                               </div>
                     }
                    </LayerBox>
                }
    </tr>
        );
        return ( 
                <div>
                    <div className="addstaff" onClick={this.addstaff}>新增员工</div> 
                    {
                    this.state.show
                    &&                  
                    <LayerBox title='新增员工' onClose={() => this.setState({show:false})} onClick={this.operatorAdd}>
                        {
                            <div className='addstaffborder'>
                                <div className='margintop'>
                            <span >姓名:</span><input  type='text' onChange={e => this.setState({user_name:e.target.value})}/>
                            </div>
                             <div>
                             <span>手机号:</span><input type='text' onChange={e => this.setState({user_phone:e.target.value})}/>
                             </div>                             
                               <div >
                               <span >权限:</span>&nbsp;&nbsp;<Select option={this.state.auth_name} selected={this.state.auth_name[0]} onChange={this.onchange}/>
                               </div>
                               </div>
                        }
                    </LayerBox>
                }
                    <div className="bothpages_count">                           
                        <div className="bothpages_count_title Addstaff_count_list">
                            <span>ID</span>
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
                </div>
        );            
    };
}