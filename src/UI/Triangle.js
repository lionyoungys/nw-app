/**
 * triangle组件
 * @author Edwin Young
 * @desc 三角 w:18px;h:9px;
 */

import React, {Component} from 'react';
export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span 
                className={'ui-triangle' + (this.props.down ? '-down' : '') + ('string' === typeof this.props.className ? (' ' + this.props.className) : '')}
                style={this.props.style}
            ><i></i><i></i></span>
        );
    }
}