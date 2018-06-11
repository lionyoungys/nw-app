/**
 * 价格设置
 * @author  wangjun
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import CleaningPriceSetting from './CleaningPriceSetting'
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={index:0};
        this.tab=['会员卡','洗护服务','库存商品'];
        this.views=[<CleaningPriceSetting/>,<CleaningPriceSetting/>];
        this.handleClick=this.handleClick.bind(this);
    };  
    handleClick(e){
        this.setState({index:e.target.dataset.index});
    } 
    render() {
        let tabs=this.tab.map((item,index)=>
        <li
            key={item} 
            data-index={index} 
            className={this.state.index==index?'store_management_tab_selected':null}
            onClick={this.handleClick}
        >{item}</li>
    );
        return (
            <div>
                  <Window title='价格设置' onClose={this.props.closeView}>
                <div className='store_management'>
                    <div className="store_management_tabbar">
                        <ul>
                           {tabs}
                        </ul>
                    </div>
                    <div >
                        {this.views[1]}
                      </div>
                     
                    </div>
                </Window>
            </div>
        );
    }
}