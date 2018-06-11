/**
 * 小票打印
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
                       <span>小票打印机:</span>
                       <Select option={['手机号','用户名','密码']} selected='密码'  onChange={value => console.log(value)}/><br />
                       <span className="Receiptsprint-span">端口:</span>
                       <Select option={['手机号','用户名','密码']} selected='密码'  onChange={value => console.log(value)}/><br /><br />
                       <button className="Receiptsprint-btn">打 印 测 试 页</button>
                   </div>
               </div>                
        );            
    };
}