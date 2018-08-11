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
    
    var c = {
        GET:{},
        DATE:null,
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
        barcode:function(elem, code) {'function' === typeof JsBarcode && JsBarcode(elem, code, {displayValue:false, width:2, height:30, margin:0})},    //依赖JsBarcode
        first:function(name) {return document.querySelector(name)},
        all:function(name) {return document.querySelectorAll(name)},
        create:function(nodeName, className, inner) {
            var node = document.createElement(nodeName);
            if ('string' === typeof className) node.className = className;
            if ('string' === typeof inner || 'number' === typeof inner) node.innerHTML = inner;
            return node;
        },
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
        },
        string:function(value) {return 'string' === typeof value && value;},
        page:function(widthKey, fontSizeKey, unitKey) {
            var body = document.body
            ,   width = this.string(widthKey) ? localStorage.getItem(widthKey) : null
            ,   fontSize = this.string(fontSizeKey) ? localStorage.getItem(fontSizeKey) : null
            ,   unit = this.string(unitKey) ? (localStorage.getItem(unitKey) || 'pt') : 'pt';
            if (width && !isNaN(width)) body.style.width = (width / 10) + 'cm';
            if (fontSize && !isNaN(fontSize)) body.style.fontSize = (fontSize + unit);
            console.log(width, fontSize, unit);
        }
    };
    window._ = c;
})(window);