/**
 * 登录界面组件
 * @author Edwin Young 
 */
const fs = window.require('fs'),
      process = window.require('process'),
      { spawn, exec } = window.require('child_process');
import React, {Component} from 'react';
import LayerBox from './UI/LayerBox';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {index:0, version:'', log:'', zip:null};
        this.toggleStep = this.toggleStep.bind(this);
    }

    componentDidMount() {
        api.post('hot_upd', {version:nw.App.manifest.version}, (res, ver) => {
            console.log(res);
            if (ver && res.result.has_upd) {
                this.setState({index:1,version:res.result.last_version,log:res.result.desc,zip:res.result.package});
            } else {
                this.setState({index:2});
            }
        }, () => {this.setState({index:2})});
    }
    toggleStep(e) {this.setState({index:e.target.dataset.step})}

    render() {
        return (
            <div id='login' className='launch'>
                <div className='login-drag'><i onClick={this.props.close}></i></div>
                {[
                    <Launch/>,
                    <Download version={this.state.version} log={this.state.log} zip={this.state.zip}/>,
                    <Login toggleStep={this.toggleStep} redirect={this.props.redirect}/>,
                    <Passwd toggleStep={this.toggleStep}/>
                ][this.state.index]}
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
        this.state = {notice:'正在下载软件更新包', progress:0, complete:false};
        this.timeId = null;
    }

    componentDidMount() {
        let path = window.require('path')
        ,   zip = path.dirname(process.execPath) + '/update.zip';
        api.download(
            this.props.zip, 
            fs.createWriteStream(zip),
            state => this.setState({progress:state.progress_rate}),
            () => {
                this.setState({progress:100, notice:'正在解压并安装软件更新包'});
                this.timeId = setInterval(() => {
                    if (fs.statSync(zip).size > 0) {
                        clearInterval(this.timeId);
                        this.timeId = null;
                        exec('update.bat', error => {
                            if (error) {
                                return tool.ui.error({msg:'安装失败', callback:close => close()});
                            } else {
                                this.setState({complete:true});
                            }
                        })
                    }
                }, 1000);
            }
        );
    }

    restart() {    //程序重启
        (
            'darwin' === process.platform
            ?
            spawn('open', ['-n', '-a', process.execPath.match(/^([^\0]+?\.app)\//)[1]], {detached: true})
            :
            spawn(process.execPath, [], {detached: true})
        ).unref();
        nw.App.quit();
    }

    render() {
        let progress = this.state.progress + '%',
            complete = this.state.complete ? 
                (<div className='login-update'>
                    <div className='login-complete'>
                        安装完成
                        <button type='button' onClick={this.restart}>重启程序</button>
                    </div>
                </div>)
                :
                (<div className='login-update'>
                    <div className='login-progress-bar'>
                        <div style={{width:progress}}></div>
                    </div>
                    <div className='login-progress'>{this.state.notice}<span>{100 == this.state.progress ? null : progress}</span></div>
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
//登陆界面
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {remember:false,merchant:'',name:'',passwd:'',show:false,init_passwd:'',init_passwd2:'',number:0}
        this.login = this.login.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.remember = this.remember.bind(this);
       
    }
    componentDidMount() {
        if('mid'.getData!=''){
            this.setState({merchant:'mid'.getData(),name:'name'.getData(),passwd:'passwd'.getData(),remember:true})
        }
    }
    remember() {
        this.setState({remember:!this.state.remember});
        console.log(this.state.remember)
    }
    login() {
           api.post('login', {mid:this.state.merchant,mobile:this.state.name,passwd:this.state.passwd}, (res, ver) => {
            console.log(res);
            if (ver && res) {
                var aname = res.aname;
                var mname = res.mname;
                var token = res.token;
                var pass = res.pass;
                this.state.remember? (this.state.merchant.setData('mid'),this.state.name.setData('name'),this.state.passwd.setData('passwd')):'';
                console.log(this.state.remember)
                aname.setData('aname');
                mname.setData('mname');
                token.setData('token');
                res.mid.setData('merchant_id');
                res.is_root.setData('is_root');
                res.auth.setData('auth');
                // nw.Window.open('main.html', nw.App.manifest.mainWindow);
                // win.close();
                //1 != res.is_root && res.auth.setData('auth');
                if(pass==1){
                   this.setState({show:true})
                }else{
                    this.props.redirect(1);
                }
            } else {
               
                this.setState({number:this.state.number+1});
                if(this.state.number>=3){
                   tool.ui.error({msg:'请5分钟后再重试',info:'Q：如何重置密码？<br/>A：如果您是店员，请联系店长重置密码，<br/>如果您是店长请点击找回密码', callback:(close) => {
                     close();    //点击按钮或关闭符号时关闭弹窗
                   }}); 
                }
                else{
                this.setState({index:2});
                tool.ui.error({
                     msg: res.msg, button: '确定', callback: (close, event) => {
                        close();
                    }
                });
                }
            }
        }, () => {this.setState({index:2})});
        // this.setState({show:true});
        //3次密码错误提示
        // tool.ui.error({msg:'请5分钟后再重试',info:'Q：如何重置密码？<br/>A：如果您是店员，请联系店长重置密码，<br/>如果您是店长请点击找回密码', callback:(close) => {
        //     close();    //点击按钮或关闭符号时关闭弹窗
        // }});
        //nw.Window.open('main.html', nw.App.manifest.mainWindow);
        //win.close();
    }
    handleClick() {
        console.log('##########################');
        if(this.state.init_passwd!=this.state.init_passwd2){
            return tool.ui.error({msg:'两次密码输入的不一致,请重新输入',callback:(close) => {
                close();
            }});
        }
        if (this.state.init_passwd.length < 6) {
           return tool.ui.error({msg:'密码必须大于等于6位',callback:(close) => {
                close();
            }});
        }
        if (!isNaN(this.state.init_passwd)) {
            return tool.ui.error({msg:'密码不能为纯数字',callback:(close) => {
                close();
            }});
        }
      
        let params= { 
            token: 'token'.getData(),
             old_pass:this.state.passwd, 
             new_pass: this.state.init_passwd}
             console.log(params)
            api.post('changePas',params, (res, ver) => {
            if (ver && res) {
                console.log(res)
                tool.ui.success({
                    callback: (close, event) => {
                        close();
                        this.setState({show:false});
                        this.props.redirect(1);
                    }
                });
            } else {
                console.log(res.msg);
                tool.ui.error({
                    msg: res.msg, callback: (close) => {
                        close();
                        this.setState({show:false})
                    }
                    });
                }
            }
        );
     

    }

    render() {
        return (
            <div className='login'>
                <div className='login-edition'><div>速洗达洗衣管理系统</div><div>（商家版）</div></div>
                <div className='login-box'>
                    <div className='login-row'>
                        <label htmlFor='merchant'>商户号：</label>
                        <input type='text' id='merchant' className='login-input' value={this.state.merchant} onChange={e => this.setState({merchant:e.target.value})}/>
                    </div>
                    <div className='login-row'>
                        <label htmlFor='name'>用户名：</label>
                        <input type='text' id='name' className='login-input' value={this.state.name} onChange={e => this.setState({name:e.target.value})}/>
                    </div>
                    <div className='login-row'>
                        <label htmlFor='passwd'>密&emsp;码：</label>
                        <input type='password' id='passwd' className='login-input' value={this.state.passwd} onChange={e => this.setState({passwd:e.target.value})}/>
                    </div>
                    <div className='login-passwd-handle'>
                        <span className={this.state.remember ? 'checked' : null} onClick={this.remember}>记住密码</span>
                        {/* <span onClick={this.props.toggleStep} data-step='3'>找回密码</span> */}
                    </div>
                    <div style={{paddingLeft:'10px'}}><button type='button' onClick={this.login}>登录</button></div>
                </div>
                {
                    this.state.show
                    &&
                    <LayerBox
                        hasCancel={true}
                        title='修改初始密码'
                        onClose={() => this.setState({show:false})}
                        onCancel={() => this.setState({show:false})}
                        onClick={this.handleClick}
                    >
                        <div className='update-passwd-row'>
                            <label htmlFor='init_passwd'>新密码：</label>
                            <input type='password' id='init_passwd' className='login-input' value={this.state.init_passwd} onChange={e => this.setState({init_passwd:e.target.value})}/>
                            <div style={{marginLeft:'106px',fontSize:'12px',color:'#ff0000'}}>6位以上，且不能为纯数字</div>
                        </div>
                        <div className='update-passwd-row'>
                            <label htmlFor='init_passwd2'>确认密码：</label>
                            <input type='password' id='init_passwd2' className='login-input' value={this.state.init_passwd2} onChange={e => this.setState({init_passwd2:e.target.value})}/>
                        </div>
                    </LayerBox>
                }
            </div>
        );
    }
}
//找回密码
class Passwd extends Component {
    constructor(props) {
        super(props);
        this.state = {passwd:'',passwd2:'',phone:'',sms:'',smsCounter:'获取验证码'}
        this.counter = 60;
        this.timeId = null;
        this.sms = this.sms.bind(this);
    }
    sms() {
        if ('获取验证码' !== this.state.smsCounter) return;
        this.setState({smsCounter:'60s'});
        this.timeId = setInterval(() => {
            --this.counter;
            if (0 === this.counter) {
                clearInterval(this.timeId);
                this.timeId = null;
                this.setState({smsCounter:'获取验证码'});
            } else {
                this.setState({smsCounter:this.counter + 's'});
            }
        }, 1000);
    }
    componentWillUnmount() {null !== this.timeId && clearInterval(this.timeId)}

    render() {
        return (
            <div className='passwd'>
                <div className='login-edition'><div>速洗达洗衣管理系统</div><div>（商家版）</div></div>
                <div className='passwd-box'>
                    <div>
                        <label htmlFor='new_passwd'>新密码：</label>
                        <input type='password' id='new_passwd' className='login-input' value={this.state.passwd} onChange={e => this.setState({passwd:e.target.value})}/>
                        <div style={{marginLeft:'242px',fontSize:'10px',color:'#ff0000'}}>密码为6~18位字母、数字组合</div>
                    </div>
                    <div>
                        <label htmlFor='new_passwd2'>确认密码：</label>
                        <input type='password' id='new_passwd2' className='login-input' value={this.state.passwd2} onChange={e => this.setState({passwd2:e.target.value})}/>
                    </div>
                    <div style={{margin:'12px 0'}}>
                        <label htmlFor='phone'>手机号：</label>
                        <input type='text' id='phone' className='login-input' value={this.state.phone} onChange={e => this.setState({phone:e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor='sms'>验证码：</label>
                        <input type='text' style={{width:'102px'}} id='sms' className='login-input' value={this.state.sms} onChange={e => this.setState({sms:e.target.value})}/>
                        <span className='sms' onClick={this.sms}>{this.state.smsCounter}</span>
                    </div>
                    <div style={{padding:'20px 0 16px 178px'}}><button type='button'>确认</button></div>
                    <div><span onClick={this.props.toggleStep} data-step='2' className='back-to-login'>返回登陆</span></div>
                </div>
            </div>
        );
    }
}

export default Main;