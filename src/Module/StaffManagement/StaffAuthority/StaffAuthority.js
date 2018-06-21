/**
 * 新增组界面组件
 * @author wang jun & ranchong 
 */
import React, {Component} from 'react';
import '../../../UI/bothpages.css'  //公共样式
import '../StaffManagement.css';
import Window from '../../../UI/Window';
import {Table} from '../../../UI/Table';
import LayerBox from '../../../Ui/LayerBox';
import {topMenu} from '../../../Menu.js';
export default class extends Component {   
    constructor(props) {
        super(props);   
        this.state = {show:false,show1:false,authlist:[]}        
    }; 
    componentDidMount() {
        api.post('authList', {token:'token'.getData()}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({authlist:res.result});
            }
        }
        );  
    }
    ask2(e) {
        var id = e.target.dataset.id;
        var index = e.target.dataset.index;
        var operatorlist=this.state.operatorlist;
        tool.ui.ask({title:'删除权限',info:'提示:该操作不可逆转。删除权限后，该账号将被强<br/>制下线并永久封停，但该员工的操作历史仍将保留。<br/>', callback:(close, event) => {
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
                            this.componentDidMount();                     
                        }else{
                            console.log(res.msg);
                            tool.ui.error({msg:res.msg,callback:(close) => {
                                close();
                            }});
                            
                        }
                    }
               );
            
               
        }});
    }
    render() {     
        
        var authlist=this.state.authlist.map((item,index) =>
        <tr key={index}>
            <td>{index+1}</td>
            <td>{item.auth_name}</td>
            <td>收衣,取衣,管理,配送收衣,取衣</td>                                   
            <td><i onClick={() => this.setState({show1:true})}>编辑</i><i onClick={this.ask2} data-id={item.id} data-index = {index}>删除</i></td>
                                    {
                    this.state.show1
                    &&
                <Window title='编辑组' onClose={() => this.setState({show1:false})}>
               <div id="addGroup-srarch">
                   <span>组名称:</span>
                   <input  type='text'/>
                   <button type='button' className='e-btn sureBtn'>确认</button>
               </div>
               <div id = 'addGroup-content'>   
               {menuList}  
               </div>
           </Window>
           }
        </tr>
        );

        let menuList = topMenu.map((obj, index) => 
        <div className ='addGroup-content-cell'>
        <div className='addGroup-content-cell-content'>
            <ul>
                <li className='addGroup-content-cell-content-head'>
                    <input type='checkbox' />
                    <p>{obj.value}</p>
                </li>
                {
                    obj.options.map(obj2 =>
                        <li className='addGroup-content-cell-content-normal' key={obj2.value}>
                            <input type='checkbox' />
                            <p>{obj2.value}</p>
                        </li>
                    )
                }
                {/* {submenuList} */}
                                          
            </ul>
        </div>  
    </div>);
        return ( 
                <div>
                    <div className="StaffAuthority" onClick={() => this.setState({show:true})}>新增组</div> 
                    {
                    this.state.show
                    &&
                <Window title='新增组' onClose={() => this.setState({show:false})}>
               <div id="addGroup-srarch">
                   <span>组名称:</span>
                   <input  type='text'/>
                   <button type='button' className='e-btn sureBtn'>确认</button>
               </div>
               <div id = 'addGroup-content'>
                   {menuList}
               </div>
           </Window>
                    }
                    <div className="bothpages_count">                           
                        <div className="bothpages_count_title Addstaff_count_list StaffAuthority_count_list">
                            
                            <span></span>
                            <span>组名称</span>
                            <span>权限</span>                          
                            <span>操作</span>
                        </div>
                                        
                        <table className="bothpages_count_list StaffAuthority_count_list" cellPadding="0" cellSpacing="0" border="0">  
                            <tbody>                                                            
                               {authlist}
                            </tbody>
                        </table>
                    </div>
                </div>
            
        );           
    };
}