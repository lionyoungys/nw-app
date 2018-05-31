/**
 * 工具函数库
 * @author Edwin Young
 */

(function(window) {
    var t = {
        ui: {},    //ui组件对象
        include:function (moduleName){    //引入模块方法
            if ('node-adodb' === moduleName) {
                var ADODB = require('node-adodb');
                ADODB.connection = function(address, password) {
                    password = password || '';
                    return ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=' + address + ';Persist Security Info=False;Jet OLEDB:Database Password=' + password);
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
        var button = this.c('button', 'e-btn', 'string' === typeof object.button ? object.button : '确认')
        button.type = 'button';
        bg.appendChild(layer);    //追加节点
        layer.appendChild(title);
        title.appendChild(close);
        layer.appendChild(content);
        layer.appendChild(bottom);
        bottom.appendChild(button);
        document.body.appendChild(bg);
        this.center(layer);
        close.onclick = function() {'function' === typeof object.callback && object.callback(function() {document.body.removeChild(bg)}, 'close')}
        button.onclick = function() {'function' === typeof object.callback && object.callback(function() {document.body.removeChild(bg)}, 'click')}
    }
    t.ui.ask = function ask(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}
    t.ui.error = function error(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}
    t.ui.warn = function warn(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}
    t.ui.success = function success(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}

    window.tool = t;
})(window);