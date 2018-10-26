/**
 * 上挂衣物编码重复查询结果
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import './HangonSearchRes.css'
export default class extends Component {
    constructor(props) {
        super(props);
    };
    render() {        
        return (
            <Window title='查询结果' onClose={this.props.onClose}>
                <div class="ui-check-res ReportLossQuery">
                    已为您找到
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
            </Window>

        );
    }
}