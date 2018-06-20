/**
 * 上挂
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Hangondetail from './Hangondetail';
import './Hangon.css'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {show:false}
        this.onclose=this.onclose.bind(this)

    };
    onclose(){

        this.setState({show:false});
    }
    render() {
        return (
            <Window title='上挂' onClose={this.props.closeView}>
                <div className="Hangon-div">
                    <span>请输入衣物编码</span>
                    <input type="text" />
                    <button className="e-btn hangon-btn" onClick={() => this.setState({ show: true, click: true })}>查询</button>
                </div>
                <div class="Succession-name ReportLossQuery">
                    已为您找到：
                    <b>2345</b>
                    条数据，请选择您要操作的衣物
                </div>
                <table class='ui-table-base hangon-sear-res-tab'>
                    <thead>
                        <tr>
                            <td>衣物编码</td>
                            <td>衣物名称</td>
                            <td>颜色</td>
                            <td>品牌</td>
                            <td>衣挂号</td>
                            <td>客户姓名</td>
                            <td>客户电话</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>收衣</td>
                            <td>111</td>
                            <td>222</td>
                            <td>555</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>赔付</td>
                            <td>111</td>
                            <td>222</td>
                            <td>555</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>售卡</td>
                            <td>111</td>
                            <td>555</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>售卡</td>
                            <td>111</td>
                            <td>555</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>售卡</td>
                            <td>111</td>
                            <td>555</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>售卡</td>
                            <td>111</td>
                            <td>555</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>售卡</td>
                            <td>111</td>
                            <td>555</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>售卡</td>
                            <td>111</td>
                            <td>555</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>售卡</td>
                            <td>111</td>
                            <td>555</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                        <tr>
                            <td>售卡</td>
                            <td>111</td>
                            <td>555</td>
                            <td>222</td>
                            <td>333</td>
                            <td>444</td>
                            <td>555</td>
                        </tr>
                    </tbody>
                </table>
                {
                    this.state.show
                    &&
                        <Hangondetail onClose={this.onclose} /> 
                        // <HangonSearchRes onClose={this.onclose} />) 
                }
            </Window>
           
        );
    }
}