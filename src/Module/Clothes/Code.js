/**
 * 衣物编码组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Dish from '../../UI/Dish';

const style = {color:'red',cursor:'default'};
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {data:tool.clone(this.props.data)};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClean = this.handleClean.bind(this);
        this.handleAllClean = this.handleAllClean.bind(this);
    }
    handleChange(e) {
        this.state.data[e.target.dataset.index].clothing_number = e.target.value;
        this.setState({data:this.state.data});
    }
    handleClean(e) {
        this.state.data[e.target.dataset.index].clothing_number = '';
        this.setState({data:this.state.data});
    }
    handleAllClean() {
        let len = this.state.data.length;
        for (let i = 0;i < len;++i) {
            this.state.data[i].clothing_number = '';
        }
        this.setState({data:this.state.data});
    }
    handleClick() {
        let len = this.state.data.length;
        for (let i = 0;i < len;++i) {
            if ('' == this.state.data[i].clothing_number) return tool.ui.warn({msg:'衣物编码不能为空',callback:close => close()});
        }
        'function' === typeof this.props.callback && this.props.callback(this.state.data);
    }
    render() {
        let html = this.state.data.map((obj, index) => {
            return (
                <div key={index}>
                    <div>{index + 1}</div>
                    <div>
                        <input type='text' className='e-input' value={obj.clothing_number} data-index={index} onChange={this.handleChange}/>
                        &emsp;
                        <span style={style} data-index={index} onClick={this.handleClean}>清空</span>                        
                    </div>
                </div>
            );
        });
        return(
            <Dish title='衣物编码' width='438' height='338' onClose={this.props.onClose}>
                <div className='clothes-code'>
                    <div><div>序号</div><div>衣物编码</div></div>
                    <div>{html}</div>
                </div>
                <div style={{textAlign:'right',marginRight:'26px'}}>
                    <button type='button' className='e-btn-b' onClick={this.handleAllClean}>全部清空</button>
                    &emsp;
                    <button type='button' className='e-btn' onClick={this.handleClick}>确定</button>
                </div>
            </Dish>
        );
    }
}