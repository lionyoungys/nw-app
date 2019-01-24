/**
 * 设备管理界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import {TabFields} from '../../UI/Tab';
import Select from '../../UI/Select';

export default class extends Component {   
    constructor(props) {
        super(props);  
        this.state = {
            checked: 0,
            printers:[
                {
                    name:'printer'.getData(), 
                    width:'printer_width'.getData() || '58', 
                    font_size:'printer_font_size'.getData() || '11', 
                    unit:'printer_unit'.getData() || 'pt',
                    id:'printer'
                },    //小票打印机
                {
                    name:'clean_tag_printer'.getData(),
                    width:'clean_tag_printer_width'.getData() || '110',
                    font_size:'clean_tag_printer_font_size'.getData() || '11',
                    unit:'clean_tag_printer_unit'.getData() || 'pt',
                    id:'clean_tag_printer'
                },    //水洗标签打印机
                {
                    name:'glue_tag_printer'.getData(),
                    width:'glue_tag_printer_width'.getData() || '58',
                    font_size:'glue_tag_printer_font_size'.getData() || '11',
                    unit:'glue_tag_printer_unit'.getData() || 'pt',
                    id:'glue_tag_printer'
                },    //不干胶标签打印机
                {
                    name:'needle_printer'.getData(), 
                    width:'needle_printer_width'.getData() || '58',
                    font_size:'needle_printer_font_size'.getData() || '11',
                    unit:'needle_printer_unit'.getData() || 'pt',
                    id:'needle_printer'
                },    //针式打印机
                {
                    name:'a4_printer'.getData(), 
                    width:'a4_printer_width'.getData() || '58',
                    font_size:'a4_printer_font_size'.getData() || '11',
                    unit:'a4_printer_unit'.getData() || 'pt',
                    id:'a4_printer'
                },    //a4纸打印机
                {name:'m1_reader'.getData(), id:'m1_reader'},    //射频读卡器
                {name:'open_case_printer'.getData(), id:'open_case_printer'}    //钱箱连接打印机
            ],
            M1data:['SDT-HA'],
            data:['无']    //打印机列表
        }
        this.tabs = ['小票打印机', '水洗标签打印机', '不干胶标签打印机', '针式打印机', 'A4纸打印机', '射频读卡器', '钱箱'];
        this.units = ['pt', 'px'];
        this.style = {marginLeft:'84px'};
        this.selectStyle = {width:'416px'};
        this.inputStyle = {width:'296px'};
        this.handleChange = this.handleChange.bind(this);
        this.selectPrinter = this.selectPrinter.bind(this);
        this.selectUnit = this.selectUnit.bind(this);
        this.print = this.print.bind(this);
        this.open = this.open.bind(this);
        this.M1Read = this.M1Read.bind(this);
        this.printerSetting = this.printerSetting.bind(this);
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
    handleChange(e) {
        let value = e.target.value
        ,   name = e.target.dataset.name
        ,   printer = this.state.printers[this.state.checked];
        value.setData(printer.id + '_' + name);
        this.state.printers[this.state.checked][name] = value;
        this.setState({printers:this.state.printers});
    }

    //设置打印机方法
    selectPrinter(obj) {
        let value = obj.value
        ,   printer = this.state.printers[this.state.checked];
        console.log(value);
        '无' == value ? ''.setData(printer.id) : value.setData(printer.id);
        this.state.printers[this.state.checked].name = value;
        this.setState({printers: this.state.printers});
    }
    //设置字体单位方法
    selectUnit(obj) {
        let value = obj.value
        ,   printer = this.state.printers[this.state.checked];
        value.setData(printer.id + '_unit');
        this.state.printers[this.state.checked].unit = value;
        this.setState({printers:this.state.printers});
    }

    print() {
        if (1 == this.state.checked) {
            EventApi.print('code3',null, this.state.printers[this.state.checked].name);
        } else if (2 == this.state.checked) {
            EventApi.print('test2',null, this.state.printers[this.state.checked].name);
        } else if (4 == this.state.checked) {
            EventApi.print('a4_demo',null, this.state.printers[this.state.checked].name);
        } else {
            EventApi.print('test',null, this.state.printers[this.state.checked].name);
        }
    }
    open() {EventApi.open_case()}
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
    printerSetting() {
        EventApi.printerSetting();
    }

    render() {
        let show = this.state.checked < 5
        ,   isM1 = 5 == this.state.checked
        ,   printer = this.state.printers[this.state.checked];
        return (
            <Window title='设备管理' onClose={this.props.closeView} width="500" height='240'>
                <TabFields style={{margin:'14px', padding:'55px 0 0 18px', height:'236px'}} option={this.tabs} checked={this.state.checked} onChange={obj => this.setState({checked:obj.index})}>
                    <div className='e-input-row'>
                        {isM1 ? '读卡器型号' : '打印机名称'}：
                        <Select option={isM1 ? this.state.M1data : this.state.data} onChange={this.selectPrinter} value={printer.name} style={this.selectStyle}/>
                        {/* <select className='e-select' onChange={this.selectPrinter} value={printer.name}>
                            {(isM1 ? this.state.M1data : this.state.data).map((obj, index) => <option key={obj + index}>{obj}</option>)}
                        </select> */}
                    </div>
                    {show && <div className='e-input-row'>页面&emsp;宽度：<input type='number' className='e-input' style={this.inputStyle} value={printer.width} data-name='width' onChange={this.handleChange}/>&nbsp;mm</div>}
                    {
                        show 
                        && 
                        <div className='e-input-row'>
                            字体&emsp;大小：<input type='number' className='e-input' style={this.inputStyle} value={printer.font_size} data-name='font_size' onChange={this.handleChange}/>&nbsp;
                            <Select option={this.units} onChange={this.selectUnit} value={printer.unit} style={{width:'52px'}}/>
                        </div>
                    }                    
                {
                    isM1
                    ?
                    (<button style={this.style} type='button' className='e-btn larger' onClick={this.M1Read}>测试读卡</button>)
                    :
                    (
                        6 == this.state.checked
                        ?
                        (<div style={this.style}>
                            <button type='button' className='e-btn larger' onClick={this.printerSetting}>打印机设置</button>
                            &emsp;
                            <button type='button' className='e-btn larger' onClick={this.open}>开钱箱</button>
                        </div>)
                        :
                        (<div style={this.style}>
                            <button type='button' className='e-btn larger' onClick={this.printerSetting}>打印机设置</button>
                            &emsp;
                            <button type='button' className='e-btn larger' onClick={this.print}>打印测试页</button>
                        </div>)
                    )
                }   
                </TabFields>                                                            
            </Window> 
        );            
    };
}