/**
 * tab组件
 * @author Edwin Young
 * @desc tab栏    option:[]
 */

import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        let node = e.target;
        'function' === typeof this.props.onChange && this.props.onChange(node.dataset.i, node.innerText);
    }

    render() {
        return (
            <div className='ui-tab' style={this.props.style}>
                {(this.props.option || []).map(
                    (obj, i) => <span key={obj + i} data-i={i} className={this.props.checked == i ? 'checked' : null} onClick={this.handleClick}>{obj}</span>
                )}
            </div>
        );
    }
}