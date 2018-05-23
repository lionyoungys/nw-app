/**
 * 表格组件
 * @author Edwin Young
 * @desc 界面弹出层  title:标题;onClose:关闭事件;children:内部内容
 */

import React from 'react';

export class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table className={`ui-table${this.props.border ? ' border' : ''}${this.props.full ? ' ui-full-table' : ''}`}>
                <thead><tr><th>1</th><th>2</th><th>3</th></tr></thead>
                <tbody>
                    <tr><td>1</td><td>2</td><td>3</td></tr>
                    <tr><td>1</td><td>2</td><td>3</td></tr>
                    <tr><td>1</td><td>2</td><td>3</td></tr>
                    <tr><td>1</td><td>2</td><td>3</td></tr>
                    <tr><td>1</td><td>2</td><td>3</td></tr>
                    <tr><td>1</td><td>2</td><td>3</td></tr>
                    <tr><td>1</td><td>2</td><td>3</td></tr>
                </tbody>
            </table>
        );
    }
}