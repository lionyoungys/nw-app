/**
 * 欠款补交
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import { WSAEINVALIDPROCTABLE } from 'constants';
import '../Takeclothes/Takeclothes.css';

export default class extends Component {   
    constructor(props) {
        super(props);   
                 
    };    
    render() {           
           return (
                <Window title='欠款补交' onClose={this.props.closeView}>   
                    <div className="Takeclothes-title">
                       <button className="e-btn Takeclothes-title-btn">读卡</button>
                       <button className="e-btn Takeclothes-title-btn">查询</button>
                       <input type="text" className="Takeclothes-title-text" placeholder='姓名,手机号,订单号,卡号'/>
                    </div>  
                    <div className="Takeclothes-div-title">已为您找到<b>4535</b>条数据</div>
                    <div className="Takeclothes-tab Takeclothesdetail-tab debtpay-tab">
                        <table cellPadding="0" cellSpacing="0" border="0">
                           <thead>
                               <tr>
                                   <th></th>
                                   <th>定单号</th>
                                   <th>姓名</th>
                                   <th>手机号</th>
                                   <th>卡号</th>
                                   <th>衣物数量</th>
                                   <th>价格</th>
                                   <th>欠款</th>
                                   <th>操作</th>
                               </tr>
                           </thead>
                           <tbody>
                               <tr>
                                   <td></td>
                                   <td>45547586586</td>
                                   <td>吱吱</td>
                                   <td>13546079987</td>
                                   <td>154852456321</td>
                                   <td>25</td>
                                   <td>￥25.00</td>
                                   <td>￥45.10</td>                                  
                                   <td>收款</td>                                   
                               </tr>
                              
                               <tr>
                                   <td></td>
                                   <td>45547586586</td>
                                   <td>吱吱</td>
                                   <td>13546079987456321</td>
                                   <td>154852456321456321</td>
                                   <td>25</td>
                                   <td>￥25.00</td>
                                   <td>￥45.10</td>                                  
                                   <td>收款</td>                                   
                               </tr>
                               <tr>
                                   <td></td>
                                   <td>45547586586</td>
                                   <td>吱吱</td>
                                   <td>13546079987</td>
                                   <td>154852456321</td>
                                   <td>25</td>
                                   <td>￥25.00</td>
                                   <td>￥45.10</td>                                  
                                   <td>收款</td>                                  
                               </tr>
                              
                               <tr>
                                   <td></td>
                                   <td>45547586586</td>
                                   <td>吱吱</td>
                                   <td>13546079987</td>
                                   <td>154852456321</td>
                                   <td>25</td>
                                   <td>￥25.00</td>
                                   <td>￥45.10</td>                                  
                                   <td>收款</td>                                   
                               </tr>
                               <tr>
                                   <td></td>
                                   <td>45547586586</td>
                                   <td>吱吱</td>
                                   <td>13546079987</td>
                                   <td>154852456321</td>
                                   <td>25</td>
                                   <td>￥25.00</td>
                                   <td>￥45.10</td>                                  
                                   <td>收款</td>                                   
                               </tr>
                               <tr>
                                   <td></td>
                                   <td>45547586586</td>
                                   <td>吱吱</td>
                                   <td>13546079987</td>
                                   <td>154852456321</td>
                                   <td>25</td>
                                   <td>￥25.00</td>
                                   <td>￥45.10</td>                                  
                                   <td>收款</td>                                  
                               </tr>
                               <tr>
                                   <td></td>
                                   <td>45547586586</td>
                                   <td>吱吱</td>
                                   <td>13546079987</td>
                                   <td>154852456321</td>
                                   <td>25</td>
                                   <td>￥25.00</td>
                                   <td>￥45.10</td>                                  
                                   <td>收款</td>                                   
                               </tr>
                               <tr>
                                   <td></td>
                                   <td>45547586586</td>
                                   <td>吱吱</td>
                                   <td>13546079987</td>
                                   <td>154852456321</td>
                                   <td>25</td>
                                   <td>￥25.00</td>
                                   <td>￥45.10</td>                                  
                                   <td>收款</td>                                   
                               </tr>
                               <tr>
                                   <td></td>
                                   <td>45547586586</td>
                                   <td>吱吱</td>
                                   <td>13546079987</td>
                                   <td>154852456321</td>
                                   <td>25</td>
                                   <td>￥25.00</td>
                                   <td>￥45.10</td>                                  
                                   <td>收款</td>                                   
                               </tr>
                               <tr>
                                   <td>444</td>
                                   <td>45547586586</td>
                                   <td>吱吱</td>
                                   <td>13546079987</td>
                                   <td>154852456321</td>
                                   <td>25</td>
                                   <td>￥25.00</td>
                                   <td>￥45.10</td>                                  
                                   <td>收款</td>                                   
                               </tr>
                           </tbody>
                        </table> 
                    </div>
                    <div className="bothpages-footer">
                            <div className="bothpages-footer-btn">
                                    <span>首页</span>
                                    <span>上一页</span>
                                    <span>下一页</span>
                                    <span>尾页</span>
                            </div>
                            <div className="bothpages-footer-all">第<span>一</span>页/共<span>四</span>页</div>
                            <div className="bothpages-footer-both">每页<span>20</span>条，共<span>112</span>条</div>
                    </div>
                </Window> 
        )
    }
}