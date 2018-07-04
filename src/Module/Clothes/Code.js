/**
 * 衣物编码组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';

export default class extends Component {
    constructor(props) {
        super(props);
        let len = this.props.data.length
        ,   tempData = [];
        for (let i = 0;i < len;++i) {
            if (
                this.props.currentIndex == i 
                ||
                this.props.data[i].parent == this.props.data[this.props.currentIndex].DATATAG
            ) {
                tempData.push({index:i, number:this.props.data[i].clothing_number});
            }
        }
        this.state = {data:tempData};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(e) {
        this.state.data[e.target.dataset.index].number = e.target.value;
        this.setState({data:this.state.data});
    }
    handleClick() {
        let len = this.state.data.length;
        for (let i = 0;i < len;++i) {
            if ('' == this.state.data[i].number) return tool.ui.warn({msg:'衣物编码不能为空',callback:close => close()});
        }
        'function' === typeof this.props.callback && this.props.callback(this.state.data);
    }
    render() {
        let html = this.state.data.map((obj, index) => {
            return (
                <div key={'data' + index}>
                    <div>{index + 1}</div>
                    <div>
                        <input type='text' className='e-input' value={obj.number} data-index={index} onChange={this.handleChange}/>                        
                    </div>
                </div>
            );
        });
        return(
            <Window title='衣物编码' width='438' height='338' onClose={this.props.onClose}>
                <div className='clothes-code'>
                    <div><div>序号</div><div>衣物编码</div></div>
                    <div>{html}</div>
                </div>
                <div style={{textAlign:'right',marginRight:'26px'}}>
                    <button type='button' className='e-btn' onClick={this.handleClick}>确定</button>
                </div>
            </Window>
        );
    }
}