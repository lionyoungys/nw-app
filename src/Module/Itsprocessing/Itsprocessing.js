/**
 * 撤单处理界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import { WSAEINVALIDPROCTABLE } from 'constants';
import './Itsprocessing.css';

export default class extends Component {   
    constructor(props) {
        super(props);              
    };    
    render() {
       return (             
            <Window title='撤单处理' onClose={this.props.closeView} width="630" height="510">   
                <div className="Deliverywarning-title Itsprocessing-title">
                  <span>衣物编码:</span>
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
                       <div className="Itsprocessing-count-title">待退衣物</div>
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
                <div className="Itsprocessing-footer">
                  <div className="Itsprocessing-footer-title">退单原因</div>
                  <textarea className="Itsprocessing-footer-text"></textarea>
                </div> 
            </Window> 
           
        );
    }
}