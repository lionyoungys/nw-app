//顶部菜单配置    value:菜单名称;options:子选单列表;options>value:子选单名称;options>view:子选单视图;
export const topMenu = [
    {
        value:'前台业务', 
        options:[
            {value:'收衣', view:'clothes'},
            {value:'取衣', view:'take_clothes'},
            {value:'商品销售', view:null},
            {value:'欠款补交', view:'add_group'},
            {value:'交期预警', view:'member_card_consume'},
            {value:'撤单处理', view:null},
            {value:'赔付', view:'pay_and_recharge'},
            {value:'demo', view:'demo'},
            {value:'编辑商品价格', view:'edit_shop_prices'},
            {value:'编辑洗护价格', view:'edit_cleaning_prices'},
        ]
    },
    {
        value:'信息查询', 
        options:[
            {value:'格架查询', view:'lattice_query'},
            {value:'衣物查询', view:'clothes_query'},
            {value:'交班', view:null},
            {value:'营业日报', view:'operate_income'},
            {value:'前台情况', view:'foreground_statistics'},
            {value:'会员消费查询', view:null},
            {value: '未付款统计', view:'unpaid_statistics'},
            {value:'余额统计', view:'balance_statistics'},
            {value:'充值统计', view:'recharge_up'},
            {value:'消费统计', view:null},
           
           
           
           
        ]
    },
    {
        value:'客户管理', 
        options:[
            { value:'售卡', view:'sale_card'},
            { value:'充值', view:'recharge'},
            { value:'会员信息修改', view:'member_info_update'},
            { value: '挂失', view:'report_loss_main'},
            { value:'解除挂失', view:'Solut_ionto_hang'},
            { value: '换卡', view:'exchange_card'}, 
            { value: '退卡', view:'return_card'},
            { value: '挂失查询', view:null},
            { value: '退卡查询', view:null},
            { value:'客户信息查询', view:null},            
        ]
    },
    {
        value:'信息统计', 
        options:[
            {value:'撤单统计', view:'revoke_data'},
            {value:'赔付统计', view:null}
        ]
    },
    {
        value:'财务统计', 
        options:[
            { value: '经理收款', view:'manager_gathering'},
            {value:'经理查询', view:null},
            {value:'经营日报', view:null},
            {value:'营业统计', view:null},
            {value:'营业明细', view:'operating_details'},
            {value:'营业分析', view:null},
            {value:'欠款明细', view:null},
            {value:'会员业务统计', view:null},
            {value:'会员分类统计', view:null},
            // {value:'会员消费统计', view:'member_consumption_statistics'},
            {value:'衣物统计', view:null}
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
        options:[
            {value:'门店管理', view:null},
            {value:'员工与权限', view:'staff_management'},
            {value:'价格设置', view:null},
            {value:'参数设置', view:null},
            {value:'设备管理', view:null},
            {value:'数据导入',  view:'data'},
            {value:'密码修改', view:null},
            {value: '其他设置', view:'commodity_classify_management'},
            {value:'关于速洗达', view:null}
        ]
    }
];
//顶部导航栏配置    value:导航名称;class:样式名称;view:展示的视图组件名称
export const nav = [
    {value:'收衣',class:'main-clothes',view:'clothes'},
    {value:'售卡',class:'main-sale-card',view:'sale_card'},
    {value:'充值',class:'main-recharge',view:'recharge'},
    {value:'营业日报',class:'main-income',view:'operate_income'},
    {value:'退出',class:'main-quit',view:null, event:'quit'},
];
//左侧菜单配置    value:菜单名称;options:子选单列表;options>value:子选单名称;options>view:子选单视图;
export const leftMenu = [
    {
        value:'常用任务', 
        options:[
            {value:'收衣',class:'main-clothes',view:'clothes'},
            {value:'取衣',class:'main-take',view:'take_clothes'},
            {value:'售卡',class:'main-sale-card',view:'sale_card'},
            {value:'充值',class:'main-recharge',view:'recharge'}
        ]
    },
    {
        value:'信息查询', 
        options:[
            {value:'衣物查询',class:'main-clothes-search',view:null},
            {value:'客户信息查询',class:'main-member-search',view:null},
            {value:'营业日报',class:'main-income-today',view:null}
        ]
    },
    {
        value:'其他', 
        options:[
            {value:'开钱箱',class:'main-open-case',view:null, event:'open_case'}
        ]
    },
];