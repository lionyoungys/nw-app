/**
 * 参数设置界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Brand from './brand';
import bothpages from '../../UI/bothpages.css';
import './ParameterSettings.css'

export default class extends Component {   
    constructor(props) {
        super(props);           
    }; 
    render() {      
        return ( 
                <Window title='参数设置' onClose={this.props.closeView}>   
                    <div className="Settings">
                       <div className="Settings-title">
                          <span>流程</span>
                          <span>格架</span>
                          <span>品牌</span>
                          <span>颜色</span>
                          <span>瑕疵</span>
                          <span>洗后预估</span>
                          <span>档次</span>
                          <span>材料</span>
                          <span>处理类别</span>
                          <span>工艺加价</span>
                          <span>包类别</span>
                       </div>
                       <div className="Settings-div">
                          <Brand />
                       </div>
                    </div>                                                                                 
                </Window> 
        );            
    };
}