//类文件引入
import Clothes from './Module/Clothes';
import Data from './Module/Data/App';
// import Takeclothes from './Module/Takeclothes';
import RevokeData from './Module/RevokeData/RevokeData'; //撤单统计
import OperatingDetails from './Module/OperatingDetails/OperatingDetails.js'; //营业明细
import MemberInfoUpdate from './Module/MemberInfoUpdate/MemberInfoUpdate.js'
import AddGroup from './Module/AddGroup/AddGroup.js'//新增组
import Demo from './Module/Demo';
import RechargeUp from './Module/RechargeUp/RechargeUp.js'; //充值统计
import StaffManagement from './Module/StaffManagement/StaffManagement.js';  //员工管理
import BalanceStatistics from './Module/BalanceStatistics/BalanceStatistics.js';  //余额统计
import MemberConsumptionStatistics from './Module/MemberConsumptionStatistics/MemberConsumptionStatistics.js';  //会员消费统计
import ForegroundStatistics from './Module/ForegroundStatistics/ForegroundStatistics.js';  //前台统计
import MemberCardConsume from './Module/MemberCardConsume/MemberCardConsume';
import UnpaidStatistics from './Module/UnpaidStatistics/UnpaidStatistics.js';//未付款统计
import Recharge from './Module/Recharge/App';

import OperateIncome from './Module/OperateIncome/OperateIncome';
import SaleCard from './Module/SaleCard/SaleCard.js';
import ChangeCard from './Module/ChangeCard/ChangeCard.js';//换卡
import ReportLossMain from './Module/ReportLossMain/ReportLossMain.js';//挂失主页面
import ReturnCard from './Module/ReturnCard/ReturnCard.js';
import ManagerGathering from './Module/ManagerGathering/ManagerGathering.js';//经理收款

import Payandrecharge from'./Module/PayAndRecharge/Payandrecharge.js'; // 支付充值页面
import CleaningPriceSetting from './Module/CleaningPriceSetting/CleaningPriceSetting.js'; // 洗护价格设置
import Solutiontohang from'./Module/Solutiontohang/Solutiontohang.js' // 解除挂失页面
import Editshopprices from'./Module/Editshopprices/Editshopprices.js' // 编辑商品价格
import EditCleaningPrices from'./Module/EditCleaningPrices/EditCleaningPrices.js' // 编辑洗护价格
import ClothesQuery from'./Module/ClothesQuery/ClothesQuery.js' // 衣物查询
import LatticeQuery from'./Module/LatticeQuery/LatticeQuery.js' // 格架查询
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
    staff_management:StaffManagement, //员工管理
    balance_statistics:BalanceStatistics,  //余额统计
    member_consumption_statistics:MemberConsumptionStatistics, //会员消费统计
    foreground_statistics:ForegroundStatistics, //前台统计
    member_card_consume:MemberCardConsume,//会员卡消费
    unpaid_statistics: UnpaidStatistics,//未付款统计
    recharge:Recharge,    //充值
    operate_income:OperateIncome, //营业收入
    exchange_card: ChangeCard, //换卡
    report_loss_main: ReportLossMain,//挂失主页面
    sale_card:SaleCard, //售卡
    pay_and_recharge:Payandrecharge,// 支付充值    
    return_card:ReturnCard,//退卡
    manager_gathering:ManagerGathering,//经理收款
    cleaning_price_setting:CleaningPriceSetting,//洗护价格设置
    Solut_ionto_hang:Solutiontohang,  //解除挂失
    edit_shop_prices:Editshopprices, //编辑商品价格
    edit_cleaning_prices:EditCleaningPrices,  //编辑洗护价格
    clothes_query:ClothesQuery,      //衣物查询
    lattice_query:LatticeQuery,    //格架查询

};
