/**
 * 登录界面组件
 * @author Edwin Young
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './Api';
import './login.css';

let win = nw.Window.get();
win.showDevTools();
class Main extends Component {
    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
    }

    componentDidMount() {
        win.on('new-win-policy', function(frame, url, policy) {
            policy.setNewWindowManifest({
                width:1000,
                height:600,
            });
          });
        win.on('close', function() {
            this.hide();    //关闭时先进行隐藏以让用户觉得立即关闭
            null !== win && win.close(true);    //虽然关了,但实际上它还在工作
            this.close(true);    //关闭新窗口也关闭主窗口
        });
        win.on('closed', function() {win = null});    //新窗口关闭后释放'win'对象
    }

    //登录成功界面跳转方法
    success() {
        nw.Window.open('main.html', {}, mainWin => {
            mainWin.on('close', function() {
                this.hide();
                null !== mainWin && mainWin.close(true);
                this.close(true);
            });
            mainWin.on('closed', function() {mainWin = null});
        });
        win.close();
    }
    
    render() {
        return (
            <div>
                <h1>这是测试标题</h1>
                <h2>这是测试标题2</h2>
                <button type='button' onClick={this.success}>跳转main界面</button>
            </div>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById('root'));