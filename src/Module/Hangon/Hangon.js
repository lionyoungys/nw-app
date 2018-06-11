/**
 * 上挂
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import Hangondetail from './Hangondetail';
import './Hangon.css'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {show:false}
    };
    render() {
        return (
            <Window title='上挂' onClose={this.props.closeView} width='298' height='241'>
               <div className="Hangon-div">
                   <span>请输入衣物编码</span>
                   <input type="text" />
               </div>
               <button className="e-btn hangon-btn" onClick = {()=>this.setState({show:true})}>查询</button>
                {
                   this.state.show
                   &&
                   <Hangondetail />
                }

            </Window>
           
        );
    }
}