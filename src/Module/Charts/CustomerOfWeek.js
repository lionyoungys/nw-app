/**
 * 客流量统计（周）
 * @author Edwin Young
 */
import React from 'react';
import Highcharts from 'highcharts';

export default class extends React.Component {
    constructor(props) {super(props)}

    componentDidMount() {
        Highcharts.chart(this.container, {
            title: {text: '客流量统计（周）'},
            credits: {enabled: false},
            yAxis: {title: {text: ''}},
            xAxis: {categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']},
            tooltip: {pointFormat: '<b>{point.y}</b>'},
            series: [{
                type: 'column',
                colorByPoint: true,
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6],
                showInLegend: false
            }]
        });
    }

    render() {
        return (<div ref={container => this.container = container}></div>);
    }
}