/**
 * 洗护价格设置
 * @author  ranchong
 */
import React, { Component } from 'react';
import './CleaningPriceSetting.css';
import './addnewprice.css';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {show:false}
    };   
    render() {
        return (
            <Window title='洗护价格设置' onClose={this.props.closeView}>
                <div className="cleaning_price_set_btn">
                    <button>洗护分类管理</button>
                    <button>衣物类别管理</button>
                    <button onClick={() => this.setState({show:true})}>+新增洗护价格</button>
                </div >
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
                {
                    this.state.show
                    &&
                    <Window title='新增洗护价格' onClose={() => this.setState({show:false})} width="510" height="312">
                        <div className="addnewprice">
                            <div className="addnewprice-div">
                                <div><span>衣物处理：</span><Select option={['干洗','水洗','烘干']} selected='干洗' onChange={value => console.log(value)} /></div>
                                <div><span>衣物类别：</span><Select option={['上衣','裤装','小件']} selected='上衣' onChange={value => console.log(value)}/></div>
                            </div>
                            <div className="addnewprice-div">
                                <div><span>名称：</span><input  type="text"/></div>
                                <div><span>档次：</span><Select option={['普通','高档']} selected='普通' onChange={value => console.log(value)}/></div>
                            </div>
                            <div className="addnewprice-div">
                                <div><span>交活天数：</span><input  type="text"/></div>
                                <div><span>格架系数：</span><input  type="text"/></div>
                            </div>
                            <div className="addnewprice-div">
                                <div><span>价格：</span><input  type="text"/></div>
                                <div><span>折扣下限：</span><input  type="text" className="addnewprice-dicount"/> %</div>
                            </div>
                            <div className="addnewprice-money">
                                <input type="checkbox" />价格可调
                            </div>
                            <div className="addnewprice-dcount">
                                <input type="checkbox" />允许折扣
                            </div>
              
                        </div>
                        <button className="e-btn">保存</button>
                    </Window>
                }

            </Window>
        );
    }
}