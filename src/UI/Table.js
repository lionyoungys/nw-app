/**
 * table组件
 * @author Edwin Young
 * @desc table    className:追加css类名;style:追加style样式;tableClassName:组件内部table追加css类名;tableStyle:组件内部table追加style样式;theme:table主题样式,默认default,为none时无任何主题;
 */

import React, {Component} from 'react';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {top:0, lineHeight:0, width:0, children:[]};
        this.handleResize = this.handleResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.node = null;
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        let nodes = this.refs.table.childNodes
        ,   len = nodes.length;
        if (len > 0) {
            if (null === this.node) {
                for (let i = 0;i < len;++i) {
                    if ('THEAD' === nodes[i].tagName || 'TBODY' === nodes[i].tagName) {
                        this.node = nodes[i].childNodes[0];
                        break;
                    }
                }
            }
            if (null !== this.node && 'TR' === this.node.tagName) {
                let tds = this.node.childNodes
                ,   tdLen = tds.length
                ,   children = [];
                for (let i = 0;i < tdLen;++i) {
                    children.push({
                        key: ('td_' + i), 
                        html: tds[i].innerHTML, 
                        style:{width:(tds[i].scrollWidth + 'px'), height:(tds[i].scrollHeight + 'px')}
                    });
                }
                this.setState({lineHeight:(this.node.offsetHeight - 1 + 'px'), width:(this.node.scrollWidth + 'px'), children:children});
            }
        }
    }

    handleScroll(e) {
        e.persist();
        let top = e.target.scrollTop;
        if (top > 0 && 0 === this.state.top) {
            this.handleResize();
        }
        this.setState({top:e.target.scrollTop});
    }

    render() {
        let html = this.state.children.map(obj => <div style={obj.style} key={obj.key}>{obj.html}</div>)
        ,   theme = this.props.theme
        ,   className = 'ui-table';
        if ('string' === typeof theme) {
            if ('none' !== theme) {
                className += (' ui-table-' + theme);
            }
        } else {
            className += ' ui-table-default';
        }
        if ('string' === typeof this.props.className) {
            className += (' ' + this.props.className);
        }
        return (
            <div className={className} style={this.props.style} onScroll={this.handleScroll}>
                <section
                    style={{
                        lineHeight:this.state.lineHeight, 
                        width:this.state.width, 
                        top:(this.state.top + 'px'),
                        display:(0 === this.state.top ? 'none' : null)
                    }}
                >{html}</section>
                <table className={this.props.tableClassName} style={this.props.tableStyle} ref='table'>
                    {this.props.children}
                </table>
            </div>
        );
    }
}