/**
 * 设备管理界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Equipmentmanagement from './Equipmentmanagement.css';

export default class extends Component {   
    constructor(props) {
        super(props);  
        this.state = {index : 0}    
        this.tab=['条码打印','小票打印','读卡器','客显','钱箱'];
        this.views=[];  
        this.handleClick = this.handleClick.bind(this) ;  
    }; 
    handleClick (e){
        this.setState({index:e.target.dataset.index});
    }
    render() { 
        let tabs=this.tab.map((item,index)=>
        <span
            key={item} 
            data-index={index} 
            className={this.state.index==index?'hover':null}
            onClick={this.handleClick}
        >{item}</span>
    );     
        return ( 
                <Window title='设备管理' onClose={this.props.closeView} width="459" height='369'>   
                    <div className="Settings Equipmentmanagement">
                       <div className="Settings-title">
                          {tabs}                         
                       </div>
                       <div className="Settings-div Equipmentmanagement-div">
                           {this.views[this.state.index]}
                       </div>
                    </div>                                                                                 
                </Window> 
        );            
    };
}