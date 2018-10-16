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
            /*'brand', 'Card', 'CardType', 'Color', 'Flaw', 'Service', 'Clothes', 'HangPoint', 'Customer',
    'ExchangeBill', 'ExchangeBillCancel', 'ExchangeList','ExchangeListCancel', 'CardExchange' */
            data_tables:[    //数据表名,api地址,数据总数,已导入的总数,数据读取存储
                {name:'brand', api:'brand_v4', total:0, count:0, data:[]},
                {name:'Color', api:'color_v4', total:0, count:0, data:[]},
                {name:'Flaw', api:'flaw_v4', total:0, count:0, data:[]},
                {name:'CardType', api:'cardtype_v4', total:0, count:0, data:[]},
                {name:'Card', api:'card_v4', total:0, count:0, data:[]},
                {name:'Service', api:'service_v4', total:0, count:0, data:[]},
                {name:'Clothes', api:'clothes_v4', total:0, count:0, data:[]},
                {name:'HangPoint', api:'hangpoint_v4', total:0, count:0, data:[]},
                {name:'Customer', api:'customer_v4', total:0, count:0, data:[]},
                {name:'ExchangeBill', api:'exchangebill_v4', total:0, count:0, data:[]},
                {name:'ExchangeBillCancel', api:'exchangebillcancel_v4', total:0, count:0, data:[]},
                {name:'ExchangeList', api:'exchangelist_v4', total:0, count:0, data:[]},
                {name:'ExchangeListCancel', api:'exchangelistcancel_v4', total:0, count:0, data:[]},
                {name:'CardExchange', api:'cardexchange_v4', total:0, count:0, data:[]},
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
        api.post('data_status_v4', {token:token}, (res, ver) => {
            console.log(res);
            if (ver) {
                for(let i = 0;i < this.len;++i) {
                    this.state.data_tables[i].count = res.result[this.state.data_tables[i].api.replace('_v4', '')];
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
        this.connection = tool.include('node-adodb').connection( (this.state.redo ? this.state.addr : value), '' );
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
        'function' === typeof callback && callback();
        /*this.connection.query('SELECT 店ID as ID FROM [店信息]').then(data => {
            this.setState({ID:data[0].ID});
            'function' === typeof callback && callback();
        }).catch(err => {
            console.log('ver', err);
            return tool.ui.error({msg:'数据源验证失败',callback:close => close()});
        });*/
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
                        <input className='e-file' type='file' onChange={this.handleChange} accept='.btf,.mdb'/>
                        <em style={this.state.redo ? null : {display:'none'}}>
                            &emsp;<button type='button' className='e-btn' onClick={this.handleChange}>重试</button>
                        </em>
                        &emsp;
                        <button type='button' className='e-btn larger' onClick={this.handleClick}>开始导入</button>
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