/**
 * 弹窗组件
 * @author Edwin Young
 * @desc 界面弹出层  title:标题;onClose:关闭事件;children:内部内容;width:宽;height:高;
 */

import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let style = {width:this.props.width || 900, height:this.props.height || 624};
        style.marginTop = (-1 * style.height / 2) + 'px',
        style.marginLeft = (-1 * style.width / 2) + 'px';
        style.width += 'px';
        style.height += 'px';
        return (
            <div className='e-layer-bg'>
                <div className='ui-window' style={style}>
                    <div>{this.props.title}<i onClick={this.props.onClose}></i></div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}