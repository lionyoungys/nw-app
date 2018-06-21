/**
 * 关于速洗达
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import './aboutsnl.css';

export default class extends Component {   
    constructor(props) {
        super(props);           
    }; 
    render() {
        return
        (
            <div>
                <Window title='关于速洗达' onClose={this.props.closeView} width='347' height='293'>  
                    <div className="aboutsnl-div">当前版本: 速洗达商家版3.0.1</div>
                </Window>  
            </div>
        )
    }
}