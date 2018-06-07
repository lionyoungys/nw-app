/**
 * 设置---门店管理
 * @author ranchong
 */
import React, { Component } from 'react';
import Window from '../../UI/Window';
import './StoreManagement.css'
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            mname:'',
            phone_number:'',
            province:'',
            city:'',
            mstatus:'',
            maddress:''
        }
    };
    componentDidMount() {
        api.post('merchantInfo', {token:'token'.getData()}, (res, ver) => {
            if (ver && res) {
                console.log(res)
                this.setState({id:res.result.id,mname:res.result.mname,phone_number:res.result.phone_number,
                province:res.result.province,city:res.result.city,mstatus:res.result.mstatus,maddress:res.result.maddress});
            }
        }
        );
    }
    render() {
        return (
            <div>
                <Window title='门店管理' onClose={this.props.closeView}>
                <div className='store_management'>
                    <div className="store_management_tabbar">
                        <ul>
                            <li className='store_management_tab_selected'>基本信息</li>
                            <li>银联卡</li>
                            <li>网店</li>
                            <li>优惠活动</li>
                            <li>联营店</li>
                        </ul>
                    </div>
                    <div className='store_management_content_all'>
                        {/* 基本信息 */}
                        <div className='store_management_content_baseInfo store_management_content_selected'>
                                <p className='store_management_content_title'>门店基本信息</p>
                                <div>门店编号：&emsp;<a>{this.state.id}</a></div>
                                <div>网店状态：&emsp;<a>{this.state.mstatus}</a></div>
                                <div>门店名称：&emsp;<span className='store_management_disable_span'>{this.state.mname}</span></div>
                                <div>
                                    所在区域：&emsp;
                                    <span className='store_management_select_span'>
                                        <i></i>{this.state.province}
                                    </span>
                                    <span className='store_management_select_span'>
                                        <i></i>{this.state.city}
                                    </span>
                                </div>
                                <div>详细地址：&emsp;<span className='store_management_disable_span'>{this.state.maddress}</span></div>
                                <div>服务热线：&emsp;<input type='text' className='e-input store_management_able_input' value={this.state.phone_number} /></div>
                                <button className='e-btn'>保存</button>
                        </div> 
                        {/* 银联卡 */}
                        <div className="store_management_content_UnionPaycard">
                        
                                <p className='store_management_content_title'>门店基本信息</p>
                                <div>&emsp;开户行：&emsp;<input type='text' className='e-input store_management_able_input' /></div>
                                <div>&emsp;&emsp;姓名：&emsp;<input type='text' className='e-input store_management_able_input' /></div>
                                <div>银行卡号：&emsp;<input type='text' className='e-input store_management_able_input' /></div>
                                <button className='e-btn'>保存</button>
                        </div> 
                        {/* 网店 */}
                        <div className='store_management_content_onlineStore'>

                                <p className='store_management_content_title'>网店设置</p>
                                <div className='store_management_content_onlineStore_no_open'>
                                    <img width='177px' height='111'></img>
                                    <p>您还没有开通网店</p>
                                </div>
                                <div className='store_management_content_onlineStore_open'>
                                    <div>
                                        &emsp;接单状态：&emsp;
                                        <input type="radio" name="sex" value="start" checked="true" /> 开始接单&emsp;<input type="radio" name="sex" value="start" /> 停止接单
                                    </div>
                                    <div>&emsp;服务范围：&emsp;<input type='text' className='e-input' /><a>km</a></div>
                                    <div>上门服务费：&emsp;<input type='text' className='e-input' /><a>元</a></div>
                                    <button className='e-btn'>保存</button>
                                </div>
                        </div>
                        {/* 优惠活动 */}
                        <div className="store_management_content_specialOffer">
                                <p className='store_management_content_title'>优惠活动</p>
                        </div> 
                        {/* 联营店 */}
                        <div className='store_management_content_associatedShop'>
                               
                                {/*没有联营店  */}
                                <div className='store_management_content_associatedShop_none'>
                                    <p className='store_management_content_title'>您没有与任何店铺联营</p>
                                    <div className='store_management_content_ass_non_left'>
                                        <p className='tore_management_content_ass_non_left_p'>如果该店铺是总店</p>
                                        <div className='store_management_content_ass_non_left_bot'>
                                            <p>请将店铺ID告诉分店，由分店申请加入</p>
                                            <p>店铺ID：1229</p>
                                            <p>店铺名称：诗奈尔大望路店</p>
                                            <button className='e-btn'>申请列表</button>
                                        </div>
                                    </div>
                                    <div className='store_management_content_ass_non_left'>
                                        <p className='tore_management_content_ass_non_left_p'>如果该店铺是分店</p>
                                        <div className='store_management_content_ass_non_left_bot'>
                                
                                            <h2>&emsp;</h2>
                                            <p>请输入您要加入的总店ID</p>
                                            <input className='e-input store_management_content_ass_non_right_input'></input>
                                            <button className='e-btn'>申请加入</button>
                                        </div>
                                    </div>

                                </div>
                                {/*联营总店  */}
                                <div className='store_management_content_associatedShop_head'>
                                    <p className='store_management_content_title'>已经联营的总店</p>
                                    <div>
                                        <a>总店名称：上海诗奈尔总公司</a>
                                        <a>总店ID：4562</a>
                                        <button className='e-btn'>申请列表</button>
                                    </div>
                                    <table className='store_management_assShop_table'>
                                        <thead>
                                            <tr>
                                                <td className='store_management_assShop_table_id'>id</td>
                                                <td className='store_management_assShop_table_shopName'>门店名称</td>
                                                <td className='store_management_assShop_table_shortName'>简称</td>
                                                <td className='store_management_assShop_table_mname'>店长姓名</td>
                                                <td className='store_management_assShop_table_add'>地址</td>
                                                <td className='store_management_assShop_table_phone'>手机</td>
                                                <td className='store_management_assShop_table_hamdle'>操作</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='store_management_assShop_table_id'>id</td>
                                                <td className='store_management_assShop_table_shopName'>诗奈尔大望路店</td>
                                                <td className='store_management_assShop_table_shortName'>简称</td>
                                                <td className='store_management_assShop_table_mname'>店长姓名</td>
                                                <td className='store_management_assShop_table_add'>北京市石景山还是睡觉睡觉就算是计算机设计师姐姐</td>
                                                <td className='store_management_assShop_table_phone'>手机</td>
                                                <td className='store_management_assShop_table_hamdle'>操作</td>
                                            </tr>
                                            <tr>
   
                                                <td className='store_management_assShop_table_id'>id</td>
                                                <td className='store_management_assShop_table_shopName'>门店名称</td>
                                                <td className='store_management_assShop_table_shortName'>简称</td>
                                                <td className='store_management_assShop_table_mname'>店长姓名</td>
                                                <td className='store_management_assShop_table_add'>地址</td>
                                                <td className='store_management_assShop_table_phone'>手机</td>
                                                <td className='store_management_assShop_table_hamdle'>操作</td>
                                            </tr>
                                            
                                            
                                        </tbody>
                                    </table>
                                    

                                </div> 
                                {/*联营列表  */}
                                <div className='store_management_content_associatedShop_applyList'>
                                    <p className='store_management_content_title'>申请列表</p>
                                    <table className='store_management_assShop_table store_management_assShop_applyList_table'>
                                        <thead>
                                            <tr>
                                                <td className='store_management_assShop_table_id'>id</td>
                                                <td className='store_management_assShop_table_shopName'>门店名称</td>
                                                <td className='store_management_assShop_table_shortName'>简称</td>
                                                <td className='store_management_assShop_table_mname'>店长姓名</td>
                                                <td className='store_management_assShop_table_add'>地址</td>
                                                <td className='store_management_assShop_table_phone'>手机</td>
                                                <td className='store_management_assShop_table_hamdle'>操作</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='store_management_assShop_table_id'>id</td>
                                                <td className='store_management_assShop_table_shopName'>诗奈尔大望路店</td>
                                                <td className='store_management_assShop_table_shortName'>简称</td>
                                                <td className='store_management_assShop_table_mname'>店长姓名</td>
                                                <td className='store_management_assShop_table_add'>北京市石景山还是睡觉睡觉就算是计算机设计师姐姐</td>
                                                <td className='store_management_assShop_table_phone'>手机</td>
                                                <td className='store_management_assShop_table_hamdle'>
                                                    <a>拒绝</a>&emsp;
                                                    <a>同意</a>
                                                </td>
                                            </tr>
                                            <tr>

                                                <td className='store_management_assShop_table_id'>id</td>
                                                <td className='store_management_assShop_table_shopName'>门店名称</td>
                                                <td className='store_management_assShop_table_shortName'>简称</td>
                                                <td className='store_management_assShop_table_mname'>店长姓名</td>
                                                <td className='store_management_assShop_table_add'>地址</td>
                                                <td className='store_management_assShop_table_phone'>手机</td>
                                                <td className='store_management_assShop_table_hamdle'>
                                                    <a>拒绝</a>&emsp;
                                                    <a>同意</a>
                                                </td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                
                                </div>
                                {/*联营分店  */}
                                <div className='store_management_content_associatedShop_part'>
                                    <p className='store_management_content_title'>已经联营的分店</p>
                                    <div>
                                        <a>总店名称：上海诗奈尔总公司</a>
                                        <a>总店ID：4562</a>
                                        <button className='e-btn'>退出联营</button>
                                    </div>
                                    <table className='store_management_assShop_table'>
                                        <thead>
                                            <tr>
                                                <td className='store_management_assShop_table_id'>id</td>
                                                <td className='store_management_assShop_table_shopName'>门店名称</td>
                                                <td className='store_management_assShop_table_shortName'>简称</td>
                                                <td className='store_management_assShop_table_mname'>店长姓名</td>
                                                <td className='store_management_assShop_table_add'>地址</td>
                                                <td className='store_management_assShop_table_phone'>手机</td>
                                                <td className='store_management_assShop_table_hamdle'>操作</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='store_management_assShop_table_id'>id</td>
                                                <td className='store_management_assShop_table_shopName'>诗奈尔大望路店</td>
                                                <td className='store_management_assShop_table_shortName'>简称</td>
                                                <td className='store_management_assShop_table_mname'>店长姓名</td>
                                                <td className='store_management_assShop_table_add'>北京市石景山还是睡觉睡觉就算是计算机设计师姐姐</td>
                                                <td className='store_management_assShop_table_phone'>手机</td>
                                                <td className='store_management_assShop_table_hamdle'></td>
                                            </tr>
                                            <tr>

                                                <td className='store_management_assShop_table_id'>id</td>
                                                <td className='store_management_assShop_table_shopName'>门店名称</td>
                                                <td className='store_management_assShop_table_shortName'>简称</td>
                                                <td className='store_management_assShop_table_mname'>店长姓名</td>
                                                <td className='store_management_assShop_table_add'>地址</td>
                                                <td className='store_management_assShop_table_phone'>手机</td>
                                                <td className='store_management_assShop_table_hamdle'></td>
                                            </tr>


                                        </tbody>
                                    </table>
                                </div>
                                
                        </div>
                    </div>
                </div>
                </Window>
            </div>
        );
    };
}