/**
 * 收衣界面
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Math from '../../UI/Math';
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
            phone:'',name:'',number:'',addr:'',time:'',
            category:[],item:[],brand:[],color:[],problem:[],forecast:[],price:[],
            show:0, itemIndex:0,tempIndex:0,data:[]
        };
        this.M1read = this.M1read.bind(this);    //读卡
        this.add = this.add.bind(this);    //添加衣物
        this.cost = this.cost.bind(this);    //收银
        this.recharge = this.recharge.bind(this);    //充值
        this.handleClose = this.handleClose.bind(this);    //关闭窗口处理
        this.handleCancel = this.handleCancel.bind(this);    //取消处理
        this.setBrand = this.setBrand.bind(this);    //设置品牌
        this.setColor = this.setColor.bind(this);    //设置颜色
        this.setProblem = this.setProblem.bind(this);    //设置瑕疵
        this.setForcast = this.setForcast.bind(this);    //设置洗后预估
        this.setPrice = this.setPrice.bind(this);    //设置工艺加价
        this.setTemp = this.setTemp.bind(this);    //设置临时衣物
        this.updatePrice = this.updatePrice.bind(this);    //修改衣物单价
        this.onClose = this.onClose.bind(this);
        this.tempUser = this.tempUser.bind(this);    //展示用户信息填写
        this.setUser = this.setUser.bind(this);    //设置用户信息
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
                console.log('brand', this.state.brand);
            } else {handle()}
        });
        api.post('colorList', {token:token}, (res, ver, handle) => {    //获取颜色列表
            if (ver) {
                this.setState({color:res.result});
                console.log('color', this.state.color);
            } else {handle()}
        });
        api.post('flawList', {token:token}, (res, ver, handle) => {    //获取瑕疵列表
            if (ver) {
                this.setState({problem:res.result});
                console.log('problem', this.state.problem);
            } else {handle()}
        });
        api.post('forecastList', {token:token}, (res, ver, handle) => {    //获取洗后预估列表
            if (ver) {
                this.setState({forecast:res.result});
                console.log('forecast', this.state.forecast);
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
    add() {
        this.setState({show:3, tempIndex:(this.state.data.length - 1)});
    }
    setBrand(value) {this.setState({show:4})}
    setColor(value) {this.setState({show:5})}
    setProblem(value) {this.setState({show:6})}
    setForcast(value) {this.setState({show:7})}
    setPrice(value) {this.setState({show:8})}
    setTemp(value) {this.setState({show:4})}
    updatePrice() {this.setState({show:0})}
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
        tool.ui.warn({button:['是（Y）', '否（N）'],callback:(close, event) => {
            0 == event && this.props.closeView();
            close();
        }}); 
    }


    render() {
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
                <div className='clothes-body'>
                    <div>
                        <div>2</div><div>2</div><div>2</div><div>2</div><div>2</div><div>2</div><div>2</div><div onClick={() => this.setState({show:12})}>2</div><div><Math>5</Math></div><div>2</div>
                    </div>
                </div>
                <div style={{padding:'10px 20px'}}><button type='button' className='e-btn' onClick={() => this.setState({show:1})}>添加衣物</button></div>
                <div className='clothes-footer'>
                    <div className='clothes-footer-left'>
                        <div>
                            <div>总件数：1件</div>
                            <div>总金额：&yen;18.00</div>
                            <div style={{fontSize:'14px',color:'red'}}>折后价：&yen;12.00</div>
                        </div>
                        <div>
                            <div>卡余额：&yen;0.00</div>
                            <div>折扣率：80%</div>
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
                    <Category onClose={this.handleClose} data={this.state.category} callback={index => this.setState({show:2,itemIndex:index})} onClick={() => this.setState({show:11})}/>
                }
                {
                    2 === this.state.show
                    &&
                    <Item onClose={this.handleClose} onCancel={this.handleCancel} data={this.state.item[this.state.itemIndex]} callback={this.add}/>
                }
                {
                    3 === this.state.show
                    &&
                    <Brand onClose={this.handleClose} data={this.state.brand} callback={this.setBrand}/>
                }
                {
                    4 === this.state.show
                    &&
                    <Color onClose={this.handleClose} data={this.state.color} callback={this.setColor} />
                }
                {
                    5 === this.state.show
                    &&
                    <Problem onClose={this.handleClose} data={this.state.problem} callback={this.setProblem} />
                }
                {
                    6 === this.state.show
                    &&
                    <Forcast onClose={this.handleClose} data={this.state.forecast} callback={this.setForcast} />
                }
                {
                    7 === this.state.show
                    &&
                    <Price onClose={this.handleClose} data={this.state.price} callback={this.setPrice} />
                }
                {
                    11 === this.state.show
                    &&
                    <Temp onClose={this.handleClose} onCancel={this.handleCancel} callback={this.setTemp}/>
                }
                {
                    12 === this.state.show
                    &&
                    <UpdatePrice onClose={this.handleClose} callback={this.updatePrice}/>
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
                    <User onClose={this.handleClose} addr={this.state.addr} name={this.state.name} number={this.state.number} phone={this.state.phone} callback={this.setUser}/>
                }
            </Window>
        );
    }
}