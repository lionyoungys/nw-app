/**
 * 图片库
 * @author  ranchong
 */
import React, { Component } from 'react';
import Window from '../../../UI/Window';
import './PhotoGallery.css';
export default class extends Component {
    constructor(props) {
        super(props);
    };
    render() { 
        return (
            <Window title='图片库' onClose={this.props.onClose} width="603" height="475">
                    <div className='photo-gal'>
                        <div className="photo-gal-head">
                            图片名称：
                            <input className='e-input photo-gal-input' type="text" />
                            <button className="e-btn">搜索</button>
                        </div>
                        <p>以为您找到<b>464</b>张图片</p>
                        <div className="photo-gal-img">
                        <img className='photo-gal-img-selected'></img>
                            <img></img>
                            <img></img>
                            <img></img>
                            <img></img>
                            <img></img>
                            <img></img>
                            <img></img> 
                        </div>

                    </div>
                </Window>

        );
    }
}