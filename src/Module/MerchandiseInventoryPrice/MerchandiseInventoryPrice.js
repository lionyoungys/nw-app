/**
 * 库存商品价格
 * @author  ranchong
 */
import React, { Component } from 'react';
import './MerchandiseInventoryPrice.css';
import Window from '../../UI/Window';

export default class extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (

            <Window title='库存商品价格' onClose={this.props.closeView}>

                <div className="cleaning_price_set_btn">
                    <button>库存商品分类管理</button>
                    <button>+新增商品价格</button>
                </div>
                <div className='cleaning_price_set_left_table_div'>
                    <div className='cleaning_price_set_left_table'>
                        <span className='selected_row'>外套类</span>
                        <span >默认分类</span>
                        <span >清洁</span>
                        <span >护理</span>
                        <span >配件</span>
                        <span >衣服</span>
                        <span >二手奢侈品</span>
                        <span >手提袋</span>
                        <span >外套类</span>
                        <span >外套类</span>
                        <span >外套类</span>
                        <span >外套类</span>
                        <span >外套类</span>
                        <span >外套类</span>
                        <span >外套类</span>
                        <span >外套类</span>
                        <span >外套类</span>
                        <span >外套类</span>
                        <span >外套类</span>

                    </div>
                </div>

                {/* 表格部分 欠费衣物信息*/}

                <table className='merchandise_inventory_price_table change_card_table'>
                    <thead>
                        <tr>
                            <td>商品编号</td>
                            <td>商品名称</td>
                            <td>衣物类别</td>
                            <td>可折</td>
                            <td>库存</td>
                            <td>单价</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>11</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

            </Window>
        );
    }
}