//事件注册配置
export default {
    quit:function() {    //退出
        let win = nw.Window.get();
        nw.Window.open('login.html', nw.App.manifest.loginWindow);
        win.close();
    },
    print:function() {    //退出
        let win = nw.Window.get();
        nw.Window.open('print/index.html');
        //win.close();
    },
    open_case:function() {    //打开钱箱
        let os = window.require('os')
        ,   { execFileSync } = window.require('child_process')
        ,   scriptName = 'script/open_case.';
        if (os.release().split('.')[0] >= 7) {
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
    }
}