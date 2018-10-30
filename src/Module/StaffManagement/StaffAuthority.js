/**
 * 权限界面组件
 * @author wang jun & ranchong 
 */
import React, {Component} from 'react';
import '../../UI/bothpages.css'  //公共样式
import './StaffManagement.css';
import Menu from '../../Menus.js';
import CreateGroup from './CreateGroup';
export default class extends Component {   
    constructor(props) {
        super(props);   
        this.state = {
            show:0,
            authlist: [],
            authSelectList: [],//选中的权限
            authname:'',//组名称
            modID:'',//编辑id
        }   
        this.handleArr = this.handleArr.bind(this);
        this.ask2 = this.ask2.bind(this);   
        this.sure = this.sure.bind(this);  
    }; 
    componentDidMount() {
        let done;
        tool.ui.loading(handle => done = handle);
        api.post('authList', {token:'token'.getData()}, (res, ver,handle) => {
            done();
            if (ver && res) {
                console.log(res)
                this.setState({authlist:res.result});
            }else{
                handle();
            }
        }, () => done());  
    }
    sure(obj) {
        let pragram = {};
        if (1 === this.state.show) {//添加
            pragram = {
                token: 'token'.getData(), 
                auth_name: obj.value, 
                auth: '['+obj.checked.join(',')+']',
            }
            console.log(pragram);
            api.post('authAdd', pragram, (res, ver, handle) => {
                if (ver && res) {
                    console.log(res)
                    this.componentDidMount();
                    this.setState({ show: 0 });
                    handle({msg:'添加成功！'});
                } else{
                    handle();
                }
            });  
        }else if (2 === this.state.show){//编辑
            pragram = {
                token: 'token'.getData(),
                id: this.state.modID,
                auth_name: obj.value,
                auth: '[' + obj.checked.join(',') + ']',
            }
            console.log(pragram);
            api.post('authMod', pragram, (res, ver, handle) => {
                if (ver && res) {
                    console.log(res)
                    this.componentDidMount();
                    this.setState({show:0});
                    handle({ msg: '修改成功！' });
                } else{
                    handle();
                }
            });  
        }
    }
    ask2(e) {
        var id = e.target.dataset.id;
        var index = e.target.dataset.index;
        var authlists = this.state.authlist;
        tool.ui.warn({title:'删除权限',msg:'提示:删除后组名将被永久删除！<br/>', callback:(close, event) => {
              //删除员工
            if (event == 'click' || '确定' ) {
                api.post('authDel', {
                    token: 'token'.getData(),
                    id: id,
                }, (res, ver, handle) => {
                    if (ver && res) {
                        console.log(res);
                        authlists.splice(index, 1)
                        this.setState({ authlist: authlists })
                    } else {
                        handle();
                    }
                });    
            }  
            close();
        }});
    }
    handleArr(e){
        let checked = e.target.checked;
        let id = e.target.dataset.id;
        var selectList = this.state.authSelectList;
        console.log(checked, id, selectList);
        let index = id.inArray(selectList);
        if (checked) {
            if (index == -1) {
                selectList.push(id);
                this.setState({ authSelectList: selectList})
            }
        }else{
            if (index != -1) {
                selectList.splice(index, 1);
                this.setState({ authSelectList: selectList })
            }   
        }
        console.log(this.state.authSelectList);
    }
    
    render() {
        //菜单列表     
        let menuList = Menu.map((obj, index) =>
            <div className='addGroup-content-cell' key={'obj' + index}>
                <div className='addGroup-content-cell-content'>
                    <ul>
                        <li className='addGroup-content-cell-content-head'>
                            <input type='checkbox' checked={this.state.authSelectList.length == 0 ? false : ('undefined'!= typeof obj.id && obj.id.inArray(this.state.authSelectList) == -1 ? false : true)} data-id={obj.id} onChange={this.handleArr}/>
                            <p>{obj.value}</p>
                        </li>
                        {
                            obj.options.map(obj2 =>
                                <li className='addGroup-content-cell-content-normal' key={obj2.value}>
                                    <input type='checkbox' checked={this.state.authSelectList.length == 0 ? false : ('undefined' != typeof obj2.id && obj2.id.inArray(this.state.authSelectList) == -1 ? false : true)} data-id={obj2.id} onChange={this.handleArr}/>
                                    <p>{obj2.value}</p>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        );
        //权限列表
        var authlist=this.state.authlist.map((item,index) =>
            <tr key={'item'+index}>
                <td>{item.auth_name}</td>
                <td>{item.authName}</td>                                   
                <td><i onClick={() => this.setState({ show: 2, authSelectList: item.auth,authname:item.auth_name,modID:item.id})} >编辑</i><i onClick={this.ask2} data-id={item.id} data-index = {index}>删除</i></td>
            </tr>
        );
        return ( 
            <div>
                <div className="StaffAuthority" onClick={() => this.setState({show:1,authSelectList:[],authname:''})}>新增组</div>   
                <table className="ui-table-base staff-tab">
                    <thead>
                        <tr>
                            <td>组名称</td>
                            <td>权限</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        {authlist}
                    </tbody>
                </table> 
                {this.state.show && <CreateGroup status={this.state.show} checked={this.state.authSelectList} callback={this.sure} onClose={() => this.setState({show:0})}/>}      
            </div>        
        );
                
    };
}