/**
 * 新卡设定
 * @author  fanyerong
 */
import React, { Component } from 'react';
import './NewCardbinding.css';
import Window from '../../UI/Window';
export default class extends Component {
    constructor(props) {
        super(props);
    };   
    render() {
        return (            
            <Window title='换卡' onClose={() => this.setState({show:false})}></Window>
        );
    }
}