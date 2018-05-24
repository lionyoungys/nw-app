/**
 * 新增组界面
 * @author ran chong
 */

import React, { Component } from 'react';
import './AddGroup.css';
import Window from '../../UI/Window';
export default class extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        
        return (
            <Window title='新增组' onClose={this.props.closeView}>
               
                <div id="addGroup-srarch">
                    <span>组名称:</span>
                    <input  type='text'/>
                    <button type='button' className='e-btn sureBtn'>确认</button>
                </div>
                <div id = 'addGroup-content'>
                   
                    <div className ='addGroup-content-cell'>
                        <div className='addGroup-content-cell-content'>
                            <ul>
                                <li className='addGroup-content-cell-content-head'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>
                                <li className='addGroup-content-cell-content-normal'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>                               
                            </ul>
                        </div>  
                    </div>

                    <div className='addGroup-content-cell'>
                        <div className='addGroup-content-cell-content'>
                            <ul>
                                <li className='addGroup-content-cell-content-head'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>
                                <li className='addGroup-content-cell-content-normal'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='addGroup-content-cell'>
                        <div className='addGroup-content-cell-content'>
                            <ul>
                                <li className='addGroup-content-cell-content-head'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>
                                <li className='addGroup-content-cell-content-normal'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='addGroup-content-cell'>
                        <div className='addGroup-content-cell-content'>
                            <ul>
                                <li className='addGroup-content-cell-content-head'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>
                                <li className='addGroup-content-cell-content-normal'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='addGroup-content-cell'>
                        <div className='addGroup-content-cell-content'>
                            <ul>
                                <li className='addGroup-content-cell-content-head'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>
                                <li className='addGroup-content-cell-content-normal'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='addGroup-content-cell'>
                        <div className='addGroup-content-cell-content'>
                            <ul>
                                <li className='addGroup-content-cell-content-head'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>
                                <li className='addGroup-content-cell-content-normal'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='addGroup-content-cell'>
                        <div className='addGroup-content-cell-content'>
                            <ul>
                                <li className='addGroup-content-cell-content-head'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>
                                <li className='addGroup-content-cell-content-normal'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='addGroup-content-cell'>
                        <div className='addGroup-content-cell-content'>
                            <ul>
                                <li className='addGroup-content-cell-content-head'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>
                                <li className='addGroup-content-cell-content-normal'>
                                    <input type='checkbox' />
                                    <p>前台业务</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </Window>
        );
            
    }
}