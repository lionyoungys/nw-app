/**
 * 衣物查询
 * @author  wangjun
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import './ClothesQuery.css';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {show:false}
    };   
    render() {
        return (
            <Window title='衣物查询' onClose={this.props.closeView} width='901' height='623'>
            <div className='clothesquery'>
                <div className='clothesquery_top'>
                    <div>
                        <div>
                        <span>状态:</span><input/>
                        </div>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>

                
                </div>
                <div>已为您找到<label>24334</label>条数据</div>
                <div className='clothesquery_bottom'>


                </div>
            </div>
           
            </Window>
        )
    }
}