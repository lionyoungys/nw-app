/**
 * 充值统计界面组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
 import '../../../UI/bothpages.css'  //公共样式
import '../StaffManagement.css';
export default class extends Component {   
    constructor(props) {
        super(props);           
    }; 
    render() {      
        return ( 
                <div>
                    <div className="addstaff">新增员工</div> 
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
                                    <td><i>编辑</i><i>删除</i></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>李先生</td>
                                    <td>18525698541</td>
                                    <td>管理员</td>
                                    <td><i>编辑</i><i>删除</i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        );            
    };
}