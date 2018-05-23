/**
 * 数据导入界面组件
 * @author Edwin Young
 */
const fs = window.require('fs'),
      process = window.require('process'),
      path = window.require('path');
import React, {Component} from 'react';
import './App.css';

const data = [
    '收活表','客户信息表','POS_备注','POS_价格表','备注','撤单信息表','处理类别','返洗衣物表','价格表','卡类设置',
    '卡信息','品牌','欠费信息','收银表','退赔记录表','洗后效果','颜色表','转卡记录','衣物类别','卡信息'
];
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {address:null, data:[]};
        this.timeId = null;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.state.address && !this.state.data.length) {
            let connection = ADODB.connection(this.state.address, 'betterlife126126');
            let len = data.length;
            for (let i = 0;i < len;++i) {
                connection.query('SELECT * FROM [' + data[i] + ']').then(tableData => {
                    this.state.data.push({'name':data[i], data:tableData});
                });
            }
            if (null === this.timeId) {
                this.timeId = setInterval(() => {
                    console.log(this.state.data.length);
                    if (this.state.data.length == len) {
                        clearInterval(this.timeId);
                        this.timeId = null;
                        let dataFile = path.dirname(process.execPath) + '/data.txt';
                        fs.writeFileSync(dataFile, JSON.stringify(this.state.data), 'utf8')
                        console.log(dataFile.blob(fs.readFileSync(dataFile)));
                    }
                }, 1000);
            }
        }
    }

    componentWillUnmount() {
        null !== this.timeId && clearInterval(this.timeId);
    }

    render() {
        return (
            <div>
                选择数据库文件：
                <input type='file' onChange={e => this.setState({address:e.target.value})}/>
                <button type='button' onClick={this.handleClick}>数据导入</button>
            </div>
        );
    }
}