/**
 * 设备管理界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import Tab from '../../UI/Tab';

const style = {height:'10px'};
export default class extends Component {   
    constructor(props) {
        super(props);  
        this.state = {
            checked: 0,
            M1data:['SDT-HA'],
            printers:[
                {
                    name:'printer'.getData(), 
                    width:'printer_width'.getData(), 
                    font_size:'printer_font_size'.getData(), 
                    unit:'printer_unit'.getData(),
                    id:'printer'
                },    //小票打印机
                {
                    name:'clean_tag_printer'.getData(),
                    width:'clean_tag_printer_width'.getData(),
                    font_size:'clean_tag_printer_font_size'.getData(),
                    unit:'clean_tag_printer_unit'.getData(),
                    id:'clean_tag_printer'
                },    //水洗标签打印机
                {
                    name:'glue_tag_printer'.getData(),
                    width:'glue_tag_printer_width'.getData(),
                    font_size:'glue_tag_printer_font_size'.getData(),
                    unit:'glue_tag_printer_unit'.getData(),
                    id:'glue_tag_printer'
                },    //不干胶标签打印机
                {name:'SDT-HA'},    //射频读卡器
                {name:'open_case_printer'.getData(), id:'open_case_printer'}    //钱箱连接打印机
            ],
            data:['无']    //打印机列表
        }
        this.tabs = ['小票打印机', '水洗标签打印机', '不干胶标签打印机', '射频读卡器', '钱箱'];
        this.handleChange = this.handleChange.bind(this);
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
    handleChange(e) {
        let value = 'string' === typeof e ? e : e.target.value;
        
    }

    print(e) {
        let printer = this.state[e.target.dataset.printer];
        '无' != printer && EventApi.print('test', null, printer);
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
        let isM1 = 3 == this.state.checked
        ,   show = this.state.checked < 4
        ,   printer = this.state.printers[this.state.checked]
        ,   list = isM1 ? this.state.M1data : this.state.data;
        return (
            <Window title='设备管理' onClose={this.props.closeView} width="500" height='400'>
                <Tab option={this.tabs} checked={this.state.checked} onChange={i => this.setState({checked:i})}/>
                <div style={{marginLeft:'10px'}}>
                    {isM1 ? '读卡器型号' : '打印机名称'}：<Select option={this.state.data} selected={printer.name} onChange={this.handleChange}/><br/>
                    {show && <div>页面&emsp;宽度：<input type='number' value={printer.width} onChange={this.handleChange}/>&nbsp;mm</div>}
                    {
                        show 
                        && 
                        <div>
                            字体&emsp;大小：<input type='number' value={printer.font_size} onChange={this.handleChange}/>&nbsp;
                            <Select option={['pt', 'px', 'em']} selected={printer.unit}  onChange={this.handleChange}/>
                        </div>
                    }
                </div>                                                                     
            </Window> 
        );            
    };
}