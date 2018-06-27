/**
 * 取衣详情界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import LayerBox from '../..//UI/LayerBox';
import { WSAEINVALIDPROCTABLE } from 'constants';
import './Takeclothes.css';
import Item from '../Clothes/Item';

export default class extends Component {   
    constructor(props) {
        super(props);     
        this.state = {
            show2:false,            
            count:'',
            listitem:[],
            listorder:[],
            listuser:[],
            index:[],
            checked:[]
        }; 
        this.takeClothes=this.takeClothes.bind(this);
        this.handleAllChecked=this.handleAllChecked.bind(this);
        this.handleChecked=this.handleChecked.bind(this);
    }; 
    takeClothes(){
        if(this.state.checked.length==0)
        return tool.ui.error({msg:'请选择你要取的衣服',callback:close => close()});
        let takeclothes= { 
            token:'token'.getData(),
            ids:this.state.checked
        }
        console.log(takeclothes)
        api.post('takeItem',
          takeclothes
        , (res, ver) => {
                if (ver && res) {
                    tool.ui.success({callback:(close) => {
                        close();
                    }});                                                                                         
                }else{
                    tool.ui.error({msg:res.msg,callback:(close) => {
                        close();
                    }});                 
                }
            }
        );
    }
      componentDidMount () {
        api.post('clothesdetail', {
            token:'token'.getData(),
            id:this.props.id,
        }, (res, ver) => {
                if (ver && res) {
                    console.log(res);  
                    this.setState({
                        count:res.result.count,
                        listitem:res.result.item,
                        listorder:res.result.order,
                        listuser:res.result.user,
                    })
                    
                    // if(this.state.listitem.status==3){
                    //     this.setState({status:'清洗中'})
                    // }else if(this.state.listitem.status==4){
                    //     this.setState({status:'清洗完成'})
                    // } else{
                    //     this.setState({status:'退款中'})
                    // }                                                                                                 
                }else{
                    // console.log(res.msg);                   
                }
            }
        );

      } 
    // handleclick(e){
    //     console.log(e.target.dataset.index || e.target.parentNode.dataset.index);
    //     this.setState({index:e.target.dataset.index || e.target.parentNode.dataset.index});
    // }
    handleAllChecked() {
        console.log(this.state.checked.length == this.state.listitem.length);
        this.state.checked.length == this.state.listitem.length
        ?
        this.setState({checked:[]})
        :
        this.setState({checked:this.state.listitem.typeArray('id')});
    }
    handleChecked(e) {
            let id = e.target.dataset.id || e.target.parentNode.dataset.id || e.target.parentNode.parentNode.dataset.id;
            let index = id.inArray(this.state.checked);
            if (-1 === index) {
                this.state.checked.push(id);
            } else {
                this.state.checked.splice(index, 1);
            }
            this.setState({checked:this.state.checked});
    }
    render() { 
       let takeclothesdetail=this.state.listitem.map((item,index)=>
       <tr key={'item'+index} data-id={item.id}  onClick={this.handleChecked}>
           <td>{index+1}</td>
           <td><input type="checkbox" checked={-1 !== item.id.inArray(this.state.checked)}/><span>{item.clothing_number}</span></td>
           <td>{item.clothing_name}</td>
           <td>{item.clothing_color}</td>
           <td>{item.remark}</td>
           <td>{item.grid_num}</td>
           <td>{item.status==3?'清洗中':'清洗完成'}</td>
       </tr>
       );
           return (
                <Window title='取衣详情' onClose={this.props.onClick}>   
                    <div className="Takeclothesdetail-title">
                      <div className="Takeclothesdetail-title-left">
                         <div>订单号：{this.state.listorder.ordersn}</div>
                         <div>衣物件数:{this.state.count}</div>
                      </div>
                      <div className="Takeclothesdetail-title-right">
                         <div>姓名：{this.state.listuser.user_name}</div>
                         <div>手机号：{this.state.listuser.user_mobile}</div>
                         <div>会员卡号：{this.state.listuser.card_number}</div>
                      </div>
                    </div>
                    <div className="Takeclothes-tab Takeclothesdetail-tab">
                        <table cellPadding="0" cellSpacing="0" border="0">
                           <thead>
                               <tr>
                                   <th></th>
                                   <th>衣物编码</th>
                                   <th>衣物名称</th>
                                   <th>颜色</th>
                                   <th>颜色瑕疵</th>
                                   <th>衣挂号</th>
                                   <th>洗护状态</th>
                                   
                               </tr>
                           </thead>
                           <tbody>
                               {takeclothesdetail}
                           </tbody>
                        </table> 
                    </div>
                    <div className="Takeclothesdetail-footer">
                        <div className="Takeclothesdetail-footer-left">
                        <input type="checkbox" onChange={this.handleAllChecked} checked={this.state.checked.length == this.state.listitem.length}/>全选/全不选</div>
                        <div className="Takeclothesdetail-footer-right">
                           <button className="e-btn Takeclothesdetail-footer-right-btn">立即收款</button> 
                           <button className="take-over" onClick={() => this.setState({show2:true})}>取衣</button>
                           <button className="take-no" >取衣</button>
                           {/* take-no 是灰色取不了衣服样式现在已隐藏 */}
                           <div>欠款: ￥{this.state.listorder.arrears}</div>
                           <div>价格: ￥{this.state.listorder.pay_amount}</div>
                        </div>                       
                    </div>
                    {
                    this.state.show2
                    &&
                    <LayerBox
                        title='取衣'
                        onClose={() => this.setState({show2:false})}
                        onClick={this.takeClothes}
                        onCancel={() => this.setState({show2:false})}
                        hasCancel={true} width='278' height='200'>
                        {
                            <div className="takeclothes-people">
                                该客户确定要取走衣物
                            </div>
                        }
                   
                    </LayerBox>
                }
                </Window> 
        )
    }
}