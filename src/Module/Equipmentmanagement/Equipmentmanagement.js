/**
 * 设备管理界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';

const style = {height:'10px'};
export default class extends Component {   
    constructor(props) {
        super(props);  
        this.state = {
            index : 0,
            printer:'printer'.getData(),    //小票打印机
            clothes_printer:'clothes_printer'.getData() || '无',    //衣物条码打印机
            sn_printer:'sn_printer'.getData() || '无',    //不干胶条码打印机
            M1:'SDT-HA',    //射频读卡型号
            M1data:['SDT-HA'],
            data:[]
        }    
        this.handleClick = this.handleClick.bind(this) ;  
    }; 
    componentDidMount() {
        EventApi.printers(data => {
            let len = data.length;
            for (let i = 0;i < len;++i) {
                this.state.data.push(data[i].deviceName);
            }
            this.setState({data:this.state.data});
        });
    }
    handleClick (e){
        this.setState({index:e.target.dataset.index});
    }
    render() {
        let printers = this.state.data.map(value => value);
        printers.unshift('无');
        return ( 
            <Window title='设备管理' onClose={this.props.closeView} width="500" height='400'>  
                <div style={{fontSize:'12px',marginLeft:'10px'}}>
                    <div style={style}></div> 
                    小票打印机：&emsp;&emsp;&emsp;<Select option={this.state.data} selected={this.state.printer} onChange={value => {
                        value.setData('printer');
                        this.setState({printer:value});
                    }}/>&emsp;
                    <button type='button' className='e-btn'>打印测试页</button>
                    <div style={style}></div> 
                    衣物编码打印机：&emsp;<Select option={printers} selected={this.state.clothes_printer} onChange={value => {
                        value.setData('clothes_printer');
                        this.setState({clothes_printer:value});
                    }}/>&emsp;
                    <button type='button' className='e-btn'>打印测试页</button>
                    <div style={style}></div> 
                    不干胶条码打印机：<Select option={printers} selected={this.state.sn_printer} onChange={value => {
                        value.setData('sn_printer');
                        this.setState({sn_printer:value});
                    }}/>&emsp;
                    <button type='button' className='e-btn'>打印测试页</button>
                    <div style={style}></div> 
                    射频读卡器型号：&emsp;<Select option={this.state.M1data} selected={this.state.M1}/>&emsp;&emsp;
                    <button type='button' className='e-btn'>打印测试页</button>
                </div>                                                                         
            </Window> 
        );            
    };
}