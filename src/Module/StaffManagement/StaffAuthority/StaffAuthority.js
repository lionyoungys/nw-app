/**
 * 充值统计界面组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import '../../../UI/bothpages.css'  //公共样式
import '../StaffManagement.css';
import {Table} from '../../../UI/Table';
import LayerBox from '../../../Ui/LayerBox';
export default class extends Component {   
    constructor(props) {
        super(props);   
        this.state = {show:false}        
    }; 
    render() {      
        return ( 
                <div>
                    <div className="StaffAuthority" >新增组</div> 
               
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
                                    <td><i>编辑</i><i>删除</i></td>
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