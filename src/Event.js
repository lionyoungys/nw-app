//事件注册配置
export default {
    quit:function() {    //退出
        let win = nw.Window.get();
        nw.Window.open('login.html', {}, loginWin => {
            loginWin.on('close', function() {
                this.hide();
                null !== loginWin && loginWin.close(true);
                this.close(true);
            });
            loginWin.on('closed', function() {loginWin = null});
        });
        win.close();
    }
}