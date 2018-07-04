(function(window) {
    String.prototype.add = 
    Number.prototype.add = function() {
        var len = arguments.length
        ,   that = parseFloat(this);
        if (isNaN(that)) that = 0;
        if (len < 1) return that;
        var precision = 1000000
        ,   value = Math.floor(that * precision)
        ,   temp;
        for (var i = 0;i < len;++i) {
            temp = parseFloat(arguments[i]);
            value += Math.floor( (isNaN(temp) ? 0 : temp) * precision);
        }
        return (value / precision);
    }
    Node.prototype.show = function() {this.style.display = '';}
    Node.prototype.hidd = function() {this.style.display = 'none';}

    var init = function() {    //初始化函数
        var str = window.location.search.substring(1);    //获取url的get参数
        if ('' != str) {
            var arr = str.split('&')
            ,   len = arr.length;
            if (len > 0) {
                var temp;
                for (var i = 0;i < len;++i) {
                    temp = arr[i].split('=');
                    if ('' != temp[0] && 'undefined' != temp[1]) c.GET[temp[0]] = decodeURIComponent(temp[1]);
                }
            }
        }
    }
    var win = nw.Window.get()
    ,   c = {
        GET:{},
        DATE:null,
        win:win,
        showDevTools:win.showDevTools,
        close:win.close,
        init:function(func) {    //初始化函数
            var str = window.location.search.substring(1);    //获取url的get参数
            if ('' != str) {
                var arr = str.split('&')
                ,   len = arr.length;
                if (len > 0) {
                    var temp;
                    for (var i = 0;i < len;++i) {
                        temp = arr[i].split('=');
                        if ('' != temp[0] && 'undefined' != temp[1]) this.GET[temp[0]] = decodeURIComponent(temp[1]);
                    }
                }
            }
            if ('function' === typeof func) window.onload = func;
        },
        barcode:function(elem, code) {JsBarcode(elem, code, {displayValue:false, width:2, height:30})},    //依赖JsBarcode
        print:function(printer) {    //打印方法
            win.print({
                autoprint:true,
                printer:printer || '',
                headerFooterEnabled:false,
                marginsType:3,
                mediaSize:{'name':'CUSTOM', 'width_microns':58000, 'custom_display_name':'Letter', 'is_default':true},
                marginsCustom:{"marginBottom":0,"marginLeft":13,"marginRight":22,"marginTop":0}
            });
        },
        first:function(name) {return document.querySelector(name)},
        all:function(name) {return document.querySelectorAll(name)},
        isNode:function(node) {return 'object' === typeof node && node instanceof Node},
        isNodeList:function(nodeList) {return 'object' === typeof nodeList && nodeList instanceof NodeList},
        elem:function(elem) {
            if ('string' === typeof elem && '' !== elem) {
                return (elem.indexOf('#') === 0) ? this.first(elem) : this.all(elem);
            } else if (this.isNode(elem) || this.isNodeList(elem)) {
                return elem;
            }
            return null;
        },
        html:function(elem) {
            var node = this.elem(elem);
            if (this.isNode(node)) {
                return node.innerHTML;
            } else if (this.isNodeList(node)) {
                var len = node.length
                ,   arr = [];
                for (var i = 0;i < len;++i) {
                    arr.push(node[i].innerHTML);
                }
                return arr;
            }
        },
        inner:function(elem, value) {
            if ('undefined' === typeof value) return;
            var node = this.elem(elem);
            if (this.isNode(node)) {
                node.innerHTML = value;
            } else if (this.isNodeList(node)) {
                var len = node.length;
                for (var i = 0;i < len;++i) {
                    node[i].innerHTML = value;
                }
            }
        },
        date:function() {
            if (null === this.DATE) {
                var date = new Date()
                ,   month = date.getMonth() + 1
                ,   day = date.getDate()
                ,   hour = date.getHours()
                ,   minute = date.getMinutes()
                ,   second = date.getSeconds();
                this.DATE = date.getFullYear() + '-'
                +      (10 > month ? '0' + month : month) + '-'
                +      (10 > day ? '0' + day : day) + ' '
                +      (10 > hour ? '0' + hour : hour) + ':'
                +      (10 > minute ? '0' + minute : minute) + ':'
                +      (10 > second ? '0' + second : second);
            }
            return this.DATE;
        },
        now:function() {
            this.inner(
                '#now', 
                this.date()
            );
        },
        hidd:function(elem) {
            var node = this.elem(elem);
            this.isNode(node) && node.hidd();
        },
        show:function(elem) {
            var node = this.elem(elem);
            this.isNode(node) && node.show();
        }
    };
    win.on('close', function() {
        this.hide();
        null !== win && win.close(true);
        this.close(true);
    });
    win.on('closed', function() {win = null});
    init();
    window._ = c;
})(window);