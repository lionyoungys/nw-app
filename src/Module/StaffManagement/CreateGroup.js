/**
 * 权限界面组件
 * @author wang jun & ranchong 
 */
import React from 'react';
import Window from '../../UI/Window';
import Menus from '../../Menus.js';
import './CreateGroup.css';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value:'', checked:(tool.isArray(this.props.checked) ? this.props.checked : [])};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleAllChecked = this.handleAllChecked.bind(this);
    }

    handleChange(e) {this.setState({value:e.target.value});}
    handleClick() {
        if ('' === this.state.value) {
            return tool.ui.error({msg: '组名称不能为空！', callback: close => close()});
        }
        if (this.state.checked.length < 1) {
            return tool.ui.error({msg: '权限不能为空！', callback: close => close()});
        }
        'function' === typeof this.props.callback && this.props.callback({value:this.state.value, checked:this.state.checked});
    }
    handleChecked(e) {
        let value = e.target.value
        ,   index = value.inArray(this.state.checked);
        if (-1 === index) {
            this.state.checked.push(value);
        } else {
            this.state.checked.splice(index, 1);
        }
        this.setState({checked:this.state.checked});
    }
    handleAllChecked(e) {
        let value = e.target.value
        ,   checked = e.target.checked
        ,   options = Menus[value].options
        ,   len = options.length
        ,   index;
        for (let i = 0;i < len;++i) {
            if (!isNaN(options[i].id)) {
                index = options[i].id.inArray(this.state.checked);
                if (checked) {
                    if (-1 === index) {
                        this.state.checked.push(options[i].id);
                    }
                } else if (-1 !== index) {
                    this.state.checked.splice(index, 1);
                }
            }
        }
        this.setState({checked:this.state.checked});
    }

    render() {
        let status = this.props.status || 1
        ,   html = Menus.map((object, index) => {
            let hasAllchecked = true
            ,   optionIndex
            ,   options = object.options.map(obj => {
                if (!isNaN(obj.id)) {
                    optionIndex = obj.id.inArray(this.state.checked);
                    if (-1 === optionIndex) {
                        hasAllchecked = false;
                    } 
                    return (
                        <div>
                            <input
                                type='checkbox' 
                                className='e-checkbox' 
                                value={obj.id} 
                                checked={-1 !== optionIndex}
                                onClick={this.handleChecked}
                            />&nbsp;&nbsp;{obj.value}
                        </div>
                    );
                }
            })
            return (
                <div key={object.key}>
                    <div data-index={index}>
                        <input type='checkbox' className='e-checkbox' checked={hasAllchecked} value={index} onClick={this.handleAllChecked}/>&nbsp;&nbsp;{object.value}
                    </div>
                    <section>{options}</section>
                </div>
            );
        });
        return (
            <Window title={1 == status ? '新增组' : '编辑组'} onClose={this.props.onClose}>
                <div className='create-group-head'>
                    <button type='button' className='e-btn' onClick={this.handleClick}>{1 == status ? '新增组' : '修改组'}</button>
                    <input type='text' className='e-input' value={this.state.value} onChange={this.handleChange}/>
                    <span>组名称：</span>
                </div>
                <div className='create-group-body'>{html}</div>
            </Window>
        );
    }
}