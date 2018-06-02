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
        this.state = {show:false,show1:false}        
    }; 
    render() {     
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
                            
                            <span>ID</span>
                            <span>组名称</span>
                            <span>权限</span>                          
                            <span>操作</span>
                        </div>
                                        
                        <table className="bothpages_count_list StaffAuthority_count_list" cellPadding="0" cellSpacing="0" border="0">  
                            <tbody>                                                            
                                <tr>
                                    <td>1</td>
                                    <td>前台业务</td>
                                    <td>收衣,取衣,管理,配送</td>                                   
                                    <td><i onClick={() => this.setState({show1:true})}>编辑</i><i>删除</i></td>
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
                                <tr>
                                    <td>2</td>
                                    <td>前台业务</td>
                                    <td>收衣,取衣,管理,配送收衣,取衣,管理,配送</td>                                   
                                    <td><i>编辑</i><i>删除</i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            
        );           
    };
}