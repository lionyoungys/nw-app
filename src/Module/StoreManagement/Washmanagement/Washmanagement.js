
import React, {Component} from 'react';
import './Washmanagement.css'
import OptionBox from '../../../Elem/OptionBox';
//import { connect } from 'tls';

const token = 'token'.getData();
export default class extends Component {   
    constructor(props) {
        super(props);   
        this.state={
            list:[],
            checked:[]
        };
       this.handleChecked = this.handleChecked.bind(this);  
       this.btn_up = this.btn_up.bind(this);      
    }
    componentDidMount() {
        api.post('shop_module', {token:token}, (res,ver) => {
            if (ver && res) {
                console.log(res)    
                this.setState({list:res.result})           
            }else{
                handle();
            }
        });
    }
    handleChecked(value,checked) {
        if (checked) {
            console.log(1)
            let index = value.inArray(this.state.checked);
            if (-1 !== index) {
                this.state.checked.splice(index, 1);
                this.setState({checked:this.state.checked});
            }
        } else {
            console.log(2)
            this.state.checked.push(value);
            this.setState({checked:this.state.checked});
        }
    }
    btn_up (){
        console.log(JSON.stringify(this.state.checked))
        api.post('up_module', {
            token:token,
            moduleid:JSON.stringify(this.state.checked),
        }, (res,ver) => {
            if (ver && res) {
                tool.ui.success({callback:(close, event) => {
                    close();
                }});                            
            }else{
                tool.ui.error({title:'错误提示',msg:res.msg,button:'确定',callback:(close, event) => {
                    close();
                }});
            }
        });
    }
    render(){
        var list = this.state.list.map((item,index) =><div>
            <div className="shop-div1"></div>
            <div id="shop-span">
                <OptionBox
                    type='checkbox'
                    checked={-1 !== item.id.inArray(this.state.checked)}
                    value={item.id}
                    onClick={this.handleChecked}
                ></OptionBox><b>{item.name}</b>
            </div>
        </div>)
        return(
            <div>
                <div id="Washmanagement-title">可自定义选择门店模块</div>
                <div id="shop-div">
                    {list}
                </div>
                <button className="e-btn store-button" onClick={this.btn_up}>确定</button>                     
            </div>
        );
    }
}