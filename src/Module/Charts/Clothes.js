/**
 * 洗衣类型分析
 * @author Edwin Young
 */
import React from 'react';
import Highcharts from 'highcharts';

export default class extends React.Component {
    constructor(props) {super(props)}

    componentDidMount() {
        Highcharts.chart(this.container, {
            title: {text: '洗衣类型分析'},
            credits: {enabled: false},
            tooltip: {pointFormat: '<b>{point.y}</b>'},
            series: [{
                type: 'pie',
                allowPointSelect: true,
                keys: ['name', 'y', 'selected', 'sliced'],
                data: [
                    ['干洗', 29.9, false],
                    ['水洗', 71.5, false],
                    ['皮衣处理', 106.4, false],
                    ['单烫', 129.2, false],
                    ['C6', 144.0, false],
                    ['其他', 176.0, false]
                ],
                showInLegend: true
            }]
        });
    }
    render() {
        return (
            <div ref={container => this.container = container}></div>
        );
    }
}