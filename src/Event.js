//事件注册配置
(function(window) {
    const { execFileSync } = window.require('child_process');
    var e = {
        win:nw.Window.get(),
        printPageNames:['code2', 'code3', 'test2', 'put_it_on'],
        printPageQueue:[],    //打印队列
        printPageLock:false,      //打印线程锁
    };
    e.printPageCount = e.printPageNames.length,
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
    e.print = function(page_name, param, printer_name, callback) {    //打印
        let printCmd = true;
        for (var i = 0;i < this.printPageCount;++i) {
            if (this.printPageNames[i] == page_name) {
                printCmd = false;
                break;
            }
        }
        if (printCmd) return 'function' === typeof printer[page_name] && printer[page_name](printer_name, param, callback);
        //小票打印机：printer
        //水洗标签打印机：clean_tag_printer
        //不干胶标签打印机：glue_tag_printer
        if (!this.printPageLock) {
            this.printPageLock = true
            nw.Window.open(
                this.getPrintPageName(page_name, param),
                {show:false},
                function(new_win) {
                    new_win.on('close', function() {
                        null !== new_win && new_win.close(true);
                        this.close(true);
                    });
                    new_win.on('closed', function() {
                        e.printPageLock = false;
                        new_win = null;
                        if (e.printPageQueue.length) {
                            e.print(e.printPageQueue[0].page_name, e.printPageQueue[0].param, e.printPageQueue[0].printer_name, e.printPageQueue[0].callback);
                            e.printPageQueue.splice(0, 1);
                        }
                    });
                    new_win.on('loaded', function() {
                        new_win.print({
                            autoprint:true,
                            printer:printer_name || '',
                            headerFooterEnabled:false,
                            marginsType:3,
                            mediaSize:{'name':'CUSTOM', 'width_microns':58000, 'custom_display_name':'Letter', 'is_default':true},
                            marginsCustom:{"marginBottom":0,"marginLeft":13,"marginRight":22,"marginTop":0}
                        });
                        setTimeout(function() {
                            new_win.close(true);
                            'function' === typeof callback && callback();
                        }, 1000);
                    });
                }
            );
        } else {
            this.printPageQueue.push({page_name:page_name, param:param, printer_name:printer_name, callback:callback});
        }
    },
    e.open_case = function() {    //打开钱箱
        printer.openCashbox();
        /*let os = window.require('os')
        ,   scriptName = 'script/open_case/open_case.';
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
        }*/
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

    e.notify = function(obj) {    //{title:'标题',body:'内容',onshow:func,onclick:func,onclose:func}
        obj = tool.isObject(obj) ? obj : {title:'标题',body:'内容'}
        if (Notification && 'granted' === Notification.permission) {
            let notify = new Notification(obj.title, {body: obj.body, lang:"zh-CN", icon:'img/icon.png'});
            notify.onshow = obj.onshow;
            notify.onclose = obj.onclose;
            notify.onclick = () => {
                this.win.focus();
                'function' === typeof obj.onclick && obj.onclick();
            }
        }
    }
    window.EventApi = e;
})(window);