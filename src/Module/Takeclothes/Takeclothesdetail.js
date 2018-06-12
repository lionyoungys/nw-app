/**
 * 取衣详情界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import { WSAEINVALIDPROCTABLE } from 'constants';
import './Takeclothes.css';

export default class extends Component {   
    constructor(props) {
        super(props);              
    };    
    render() {           
           return (
                <Window title='取衣详情' onClose={this.props.closeView}>   
                    <div className="Takeclothesdetail-title">
                      <div className="Takeclothesdetail-title-left">
                         <div>订单号：14578612558</div>
                         <div>衣物件数：254</div>
                      </div>
                      <div className="Takeclothesdetail-title-right">
                         <div>姓名：哈哈哈</div>
                         <div>手机号：18310963932</div>
                         <div>会员卡号：25487452154</div>
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
                               <tr>
                                   <td></td>
                                   <td><input type="checkbox"/>345678908456778</td>
                                   <td>吱吱</td>
                                   <td>红色红色红色红色红色红色红色红色</td>
                                   <td>点点点</td>
                                   <td>45#34</td>
                                   <td>--</td>                                                                
                               </tr>                              
                                
                                
                           </tbody>
                        </table> 
                    </div>
                    <div className="Takeclothesdetail-footer">
                        <div className="Takeclothesdetail-footer-left"><input type="checkbox" />全选/全不选</div>
                        <div className="Takeclothesdetail-footer-right">
                           <button className="e-btn Takeclothesdetail-footer-right-btn">立即收款</button>
                           <div>欠款: ￥122.52</div>
                           <div>价格: ￥524.12</div>
                        </div>                       
                    </div>
                </Window> 
        )
    }
}