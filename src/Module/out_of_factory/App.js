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
            shop_id:'',
            value:'',
            data:[], 
            checked:[], 
            all:false, 
            selected_shop:[],
            selected_id:'',
            select_shop:'',
            sel_id:''
        };
        this.handleAllChecked = this.handleAllChecked.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.query = this.query.bind(this);
        this.select_factory = this.select_factory.bind(this); //入厂列表
        this.change_select = this.change_select.bind(this) ; // 选择要出厂的店铺商家
    }

    // 查询 - 搜索
    componentDidMount() {this.query()}
    query(rid) {
        //teamId = tool.isSet(teamId) ? teamId : this.state.teamId;
        let done;
        tool.ui.loading(handle => done = handle);
        api.post('out_factory', {           
            token:'token'.getData(),  
            rid:rid || this.state.sel_id,         
        }, (res, ver) => {
                if (ver && res) {
                    done();
                    console.log(res);
                    this.setState({data:res.result});
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
   // 点击选择要入的工厂
    select_factory (){
        api.post('factory_id', {           
            token:'token'.getData(),
        }, (res, ver) => {
            if (ver && res) {
                console.log(res);
                let len = res.result.length
                ,   tmp_arr = [];
                for (var i = 0;i < len;++i) {
                    tmp_arr.push({key:res.result[i].id, value:res.result[i].mname});
                }
                console.log(tmp_arr)
                this.setState({select_shop:tmp_arr});
                //this.setState({select_shop:res.result.typeArray('mname'), })           
            }
        });
    }
    //选择要出厂的商家
    change_select (value){
        console.log(value)
        this.setState({sel_id:value});
        this.query(value)
    }

    handleClick() {    //出厂
        //console.log(this.state.sel_id);
        if(this.state.sel_id=='') {
            return  tool.ui.error({title:'提示',msg:'请选择出厂商家',button:'确定',callback:(close, event) => {
                close();
            }});              
        }
        if (this.state.checked.length < 1 ) return;
        api.post('out_to_factory', {           
            token:'token'.getData(),
            wid:JSON.stringify(this.state.checked),  
            rid:this.state.sel_id ,      
        }, (res, ver) => {
            console.log(res)
            if (ver && res) {
                printer.outofFactory('printer'.getData(), res.result);
                tool.ui.success({callback:(close, event) => {
                    close();
                    this.query();
                    this.setState({
                        all:false,
                        checked:[],
                    })                                                
                }});  
               // console.log(typeof(this.state.data)) ;               
            }else{
                tool.ui.error({title:'提示',msg:res.msg,button:'确定',callback:(close, event) => {
                    close();
                }});   
            }
        });
    }

    render() {    
        return (
        <Window title='出厂' onClose={this.props.closeView}>            
                <div className="out-title">                  
                    <div className='select-fac-div' onClick = {this.select_factory}>
                      选择门店：<Select  option={this.state.select_shop}  onChange={(value) => this.change_select(value)} selected="请选择门店"/>
                    </div>
                </div>
                <div className="clean laundry">
                   <div className="e-box">
                        <table className='out-factory'>
                            <thead><tr><th>衣物编码</th><th>名称</th><th>颜色</th><th>瑕疵</th><th>品牌</th><th>衣挂号</th><th>洗后预估</th><th>单价</th><th>送返门店</th></tr></thead>
                            <Tbody  data={this.state.data} onChecked={this.onChecked} checked={this.state.checked}/>
                        </table>
                        <Empty show={this.state.data.length < 1} />
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
            <tr key={obj.id} className={obj.state == true ? 'm-grey' : null}>
                <td>
                    {
                        obj.state == true
                        ?
                        obj.clothing_number
                        :
                        <OptionBox
                            value={obj.id}
                            checked={-1 !== obj.id.inArray(this.props.checked)}
                            onClick={this.props.onChecked}
                        >{obj.clothing_number}</OptionBox>
                    }
                </td>
                <td>{obj.clothing_name}</td>
                <td>{obj.clothing_color}</td>
                <td>{obj.remark}</td>
                <td>{obj.sign}</td>
                <td>{obj.grid_num}</td>
                <td>{obj.forecast}</td>                             
                <td>{obj.raw_price}</td>
                <td>{obj.mname}</td>
            </tr>
        );
        return (<tbody>{html}</tbody>);
    }
}