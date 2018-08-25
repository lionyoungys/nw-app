
import React, {Component} from 'react';
import './Washmanagement.css'
export default class extends Component {   
    constructor(props) {
        super(props);  
        this.list=['送洗','入厂','清洗','烘干','熨烫','质检','出厂'];       
    }
    
    render(){
        var list = this.list.map((item,index) =><div>
            <div className="shop-div1"></div>
            <div id="shop-span">
              <input type="checkbox"></input><b>{item}</b>
            </div>
        </div>)
        return  (
            <div>
                <div id="Washmanagement-title">可自定义选择门店模块</div>
                <div id="shop-div">
                    {list}
                </div>
                <button className="e-btn store-button">确定</button>                     
            </div>
        );
    }
}