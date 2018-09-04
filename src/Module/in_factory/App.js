/**
 * 入厂界面组件
 * @author yangyunlong
 */
import React from 'react';
import Window from '../../UI/Window';
import OptionBox from '../../Elem/OptionBox';
import Empty from '../../Elem/Empty';
import Select from '../../UI/Select';
import './App.css';

export default class extends React.Component {
    constructor(props) {
        super(props);
        //this.props.onRef(this);
        this.state = {
            data:[],
            checked:[], 
            all:false,
            value:'',
            selectedshop:'',
            shop:['速洗达工厂','荣仔的洗衣店','全部'],
        };
        this.handleAllChecked = this.handleAllChecked.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.query = this.query.bind(this);       
    }
    componentDidMount() {
        this.query();
    }
    // 查询
    query() {
        let done;
        tool.ui.loading(handle => done = handle);
        api.post('in_factory', {                      
            token:'token'.getData(),
        }, (res, ver) => {
            if (ver && res) {
                console.log(res);
                done();
                this.setState({
                    data:res.result,
                });                
            }         
        },()=>done());       
    }
    // 全选
    handleAllChecked(value, checked) {       
        if (checked==false) {
            let data = this.state.data,
                len = data.length,
                checked = [];
            for (let i = 0;i < len;++i) {
                if (data[i].state == false) checked.push(data[i].id);
            }
            this.setState({checked:checked,all:true});
            
        } else {
            this.setState({
                checked:[],
                all:false
            });
           
        }
    }
    // 单选
    onChecked(value, checked) {
        if (checked) {
            let index = value.inArray(this.state.checked);
            if (-1 !== index) {
                this.state.checked.splice(index, 1);
                this.setState({checked:this.state.checked,all:false});
            }
        } else {
            this.state.checked.push(value);
            this.setState({checked:this.state.checked});
        }
    }
    //退回
    handleClick() {    
        if (this.state.checked.length < 1) return;
        api.post('return_factory', {                      
            token:'token'.getData(),
            wid:JSON.stringify(this.state.checked),          
        }, (res, ver) => {
            if (ver && res) {
                tool.ui.success({callback:(close, event) => {
                    close();
                    this.setState({checked:[],all:false});
                    this.query();
                }});                                               
            }else{
                tool.ui.error({title:'提示',msg:res.msg,button:'确定',callback:(close, event) => {
                    close();
                }});
            }
        });
    }
    
    render() {      
        return (
            <Window title='入厂' onClose={this.props.closeView}>
                <div className="clean">
                    <div className='e-box'>
                        <table className="in-factory">
                            <thead>
                                <tr>
                                    <th>衣物编码</th>
                                    <th>衣物名称</th>
                                    <th>颜色</th>
                                    <th>瑕疵</th>
                                    <th>品牌</th>
                                    <th>洗后预估</th>
                                    <th>工艺加价</th>
                                    <th>单价</th>
                                    <th>衣物来源</th>
                                </tr>
                            </thead>
                            <Tbody data={this.state.data} onChecked={this.onChecked} checked={this.state.checked}/>
                        </table>
                        <Empty show={this.state.data.length < 1}/>
                    </div>   
                    <div className='clean-top'>
                        <div className='left'>
                            <OptionBox type='checkbox' checked={this.state.all} onClick={this.handleAllChecked}>全选</OptionBox>
                            &emsp;&emsp;
                            已选择<span className='e-orange'>&nbsp;{this.state.checked.length}&nbsp;</span>件
                            &emsp;&nbsp;
                            <button className='e-btn confirm' onClick={this.handleClick}>打包退回</button>
                        </div>
                    </div> 
                </div>                                           
            </Window>
        );
    }
}
class Tbody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //console.log(this.state.data);
        let html = this.props.data.map(obj => 
            <tr key={obj.id}>
                <td>
                    <OptionBox
                        value={obj.id}
                        checked={-1 !== obj.id.inArray(this.props.checked)}
                        onClick={this.props.onChecked}
                    >{obj.clothing_number}</OptionBox>
                </td>
                <td>{obj.clothing_name}</td>
                <td>{obj.clothing_color}</td>
                <td>{obj.remark}</td>
                <td>{obj.sign}</td>
                <td>{obj.forecast}</td>                
                <td>{obj.addition_price}</td>
                <td>{obj.raw_price}</td>
                <td>{obj.mname}</td>               
            </tr>
        );
        return (<tbody>{html}</tbody>);
    }
}