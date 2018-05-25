/**
 * 新增员工界面组件
 * @author wangjun & fanyerong
 */
import React, {Component} from 'react';
 import '../../../UI/bothpages.css'  //公共样式
import '../StaffManagement.css';
import {Table} from '../../../UI/Table';
import LayerBox from '../../../Ui/LayerBox';
export default class extends Component {   
    constructor(props) {
        super(props);     
        this.state = {show:false,show1:false}        
    }; 
    ask2() {
        tool.ui.ask({title:'删除员工',info:'提示:该操作不可逆转。删除员工后，该账号将被强<br/>制下线并永久封停，但该员工的操作历史仍将保留。<br/>', callback:(close, event) => {
            console.log(event);
            close();    //点击按钮或关闭符号时关闭弹窗
        }});
    }
    render() {      
        return ( 
                <div>
                    <div className="addstaff" onClick={() => this.setState({show:true})}>新增员工</div> 
                    {
                    this.state.show
                    &&
                   
                    <LayerBox title='新增员工' onClose={() => this.setState({show:false})} onClick={() => this.setState({show:false})}>
                        {
                            <div className='addstaffborder'>
                            <div className='margintop'>
                            <span >姓名:</span><input  type='text'/>
                            </div>
                             <div>
                             <span>手机号:</span><input type='text'/>
                             </div>
                              <div>
                              <span>密码:</span><input type='text'/>
                              </div>
                              <div>
                                  <span className='passlimit'>密码必须6位以上，且不能为纯数字</span>
                                  </div>
                               <div  className='jurisdiction'>
                               <span >权限:</span><input type='text' />
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
                                <tr>
                                    <td>1</td>
                                    <td>王先生</td>
                                    <td>18525698541</td>
                                    <td>管理员</td>
                                    <td ><i onClick={() => this.setState({show1:true})}>编辑</i><i onClick={this.ask2}>删除</i></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>李先生</td>
                                    <td>18525698541</td>
                                    <td>管理员</td>
                                    <td ><i onClick={() => this.setState({show1:true})}>编辑</i><i onClick={this.ask2}>删除</i></td>
                                    {
                    this.state.show1
                    &&
                   
                    <LayerBox title='编辑员工' onClose={() => this.setState({show1:false})} onClick={() => this.setState({show1:false})}>
                        {
                            <div className='updatestaffborder'>
                            <div className='margintop'>
                            <span >姓名:</span><input  type='text'/>
                            </div>
                             <div className='mobilephone'>
                             <span>手机号:</span><input type='text' className='updatemobileinput' disabled='disabled'/><span className='updatemobile'>修改手机号</span>
                             </div>
                              <div>
                              <span>密码:</span><input type='text' className='updatemobileinput' disabled='disabled'/><span className='updatemobile'>修改密码</span>
                              </div>
                               <div >
                               <span >权限:</span><input type='text' />
                               </div>
                               </div>
                     }
                    </LayerBox>
                }
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        );            
    };
}