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
import CardList from './CardList';
import './App.css';

const token = 'token'.getData()
,     page = 1
,     limit = 10000;
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oid:null,uid:'',phone:'',name:'',number:'',cid:null,addr:'',time:'',type:'',balance:0,discount:'',consume:0,    //type:卡类型
            mphone:'',maddr:'', ad:'',sn:'',code_arr:[],
            cardList:[],
            category:[],item:[],brand:[],color:[],problem:[],forecast:[],price:[],
            show:0, categoryIndex:0,currentIndex:0,    
            data:[],    //本地存储数据
            card:{},    //卡数据
            payCard:{},
            update:false,    //用于判断衣物为添加还是修改
            calculate:2,    //计算方式
        };
        this.date = tool.date('Y-m-d');
        this.DATACODE = tool.code();
        this.counter = 1;    //编码累加计数属性
        this.M1read = this.M1read.bind(this);    //读卡
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
        this.tempUser = this.tempUser.bind(this);    //展示用户信息填写
        this.setUser = this.setUser.bind(this);    //设置用户信息
        this.del = this.del.bind(this);    //项目删除方法
        this.copy = this.copy.bind(this);    //项目复制
        this.paymentCallback = this.paymentCallback.bind(this);    //订单支付回调
        this.print = this.print.bind(this);
        this.handlePrinter = this.handlePrinter.bind(this);
        this.paymentClose = this.paymentClose.bind(this);
        this.delOrder = this.delOrder.bind(this);
        this.takeCost = this.takeCost.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    componentDidMount() {
        tool.KeyCode.listenEnter(this.phoneInput, this.tempUser);
        tool.KeyCode.listenEnter(this.nameInput, this.tempUser);
        tool.KeyCode.listenEnter(this.numberInput, this.tempUser);
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
        api.post('calculate', {token:token}, (res, ver, handle) => {    //获取洗后预估列表
            if (ver) {
                this.setState({calculate:res.result.money_type});
            } else {handle()}
        });
    }
    //价格计算方式
    calculate(value) {
        if (0 == this.state.calculate) {
            return Math.floor(value);
        } else if (1 == this.state.calculate) {
            return Math.round(value * 10) / 10;
        } else if (2 == this.state.calculate) {
            return value;
        } else {
            return value;
        }
    }

    M1read(value) {
        let obj = {};
        if ('string' === typeof value && '' != value) {
            obj.number = value;
        }
        obj.callback = (res) => {
            this.setState({
                number:res.recharge_number,
                cid:res.id,
                phone:res.user_mobile,
                name:res.user_name,
                balance:res.balance,
                type:res.card_name,
                discount:res.discount,
                addr:res.address,
                consume:res.consume || 0,
                card:res
            });
        }
        EventApi.M1Read(obj);
    }
    PAYM1read(value) {
        let obj = {};
        if ('string' === typeof value && '' != value) {
            obj.number = value;
        }
        obj.callback = (res) => {
            if (res.cardList.length > 1) {
                this.setState({cardList:res.cardList});
            } else {
                this.setState({payCard:res});
            }
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
            this.state.data[this.state.currentIndex].raw_price = item.item_off_price;
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
                    raw_price:item.item_off_price, 
                    deal_time:day, 
                    min_discount:item.min_discount,
                    has_discount:item.has_discount,
                    transfer:item.transfer,
                    min_transfer:item.min_transfer
                }
            );
        } else {
            let timeCode = (this.DATACODE + this.counter)
            ,   data = {
                DATATAG:timeCode,
                clothing_number: timeCode, 
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
            let timeCode = (this.DATACODE + this.counter)
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
        data.clothing_number = (this.DATACODE + this.counter);
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
        ,   timeCode = (this.DATACODE + this.counter);
        item.DATATAG = timeCode;
        item.clothing_number = timeCode;
        item.parent = null;
        ++this.counter;
        this.state.data.push(item);
        this.setState({data:this.state.data});
    }
    setCode(data){
        this.setState({data:data,show:0});
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
        ,   discount = this.state.payCard.discount || this.state.discount || 100;
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
        amount = this.calculate(amount);
        let gateway = object.gateway
        ,   balance = this.state.payCard.balance || this.state.balance;
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
        let param = {
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
            number:this.state.payCard.recharge_number || this.state.number,
            balance:balance,
            pay_amount:object.pay_amount,
            change:object.change,
            gateway:gateway,
            debt:('undefined' !== typeof object.pay_amount && 0 != object.pay_amount ? object.debt : total)
        };
        this.handlePrinter(param);
        let printer = 'clean_tag_printer'.getData();
        if (printer) {
            let code_arr = this.state.code_arr
            ,   len = code_arr.length;
            for (let i = 0;i < len;++i) {
                console.log({
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
                });
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
    handlePrinter(param) {
        var limit = false;
        EventApi.print('order2', param, 'printer'.getData(), () => {
            tool.ui.success({msg:'本页已打印完成，请撕纸', button:['再次打印', '确认'], callback:(close, event) => {
                if (limit) return;
                console.log(event);
                limit = true;
                //EventApi.print('order2', param, 'printer'.getData());
                if (0 == event) {
                    this.handlePrinter(param);
                }
                close();
            }});
        }
    );
    }
    takeCost() {
        if ('' == this.state.name) return tool.ui.error({msg:'姓名不能为空',callback:close => close()});
        if ('' == this.state.phone) return tool.ui.error({msg:'手机不能为空',callback:close => close()});
        if (this.state.data.length < 1) return  tool.ui.error({msg:'请添加洗衣项目',callback:close => close()});
        tool.ui.warn({msg:'您确定客户取衣付款吗？', button:['是（Y）', '否（N）'],callback:(close, event) => {
            0 == event && this.cost(true);
            close();
        }});
    }
    cost(isTake) {
    /*"user_name": "姓名",
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
    "address":住址 */
    //uid:'',phone:'',name:'',number:'',addr:'',time:'',type:'',balance:0,discount:'',    //type:卡类型
        if ('' == this.state.name) return tool.ui.error({msg:'姓名不能为空',callback:close => close()});
        if ('' == this.state.phone) return tool.ui.error({msg:'手机不能为空',callback:close => close()});
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
        api.post(
            'get_clothes',
            {token:token, uid:this.state.cid || '', amount:amount, craft_price:craft_price, discount:this.state.discount, items:JSON.stringify(data)},
            (res, ver, handle) => {
                console.log(res);
                if (ver) {
                    this.setState({
                        oid:res.result.order_id, 
                        sn:res.result.ordersn, 
                        mphone:res.result.merchant.phone_number, 
                        maddr:res.result.merchant.maddress,
                        ad:res.result.merchant.mdesc,
                        code_arr:res.result.orderItemInfo
                    });
                    if ('boolean' === typeof isTake && isTake) {
                        this.print();
                        return this.props.closeView();
                    }
                    this.setState({show:14});
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
                if (ver) {
                    this.print({change:obj.change, debt:0, pay_amount:obj.pay_amount, gateway:obj.gateway});
                    tool.ui.success({callback:close => {
                        close();
                        this.props.closeView();
                    }}); 
                } else {
                    handle();
                }
                loadingEnd();
            },
            () => loadingEnd()
        );
    }
    paymentClose() {
        this.setState({payCard:{}});
        this.delOrder(() => this.setState({oid:null, show:0}));
    }
    handleClose() {this.setState({show:0, update:false})}
    handleCancel() {this.setState({show:1})}
    tempUser() {
        if ('' === this.state.number && '' === this.state.phone && '' === this.state.name) return;
        this.setState({show:15});
    }
    onClose() {
        if (this.state.data.length > 0) {
            tool.ui.warn({msg:'还有衣物没有处理，是否退出', button:['是（Y）', '否（N）'],callback:(close, event) => {
                0 == event && this.delOrder(this.props.closeView);
                close();
            }});
        } else {
            this.delOrder(this.props.closeView);
        }
    }

    delOrder(callback) {
        if (null != this.state.oid) {
            api.post('del_order', {token:token, order_id:this.state.oid});
        }
        'function' === typeof callback && callback();
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
                    <div onClick={this.showProblem}>{obj.remark}</div>
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
        amount = this.calculate(amount);
        return (
            <Window title='收衣' onClose={this.onClose}>
                <div className='clothes-user'>
                    <b>*</b>手机：
                    <input 
                        type='text' 
                        className='e-input' 
                        ref={input => this.phoneInput = input}
                        style={{width:'100px'}} 
                        value={this.state.phone} 
                        onChange={e => this.setState({phone:e.target.value,cid:null,balance:0,discount:100,type:''})}
                    />
                    <b>*</b>姓名：
                    <input 
                        type='text' 
                        className='e-input' 
                        ref={input => this.nameInput = input}
                        style={{width:'100px'}} 
                        value={this.state.name} 
                        onChange={e => this.setState({name:e.target.value,cid:null,balance:0,discount:100,type:''})}
                    />
                    卡号：
                    <input 
                        type='text' 
                        className='e-input' 
                        ref={input => this.numberInput = input}
                        style={{width:'100px'}} 
                        value={this.state.number} 
                        onChange={e => this.setState({number:e.target.value,cid:null,balance:0,discount:100,type:''})}
                    />
                    地址：<input type='text' className='e-input' style={{width:'160px'}} value={this.state.addr} onChange={e => this.setState({addr:e.target.value,cid:null,balance:0,discount:100,type:''})}/>
                    <button type='button' className='e-btn' onClick={this.tempUser}>查询</button>
                    &emsp;
                    <button type='button' className='e-btn' onClick={this.M1read}>读卡</button>
                </div>
                <div className='clothes-header'>
                    <div><b>*</b>衣物编码</div><div><b>*</b>衣物名称</div><div>颜色</div><div>瑕疵</div><div>品牌</div>
                    <div>洗后预估</div><div>工艺加价</div><div><b>*</b>单价</div><div><b>*</b>数量</div><div>操作</div>
                </div>
                <div className='clothes-body'>{html}</div>
                <div style={{padding:'10px 20px'}}><button type='button' className='e-btn' onClick={() => this.setState({show:1})}>添加衣物</button></div>
                <div className='clothes-footer'>
                    <div className='clothes-footer-left'>
                        <div>
                            <div>总件数：{this.state.data.length}件</div>
                            <div>总金额：&yen;{total.toFixed(2)}</div>
                            <div style={{fontSize:'14px',color:'red',minWidth:'120px'}}>折后价：&yen;{amount.toFixed(2)}</div>
                            <div>已消费总额：&yen;{this.state.consume}</div>
                        </div>
                        <div>
                            <div>卡余额：&yen;{this.state.balance || '0.00'}</div>
                            <div>折扣率：{discount}%</div>
                            <div><b>*</b>取衣时间：<input type="date" min={this.date} className="ui-date" value={this.state.time} onChange={e => this.setState({time:e.target.value})}/></div>
                        </div>
                    </div>
                    <div className='clothes-footer-right'>
                        <div>
                            <button type='button' className='e-btn middle high' onClick={this.cost}>收银</button>
                            <button type='button' className='e-btn middle high' data-take='take' onClick={this.takeCost}>取衣付款</button>
                        </div>
                        <div>
                            <button type='button' className='e-btn' onClick={this.props.changeView} data-event='open_case'>开钱箱</button>
                            <button type='button' className='e-btn' onClick={() => this.setState({show:17})}>充值</button>
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
                    <Item onClose={this.handleClose} category={this.state.category[this.state.categoryIndex].name} onCancel={this.handleCancel} data={this.state.item[this.state.categoryIndex]} callback={this.add}/>
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
                        calculate={this.calculate}
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
                {this.state.cardList.length > 1 && <CardList data={this.state.cardList} onClose={() => this.setState({cardList:[]})} callback={obj => this.setState({payCard:obj,cardList:[]})}/>}
            </Window>
        );
    }
}