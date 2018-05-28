/**
 * 换卡页面
 * @author  ranchong
 */
import React, { Component } from 'react';
import './ChangeCard.css';
import Window from '../../UI/Window';
export default class extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (

            <Window title='换卡' onClose={this.props.closeView}>
                <div className="change_card_date">
                    <div className="change_card_date_left">
                        <div>卡号：<input type="text" /></div>
                        <div>姓名：<input type="text" /></div>
                        <div>手机号：<input type="text"/></div>
                    </div>
                    <button type='button' className='e-btn '>查询</button>
                </div>

                {/* 表格部分 欠费衣物信息*/}
                <p className='change_card_result_title'>已找到<a>145</a>条结果</p>
                <table className='change_card_table'>
                    <thead>
                        <tr>
                            <td></td>
                            <td>卡号</td>
                            <td>姓名</td>
                            <td>手机号</td>
                            <td>卡类型</td>
                            <td>余额</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>换卡</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>换卡</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>换卡</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>换卡</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>换卡</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>uwuwuwu</td>
                            <td>换卡</td>
                        </tr>
                    </tbody>
                </table>
            </Window>
        );
    }
}