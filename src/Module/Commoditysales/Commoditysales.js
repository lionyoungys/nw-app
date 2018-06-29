/**
 * 商品销售界面
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import MathUI from '../../UI/MathUI';
import './Commoditysales.css';
import Clearing from'./Clearing';
import Nursing from'./nursing';
import Accessories from'./Accessories';
import Clothes from'./Clothes';
import Luxury from'./Luxury';
import Integral from'./Integral';

export default class extends Component {
    constructor(props) {
        super(props);  
        this.state={index:0};
        this. handleClick = this.handleClick.bind(this);
        this.tab=['清洁','护理','配件','衣服','二手奢侈品','积分'];
        this.views = [<Clearing />, <Nursing />,<Accessories/>,<Clothes/>,<Luxury/>,<Integral/>];
                    
    };  
    handleClick (e){
        this.setState({index:e.target.dataset.index});
    }
    render() {   
        let tabs=this.tab.map((item,index)=>
                <span
                    key={item} 
                    data-index={index} 
                    className={this.state.index==index?'commoditysales-left-hover':null}
                    onClick={this.handleClick}
                >{item}</span>
        );            
        return (       
        
            <Window title='商品销售' onClose={this.props.closeView}>
               <div className="commoditysales-div">                 
                  <div className="commoditysales-div-right">                     
                      <div className="commoditysales-right-tab">
                         <table>
                             <thead>
                                 <tr>
                                     <th>商品编码</th>
                                     <th>商品名称</th>
                                     <th>折扣率</th>
                                     <th>单价</th>
                                     <th>数量</th>
                                     <th>操作</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr> 
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>                               
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>
                                 <tr>
                                    <td>235666666</td>
                                    <td>裤子外套衬衫鞋袜子</td>
                                    <td>0.3%</td>
                                    <td>45</td>
                                    <td><MathUI>2</MathUI></td>
                                    <td>删除</td>
                                 </tr>

                             </tbody>
                         </table>
                      </div>
                  </div>
               </div> 
               <div className="commoditysales-footerdiv">
                    <div className="commoditysales-right-top">
                        <button className="e-btn commoditysales-right-btn">查询</button>
                        <input type="text" className="commoditysales-right-text" placeholder="请扫描或输入衣物编码"/>
                    </div>
                   <div className="commoditysales-div-left">
                      <div className="commoditysales-left-title">商品分类</div>
                      <div className="commoditysales-left-count">
                         {tabs}
                      </div>
                    </div>
                    {this.views[this.state.index]} 
                   <div className="commoditysales-footerdiv-right">
                      <div className="commoditysales-footerdiv-rightboth">总金额: ￥89.00</div>
                      <div className="commoditysales-footerdiv-rightboth">折扣率: 5%</div>
                      <div className="commoditysales-footerdiv-rightboth">总件数: 89</div>
                      <div className="commoditysales-footerdiv-rightboth commoditysales-footerdiv-rightred">折后价: ￥89.00</div>                    
                      <div className="commoditysales-footerdiv-rightboth">
                          <button type='button' className='e-btn middle high'>收款</button>
                      </div>
                      <div className="commoditysales-button">
                        <button type='button' className='e-btn' >开钱箱</button>&nbsp;
                        <button type='button' className='e-btn' >充值</button>&nbsp;
                        <button type='button' className='e-btn' >卡扣款</button>
                     </div>                  
                   </div>                           
               </div>                           
            </Window>  
        );
    }
}

{/* <div className="commoditysales-footerbtn"><button>收银</button></div> 
                   <div className="commoditysales-footerbtn commoditysales-footerbtnboth">
                      <button className="e-btn">开钱箱</button>
                      <button className="e-btn">充值</button>
                      <button className="e-btn">卡扣款</button>
</div>  */}