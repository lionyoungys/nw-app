//类文件引入
import Data from './Module/Data/App';
import Clothes from './Module/Clothes/App' //收衣界面
import Hangon from './Module/Hangon/Hangon.js'; //上挂
import Takeclothes from './Module/Takeclothes/Takeclothes.js'; //取衣
import Commoditysales from './Module/Commoditysales/Commoditysales.js'; //商品销售

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
import PriceSetting from './Module/PriceSetting/PriceSetting.js'; // 洗护价格设置
import Solutiontohang from'./Module/Solutiontohang/Solutiontohang.js';// 解除挂失页面
import Editshopprices from'./Module/Editshopprices/Editshopprices.js'; // 编辑商品价格
import EditCleaningPrices from'./Module/EditCleaningPrices/EditCleaningPrices.js'; // 编辑洗护价格
import ClothesQuery from'./Module/ClothesQuery/ClothesQuery.js'; // 衣物查询
import LatticeQuery from'./Module/LatticeQuery/LatticeQuery.js'; // 格架查询
import Succession from'./Module/Succession/Succession.js'; // 交班
import ConsumptionStatistics from './Module/ConsumptionStatistics/ConsumptionStatistics.js'; //消费统计
import ReportLossQuery from './Module/ReportLossQuery/ReportLossQuery.js'; //挂失查询
import CardQueries from './Module/CardQueries/CardQueries.js'; //退卡查询
import ParameterSettings from './Module/ParameterSettings/ParameterSettings.js'; //参数设置
import Equipmentmanagement from './Module/Equipmentmanagement/Equipmentmanagement.js'; //设备管理
// import Membershipquery from './Module/Membershipquery/Membershipquery.js'; //会员消费查询
import Customerquery from './Module/Customerquery/Customerquery.js'; //客户消费查询
import Payoutstats from './Module/Payoutstats/Payoutstats.js'; //赔付统计
import Vipstats from './Module/Vipstats/Vipstats.js'; //会员分类统计
import PasswdUpdate from './Module/PasswdUpdate/PasswdUpdate.js'; //密码修改
import StoreManagement from './Module/StoreManagement/StoreManagement.js'; //门店管理
import Clothestat from './Module/Clothestat/Clothestat.js'; //衣物统计
import managerquery from './Module/managerquery/managerquery.js'; //衣物统计
import MemberBusinessStatistics from './Module/MemberBusinessStatistics/MemberBusinessStatistics.js'; //会员业务统计
import Businessdaily from './Module/Businessdaily/Businessdaily.js'; //经营日报
import Businesstats from './Module/Businesstats/Businesstats.js'; //营业统计
import Balancedetail from './Module/Balancedetail/Balancedetail.js'; //欠款明细
import OperationAnalysis from './Module/OperationAnalysis/OperationAnalysis.js'; //营业分析
import Debtpay from './Module/Debtpay/Debtpay.js'; //欠款补交


//路由对象
export default {
    clothes:Clothes,    //收衣界面
    hangon:Hangon, // 上挂界面
    take_clothes:Takeclothes, //取衣
    debt_pay:Debtpay,// 欠款补交
    commodity_sales:Commoditysales ,//商品销售

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
    staff_management:StaffManagement,  //员工管理
    member_card_consume:MemberCardConsume,//会员卡消费
    unpaid_statistics: UnpaidStatistics,//未付款统计
    recharge:Recharge,    //充值
    staff_management:StaffManagement,  //员工管理
    operate_income:OperateIncome, //营业收入
    exchange_card: ChangeCard, //换卡
    report_loss_main: ReportLossMain,//挂失主页面
    sale_card:SaleCard, //售卡
    pay_and_recharge:Payandrecharge,// 支付充值    
    return_card:ReturnCard,//退卡
    manager_gathering:ManagerGathering,//经理收款
    price_setting:PriceSetting,//价格设置
    Solut_ionto_hang:Solutiontohang,  //解除挂失
    sale_card:SaleCard,//售卡
    
    edit_shop_prices:Editshopprices, //编辑商品价格
    edit_cleaning_prices:EditCleaningPrices,  //编辑洗护价格
    clothes_query:ClothesQuery,      //衣物查询
    lattice_query:LatticeQuery,    //格架查询
    Succession:Succession ,   //交班
    consum_ption_statistics:ConsumptionStatistics, //消费统计
    report_loss_query:ReportLossQuery, //挂失查询
    card_queries:CardQueries,  //退卡查询
    Parameter_Settings:ParameterSettings, //参数设置
    equipment_management:Equipmentmanagement , //设备管理
    // Member_ship_query:Membershipquery, //会员消费查询
    customer_query:Customerquery, // 客户信息查询
    payout_stats:Payoutstats, //赔付统计
    vip_stats:Vipstats , //会员分类统计
    ConsumptionStatistics:ConsumptionStatistics, //消费统计
    ReportLossQuery:ReportLossQuery, //挂失查询
    CardQueries:CardQueries,  //退卡查询
    ParameterSettings:ParameterSettings, //参数设置
    passwd_update:PasswdUpdate,//密码修改
    clothe_stat:Clothestat ,// 衣物统计
    manager_query:managerquery, //经理查询
    Business_daily:Businessdaily , // 营业日报
    Busines_stats:Businesstats, //营业统计
    Balance_detail:Balancedetail,//欠款明细
    operation_analysis:OperationAnalysis,//营业分析
    member_business_statistics: MemberBusinessStatistics,//会员业务统计
    store_management: StoreManagement,//门店管理
};
