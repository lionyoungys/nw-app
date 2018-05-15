/**
 * 主界面组件
 * @author Edwin Young
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './Api';
import './main.css';

let win = nw.Window.get();
win.showDevTools();
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {value:''};
        this.post = this.post.bind(this);
        this.get = this.get.bind(this);
        this.connection = this.connection.bind(this);
    }

    componentDidMount() {
        KeyCode.listen(this.input, value => this.setState({value:value}));
    }

    post() {
        api.post(
            'forgotSendCode', 
            {mobile_number:'18745729547'}, 
            res => {
                console.log(res);
            }, 
            error => {
                console.log(error);
            }
        );
    }

    get() {
        api.get(
            'forgotSendCode',
            res => {
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    connection() {
        // let connection = ADODB.connection('F:/nw-app/laundry.btf', 'betterlife126126');
    }
    

    render() {
        return (
            <div>
                <h1>这是测试标题</h1>
                <h2>这是测试标题2</h2>
                <button type='button' onClick={this.post}>post请求测试</button>
                <button type='button' onClick={this.get}>get请求测试</button>
                <input type='text' value={this.state.value} ref={input => this.input = input}/>
                <button type='button' onClick={this.connection}>连接数据库</button>
            </div>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById('root'));