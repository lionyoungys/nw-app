/**
 * 编辑洗护价格
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import './EditCleaningPrices.css';

export default class extends Component {
    constructor(props) {
        super(props);
       
    };   
    render() {
        return (
               <Window title='编辑洗护价格' onClose={this.props.closeView} width="510" height="312"> 
                        <div className="edit_price">
                            <div className="edit_price-div">
                                <div className='edit_price-div-select'><span>衣物处理：</span><Select option={['干洗','水洗','烘干']} selected='干洗' onChange={value => console.log(value)} /></div>
                                <div className='edit_price-div-select'><span>衣物类别：</span><Select option={['上衣','裤装','小件']} selected='上衣' onChange={value => console.log(value)}/></div>
                            </div>
                            <div className="edit_price-div">
                                <div className='edit_price-div-nor'><span>名称：</span><input  type="text"/></div>
                                <div className='edit_price-div-select'><span>档次：</span><Select option={['普通','高档']} selected='普通' onChange={value => console.log(value)}/></div>
                            </div>
                            <div className="edit_price-div">
                                <div className='edit_price-div-nor'><span>交活天数：</span><input  type="text"/></div>
                                <div className='edit_price-div-nor'><span>格架系数：</span><input  type="text"/></div>
                            </div>
                            <div className="edit_price-div">
                                <div className='edit_price-div-nor'><span>价格：</span><input  type="text"/></div>
                                <div className='edit_price-div-nor'><span>折扣下限：</span><input  type="text" className="edit_price-dicount"/> %</div>
                            </div>
                            <div className="edit_price-money">
                                <input type="checkbox" />价格可调
                            </div>
                            <div className="edit_price-dcount">
                                <input type="checkbox" />允许折扣
                            </div> 
                        </div>
                <button className="e-btn edit_price-e-btn">删除</button>
                <button className="e-btn edit_price-e-btn">保存</button>
                </Window>
        )
    }
} 