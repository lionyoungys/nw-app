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
        this.state={grid:[]}
    };
    componentDidMount() {
        api.post('grid', {token:'token'.getData()
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({grid:res.result})
            }
        }
        );
    }
    render() {
        let grid = this.state.grid.map((item,index)=>
        <tr>
                <td>{item.name}</td>
                <td>{item.start_number}</td>
                <td>{item.end_number}</td>
                <td>{item.max_number}</td>
                <td>{item.use_total}/{item.total}</td>
        </tr>
   );
        return (

            <Window title='格架查询' onClose={this.props.closeView}>
               <div className="LatticeQuery-div">
                  <table>
                      <thead>
                          <tr>
                              <th>格架名称</th>
                              <th>首数</th>
                              <th>尾数</th>
                              <th>每个挂号最大挂衣数</th>
                              <th>使用率</th>
                          </tr>
                      </thead>
                      <tbody>
                         {grid}
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