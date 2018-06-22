/**
 * 消费构成分析
 * @author Edwin Young
 */
import React from 'react';
import Highcharts from 'highcharts';

export default class extends React.Component {
    constructor(props) {super(props)}

    componentDidMount() {
        Highcharts.chart(this.container, {
            title: {text: '消费构成分析'},
            credits: {enabled: false},
            tooltip: {pointFormat: '<b>{point.y}</b>'},
            series: [{
                type: 'pie',
                allowPointSelect: true,
                keys: ['name', 'y', 'selected', 'sliced'],
                data: [
                    ['现金消费', 29.9, false],
                    ['刷卡消费', 71.5, false],
                    ['收券消费', 106.4, false],
                    ['银行卡消费', 129.2, false]
                ],
                showInLegend: true
            }]
        });
    }
    render() {
        return (<div ref={container => this.container = container}></div>);
    }
}