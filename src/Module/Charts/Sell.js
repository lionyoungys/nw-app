/**
 * 月度预售分析
 * @author Edwin Young
 */
import React from 'react';
import Highcharts from 'highcharts';

export default class extends React.Component {
    constructor(props) {super(props)}

    componentDidMount() {
        Highcharts.chart(this.container, {
            title: {text: '月度预售分析'},
            credits: {enabled: false},
            yAxis: {title: {text: ''}},
            xAxis: {categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']},
            tooltip: {pointFormat: '<b>{point.y}</b>'},
            series: [{
                name: '售卡',
                color: '#00c000',
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            }, {
                name: '刷卡充值',
                color: '#ff00ff',
                data: [29.9, 18, 100, 129.2, 50, 176.0, 33, 148.5, 216.4, 88, 95.6, 54.4]
            }, {
                name: '刷卡',
                color: '#ff4040',
                data: [100, 71.5, 106.4, 77, 144.0, 176.0, 55, 148.5, 216.4, 80, 95.6, 62]
            }],
        });
    }

    render() {
        return (<div ref={container => this.container = container}></div>);
    }
}