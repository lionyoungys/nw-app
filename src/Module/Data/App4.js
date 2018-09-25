/**
 * 金熨斗4.0版本数据导入界面组件
 * @author Edwin Young
 */
const fs = window.require('fs'),
      process = window.require('process'),
      path = window.require('path');
import React from 'react';
import './App.css';
import Window from '../../UI/Window';
import { Circle } from 'rc-progress';

const token = 'token'.getData();
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID:'',
            addr:null,
            redo:false,
            progress:false,
            data_tables:[    //数据表名,api地址,数据总数,已导入的总数,数据读取存储
                {name:'收活表', api:'new_order_work', total:0, count:0, data:[]},
                {name:'品牌', api:'new_merchant_brand', total:0, count:0, data:[]},
                {name:'颜色表', api:'new_merchant_color', total:0, count:0, data:[]},
                {name:'返洗衣物表', api:'new_order_clean_back', total:0, count:0, data:[]},
                {name:'处理类别', api:'new_merchant_type', total:0, count:0, data:[]},
                {name:'洗后效果', api:'new_merchant_forecast', total:0, count:0, data:[]},
                {name:'备注', api:'new_merchant_flaw', total:0, count:0, data:[]},
                {name:'POS_备注', api:'new_pos_remark', total:0, count:0, data:[]},
                {name:'衣物类别', api:'new_merchant_items_type', total:0, count:0, data:[]},
                {name:'价格表', api:'new_merchant_items', total:0, count:0, data:[]},
                {name:'退赔记录表', api:'new_merchant_compensate', total:0, count:0, data:[]},
                {name:'欠费信息', api:'new_order_arrears', total:0, count:0, data:[]},
                {name:'POS_价格表', api:'new_pos_price', total:0, count:0, data:[]},
                {name:'撤单信息表', api:'new_order_back', total:0, count:0, data:[]},
                {name:'转卡记录', api:'new_merchant_cards_shift', total:0, count:0, data:[]},
                {name:'挂失卡号', api:'new_merchant_cards_loss', total:0, count:0, data:[]},
                {name:'卡信息', api:'new_merchant_cards_info', total:0, count:0, data:[]},
                {name:'收银表', api:'new_merchant_deal_info', total:0, count:0, data:[]},
                {name:'卡类设置', api:'new_merchant_cards', total:0, count:0, data:[]},
                {name:'客户信息表', api:'new_merchant_user', total:0, count:0, data:[]},
                {name:'其他收费', api:'new_merchant_other', total:0, count:0, data:[]},
                {name:'退赔类别', api:'new_merchant_compensate_type', total:0, count:0, data:[]},
                {name:'特殊处理', api:'new_merchant_addition', total:0, count:0, data:[]},
                {name:'导轨信息表A', api:'new_merchant_grid_num_a', total:0, count:0, data:[]},
                {name:'导轨信息表B', api:'new_merchant_grid_num_b', total:0, count:0, data:[]},
                {name:'导轨信息表C', api:'new_merchant_grid_num_c', total:0, count:0, data:[]},
                {name:'导轨信息表D', api:'new_merchant_grid_num_d', total:0, count:0, data:[]},
                {name:'导轨信息表E', api:'new_merchant_grid_num_e', total:0, count:0, data:[]},
                {name:'导轨信息表F', api:'new_merchant_grid_num_f', total:0, count:0, data:[]},
            ],
        };
        this.len = this.state.data_tables.length;
        this.file = path.dirname(process.execPath) + '/data.txt';
        this.limit = 1000;
        this.connection = null;
        this.loadingExit = null;
        this.loadingNotice = null;
        this.timeId = null;
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.verify = this.verify.bind(this);
        this.loading = this.loading.bind(this);
        this.loadingEnd = this.loadingEnd.bind(this);
        this.handleImport = this.handleImport.bind(this);
        this.handleIndex = this.handleIndex.bind(this);
    }

    componentDidMount() {
        api.post('data_status', {token:token}, (res, ver) => {
            console.log(res);
            if (ver) {
                for(let i = 0;i < this.len;++i) {
                    this.state.data_tables[i].count = res.result[this.state.data_tables[i].api];
                }
                this.setState({data_tables:this.state.data_tables});
            }
        });
    }

    handleChange(e) {
        this.loading('数据整理中,请稍等...');
        let value = e.target.value
        ,   readed = 0;
        this.setState({addr:value, redo:false});
        this.connection = tool.include('node-adodb').connection( (this.state.redo ? this.state.addr : value), 'SovellAdminV6' );
        for (let i = 0;i < this.len;++i) {
            this.connection.query('SELECT * FROM [' + this.state.data_tables[i].name + ']').then(data => {
                this.state.data_tables[i].data = data;
                this.state.data_tables[i].total = data.length;
                this.setState({data_tables:this.state.data_tables});
                ++readed;
            }).catch(err => {
                console.log(this.state.data_tables[i].name, err);
                readed = this.len;
                if (!this.state.redo) {
                    tool.ui.error({
                        //msg:'数据整理失败!数据库可能正在被占用,请关闭数据库或关闭打开数据库的软件后,再次重试',
                        msg:'数据整理失败,请重试',
                        callback:close => close()
                    });
                    this.setState({redo:true});
                }
            });
        }
        this.timeId = setInterval(() => {
            readed >= this.len && this.loadingEnd();
        }, 1000);
    }

    handleClick() {
        if (null === this.connection) return tool.ui.error({msg:'请选择数据源',callback:close => close()});
        if (this.state.redo) return  tool.ui.error({msg:'请点击重试按钮重新整理数据后,再执行数据导入',callback:close => close()});
        let empty = true;
        for (let i = 0;i < this.len;++i) {
            if (this.state.data_tables[i].total > 0) {
                empty = false;
                break;
            }
        }
        if (empty) return tool.ui.error({msg:'数据源数据为空',callback:close => close()});
        this.verify(this.handleImport);
    }

    verify(callback) {    //店信息->店ID
        this.connection.query('SELECT 店ID as ID FROM [店信息]').then(data => {
            this.setState({ID:data[0].ID});
            'function' === typeof callback && callback();
        }).catch(err => {
            console.log('ver', err);
            return tool.ui.error({msg:'数据源验证失败',callback:close => close()});
        });
    }

    handleImport() {
        let index = this.handleIndex();
        if (-1 === index) {
            this.setState({progress:false});
            return tool.ui.success({msg:'数据导入成功',callback:close => close()});
        }
        this.setState({progress:true});
        let data_table = this.state.data_tables[index];
        console.log(data_table);
        fs.writeFileSync(
            this.file, 
            JSON.stringify( data_table.data.slice( data_table.count, this.limit.add(data_table.count) ) ), 
            'utf8'
        );
        api.post(data_table.api, {token:token, db_id:this.state.ID, data:fs.createReadStream(this.file)}, res => {
            console.log(res);
            if (2000 == res.code) {
                this.state.data_tables[index].count = this.state.data_tables[index].count.add(res.msg);
                this.setState({data_tables:this.state.data_tables});
                this.handleImport();
            } else {
                this.setState({progress:false});
                return tool.ui.error({msg:res.msg, button:'重试', callback:(close, event) => {
                    close();
                    'click' == event && this.handleImport();
                }});
            }
        })
    }

    handleIndex() {
        for (let i = 0;i < this.len;++i) {
            if (this.state.data_tables[i].total <= this.state.data_tables[i].count) {
                continue;
            } else {
                return i;
            }
        }
        return -1;
    }

    loading(msg) {
        if (null === this.loadingExit) {
            tool.ui.loading( (handle, notice) => {
                this.loadingExit = handle;
                this.loadingNotice = notice;
            })
        }
        msg && 'function' === typeof this.loadingNotice && this.loadingNotice(msg);
    }

    loadingEnd() {
        if (null !== this.loadingExit) {
            this.loadingExit();
            this.loadingExit = null;
            this.loadingNotice = null;
        }
        if (null !== this.timeId) {
            clearInterval(this.timeId);
            this.timeId = null;
        }
    }
    render() {
        let html = []
        ,   count = 0
        ,   total = 0;
        for (let i = 0;i < this.len;++i) {
            total = total.add(this.state.data_tables[i].total);
            count = count.add(this.state.data_tables[i].count);
            html.push(
                <div className='data-import-row' key={this.state.data_tables[i].name}>
                    <span>{this.state.data_tables[i].name}</span>
                    <div><span>{this.state.data_tables[i].count}</span>&nbsp;/&nbsp;<span>{this.state.data_tables[i].total}</span></div>
                </div>
            );
        }
        let percent = Math.floor(count * 100 / total);
        return (
            <Window title='数据导入' onClose={this.props.closeView} width='600' height='632'>
                <div className='data-import'>
                    <div>
                        <span>数据源：</span>
                        <input className='e-file' type='file' onChange={this.handleChange} accept='.btf'/>
                        <em style={this.state.redo ? null : {display:'none'}}>
                            &emsp;<button type='button' className='e-btn' onClick={this.handleChange}>重试</button>
                        </em>
                        &emsp;
                        <button type='button' className='e-btn' onClick={this.handleClick}>开始导入</button>
                    </div>
                    {html}
                </div>
                <div className='data-progress' style={this.state.progress ? null : {display:'none'}}>
                    <Circle percent={percent} className='data-progress-circle' strokeWidth='6' strokeColor='#6bb4ec' trailWidth='6' trailColor='#ccc'/>
                    <div className='data-progress-msg'>{percent}%</div>
                </div>
            </Window>
        );
    }
}