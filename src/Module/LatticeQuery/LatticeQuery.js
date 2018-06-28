/**
 * 格架查询
 * @author  ranchong
 */
import React, { Component } from 'react';
import './LatticeQuery.css';
import Window from '../../UI/Window';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            grid:[],
            index:0
        }
        this.handleclick=this.handleclick.bind(this);
    };
    componentDidMount() {
        api.post('grid', {token:'token'.getData()
    }, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({grid:res.result})
            }
        }
        );
    }
    handleclick(e){
        console.log(e.target.dataset.index || e.target.parentNode.dataset.index);
        this.setState({index:e.target.dataset.index || e.target.parentNode.dataset.index});
    }
    render() {
        let grid = this.state.grid.map((item,index)=>
        <tr key={'item'+index} data-index={index} onClick={this.handleclick }  
        id={this.state.index==index?'selecttr':null}
        >
                <td>{item.name}</td>
                <td>{item.start_number}</td>
                <td>{item.end_number}</td>
                <td>{item.max_number}</td>
                <td>{item.use_total}/{item.total}</td>
        </tr>
        );
        let use_detail;
        if(
            'undefined' !== typeof this.state.grid[this.state.index]
            && 
            'undefined' !== typeof this.state.grid[this.state.index].use_detail
        ) {
            use_detail = this.state.grid[this.state.index].use_detail.map((item,index)=>
          
                <span>{item.number}#{item.put_num}件</span>
                          
            );
        }
        return (
            <Window title='格架查询' onClose={this.props.closeView}>
               <div className="LatticeQuery-div">
                  <table>
                      <thead>
                          <tr>
                              <th>格架名称</th>
                              <th>首数</th>
                              <th>尾数</th>
                              <th>每衣挂号最大挂衣数</th>
                              <th>使用率</th>
                          </tr>
                      </thead>
                      <tbody>
                         {grid}
                      </tbody>
                  </table>         
               </div>
               <div className="LatticeQuery-Bdiv">
                    <ul>
                        <li>
                          {use_detail}
                         </li>
                    </ul> 
                </div>    
            </Window>
        );
    }
}