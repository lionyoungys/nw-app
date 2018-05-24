/**
 * 撤单统计界面组件
 * @author fanyerong
 */
import React, {Component} from 'react';
import './RevokeData.css';
import Window from '../../UI/Window';
export default class extends Component {   
    constructor(props) {
        super(props);           
    }; 
    render() {
       var arr = ['查询','打印','退出'].map((item,index) =><button key={index} data-text={item}>{item}</button>);
       var revokedata_detail = ['流水号','撤单日期','撤单时间','操作店员','撤单原因','撤单类型','原金额','金额','撤单日期','客户电话','客户姓名','上传'].map((item,index)=><span>{item}</span>)
       var revokedata_clothes = ['店员姓名','客户电话','流水号','水洗条码号','衣物编码','衣物名称','衣物颜色','衣物网格','价格','品牌','折后价格','备注','状态','日期','时间','交货定期','交货日期','格架号','是否上传','附加服务','衣物件数','客户姓名'].map((item,index)=><span>{item}</span>)
        return (             
            <Window title='撤单统计' onClose={this.props.closeView}>   
                      <div className="revokedata_data">
                         <div className="revokedata_dataLeft">
                            <div>开始日期：<input type="date" value ='2018-05-19'/></div>                           
                            <div>结束日期：<input type="date" value ='2018-06-19'/></div>
                         </div>
                         <div className="revokedata_dataright">
                           {arr}
                         </div>
                      </div>
                      <div className="revokedata_list">
                        <div>撤单合计</div>
                        <ul className="revokedata_list_box">
                            <li id="revokedata_list_box_li">
                                <span></span>
                                <span>合计</span>
                                <span>衣物合计</span>
                            </li>
                            <li>
                                <span>1</span>
                                <span></span>
                                <span></span>
                            </li>
                        </ul>
                      </div>
                      <div className="revokedata_list revokedata_last">
                        <div>撤单明细<b>共记录 <a>456</a> 条</b><span className="revokedata_prompt"></span></div>
                        <ul className="revokedata_list_box">
                            <li id="revokedata_list_box_li">
                                <span></span>
                                 {revokedata_detail}
                            </li>
                            <li>
                                <span>1</span>
                                <span></span>
                                <span></span>
                            </li>
                            <li>
                                <span>2</span>
                                <span></span>
                                <span></span>
                            </li>
                        </ul>
                      </div>
                      <div className="revokedata_list revokedata_last">
                        <div>撤单衣物明细<b>共记录 <a>456</a> 件</b><span className="revokedata_prompt"></span></div>
                        <ul className="revokedata_list_box">
                            <li id="revokedata_list_box_li">
                                 <span></span>
                                 {revokedata_clothes}
                            </li>
                            <li>
                                <span>1</span>
                                <span></span>
                                <span></span>
                            </li>
                            <li>
                                <span>2</span>
                                <span>hhhhhhhhhhhhhhhhhh</span>
                                <span></span>
                            </li>
                        </ul>
                      </div>
                   
             
             </Window> 
        );
    }
}