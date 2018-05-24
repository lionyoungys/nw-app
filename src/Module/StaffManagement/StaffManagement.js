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
    }; 
    render() {      
        return ( 
               <Window title='员工管理' onClose={this.props.closeView}>   
                   <div className="StaffManagement_title">
                      <div id="staff">员工</div>
                      <div>权限</div>
                   </div> 
                    
                   {/* <Addstaff /> */}
                  <StaffAuthority />
               </Window> 
        );            
    };
}