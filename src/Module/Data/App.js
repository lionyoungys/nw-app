/**
 * 数据导入界面组件
 * @author Edwin Young
 */
const fs = window.require('fs'),
      process = window.require('process'),
      path = window.require('path');
import React, {Component} from 'react';
import './App.css';
import Window from '../../UI/Window';

const token = 'token'.getData()
,     data = [
    '收活表','客户信息表','POS_备注','POS_价格表','备注','撤单信息表','处理类别','返洗衣物表','价格表','卡类设置',
    '卡信息','品牌','欠费信息','收银表','退赔记录表','洗后效果','颜色表','转卡记录','衣物类别','卡信息','退赔类别',
    '导轨信息表','导轨信息表A','导轨信息表B','导轨信息表C','导轨信息表D','导轨信息表E','导轨信息表F','其他收费','挂失卡号'
];
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {addr:null, data:[], error:false};
        this.timeId = null;
        this.loadingHandle = null;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this.state.addr && !this.state.data.length);
        console.log(this.state.data);
        console.log(this.state.addr);
        if (this.state.addr && !this.state.data.length) {
            tool.ui.loading(handle => this.loadingHandle = handle);
            let connection = tool.include('node-adodb').connection(this.state.addr, 'betterlife126126');
            let len = data.length
            ,   error = false;
            for (let i = 0;i < len;++i) {
                connection.query('SELECT * FROM [' + data[i] + ']').then(tableData => {
                    this.state.data.push({'name':data[i], data:tableData});
                }).catch(e => {
                    console.log(e);
                    this.setState({error:true});
                    error = true;
                });;
                if (error) break;
            }
            if (null === this.timeId) {
                this.timeId = setInterval(() => {
                    console.log(this.state.data.length);
                    if (this.state.error) {
                        clearInterval(this.timeId);
                        this.timeId = null;
                        this.setState({data:new Array, error:false});
                        console.log(this.state);
                        this.loadingHandle();
                        return tool.ui.error({msg:'导入错误，请重试！',callback:close => close()});
                    }
                    if (this.state.data.length == len) {
                        clearInterval(this.timeId);
                        this.timeId = null;
                        let dataFile = path.dirname(process.execPath) + '/data.txt';
                        fs.writeFileSync(dataFile, JSON.stringify(this.state.data), 'utf8')
                        this.setState({data:[]});
                        let postData = {token:token,txt:fs.createReadStream(dataFile)};
                        console.log(postData);
                        api.post('UploadData', postData, (res, ver, handle) => {
                            this.loadingHandle();
                            if (ver) {
                                tool.ui.success({callback:close => close()});
                            } else {
                                handle();
                            }
                        }, () => this.loadingHandle());
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
            <Window title='数据导入' onClose={this.props.closeView} width='352' height='293'>
            <div className='data'>
                <div className='data_border'>
                    <div>
                        <span>新版本:</span> <input type='text' className='inputselectborder'/>
                    </div>
                    <div>
                        <span>数据源:</span>&nbsp;&nbsp; <input type='file' onChange={e => this.setState({addr:e.target.value}) }/>
                    </div>
                </div>
                <button onClick={this.handleClick} className='e-btn'>开始导入</button>
            </div>
            </Window>
        );
    }
}