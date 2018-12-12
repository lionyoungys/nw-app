/**
 * 退卡界面
 * @author fanyerong
 * 
 */
import React from 'react';
import Window from '../../UI/Window';
import CardList from '../Clothes/CardList';
import './ReturnCard.css';
const token = 'token'.getData();
const shopname = 'mname'.getData();

export default class extends React.Component {
    constructor(props) {
        super(props);
        let card = this.props.card || {};
        this.state = {
            shop:'',
            returnmoney:0,
            //cardnumber:'',
           //  card_number:'',
           // user_type:card_name,
            passwd1:'',
            passwd2:'',
            cid: card.id || '',    //卡编号id
            user_mobile: card.user_mobile || '',    //电话
            user_name: card.user_name || '',    //姓名
            sex: card.sex || '',    //性别
            birthday: card.birthday || '',    //生日
            address: card.address || '',    //地址
            integrals: card.integral,    //积分
            balance: card.balance || '',    //余额
            recharge_number: card.recharge_number || '',    //卡号
            card_name:card.card_name || '',    //卡类型
            discount: card.discount || '',    //折扣
            time: card.time || '',    //售卡日期  
            mname:card.mname,   // 发卡店
            give_price:card.give_price , // 赠送金额
           // cardnumber:card.recharge_number
           shop:card.shop,
           card_number:card.card_number,
           cardList:[],
        }  ; 
        this.M1Read = this.M1Read.bind(this);  
        this.returncard = this.returncard.bind(this);                        
    }  
    componentDidMount() {this.input.focus();}
    M1Read(e) {
        let obj = {};
        if (e.target.dataset.query) {
            if ('' == this.state.recharge_number) return tool.ui.error({msg:'请输入卡号',callback:close => close()});
            obj.number = this.state.recharge_number;
        }
        console.log(obj)
        obj.callback = (res) => { 
            if(res.cardList.length > 1){
                this.setState({cardList:res.cardList});
            }else{
                this.setState({
                    cid:res.id,
                    user_mobile:res.user_mobile,
                    user_name:res.user_name,
                    sex:res.sex,
                    birthday:res.birthday,
                    balance:res.balance,
                    integrals:res.integral,
                    card_name:res.card_name,
                    discount:res.discount,
                    time:res.time,
                    recharge_number:res.recharge_number,
                    address:res.address,
                    mname:res.mname,  
                    give_price:res.give_price,  
                    shop:shopname ,
                    card_number:res.recharge_number,        
                });
            }                                              
        }
        EventApi.M1Read(obj);
    }
    returncard (){
        console.log(this.state.recharge_number)
        api.post('return_card', {           
            token:'token'.getData(),
            card_id:this.state.cid,
            money:this.state.returnmoney
        }, (res, ver) => {
            console.log(res)
            if (ver && res) {
                tool.ui.success({callback:(close, event) => {
                    close();
                    this.setState({
                        cid:'',
                        card_number:'',
                        card_name:'',
                        user_name:'',
                        shop:'',
                        user_mobile:'',
                        time:'',
                        sex:'',
                        integrals:'',
                        birthday:'',
                        address:'',
                        give_price:"",
                        discount:'0.00',
                        balance:'',
                        returnmoney:'',
                        recharge_number:''
                    })                   
                }}); 
            }else{
                tool.ui.error({title:'提示',msg:res.msg,button:'确定',callback:(close, event) => {
                    close();
                }});
            }
        });
    }
    render() {
        return (
            <Window title='退卡' onClose={this.props.closeView} width='632' height='430'>
                <div className='recharge recharge-first'>
                    <div>
                        <label htmlFor='card_id' className='e-label'>卡号/手机号：</label>
                        <input id='card_id' className='e-input' type='text' value={this.state.recharge_number} onChange={e => this.setState({recharge_number:e.target.value})} ref={input=>this.input=input}/>&nbsp;
                        <button type='button' className='e-btn' data-query='1' onClick={this.M1Read}>查询</button>&nbsp;
                        <button type='button' className='e-btn' onClick={this.M1Read}>读卡</button>
                    </div>
                    <div><label className='e-label'>卡ID：{this.state.cid}</label></div>
                </div>
                <div className='recharge recharge-second return-div'>
                    <div>
                        <label className='e-label'>卡号：</label><div>{this.state.card_number}</div>
                        <label className='e-label'>&emsp;卡类型：</label><div>{this.state.card_name}</div>
                    </div>
                    <div>
                        <label className='e-label'>姓名：</label><div>{this.state.user_name}</div>
                        <label className='e-label'>&emsp;发卡店：</label><div>{this.state.shop}</div>
                    </div>
                    <div>
                        <label className='e-label'>电话：</label><div>{this.state.user_mobile}</div>
                        <label className='e-label'>售卡日期：</label><div>{this.state.time}</div>
                    </div>
                    <div>
                        <label className='e-label'>性别：</label><div>{this.state.sex}</div>
                        <label className='e-label'>&emsp;&emsp;积分：</label><div>{this.state.integrals}</div>
                    </div>
                    <div>
                        <label className='e-label'>生日：</label><div>{this.state.birthday}</div>
                        <label className='e-label'>&emsp;&emsp;地址：</label><div>{this.state.address}</div>
                    </div>                   
                </div>
                <div className='recharge recharge-third' id="return_recharge-third">
                    <div id="recharge-third-div" id="return_recharge-third-div">                       
                        <div><label className='e-label'>&emsp;&emsp;&emsp;赠送：</label>&yen;{this.state.give_price}</div>
                        <div><label className='e-label'>&emsp;&emsp;新折扣：</label>{this.state.discount}%</div>
                        <div><label className='e-label' style={{color: '#ff0000', fontSize: '14px', fontWeight: 'bold',}}>&emsp;&emsp;&emsp;余额：&yen;{this.state.balance}</label></div>
                    </div> 
                    <div className="recharge-four"  id="return_four">
                        <span style={{color:'#063781', fontSize: '14px', fontWeight: 'bold',marginTop:'10px',display:'block'}} >退款金额：</span>
                        <input type="number" className="e-input" style={{marginTop:'10px'}} value={this.state.returnmoney} onChange={e=>this.setState({returnmoney:e.target.value})}/>&emsp;元
                        <button type='button' className='e-btn recharge-btn' style={{marginLeft:'10px'}} onClick = {this.returncard}>退卡</button>
                    </div>                        
                </div> 
                {
                    this.state.cardList.length > 1 && <CardList data={this.state.cardList} onClose={() => this.setState({cardList:[]})} callback={obj => this.setState({
                        payCard:obj,
                        cardList:[],
                        cid:obj.id,
                        user_mobile:obj.user_mobile,
                        user_name:obj.user_name,
                        sex:obj.sex,
                        birthday:obj.birthday,
                        balance:obj.balance,
                        integrals:obj.integral,
                        card_name:obj.card_name,
                        discount:obj.discount,
                        time:obj.time,
                        recharge_number:obj.recharge_number,
                        address:obj.address,
                        mname:obj.mname,  
                        give_price:obj.give_price,  
                        shop:obj.shopname ,
                        card_number:obj.recharge_number,
                    })}/>
                }                       
            </Window>
        );
    }
}