/**
 * 价格设置
 * @author  wangjun & Edwin Young
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import CleaningPriceSetting from './CleaningPriceSetting'
import MemberCard from './MemberCard'
import FinishedGoods from './FinishedGoods'
import {TabFields} from '../../UI/Tab';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={index:0};
        this.tab=['会员卡','洗护服务','库存商品'];
        this.views=[<MemberCard/>, <CleaningPriceSetting/>, <FinishedGoods/>];
        this.handleChange = this.handleChange.bind(this);
    };  
    handleChange(obj) {
        this.setState({index:obj.index});
    }
    render() {
        return (
            <Window title='价格设置' onClose={this.props.closeView} padding={true}>
                <TabFields option={this.tab} checked={this.state.index} onChange={this.handleChange} style={{padding:'30px 10px 10px', height:'100%'}}>
                    {this.views[this.state.index]}
                </TabFields>
            </Window>
        );
    }
}