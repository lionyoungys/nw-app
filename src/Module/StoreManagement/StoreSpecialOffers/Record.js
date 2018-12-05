
/**
 * 记录列表组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Table from '../../../UI/Table';
import Dish from '../../../UI/Dish';

export default class extends Component {
    constructor(props) {
        super(props);        
    }
    render() {
        let data = tool.isArray(this.props.data) ? this.props.data : []
        ,   html = data.map((obj, index) => 
                <tr key={'index_' + index} data-index={index} className='record_tr e-hover-bule'>
                    <td>{index+1}</td>
                    <td>{obj.uname}</td>
                    <td>{obj.user_mobile}</td>
                    <td>{obj.operation}</td>
                    <td>{obj.status==0?'未使用':'已使用'}</td>
                    <td>{obj.ordersn}</td>
                    <td>{obj.time}</td>
                </tr>
            );
        return (
            <Dish title='记录' onClose={this.props.onClose}>
                <div style={{height:'100%',overflow:'auto'}} className="record_tab">
                    <Table>
                        <thead>
                            <th>编号</th>
                            <th>客户姓名</th>
                            <th>客户手机号</th>
                            <th>操作人</th>
                            <th>状态</th>
                            <th>订单号</th>
                            <th>使用时间</th>
                        </thead>
                        <tbody>
                           {html}
                        </tbody>                     
                    </Table>                   
                </div>
            </Dish>
        );
    }
}





















