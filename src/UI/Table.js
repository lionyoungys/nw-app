/**
 * table组件
 * @author Edwin Young
 * @desc table    className:追加css类名;style:追加style样式;tableClassName:组件内部table追加css类名;tableStyle:组件内部table追加style样式;theme:table主题样式,默认default,为none时无任何主题;
 */

import React, {Component} from 'react';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {top:0, lineHeight:0, children:[]};
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize() {
        let nodes = this.refs.table.childNodes
        ,   len = nodes.length
        ,   node;
        if (len > 0) {
            for (let i = 0;i < len;++i) {
                if ('THEAD' === nodes[i].tagName || 'TBODY' === nodes[i].tagName) {
                    node = nodes[i].childNodes[0];
                    break;
                }
            }
            if ('object' === typeof node && 'TR' === node.tagName) {
                let tds = node.childNodes
                ,   tdLen = tds.length
                ,   children = [];
                for (let i = 0;i < tdLen;++i) {
                    children.push({
                        key: ('td_' + i), 
                        html: tds[i].innerHTML, 
                        style:{width:(tds[i].scrollWidth + 'px'), height:(tds[i].scrollHeight + 'px')}
                    });
                }
                this.setState({lineHeight:(node.offsetHeight + 'px'), children:children});
            }
        }
    }

    handleScroll(e) {
        e.persist();
        this.setState({top:(e.target.scrollTop + 'px')});
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
                <section style={{lineHeight:this.state.lineHeight, top:this.state.top}}>{html}</section>
                <table className={this.props.tableClassName} style={this.props.tableStyle} ref='table'>
                    {this.props.children}
                </table>
            </div>
        );
    }
}