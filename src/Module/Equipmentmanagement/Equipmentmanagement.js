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
        this.print = this.print.bind(this);
        this.M1Read = this.M1Read.bind(this);
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

    print(e) {
        let printer = this.state[e.target.dataset.printer];
        '无' != printer && EventApi.print('test', {printer:printer});
    }
    M1Read() {
        try {
            var card = M1Reader.get();
        } catch (e) {
            return tool.ui.error({msg:'读卡失败',callback:close => close()});
        }
        if (card.empty) {
            return tool.ui.error({msg:'卡片数据为空',callback:close => close()});
        }
        if (card.error) {
            return tool.ui.error({msg:'读卡失败',callback:close => close()});
        }
        return  tool.ui.success({msg:'读卡成功',callback:close => close()});
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
                    <button type='button' className='e-btn' onClick={this.print} data-printer='printer'>打印测试页</button>
                    &nbsp;
                    <button type='button' className='e-btn' data-event='open_case' onClick={this.props.changeView}>开钱箱测试</button>
                    <div style={style}></div> 
                    衣物编码打印机：&emsp;<Select option={printers} selected={this.state.clothes_printer} onChange={value => {
                        value.setData('clothes_printer');
                        this.setState({clothes_printer:value});
                    }}/>&emsp;
                    <button type='button' className='e-btn' onClick={this.print} data-printer='clothes_printer'>打印测试页</button>
                    <div style={style}></div> 
                    不干胶条码打印机：<Select option={printers} selected={this.state.sn_printer} onChange={value => {
                        value.setData('sn_printer');
                        this.setState({sn_printer:value});
                    }}/>&emsp;
                    <button type='button' className='e-btn' onClick={this.print} data-printer='sn_printer'>打印测试页</button>
                    <div style={style}></div> 
                    射频读卡器型号：&emsp;<Select option={this.state.M1data} selected={this.state.M1}/>&emsp;&emsp;
                    <button type='button' className='e-btn' onClick={this.M1Read}>读卡测试</button>
                </div>                                                                         
            </Window> 
        );            
    };
}