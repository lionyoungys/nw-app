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

const token = 'token'.getData();
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addr:null,
            data_tables:[    //数据表名,api地址,数据总数,已导入的总数
                {name:'收活表', api:'new_order_work', total:0, count:0},
                {name:'品牌', api:'new_merchant_brand', total:0, count:0},
                {name:'颜色表', api:'new_merchant_color', total:0, count:0},
                {name:'返洗衣物表', api:'new_order_clean_back', total:0, count:0},
                {name:'处理类别', api:'new_merchant_type', total:0, count:0},
                {name:'洗后效果', api:'new_merchant_forecast', total:0, count:0},
                {name:'备注', api:'new_merchant_flaw', total:0, count:0},
                {name:'POS_备注', api:'new_pos_remark', total:0, count:0},
                {name:'衣物类别', api:'new_merchant_items_type', total:0, count:0},
                {name:'价格表', api:'new_merchant_items', total:0, count:0},
                {name:'退赔记录表', api:'new_merchant_compensate', total:0, count:0},
                {name:'欠费信息', api:'new_order_arrears', total:0, count:0},
                {name:'POS_价格表', api:'new_pos_price', total:0, count:0},
                {name:'撤单信息表', api:'new_order_back', total:0, count:0},
                {name:'转卡记录', api:'new_merchant_cards_shift', total:0, count:0},
                {name:'挂失卡号', api:'new_merchant_cards_loss', total:0, count:0},
                {name:'卡信息', api:'new_merchant_cards_info', total:0, count:0},
                {name:'收银表', api:'new_merchant_deal_info', total:0, count:0},
                {name:'卡类设置', api:'new_merchant_cards', total:0, count:0},
                {name:'客户信息表', api:'new_merchant_user', total:0, count:0},
                {name:'其他收费', api:'new_merchant_other', total:0, count:0},
                {name:'退赔类别', api:'new_merchant_compensate_type', total:0, count:0},
                {name:'特殊处理', api:'new_merchant_addition', total:0, count:0},
                {name:'导轨信息表A', api:'new_merchant_grid_num_a', total:0, count:0},
                {name:'导轨信息表B', api:'new_merchant_grid_num_b', total:0, count:0},
                {name:'导轨信息表C', api:'new_merchant_grid_num_c', total:0, count:0},
                {name:'导轨信息表D', api:'new_merchant_grid_num_d', total:0, count:0},
                {name:'导轨信息表E', api:'new_merchant_grid_num_e', total:0, count:0},
                {name:'导轨信息表F', api:'new_merchant_grid_num_f', total:0, count:0},
            ],
        };
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
            let connection = tool.include('node-adodb').connection(this.state.addr, 'betterlife126126')
            ,   read = []
            ,   len = data.length
            ,   count = 0
            ,   size = 0
            ,   error = '';
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
                        if (size > 80000) {
                            this.handleCancel();
                            return tool.ui.error({msg:'数据量过大！！',callback:close => close()});
                        }
                        //let bf = new Buffer(JSON.stringify(read));
                        //console.log('buf', buf);
                        //let postData = {token:token,txt:fs.createReadStream( new Blob([bf], {type:'text/plain'}) )};
                        let dataFile = path.dirname(process.execPath) + '/data.txt';
                        fs.writeFileSync(dataFile, JSON.stringify(read), 'utf8')
                        let postData = {token:token,txt:fs.createReadStream(dataFile)};
                        console.log(postData);
                        api.post('UploadData', postData, (res, ver, handle) => {
                            this.handleCancel();
                            if (ver) {
                                tool.ui.success({callback:close => {
                                    close();
                                    this.props.closeView();
                                }});
                            } else {
                                this.handleCancel();
                            }
                        }, this.handleCancel);
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