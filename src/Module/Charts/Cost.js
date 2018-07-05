/**
 * 消费构成分析
 * @author Edwin Young
 */
import React from 'react';
import Highcharts from 'highcharts';

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            year: this.props.year || tool.date('Y'),
            month: this.props.month || tool.date('m')
        }
        this.setCharts = this.setCharts.bind(this);
    }
    componentDidMount() {
        let par = {
            token: 'token'.getData(),
            year: this.state.year,
            month: this.state.month.replace('月', ''),
        }
        console.log(par);
        api.post('payStructure', par, (res, ver, handle) => {
            if (ver && res) {
                console.log(res); 
                this.setCharts(res.result);
            }else{
                handle();
            }
        });
    }
    setCharts(result){
        Highcharts.chart(this.container, {
            title: { text: '消费构成分析' },
            credits: { enabled: false },
            tooltip: { pointFormat: '<b>{point.y}</b>' },
            series: [{
                type: 'pie',
                allowPointSelect: true,
                keys: ['name', 'y', 'selected', 'sliced'],
                data: [
                    ['现金消费', parseFloat(result.cash_amount || 0), false],
                    ['刷卡消费', parseFloat(result.card_amount || 0), false],
                    ['收券消费', parseFloat(result.ticket_amount || 0), false],
                    ['银行卡消费', parseFloat(result.bankCard_amount || 0), false],
                    ['微信消费', parseFloat(result.wechat_amount || 0), false],
                    ['支付宝消费', parseFloat(result.ali_amount || 0), false]
                ],
                showInLegend: true
            }]
        });
    }
    render() {
        return (<div ref={container => this.container = container}></div>);
    }
}