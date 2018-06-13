/**
 * 商品销售界面
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import './Commoditysales.css';

export default class extends Component {
    constructor(props) {
        super(props);  
                    
    };  
    render() {               
        return (       
        
            <Window title='商品销售' onClose={this.props.closeView}>
               <div className="commoditysales-div">
                  <div className="commoditysales-div-left">
                      <div className="commoditysales-left-title">商品分类</div>
                      <div className="commoditysales-left-count">
                        <span className="commoditysales-left-hover">清洁</span>
                        <span>护理</span>
                        <span>配件</span>
                        <span>衣服</span>
                        <span>二手奢侈品</span>
                        <span>积分</span>
                      </div>
                  </div>
                  <div className="commoditysales-div-right">
                      <div className="commoditysales-right-top">
                        <button className="e-btn commoditysales-right-btn">查询</button>
                        <input type="text" className="commoditysales-right-text" placeholder="请扫描或输入衣物编码"/>
                      </div>
                      <div className="commoditysales-right-tab">
                         <table>
                             <thead></thead>


                         </table>
                      </div>
                  </div>
               </div>                            
            </Window>  
        );
    }
}