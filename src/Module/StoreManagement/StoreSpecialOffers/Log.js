
/**
 * 日志列表组件
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
                <tr key={'index_' + index} data-index={index} className=' e-hover-bule'>
                    <td>{index+1}</td>
                    <td>{obj.operation}</td>
                    <td>{obj.content}</td>
                    <td>{obj.time}</td>                   
                </tr>
            );
        return (
            <Dish title='日志' onClose={this.props.onClose}>
                <div style={{height:'100%',overflow:'auto'}} className="record_tr record_tab">
                    <Table>
                        <thead>
                            <th>编号</th>
                            <th>操作人</th>
                            <th>操作内容</th>
                            <th>操作时间</th>                           
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





















