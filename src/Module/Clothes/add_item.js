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
import Code from './Code';
import Recharge from '../Recharge/App';
import './App.css';

const token = 'token'.getData()
,     page = 1
,     limit = 10000;
export default class extends Component {
    constructor(props) {
        super(props);
        this.counter = 1;    //编码累加计数属性
        let order = this.props.items
        ,   items = this.props.items.work || []
        ,   len = items.length
        ,   arr = [];
        if (len > 0) {
            let tmpNumber;
            for (var i = 0;i < len;++i) {
                tmpNumber = items[i].clothing_number;
                if (null == tmpNumber || '' == tmpNumber) {
                    tmpNumber = this.counter.timeCode();
                    ++this.counter;
                }
                arr.push({
                    parent:null,
                    DATATAG:items[i].clothing_number,
                    clothing_number:tmpNumber,
                    clothing_id:items[i].clothing_id,
                    clothing_name:items[i].clothing_name,
                    clothing_color:items[i].clothing_color,
                    remark:items[i].remark,
                    grid_num:items[i].grid_num,
                    addition_remark:items[i].addition_remark,
                    addition_price:0,
                    addition_no_price:0,
                    addition_discount:'',
                    forecast:items[i].forecast,
                    work_number:items[i].work_number,
                    sign:'',
                    has_discount:items[i].has_discount,
                    clothing_grids:items[i].clothing_grids,
                    clothing_type:items[i].clothing_type,
                    raw_price:items[i].raw_price,
                    deal_time:items[i].deal_time,
                    min_discount:items[i].min_discount,
                    transfer:items[i].transfer,
                    min_transfer:items[i].min_transfer,
                });
            }
        }
        this.state = {
            oid:order.id,uid:this.props.id,phone:order.user_mobile,name:order.user_name,number:'',cid:null,addr:order.address,time:tool.date('Y-m-d', order.otime),type:'',balance:0,discount:'100',    //type:卡类型
            mphone:'',maddr:'', ad:'',sn:'',code_arr:[],
            category:[],item:[],brand:[],color:[],problem:[],forecast:[],price:[],
            show:0, categoryIndex:0,currentIndex:0,    
            data:arr,    //本地存储数据
            card:{},    //卡数据
            payCard:{},
            update:false,    //用于判断衣物为添加还是修改            
        };
        this.date = tool.date('Y-m-d');
        this.PAYM1read = this.PAYM1read.bind(this);    //会员读卡
        this.setCode = this.setCode.bind(this);    //设置衣物编码
        this.showCode = this.showCode.bind(this);    //展示设置衣物编码
        this.add = this.add.bind(this);    //添加衣物
        this.showItem = this.showItem.bind(this);    //展示添加衣物组件
        this.cost = this.cost.bind(this);    //收银
        this.clone = this.clone.bind(this);    //数量增加
        this.destory = this.destory.bind(this);    //数量减少
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
        this.setUser = this.setUser.bind(this);    //设置用户信息
        this.del = this.del.bind(this);    //项目删除方法
        this.copy = this.copy.bind(this);    //项目复制
        this.paymentCallback = this.paymentCallback.bind(this);    //订单支付回调
        this.print = this.print.bind(this);
        this.paymentClose = this.paymentClose.bind(this);
    }

    componentDidMount() {
        api.post('clothes', {token:token, page:page, limit:limit}, (res, ver, handle) => {    //获取衣物列表
            if (ver) {
                let len = res.result.type.length;
                for (let i = 0;i < len;++i) {
                    this.state.category.push({id:res.result.type[i].id, name:res.result.type[i].name});
                    this.state.item.push(res.result.type[i].server);
                }
                console.log(res.result);
                this.setState({category:this.state.category, item:this.state.item});
            } else {handle()}
        });
        api.post('brandList', {token:token, page:page, limit:limit}, (res, ver, handle) => {    //获取品牌列表
            if (ver) {
                this.setState({brand:res.result.list});
            } else {handle()}
        });
        api.post('colorList', {token:token, page:page, limit:limit}, (res, ver, handle) => {    //获取颜色列表
            if (ver) {
                this.setState({color:res.result.list});
            } else {handle()}
        });
        api.post('flawList', {token:token, page:page, limit:limit}, (res, ver, handle) => {    //获取瑕疵列表
            if (ver) {
                this.setState({problem:res.result.list});
            } else {handle()}
        });
        api.post('forecastList', {token:token, page:page, limit:limit}, (res, ver, handle) => {    //获取洗后预估列表
            if (ver) {
                this.setState({forecast:res.result.list});
            } else {handle()}
        });
        api.post('additionList', {token:token, page:page, limit:limit}, (res, ver, handle) => {    //获取洗后预估列表
            if (ver) {
                this.setState({price:res.result.list});
            } else {handle()}
        });
    }
    PAYM1read(value) {
        let obj = {};
        if ('string' === typeof value && '' != value) {
            obj.number = value;
        }
        obj.callback = (res) => {
            this.setState({payCard:res});
        }
        EventApi.M1Read(obj);
    }
    add(index) {
        let item = this.state.item[this.state.categoryIndex][index]
        ,   time = this.state.time;
        if (this.state.update) {
            let day = tool.timestamp(item.item_cycle);
            this.state.data[this.state.currentIndex].clothing_id = item.id
            this.state.data[this.state.currentIndex].clothing_name = item.item_name;
            this.state.data[this.state.currentIndex].clothing_type = item.cate_name;
            this.state.data[this.state.currentIndex].raw_price = item.item_online_price;
            this.state.data[this.state.currentIndex].deal_time = day;
            this.state.data[this.state.currentIndex].min_discount = item.min_discount;
            this.state.data[this.state.currentIndex].has_discount = item.has_discount;
            this.state.data[this.state.currentIndex].transfer = item.transfer;
            this.state.data[this.state.currentIndex].min_transfer = item.min_transfer;
            this.state.data.setByIntersection(
                {parent:this.state.data[this.state.currentIndex].DATATAG}, 
                {
                    clothing_id:item.id, 
                    clothing_name:item.item_name, 
                    clothing_type:item.cate_name, 
                    raw_price:item.item_online_price, 
                    deal_time:day, 
                    min_discount:item.min_discount,
                    has_discount:item.has_discount,
                    transfer:item.transfer,
                    min_transfer:item.min_transfer
                }
            );
        } else {
            let timeCode = this.counter.timeCode()
            ,   data = {
                DATATAG:timeCode,
                clothing_number: timeCode, 
                clothing_id: item.id, 
                clothing_name: item.item_name, 
                clothing_color: '', 
                clothing_grids: '',
                clothing_type: item.cate_name,
                raw_price: item.item_online_price,
                remark: item.item_flaw || '',
                deal_time: tool.timestamp(item.item_cycle),
                grid_num: '',
                addition_remark:'',
                addition_price: 0,
                addition_no_price: 0,
                addition_discount: '',
                forecast:'',
                work_number:1,
                sign:'',
                min_discount: item.min_discount,    //最低折扣率
                has_discount: item.has_discount,    //是否打折
                transfer:item.transfer,
                min_transfer:item.min_transfer,
                parent:null    //判断是否为子级数据，值为复制父级数据的DATATAG
            };
            ++this.counter;
            this.state.data.push(data);
            let itemTime = tool.date('Y-m-d', data.deal_time);
            if ('' == time || time < itemTime) time = itemTime;
        }
        // this.setState({show:3, data:this.state.data, currentIndex:(this.state.data.length - 1), update:false, time:time});
        this.setState({show:4, data:this.state.data, currentIndex:(this.state.data.length - 1), update:false, time:time});
    }
    setTemp(value) {
        if (this.state.update) {
            let day = tool.timestamp(value.day)
            ,   has_discount = value.discount ? 1 : 0;
            this.state.data[this.state.currentIndex].clothing_id = '';
            this.state.data[this.state.currentIndex].clothing_name = value.name;
            this.state.data[this.state.currentIndex].raw_price = value.price;
            this.state.data[this.state.currentIndex].deal_time = day;
            this.state.data[this.state.currentIndex].has_discount = has_discount;
            this.state.data.setByIntersection(
                {parent:this.state.data[this.state.currentIndex].DATATAG}, 
                {clothing_id:'', clothing_name:value.name, raw_price:value.price, deal_time:day, has_discount:has_discount}
            );
        } else {
            let timeCode = this.counter.timeCode()
            ,   data = {
                DATATAG:timeCode,
                clothing_number: timeCode, 
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
                addition_discount: '',
                forecast:'',
                work_number:1,
                sign:'',
                min_discount: 1,    //最低折扣率
                has_discount: value.discount ? 1 : 0,    //是否打折
                parent:null    //判断是否为子级数据，值为复制父级数据的DATATAG
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
        data.parent = this.state.data[param].DATATAG;
        data.addition_remark = data.addition_price = data.addition_discount = '';
        ++this.counter;
        this.state.data.push(data);
        this.setState({data:this.state.data});
    }
    destory(param) {
        this.state.data.spliceByKeyVal('parent', this.state.data[param].DATATAG, {last:true});
        this.setState({data:this.state.data});
    }
    del(e) {
        let index = e.target.parentNode.parentNode.dataset.index
        ,   number = this.state.data[index].DATATAG;
        this.state.data.splice(index, 1);
        this.state.data.spliceByKeyVal('parent', number);
        this.setState({data:this.state.data});
    }
    copy(e) {
        let item = tool.clone(this.state.data[e.target.parentNode.parentNode.dataset.index])
        ,   timeCode = this.counter.timeCode();
        item.DATATAG = timeCode;
        item.clothing_number = timeCode;
        item.parent = null;
        ++this.counter;
        this.state.data.push(item);
        this.setState({data:this.state.data});
    }
    setCode(data){
        let len = data.length;
        for (let i = 0;i < len;++i) {
            this.state.data[data[i].index].clothing_number = data[i].number;
        }
        this.setState({data:this.state.data,show:0});
    }
    showCode(e){this.setState({show:16,currentIndex:e.target.parentNode.dataset.index})}
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
        this.setState({show:0, data:this.state.data});
        // this.setState({show:7, data:this.state.data});
    }
    showForcast(e){this.setState({show:6,currentIndex:e.target.parentNode.dataset.index})}
    setPrice(obj) {
        this.state.data[obj.index].addition_remark = obj.remark;
        this.state.data[obj.index].addition_price = obj.disPrice;
        this.state.data[obj.index].addition_no_price = obj.price;
        this.state.data[obj.index].json = obj.json;
        this.setState({data:this.state.data})
    }
    showPrice(e) {this.setState({show:7,currentIndex:e.target.parentNode.dataset.index})}
    updatePrice(value) {
        this.state.data[this.state.currentIndex].raw_price = value;
        this.state.data.setByIntersection({parent:this.state.data[this.state.currentIndex].DATATAG},{raw_price:value});
        this.setState({show:0, data:this.state.data});
    }
    showUpdatePrice(e) {this.setState({show:12,currentIndex:e.target.parentNode.dataset.index})}
    setUser(obj) {
        obj.show = 0;
        console.log(obj);
        this.setState(obj);
    }
    print(object) {
        object = object || {};
        /*
            sn:订单编号;items:项目json字符串;total:总金额;dis_amount:可折金额;amount:不可折金额;gateway:支付方式;discount:折扣;real_amount:折后价;
            reduce:优惠;reduce_cause:优惠原因;coupon:现金券;coupon_name:现金券名称;
            pay_amount:实收;change:找零;debt:欠款;
            number:卡号;balance:余额;
            name:客户姓名;phone:客户电话;time:取衣时间;addr:店铺地址;mphone:店铺电话;ad:店铺广告;
        */
        let total = 0    //总金额
        ,   amount = 0    //折后金额
        ,   dis_amount = 0
        ,   no_dis_amount = 0
        ,   discount = '' == this.state.discount ? 100 : this.state.discount;
        this.state.data.map(obj => {
            total = total.add(obj.raw_price, obj.addition_no_price, obj.addition_price);
            amount = amount.add( 
                (1 == obj.has_discount ? (Math.floor(obj.raw_price * discount) / 100) : obj.raw_price), 
                obj.addition_no_price, 
                (Math.floor(obj.addition_price * discount) / 100)
            );
            dis_amount = dis_amount.add((1 == obj.has_discount ? obj.raw_price : 0), obj.addition_price);
            no_dis_amount = no_dis_amount.add((1 == obj.has_discount ? 0 : obj.raw_price), obj.addition_no_price);
        });
        let gateway = object.gateway
        ,   balance = this.state.balance;
        if ('undefined' !== typeof gateway) {
            if (0 == gateway) {
                gateway = '会员卡支付';
                if (!isNaN(balance)) balance = balance.subtract(object.pay_amount);
            } else if (1 == gateway) {
                gateway = '现金支付';
            } else if (2 == gateway) {
                gateway = '微信支付';
            } else {
                gateway = '支付宝支付';
            }
        } else {
            gateway = '未付款';
        }
        var limit = false;
        EventApi.print(
            'order', 
            {
                sn:this.state.sn,
                items:JSON.stringify(this.state.data),
                put_codes:JSON.stringify(this.state.code_arr),
                total:total,
                uaddr:this.state.addr,
                dis_amount:dis_amount,
                amount:no_dis_amount,
                discount: discount,
                real_amount:amount,
                name:this.state.name,
                phone:this.state.phone,
                time:this.state.time,
                addr:this.state.maddr,
                mphone:this.state.mphone,
                ad:this.state.ad,
                number:this.state.number,
                balance:balance,
                pay_amount:object.pay_amount,
                change:object.change,
                gateway:gateway,
                debt:('undefined' !== typeof object.pay_amount && 0 != object.pay_amount ? object.debt : total)
            }, 
            'printer'.getData(),
            () => {
                tool.ui.success({msg:'本页已打印完成，请撕纸', callback:close => {
                    if (limit) return;
                    limit = true;
                    EventApi.print(
                        'order2', 
                        {
                            sn:this.state.sn,
                            items:JSON.stringify(this.state.data),
                            put_codes:JSON.stringify(this.state.code_arr),
                            total:total,
                            uaddr:this.state.addr,
                            dis_amount:dis_amount,
                            amount:no_dis_amount,
                            discount: discount,
                            real_amount:amount,
                            name:this.state.name,
                            phone:this.state.phone,
                            time:this.state.time,
                            addr:this.state.maddr,
                            mphone:this.state.mphone,
                            ad:this.state.ad,
                            number:this.state.number,
                            balance:balance,
                            pay_amount:object.pay_amount,
                            change:object.change,
                            gateway:gateway,
                            debt:('undefined' !== typeof object.pay_amount && 0 != object.pay_amount ? object.debt : total)
                        }, 
                        'printer'.getData()
                    );
                    close();
                }});
            }
        );
        let printer = 'clean_tag_printer'.getData();
        if (printer) {
            let code_arr = this.state.code_arr
            ,   len = code_arr.length;
            for (let i = 0;i < len;++i) {
                EventApi.print('code2', {
                    logo_name:'mname'.getData(), // 衣物店的名称
                    sn:code_arr[i].clothing_number,  //衣物编码
                    name:code_arr[i].clothing_name,
                    color:code_arr[i].clothing_color,
                    service:'',
                    reark:code_arr[i].remark,
                    forecast:code_arr[i].forecast,
                    number:code_arr[i].grid_num, // 衣挂号
                    time:code_arr[i].deal_time, // 取衣时间
                    user_name:this.state.name,
                    tell:this.state.phone,
                }, printer);
                // EventApi.print('code', {
                //     sn:this.state.code_arr[i].clothing_number, 
                //     name:this.state.code_arr[i].clothing_name, 
                //     color:this.state.code_arr[i].clothing_color,
                //     number:this.state.code_arr[i].grid_num
                // }, printer);
            }
        }
    }
    cost() {
        let len = this.state.data.length;
        if (len < 1) return  tool.ui.error({msg:'请添加洗衣项目',callback:close => close()});
        let data = tool.clone(this.state.data)
        ,   pay_amount = 0
        ,   amount = 0
        ,   craft_price = 0
        for (let i = 0;i < len;++i) {
            data[i].raw_price = data[i].raw_price || 0;
            pay_amount = pay_amount.add(data[i].raw_price, data[i].addition_price, data[i].addition_no_price);
            amount = amount.add(data[i].raw_price);
            craft_price = craft_price.add(data[i].addition_price, data[i].addition_no_price);
            data[i].user_name = this.state.name;
            data[i].user_mobile = this.state.phone;
            data[i].card_type = this.state.type;
            data[i].address = this.state.addr;
            data[i].card_number = this.state.number;
            delete data[i].DATATAG;
            delete data[i].parent;
        }
        console.log(this.props);
        
        console.log({token:token, is_online:1, order_id:this.state.oid, uid:this.state.cid || '', user_id:this.state.uid, amount:amount, craft_price:craft_price, discount:this.state.discount, items:JSON.stringify(data)});
        api.post(
            'get_clothes',
            {token:token, is_online:1, order_id:this.state.oid, uid:this.state.cid || '', user_id:this.state.uid, amount:amount, craft_price:craft_price, discount:this.state.discount, items:JSON.stringify(data)},
            (res, ver, handle) => {
                if (ver) {
                    this.props.closeView();
                    // this.setState({
                    //     oid:res.result.order_id, 
                    //     sn:res.result.ordersn, 
                    //     mphone:res.result.merchant.phone_number, 
                    //     maddr:res.result.merchant.maddress,
                    //     ad:res.result.merchant.mdesc,
                    //     code_arr:res.result.orderItemInfo
                    // });
                    // if ('boolean' === typeof isTake && isTake) {
                    //     this.print();
                    //     return this.props.closeView();
                    // }
                    // this.setState({show:14});
                } else {
                    handle();
                }
            }
        );
        
    }
    paymentCallback(obj) {
        if (null == this.state.oid) return;
        let cid = this.state.payCard.id || this.state.cid;
        if (0 == obj.gateway && null == cid) return tool.ui.error({msg:'会员不存在！',callback:close => close()});
        let loadingEnd;
        tool.ui.loading(handle => loadingEnd = handle);
        api.post(
            'orderPay', 
            {token:token,gateway:obj.gateway,pay_amount:obj.amount,authcode:obj.authcode || '', cid:cid || '', oid:this.state.oid, passwd:obj.passwd || ''},
            (res, ver, handle) => {
                console.log(res);
                loadingEnd();
                if (ver) {
                    this.print({change:obj.change, debt:0, pay_amount:obj.pay_amount, gateway:obj.gateway});
                    tool.ui.success({callback:close => {
                        close();
                        this.props.closeView();
                    }}); 
                } else {
                    handle();
                }
            },
            () => loadingEnd()
        );
    }
    paymentClose() {
        this.setState({payCard:{},show:0});
    }
    handleClose() {this.setState({show:0, update:false})}
    handleCancel() {this.setState({show:1})}
    onClose() {
        if (this.state.data.length > 0) {
            tool.ui.warn({msg:'还有衣物没有处理，是否退出', button:['是（Y）', '否（N）'],callback:(close, event) => {
                '是（Y）' == event && this.props.closeView();
                close();
            }});
        } else {
            this.props.closeView();
        }
    }


    render() {
        let total = 0    //总金额
        ,   amount = 0    //折后金额
        ,   dis_amount = 0
        ,   no_dis_amount = 0
        ,   discount = this.state.payCard.discount || ('' == this.state.discount ? 100 : this.state.discount)
        ,   tempDiscount
        ,   html = this.state.data.map((obj, index) => {
            tempDiscount = obj.min_discount;
            if (tempDiscount > 100) tempDiscount = 100;
            if (discount > tempDiscount) tempDiscount = discount;
            
            let count = this.state.data.keyValCount('parent', obj.DATATAG)
            ,   total_craft = tool.arrObjValsSum(this.state.data, ['addition_no_price', 'addition_price'], {parent:obj.DATATAG});
            total = total.add(obj.raw_price, obj.addition_no_price, obj.addition_price);
            amount = amount.add( 
                (1 == obj.has_discount ? (Math.floor(obj.raw_price * tempDiscount) / 100) : obj.raw_price), 
                obj.addition_no_price, 
                (Math.floor(obj.addition_price * tempDiscount) / 100)
            );
            dis_amount = dis_amount.add((1 == obj.has_discount ? obj.raw_price : 0), obj.addition_price);
            no_dis_amount = no_dis_amount.add((1 == obj.has_discount ? 0 : obj.raw_price), obj.addition_no_price);
            return (
                <div key={'data' + index} data-index={index} style={obj.parent ? {display:'none'} : null}>
                    <div onClick={this.showCode}>{obj.clothing_number}</div>
                    <div onClick={this.showItem}>{obj.clothing_name}</div>
                    <div onClick={this.showColor}>{obj.clothing_color}</div>
                    {/* <div onClick={this.showProblem}>{obj.remark}</div> */}
                    <div onClick={this.showBrand}>{obj.sign}</div>
                    <div onClick={this.showForcast}>{obj.forecast}</div>
                    <div onClick={this.showPrice}>{obj.addition_price.add(obj.addition_no_price, total_craft).toFixed(2)}</div>
                    <div onClick={this.showUpdatePrice}>{parseFloat(obj.raw_price).toFixed(2)}</div>
                    <div><MathUI param={index} onAdd={this.clone} onSub={this.destory}>{count + 1}</MathUI></div>
                    <div>
                        <span onClick={this.copy}>复制</span>
                        &emsp;
                        <span onClick={this.del}>删除</span>
                    </div>
                </div>
            );
        });
        return (
            <Window title='收衣' onClose={this.onClose}>
                <div className='clothes-header' style={{top:'0'}}>
                    <div>衣物编码</div><div>衣物名称</div><div>颜色</div>{/*<div>瑕疵</div>*/}<div>品牌</div>
                    <div>洗后预估</div><div>工艺加价</div><div>单价</div><div>数量</div><div>操作</div>
                </div>
                <div className='clothes-container' style={{paddingTop:'40px'}}>
                    <div>
                        <div className='clothes-body'>{html}</div>
                        <div style={{padding:'10px 20px'}}><button type='button' className='e-btn larger' onClick={() => this.setState({show:1})}>添加衣物</button></div>
                    </div>
                </div>
                <div className='clothes-footer'>
                    <div className='clothes-footer-left'>
                        <div>
                            <div>总件数：{this.state.data.length}件</div>
                            <div>总金额：&yen;{total.toFixed(2)}</div>
                            <div style={{color:'red'}}>折后价：&yen;{amount.toFixed(2)}</div>
                        </div>
                        <div>
                            <div>卡余额：&yen;{this.state.balance || '0.00'}</div>
                            <div>折扣率：{discount}%</div>
                            <div>取衣时间：<input type="date" min={this.date} className="e-date" value={this.state.time} onChange={e => this.setState({time:e.target.value})}/></div>
                        </div>
                    </div>
                    <div className='clothes-footer-right'>
                        <div style={{lineHeight:'82px'}}>
                            <button type='button' className='e-btn larger' data-take='take' onClick={this.cost} >提交订单</button>
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
                        min_price={this.state.data[this.state.currentIndex].min_transfer}
                        discount={this.state.data[this.state.currentIndex].min_discount}
                    />
                }
                {
                    13 === this.state.show
                    &&
                    <Deduct 
                        onClose={this.handleClose} 
                        callback={this.handleClose} 
                        cid={this.state.cid} 
                        number={this.state.number} 
                        name={this.state.name} 
                        phone={this.state.phone} 
                        balance={this.state.balance}
                    />
                }
                {
                    14 === this.state.show
                    &&
                    <Payment 
                        onClose={this.paymentClose}
                        data={{
                            total_amount:total,
                            dis_amount:dis_amount,
                            amount:no_dis_amount,
                            discount:(this.state.payCard.discount || this.state.discount || 100),
                            pay_amount:amount,
                            balance:(this.state.payCard.balance || this.state.balance || 0),
                            type:(this.state.payCard.card_name || this.state.type),
                            number:(this.state.payCard.recharge_number || this.state.number)
                        }}
                        M1Read={this.PAYM1read}
                        callback={this.paymentCallback}
                    />
                }
                {
                    15 === this.state.show
                    &&
                    <User
                        onClose={this.handleClose} 
                        name={this.state.name} 
                        number={this.state.number} 
                        phone={this.state.phone} 
                        callback={this.setUser}
                    />
                }
                {
                    16 === this.state.show
                    &&
                    <Code onClose={this.handleClose} data={this.state.data} currentIndex={this.state.currentIndex} callback={this.setCode}/>
                }
                {
                    17 === this.state.show
                    &&
                    <Recharge closeView={this.handleClose} card={this.state.card}/>
                }
            </Window>
        );
    }
}