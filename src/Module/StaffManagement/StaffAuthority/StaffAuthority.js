/**
 * 权限界面组件
 * @author wang jun & ranchong 
 */
import React, {Component} from 'react';
import '../../../UI/bothpages.css'  //公共样式
import '../StaffManagement.css';
import Window from '../../../UI/Window';
import {topMenu} from '../../../Menu.js';
export default class extends Component {   
    constructor(props) {
        super(props);   
        this.state = {
            show:false,
            show1:false,
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
        });  
    }
    sure(add) {

        console.log(this.state.authname);
        console.log(typeof (this.state.authSelectList));
        if ('' == this.state.authname) return tool.ui.error({ msg: '组名称不能为空！', callback: close => close() });
        if ( this.state.authSelectList.length ==0) return tool.ui.error({ msg: '权限不能为空！', callback: close => close() });
        console.log(this.state.authSelectList);
        let pragram = {};
        if (add) {//添加
            pragram = {
                token: 'token'.getData(), 
                auth_name: this.state.authname, 
                auth: '['+this.state.authSelectList.join(',')+']',
            }
            console.log(pragram);
            api.post('authAdd', pragram, (res, ver, handle) => {
                if (ver && res) {
                    console.log(res)
                    this.componentDidMount();
                    this.setState({ show: false });
                    handle({msg:'添加成功！'});
                } else{
                    handle();
                }
            });  
        }else{//编辑
            pragram = {
                token: 'token'.getData(),
                id: this.state.modID,
                auth_name: this.state.authname,
                auth: '[' + this.state.authSelectList.join(',') + ']',
            }
            console.log(pragram);
            api.post('authMod', pragram, (res, ver, handle) => {
                if (ver && res) {
                    console.log(res)
                    this.componentDidMount();
                    this.setState({show1:false});
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
        tool.ui.ask({title:'删除权限',info:'提示:删除后组名将被永久删除！<br/>', callback:(close, event) => {
              //点击按钮或关闭符号时关闭弹窗
              //删除员工
            api.post('authDel', {
                token:'token'.getData(),
                id:id,
                }, (res, ver,handle) => {
                    if (ver && res) {
                        console.log(res);
                        close();
                        authlists.splice(index,1)  
                        this.setState({ authlist: authlists})                       
                    }else{
                        handle();
                    }
                });      
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
        let menuList = topMenu.map((obj, index) =>
            <div className='addGroup-content-cell' key={'obj' + index}>
                <div className='addGroup-content-cell-content'>
                    <ul>
                        <li className='addGroup-content-cell-content-head'>
                            <input type='checkbox' checked={this.state.authSelectList.length == 0 ? false : (obj.id.inArray(this.state.authSelectList) == -1 ? false : true)} data-id={obj.id} onChange={this.handleArr}/>
                            <p>{obj.value}</p>
                        </li>
                        {
                            obj.options.map(obj2 =>
                                <li className='addGroup-content-cell-content-normal' key={obj2.value}>
                                    <input type='checkbox' checked={this.state.authSelectList.length == 0 ? false : (obj2.id.inArray(this.state.authSelectList) == -1 ? false : true)} data-id={obj2.id} onChange={this.handleArr}/>
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
            <td>{index+1}</td>
            <td>{item.auth_name}</td>
            <td>{item.authName}</td>                                   
            <td><i onClick={() => this.setState({ show1: true, authSelectList: item.auth,authname:item.auth_name,modID:item.id})} >编辑</i><i onClick={this.ask2} data-id={item.id} data-index = {index}>删除</i></td>
            { 
                this.state.show1 &&
                <Window title='编辑组' onClose={() => this.setState({ show1: false })}>
                    <div id="addGroup-srarch">
                        <span>组名称：</span>
                        <input type='text' value={this.state.authname} onChange={e => this.setState({ authname:e.target.value})}/>
                        <button type='button' className='e-btn sureBtn' onClick={() => this.sure(false)}>确认</button>
                    </div>
                    <div id='addGroup-content'>
                        {menuList}
                    </div>
                </Window>
            }
        </tr>
        );
        
        return ( 
                <div>
                    <div className="StaffAuthority" onClick={() => this.setState({show:true,authSelectList:[],authname:''})}>新增组</div> 
                    {
                        this.state.show
                        &&
                        <Window title='新增组' onClose={() => this.setState({ show: false })}>
                            <div id="addGroup-srarch">
                                <span>组名称：</span>
                            <input type='text' value={this.state.authname} onChange={e => this.setState({ authname: e.target.value})}/>
                            <button type='button' className='e-btn sureBtn' onClick={()=>this.sure(true)}>确认</button>
                            </div>
                            <div id='addGroup-content'>
                                {menuList}
                            </div>
                        </Window>
                    }   
                    <table className="ui-table-base staff-tab">
                        <thead>
                            <tr>
                                <td></td>
                                <td>组名称</td>
                                <td>权限</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody>
                            {authlist}
                        </tbody>
                    </table>                  
                </div>                
        );        
    };
}