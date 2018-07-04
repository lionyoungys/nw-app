/**
 * 财务统计/营业分析页面
 * @author ranchong && Edwin Young
 */
import React from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import Amount from './Amount';
import Cost from './Cost';
import Clothes from './Clothes';
import Sell from './Sell';
import CustomerOfWeek from './CustomerOfWeek';
import CustomerOfMonth from './CustomerOfMonth';
import './App.css';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.months = ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'];
        this.router = {Amount:Amount, Cost:Cost, Clothes:Clothes, Sell:Sell, CustomerOfWeek:CustomerOfWeek, CustomerOfMonth:CustomerOfMonth};
        this.curremtY= tool.date('Y');
        this.state = { 
            index: 0, 
            key: 'Amount', 
            year: tool.date('Y'),
            month: tool.date('m') + '月',
        };
        this.handleClick = this.handleClick.bind(this);
    };
    handleClick(e) {
        let index = e.target.dataset.index
        ,   key = e.target.dataset.key;
        this.state.index != index && this.state.key != key && this.setState({index:index, key:key});
    }
    render() {
        let V = this.router[this.state.key];
        return (
            <Window title='营业分析' onClose={this.props.closeView}>
                <div className="ope_ana_date">
                    <div className="ope_ana_date_left">
                        <div className='ope_ana_date_left_part'>
                            <span>&emsp;&emsp;年份选择：</span>
                            <Select option={[this.curremtY, this.curremtY - 1, this.curremtY - 2]}  onChange={value => this.setState({year:value})}/>
                        </div>
                        <div className='ope_ana_date_left_part'>
                            <span>&emsp;&emsp;月份选择：</span>
                            <Select option={this.months} selected= {this.state.month} onChange={value => this.setState({month:value})}/>
                        </div>
                    </div>
                    <button type='button' className='e-btn'>开始分析</button>
                </div>
                <div className='ope_ana_tab_part'>
                    <div className="store_management_tabbar">
                        <ul style={{cursor:'default'}}>
                            <li
                                className={0 == this.state.index ? 'store_management_tab_selected' : null} 
                                onClick={this.handleClick} data-index='0' 
                                data-key='Amount'
                            >月度营业额分析</li>
                            <li 
                                className={1 == this.state.index ? 'store_management_tab_selected' : null} 
                                onClick={this.handleClick} 
                                data-index='1'
                                data-key='Cost'
                            >消费构成分析</li>
                            <li 
                                className={2 == this.state.index ? 'store_management_tab_selected' : null} 
                                onClick={this.handleClick} 
                                data-index='2'
                                data-key='Clothes'
                            >洗衣类型分析</li>
                            <li 
                                className={3 == this.state.index ? 'store_management_tab_selected' : null} 
                                onClick={this.handleClick} 
                                data-index='3'
                                data-key='Sell'
                            >月度预售分析</li> 
                            <li 
                                className={4 == this.state.index ? 'store_management_tab_selected' : null} 
                                onClick={this.handleClick} 
                                data-index='4'
                                data-key='CustomerOfWeek'
                            >客流量统计(周)</li>
                            <li 
                                className={5 == this.state.index ? 'store_management_tab_selected' : null} 
                                onClick={this.handleClick} 
                                data-index='5'
                                data-key='CustomerOfMonth'
                            >客流量统计(月)</li>
                        </ul>
                    </div>
                    <V year={this.state.year} month={this.state.month}/>
                </div>
            </Window>
        );
    };
}