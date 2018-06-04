/**
 * 格架查询
 * @author  ranchong
 */
import React, { Component } from 'react';
import './LatticeQuery.css';
import Window from '../../UI/Window';
export default class extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (

            <Window title='格架查询' onClose={this.props.closeView}>
               <div className="LatticeQuery-div">
                  <table>
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>格架名称</th>
                              <th>首数</th>
                              <th>尾数</th>
                              <th>每个挂号最大挂衣数</th>
                              <th>当前挂衣数</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>1</td>
                              <td>1</td>
                              <td>1</td>
                              <td>1</td>
                              <td>1</td>
                              <td>1</td>
                          </tr>
                          <tr>
                              <td>2</td>
                              <td>2</td>
                              <td>2</td>
                              <td>2</td>
                              <td>2</td>
                              <td>2</td>
                          </tr>
                          <tr>
                              <td>3</td>
                              <td>3</td>
                              <td>3</td>
                              <td>3</td>
                              <td>3</td>
                              <td>3</td>
                          </tr>
                      </tbody>
                  </table>         
               </div>
               <div className="LatticeQuery-Bdiv">
                    <ul>
                            <li>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span className="span-div">1#35件</span>
                            </li>
                            <li>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span className="span-div">1#35件</span>
                            </li>
                            <li>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span className="span-div">1#35件</span>
                            </li>
                            <li>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span className="span-div">1#35件</span>
                            </li>
                            <li>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span className="span-div">1#35件</span>
                            </li>
                            <li>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span className="span-div">1#35件</span>
                            </li>
                            <li>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span className="span-div">1#35件</span>
                            </li>
                            <li>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span className="span-div">1#35件</span>
                            </li>
                            <li>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span className="span-div">1#35件</span>
                            </li>
                            <li>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span>1#空</span>
                                <span className="span-div">1#35件</span>
                            </li>
                        </ul> 
                </div>    
            </Window>
        );
    }
}