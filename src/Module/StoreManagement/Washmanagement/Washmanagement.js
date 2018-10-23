
import React, {Component} from 'react';
import './Washmanagement.css'
import OptionBox from '../../../Elem/OptionBox';
//import { BADQUERY } from 'dns';
//import { connect } from 'tls';

const token = 'token'.getData();
export default class extends Component {   
    constructor(props) {
        super(props);   
        this.state={
            list:[],
            checkedArr:[]    
        };
       this.query = this.query.bind(this);
       this.handleChecked = this.handleChecked.bind(this);  
       this.btn_up = this.btn_up.bind(this);      
    }
    componentDidMount() {       
        this.query()
    }

    query (){
        //let done;
       // tool.ui.loading(handle => done = handle);
        api.post('shop_module', {token:token}, (res,ver) => {
            if (ver && res) {
                console.log(res)    
                this.setState({
                    list:res.pmodule,                  
                });  
                let len = res.result.length; 
                let leng = this.state.list.length;
                var arr=[];
                for(let i = 0; i<len; i++ ){
                   arr.push(res.result[i].id)
                }
                for(let i = 0; i<leng; i++ ){
                    arr.push(res.pmodule[i].id)
                } 
                const filterUnique = arr => arr.filter(i => arr.indexOf(i) !== arr.lastIndexOf(i))
                //console.log(filterUnique(arr));
                var aa = filterUnique(arr)
                for(var i = 0,len = aa.length;i < len;i++){ 
                    !RegExp(aa[i], "g").test(this.state.checkedArr.join(",")) && (this.state.checkedArr.push(aa[i])); 
                } 
                this.setState({ checkedArr: this.state.checkedArr})
                //console.log(this.state.checkedArr)
            }else{
                handle();
            }
        });
    }

    handleChecked(e) {
        console.log(e.target.dataset.checked)
        let checked = e.target.dataset.checked
        ,   value = e.target.dataset.id;
        if (checked =='1') {
            console.log(1)
            let index = value.inArray(this.state.checkedArr);
            if (-1 !== index) {
                this.state.checkedArr.splice(index, 1);
                this.setState({ checkedArr: this.state.checkedArr});
            }
        } else {
           console.log(2)
            this.state.checkedArr.push(value);
            
            this.setState({ checkedArr: this.state.checkedArr});
        }
    }

    btn_up (){
        console.log(JSON.stringify(this.state.checkedArr))
        api.post('up_module', {
            token:token,
            moduleid: JSON.stringify(this.state.checkedArr),
        }, (res,ver) => {
            //console.log(res)
            if (ver && res) {
                this.props.leftMenuReload(this.state.checkedArr);
                tool.ui.success({callback:(close, event) => {
                    close();
                    this.query();
                }});                                            
            }else{
                tool.ui.error({title:'错误提示',msg:res.msg,button:'确定',callback:(close, event) => {
                    close();                   
                }});
            }
        });
    }

    render(){
       // console.log(this.state.checked)
        let tmp
        var list = this.state.list.map((item, index) => {

            tmp = -1 !== item.id.inArray(this.state.checkedArr)?'1':'0';
            return (
                <div data-checked={tmp} data-id={item.id} onClick={this.handleChecked}>
                    <i data-checked={tmp} data-id={item.id} onClick={this.handleChecked}></i>
                    <b data-checked={tmp} data-id={item.id} onClick={this.handleChecked}>{item.name}</b>
                </div>
            );
        })
        return(
            <div>
                <div id="Washmanagement-title">可自定义选择门店模块</div>
                <div id="shop-div">
                    {list}
                    <div className='was-man-btn-div'>
                        <button className="e-btn store-button" onClick={this.btn_up}>确定</button>
                    </div>
                       
                </div>
                                  
            </div>
        );
    }
}