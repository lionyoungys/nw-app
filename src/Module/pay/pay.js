/**
 * 赔付界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import { WSAEINVALIDPROCTABLE } from 'constants';
import './pay.css';

export default class extends Component {   
    constructor(props) {
        super(props);              
    };    
    render() {
       return (             
            <Window title='赔付' onClose={this.props.closeView} width="630" height="510">   
                <div className="Deliverywarning-title Itsprocessing-title">
                    <span>流水单号:</span>
                    <input type="text" className='e-input its-pro-input'/> 
                    <button className="e-btn">查询</button>
                    <button className="e-btn">确定</button>
                    <button className="e-btn">退出</button>
                </div>  
                <div className="Itsprocessing-count">
                   <div className="Itsprocessing-count-left">                                                
                       <div className="Itsprocessing-count-title">收进衣物</div>
                       <div className="Itsprocessing-count-take">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                          <div>
                              <span>A-0254</span>
                              <span>人造毛衣</span>
                              <span>蓝色</span>
                              <span>0</span>
                          </div>                          
                       </div>                      
                    </div>
                    <div className="Itsprocessing-count-transfer">
                       <span></span>
                       <span></span>
                    </div>
                    <div className="Itsprocessing-count-left  Itsprocessing-count-right">
                       <div className="Itsprocessing-count-title">赔退衣物</div>
                       <div className="Itsprocessing-count-take">
                          <div>
                              <span>A-0254</span>
                              <span>人造毛衣</span>
                              <span>蓝色</span>
                              <span>0</span>
                          </div>                          
                       </div>                       
                    </div>
                </div> 
                <div className="pay-why">
                  <span>事件类别:  </span><Select option={['洗坏了','丢失','破损']} selected='洗坏了'  onChange={value => console.log(value)}/>
                </div>
                <div className="pay-footer">
                    <div className="pay-footer-left">
                      <div className="pay-footer-title">退赔原因</div>
                      <textarea className="pay-footer-text"></textarea>
                    </div>
                    <div className="pay-footer-left pay-footer-right">
                      <div className="pay-footer-title">经验反馈</div>
                      <textarea className="pay-footer-text"></textarea>
                    </div>
                </div>
            </Window>           
        );
    }
}