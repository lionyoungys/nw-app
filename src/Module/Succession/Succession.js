/**
 * 交班界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import './Succession.css'

export default class extends Component {   
    constructor(props) {
        super(props);
        this.state = {           
            list:[{}],
            starttime:'',
            endtime:'',
            mlist:[{}]
        };    
        this.successionHandle = this.successionHandle.bind(this);        
    }; 
    // 获取数据
    componentDidMount(){
        api.post('succession1', {token: 'token'.getData() }, (res, ver,handle) => {
            console.log(res);
            if (ver && res) {  
                this.setState({
                    list:res.result.info,
                    starttime:res.result.dateStartTime,
                    endtime:res.result.dateEndTime,
                    mlist:res.result.info
                });              
            } else {
                handle();
            }
        });       
    }
    // 交班网络请求
     successionHandle() {
         api.post('successionHandle', {token: 'token'.getData() }, (res, ver, handle) => {
             console.log(res);
             handle();
                if (ver && res) {  
                                  
                }else {
                    handle();
                }                          
                if (ver) {
                    
                   let arrr = [{}];
                   arrr.push({name:'收银类型', amount:'金额', real_amount:'实收额', count:'衣物数量'})
                   for(let k in this.state.mlist){
                       arrr.push({name:this.state.mlist[k].name,amount:this.state.mlist[k].amount,real_amount:this.state.mlist[k].real_amount,count:this.state.mlist[k].work_number})
                   }
                   console.log({data:JSON.stringify(arrr), start:this.state.starttime, end:this.state.endtime});
                   EventApi.print('shift', {data:JSON.stringify(arrr), start:this.state.starttime, end:this.state.endtime}, 'printer'.getData());
                }
           });
     }
    render() {
        var arr = this.state.list.map((item,index) =><tr>
          <td>{item.name}</td>
          <td>{item.amount}</td>
          <td>{item.real_amount}</td>
          <td>{item.work_number}</td>         
        </tr>
        )
          
        
        return (
            <Window title='交班' onClose={this.props.closeView}>
                <div className="ope-inc-head">
                    <a>统计时间：{this.state.starttime} 至 {this.state.endtime}</a>
                    <button className='e-btn' onClick={this.successionHandle}>交班</button>
                    <a>操作员：{'aname'.getData()}</a>
                </div>
                <table className='ui-table-base succession-tab'>
                    <thead>
                        <tr>
                            <td>收银类型</td>
                            <td>金额</td>
                            <td>实收金额</td>
                            <td>衣物数量</td>
                        </tr>
                    </thead>
                    <tbody>
                        {arr}                        
                    </tbody>
                </table>  
            </Window>

       );
    }
}