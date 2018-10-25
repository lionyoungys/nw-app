/**
 * tab组件
 * @author Edwin Young
 * @desc tab栏    option:[]; style:样式;checked:选中tab
 */

import React, {Component} from 'react';
export default class extends Component {
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
                    (obj, i) => <span key={tool.UUID()} data-i={i} className={this.props.checked == i ? 'checked' : null} onClick={this.handleClick}>{obj}</span>
                )}
            </div>
        );
    }
}

export class BlueTab extends Component {
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
            <div className='ui-tab-blue' style={this.props.style}>
               {(this.props.tabs || []).map(
                   (obj,i) => <span key={tool.UUID()} data-i={i} className={this.props.checked == i ? 'checked' : null} onClick={this.handleClick}>{obj}</span>
               )}
               {this.props.children}
            </div>
        );
     }
}

/**
 * 360度无死角边框环绕tab
 */
export class TabFields extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        let node = e.target;
        'function' === typeof this.props.onChange && this.props.onChange({value:node.innerText, index:node.dataset.i});
    }

    render() {
        return (
            <div className={'ui-tab-fields' + ('string' === typeof this.props.className ? (' ' + this.props.className) : '')} style={this.props.style}>
                <nav>
                    {(this.props.option || []).map(
                        (obj, i) => <span key={tool.UUID()} data-i={i} className={this.props.checked == i ? 'checked' : null} onClick={this.handleClick}>{obj}</span>
                    )}
                </nav>
                {this.props.children}
            </div>
        );
    }
}