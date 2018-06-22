/**
 * 月度营业额分析
 * @author Edwin Young
 */
import React from 'react';
import Highcharts from 'highcharts';

export default class extends React.Component {
    constructor(props) {super(props)}

    componentDidMount() {
        Highcharts.chart(this.container, {
            title: {text: '月度营业额分析'},
            credits: {enabled: false},
            yAxis: {title: {text: ''}},
            xAxis: {categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']},
            tooltip: {pointFormat: '<b>{point.y}</b>'},
            series: [{
                type: 'column',
                colorByPoint: true,
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                showInLegend: false
            }],
        });
    }

    render() {
        return (<div ref={container => this.container = container}></div>);
    }
}