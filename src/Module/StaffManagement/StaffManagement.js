/**
 * 员工管理界面组件
 * @author wangjun & fanyerong
 */
import React, {Component} from 'react';
import './StaffManagement.css';
import Window from '../../UI/Window';
import Addstaff from './Addstaff/Addstaff';
import StaffAuthority from './StaffAuthority/StaffAuthority';
export default class extends Component {   
    constructor(props) {
        super(props);   
        this.state={show:false,hover:true};
        this.switchpermission=this.switchpermission.bind(this);
        this.switchstaff=this.switchstaff.bind(this);      
    }; 
    switchpermission(){
        this.setState({show:true,hover:false})
    }
    switchstaff(){
        this.setState({show:false,hover:true})
    }
    render() {      
        return ( 

               <Window title='员工管理' onClose={this.props.closeView}>   
                   <div className="Settings-title">
                      <span className={this.state.hover?'hover':null} onClick={this.switchstaff}>员工</span>
                      <span className={this.state.hover?null:'hover'} onClick={this.switchpermission}>权限</span>
                   </div> 
                    {
                        this.state.show?<StaffAuthority/>:<Addstaff/>
                    }
               </Window> 
        );            
    };
}