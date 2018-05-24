//类文件引入
import Clothes from './Module/Clothes';
import Data from './Module/Data/App';
// import Takeclothes from './Module/Takeclothes';
import RevokeData from './Module/RevokeData/RevokeData';
import OperatingDetails from './Module/OperatingDetails/OperatingDetails.js';
import MemberInfoUpdate from './Module/MemberInfoUpdate/MemberInfoUpdate.js'
import AddGroup from './Module/AddGroup/AddGroup.js'//ranchong
import Demo from './Module/Demo';
import RechargeUp from './Module/RechargeUp/RechargeUp.js';
import StaffManagement from './Module/StaffManagement/StaffManagement.js';  //员工管理
//路由对象
export default {
    clothes:Clothes,    //收衣界面
    data:Data,
    // take_clothes:Takeclothes,   //取衣界面
    revoke_data:RevokeData,//撤单统计
    operating_details:OperatingDetails,//营业明细
    member_info_update:MemberInfoUpdate,//会员信息修改
    add_group: AddGroup,//新增组(ranchong)
    recharge_up:RechargeUp,   //充值统计
    demo:Demo,
    staff_management:StaffManagement,  //员工管理
};
