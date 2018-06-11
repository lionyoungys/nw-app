/**
 * 条码打印
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
                   <div className="barcodeprinting">选择打印机</div>
                   <div className="barcodeprinting-div">
                       <span>衣物条码打印机:</span>
                       <Select option={['手机号','用户名','密码']} selected='密码'  onChange={value => console.log(value)}/>
                       <button>打 印 测 试 页</button>
                   </div>
               </div>                
        );            
    };
}