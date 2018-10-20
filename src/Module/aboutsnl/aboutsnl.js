/**
 * 关于速洗达
 * @author fanyerong
 */
import React, {Component} from 'react';
import Window from '../../UI/Window';
import './aboutsnl.css';

export default class extends Component {   
    constructor(props) {
        super(props);           
       
    }; 
    render(){
        return (   
            <div>
            <Window title='关于速洗达' onClose={this.props.closeView}> 
                <div className='aboutsnl'>
                    <p>当前版本:速洗达商家版{nw.App.manifest.version}</p>
                    速洗达秉持“环保、健康、便捷”的洗护服务理念，将传统洗护服务业与现代信息科技、智慧工厂、智能物流相结合，创造性地构建出“互联网+智能洗衣工厂+自有配送体系”的商业模式，践行并诠释了互联网时代C2F服务新概念，为客户提供全方位、高品质、个性化的洗涤护理解决方案，使得客户能够享受先进、贴心的洗涤护理服务。
                </div>
            </Window>  
        </div>
        );
    }
}