/**
 * table组件
 * @author Edwin Young
 * @desc table
 */

import React, {Component} from 'react';
export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='ui-table'>
                <table className={this.props.className} style={this.props.style}>
                    {this.props.children}
                </table>
            </div>
        );
    }
}