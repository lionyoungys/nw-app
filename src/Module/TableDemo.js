/**
 * Demo组件
 * @author Edwin Young
 */

import React from 'react';
import Window from '../UI/Window';
import Table from '../UI/Table';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Window title='表格demo' onClose={this.props.closeView} padding={true}>
                <Table>
                    <thead><tr><th>head1</th><th>head2</th><th>head3</th><th>head4</th></tr></thead>
                    <tbody>
                        <tr><td>头1</td><td>头2</td><td>头3</td><td>头4</td></tr>
                        <tr><td>头1</td><td>头2</td><td>头3</td><td>头4</td></tr>
                        <tr><td>头1</td><td>头2</td><td>头3</td><td>头4</td></tr>
                        <tr><td>头1</td><td>头2</td><td>头3</td><td>头4</td></tr>
                        <tr><td>头1</td><td>头2</td><td>头3</td><td>头4</td></tr>
                        <tr><td>头1</td><td>头2</td><td>头3</td><td>头4</td></tr>
                        <tr><td>头1</td><td>头2</td><td>头3</td><td>头4</td></tr>
                        <tr><td>头1</td><td>头2</td><td>头3</td><td>头4</td></tr>
                    </tbody>
                </Table>   
            </Window>
        );
    }
}