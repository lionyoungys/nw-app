/**
 * 取消原因弹窗组件
 * @author yangyunlong
 */
import React from 'react';
import Window from '../../../UI/Window';
import Checkbox from '../checkbox/App';
import './App.css';


//多选弹出框    show=true/false是否展示 title=标题 btnValue=按钮内容 多选数据 data=[{key:key,value:value}] onCloseRequest(),onConfirmRequest([value])
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked:[],
            details:[],
            show:this.props.show,
        };
        this.onCloseRequest = this.onCloseRequest.bind(this);
        this.onConfirmRequest = this.onConfirmRequest.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }
    onCloseRequest() {
        this.setState({
            checked:[],
            details:[],            
        });
        this.props.onCloseRequest();
    }
    onConfirmRequest() {
        if (this.state.checked.length > 0) {
            this.props.onConfirmRequest(this.state.checked, this.state.details);
            this.setState({
                checked:[],
                details:[],
                show:false,
            });
        }
    }
    handleClick(object, isChecked) {
        let checked = this.state.checked,
            details = this.state.details;
        if (isChecked) {    //判断是否选中状态
            let index = object.value.inArray(checked);
            checked.splice(index,1);    //清除选中
            details.splice(index,1);
            
        } else {
            checked.push(object.value);    //添加选中
            details.push(object);
        }
        this.setState({checked:checked,details:details});
    }
    render() {
        if (!this.props.show) return null;
        let options = this.props.data.map((obj) => 
            <div key={obj.key}>
                <Checkbox value={obj} onClick={this.handleClick} checked={-1 !== obj.key.inArray(this.state.details, 'key')}>{obj.value}</Checkbox>
            </div>
        );
        return (
            <div>
                <Window  onClose={this.props.closeView}  title='取消原因' width='340' height='260'>
                    <div className='m-layer-bg'>
                        <div className='cancel-toast'>                           
                            <div>{options}</div>
                            <div>
                                <input 
                                    type='button' 
                                    value={this.props.btnValue} 
                                    onClick={this.onConfirmRequest} 
                                    className='e-btn'                                   
                                />
                            </div>
                        </div>
                    </div>
                </Window>
            </div>
        );
    }
}