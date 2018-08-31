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

    query() {
        api.post('in_factory', {                      
            token:'token'.getData(),
        }, (res, ver) => {
            if (ver && res) {
                console.log(res.result)
                this.setState({
                    data:res.result,
                });                
            }         
        });       
    }

    handleAllChecked(value, checked) {
        if (checked) {
            this.setState({checked:[],all:false});
        } else {
            let data = this.state.data, len = data.length;
            if (len < 1) return;
            let tempLen = null, checked = [];
            for (let i = 0;i < len;++i) {
                tempLen = data[i].list.length;
                if (tempLen < 1) continue;
                for (let j = 0;j < tempLen;++j) {
                    checked.push(data[i].list[j].id);
                }
            } 
            this.setState({checked:checked,all:true});
        }
    }
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
    handleClick() {    //退回
        if (this.state.checked.length < 1) return;
        api.post('into_factory', {                      
            token:'token'.getData(),
            itemids:this.state.checked.toString(),
            moduleid:22,
        }, (res, ver) => {
            if (ver && res) {
                this.setState({checked:[],all:false});
                this.query();                
            }else{
                alert(res.msg);
            }
        });
    }
    
    render() {
        /*let html = this.state.data.map(obj => 
            <div className='e-box' key={obj.date}>
                <div className='in-factory-date'>{obj.date}</div>
                    <table className='m-table m-text-c tr-b'>
                        <thead>
                            <tr className='m-bg-white'>
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
                        <Tbody data={obj.list} onChecked={this.onChecked} checked={this.state.checked}/>
                    </table>
            </div>
        );*/
        return (
            <Window title='入厂' onClose={this.props.closeView}>
                <div className="out-title">
                  <div className='right out-left'>
                      <input type="text" value={this.state.value} onChange={e=>this.setState({value:e.target.value})} autoFocus={true}  placeholder='请输入或扫描衣物编码'/>                       
                      <button className="e-btn hangon-btn">查询</button>
                  </div>
                </div>
                <table className='m-table m-text-c tr-b'>
                    <thead>
                        <tr className='m-bg-white'>
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
                <div className='clean-top'>
                    <div className='left'>
                        <OptionBox type='checkbox' checked={this.state.all} onClick={this.handleAllChecked}>全选</OptionBox>
                        &emsp;&emsp;
                        已选择<span className='e-orange'>&nbsp;{this.state.checked.length}&nbsp;</span>件
                        &emsp;&nbsp;
                        <button className='e-btn confirm' onClick={this.handleClick}>打包退回</button>
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
                <td>{obj.item_name}</td>
                <td>{obj.remark}</td>
                <td>{obj.item_name}</td>
                <td>{obj.forecast}</td>
                <td>￥：0.00</td>
                <td>￥：0.00</td> 
                <td>速洗达店铺</td>               
            </tr>
        );
        return (<tbody>{html}</tbody>);
    }
}