(function(window) {
    var init = function() {    //初始化函数
        var str = window.location.search.substring(1);    //获取url的get参数
        if ('' != str) {
            var arr = str.split('&')
            ,   len = arr.length;
            if (len > 0) {
                var temp;
                for (var i = 0;i < len;++i) {
                    temp = arr[i].split('=');
                    if ('' != temp[0]) c.GET[temp[0]] = decodeURIComponent(temp[1]);
                }
            }
        }
    }
    var c = {
        GET:{},
        win:nw.Window.get(),
        barcode:function(elem, code) {JsBarcode(elem, code, {displayValue:false, width:2, height:30})},    //依赖JsBarcode
        print:function() {    //打印退出方法
            this.win.print({
                headerFooterEnabled:false,
                marginsType:3,
                mediaSize:{'name':'CUSTOM', 'width_microns':58000, 'custom_display_name':'Letter', 'is_default':true},
                marginsCustom:{"marginBottom":0,"marginLeft":13,"marginRight":22,"marginTop":0}
            });
            this.win.close();
        },
        id:function(id) {return document.getElementById(id)},
        insertById:function(elem, value) {
            if ('string' === typeof elem && '' !== elem) {
                var node = document.getElementById(elem);
                if ('object' === typeof node && node instanceof Node) node.innerHTML = value;
            }
        },
        now:function() {
            var date = new Date();
            this.insertById(
                'now', 
                date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
            );
        }
    };
    c.win.on('close', function() {
        this.hide();
        null !== c.win && c.win.close(true);
        this.close(true);
    });
    c.win.on('closed', function() {c.win = null});
    init();
    window.common = c;
})(window);