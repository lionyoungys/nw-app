/**
 * 收衣界面
 * @author Edwin Young
 */

import React, {Component} from 'react';
import Window from '../../UI/Window';
import MathUI from '../../UI/MathUI';
import Category from './Category';
import Item from './Item';
import Brand from './Brand';
import Color from './Color';
import Problem from './Problem';
import Forcast from './Forecast';
import Price from './Price';
import Temp from './Temp';
import UpdatePrice from './UpdatePrice';
import Deduct from './Deduct';
import Payment from '../../UI/Payment';
import User from './User';
import './App.css';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:'',name:'',number:'',addr:'',time:'',type:'',balance:0,discount:'',
            category:[],item:[],brand:[],color:[],problem:[],forecast:[],price:[],
            show:0, categoryIndex:0,currentIndex:0,    
            data:[],    //本地存储数据
            update:false,    //用于判断衣物为添加还是修改
        };
        this.counter = 1;    //编码累加计数属性
        /*
    "user_name": "姓名",
	"user_mobile": "手机号",
	"clothing_number": "衣物编码",
	"clothing_id": "衣物id",
	"clothing_name": "衣物名称",
	"clothing_color": "衣物颜色",
	"clothing_grids": "衣物网格",
	"clothing_type": "衣物类型",
	"raw_price": "衣物原价",
	"remark": "瑕疵",
	"deal_time": 交活时间戳,
    "grid_num": "格架号",
    "addition_remark":附加服务（工艺加价）
    "addition_price":附加服务费
    addition_no_price:不可折金额
    "addition_discount":附加服务费是否打折(0,不打折。1，打折)
    "forecast":洗后预估效果
    "work_number":件数
    "sign":衣物品牌
    "card_type":卡类型
    "address":住址
            */
        this.M1read = this.M1read.bind(this);    //读卡
        this.add = this.add.bind(this);    //添加衣物
        this.showItem = this.showItem.bind(this);    //展示添加衣物组件
        this.cost = this.cost.bind(this);    //收银
        this.clone = this.clone.bind(this);    //数量增加
        this.destory = this.destory.bind(this);    //数量减少
        this.recharge = this.recharge.bind(this);    //充值
        this.handleClose = this.handleClose.bind(this);    //关闭窗口处理
        this.handleCancel = this.handleCancel.bind(this);    //取消处理
        this.setBrand = this.setBrand.bind(this);    //设置品牌
        this.showBrand = this.showBrand.bind(this);    //展示设置品牌组件
        this.setColor = this.setColor.bind(this);    //设置颜色
        this.showColor = this.showColor.bind(this);    //展示设置颜色组件
        this.setProblem = this.setProblem.bind(this);    //设置瑕疵
        this.showProblem = this.showProblem.bind(this);    //展示设置瑕疵
        this.setForcast = this.setForcast.bind(this);    //设置洗后预估
        this.showForcast = this.showForcast.bind(this);    //展示设置洗后预估
        this.setPrice = this.setPrice.bind(this);    //设置工艺加价
        this.showPrice = this.showPrice.bind(this);    //展示修改工艺加价界面
        this.setTemp = this.setTemp.bind(this);    //设置临时衣物
        this.updatePrice = this.updatePrice.bind(this);    //修改衣物单价
        this.showUpdatePrice = this.showUpdatePrice.bind(this);    //展示修改衣物单价组件
        this.onClose = this.onClose.bind(this);
        this.tempUser = this.tempUser.bind(this);    //展示用户信息填写
        this.setUser = this.setUser.bind(this);    //设置用户信息
        this.del = this.del.bind(this);    //项目删除方法
    }

    componentDidMount() {
        let token = 'token'.getData();
        api.post('clothes', {token:token}, (res, ver, handle) => {    //获取衣物列表
            if (ver) {
                let len = res.result.length;
                for (let i = 0;i < len;++i) {
                    this.state.category.push({id:res.result[i].id, name:res.result[i].name});
                    this.state.item.push(res.result[i].server);
                }
                this.setState({category:this.state.category, item:this.state.item});
                console.log('item', this.state.item);
            } else {handle()}
        });
        api.post('brandList', {token:token}, (res, ver, handle) => {    //获取品牌列表
            if (ver) {
                this.setState({brand:res.result});
            } else {handle()}
        });
        api.post('colorList', {token:token}, (res, ver, handle) => {    //获取颜色列表
            if (ver) {
                this.setState({color:res.result});
            } else {handle()}
        });
        api.post('flawList', {token:token}, (res, ver, handle) => {    //获取瑕疵列表
            if (ver) {
                this.setState({problem:res.result});
            } else {handle()}
        });
        api.post('forecastList', {token:token}, (res, ver, handle) => {    //获取洗后预估列表
            if (ver) {
                this.setState({forecast:res.result});
            } else {handle()}
        });
        api.post('additionList', {token:token}, (res, ver, handle) => {    //获取洗后预估列表
            if (ver) {
                this.setState({price:res.result});
                console.log('price', this.state.price);
            } else {handle()}
        });
    }

    M1read() {

    }
    add(index) {
        let item = this.state.item[this.state.categoryIndex][index];
        if (this.state.update) {
            this.state.data[this.state.currentIndex].clothing_id = item.id
            this.state.data[this.state.currentIndex].clothing_name = item.item_name;
            this.state.data[this.state.currentIndex].clothing_type = item.cate_name;
            this.state.data[this.state.currentIndex].raw_price = item.item_off_price;
            this.state.data[this.state.currentIndex].remark = item.item_flaw || '';
            this.state.data[this.state.currentIndex].deal_time = tool.timestamp(item.item_cycle);
            this.state.data[this.state.currentIndex].min_discount = item.min_discount;
            this.state.data[this.state.currentIndex].has_discount = item.has_discount;
        } else {
            let data = {
                clothing_number: this.counter.timeCode(), 
                clothing_id: item.id, 
                clothing_name: item.item_name, 
                clothing_color: '', 
                clothing_grids: '',
                clothing_type: item.cate_name,
                raw_price: item.item_off_price,
                remark: item.item_flaw || '',
                deal_time: tool.timestamp(item.item_cycle),
                grid_num: '',
                addition_remark:'',
                addition_price: 0,
                addition_no_price: 0,
                addition_discount:'',
                forecast:'',
                work_number:1,
                sign:'',
                min_discount: item.min_discount,    //最低折扣率
                has_discount: item.has_discount,    //是否打折
                parent:null    //判断是否为子级数据，值为复制父级数据的衣物编码
            };
            ++this.counter;
            this.state.data.push(data);
        }
        this.setState({show:3, data:this.state.data, currentIndex:(this.state.data.length - 1), update:false});
    }
    setTemp(value) {
        if (this.state.update) {
            this.state.data[this.state.currentIndex].clothing_id = '';
            this.state.data[this.state.currentIndex].clothing_name = value.name;
            this.state.data[this.state.currentIndex].raw_price = value.price;
            this.state.data[this.state.currentIndex].deal_time = tool.timestamp(value.day);
            this.state.data[this.state.currentIndex].has_discount = value.discount ? 1 : 0;
        } else {
            let data = {
                clothing_number: this.counter.timeCode(), 
                clothing_id: '', 
                clothing_name: value.name, 
                clothing_color: '', 
                clothing_grids: '',
                clothing_type: '',
                raw_price: value.price,
                remark: '',
                deal_time: tool.timestamp(value.day),
                grid_num: '',
                addition_remark:'',
                addition_price: 0,
                addition_no_price: 0,
                addition_discount:'',
                forecast:'',
                work_number:1,
                sign:'',
                min_discount: 1,    //最低折扣率
                has_discount: value.discount ? 1 : 0,    //是否打折
                parent:null    //判断是否为子级数据，值为复制父级数据的衣物编码
            };
            ++this.counter;
            this.state.data.push(data);
        }
        this.setState({show:4, data:this.state.data, currentIndex:(this.state.data.length - 1), update:false});
    }
    showItem(e) {this.setState({show:1,currentIndex:e.target.parentNode.dataset.index,update:true})}
    clone(param) {
        let data = tool.clone(this.state.data[param]);
        data.clothing_number = this.counter.timeCode();
        data.parent = this.state.data[param].clothing_number;
        data.addition_remark = data.addition_price = data.addition_discount = '';
        ++this.counter;
        this.state.data.push(data);
        this.setState({data:this.state.data});
    }
    destory(param) {
        this.state.data.spliceByKeyVal('parent', this.state.data[param].clothing_number, {last:true});
        this.setState({data:this.state.data});
    }
    del(e) {
        let index = e.target.parentNode.dataset.index
        ,   number = this.state.data[index].clothing_number;
        this.state.data.splice(index, 1);
        this.state.data.spliceByKeyVal('parent', number);
        this.setState({data:this.state.data});
    }
    
    setBrand(value) {
        this.state.data[this.state.currentIndex].sign = value;
        this.setState({show:4, data:this.state.data});
    }
    showBrand(e) {this.setState({show:3,currentIndex:e.target.parentNode.dataset.index})}
    setColor(value) {
        this.state.data[this.state.currentIndex].clothing_color = value;
        this.setState({show:5, data:this.state.data});
    }
    showColor(e) {this.setState({show:4,currentIndex:e.target.parentNode.dataset.index})}
    setProblem(value) {
        this.state.data[this.state.currentIndex].remark = value;
        this.setState({show:6, data:this.state.data});
    }
    showProblem(e) {this.setState({show:5,currentIndex:e.target.parentNode.dataset.index})}
    setForcast(value) {
        this.state.data[this.state.currentIndex].forecast = value;
        this.setState({show:7, data:this.state.data});
    }
    showForcast(e){this.setState({show:6,currentIndex:e.target.parentNode.dataset.index})}
    setPrice(obj) {
        this.state.data[obj.index].addition_remark = obj.remark;
        this.state.data[obj.index].addition_price = obj.disPrice;
        this.state.data[obj.index].addition_no_price = obj.price;
        this.setState({show:0, data:this.state.data})
    }
    showPrice(e) {this.setState({show:7,currentIndex:e.target.parentNode.dataset.index})}
    updatePrice(value) {
        this.state.data[this.state.currentIndex].raw_price = value;
        this.state.data.setByIntersection({parent:this.state.data[this.state.currentIndex].clothing_number},{raw_price:value});
        this.setState({show:0, data:this.state.data});
    }
    showUpdatePrice(e) {this.setState({show:12,currentIndex:e.target.parentNode.dataset.index})}
    setUser(obj) {
        obj.show = 0;
        this.setState(obj);
    }
    cost() {
        this.setState({show:14});
    }
    recharge() {

    }
    handleClose() {this.setState({show:0})}
    handleCancel() {this.setState({show:1})}
    tempUser() {this.setState({show:15})}
    onClose() {
        if (this.state.data.length > 0) {
            tool.ui.warn({button:['是（Y）', '否（N）'],callback:(close, event) => {
                0 == event && this.props.closeView();
                close();
            }});
        } else {
            this.props.closeView();
        }
    }


    render() {
        let total = 0    //总金额
        ,   amount = 0    //折后金额
        ,   discount = '' == this.state.discount ? 100 : this.state.discount
        ,   html = this.state.data.map((obj, index) => {
            let count = this.state.data.keyValCount('parent', obj.clothing_number);
            total = total.add(obj.raw_price, obj.addition_no_price, obj.addition_price);
            amount = amount.add( 
                (obj.has_discount ? (Math.floor(obj.raw_price * discount) / 100) : obj.raw_price), 
                obj.addition_no_price, 
                (Math.floor(obj.addition_price * discount) / 100)
            );
            return (
                <div key={'data' + index} data-index={index} style={obj.parent ? {display:'none'} : null}>
                    <div>{obj.clothing_number}</div>
                    <div onClick={this.showItem}>{obj.clothing_name}</div>
                    <div onClick={this.showColor}>{obj.clothing_color}</div>
                    <div onClick={this.showProblem}>{obj.remark}</div>
                    <div onClick={this.showBrand}>{obj.sign}</div>
                    <div onClick={this.showForcast}>{obj.forecast}</div>
                    <div onClick={this.showPrice}>{obj.addition_remark}</div>
                    <div onClick={this.showUpdatePrice}>{obj.raw_price}</div>
                    <div><MathUI param={index} onAdd={this.clone} onSub={this.destory}>{count + 1}</MathUI></div>
                    <div onClick={this.del}>删除</div>
                </div>
            );
        });
        return (
            <Window title='收衣' onClose={this.onClose}>
                <div className='clothes-user'>
                    手机：<input type='text' className='e-input' style={{width:'126px'}} value={this.state.phone} readOnly onClick={this.tempUser}/>
                    姓名：<input type='text' className='e-input' style={{width:'100px'}} value={this.state.name} readOnly onClick={this.tempUser}/>
                    卡号：<input type='text' className='e-input' style={{width:'126px'}} value={this.state.number} readOnly onClick={this.tempUser}/>
                    地址：<input type='text' className='e-input' style={{width:'196px'}} value={this.state.addr} readOnly onClick={this.tempUser}/>
                    <button type='button' className='e-btn' onClick={this.M1read}>读卡</button>
                </div>
                <div className='clothes-header'>
                    <div>衣物编码</div><div>衣物名称</div><div>颜色</div><div>瑕疵</div><div>品牌</div>
                    <div>洗后预估</div><div>工艺加价</div><div>单价</div><div>数量</div><div>操作</div>
                </div>
                <div className='clothes-body'>{html}</div>
                <div style={{padding:'10px 20px'}}><button type='button' className='e-btn' onClick={() => this.setState({show:1})}>添加衣物</button></div>
                <div className='clothes-footer'>
                    <div className='clothes-footer-left'>
                        <div>
                            <div>总件数：{this.state.data.length}件</div>
                            <div>总金额：&yen;{total}</div>
                            <div style={{fontSize:'14px',color:'red'}}>折后价：&yen;{amount}</div>
                        </div>
                        <div>
                            <div>卡余额：&yen;{this.state.balance}</div>
                            <div>折扣率：{discount}%</div>
                            <div>取衣时间：<input type="date" className="ui-date" value={this.state.time} onChange={e => this.setState({time:e.target.value})}/></div>
                        </div>
                    </div>
                    <div className='clothes-footer-right'>
                        <div><button type='button' className='e-btn middle high' onClick={this.cost}>收银</button></div>
                        <div>
                            <button type='button' className='e-btn' onClick={this.props.changeView} data-event='open_case'>开钱箱</button>&nbsp;
                            <button type='button' className='e-btn' onClick={this.recharge}>充值</button>&nbsp;
                            <button type='button' className='e-btn' onClick={() => this.setState({show:13})}>卡扣款</button>
                        </div>
                    </div>
                </div>
                {
                    1 === this.state.show 
                    && 
                    <Category onClose={this.handleClose} data={this.state.category} callback={index => this.setState({show:2,categoryIndex:index})} onClick={() => this.setState({show:11})}/>
                }
                {
                    2 === this.state.show
                    &&
                    <Item onClose={this.handleClose} onCancel={this.handleCancel} data={this.state.item[this.state.categoryIndex]} callback={this.add}/>
                }
                {
                    3 === this.state.show
                    &&
                    <Brand onClose={this.handleClose} default={this.state.data[this.state.currentIndex].sign} data={this.state.brand} callback={this.setBrand}/>
                }
                {
                    4 === this.state.show
                    &&
                    <Color onClose={this.handleClose} default={this.state.data[this.state.currentIndex].clothing_color} data={this.state.color} callback={this.setColor} />
                }
                {
                    5 === this.state.show
                    &&
                    <Problem onClose={this.handleClose} default={this.state.data[this.state.currentIndex].remark} data={this.state.problem} callback={this.setProblem} />
                }
                {
                    6 === this.state.show
                    &&
                    <Forcast onClose={this.handleClose} default={this.state.data[this.state.currentIndex].forecast} data={this.state.forecast} callback={this.setForcast} />
                }
                {
                    7 === this.state.show
                    &&
                    <Price onClose={this.handleClose} data={this.state.data} currentIndex={this.state.currentIndex} price={this.state.price} callback={this.setPrice}/>
                }
                {
                    11 === this.state.show
                    &&
                    <Temp onClose={this.handleClose} onCancel={this.handleCancel} callback={this.setTemp}/>
                }
                {
                    12 === this.state.show
                    &&
                    <UpdatePrice
                        onClose={this.handleClose}
                        callback={this.updatePrice}
                        price={this.state.data[this.state.currentIndex].raw_price} 
                        discount={this.state.data[this.state.currentIndex].min_discount}
                    />
                }
                {
                    13 === this.state.show
                    &&
                    <Deduct onClose={this.handleClose} callback={this.handleClose}/>
                }
                {
                    14 === this.state.show
                    &&
                    <Payment onClose={this.handleClose}/>
                }
                {
                    15 === this.state.show
                    &&
                    <User
                        onClose={this.handleClose} 
                        addr={this.state.addr} 
                        name={this.state.name} 
                        number={this.state.number} 
                        phone={this.state.phone} 
                        balance={this.state.balance} 
                        discount={this.state.discount} 
                        callback={this.setUser}
                    />
                }
            </Window>
        );
    }
}