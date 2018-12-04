
import React, {Component} from 'react';
import './Washmanagement.css'
import Option from '../../../UI/Option';

const token = 'token'.getData();
export default class extends Component {   
    constructor(props) {
        super(props);   
        this.state={
            list:[],
            checkedArr:[]    
        };
        this.map = {'111':'car', '112':'into', '100':'washer', '102':'dry', '104':'iron', '106':'check', '114':'out', '115':'audit'};
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

    handleChecked(obj) {
        let index = obj.param.inArray(this.state.checkedArr);
        console.log(obj, this.state.checkedArr);
        if (-1 === index) {
            this.state.checkedArr.push(obj.param);            
            this.setState({ checkedArr: this.state.checkedArr});
        } else {
            this.state.checkedArr.splice(index, 1);
            this.setState({ checkedArr: this.state.checkedArr});
        }
    }

    btn_up (){
        // console.log(JSON.stringify(this.state.checkedArr))
        api.post('up_module', {
            token:token,
            moduleid: JSON.stringify(this.state.checkedArr),
        }, (res,ver) => {
            //console.log(res)
            if (ver && res) {
                this.props.menuReload(this.state.checkedArr);
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
        var list = this.state.list.map((item, index) => 
            <Option icon={this.map[item.id]} value={item.name} checked={-1 !== item.id.inArray(this.state.checkedArr)} onClick={this.handleChecked} param={item.id}/>
        )
        return(
            <div>
                <div id="Washmanagement-title">可自定义选择门店模块</div>
                <div id="shop-div">
                    {list}
                    <div style={{paddingBottom:'20px'}}><button className="e_btn_store" onClick={this.btn_up}>确定</button></div>
                    
                </div>
                                  
            </div>
        );
    }
}