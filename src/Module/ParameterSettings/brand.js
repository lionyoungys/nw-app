/**
 * 品牌界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
export default class extends Component {   
    constructor(props) {
        super(props);           
    }; 
    render() {      
        return ( 
                <div>
                    <div className="brand">
                       <button className="brand-btn">新 增 品 牌</button>
                       <div className="brand-tab">
                          <table>
                              <thead>
                                  <tr>
                                      <th>ID</th>
                                      <th>品牌名称</th>
                                      <th>操作</th>
                                  </tr>
                              </thead>


                          </table>
                       </div>
                    </div>
                </div>
        );            
    };
}