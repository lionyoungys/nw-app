/**
 * 弹窗组件
 * @author Edwin Young
 * @desc 界面弹出层  title:标题;onClose:关闭事件;children:内部内容;width:宽;height:高;
 */

import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {width:'900', height:'624', marginTop:'-312px', marginLeft:'-450px'};
    }

    componentDidMount() {
        let width = this.props.width || this.state.width,
            height = this.props.height || this.state.height;
        if (width == this.state.width && height == this.state.height) {
            this.setState({width:width + 'px', height:height + 'px'});
        } else {
            let marginTop = (-height / 2) + 'px',
                marginLeft = (-width / 2) + 'px';
                this.setState({width:width + 'px', height:height + 'px', marginTop:marginTop, marginLeft:marginLeft});
        }
    }

    render() {
        return (
            <div className='e-layer-bg'>
                <div className='ui-window' style={this.state}>
                    <div>{this.props.title}<i onClick={this.props.onClose}></i></div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}