//事件注册配置
(function(window) {
    var e = {};
    e.quit = function() {    //退出
        let win = nw.Window.get();
        nw.Window.open('login.html', nw.App.manifest.loginWindow);
        win.close();
    }
    e.print = function(pageName, param) {    //打印
        let getParam = '';
        if ('object' === typeof param && param instanceof Object) {
            getParam = '?' + tool.toUrlString(param);
        } else if ('string' === typeof param) {
            getParam = '?' + param;
        }
        nw.Window.open(
            'print/' + pageName + '.html' + getParam,
            {
                new_instance:true, 
                show:false
            }
        );
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
    e.M1Read = function(obj) {
        if ('object' !== typeof obj || !(obj instanceof Object)) return;
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
            if (card.error) {
                loadingEnd();
                return tool.ui.error({msg:'读卡失败',callback:close => close()});
            }
            if (card.empty) {
                loadingEnd();
                return tool.ui.error({msg:'卡片数据为空',callback:close => close()});
            }
            if (card.hasUpdate) {    //会员卡已更新为本平台的卡
                data.id = card.cid;
            } else {
                data.recharge_number = card.sn;
            }
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
    window.EventApi = e;
})(window);