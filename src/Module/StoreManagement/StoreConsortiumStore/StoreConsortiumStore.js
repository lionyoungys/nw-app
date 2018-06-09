import React, {Component} from 'react';
export default class extends Component {   
    constructor(props) {
        super(props);   
    }

    render(){
        return  (
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
        );
    }
}