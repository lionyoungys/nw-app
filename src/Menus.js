//顶部菜单配置    value:菜单名称;options:子选单列表;options>value:子选单名称;options>view:子选单视图;
const Menus = [
    {
        value:'前台业务', 
        key :'Frontend',
        options:[
            {value: '收衣', view:'clothes', className:'clothes', id: 7},
            {value: '线上订单', view:'onlineorder', className:'online'},
            {value: '上挂', view: 'hangon', id: 8, className:'puton'},           
            {value: '取衣', view: 'take_clothes', id: 9, className:'take'},
            {value: '商品销售', view: 'commodity_sales', id: 10, className:'goods'},
            {value: '售卡', view:'sale_card', id: 23, className:'card'},
            {value: '充值', view:'recharge', id: 24, className:'recharge'},
            // {value:'欠款补交', view:'debt_pay',id:10},
            // {value: '交期预警', view: 'delivery_warning', id: 11},
            {value: '撤单处理', view: 'its_processing', id: 12, className:'cancel'},
            // {value: '赔付', view: 'pay', id: 13},
            {value: 'demo', view: 'demo', className:'default'},
            //{value: 'table_demo', view: 'table_demo', className:'default'},
            // {value:'编辑商品价格', view:'edit_shop_prices'},
            // {value:'编辑洗护价格', view:'edit_cleaning_prices'},
        ]
    },
    {
        value:'洗护管理', 
        key: 'CleaningManagement',
        options:[
            {value:'送洗', view:'laundry', id: 111, className:'to-clean'},
            {value:'入厂', view:'Infactory', id: 112, className:'into'},
            {value:'清洗', view:'clear', id: 100, className:'cleaning'},
            {value:'烘干', view:'dry', id: 102, className:'dry'},
            {value:'熨烫', view:'ironing', id: 104, className:'iron'},
            {value:'质检', view:'check', id: 106, className:'check'},
            {value:'出厂', view:'outoffactory', id: 114, className:'out-of'},
            { value: '返流审核', view: 'backFlow', className:'back'},
            // { value: '返流审核', view: 'backFlow', id: 115, className: 'back' },
        ]
    },
    {
        value:'客户管理', 
        key: 'CustomerManagement',
        options:[
            {value:'售卡', view:'sale_card', id: 23, className:'sell-card'},
            {value:'退卡', view:'return_card', id: 27,className:'sell-card'},
            {value:'充值', view:'recharge', id: 24, className:'recharge-card'},
            {value:'会员信息修改', view:'member_info_update', id: 25, className:'member-update'},
            {value:'挂失、补换卡',view:'loss_reissue_change_card', id: 26, className:'change-card'},            
            // { value:'挂失查询', view:'report_loss_query'},
            // { value:'退卡查询', view:'card_queries', id: 28},
            // {value:'会员消费查询', view:'Member_ship_query'},
            // { value: '挂失', view:'report_loss_main'},
            // { value:'解除挂失', view:'Solut_ionto_hang'},
            // { value: '换卡', view:'exchange_card'}, 
            { value:'客户信息查询', view:'customer_query', id: 29, className:'customer-query'},            
        ]
    },
    {
        value:'信息查询', 
        key:'InfoQuery',
        options:[
            {value:'衣物查询', view:'clothes_query', id: 15, className:'clothes-query'},
            {value:'格架查询', view:'lattice_query', id: 14, className:'shelf-query'},
            {value:'订单查询', view:'orderquery', className:'order-query'},
            {value:'商品订单', view:'shopquery', className:'goods-order'},
            {value:'交班', view:'Succession', id: 16, className:'hand-over'},
            {value:'前台情况', view:'foreground_statistics', id: 18, className:'front-status'},           
            {value:'未付款统计', view:'unpaid_statistics', id: 19, className:'no-payment'},
            {value:'余额统计', view:'balance_statistics', id: 20, className:'member-balance'},
            {value:'充值统计', view:'recharge_up', id: 21, className:'recharge-statistic'},
            {value:'消费统计', view:'consum_ption_statistics', id:22, className:'consume-statistic'},     
        ]
    },
    /*{
        value:'信息统计', 
        key: 'InfoStatistics',
        options:[
            {value:'撤单统计', view:'revoke_data', id: 30, className:'default'},
            // {value:'赔付统计', view:'payout_stats', id: 31}
        ]
    },*/
    {
        value:'财务统计', 
        key: 'FinanceStatistics',
        options:[
            {value:'经理收款', view:'manager_gathering', id: 32, className:'manager'},
            // {value:'经理查询', view:'manager_query', id: 33},
            {value:'营业统计', view:'manager_query', id: 33, className:'business-statistics'},
            {value:'经营日报', view:'operate_income', id: 34, className:'business-daily'},
            // {value:'营业统计', view:'Busines_stats', id: 35},
            {value:'经营明细', view:'operating_details', id: 36, className:'business-detail'},
            // {value:'营业分析', view:'charts', id: 37},
            // {value:'欠款明细', view:'Balance_detail', id: 38},
            // {value:'会员业务统计', view:'member_business_statistics', id: 39},
            // {value:'会员分类统计', view:'vip_stats', id: 40},
            // {value:'会员消费统计', view:'member_consumption_statistics'},
            {value:'衣物统计', view:'clothe_stat', id: 41, className:'clothes-statistics'},
            {value: '微信支付宝对账', view:'alipayWechat_checking', id: 42, className:'wechat-alipay'},
        ]
    },
    /*{
        value:'店铺管理', 
        options:[
            {value:'门店信息', view:null},
            {value:'我的网店', view:null},
            {value:'商品与分类', view:null},
            {value:'员工管理', view:'staff_management'},
            {value:'卡券中心', view:null},
            {value:'优惠活动', view:null},
            {value:'密码与安全', view:null},
            {value:'数据导入', view:'data'}
        ]
    },*/
    {
        value:'设置', 
        key: 'Setting',
        options:[
            {value:'门店管理', view:'store_management', id: 43, className:'shop-management'},
            {value:'员工与权限', view:'staff_management', id: 44, className:'employee'},
            {value:'价格设置', view:'price_setting', id: 45, className:'price'},
            {value:'参数设置', view:'Parameter_Settings', id: 46, className:'param'},
            {value:'设备与打印机', view:'equipment_management', id: 47, className:'printer'},
            //{value:'数据导入2',  view:'data', id: 48},
            {value:'数据导入',  view:'data2', className:'data'},
            {value:'金熨斗v4.0数据导入',  view:'data4', className:'data4'},
            //{value:'金熨斗v6.0数据导入',  view:'data6', className:'data4'},
            {value:'密码修改', view:'passwd_update', id: 49, className:'passwd'},
            // {value:'其他设置', view:'colthes_classify_managment'},
            {value:'关于速洗达', view:'about_snl', id: 50, className:'about'}
        ]
    }
];


//权限管理处理
var auth = 'auth'.getData()
,   is_root = 'is_root'.getData();
if (1 != is_root) {
    try {
        var authArr = JSON.parse(auth);
    } catch (e) {
        authArr = [];
    }
    var topMenuLen = Menus.length
    ,   i
    ,   tempLen
    ,   j;
    for (i = 0;i < topMenuLen;++i) {
        if ('undefined' !== typeof Menus[i].id && -1 === Menus[i].id.inArray(authArr)) {
            Menus.splice(i, 1);
            --i;
            --topMenuLen;
        } else {
            tempLen = Menus[i].options.length;
            for (j = 0;j < tempLen;++j) {
                if ('undefined' !== typeof Menus[i].options[j].id && -1 === Menus[i].options[j].id.inArray(authArr)) {
                    Menus[i].options.splice(j, 1);
                    --j;
                    --tempLen;
                }
            }
        }
    }
}
export default Menus;