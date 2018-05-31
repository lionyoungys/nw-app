/**
 * 洗护价格设置
 * @author  ranchong
 */
import React, { Component } from 'react';
import './CleaningPriceSetting.css';
import Window from '../../UI/Window';
export default class extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (

            <Window title='洗护价格设置' onClose={this.props.closeView}>

                <div className="cleaning_price_set_btn">
                    <button>洗护分类管理</button>
                    <button>衣物类别管理</button>
                    <button>+新增洗护价格</button>
                </div>
                <div className='cleaning_price_set_left_table_div'>
                    <div className='cleaning_price_set_left_table'>
                        <span className='selected_row'>外套类</span>
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

                <table className='change_card_table right_table'>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>名称</td>
                            <td>衣物类别</td>
                            <td>档次</td>
                            <td>价格</td>
                            <td>折扣下限</td>
                            <td>可调</td>
                            <td>可折</td>
                            <td>交活天数</td>
                            <td>格架系列</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>wwkskskskk看书看书看书看</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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