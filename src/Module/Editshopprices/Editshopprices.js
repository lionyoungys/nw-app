/**
 * 编辑商品价格界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import './Editshopprices.css';

export default class extends Component {   
    constructor(props) {
        super(props);           
    }; 
    render() {
        return (             
            <Window title='编辑商品价格' onClose={this.props.closeView} width='279' height='291'>   
                <div className="Editshopprices">
                    <div className='Editshopprices-select'>
                         <span>商品类别：</span><Select option={['外套','裤子']} selected='外套' onChange={value =>console.log(value)}/>
                     </div>
                    <div className='Editshopprices-nor'>
                         <span>名称：</span><input type="text" />
                     </div>
                    <div className='Editshopprices-nor'>
                         <span>库存：</span><input type="text" />
                     </div>
                    <div className='Editshopprices-nor'>
                         <span>价格：</span><input type="text" />
                     </div>
                    <div className='Editshopprices-nor'>
                         <input type="checkbox" /><b>允许折扣</b>
                     </div>
                </div>    
                <div className="Editshopprices-foot">
                    <button className="e-btn">删除商品</button>
                    <button className="e-btn">保存</button>
                </div>     
            </Window> 
        );
    }
}