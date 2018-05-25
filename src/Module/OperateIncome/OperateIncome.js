/**
 * 营业日报组件
 * @author wang jun
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import './OperateIncome.css';
export default class extends Component {   
    constructor(props) {
        super(props);           
    }; 
    render() {
        return(<div>
            <Window title='营业日报' onClose={this.props.closeView}>  
                <div className='operateincome'>
                    <div className='blacktext'>收衣</div>
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>衣物类别</th>
                                <th>应收</th>
                                <th>实收</th>
                                <th>数量</th>
                                <th>会员卡</th>
                                <th>现金</th>
                                <th>微信</th>
                                <th>支付宝</th>
                                <th>优惠卷</th>
                            </tr>

                            </thead>
                            <tbody>
                            <tr>
                                <td>衣物类别</td>
                                <td>应收</td>
                                <td>实收</td>
                                <td>数量</td>
                                <td>会员卡</td>
                                <td>现金</td>
                                <td>微信</td>
                                <td>支付宝</td>
                                <td>优惠卷</td>
                            </tr>
                            <tr>
                                <td>衣物类别</td>
                                <td>应收</td>
                                <td>实收</td>
                                <td>数量</td>
                                <td>会员卡</td>
                                <td>现金</td>
                                <td>微信</td>
                                <td>支付宝</td>
                                <td>优惠卷</td>
                            </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>合计</td>
                                    <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                    </tr>
                                
                                </tfoot>
                        </table>
                    </div>

                </div>
            </Window>  

        </div>)
    }
}