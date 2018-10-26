/**
 * 参数设置界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import Brand from './Brand';
import Lattice from './Lattice';
import Color from './Color';
import Defect from './Defect'
import AfterWashEstimates from './AfterWashEstimates'
import Grade from './Grade'
import Materials from './Materials'
import Type from './Type'
import Addition from './Addition'
import './ParameterSettings.css'
import {TabFields} from '../../UI/Tab';
export default class extends Component {   
    constructor(props) {
        super(props);     
        this.state={index:0};     
        this. handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.tab=['格架','品牌','颜色','瑕疵','洗后预估','档次','材料','处理类别','工艺加价'];
        this.views = [<Lattice />, <Brand />,<Color/>,<Defect/>,<AfterWashEstimates/>,<Grade/>,<Materials/>,<Type/>,<Addition/>];
    }; 
    handleClick(e){
        this.setState({index:e.target.dataset.index});
    }
    handleChange(obj) {
        this.setState({index:obj.index});
    }
    render() {   
        let tabs=this.tab.map((item,index)=>
                <span
                    key={'item'+index} 
                    data-index={index} 
                    className={this.state.index==index?'hover':null}
                    onClick={this.handleClick}
                >{item}</span>
        );
        return ( 
                <Window title='参数设置' onClose={this.props.closeView} padding={true}>   
                 <TabFields option={this.tab} checked={this.state.index} onChange={this.handleChange}>
                    {this.views[this.state.index]}
                </TabFields>
                    {/* <div className="Settings">
                       <div className="Settings-title">
                         {tabs}
                       </div>
                       <div className="Settings-div">
                           {'undefined' !== typeof this.views[this.state.index] && this.views[this.state.index]}
                          {/* <Brand /> */}
                          {/* <Lattice />
                       </div>
                    </div>                                                                                  */} 
                </Window> 
        );            
    };
}