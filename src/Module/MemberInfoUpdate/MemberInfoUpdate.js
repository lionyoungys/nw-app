/**
 * 会员信息修改界面组件
 * @author wang jun
 */
import React, {Component} from 'react';
import './MemberInfoUpdate.css';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
export default class extends Component {   
    constructor(props) {
        super(props);       
        this.state = {id:'',cardnumber:'',card_number:'',user_mobile:'',user_name:'',sex:'',birthday:'',address:'',user_type:''};    
        this.query = this.query.bind(this);
    }; 
    query(){
        console.log(this.state.cardnumber)
        api.post('readCard', {token:'token'.getData(),cardNumber:this.state.cardnumber}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({card_number:res.result[0].card_number,
                    user_mobile:res.result[0].user_mobile,
                    user_name:res.result[0].user_name,
                    sex:res.result[0].sex,
                    birthday:res.result[0].birthday,
                    address:res.result[0].address
                ,id:res.result[0].id,
                user_type:res.result[0].user_type
                });
            }
        }
        );
    }
    modCardInfo(){
        api.post('modCardInfo', {token:'token'.getData(),id:this.state.id,user_name:this.state.user_name,user_mobile:this.state.user_mobile,
        sex:this.state.sex,birthday:this.state.birthday,password:this.state.passwd,address:this.state.address,user_type:this.state.user_type
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                alert("保存成功");
            }
        }
        );
    }
    render() {
        return(
        <Window title='资料修改' width='634' height='388' onClose={this.props.closeView}>
        <div className="memberinfoupdate">
        <div className="recharge recharge-first">
            <div>
                        <label htmlFor='card_id' className='e-label'>卡号：</label>
                        <input id='card_id' className='e-input' type='text' value={this.state.cardnumber} onChange={e => this.setState({cardnumber:e.target.value})}/>&nbsp;
                        <button type='button' className='e-btn' onClick={this.query}>查询</button>&nbsp;
                        <button type='button' className='e-btn'>读卡</button>
            </div>
            <div><label className='e-label'>卡编号：</label>{this.state.card_number}</div>
            </div>
            <div className="memberinfoupdate_bottomborder">
            <div>
        <span className='memberinfoupdate_leftdirection'>
           <span>手机号:</span><input type='text' className='inputborder' value={this.state.user_mobile} onChange={e => this.setState({user_mobile:e.target.value})}/>
           </span>
           <span className='memberinfoupdate_rightdirection'>
           <span>密码1次:</span><input type='text' className='inputborder'/>
           </span>
        </div>
        <div>
        <span className='memberinfoupdate_leftdirection'>
           <span>姓名:</span><input type='text' className='inputborder' value={this.state.user_name} onChange={e => this.setState({user_name:e.target.value})}/>
        </span>
        <span className='memberinfoupdate_rightdirection'>
           <span>密码2次:</span><input type='text' className='inputborder'/>
           </span>
        </div>
        <div>
        <span className='memberinfoupdate_customerdirection'>
           <span>性别:</span><input type='text' className='inputselectborder' value={this.state.sex} onChange={e => this.setState({sex:e.target.value})}/>
        </span>
        <span className='memberinfoupdate_leftdirection'>
           <span>生日:</span><input type='date' className='inputselectborder' value={this.state.birthday} onChange={e => this.setState({birthday:e.target.value})}/>
        </span>
        <span className='memberinfoupdate_rightdirection'>
           <span>顾客单位:</span><input type='text' className='inputborder'/><img />
        </span>
        </div>
        <div>
        <span className='memberinfoupdate_longdirection'>
           <span>地址:</span><input type='text' className='inputlongborder' value={this.state.address} onChange={e => this.setState({address:e.target.value})}/>
        </span>
        </div>
       
        </div>
        <div>
            <div className='memberinfoupdate_button'>
                <button type='button' className='e-btn' onClick={this.props.closeView}>取消</button>
                <button type='button' className='e-btn' onClick={this.modCardInfo}>保存</button>
            </div>
        </div>
        </div>
        </Window>    
    );
    }
}