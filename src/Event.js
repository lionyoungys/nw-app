//事件注册配置
(function(window) {
    const { execFileSync } = window.require('child_process');
    var e = {
        win:nw.Window.get(),
        printPageQueue:[],    //打印队列
        printPageLock:false,      //打印线程锁
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
        //小票打印机：printer
        //水洗标签打印机：clean_tag_printer
        //不干胶标签打印机：glue_tag_printer
        if (!this.printPageLock && null === this.printPageWin) {
            this.printPageLock = true
            nw.Window.open(
                this.getPrintPageName(page_name, param),
                {show:false},
                function(new_win) {
                    e.printPageWin = new_win;
                    e.printPageWin.on('close', function() {
                        null !== e.printPageWin && e.printPageWin.close(true);
                        this.close(true);
                    });
                    e.printPageWin.on('closed', function() {
                        e.printPageLock = false;
                        e.printPageWin = null;
                        if (e.printPageQueue.length) {
                            e.print(e.printPageQueue[0].page_name, e.printPageQueue[0].param, e.printPageQueue[0].printer, e.printPageQueue[0].callback);
                            e.printPageQueue.splice(0, 1);
                        }
                    });
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
        } else {
            this.printPageQueue.push({page_name:page_name, param:param, printer:printer, callback:callback});
        }
    },
    e.open_case = function() {    //打开钱箱
        let os = window.require('os')
        ,   scriptName = 'script/open_case.';
        if (os.release().split('.')[0] > 5) {
            let printer = 'open_case_printer'.getData();
            scriptName += 'exe';
            printer ? this.exec(scriptName, [printer]) : this.exec(scriptName);
        } else {
            try {
                this.exec(scriptName + 'com');
            } catch (e) {
                console.log(e.message);
            }
        }
    },
    e.exec = function(file, args) {    //运行文件
        if ('string' === typeof file) {
            if (!tool.isArray(args)) args = [];
            execFileSync(file, args)
        }
    }
    e.printerSetting = function() {    //打开打印机设置
        this.exec('rundll32.exe', ['shell32.dll,SHHelpShortcuts_RunDLL', 'PrintersFolder']);
    }
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
        api.post('card_exist', {recharge_number:obj.sn, token:'token'.getData()}, (res, ver) => {
            console.log(res);
            if (!ver || res.result) return tool.ui.error({msg:'已重复的卡号',callback:close => close()});
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
        });
    }

    e.notify = function(obj) {
        obj = tool.isObject(obj) ? obj : {title:'标题',body:'内容',data:'data'}
        if (Notification && 'granted' === Notification.permission) {
            let notify = new Notification(obj.title, {body: obj.body,data:obj.data,lang:"zh-CN",icon:'img/icon.png'});
            notify.onshow = obj.onshow;
            notify.onclick = () => {
                this.win.focus();
                'function' === typeof obj.onclick && obj.onclick();
            }
            // notify.onclose = obj.onclose;
            // notify.onerror = obj.onerror;
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