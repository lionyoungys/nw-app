//事件注册配置
(function(window) {
    var e = {
        win:nw.Window.get(),
        printPageWin:null,
    };
    e.quit = function() {    //退出
        nw.Window.open('login.html', nw.App.manifest.window);
        this.win.close(true);
    }
    e.printers = function (callback) {    //获取打印机列表
        'function' === typeof callback && this.win.getPrinters(callback);
    }
    e.getPrintPageName = function (page_name, param) {
        let get = '';
        if (tool.isObject(param)) {
            get = '?' + tool.toUrlString(param);
        } else if ('string' === typeof param) {
            get = '?' + param;
        }
        return 'print/' + page_name + '.html' + get;
    }
    e.print = function(page_name, param, printer, callback) {    //打印
        if (null === this.printPageWin) {
            nw.Window.open(
                this.getPrintPageName(page_name, param),
                {show: false},
                function(new_win) {
                    e.printPageWin = new_win;
                    e.printPageWin.on('close', function() {
                        null !== e.printPageWin && e.printPageWin.close(true);
                        this.close(true);
                    });
                    e.printPageWin.on('closed', function() {e.printPageWin = null});
                    e.printPageWin.on('loaded', function() {
                        e.printPageWin.print({
                            autoprint:true,
                            printer:printer || '',
                            headerFooterEnabled:false,
                            marginsType:3,
                            mediaSize:{'name':'CUSTOM', 'width_microns':58000, 'custom_display_name':'Letter', 'is_default':true},
                            marginsCustom:{"marginBottom":0,"marginLeft":13,"marginRight":22,"marginTop":0}
                        });
                        setTimeout(function() {
                            e.printPageWin.close(true);
                            'function' === callback && callback();
                        }, 1000);
                    });
                }
            );
        } 
    },
    e.open_case = function() {    //打开钱箱
        let os = window.require('os')
        ,   { execFileSync } = window.require('child_process')
        ,   scriptName = 'script/open_case.';
        if (os.release().split('.')[0] > 5) {
            let printer = 'printer'.getData();
            scriptName += 'exe';
            'string' === typeof printer && printer.length > 0 ? execFileSync(scriptName, [printer]) : execFileSync(scriptName);
        } else {
            try {
                execFileSync(scriptName + 'com');
            } catch (e) {
                console.log(e.message);
            }
        }
    },
    e.M1Read = function(obj) {    //读卡
        if ('object' !== typeof obj || !(obj.constructor === Object)) return;
        let loadingEnd;
        tool.ui.loading(handle => loadingEnd = handle);
        let data = {token:'token'.getData()};
        if (obj.number) {
            data.recharge_number = obj.number;
        } else {
            try {
                var card = M1Reader.get();
            } catch (e) {
                loadingEnd();
                return tool.ui.error({msg:'读卡失败',callback:close => close()});
            }
            if (card.empty) {
                loadingEnd();
                return tool.ui.error({msg:'卡片数据为空',callback:close => close()});
            }
            if (card.error) {
                loadingEnd();
                return tool.ui.error({msg:'读卡失败',callback:close => close()});
            }
            if ('' == card.sn) {
                loadingEnd();
                return tool.ui.error({msg:'卡片数据为空!',callback:close => close()});
            }
            data.recharge_number = card.sn;
            // if (card.hasUpdate) {    //会员卡已更新为本平台的卡
            //     data.id = card.cid;
            // } else {
            //     data.recharge_number = card.sn;
            // }
        }
        api.post(
            'cardDetail', 
            data, 
            (res, ver, handle) => {
                console.log(res);
                loadingEnd();
                ver ? ( 'function' === typeof obj.callback && obj.callback(res.result) ) : handle();
            },
            () => loadingEnd()
        );
    }
    e.M1Write = function(obj) {    //写卡
        if (!tool.isObject(obj)) return tool.ui.error({msg:'写卡数据错误',callback:close => close()});
        if ('string' !== typeof obj.sn || '' == obj.sn || obj.sn.length > 16) return tool.ui.error({msg:'卡号格式错误',callback:close => close()});
        obj.mid = obj.mid || 'merchant_id'.getData();
        obj.cid = obj.cid || '0';
        try {
            var result = M1Reader.set(obj);
        } catch (e) {
            result = false;
        }
        if (!result) {
            setTimeout(() => {
                tool.ui.error({msg:'写卡失败',button:'重试',callback:(close, event) => {
                    close();
                    if ('click' == event) {
                        this.M1Write(obj);
                    } else {
                        'function' === typeof obj.fail && obj.fail();
                    }
                }});
            }, 500);
        } else {
            tool.ui.success({msg:'写卡成功',callback:close => {
                close();
                'function' === typeof obj.success && obj.success();
            }});
        }
    }

    e.win.on('loaded', e.win.show);    //防止窗口渲染未完成时展示
    e.win.on('close', function() {
        this.hide();    //关闭时先进行隐藏以让用户觉得立即关闭
        null !== e.win && e.win.close(true);    //虽然关了,但实际上它还在工作
        this.close(true);    //关闭新窗口也关闭主窗口
    });
    e.win.on('closed', function() {e.win = null});    //新窗口关闭后释放'win'对象

    window.EventApi = e;
})(window);