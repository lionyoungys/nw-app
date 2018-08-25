/**
 * 出厂界面组件
 * @author yangyunlong
 */
//const {ipcRenderer} = window.require('electron');
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
            value:'',
            data:[], 
            checked:[], 
            all:false, 
            teamId:'',
            team:[],
            selectedshop:'',
            shop:['速洗达工厂','荣仔的洗衣店','全部']
        };
        this.handleAllChecked = this.handleAllChecked.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.query = this.query.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        api.post('factory_list', {           
            token:'token'.getData(),
        }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                let result = res.result,
                teamId = ( tool.isSet(result[0]) ? result[0].accept_id : null );
                this.setState({team:result,teamId:teamId});
                 this.query(teamId);
            }
            console.log(res.data);
        });
    }
    query(teamId) {
        teamId = tool.isSet(teamId) ? teamId : this.state.teamId;
        api.post('out_of_factory', {           
            token:'token'.getData(),
            mer_id:teamId
        }, (res, ver) => {
            if (ver && res) {
                console.log(res.data);
                this.setState({data:res.data.result.data});
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
                    if (data[i].list[j].assist == 0) checked.push(data[i].list[j].id);
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
    handleChange(value) {
        this.setState({teamId:value});
        this.query(value);
        console.log(value);
    } 
    handleClick() {    //出厂
        if (this.state.checked.length < 1 || '' === this.state.teamId) return;

        api.post('new_into_factory', {           
            token:'token'.getData(),
            itemids:this.state.checked.toString(),
            moduleid:21,
            targetmid:this.state.teamId
        }, (res, ver) => {
            if (ver && res) {
                let res = res.data.result;
                ipcRenderer.send(
                    'print-silent',
                    'public/prints/out_of_factory.html',
                     {factory:res.fromName,merchant:res.targetName,employee:res.operatorName,count:res.count}
                );
                this.setState({checked:[],all:false});
                this.query();
            }else{
                    alert(res.data.msg);
                }
        });
    }
    render() {
        let option = this.state.team.map(obj => {
            return {key:obj.accept_id, value:obj.mname};
        });
        let html = this.state.data.map(obj => 
            <div className='m-box e-box' key={obj.date}>
                <div className='in-factory-date'>{obj.date}</div>
                    <table className='m-table m-text-c tr-b'>
                    <thead><tr><th>衣物编码</th><th>名称</th><th>颜色</th><th>瑕疵</th><th>品牌</th><th>洗后预估</th><th>工艺加价</th><th>单价</th><th>送返门店</th></tr></thead>
                        <Tbody data={obj.list} onChecked={this.onChecked} checked={this.state.checked}/>
                    </table>
            </div>
        );
        return (
        <Window title='出厂' onClose={this.props.closeView}>
            <div>
               <div className="out-title">
                  <div className='right out-left'>
                      <input type="text" value={this.state.value} onChange={e=>this.setState({value:e.target.value})} autoFocus={true}  placeholder='请输入或扫描衣物编码'/>                       
                      <button className="e-btn hangon-btn" >查询</button>
                  </div>
                  <div className='right out-right'>
                        选择门店：<Select  option={this.state.shop}  onChange={e=>this.setState({selectedshop:e.target.value}) } selected="全部"/>
                  </div>
               </div>
                <div className='clean-top'>
                    <div className='left'>
                        <OptionBox type='checkbox' checked={this.state.all} onClick={this.handleAllChecked}>全选</OptionBox>
                        &emsp;&emsp;
                        已选择<span className='e-orange'>&nbsp;{this.state.checked.length}&nbsp;</span>件
                        &emsp;&nbsp;
                        <button className='e-btn confirm' onClick={this.handleClick}>打包出厂</button>
                    </div>                    
                </div>
                {html}
                <Empty show={this.state.data.length < 1}/>
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
        let html = this.props.data.map(obj => 
            <tr key={obj.id} className={obj.assist == 1 ? 'm-grey' : null}>
                <td>
                    {
                        obj.assist == 1
                        ?
                        obj.clean_sn
                        :
                        <OptionBox
                            value={obj.id}
                            checked={-1 !== obj.id.inArray(this.props.checked)}
                            onClick={this.props.onChecked}
                        >{obj.clean_sn}</OptionBox>
                    }
                </td>
                <td>{obj.item_name}</td>
                <td>{obj.put_sn}</td>
                <td>{obj.put_sn}</td>
                <td>{obj.put_sn}</td>
                <td>{obj.put_sn}</td>
                <td>{obj.put_sn}</td>
                <td>{obj.put_sn}</td>
                <td>{obj.put_sn}</td>
            </tr>
        );
        return (<tbody>{html}</tbody>);
    }
}