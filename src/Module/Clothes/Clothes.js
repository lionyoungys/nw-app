/**
 * 收衣界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import './clothes.css';

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Window title='收衣' onClose={this.props.closeView} >
                <div className="clothes-title">
                     <div><b>手机：</b><span></span></div>                         
                     <div><b>姓名：</b><span></span></div>
                     <div><b>卡号：</b><span></span></div>
                     <div><b>地址：</b><span></span></div>
                     <button className="e-btn" id="clothes-title-btn">读卡</button>
                </div>
                <div className="clothes-tab">
                   <table>
                        <thead>
                            <tr>
                                <th><i>*</i>衣物编码</th>
                                <th><i>*</i>衣物名称</th>
                                <th>颜色</th>
                                <th>瑕疵</th>
                                <th>品牌</th>
                                <th>洗后预估</th>
                                <th>工艺加价</th>
                                <th><i>*</i>单价</th>
                                <th><i>*</i>数量</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td><span></span>1<span></span></td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>hsh45621</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td><span></span>1<span></span></td>
                                <td>删除</td>
                            </tr>
                            <tr>
                                <td>fanyerong</td>
                                <td>围巾-丝绸-高档</td>
                                <td>红色红色红色红色红色红色红色</td>
                                <td>污渍</td>
                                <td>香奈儿</td>
                                <td>发白</td>
                                <td>￥100.00</td>
                                <td>￥20.00</td>
                                <td>   1   </td>
                                <td>删除</td>
                            </tr>
                        </tbody>
                   </table>
                </div>
                <button className="e-btn" id="add-clothes">添 加 衣 物</button>
                <div className="clothes-footer">
                     <div className="clothes-footer-left">
                         <div className="clothes-footer-left-both">
                             <div><b>总件数:</b><span>234件</span></div>
                             <div><b>卡余额:</b><span>￥100.20</span></div>
                         </div>
                         <div className="clothes-footer-left-both">
                             <div><b>总金额:</b><span>￥12.45</span></div>
                             <div><b>折扣率:</b><span>30%</span></div>
                         </div>
                         <div className="clothes-footer-left-both">
                             <div className="clothes-footer-left-both-red"><b>折后价:</b><span>￥12.45</span></div>
                             <div><b>取衣时间:</b><input type="date" className="clothes-foorer-tacketime"/></div>
                         </div>
                     </div>
                     <div className="clothes-footer-right">
                        <div className="take-money"><button>收银</button></div>
                        <div className="money-btn">
                           <button>开钱箱</button>
                           <button>充值</button>
                           <button>卡扣款</button>
                        </div>
                     </div>
                </div>
            </Window>
        );
    }
}