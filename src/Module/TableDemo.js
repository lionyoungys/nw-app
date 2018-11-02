/**
 * Demo组件
 * @author Edwin Young
 */

import React from 'react';
import Window from '../UI/Window';
import Table from '../UI/Table';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Window title='表格demo' onClose={this.props.closeView} padding={true}>
                <Table style={{height:'200px'}}>
                    <thead>
                        <tr><th>衣物编码</th><th>搁架号</th><th>衣物名称</th><th>颜色</th></tr>
                    </thead>
                    <tbody style={{textAlign:'center'}}>
                        <tr><td>050900000001</td><td>A0775-01</td><td>西装上衣</td><td>灰色</td></tr>
                        <tr><td>050900000002</td><td>A0827-01</td><td>西装上衣</td><td>灰色</td></tr>
                        <tr><td>100800000003</td><td>A0721-01</td><td>西装上衣</td><td>黑色</td></tr>
                        <tr><td>100800000003</td><td>A0721-02</td><td>羊毛裤</td><td>紫格</td></tr>
                        <tr><td>100800000003</td><td>A0721-03</td><td>百褶裙（短）</td><td>米黄色</td></tr>
                        <tr><td>100800000004</td><td>A0666-01</td><td>西装上衣</td><td>黑色</td></tr>
                        <tr><td>100800000004</td><td>A0666-02</td><td>羊毛裤</td><td>紫拼</td></tr>
                        <tr><td>100800000004</td><td>A0666-03</td><td>羊毛衫</td><td>米黄色</td></tr>
                        <tr><td>112700000005</td><td>A0147-01</td><td>休闲上衣</td><td>淡绿</td></tr>
                        <tr><td>122500000006</td><td>A0647-01</td><td>西装上衣</td><td>黑色</td></tr>
                        <tr><td>122500000006</td><td>A0647-02</td><td>羊毛裤</td><td>紫格</td></tr>
                        <tr><td>020500000013</td><td>A0282-01</td><td>羽绒中长</td><td>白色</td></tr>
                        <tr><td>020500000013</td><td>A0282-02</td><td>羽绒长</td><td>白色</td></tr>
                        <tr><td>020500000013</td><td>A0282-03</td><td>羽绒中长</td><td>黑色</td></tr>
                        <tr><td>020500000013</td><td>A0283-04</td><td>羽绒中长</td><td>黑色</td></tr>
                        <tr><td>050900000001</td><td>A0775-01</td><td>西装上衣</td><td>灰色</td></tr>
                        <tr><td>050900000002</td><td>A0827-01</td><td>西装上衣</td><td>灰色</td></tr>
                        <tr><td>100800000003</td><td>A0721-01</td><td>西装上衣</td><td>黑色</td></tr>
                        <tr><td>100800000003</td><td>A0721-02</td><td>羊毛裤</td><td>紫格</td></tr>
                        <tr><td>100800000003</td><td>A0721-03</td><td>百褶裙（短）</td><td>米黄色</td></tr>
                        <tr><td>100800000004</td><td>A0666-01</td><td>西装上衣</td><td>黑色</td></tr>
                        <tr><td>100800000004</td><td>A0666-02</td><td>羊毛裤</td><td>紫拼</td></tr>
                        <tr><td>100800000004</td><td>A0666-03</td><td>羊毛衫</td><td>米黄色</td></tr>
                        <tr><td>050900000001</td><td>A0775-01</td><td>西装上衣</td><td>灰色</td></tr>
                        <tr><td>050900000002</td><td>A0827-01</td><td>西装上衣</td><td>灰色</td></tr>
                        <tr><td>100800000003</td><td>A0721-01</td><td>西装上衣</td><td>黑色</td></tr>
                        <tr><td>100800000003</td><td>A0721-02</td><td>羊毛裤</td><td>紫格</td></tr>
                        <tr><td>100800000003</td><td>A0721-03</td><td>百褶裙（短）</td><td>米黄色</td></tr>
                        <tr><td>100800000004</td><td>A0666-01</td><td>西装上衣</td><td>黑色</td></tr>
                        <tr><td>100800000004</td><td>A0666-02</td><td>羊毛裤</td><td>紫拼</td></tr>
                        <tr><td>100800000004</td><td>A0666-03</td><td>羊毛衫</td><td>米黄色</td></tr>
                    </tbody>
                </Table>   
            </Window>
        );
    }
}