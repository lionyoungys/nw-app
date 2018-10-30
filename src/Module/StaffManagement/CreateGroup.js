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
        this.state = {value:'', checked:[]};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }

    handleChange(e) {this.setState({value:e.target.value});}
    handleClick() {

    }
    handleChecked() {

    }

    render() {
        let status = this.props.status || 1
        ,   html = Menus.map((object, index) => 
                <div key={object.key}>
                   <div data-index={index}>{object.value}</div>
                   <section>
                       {object.options.map(obj => {
                           if (!isNaN(obj.id)) {
                                return (
                                    <div>
                                        <input
                                            type='checkbox' 
                                            className='e-checkbox' 
                                            value={obj.id} 
                                            checked={-1 !== obj.id.inArray(this.state.checked)}
                                            onClick={this.handleChecked}
                                        />{obj.value}
                                    </div>
                                );
                            }
                       })}
                   </section>
                </div>
            );
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