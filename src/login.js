/**
 * 登录界面组件
 * @author Edwin Young 
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Input from './UI/Input';
import './Api';
import './login.css';

let win = nw.Window.get();
win.on('loaded', win.show);    //防止窗口渲染未完成时展示
win.on('close', function() {
    this.hide();    //关闭时先进行隐藏以让用户觉得立即关闭
    null !== win && win.close(true);    //虽然关了,但实际上它还在工作
    this.close(true);    //关闭新窗口也关闭主窗口
});
win.on('closed', function() {win = null});    //新窗口关闭后释放'win'对象
win.showDevTools();
class Main extends Component {
    constructor(props) {
        super(props);
        let passwd = 'passwd'.getData();
        this.state = {shop_id:'shop_id'.getData(), phone:'phone'.getData(), passwd:passwd, remember:(passwd.length > 0)};
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin() {
        console.log(333);
        console.log({mid:this.state.shop_id,mobile:this.state.phone,passwd:this.state.passwd, version:nw.App.manifest.version}, )
        api.post(
            'login', 
            {mid:this.state.shop_id,mobile:this.state.phone,passwd:this.state.passwd, version:nw.App.manifest.version}, 
            (res, ver) => {
                console.log(res);
                if (ver) {
                    this.state.shop_id.setData('shop_id');
                    this.state.phone.setData('phone');
                    res.aname.setData('aname');
                    res.mname.setData('mname');
                    res.token.setData('token');
                    res.mid.setData('merchant_id');
                    res.is_root.setData('is_root');
                    res.auth.setData('auth');
                    JSON.stringify(res.module).setData('module');
                    if (this.state.remember) {
                        this.state.passwd.setData('passwd');
                    } else {
                        ''.setData('passwd');
                    }
                    /*if(1 == res.pass){
                        this.setState({show:true})
                    }else{
                        nw.Window.open('main.html', nw.App.manifest.mainWindow);
                        win.close();
                    }*/
                    nw.Window.open('main.html', nw.App.manifest.mainWindow);
                    win.close();
                } else {
                    tool.ui.fail({title:'登陆失败', msg:res.msg});
                }
            }
        );
    }

    render() {
        return (
            <div className='login'>
                <div className='login-move-area'></div>
                <i className='e-icon-close14' onClick={() => win.close()}></i>
                <span className='login-words'></span>
                <span className='login-edition'>商家版</span>
                <section>
                    <Input icon='shop' type='text' placeholder='请输入商户号' value={this.state.shop_id} onChange={e => this.setState({shop_id:e.target.value})}/>
                    <Input icon='phone' type='text' placeholder='请输入登陆手机号' value={this.state.phone} onChange={e => this.setState({phone:e.target.value})}/>
                    <Input icon='lock' type='password' placeholder='请输入登陆密码' value={this.state.passwd} onChange={e => this.setState({passwd:e.target.value})}/>
                    <div style={{margin:'4px 0 10px', color:'#989b9a'}}>
                        <input type='checkbox' className='e-checkbox' checked={this.state.remember} onClick={() => this.setState({remember:!this.state.remember})}/>&nbsp;记住密码
                    </div>
                    <div className='e-text-c'><button type='button' className='e-btn-c' onClick={this.handleLogin}>登录</button></div>
                </section>
            </div>
        );
    }
}
ReactDOM.render(<Main/>, document.getElementById('root'));