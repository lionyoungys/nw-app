/**
 * 充值统计界面组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import './StaffManagement.css';
import Window from '../../UI/Window';
import Addstaff from './Addstaff/Addstaff';
import StaffAuthority from './StaffAuthority/StaffAuthority';
export default class extends Component {   
    constructor(props) {
        super(props);   
    this.state={show:false};
    this.switchpermission=this.switchpermission.bind(this);
    this.switchstaff=this.switchstaff.bind(this);      
    }; 
    switchpermission(){
        this.setState({show:true})
    }
    switchstaff(){
        this.setState({show:false})
    }
    render() {      
        return ( 

               <Window title='员工管理' onClose={this.props.closeView}>   
                   <div className="StaffManagement_title">
                      <div id="staff" onClick={this.switchstaff}>员工</div>
                      <div onClick={this.switchpermission}>权限</div>
                   </div> 
                    {
                        this.state.show?<StaffAuthority/>:<Addstaff/>
                    }
               </Window> 
        );            
    };
}