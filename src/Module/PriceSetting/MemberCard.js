/**
 * 会员卡
 * @author  ranchong
 */
import React, { Component } from 'react';
import MemberCard from'./MemberCard.css'
import LayerBox from '../../UI/LayerBox';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={cardtypes:[]}
        this.addMemberCardYes=this.addMemberCardYes.bind(this);
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
    addMemberCardYes(){   
        api.post('addCardType', {
            token:'token'.getData(),
            card_type:'erer',
            discount:'34',
            price:'t4',
            give_price:'',
            made_price:''
        }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({show:false})
            }
        }
        );
    }
    updateMemberCardYes(){   
        api.post('modCardType', {
            token:'token'.getData(),
            card_type:'erer',
            discount:'34',
            price:'t4',
            give_price:'',
            made_price:''
        }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({show:false})
            }
        }
        );
    }
    render(){
        let cardtypes =this.state.cardtypes.map((item,index)=>
        <tr>
        <td>{item.card_type}</td>
        <td>{item.price}</td>
        <td>{item.give_price}</td>
        <td>{item.made_price}</td>
        <td>{item.discount}</td>
        <td>  <b onClick={this.modlattice} data-write={index}>修改</b><i  onClick={this.error2} data-write={index}>删除</i></td>
      
</tr>
    );
        return( 
        <div>
            <div className="brand">
               <button className="brand-btn" onClick={e => this.setState({show:true})}>增加卡类型</button>
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
                   
                    <LayerBox title='增加卡类型' onClose={() => this.setState({show:false})} onClick={this.addMemberCardYes}>
                        {
                            <div className='ui-table'>
                            <div className='margintop'>
                            <span >姓名:</span><input  type='text'/>
                            </div>
                             <div>
                             <span>手机号:</span><input type='text'/>
                             </div>
                              <div>
                              <span>密码:</span><input type='text'/>
                              </div>
                              <div>
                                  <span className='passlimit'>密码必须6位以上，且不能为纯数字</span>
                                  </div>
                               <div  className='jurisdiction'>
                               <span >权限:</span><input type='text' />
                               </div>
                               </div>
                    }
                     
                    </LayerBox>
                   
                }
            </div>
        );
    }

}