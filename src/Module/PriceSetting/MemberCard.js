/**
 * 会员卡
 * @author  ranchong
 */
import React, { Component } from 'react';
import './MemberCard.css'
import Window from '../../UI/Window';
import Dish from '../../UI/Dish'
import Page from '../../UI/Page'
import Table from '../../UI/Table'
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
        cardtypes:[],
        show:false,
        colorid:'',
        card_type:'',
        real_price:'',
        give_price:'',
        made_price:'',
        discount:'',
        index:0,
        id:'',
        page:1,
        count:1,
    }
        this.limit = 15;
        this.addMemberCardYes=this.addMemberCardYes.bind(this);
        this.delete=this.delete.bind(this);
        this.mod=this.mod.bind(this);
        this.updateMemberCardYes=this.updateMemberCardYes.bind(this);
    };   
    query(page) {
        page = page || this.state.page;
        api.post('cardType', {
            token:'token'.getData(),
            page: page, 
            limit: this.limit
        }, (res, ver,handle) => {
            if (ver && res) {
                console.log(res)
                this.setState({cardtypes:res.result.cardsType, count: res.result.count, page:page });
            }else{
                handle();
            }
        });
    }
    componentDidMount(){
        this.query();
    }
    delete(e){
        let index=e.target.dataset.write;
        this.setState({index:index,id:this.state.cardtypes[index].id});
        console.log(this.state.id);
        tool.ui.error({title:'提示',msg:'确定删除？',button:['确定'],callback:(close, event) => {
            if(event=='确定'){
                api.post('delCardType', {
                    token:'token'.getData(),
                    id:this.state.id
                }, (res, ver,handle) => {
                    console.log(res)   
                    handle(); 
                    close();
                    if (ver && res) {
                        this.componentDidMount();
                    }
                });
            }else{
                close();
            }
        }});
    }
    addMemberCardYes(){ 
        let msg = this.format();
        if (msg.length > 0) return tool.ui.error({ msg: msg, callback: (close) => close() });
        if ('' == this.state.card_type || '' == this.state.real_price || '' == this.state.give_price || '' == this.state.made_price || '' == this.state.discount) return;
        var prames = {
            token: 'token'.getData(),
            card_type: this.state.card_type,
            discount: this.state.discount,
            real_price: this.state.real_price,
            give_price: this.state.give_price,
            made_price: this.state.made_price
        }
        console.log('新增会员提交--' + prames);
        api.post('addCardType', prames, (res, ver,handle) => {
            if (ver && res) {
                console.log(res)
                this.setState({ show: false, card_type: '', discount: '', real_price:'',give_price:'',made_price:''})
                handle({msg:'新增会员成功！'});
                this.componentDidMount();
            } else{
                handle();
            }  
        });
     }
     format(){
        let msg = '';
        if(''==this.state.card_type){
            msg = '请输入卡类型';
        } else if ('' == this.state.real_price) {
            msg = '请输入充值金额';
        } else if ('' == this.state.give_price){
            msg = '请输入赠送金额';
        } else if ('' == this.state.made_price){ 
            msg = '请输入制卡费';
        } else if ('' == this.state.discount) {
            msg = '请输入折扣率';
        }
        return msg;
     }
    updateMemberCardYes(){ 
        let msg = this.format();
        if (msg.length > 0) return tool.ui.error({ msg: msg, callback: (close) => close() });
        var prames = {
            token: 'token'.getData(),
            id: this.state.id,
            card_type: this.state.card_type,
            discount: this.state.discount,
            real_price: this.state.real_price,
            give_price: this.state.give_price,
            made_price: this.state.made_price
        }
        console.log('编辑会员提交--' + prames);
        api.post('modCardType', prames, (res, ver ,handle) => {          
            if (ver && res) {
                console.log(res)  ;
                this.setState({show1:false});
                handle({ msg: '修改成功！' });
                this.componentDidMount();           
            }else{
                handle({msg:'修改失败！'});
            }            
        });
    }
    mod(e){
        let index=e.target.dataset.write;
        this.setState({
            show1:true,
            index:index,
            id:this.state.cardtypes[index].id,
            card_type:this.state.cardtypes[index].card_type,
            discount:this.state.cardtypes[index].discount,
            real_price:this.state.cardtypes[index].real_price,
            give_price:this.state.cardtypes[index].give_price,
            made_price:this.state.cardtypes[index].made_price
        });
    }
    render(){
        let cardtypes =this.state.cardtypes.map((item,index)=>
        <tr key={'item'+index}>
        <td>{item.card_type}</td>
        <td>{item.real_price}</td>
        <td>{item.give_price}</td>
        <td>{item.made_price}</td>
        <td>{item.discount}%</td>
        <td>  <span onClick={this.mod} data-write={index} className='e-blue'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;<span  onClick={this.delete} data-write={index} className='e-blue'>删除</span></td>
</tr>
    );
        return( 
        <div>
            <div className='membercard' >
                <div className="staff">
                    <button className="e-btn larger" onClick={e => this.setState({ show: true, card_type: '', real_price:'',give_price:'',made_price:'',discount:''})}>增加卡类型</button>
                </div>
                    <Table style={{height:'300px'}}>
                    <thead>
                        <tr><th>卡类型</th><th>充值金额</th><th>赠送金额</th><th>制卡费</th><th>折扣率</th><th>操作</th></tr>
                    </thead>
                    <tbody>
                        {cardtypes}
                    </tbody>
                    </Table>    
               {/* <div className="membercard-tab">
                  <table border='0' cellPadding="0" cellSpacing="0">
                      <thead>
                          <tr>
                              <th>卡类型</th>
                              <th>充值金额</th>
                              <th>赠送金额</th>
                              <th>制卡费</th>
                              <th>折扣率</th>
                              <th>操作</th>
                          </tr>
                      </thead>
                      <tbody>
                          {cardtypes}
                      </tbody>
                  </table> */}
                  <Page current={this.state.page} total={this.state.count} fetch={this.limit} callback={page => this.query(page)}/>
               {/* </div> */}
              
            </div>
            {
                        this.state.show
                        &&
                        <Dish title='增加卡类型' onClose={() => this.setState({show:false})} width="404" height='343'>
                            <div className="membercard-div">
                                <div><span><i>*</i>&nbsp;卡类型：</span><input type='text' className='e-input' value={this.state.card_type} onChange={e => this.setState({card_type:e.target.value})} maxLength="6"/></div>
                            <div><span><i>*</i>&nbsp;充值金额：</span><input type='number' className='e-input' value={this.state.real_price} onChange={e => this.setState({ real_price:e.target.value})}/>&nbsp;元</div>
                                <div><span><i>*</i>&nbsp;赠送金额：</span><input type='number'  className='e-input' value={this.state.give_price} onChange={e => this.setState({give_price:e.target.value})}/>&nbsp;元</div>
                                <div><span><i>*</i>&nbsp;制卡费：</span><input type='number' className='e-input'  value={this.state.made_price} onChange={e => this.setState({made_price:e.target.value})}/>&nbsp;元</div>
                                <div><span><i>*</i>&nbsp;折扣率：</span><input type='number' className='e-input' min="0" max="100" value={this.state.discount} onChange={e => this.setState({discount:e.target.value})}/>&nbsp;%</div>
                            </div>
                            <div className="membercard-footer">
                                <button onClick = {this.addMemberCardYes}>保 存</button>
                            </div>
                        </Dish>
            }
                {
                        this.state.show1
                        &&
                        <Dish title='编辑卡类型' onClose={() => this.setState({show1:false})} width="404" height='343'>
                            <div className="membercard-div">
                                <div><span><i>*</i>&nbsp;卡类型：</span><input type='text' className='e-input' value={this.state.card_type} onChange={e => this.setState({card_type:e.target.value})} maxLength="6"/></div>
                            <div><span><i>*</i>&nbsp;充值金额：</span><input type='number' className='e-input' value={this.state.real_price} onChange={e => this.setState({ real_price:e.target.value})}/>&nbsp;元</div>
                                <div><span><i>*</i>&nbsp;赠送金额：</span><input type='number'  className='e-input' value={this.state.give_price} onChange={e => this.setState({give_price:e.target.value})}/>&nbsp;元</div>
                                <div><span><i>*</i>&nbsp;制卡费：</span><input type='number' className='e-input'  value={this.state.made_price} onChange={e => this.setState({made_price:e.target.value})}/>&nbsp;元</div>
                                <div><span><i>*</i>&nbsp;折扣率：</span><input type='number' className='e-input' min="0" max="100" value={this.state.discount} onChange={e => this.setState({discount:e.target.value})}/>&nbsp;%</div>
                            </div>
                            <div className="membercard-footer">
                                <button onClick = {this.updateMemberCardYes}>保 存</button>
                            </div>
                        </Dish>
            }

            </div>
        );
    }

}