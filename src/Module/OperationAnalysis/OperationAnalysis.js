/**
 * 财务统计/营业分析页面
 * @author ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import Select from '../../UI/Select';
import './OperationAnalysis.css';

export default class extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <Window title='营业分析' onClose={this.props.closeView}>
                <div className="ope_ana_date">
                    <div className="ope_ana_date_left">
                        <div className='ope_ana_date_left_part'><span>&emsp;&emsp;年份选择：</span><Select option={['2018', '2017', '2016']} selected='' onChange={value => console.log(value)}/></div>
                        <div className='ope_ana_date_left_part'><span>&emsp;&emsp;月份选择：</span><Select option={['1月', '2月', '3月']} selected='' onChange={value => console.log(value)}/></div>
                    </div>
                     <button type='button' className='e-btn '>开始分析</button>
                </div>
                <div className='ope_ana_tab_part'>
                    <div className="store_management_tabbar">
                        <ul>
                            <li className='store_management_tab_selected'>月度营业额分析</li>
                            <li>消费构成分析</li>
                            <li>洗衣类型分析</li>
                            <li>月度预售分析</li> 
                            <li>客流量统计(周)</li>
                            <li>客流量统计(月)</li>
                        </ul>
                    </div>
                    <div className='oper_ana_content'>

                    </div>

                </div>
            </Window>
        );
    };
}