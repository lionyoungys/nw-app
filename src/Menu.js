//顶部菜单配置    value:菜单名称;options:子选单列表;options>value:子选单名称;options>view:子选单视图;
const topMenu = [
    {
        value:'前台业务', 
        id :1,
        options:[
            {value:'线上订单', view:'onlineorder'},
            {value:'收衣', view:'clothes', id: 7},
            {value: '上挂', view: 'hangon', id: 8},           
            {value: '取衣', view: 'take_clothes', id: 9},
            {value: '商品销售', view: 'commodity_sales', id: 10},
            // {value:'欠款补交', view:'debt_pay',id:10},
            {value: '交期预警', view: 'delivery_warning', id: 11},
            {value: '撤单处理', view: 'its_processing', id: 12},
            // {value: '赔付', view: 'pay', id: 13},
            {value: 'demo', view: 'demo'},
            // {value:'编辑商品价格', view:'edit_shop_prices'},
            // {value:'编辑洗护价格', view:'edit_cleaning_prices'},
        ]
    },
    {
        value:'信息查询', 
        id:2,
        options:[
            {value:'格架查询', view:'lattice_query', id: 14},
            {value:'衣物查询', view:'clothes_query', id: 15},
            {value:'订单查询', view:'orderquery' },
            {value:'交班', view:'Succession', id: 16},
            {value:'前台情况', view:'foreground_statistics', id: 18},           
            {value:'未付款统计', view:'unpaid_statistics', id: 19},
            {value:'余额统计', view:'balance_statistics', id: 20},
            {value:'充值统计', view:'recharge_up', id: 21},
            {value:'消费统计', view:'consum_ption_statistics', id:22},     
        ]
    },
    {
        value:'客户管理', 
        id: 3,
        options:[
            { value:'售卡', view:'sale_card', id: 23},
            { value:'充值', view:'recharge', id: 24},
            { value:'会员信息修改', view:'member_info_update', id: 25},
            { value:'挂失、补换卡',view:'loss_reissue_change_card', id: 26},
            // { value:'退卡', view:'return_card', id: 27},
            // { value:'挂失查询', view:'report_loss_query'},
            // { value:'退卡查询', view:'card_queries', id: 28},
            // {value:'会员消费查询', view:'Member_ship_query'},
            // { value: '挂失', view:'report_loss_main'},
            // { value:'解除挂失', view:'Solut_ionto_hang'},
            // { value: '换卡', view:'exchange_card'}, 
            { value:'客户信息查询', view:'customer_query', id: 29},            
        ]
    },
    {
        value:'信息统计', 
        id: 4,
        options:[
            {value:'撤单统计', view:'revoke_data', id: 30},
            // {value:'赔付统计', view:'payout_stats', id: 31}
        ]
    },
    {
        value:'财务统计', 
        id: 5,
        options:[
            {value:'经理收款', view:'manager_gathering', id: 32},
            // {value:'经理查询', view:'manager_query', id: 33},
            {value:'营业统计', view:'manager_query', id: 33},
            {value:'经营日报', view:'operate_income', id: 34},
            // {value:'营业统计', view:'Busines_stats', id: 35},
            {value:'经营明细', view:'operating_details', id: 36},
            // {value:'营业分析', view:'charts', id: 37},
            // {value:'欠款明细', view:'Balance_detail', id: 38},
            // {value:'会员业务统计', view:'member_business_statistics', id: 39},
            // {value:'会员分类统计', view:'vip_stats', id: 40},
            // {value:'会员消费统计', view:'member_consumption_statistics'},
            {value:'衣物统计', view:'clothe_stat', id: 41},
            {value: '微信、支付宝对账', view:'alipayWechat_checking', id: 42},
        ]
    },
    // {
    //     value:'店铺管理', 
    //     options:[
    //         {value:'门店信息', view:null},
    //         {value:'我的网店', view:null},
    //         {value:'商品与分类', view:null},
    //         {value:'员工管理', view:'staff_management'},
    //         {value:'卡券中心', view:null},
    //         {value:'优惠活动', view:null},
    //         {value:'密码与安全', view:null},
    //         {value:'数据导入', view:'data'}
    //     ]
    // },
    {
        value:'设置', 
        id: 6,
        options:[
            {value:'门店管理', view:'store_management', id: 43},
            {value:'员工与权限', view:'staff_management', id: 44},
            {value:'价格设置', view:'price_setting', id: 45},
            {value:'参数设置', view:'Parameter_Settings', id: 46},
            {value:'设备与打印机', view:'equipment_management', id: 47},
            {value:'数据导入2',  view:'data', id: 48},
            {value:'数据导入',  view:'data2'},
            {value:'密码修改', view:'passwd_update', id: 49},
            // {value:'其他设置', view:'colthes_classify_managment'},
            {value:'关于速洗达', view:'about_snl', id: 50}
        ]
    }
];
//顶部导航栏配置    value:导航名称;class:样式名称;view:展示的视图组件名称
const nav = [
    {value:'收衣',class:'main-clothes',view:'clothes', id: 7},
    {value:'售卡',class:'main-sale-card',view:'sale_card', id: 23},
    {value:'充值',class:'main-recharge',view:'recharge', id: 24},
    {value:'营业日报',class:'main-income',view:'operate_income', id: 17},
    {value:'退出',class:'main-quit',view:null, event:'quit'},
];
//左侧菜单配置    value:菜单名称;options:子选单列表;options>value:子选单名称;options>view:子选单视图;
const leftMenu = [
    {
        value:'前台业务', 
        options:[
            // {value:'线上订单', class:'main-clothes', view:'onlineorder'},
            {value:'收衣',class:'main-clothes',view:'clothes', id: 7},
            {value:'取衣',class:'main-take',view:'take_clothes', id: 9},
            // {value:'上挂',class:'main-put-on',view:'hangon', id: 8},
            // {value:'商品销售',class:'main-sell-goods',view:'commodity_sales', id: 10},
            {value:'售卡',class:'main-sale-card',view:'sale_card', id: 23},
            {value:'充值',class:'main-recharge',view:'recharge', id: 24},
        ]
    },
    {
        value:'洗护管理', 
        options:[           
            {value:'送洗',class:'main-laundry',view:'laundry', id: 25},
            {value:'入厂',class:'main-factory',view:'Infactory', id: 26},
            {value:'清洗',class:'main-clearn',view:'clear', id: 27},
            {value:'烘干',class:'main-hot',view:'dry', id: 28},
            {value:'熨烫',class:'main-ironing',view:'ironing', id: 29},
            {value:'质检',class:'main-quality',view:'check', id: 30},
            {value:'上挂',class:'main-put-on',view:'hangon', id: 8},
            {value:'出厂',class:'main-outfactory',view:'outoffactory', id: 31}, //
        ]
    },
    {
        value:'信息查询', 
        options:[
            {value:'衣物查询',class:'main-clothes-search',view:'clothes_query', id: 15},
            {value:'客户信息查询',class:'main-member-search',view:'customer_query', id: 29},
            {value:'营业日报',class:'main-income-today',view:'operate_income', id: 17}
        ]
    },
    {
        value:'其他', 
        options:[
            {value:'开钱箱',class:'main-open-case',view:null, event:'open_case'}
        ]
    },
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
    var topMenuLen = topMenu.length
    ,   navLen = nav.length
    ,   leftMenuLen = leftMenu.length
    ,   i
    ,   tempLen
    ,   j;
    for (i = 0;i < topMenuLen;++i) {
        if ('undefined' !== typeof topMenu[i].id && -1 === topMenu[i].id.inArray(authArr)) {
            topMenu.splice(i, 1);
            --i;
            --topMenuLen;
        } else {
            tempLen = topMenu[i].options.length;
            for (j = 0;j < tempLen;++j) {
                if ('undefined' !== typeof topMenu[i].options[j].id && -1 === topMenu[i].options[j].id.inArray(authArr)) {
                    topMenu[i].options.splice(j, 1);
                    --j;
                    --tempLen;
                }
            }
        }
    }
    for (i = 0;i < navLen;++i) {
        if ('undefined' !== typeof nav[i].id && -1 === nav[i].id.inArray(authArr)) {
            nav.splice(i, 1);
            --i;
            --navLen;
        }
    }
    for (i = 0;i < leftMenuLen;++i) {
        tempLen = leftMenu[i].options.length;
        for (j = 0;j < tempLen;++j) {
            if ('undefined' !== typeof leftMenu[i].options[j].id && -1 === leftMenu[i].options[j].id.inArray(authArr)) {
                leftMenu[i].options[j].splice(j, 1);
                --j;
                --tempLen;
            }
        }
    }
}

export {topMenu, nav, leftMenu};