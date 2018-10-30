/**
 * 商品销售界面
 * @author  fanyerong&&ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import MathUI from '../../UI/MathUI';
import Pay from '../../UI/Payment';
import Deduct from '../Clothes/Deduct';
import Recharge from '../Recharge/App';
import './Commoditysales.css';

const token = 'token'.getData();
export default class extends Component {
    constructor(props) {
        super(props);  
        this.state={
            oid:null,
            card:{},
            index:0,
            list: [],//所有数据
            allComList: [],//所有商品的数组
            searchList: [],
            searchNum:'',//搜索的商品编号
            show:false,
            amount:'0',//总件数
            total:'0',//总金额
            disAmount:0,   //可折金额
            discount:'100%',//折扣率
            disTotal:'0',//折后总价
            rechargeShow:false,
            payShow:false,
            enterAble:true,//点击enter是否搜索
        };
        this.handleClick = this.handleClick.bind(this);
        this.query = this.query.bind(this);
        this.deleteYes = this.deleteYes.bind(this);
        this.add = this.add.bind(this);
        this.sub = this.sub.bind(this);   
        this.compute = this.compute.bind(this);   
        this.payment = this.payment.bind(this);    
        this.delOrder = this.delOrder.bind(this);  
        this.onClose = this.onClose.bind(this);
        this.M1read = this.M1read.bind(this);   
        this.paymentClose = this.paymentClose.bind(this); 
        this.paymentCallback = this.paymentCallback.bind(this);
        this.judgeEnterPress = this.judgeEnterPress.bind(this);
        this.searchBySN = this.searchBySN.bind(this);
        this.changeEnterAble = this.changeEnterAble.bind(this);
        this.blurWithMsg = this.blurWithMsg.bind(this);
    };
    //进入页面获取数据
    componentDidMount(){
        let done;
        tool.ui.loading(handle => done = handle);
        console.log('申请库存商品');
        api.post('goodsList', {
            token: 'token'.getData(),
            page: 1,
            limit: 1000,
        }, (res, ver, handle) => {
            console.log('申请数据');
            done();
            if (ver && res) {
                console.log(res)
                let arr = [];
                for (let index = 0; index < res.result.length; index++) {
                    // console.log(res.result[index].goods);
                    if (res.result[index].goods.length > 0) {
                       arr = arr.concat(res.result[index].goods);  
                    }  
                }
                //数据处理
                this.setState({ list: res.result, allComList: arr})
            } else {
                handle();
            }
        }, () => done());
    }
   
    query(e){
        var searchNum;
        let sel_index;
        var judgeIndex = true;
        console.log(typeof e);
        if ("object" === typeof e) {
            searchNum = e.target.dataset.id || e.target.parentNode.dataset.id;
            console.log('点击商品'+searchNum);
            sel_index = searchNum.inObjArray(this.state.allComList, 'id');
            judgeIndex = true;
        }else{
            searchNum = this.state.searchNum;
            console.log('搜索商品'+searchNum);
            this.setState({ searchNum: '' });
            if (searchNum.length == 0) return this.blurWithMsg('商品条码不能为空！');
            if (this.state.list.length == 0) return this.blurWithMsg('商品库存为空，需要刷新页面！');
            sel_index = searchNum.inObjArray(this.state.allComList, 'goods_number');
            judgeIndex = false;
        }
        if (sel_index == -1) return this.blurWithMsg('商品不在库中！');//没有在数组中
        //从大数组找出具体数据
        let search = this.state.allComList[sel_index];
        let handleList = this.state.searchList;
        let exit = false;
        if (handleList.length > 0) {
            if (judgeIndex) {//判断id
                for (let index = 0; index < handleList.length; index++) {
                    if (search.id == handleList[index].id) {
                        exit = true;
                        if (handleList[index].count * 1 + 1 > handleList[index].stock * 1) return this.blurWithMsg('库存不足！');
                        handleList[index].count += 1;
                        break;
                    }
                }
            }else{//判断条形码
                for (let index = 0; index < handleList.length; index++) {
                    if (search.goods_number == handleList[index].goods_number) {
                        exit = true;
                        if (handleList[index].count * 1 + 1 > handleList[index].stock * 1) return this.blurWithMsg('库存不足！');
                        handleList[index].count += 1;
                        break;
                    }
                }
            } 
        }
        if (!exit) {//不存在
            search.count = 1;
            handleList.push(search);
        }
        console.log('更新数据');
        
        this.setState({ searchList: handleList });
        this.compute();
    }
    //统一处理input失去焦点
    blurWithMsg(msg){
        this.input.blur();
        this.setState({ enterAble: false });
        tool.ui.hud({ msg: msg});
    }
    //判断点击enter键
    judgeEnterPress(e) {
        13 == (e.keyCode || e.which) && this.state.enterAble && this.query();
    }
    //修改enter搜索是否可用
    changeEnterAble() {
        this.setState({ enterAble: true });
    }
    //判断搜索
    searchBySN() {
        this.query();
    }
    //删除
    deleteYes(e){
        let index = e.target.dataset.index;
        let handleList = this.state.searchList;
        handleList.splice(index,1);
        this.setState({ searchList: handleList });
        this.compute();
        // console.log(this.state.searchList); 
    }
    //增加
    add(index) {
        if (this.state.searchList[index].count * 1 + 1 > this.state.searchList[index].stock * 1) return this.blurWithMsg('库存不足！'); 
        this.state.searchList[index].count +=1;
        this.setState({ searchList: this.state.searchList });
        this.compute();
        // console.log(this.state.searchList); 
    }
    //减少
    sub(index) {

        let count = this.state.searchList[index].count;
        if (count > 1) {
            this.state.searchList[index].count -=1; 
            this.setState({ searchList: this.state.searchList });
            this.compute();
        }
        // console.log(this.state.searchList);
    }
     
    //计算总件数 总金额
    compute(){

        if (this.state.searchList.length == 0) return this.setState({ amount: '0', total:'0', disTotal: '0' });;
        var count = this.state.searchList.addKeyInArray('count');
        var total = 0
        ,   disAmount = 0;
        for (let index = 0; index < this.state.searchList.length; index++) {
           total +=this.state.searchList[index].price * this.state.searchList[index].count;
           if (1 == this.state.searchList[index].has_discount) {
               disAmount = disAmount.add(this.state.searchList[index].price.multiply(this.state.searchList[index].count));
           }
        }
        var distotal = total * parseFloat(this.state.discount)/100;
        this.setState({ amount: count.toString(), total: total.toDecimal2(), disTotal: distotal.toDecimal2(), disAmount:disAmount});
    }
    handleClick (e){
        this.setState({index:e.target.dataset.index});
    }
    payment() {
        /*用户姓名[user_name],用户手机号[user_mobile],商品id[clothing_id],
        商品名称[cloting_name],商品类型[clothing_type],商品原价[raw_price],
        是否打折[has_discount],件数[work_number],卡类型[card_type],卡号[card_number],住址[address],) 如果某项值没有 则给成空 */
        let items = this.state.searchList
        ,   len = items.length;
        console.log(items);
        if (len < 1) return
        let data = [], j;
        for (let i = 0;i < len;++i) {
            if (items[i].count > 1) {
                for (j = 0;j < items[i].count;++j) {
                    data.push({
                        user_name:'',
                        user_mobile:'',
                        clothing_id:items[i].id,
                        cloting_name:items[i].name,
                        clothing_type:items[i].goods_type,
                        raw_price:items[i].price,
                        has_discount:items[i].has_discount,
                        work_number:1,
                        card_type:'',
                        card_number:'',
                        address:''
                    });
                }
            } else {
                data.push({
                    user_name:'',
                    user_mobile:'',
                    clothing_id:items[i].id,
                    cloting_name:items[i].name,
                    clothing_type:items[i].goods_type,
                    raw_price:items[i].price,
                    has_discount:items[i].has_discount,
                    work_number:1,
                    card_type:'',
                    card_number:'',
                    address:''
                });
            }
        }
        api.post('sellGoods', {token:token,amount:this.state.total,items:JSON.stringify(data)}, (res, ver, handle) => {
            if (ver) {
                this.setState({oid:res.result.order_id, payShow:true});
            } else {
                handle();
            }
        });
    }
    onClose() {this.delOrder(this.props.closeView);}

    delOrder(callback) {
        if (null != this.state.oid) {
            api.post('del_order', {token:token, order_id:this.state.oid});
        }
        'function' === typeof callback && callback();
    }
    M1read(value) {
        let obj = {};
        if ('string' === typeof value && '' != value) {
            obj.number = value;
        }
        obj.callback = (res) => {
            this.setState({card:res});
        }
        EventApi.M1Read(obj);
    }
    paymentClose() {
        this.delOrder(() => this.setState({oid:null, payShow:false, card:{}}));
    }
    paymentCallback(obj) {
        if (null == this.state.oid) return;
        let cid = this.state.card.id || null;
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
    render() {  
        let noDisAmount = this.state.total.subtract(this.state.disAmount)
        ,   discount = this.state.card.discount || 100
        ,   pay_amount = noDisAmount.add( (this.state.disAmount * discount / 100) );
        let tabs=this.state.list.map((item,index)=>
                <span key={'item'+index} data-index={index} 
                    className={this.state.index==index?'commoditysales-left-hover':null}
                    onClick={this.handleClick}
                >{item.name}</span>
        );  
        let itemList;
        if (
            'undefined' !== typeof this.state.list[this.state.index]
            &&
            'undefined' !== typeof this.state.list[this.state.index].goods
        ) {
            itemList = this.state.list[this.state.index].goods.map((item, index) =>
                <tr data-id={item.id} onClick={this.query} key={'item' + index}>
                    <td>{item.goods_number}</td>
                    <td>{item.name}</td>
                    <td>{item.has_discount == '1' ? '是' : '否'}</td>
                    <td>{item.stock}</td>
                    <td>{item.price}</td>
                </tr>
            );
        }  
        let searchList = this.state.searchList.map((item, index) =>
            <tr key={'item' + index}>
                <td>{item.goods_number}</td>
                <td>{item.name}</td>
                <td>{item.has_discount == '1' ? '是' : '否'}</td>
                <td>{item.price}</td>
                <td><MathUI  param={index} onSub={this.sub} onAdd={this.add}>{item.count}</MathUI ></td>
                <td data-index={index} onClick={this.deleteYes}>删除</td>
            </tr> 
        );         
        return (       
            <Window title='商品销售' onClose={this.onClose}>                
                <div className="commoditysales-div"> 
                    <div className="commoditysales-div-left">
                        <div className="commoditysales-left-title">商品分类</div>
                        <div className="commoditysales-left-count">
                             {tabs}
                        </div>
                    </div>
                    <div className="sale-right">
                            <div className="commoditysales-right-top">
                                <button className="e-btn commoditysales-right-btn" onClick={this.searchBySN}>查询</button>
                                <input type="text" className="commoditysales-right-text" autoFocus='autoFocus' ref={input => this.input = input} placeholder="请输入/扫描商品条码" value={this.state.searchNum} onFocus={this.changeEnterAble} onKeyPress={this.judgeEnterPress} onChange={e => this.setState({ searchNum: e.target.value })} />
                            </div>
                            <div className="commoditysales-div-right">                     
                                <div className="commoditysales-right-tab">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>商品条码</th>
                                                <th>商品名称</th>
                                                <th>允许折扣</th>
                                                <th>单价</th>
                                                <th>数量</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {searchList}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="commoditysales-footerdiv-left">                       
                                <table>
                                    <thead>
                                        <tr>
                                            <th>商品条码</th>
                                            <th>商品名称</th>
                                            <th>允许折扣</th>
                                            <th>库存</th>
                                            <th>单价</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemList}
                                    </tbody>
                                </table>
                            </div>  
                    </div> 
               </div>
               <div className="commoditysales-footerdiv">
                    <div className="commoditysales-footerdiv-right">
                        <div className="commoditysales-footerdiv-rightboth">总金额: ￥{this.state.total}</div>
                        <div className="commoditysales-footerdiv-rightboth">折扣率: {this.state.discount}</div>
                        <div className="commoditysales-footerdiv-rightboth">总件数: {parseInt(this.state.amount)}</div>
                        <div className="commoditysales-footerdiv-rightboth commoditysales-footerdiv-rightred">折后价: ￥{this.state.disTotal}</div>                    
                        <div className="commoditysales-footerdiv-rightboth-btndiv">
                            <button type='button' className='e-btn middle high' onClick={this.payment}>收款</button>
                            <button type='button' className='e-btn' onClick={this.props.changeView} data-event='open_case'>开钱箱</button>
                            <button type='button' className='e-btn' onClick={() => this.setState({ rechargeShow: true })}>充值</button>
                            <button type='button' className='e-btn' onClick={() => this.setState({ show: true })} >卡扣款</button>
                        </div>                 
                    </div>                           
               </div> 
                {this.state.show && <Deduct callback={() => this.setState({show: false})} onClose={() => this.setState({show:false})}/>}    
                {this.state.rechargeShow && <Recharge closeView={() => this.setState({rechargeShow:false})}/>}
                {/*  @param {object} data {total_amount:原价,dis_amount:可折金额,amount:不可折金额,discount:折扣率,pay_amount:折后价}
 * @param {function} M1Read 读卡方法
 * @param {function} query 卡号查询 回调参数:卡号
 * @param {function} callback 回调方法 回调参数:{gateway:gateway,amount:amount,pay_amount:pay_amount,passwd:passwd,[authcode:authcode]} */}
                {
                    this.state.payShow 
                    && 
                    <Pay 
                        onClose={this.paymentClose}
                        data={{
                            total_amount:this.state.total,
                            dis_amount:this.state.disAmount,
                            amount:noDisAmount,
                            discount:discount,
                            pay_amount:pay_amount,
                            balance:(this.state.card.balance || 0),
                            type:(this.state.card.card_name || ''),
                            number:(this.state.card.recharge_number || '')
                        }}
                        M1Read={this.M1read}
                        query={this.M1read}
                        callback={this.paymentCallback}
                    />
                }
            </Window>  
        );
    }
}
