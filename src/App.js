/**
 * 主程序入口文件
 * @author Edwin Young
 * 
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './Api';
import './Event';
import './login.css';
import './main.css';
import './UI/base.css';
import './Elem/App.css';
import Login from './login';
import Main from './main';

const EVAL = 'eval@';
var win = nw.Window.get();
win.on('loaded', win.show);    //防止窗口渲染未完成时展示
win.on('close', function() {
    this.hide();    //关闭时先进行隐藏以让用户觉得立即关闭
    null !== win && win.close(true);    //虽然关了,但实际上它还在工作
    this.close(true);    //关闭新窗口也关闭主窗口
});
win.on('closed', function() {win = null});    //新窗口关闭后释放'win'对象
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {sign:0};    //0:登陆界面;1:主操作界面
        this.windows = [
            {
                view:Login,
                config:{
                    resizeTo:[600, 450],
                    setResizable:[false],
                    moveTo:[EVAL + 'win.x + (1024 - 600) / 2', EVAL + 'win.y + (737 - 450) / 2']
                }
            }, 
            {
                view:Main,
                config:{
                    setResizable:[true],
                    resizeTo:[1024, 737],
                    moveTo:[EVAL + 'win.x - (1024 - 600) / 2', EVAL + 'win.y - (737 - 450) / 2']
                }
            }
        ];
        this.close = this.close.bind(this);
        this.redirect = this.redirect.bind(this);
    }
    close() {nw.App.quit()}
    //界面重定向方法
    redirect(index) {
        if (isNaN(index) || index >= this.windows.length) {
            index = (0 == this.state.sign ? 1 : 0);
        }
        let args, len, i;
        for (let k in this.windows[index].config) {
            args = this.windows[index].config[k];
            len = args.length;
            for (i = 0;i < len;++i) {
                if ('string' === typeof args[i] && 0 === args[i].indexOf(EVAL)) {
                    args[i] = Math.round( eval( args[i].replace(EVAL, '') ) );
                }
            }
            'function' === typeof win[k] && win[k].apply(win, args);
        }
        this.setState({sign:Math.floor(index)});
    }

    render() {
        let A = this.windows[this.state.sign].view;
        return <A redirect={this.redirect} Window={win} close={this.close}/>
    }
}
ReactDOM.render(<App/>, document.getElementById('root'));