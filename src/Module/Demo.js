/**
 * Demo组件
 * @author Edwin Young
 */

import React from 'react';
import Window from '../UI/Window';
import {Table} from '../UI/Table';
import LayerBox from '../UI/LayerBox';
import SelectSearch from '../UI/SelectSearch';
import Select from '../UI/Select';
import Page from '../UI/Page';
import {UpdateCard} from '../UI/Payment';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Window title='测试窗口' onClose={this.props.closeView} width='600' height='600'>
                <button type='button' className='e-btn'>样式1</button>&nbsp;
                <button type='button' className='e-btn' readOnly>样式1只读</button>&nbsp;
                <button type='button' className='e-btn-b'>样式2</button><br/>
                <input type='checkbox' className='e-checkbox' value='111' onClick={e => console.log(e.target)}/> 你好 <br/>
                <input type='radio' className='e-radio' value='222' name='r'/> 你好 &emsp;
                <input type='radio' className='e-radio' value='333' name='r'/> 不好 <br/>
                <input type='text' className='e-input' placeholder='输入内容'/><br/>
           </Window>
        );
    }
}