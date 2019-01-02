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
// ,     data = [
//     '收活表','品牌','颜色表','返洗衣物表','处理类别','洗后效果','备注','POS_备注','衣物类别','价格表',
//     '退赔记录表','欠费信息','POS_价格表','撤单信息表','转卡记录','挂失卡号','卡信息','收银表','卡类设置','客户信息表','其他收费',
//     '导轨信息表','导轨信息表A','导轨信息表B','导轨信息表C','导轨信息表D','导轨信息表E','导轨信息表F','退赔类别','特殊处理',
// ];
,    data = [
    'DATA', 'temp', 'User', '备注', '打折金额表', '单据号', '导轨当前位置', '导轨信息表', '店信息', '分店', '分店发活表', '分店价格表', '分店收活表', '附件', '挂失卡号',
    '价格表', '截止天数', '卡号', '卡信息', '客户信息表', '面料表', '盘点', '盘点确认', '品牌', '欠费信息', '区域词典', '日期', '上传文件', '收活备份', '收活表', '收活表_Backup',
    '收银备份表', '收银表', '特殊处理', '条码尾数', '退活表', '尾数', '洗后效果', '洗衣签号', '系统参数', '下发文件', '颜色表', '用户词典', '允许折扣'
];
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {addr:null};
        this.timeId = null;
        this.loadingEnd = null;
        this.handleCancel = this.handleCancel.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleCancel() {
        if (null !== this.loadingEnd) {
            if (null !== this.timeId) {
                clearInterval(this.timeId);
                this.timeId = null;
            }
            this.loadingEnd();
            this.loadingEnd = null;
        }
    }

    handleClick() {
        if (this.state.addr) {
            //let connection = tool.include('node-adodb').connection(this.state.addr, 'betterlife126126')
            var ADODB = window.require('node-adodb')
            ,   read = []
            ,   len = data.length
            ,   count = 0
            ,   size = 0
            ,   error = '';
            //SovellAdminV6
            //'Provider=Microsoft.Jet.OLEDB.4.0;Data Source=' + this.state.addr + ';Jet OLEDB:Database Password=SovellAdminV6'
            let connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=' + this.state.addr + ';Jet OLEDB:Database Password=betterlife126126');
            //return ADODB;
            tool.ui.loading(handle => this.loadingEnd = handle);
            for (let i = 0;i < len;++i) {
                connection.query('SELECT * FROM [' + data[i] + ']').then(tableData => {
                    read.push({name:data[i], data:tableData});
                }).catch(e => {
                    console.log(data[i], e);
                    error = '导入错误，请重试！';
                });
                connection.query('SELECT count(*) as len FROM [' + data[i] + ']').then(arr => {
                    size += arr[0].len;
                    ++count;
                }).catch(e => {
                    console.log(data[i], e);
                    error = '导入错误，请重试！！！';
                });
                if ('' !== error) break;
            }
            if (null === this.timeId) {
                this.timeId = setInterval(() => {
                    let readLen = read.length;
                    console.log(readLen);
                    if ('' !== error) {
                        this.handleCancel();
                        return tool.ui.error({msg:error,callback:close => close()});
                    }
                    if (readLen == len && readLen == count) {
                        clearInterval(this.timeId);
                        this.timeId = null;
                        // if (size > 80000) {
                        //     this.handleCancel();
                        //     return tool.ui.error({msg:'数据量过大！！',callback:close => close()});
                        // }
                        //let bf = new Buffer(JSON.stringify(read));
                        //console.log('buf', buf);
                        //let postData = {token:token,txt:fs.createReadStream( new Blob([bf], {type:'text/plain'}) )};
                        let dataFile = path.dirname(process.execPath) + '/data.txt';
                        fs.writeFileSync(dataFile, JSON.stringify(read), 'utf8')
                        let postData = {token:token,txt:fs.createReadStream(dataFile)};
                        console.log(postData);
                        // api.post('UploadData', postData, (res, ver, handle) => {
                        //     this.handleCancel();
                        //     if (ver) {
                        //         tool.ui.success({callback:close => {
                        //             close();
                        //             this.props.closeView();
                        //         }});
                        //     } else {
                        //         this.handleCancel();
                        //     }
                        // }, this.handleCancel);
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
            <Window title='数据导入' onClose={this.props.closeView} width='352' height='240'>
            <div className='data'>
                <div className='data_border'>
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