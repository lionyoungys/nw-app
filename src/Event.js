//事件注册配置
export default {
    quit:function() {    //退出
        let win = nw.Window.get();
        nw.Window.open('login.html', nw.App.manifest.loginWindow);
        win.close();
    }
}