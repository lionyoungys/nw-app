//类文件引入

import Onlineorder from './Module/Onlineorder/Onlineorder';// 线上订单处理
import Data from './Module/Data/App';
import Data2 from './Module/Data/App2';
import Clothes from './Module/Clothes/App' //收衣界面
import Hangon from './Module/Hangon/Hangon'; //上挂
import Takeclothes from './Module/Takeclothes/Takecloth'; //取衣
import Commoditysales from './Module/Commoditysales/Commoditysales'; //商品销售

import RevokeData from './Module/RevokeData/RevokeData'; //撤单统计
import OperatingDetails from './Module/OperatingDetails/OperatingDetails'; //经营明细
import MemberInfoUpdate from './Module/MemberInfoUpdate/MemberInfoUpdate'
import AddGroup from './Module/AddGroup/AddGroup'//新增组
import Demo from './Module/Demo';
import RechargeUp from './Module/RechargeUp/RechargeUp'; //充值统计
import StaffManagement from './Module/StaffManagement/StaffManagement';  //员工管理
import BalanceStatistics from './Module/BalanceStatistics/BalanceStatistics';  //余额统计
import MemberConsumptionStatistics from './Module/MemberConsumptionStatistics/MemberConsumptionStatistics';  //会员消费统计
import ForegroundStatistics from './Module/ForegroundStatistics/ForegroundStatistics';  //前台情况
import MemberCardConsume from './Module/MemberCardConsume/MemberCardConsume';
import UnpaidStatistics from './Module/UnpaidStatistics/UnpaidStatistics';//未付款统计
import Recharge from './Module/Recharge/App';

import OperateIncome from './Module/OperateIncome/OperateIncome';
import SaleCard from './Module/SaleCard/App';
import ChangeCard from './Module/ChangeCard/ChangeCard';//换卡
import ReportLossMain from './Module/ReportLossMain/ReportLossMain';//挂失主页面
import ReturnCard from './Module/ReturnCard/ReturnCard1'; // 退卡
import ManagerGathering from './Module/ManagerGathering/ManagerGathering';//经理收款

import PriceSetting from './Module/PriceSetting/PriceSetting'; // 洗护价格设置
import Solutiontohang from'./Module/Solutiontohang/Solutiontohang';// 解除挂失页面
import Editshopprices from'./Module/Editshopprices/Editshopprices'; // 编辑商品价格
import EditCleaningPrices from'./Module/EditCleaningPrices/EditCleaningPrices'; // 编辑洗护价格
import ClothesQuery from'./Module/ClothesQuery/ClothesQuery'; // 衣物查询
import LatticeQuery from'./Module/LatticeQuery/LatticeQuery'; // 格架查询
import Succession from'./Module/Succession/Succession'; // 交班
import ConsumptionStatistics from './Module/ConsumptionStatistics/ConsumptionStatistics'; //消费统计
import ReportLossQuery from './Module/ReportLossQuery/ReportLossQuery'; //挂失查询
import CardQueries from './Module/CardQueries/CardQueries'; //退卡查询
import ParameterSettings from './Module/ParameterSettings/ParameterSettings'; //参数设置
import Equipmentmanagement from './Module/Equipmentmanagement/Equipmentmanagement'; //设备管理
// import Membershipquery from './Module/Membershipquery/Membershipquery'; //会员消费查询

import Customerquery from './Module/Customerquery/Customerquery'; //客户消费查询
import Payoutstats from './Module/Payoutstats/Payoutstats'; //赔付统计
import Vipstats from './Module/Vipstats/Vipstats'; //会员分类统计
import PasswdUpdate from './Module/PasswdUpdate/PasswdUpdate'; //密码修改
import StoreManagement from './Module/StoreManagement/StoreManagement'; //门店管理
import Clothestat from './Module/Clothestat/Clothestat'; //衣物统计
import Managerquery from './Module/Managerquery/Managerquery'; //衣物统计
import MemberBusinessStatistics from './Module/MemberBusinessStatistics/MemberBusinessStatistics'; //会员业务统计
import Businesstats from './Module/Businesstats/Businesstats'; //营业统计
import Balancedetail from './Module/Balancedetail/Balancedetail'; //欠款明细
import Charts from './Module/Charts/App'; //营业分析
import Debtpay from './Module/Debtpay/Debtpay'; //欠款补交
import AlipayWechatChecking from './Module/AlipayWechatChecking/AlipayWechatChecking'; //支付宝微信统计
import LossReissueChangeCard from './Module/LossReissueChangeCard/LossReissueChangeCard'; //挂失补换卡
import Deliverywarning from './Module/Deliverywarning/Deliverywarning'; //交期预警
import Itsprocessing from './Module/Itsprocessing/Itsprocessing'; //撤单处理
import Pay from './Module/Pay/Pay'; //赔付
import Aboutsnl from './Module/aboutsnl/aboutsnl'; // 关于速洗达
import Orderquery from './Module/Orderquery/Orderquery';    // 订单查询
import OpenCashBox from './Module/OpenCashBox';    //开钱箱界面
import Data6 from './Module/Data/App6';    //金熨斗数据导入6.0版本
import Data4 from './Module/Data/App4';    //金熨斗数据导入4.0版本


// 3.1新增 工厂端
import clear from './Module/clear/App'; // 清洗
import Laundry from './Module/Laundry/App'; // 送洗
import in_factory from './Module/in_factory/App'; // 入厂
import dry from './Module/dry/App'; // 烘干
import ironing from './Module/ironing/App'; // 熨烫
import check from './Module/check/App'; // 质检
import out_of_factory from './Module/out_of_factory/App'; // 出厂
import TableDemo from './Module/TableDemo';




//路由对象
export default {
    onlineorder:Onlineorder, // 线上订单处理
    clothes:Clothes,    //收衣界面
    hangon:Hangon, // 上挂界面
    take_clothes:Takeclothes, //取衣
    debt_pay:Debtpay,// 欠款补交
    commodity_sales:Commoditysales ,//商品销售
    data:Data,
    data2:Data2,
    data6:Data6,
    data4:Data4,
    revoke_data:RevokeData,//撤单统计
    operating_details:OperatingDetails,//营业明细
    member_info_update:MemberInfoUpdate,//会员信息修改
    add_group: AddGroup,//新增组(ranchong)
    recharge_up:RechargeUp,   //充值统计
    demo:Demo,
    table_demo:TableDemo,
    staff_management:StaffManagement, //员工管理
    balance_statistics:BalanceStatistics,  //余额统计
    member_consumption_statistics:MemberConsumptionStatistics, //会员消费统计
    foreground_statistics:ForegroundStatistics, //前台统计
    member_card_consume:MemberCardConsume,//会员卡消费
    unpaid_statistics: UnpaidStatistics,//未付款统计
    recharge:Recharge,    //充值
    operate_income:OperateIncome, //营业日报
    exchange_card: ChangeCard, //换卡
    report_loss_main: ReportLossMain,//挂失主页面
    sale_card:SaleCard, //售卡  
    return_card:ReturnCard,//退卡
    manager_gathering:ManagerGathering,//经理收款
    price_setting:PriceSetting,//价格设置
    Solut_ionto_hang:Solutiontohang,  //解除挂失    
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
    manager_query:Managerquery, //经理查询
    Busines_stats:Businesstats, //营业统计
    Balance_detail:Balancedetail,//欠款明细
    charts:Charts,//营业分析
    member_business_statistics: MemberBusinessStatistics,//会员业务统计
    store_management: StoreManagement,//门店管理
    alipayWechat_checking: AlipayWechatChecking,//支付宝微信对账
    loss_reissue_change_card: LossReissueChangeCard,//挂失补换卡
    delivery_warning:Deliverywarning ,// 交期预警
    its_processing:Itsprocessing, //撤单处理
    pay:Pay, //赔付
    about_snl:Aboutsnl, //关于速洗达
    orderquery:Orderquery , //订单查询
    open_cash_box:OpenCashBox,    //开钱箱

    // 新增3.1工厂端
    clear:clear, // 清洗
    laundry:Laundry , // 送洗
    Infactory:in_factory , //入厂
    dry:dry , // 烘干
    ironing:ironing , // 熨烫
    check:check , //质检
    outoffactory:out_of_factory , // 出厂
};
