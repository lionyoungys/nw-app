//顶部菜单配置    value:菜单名称;options:子选单列表;options>value:子选单名称;options>view:子选单视图;
export const topMenu = [
    {
        value:'前台业务', 
        options:[
            {value:'收衣', view:'clothes'},
            {value:'取衣', view:'take_clothes'},
            {value:'欠款补交', view:null},
            {value:'交期预警', view:null},
            {value:'撤单处理', view:null},
            {value:'赔付', view:null}
        ]
    },
    {
        value:'信息查询', 
        options:[
            {value:'格架查询', view:null},
            {value:'衣物查询', view:null},
            {value:'交班', view:null},
            {value:'营业日报', view:null},
            {value:'前台情况', view:null},
            {value:'衣物统计', view:null},
            {value:'会员消费查询', view:null},
            {value:'未付款统计', view:null}
        ]
    },
    {
        value:'客户管理', 
        options:[
            {value:'售卡', view:null},
            {value:'充值', view:null},
            {value:'会员信息修改', view:null},
            {value:'挂失、解挂', view:null},
            {value:'退卡', view:null},
            {value:'客户信息查询', view:null}
        ]
    },
    {
        value:'信息统计', 
        options:[
            {value:'撤单统计', view:null},
            {value:'赔付统计', view:null}
        ]
    },
    {
        value:'财务统计', 
        options:[
            {value:'经理收款', view:null},
            {value:'经理查询', view:null},
            {value:'经营日报', view:null},
            {value:'营业统计', view:null},
            {value:'营业明细', view:null},
            {value:'营业分析', view:null},
            {value:'欠款明细', view:null},
            {value:'会员业务统计', view:null},
            {value:'会员分类统计', view:null},
            {value:'衣物统计', view:null}
        ]
    },
    {
        value:'店铺管理', 
        options:[
            {value:'门店信息', view:null},
            {value:'我的网店', view:null},
            {value:'商品与分类', view:null},
            {value:'员工管理', view:null},
            {value:'卡券中心', view:null},
            {value:'优惠活动', view:null},
            {value:'密码与安全', view:null},
            {value:'数据导入', view:null}
        ]
    },
    {
        value:'系统设置', 
        options:[
            {value:'帮助与反馈', view:null},
            {value:'打印', view:null},
            {value:'格架', view:null},
            {value:'品牌', view:null},
            {value:'颜色', view:null},
            {value:'瑕疵', view:null},
            {value:'洗后预估', view:null},
            {value:'其他设置', view:null},
            {value:'关于速洗达', view:null}
        ]
    }
];
//顶部导航栏配置    value:导航名称;class:样式名称;view:展示的视图组件名称
export const nav = [
    {value:'收衣',class:'main-clothes',view:'clothes'},
    {value:'售卡',class:'main-sale-card',view:null},
    {value:'充值',class:'main-recharge',view:null},
    {value:'营业日报',class:'main-income',view:null},
    {value:'退出',class:'main-quit',view:null, event:'quit'},
];
//左侧菜单配置    value:菜单名称;options:子选单列表;options>value:子选单名称;options>view:子选单视图;
export const leftMenu = [
    {
        value:'常用任务', 
        options:[
            {value:'收衣',class:'main-clothes',view:'clothes'},
            {value:'取衣',class:'main-take',view:'take_clothes'},
            {value:'售卡',class:'main-sale-card',view:null},
            {value:'充值',class:'main-recharge',view:null}
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
            {value:'开钱箱',class:'main-open-case',view:null}
        ]
    },
];