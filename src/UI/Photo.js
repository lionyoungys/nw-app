/**
 * 图片查看组件
 * @author Edwin Young
 */
import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {index:0};
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handlePrev() {
        this.state.index > 0 && this.setState({index:this.state.index - 1});
    }

    handleNext() {
        (this.props.images.length - 1 > this.state.index) && this.setState({index:this.state.index + 1})
    }

    render() {
        if (!tool.isArray(this.props.images) || this.props.images.length < 1) {
            return null;
        }
        return (
            <div className='e-layer-bg'>
                <div className='ui-photo'>
                    <div>{this.props.title || '照片展示'}<i className='e-icon-close14' onClick={this.props.onClose}></i></div>
                    <i className='ui-photo-l' onClick={this.handlePrev}></i>
                    <i className='ui-photo-r' onClick={this.handleNext}></i>
                    <i className='ui-photo-c'>{this.state.index + 1}/{this.props.images.length}</i>
                    <img src={'string' == typeof this.props.key ? this.props.images[this.state.index][k] : this.props.images[this.state.index]}/>
                </div>
            </div>
        );
    }
}