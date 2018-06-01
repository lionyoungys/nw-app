/**
 * 商品管理/商品分类管理
 * @author  ranchong
 */
import React, { Component } from 'react';
import './CommodityClassifyManagement.css';
import Window from '../../UI/Window';
export default class extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (

            <Window title='商品分类管理' onClose={this.props.closeView} width='632' height='411'>
                {/* 左侧table */}
                <div className="commodity_classify_management_left">

                    <table className='commodity_classify_management_left_table'>
                        <thead>
                            <tr>
                                <td>id</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>wwk</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* 右侧板块 */}
                <div className="commodity_classify_management_right">
                    <div className='commodity_classify_management_right_btn'>
                        <button>+添加分类</button>
                    </div>
                    <div className='commodity_classify_management_right_bottom'>
                        <a>新增分类</a>
                        <p>分类名称:</p>
                        <input className='e-input'></input>
                        <button className='e-btn'>取消</button>
                        <button className='e-btn'>保存</button>

                    </div>
                </div>
            </Window>
        );
    }
}