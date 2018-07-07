/**
 * 商品销售界面
 * @author  fanyerong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import MathUI from '../../UI/MathUI';
import './Commoditysales.css';

export default class extends Component {
    constructor(props) {
        super(props);  
        this.state={
            index:0,
            list: [],//所有数据
            allComList: [],//所有商品的数组
            searchList: [],
            searchNum:'',//搜索的商品编号
        };
        this.handleClick = this.handleClick.bind(this);
        this.query = this.query.bind(this);
        this.deleteYes = this.deleteYes.bind(this);
        this.add = this.add.bind(this);
        this.sub = this.sub.bind(this);                  
    };
    //进入页面获取数据
    componentDidMount(){
        let done;
        tool.ui.loading(handle => done = handle);
        console.log('申请库存商品');
        api.post('goodsList', {
            token: 'token'.getData(),
            page: 1,
            limit: 1000,
        }, (res, ver, handle) => {
            console.log('申请数据');
            done();
            if (ver && res) {
                console.log(res)
                let arr = [];
                for (let index = 0; index < res.result.length; index++) {
                    console.log(res.result[index].goods);
                    if (res.result[index].goods.length > 0) {
                       arr = arr.concat(res.result[index].goods);  
                    }  
                }
                //数据处理
                this.setState({ list: res.result, allComList: arr})
            } else {
                handle();
            }
        }, () => done());
    }
    query(e){

        if (this.state.searchNum.length == 0) return tool.ui.error({
            title: '提示', msg: '商品编号不能为空', button: '确定', callback: (close, event) => {
                close();
            }
        });
        if (this.state.list.length == 0) return tool.ui.error({
            title: '提示', msg: '商品分类为空，需要刷新页面！', button: '确定', callback: (close, event) => {
                this.componentDidMount();
                close();
            }
        });
        let id = this.state.searchNum;
        let sel_index = id.inObjArray(this.state.allComList, 'id');
        if (sel_index == -1) return tool.ui.error({
            title: '提示', msg: '商品不在库中', button: '确定', callback: (close, event) => {
                close();
            }
        });//没有在数组中
        //从大数组找出具体数据
        let search = this.state.allComList[sel_index];
        let handleList = this.state.searchList;
        let exit = false;
        if (handleList.length > 0) {
            for (let index = 0; index < handleList.length; index++) {
                if (search.id == handleList[index].id) {
                    exit = true;
                    handleList[index].count += 1;
                }
            }
        }
        if (!exit) {//不存在
            search.count =1;
            handleList.push(search);
        }
        this.setState({ searchList: handleList });
    }
    //删除
    deleteYes(e){
        let index = e.target.dataset.index;
        let handleList = this.state.searchList;
        handleList.splice(index,1);
        this.setState({ searchList: handleList });
        console.log(this.state.searchList); 
    }
    //增加
    add(index) {
        this.state.searchList[index].count +=1;
        this.setState({ searchList: this.state.searchList });
        console.log(this.state.searchList); 
    }
    //减少
    sub(index) {

        let count = this.state.searchList[index].count;
        if (count > 1) {
            this.state.searchList[index].count -=1; 
            this.setState({ searchList: this.state.searchList });
        }
        console.log(this.state.searchList);
    }
    handleClick (e){
        this.setState({index:e.target.dataset.index});
    }
    render() {  
       
        let tabs=this.state.list.map((item,index)=>
                <span key={'item'+index} data-index={index} 
                    className={this.state.index==index?'commoditysales-left-hover':null}
                    onClick={this.handleClick}
                >{item.name}</span>
        );  
        let itemList;
        if (
            'undefined' !== typeof this.state.list[this.state.index]
            &&
            'undefined' !== typeof this.state.list[this.state.index].goods
        ) {
            itemList = this.state.list[this.state.index].goods.map((item, index) =>
                <tr key={'item' + index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.has_discount == '1' ? '90%' : '100%'}</td>
                    <td>{item.stock}</td>
                    <td>{item.price}</td>
                </tr>
            );
        }  
        let searchList = this.state.searchList.map((item, index) =>
            <tr key={'item' + index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.has_discount == '1' ? '90%' : '100%'}</td>
                <td>{item.price}</td>
                <td><MathUI  param={index} onSub={this.sub} onAdd={this.add}>{item.count}</MathUI ></td>
                <td data-index={index} onClick={this.deleteYes}>删除</td>
            </tr> 
        );         
        return (       
            <Window title='商品销售' onClose={this.props.closeView}>
               <div className="commoditysales-div">                 
                  <div className="commoditysales-div-right">                     
                      <div className="commoditysales-right-tab">
                         <table>
                             <thead>
                                 <tr>
                                     <th>商品编码</th>
                                     <th>商品名称</th>
                                     <th>折扣率</th>
                                     <th>单价</th>
                                     <th>数量</th>
                                     <th>操作</th>
                                 </tr>
                             </thead>
                             <tbody>
                                {searchList}
                             </tbody>
                         </table>
                      </div>
                  </div>
               </div> 
               <div className="commoditysales-footerdiv">
                    <div className="commoditysales-right-top">
                        <button className="e-btn commoditysales-right-btn" onClick = {this.query}>查询</button>
                        <input type="text" className="commoditysales-right-text" placeholder="请输入/扫描商品编码" onChange={e =>this.setState({searchNum:e.target.value})}/>
                    </div>
                   <div className="commoditysales-div-left">
                      <div className="commoditysales-left-title">商品分类</div>
                      <div className="commoditysales-left-count">
                         {tabs}
                      </div>
                    </div>
                    <div className="commoditysales-footerdiv-left">
                        <table>
                            <thead>
                                <tr>
                                    <th>商品编号</th>
                                    <th>商品名称</th>
                                    <th>折扣率</th>
                                    <th>库存</th>
                                    <th>单价</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemList}
                            </tbody>
                        </table>
                    </div>  
                    <div className="commoditysales-footerdiv-right">
                        <div className="commoditysales-footerdiv-rightboth">总金额: ￥89.00</div>
                        <div className="commoditysales-footerdiv-rightboth">折扣率: 5%</div>
                        <div className="commoditysales-footerdiv-rightboth">总件数: 89</div>
                        <div className="commoditysales-footerdiv-rightboth commoditysales-footerdiv-rightred">折后价: ￥89.00</div>                    
                        <div className="commoditysales-footerdiv-rightboth">
                            <button type='button' className='e-btn middle high'>收款</button>
                        </div>
                        <div className="commoditysales-button">
                            <button type='button' className='e-btn' >开钱箱</button>&nbsp;
                            <button type='button' className='e-btn' >充值</button>&nbsp;
                            <button type='button' className='e-btn' >卡扣款</button>
                        </div>                  
                    </div>                           
               </div>                           
            </Window>  
        );
    }
}
