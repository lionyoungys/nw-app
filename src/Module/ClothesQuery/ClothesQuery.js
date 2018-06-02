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
                    <div className='clothesinline'>
                    <div >
                        <div>
                        <span>状态:</span><input type='text'/>
                        </div> 
                        <div>
                        <span>姓名:</span><input type='text'/>
                        </div>
                        <div>
                        <span>衣物名称:</span><input type='text'/>
                        </div>
                    </div>
                    <div>
                       <div>
                        <span>流水号:</span><input type='text'/>
                        </div> 
                        <div>
                        <span>卡号:</span><input type='text'/>
                        </div>
                        <div>
                        <span>颜色:</span><input type='text'/>
                        </div>
                    </div>
                    <div >
                        <div>
                         <span>收衣时间:</span><input type='text'/>
                        </div> 
                        <div>
                        <span>电话:</span><input type='text'/>
                        </div>
                        <div>
                        <span>格架号:</span><input type='text'/>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
                <div>已为您找到<label>24334</label>条数据</div>
                <div className='clothesquery_bottom'>
            </div>
           
            </Window>
        )
    }
}