/**
 * 撤单处理界面
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import { WSAEINVALIDPROCTABLE } from 'constants';
import './Itsprocessing.css';

export default class extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            typeList: [],//类别数组
            comeinCloth: ['11111', '22222', '333333', '4444444', '555555', '666666', '7777777', '123221232', '22343322', '7789007', '6899976555'],//收进衣物
            returnCloth: ['5555543', '23445'],//赔退衣物
            cause: '',
        }
        this.searchOrder = this.searchOrder.bind(this);
        this.doCompensate = this.doCompensate.bind(this);
        this.handleAllArr = this.handleAllArr.bind(this);
        this.handlePartArr = this.handlePartArr.bind(this);              
    };  
    //查询订单
    searchOrder() {
        api.post('', { token: 'token'.getData() }, (res, ver, handle) => {
            console.log(res);
            if (ver && res) {

            } else {
                handle();
            }
        });
    }
    //点击确认（为处理完 暂时搁置）
    doCompensate() {
        // clothing_name   衣物名称
        // clothing_type  衣物类别
        // back_amount  退赔金额
        // user_mobile  用户电话
        // user_name   用户姓名
        api.post('doCompensate',
            { token: 'token'.getData(), cause: this.state.cause, feedback: this.state.feedback, back_type: '现金退款' },
            (res, ver, handle) => {
                console.log(res);
                handle();
            });
    }
    //点击了尖号 1 全部右移 2全部左移
    handleAllArr(index) {
        console.log('点击了片区' + index);
        if (index == 1) {
            if (this.state.comeinCloth.length == 0) return;
            this.setState({ returnCloth: this.state.returnCloth.concat(this.state.comeinCloth), comeinCloth: [] });
        } else {
            if (this.state.returnCloth.length == 0) return;
            this.setState({ comeinCloth: this.state.comeinCloth.concat(this.state.returnCloth), returnCloth: [] });
        }
        // console.log(this.state.comeinCloth);
        // console.log(this.state.returnCloth);
    }
    //点击了 1 左侧某个 2右侧某个
    handlePartArr(index, cellIndex) {
        console.log('点击了左右侧' + index + '-' + cellIndex);
        if (index == 1) {
            this.state.returnCloth.push(this.state.comeinCloth[cellIndex]);
            this.state.comeinCloth.splice(cellIndex, 1);
            this.setState({ returnCloth: this.state.returnCloth, comeinCloth: this.state.comeinCloth });
        } else {
            this.state.comeinCloth.push(this.state.returnCloth[cellIndex]);
            this.state.returnCloth.splice(cellIndex, 1);
            this.setState({ comeinCloth: this.state.comeinCloth, returnCloth: this.state.returnCloth });
        }

    }  
    render() {
        var list_left = this.state.comeinCloth.map((item, index) =>
            <div className="itsproce-click" onClick={() => this.handlePartArr(1, index)} key={'item' + index}>
                <span>{item}</span>
                <span>人造毛衣</span>
                <span>蓝色</span>
                <span>0</span>
            </div>
        )
        var list_right = this.state.returnCloth.map((item, index) =>
            <div onClick={() => this.handlePartArr(2, index)} key={'item' + index}>
                <span>{item}</span>
                <span>人造毛衣</span>
                <span>蓝色</span>
                <span>0</span>
            </div>
        )
       return (             
            <Window title='撤单处理' onClose={this.props.closeView} width="630" height="510">   
                <div className="Deliverywarning-title Itsprocessing-title">
                  <span>衣物编码:</span>
                  <input type="text" className='e-input its-pro-input'/> 
                   <button className="e-btn" onClick={this.searchOrder}>查询</button>
                   <button className="e-btn" onClick={this.doCompensate}>确定</button>
                   <button className="e-btn" onClick={this.props.closeView}>退出</button>
                </div>  
                <div className="Itsprocessing-count">
                   <div className="Itsprocessing-count-left">
                       <div className="Itsprocessing-count-title">收进衣物</div>
                       <div className="Itsprocessing-count-take">
                           {list_left}                        
                       </div>                      
                    </div>
                    <div className="Itsprocessing-count-transfer">
                       <span onClick={() => this.handleAllArr(1)}></span>
                       <span onClick={() => this.handleAllArr(2)}></span>
                    </div>
                    <div className="Itsprocessing-count-left  Itsprocessing-count-right">
                       <div className="Itsprocessing-count-title">待退衣物</div>
                       <div className="Itsprocessing-count-take">
                           {list_right}                         
                       </div>                       
                    </div>
                </div> 
                <div className="Itsprocessing-footer">
                    <div className="Itsprocessing-footer-title">退单原因</div>
                    <textarea className="Itsprocessing-footer-text" onChange={value => this.setState({ cause: value })}></textarea>
                </div> 
            </Window> 
           
        );
    }
}