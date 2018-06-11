/**
 * 读卡器
 * @author fanyerong
 */
import React, {Component} from 'react';
import Select from '../../UI/Select';

export default class extends Component {   
    constructor(props) {
        super(props); 
    };       
    render() {               
        return ( 
               <div>                  
                   <div className="barcodeprinting-div cardreader-div">
                       <span>端口:</span>
                       <Select option={['手机号','用户名','密码']} selected='密码'  onChange={value => console.log(value)}/>
                       <button>读 卡 测 试</button>
                   </div>
               </div>                
        );            
    };
}