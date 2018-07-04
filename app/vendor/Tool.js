/**
 * 工具函数库
 * @author Edwin Young
 * @desc iconv方法依赖node模块text-encoding;
 */

(function(window) {
    var t = {
        ui: {},    //ui组件对象
        include:function (moduleName){    //引入模块方法
            if ('node-adodb' === moduleName) {
                var ADODB = require('node-adodb');
                ADODB.connection = function(address, password) {
                    password = password || '';
                    //Provider=Microsoft.Jet.OLEDB.4.0;Data Source=
                    //return ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=' + address + ';Persist Security Info=False;Jet OLEDB:Database Password=' + password);
                    return ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=' + address + ';Jet OLEDB:Database Password=' + password);
                }
                return ADODB;
            }
            return require(moduleName);
        }
    };    //工具类对象

    /**
     * 日期格式化函数
     * @param format 格式
     * @param timestamp 时间戳
     * @return string 日期值
     */
    t.date = function (format, timestamp) {
        var date = isNaN(timestamp) ? new Date() : new Date( timestamp * 1000 );
        if ('string' === typeof format) {
            var month = date.getMonth() + 1,
                day = date.getDate(),
                hour = date.getHours(),
                minute = date.getMinutes(),
                second = date.getSeconds();
            return format.replace('Y', date.getFullYear() )
                         .replace('m', ( 10 > month ? '0' + month : month ) )
                         .replace('d', ( 10 > day ? '0' + day : day ) )
                         .replace('H', ( 10 > hour ? '0' + hour : hour ))
                         .replace('i', ( 10 > minute ? '0' + minute : minute ))
                         .replace('s', ( 10 > second ? '0' + second : second ));
                
        }
        return date;
    }
    /**
     * 数组或对象转url参数字符串
     * @param {*object} object 
     * @return {*string} url string
     */
    t.toUrlString = function(object) {
        var str = '';
        if ('object' === typeof object) {
            for (var k in object) {
                //使用encodeURIComponent将参数值中的特殊字符进行转义防止发送请求时缺省掉特殊字符
                str += ( k + '=' + encodeURIComponent(object[k]) + '&' );
            }
            return str.substr(0, (str.length - 1) );
        }
        return str;
    }

    /**
     * 字符编码解析处理
     * @param {*mixd} data 字符编码转换的数据
     * @param {*string} code 解析的字符编码 
     * @param {*bool} encoding 是否为编码,默认解码
     */
    t.iconv = function (data, code, encoding) {
        var {TextEncoder} = require('text-encoding');
        return encoding ? new TextEncoder(code, {NONSTANDARD_allowLegacyEncoding: true}).encode(data) : new TextDecoder(code).decode(new Uint8Array(data));
    }

    /**
     * 16进制数据转buffer
     * @param {*string} data
     * @return {*Buffer}
     */
    t.data2Buf = function(data) {
        if ('string' !== typeof data) return null;
        var len = (data.length / 2)
        ,   buf = new Buffer(len);
        for (var i = 0;i < len;++i) {
            buf.writeIntLE(parseInt('0x' + data.substring(i * 2, i * 2 + 2)), i);
        }
        return buf;
    }

    /**
     * 字符串填充
     * @param {string} str 使用填充的字符串 
     * @param {number} len 填充长度
     * @return {string}
     */
    t.repeat = function(str, len) {
        var retStr = '';
        for (var i = 0;i < len;++i) {
            retStr += str;
        }
        return retStr;
    }

    /**
     * 对象克隆方法
     * @param {object} object 需要克隆的对象
     * @return {object} object
     */
    t.clone = function(object) {
        if ('object' !== typeof object) return null;
        var obj = (object instanceof Array) ? [] : {};
        for (var k in object) {
            obj[k] = ('object' === typeof object[k] && null !== object[k]) ? this.clone(object[k]) : object[k];
        }
        return obj;
    }

    /**
     * 获取指定天数后的事件戳
     * @param {number} number 天数
     * @return {number} 事件戳
     */
    t.timestamp = function(number) {
        var timestamp = new Date().getTime();
        if (isNaN(number)) return timestamp;
        return Math.floor( (number * 1000 * 3600 * 24 + timestamp) / 1000 );
    }

    /**
     * 判断参数是否为对象
     * @param {object} object 
     * @return bool
     */
    t.is_object = function(object) {
        return 'object' === typeof object && null !== object;
    }
    /**
     * 判断参数是否属于对象类
     * @param {object} object 
     * @return bool
     */
    t.isObject = function(object) {
        return 'object' === typeof object && null !== object && object.constructor === Object;
    }

    //ui对象实现

    /**
     * DOM节点创建方法
     * @param nodeName 节点名称
     * @param className 类名
     * @param inner 节点内容
     */
    t.ui.c = function (nodeName, className, inner) {
        var node = document.createElement(nodeName);
        if ('string' === typeof className) node.className = className;
        if ('string' === typeof inner || 'number' === typeof inner) node.innerHTML = inner;
        return node
    }
    /**
     * 居中定位方法
     * @param node 界面展示节点
     */
    t.ui.center = function (node) {
        if (node instanceof Node) {
            node.style.position = 'absolute';
            node.style.marginTop = -node.offsetHeight / 2 + 'px';
            node.style.marginLeft = -node.offsetWidth / 2 + 'px';
            node.style.top = '50%';
            node.style.left = '50%';
        }
    }

    /**
     * 界面弹出层工厂方法
     * @param name 弹出层名称
     * @param object 弹出层定义对象 {title:标题,msg:弹出提示,info:详细描述信息,button:按钮值,callback(关闭方法, 事件名称:close||click):回调函数}
     */
    t.ui.LayerFactory = function (name, object) {
        var bg = this.c('div', 't-ui-layer');
        var layer = this.c('div', 't-ui-layer-box');
        var title = this.c('div', null, 'string' === typeof object.title ? object.title : '提示');
        var close = this.c('i');
        var msg = '';
        if ('string' === typeof object.msg) {
            msg = object.msg
        } else {
            if ('ask' === name) {
                msg = '确认要删除此内容？';
            } else if ('error' === name) {
                msg = '操作失败';
            } else if ('warn' === name) {
                msg = '已操作过此步骤';
            } else {
                msg = '操作成功';
            }
        }
        var content = this.c(
            'div', 
            null, 
            '<div><img src="img/t-ui-' + name + '.png"/>' + msg + '</div>' 
            + 
            ('string' === typeof object.info ? '<div>' + object.info + '</div>' : '')
        );
        var bottom = this.c('div');
        bg.appendChild(layer);    //追加节点
        layer.appendChild(title);
        title.appendChild(close);
        close.onclick = function() {'function' === typeof object.callback && object.callback(function() {document.body.removeChild(bg)}, 'close')}
        layer.appendChild(content);
        layer.appendChild(bottom);
        var button;
        if ('object' === typeof object.button && object.button instanceof Array) {
            var btnLen = (object.button.length - 1);
            button = [];
            for (var i = 0;i <= btnLen;++i) {
                button.push(this.c('button', 'e-btn', 'string' === typeof object.button[i] ? object.button[i] : i));
                button[i].type = 'button';
                button[i].setAttribute('data-i', i);
                if (i !== btnLen) button[i].style.marginRight = '8px';
                bottom.appendChild(button[i]);
                button[i].onclick = function() {
                    'function' === typeof object.callback && object.callback(function() {document.body.removeChild(bg)}, this.dataset.i);
                }
            }
        } else {
            button = this.c('button', 'e-btn', 'string' === typeof object.button ? object.button : '确认');
            button.type = 'button';
            bottom.appendChild(button);
            button.onclick = function() {'function' === typeof object.callback && object.callback(function() {document.body.removeChild(bg)}, 'click')}
        }
        document.body.appendChild(bg);
        this.center(layer);
        
    }
    t.ui.ask = function ask(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}
    t.ui.error = function error(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}
    t.ui.warn = function warn(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}
    t.ui.success = function success(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}
    /**
     * 加载框
     * @param {function} callback 回调函数，回传参数为加载结束方法
     */
    t.ui.loading = function(callback) {
        var bg = this.c('div', 't-ui-layer')
        ,   loading = this.c('div', 't-ui-loading');
        bg.appendChild(loading);
        document.body.appendChild(bg);
        'function' === typeof callback && callback(function() {document.body.removeChild(bg)});
    }
    window.tool = t;
})(window);