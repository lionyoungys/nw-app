/**
 * 收衣界面组件
 * @author Edwin Young
 */

import React, {Component} from 'react';

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button type='button' className='e-btn'>确认</button>
                <button type='button' className='e-btn' readOnly>取消</button>
            </div>
        );
    }
}