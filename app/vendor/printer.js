/**
 * pos/esc打印封装
 * @author Edwin Young
 * @desc 依赖node模块printer    模仿java demo
 */
(function(window){
    window.printer = {
        order: function(printer_name, param, callback) {
            this.OrderPageFactory(printer_name, param, true, callback);
        },
        order2: function(printer_name, param, callback) {
            this.OrderPageFactory(printer_name, param, false, callback);
        },
        card: function(printer_name, param, callback) {
            this.CardPageFactory(printer_name, param, true, callback);
        },
        card2: function(printer_name, param, callback) {
            this.CardPageFactory(printer_name, param, false, callback);
        },
        code2: function(printer_name, param, callback) {
            new PrintUtil(printer_name, function(err, msg) {
                if (err) return alert(msg);
                this.zplStart()
                    .zplPosition(60, 24)
                    .zplPixel('a')
                    .zplAbsolute(0, 0).zplText(param.logo_name)
                    .zplAbsolute(0, 30).zplBarcode(param.sn)
                    .zplAbsolute(260, 0).zplText(param.name + ' ' + param.color+ ' ' + param.service)
                    .zplAbsolute(260, 24).zplText('瑕疵:' +param.reark)
                    .zplAbsolute(260, 48).zplText('衣挂号:' + param.number + ' 取衣时间:' + param.time.split(' ')[0])
                    .zplAbsolute(260, 72).zplText('客户:' + param.user_name + ' 电话:' + param.tell)
                    .zplEnd()
                    .sendZpl(callback);
            });
        },
        code3: function(printer_name, param, callback) {
            new PrintUtil(printer_name, function(err, msg) {
                if (err) return alert(msg);
                this.zplStart()
                    .zplPosition(60, 24)
                    .zplPixel('a')
                    .zplAbsolute(0, 0).zplText('测试打印店铺')
                    .zplAbsolute(0, 30).zplBarcode('test123456')
                    .zplAbsolute(260, 0).zplText('测试打印数据')
                    .zplAbsolute(260, 24).zplText('瑕疵:测试')
                    .zplAbsolute(260, 48).zplText('衣挂号:测试 取衣时间:2018-12-31')
                    .zplAbsolute(260, 72).zplText('客户:测试用户 电话:100100100')
                    .zplEnd()
                    .sendZpl(callback);
            });
        },
        test: function(printer_name, param, callback) {
            new PrintUtil(printer_name, function(err, msg) {
                if (err) return alert(msg);
                var code = '01234567890123123456';
                this.align('c')
                    .text('试试看能否正确扫描条码')
                    .barcode(code)
                    .line()
                    .text(code)
                    .line(3)
                    .print(callback);
                });
        },
        shift: function(printer_name, param, callback) {    //交班打印
            new PrintUtil(printer_name, function(err, msg) {
                if (err) return alert(msg);
                this.align('c')
                    .text('交班报表')
                    .align('l')
                    .text('统计日期：' + param.start + '至' + param.end)
                    .text('打印时间：' + this.now());
                try {
                    var data = JSON.parse(param.data);
                } catch (e) {
                    data = [];
                }
                var len = data.length;
                for (var i = 0;i < len;++i) {
                    if (0 == i || '合计' == data[i].name || data[i].amount > 0 || data[i].real_amount > 0 || data[i].count > 0) {
                        this.text(data[i].name + '  ' + data[i].amount + '  ' + data[i].real_amount + '  ' + data[i].count);
                    }
                }
                this.line(3).print(callback);
            });
        },
        intoFactory: function(printer_name, param, callback) {    //入厂打印
            new PrintUtil(printer_name, function(err, msg) {
                if (err) return alert(msg);
                this.align('c')
                    .text(param.mname + '入厂单凭证')
                    .dashed()
                    .align('l')
                    .text('订单号:' + param.oid)
                    .text('打印时间：' + this.now())
                    .dashed()
                    .text('送洗门店:' + param.mname)
                    .text('入厂门店:' + param.ename)
                    .text('总件数:' + param.count)
                    .text('操作员:' + param.operator)
                    .text('接收人签字:')
                    .dashed()
                    .text('店铺地址:' + param.maddress)
                    .text('服务热线:' + param.phone_number)
                    .line(3)
                    .print(callback);
            });
        },
        outofFactory: function(printer_name, param, callback) {    //出厂厂打印
            new PrintUtil(printer_name, function(err, msg) {
                if (err) return alert(msg);
                this.align('c')
                    .text(param.mname + '出厂单凭证')
                    .dashed()
                    .align('l')
                    .text('订单号:' + param.oid)
                    .text('打印时间：' + this.now())
                    .dashed()
                    .text('出厂门店:' + param.mname)
                    .text('送返门店:' + param.ename)
                    .text('总件数:' + param.count)
                    .text('操作员:' + param.operator)
                    .text('接收人签字:')
                    .dashed()
                    .text('店铺地址:' + param.maddress)
                    .text('服务热线:' + param.phone_number)
                    .line(3)
                    .print(callback);
            });
        },
        openCashbox: function(printer_name, param, callback) {
            new PrintUtil(printer_name, function(err, msg) {
                if (err) return alert(msg);
                this.openCashbox().print(callback);
            });
        },
        OrderPageFactory: function(printer_name, param, reserve, callback) {    //订单打印工厂方法
            new PrintUtil(printer_name, function(err, msg) {
                if (err) return alert(msg);
                this.align('c')
                    .text('mname'.getData())
                    .text(reserve ? '留底单' : '洗衣单')
                    .align('l')
                    .text('订单号:' + param.sn)
                    .align('c')
                    .barcode(param.sn, (param.sn.length > 14 ? null : {width:3}))
                    .line()
                    .align('l')
                    .text('打印时间:' + this.now())
                    .text('衣物编码   名称   颜色   衣挂号');
                if (param.items) {
                    var items, put_codes;
                    try {
                        items = JSON.parse(param.items);
                    } catch (e) {
                        items = [];
                    }
                    try {
                        put_codes = JSON.parse(param.put_codes);
                    } catch (e) {
                        put_codes = [];
                    }
                    var len = items.length
                    ,   pLen = put_codes.length
                    ,   json, tempLen, tempCode, p, j;
                    for (var i = 0;i < len;++i) {
                        for (p = 0;p < pLen;++p) {
                            if (items[i].clothing_number == put_codes[p].clothing_number && !put_codes[p].used) {
                                tempCode = put_codes[p].grid_num;
                                put_codes[p].used = true;
                                break;
                            }
                        }
                        this.dashed()
                            .text(items[i].clothing_number + ' ' + items[i].clothing_name + ' ' + items[i].clothing_color + ' ' + ('undefined' === typeof items[i].grid_num || '' == items[i].grid_num? tempCode : items[i].grid_num));
                        '' != items[i].sign && this.text('品牌:' + items[i].sign);
                        '' != items[i].remark && this.text('瑕疵:' + items[i].remark);
                        '' != items[i].forecast && this.text('洗后预估:' + items[i].forecast);
                        this.text('单价:￥' + items[i].raw_price + ' '+ (1 == items[i].has_discount ? '打折' : '不打折'));
                        try {
                            json = JSON.parse(items[i].json);
                        } catch (e2) {
                            json = [];
                        }
                        if ('object' === typeof json) {
                            tempLen = json.length;
                            for (j = 0;j < tempLen;++j) {
                                this.text(json[j].name +':￥'+ json[j].value +' '+ (json[j].discount ? '打折' : '不打折'));
                            }
                        }
                    }
                    this.text('总金额:￥' + param.total + ' 总件数:' + len);
                }
                this.text('付款方式:' + (param.gateway ? param.gateway : '未付款'))
                    .text('折扣率:' + param.discount + '%');
                param.reduce && this.text('优惠:￥' + param.reduce + ' ' + param.reduce_cause);
                param.coupon && this.text('现金券:￥' + param.coupon + ' ' + param.coupon_name);
                param.pay_amount && this.text('折后价:￥' + param.real_amount + '实收:￥' + param.pay_amount);
                param.change && this.text('找零:￥' + param.change);
                param.debt && this.text('欠款:￥' + param.debt);
                param.number && this.text('卡号:' + param.number);
                param.balance && this.text('余额:￥' + param.balance);
                this.dashed()
                    .text('客户姓名:' + param.name)
                    .text('客户地址:' + param.uaddr)
                    .text('客户电话:' + param.phone);
                param.time && this.text('取衣时间:' + param.time);
                this.dashed().text('操作员:' + 'aname'.getData());
                if (!reserve) {
                    this.text('店铺地址:' + param.addr)
                        .text('服务热线:' + param.mphone)
                        .dashed()
                        .text(param.ad);
                }
                this.line(3).print(callback);
            });
        },
        CardPageFactory: function(printer_name, param, reserve, callback) {
            new PrintUtil(printer_name, function(err, msg) {
                if (err) return alert(msg);
                this.align('c')
                    .text(reserve ? '会员卡充值存根' : '会员卡充值回单')
                    .align('l')
                    .text('流水号:' + param.sn)
                    .text('充值日期:' + this.now())
                    .dashed().text('客户电话:' + param.phone)
                    .text('客户姓名:' + param.name)
                    .text('卡  号:' + param.number)
                    .text('折扣率:' + (param.discount || 10) * 10 + '%')
                    .text('充值金额:￥' + param.recharge)
                    .text('赠送金额:￥' + param.give)
                    .text('卡内总额:￥' + param.recharge.add(param.balance, param.give) + ' 店员:' + 'aname'.getData())
                    .text('付款方式:' + param.gateway)
                    .dashed().text('本店地址:' + param.addr)
                    .text('查询电话:' + param.mphone)
                    .line(3).print(callback);
            });
        }
    };
})(window);