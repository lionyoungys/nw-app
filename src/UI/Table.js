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
            <table className='ui-table'>
                <thead><tr><th></th><th></th><th></th></tr></thead>
                <tbody><tr><td></td><td></td><td></td></tr></tbody>
            </table>
        );
    }
}