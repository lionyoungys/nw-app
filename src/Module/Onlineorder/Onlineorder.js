/**
 * 线上订单处理
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Tab, {BlueTab} from '../../UI/Tab';
import Page from '../../UI/Page';
import Waitinglist from './Waitinglist';  //待接单
import Door from './Door';  // 待上门
import Outdoor from './Outdoor';  // 已上门
import Forshipping from './Forshipping';  //待配送
import Overorder from './Overorder';  //已完成
import './Onlineorder.css';

export default class extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.callParent = this.callParent.bind(this);
        this.headclick = this.headclick.bind(this);
        this.tab = ['待接单','待上门','已上门','待配送','已完成'],
        // this.view = [
        //     <Waitinglist callParent={this.callParent}/>, 
        //     <Door callParent={this.callParent}/>,
        //     <Outdoor callParent={this.callParent}/>,
        //     <Forshipping callParent={this.callParent}/>,
        //     <Overorder callParent={this.callParent}/>
        // ];
        this.view = [Waitinglist, Door, Outdoor, Forshipping, Overorder];
        this.state = {tabindex:0, checked:0, number:'',count_arr:['('+0+')','('+0+')','('+0+')','('+0+')','('+0+')']}  
        this.onRef = this.onRef.bind(this);      
    }; 
    // 刷新 获取input光标  
    componentDidMount (){
        this.input.focus(); 
        api.post('category',{
            token:'token'.getData(),            
        }, (res,ver) => { 
            console.log(res);         
            if (ver) {
                this.setState({count_arr:['('+res.result.pending+')','('+res.result.come_door+')','('+res.result.have_door+')','('+res.result.pending_distribution+')','('+res.result.off_the_stocks+')']})  
            }
        })     
    };     
    // 切换tab 显示内容
    onChange (i){
        console.log(i);
        this.input.focus();
        this.setState({
            checked:i,
            tabindex:i,
        });               
    };
    callParent(count) {
        this.state.count_arr[this.state.tabindex] = '('+count+')';
        this.setState({count_arr:this.state.count_arr});
    }
    headclick (){        
        this.child.query(1, this.state.number);
    }
    onRef(child) {this.child = child;}
    render() {
        let V = this.view[this.state.tabindex]
        ,   tabs = this.tab.map((val, index) => {
            return (val + this.state.count_arr[(index)]);
        });   
        return(
            <div >
                <Window title='线上订单处理' onClose={this.props.closeView}>
                    <BlueTab tabs={tabs} checked={this.state.checked} onChange={(i) => this.onChange(i)}>                        
                        <input type="text" className="e-input" placeholder="订单号,姓名,手机号" ref={input =>this.input = input} value={this.state.number} onChange={e => this.setState({number:e.target.value})}/><button className="e-btn" onClick={this.headclick}>查询</button>                       
                    </BlueTab> 
                    <V callParent={this.callParent} onRef={this.onRef} />
                </Window>
            </div>
        )
    }
}