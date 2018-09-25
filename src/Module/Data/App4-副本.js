/**
 * 金熨斗4.0版本数据导入界面组件
 * @author Edwin Young
 */
const fs = window.require('fs'),
      process = window.require('process'),
      path = window.require('path');
import React, {Component} from 'react';
import './App.css';
import Window from '../../UI/Window';

const token = 'token'.getData()
,    data = [
    'brand', 'Card', 'CardType', 'Color', 'Flaw', 'Service', 'Clothes', 'HangPoint', 'Customer',
    'ExchangeBill', 'ExchangeBillCancel', 'ExchangeList','ExchangeListCancel', 'CardExchange'
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
            let connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=' + this.state.addr + ';Jet OLEDB:Database Password=SovellAdminV6');
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