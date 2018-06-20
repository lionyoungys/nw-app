/**
 * 会员卡
 * @author  ranchong
 */
import React, { Component } from 'react';
import './MemberCard.css'
import Window from '../../UI/Window';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={cardtypes:[],
        show:false,
        colorid:'',
        card_type:'',
        price:'',
        give_price:'',
        made_price:'',
        discount:'',
        index:0,
        id:''
    }
        this.addMemberCardYes=this.addMemberCardYes.bind(this);
        this.delete=this.delete.bind(this);
        this.mod=this.mod.bind(this);
        this.updateMemberCardYes=this.updateMemberCardYes.bind(this);
    };   
    componentDidMount(){
        api.post('cardType', {token:'token'.getData()}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({cardtypes:res.result});
            }
        }
        );
    }
    delete(e){
        let index=e.target.dataset.write;
        console.log(index);
        this.setState({index:index,id:this.state.cardtypes[index].id});
        tool.ui.error({title:'提示',msg:'将删除档次,档次上的衣物信息可能丢失',button:'确定',callback:(close, event) => {
            api.post('delGrade', {token:'token'.getData(),
            id:this.state.id
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res)
                    tool.ui.success({callback:(close, event) => {
                        close();
                    }}); 
                }else{
                    tool.ui.error({callback:(close, event) => {
                        close();
                    }});
                }
                close();
                this.componentDidMount();
            }
            );
        }});

    }
    addMemberCardYes(){ 
        this.format();
        api.post('addCardType', {
            token:'token'.getData(),
            card_type:this.state.card_type,
            discount:this.state.discount,
            price:this.state.price,
            give_price:this.state.give_price,
            made_price:this.state.made_price
        }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({show:false,card_type:'',discount:'',price:'',give_price:'',made_price:''})
                this.componentDidMount();
                
            }
        }
    
        );
     }
     format(){
        if(''==this.state.card_type)
        return tool.ui.error({msg:'请输入卡类型',callback:(close) =>close()}); 
        if(''==this.state.price)
        return tool.ui.error({msg:'请输入充值金额',callback:(close) =>close()}); 
        if(''==this.state.give_price)
        return tool.ui.error({msg:'请输入赠送金额',callback:(close) =>close()}); 
        if(''==this.state.made_price)
        return tool.ui.error({msg:'请输入制卡费',callback:(close) =>close()}); 
        if(''==this.state.discount)
        return tool.ui.error({msg:'请输入折扣率',callback:(close) => close()}); 
     }
    updateMemberCardYes(){   
        this.format();
        api.post('modCardType', {
            token:'token'.getData(),
            id:this.state.id,
            card_type:this.state.card_type,
            discount:this.state.discount,
            price:this.state.price,
            give_price:this.state.give_price,
            made_price:this.state.made_price
        }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({show:false})
            }else{
                console.log(res)
            }
        }
        );
    }
    mod(e){
        let index=e.target.dataset.write;
        this.setState({
            show1:true,
            index:index,
            id:this.state.cardtypes[index].id,
            card_type:this.state.cardtypes[index].card_type,
            discount:this.state.cardtypes[index].discount,
            price:this.state.cardtypes[index].price,
            give_price:this.state.cardtypes[index].give_price,
            made_price:this.state.cardtypes[index].made_price

        });
    }
    render(){
        let cardtypes =this.state.cardtypes.map((item,index)=>
        <tr key={item}>
        <td>{item.card_type}</td>
        <td>{item.price}</td>
        <td>{item.give_price}</td>
        <td>{item.made_price}</td>
        <td>{item.discount}</td>
        <td>  <b onClick={this.mod} data-write={index}>修改</b><i  onClick={this.delete} data-write={index}>删除</i></td>
      
</tr>
    );
        return( 
        <div>
            <div className="brand">
               <button className="brand-btn" onClick={e => this.setState({show:true,card_type:'',price:'',give_price:'',made_price:'',discount:''})}>增加卡类型</button>
               <div className="membercard-tab">
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
                  </table>
               </div>
            </div>
            {
                        this.state.show
                        &&
                        <Window title='增加卡类型' onClose={() => this.setState({show:false})} width="452" height='294'>
                            <div className="membercard-div">
                                 <div><span><i>*</i>&nbsp;卡类型：</span><input type='text' value={this.state.card_type} onChange={e => this.setState({card_type:e.target.value})}/></div>
                                 <div><span><i>*</i>&nbsp;充值金额：</span><input type='text' value={this.state.price} onChange={e => this.setState({price:e.target.value})}/>&nbsp;元</div>
                                 <div><span><i>*</i>&nbsp;赠送金额：</span><input type='text'  value={this.state.give_price} onChange={e => this.setState({give_price:e.target.value})}/>&nbsp;元</div>
                                 <div><span><i>*</i>&nbsp;制卡费：</span><input type='text' value={this.state.made_price} onChange={e => this.setState({made_price:e.target.value})}/>&nbsp;元</div>
                                 <div><span><i>*</i>&nbsp;折扣率：</span><input type='text' value={this.state.discount} onChange={e => this.setState({discount:e.target.value})}/>&nbsp;%</div>
                            </div>
                            <div className="membercard-footer">
                               <button onClick = {this.addMemberCardYes}>保 存</button>
                            </div>
                        </Window>
            }
                {
                        this.state.show1
                        &&
                        <Window title='编辑卡类型' onClose={() => this.setState({show1:false})} width="452" height='294'>
                            <div className="membercard-div">
                                 <div><span><i>*</i>&nbsp;卡类型：</span><input type='text' value={this.state.card_type} onChange={e => this.setState({card_type:e.target.value})}/></div>
                                 <div><span><i>*</i>&nbsp;充值金额：</span><input type='text' value={this.state.price} onChange={e => this.setState({price:e.target.value})}/>&nbsp;元</div>
                                 <div><span><i>*</i>&nbsp;赠送金额：</span><input type='text'  value={this.state.give_price} onChange={e => this.setState({give_price:e.target.value})}/>&nbsp;元</div>
                                 <div><span><i>*</i>&nbsp;制卡费：</span><input type='text' value={this.state.made_price} onChange={e => this.setState({made_price:e.target.value})}/>&nbsp;元</div>
                                 <div><span><i>*</i>&nbsp;折扣率：</span><input type='text' value={this.state.discount} onChange={e => this.setState({discount:e.target.value})}/>&nbsp;%</div>
                            </div>
                            <div className="membercard-footer">
                               <button onClick = {this.updateMemberCardYes}>保 存</button>
                            </div>
                        </Window>
            }

            </div>
        );
    }

}