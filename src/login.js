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
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {index:2, version:'3.0.2', log:'dfdfddfdfdf'};
        this.step = [
            <Launch/>,
            <Download version={this.state.version} log={this.state.log}/>,
            <Login/>
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
//登陆界面
class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='login'>
                <div className='login-edition'><div>速洗达洗衣管理系统</div><div>（商家版）</div></div>
                <div className='login-box'>
                    <div><label htmlFor='name'>用户名：</label><input type='text' id='name' className=''/></div>
                    <div style={{padding:'21px 0 25px'}}><label htmlFor='passwd'>密&emsp;码：</label><input type='password' id='passwd'/></div>
                    <div></div>
                    <div style={{padding:'25px 0 24px 9px'}}></div>
                    <div style={{paddingLeft:'9px'}}></div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById('root'));