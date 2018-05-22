/**
 * 登录界面组件
 * @author Edwin Young 
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {index:1, version:'3.0.2', log:'dfdfddfdfdf'};
        this.step = [
            <Launch/>,
            <Download version={this.state.version} log={this.state.log}/>
        ];
    }

    render() {
        return (
            <div id='login' className='launch'>
                <div className='login-drag'><i onClick={() => win.close()}></i></div>
                {this.step[this.state.index]}
            </div>
        );
    }
}
//检查更新界面
class Launch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='login-launch'>
                <div className='login-launch-v'>当前版本：{nw.App.manifest.version}</div>
                <div className='login-launch-check'>
                    <div>正在检测更新</div>
                </div>
            </div>
        );
    }
}
//下载更新界面
class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {progress:50, complete:true};
    }

    render() {
        let progress = this.state.progress + '%',
            complete = this.state.complete ? 
                (<div className='login-update'>
                    <div className='login-complete'>
                        安装完成
                        <button type='button'>重启程序</button>
                    </div>
                </div>)
                :
                (<div className='login-update'>
                    <div className='login-progress-bar'>
                        <div style={{width:progress}}></div>
                    </div>
                    <div className='login-progress'>正在下载并安装更新包<span>{progress}</span></div>
                </div>)
        return (
            <div className='login-download'>
                <div>发现新版本{this.props.version}</div>
                <pre className='login-log'>{this.props.log}</pre>
                {complete}
            </div>
        );
    }
}

















class Main extends Component {
    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.state = {hasCaptcha:'block',noCaptcha:'none',finCaptcha:'none',class:'passwordN',className:'passwordN'};
        this.click = this.click.bind(this);
        this.returnLogin = this.returnLogin.bind(this);
        this.findpass = this.findpass.bind(this);
        this.remberPSD = this.remberPSD.bind(this);
        this.findPSD = this.findPSD.bind(this);     
    }
//打开有验证码tab
    click (){
        this.setState({hasCaptcha:'none',noCaptcha:'block',finCaptcha:'none'});
        
    }
//找回密码页面
    findpass(){
         this.setState({hasCaptcha:'none',noCaptcha:'none',finCaptcha:'block'});
    }
//找回密码页面
    returnLogin (){
        this.setState({hasCaptcha:'block',noCaptcha:'none',finCaptcha:'none'})
    }
//登录页面记住密码
    remberPSD (){
         this.setState({class:'passwordN' == this.state.class?'passwordX':'passwordN'})
    }
//验证码页面找回密码
   findPSD (){
    this.setState({className:'passwordN' == this.state.className?'passwordX':'passwordN'})
   }
    //登录成功界面跳转方法
    success() {
        nw.Window.open('main.html', nw.App.manifest.mainWindow);
        win.close();
    }
    //关闭窗口
    close(){       
        win.close();
    }
    render() {
        return (            
        <div>   
             {/*用户密码登录 */}
            <div className="LoginBox" style={{display: this.state.hasCaptcha}}>
                <div className='boxTitle'>
                    <span onClick = {this.close}></span> 
                    <b>速洗达洗衣管理系统</b>
                    <a>(商家版)</a>
                </div>
                <div className="inputBox">
                  <span style={{marginTop:'6px'}}>用户名: <input type='text' /></span>
                  <span>密&nbsp;码: <input type='text' /></span>
                  <span><a className = {this.state.class} onClick = {this.remberPSD}></a><b>记住密码</b></span>
                  <div className="login" onClick = {this.success}>登录</div>
                  <div className="login_X">
                      <a onClick={this.findpass}>找回密码</a>
                      <a>申请账号</a>
                  </div>
                </div>
            </div>
            {/* 用户验证码登录 */}
            <div className="LoginBox" style={{display:this.state.noCaptcha}}>
                <div className = "boxTitle">
                    <span onClick = {this.close}></span> 
                    <b>速洗达洗衣管理系统</b>
                    <a>(商家版)</a>
                </div>
                <div className="inputBox" id="inputBox">
                  <span>用户名: <input type='text' /></span>
                  <span>密&nbsp;码: <input type='text' /></span>
                  <span>验证码: <input type="text" id="verification"/><img id="verificationX" /></span>
                  <span><a className={this.state.className} onClick = {this.findPSD}></a><b>记住密码</b></span>
                  <div className="login" >登录</div>
                  <div className="login_X" id="login_X">
                      <a onClick={this.findpass}>找回密码</a>
                      <a>申请账号</a>
                  </div>
                </div>
            </div>
            {/* 用户忘记密码 */}
            <div className="LoginBox" style={{display:this.state.finCaptcha}}>
                <div className = "boxTitle">
                    <span onClick = {this.close}></span> 
                    <b>速洗达洗衣管理系统</b>
                    <a>(商家版)</a>
                </div>
                <div className="inputBox" id="inputBox">
                  <span style={{marginBottom:0}}>新密码: <input type='text' /></span>
                  <a className='psdresult'>密码要求:6位以上，且不能为纯数字</a>
                  <span style = {{textIndent:'8px'}}>确认密码: <input type='text' /></span>
                  <span>手机号: <input type='text' /></span>
                  <span>验证码: <input type="text" id="verification"/><font id="GetverificationX">获取验证码</font></span>                  
                  <div className="login"  style = {{marginTop:'12px'}}>确认</div>
                  <div className="login_X returnLogin">
                      <a onClick = {this.returnLogin}>返回登录</a>
                  </div>
                </div>
            </div>
        </div>
        );
    }
}
ReactDOM.render(<Login/>, document.getElementById('root'));