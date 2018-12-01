/**
 * 员工管理界面组件
 * @author wangjun & fanyerong
 */
import React, {Component} from 'react';
import './StaffManagement.css';
import Window from '../../UI/Window';
import {TabFields} from '../../UI/Tab';
import Addstaff from './Addstaff';
import StaffAuthority from './StaffAuthority';
export default class extends Component {   
    constructor(props) {
        super(props);
        this.state={index:0};
        this.handleChange = this.handleChange.bind(this);
    };
    handleChange(obj) {this.setState({index:obj.index})}
    render() {      
        return ( 
            <Window title='员工管理' onClose={this.props.closeView} padding={true}>
                <TabFields option={['员工', '权限']} checked={this.state.index} onChange={this.handleChange} style={{padding:'42px 12px 12px',height:'100%'}}>
                    {this.state.index ? <StaffAuthority closeView={this.props.closeView}/> : <Addstaff closeView={this.props.closeView}/>}
                </TabFields> 
            </Window> 
        );            
    };
}