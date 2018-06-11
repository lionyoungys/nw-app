/**
 * 上挂详情
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import './Hangon.css'

export default class extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        var arr = ['衣物编码','名称','材料','档次','品牌','颜色','瑕疵','洗后预估','衣挂号','交活定期','状态'].map((item,index) =><span key={index} >{item}</span>);
        var count = ['xxxxxx','围巾','丝绸','高档','香奈儿','红色',,'--','--','丝绒格架-01','2018-2-1 已过期一天','--'].map((item,index) =><span key={index} >{item}</span>);
        return (
            <Window title='上挂详情' onClose={this.props.closeView} width='567' height='382'>
                <div className="Hangon-left">
                   <div className="Hangon-left-title">
                      {arr}
                   </div>
                   <div className="Hangon-left-count">
                     {count}
                   </div>
                </div>
                <div className="Hangon-right"></div>
            </Window>
           
        );
    }
}