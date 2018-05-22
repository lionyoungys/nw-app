/**
 * 工具函数库
 * @author Edwin Young
 */

(function(window) {
    var t = {
        ui:{},    //ui组件对象
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
     * 界面弹出层工厂方法
     * @param name 弹出层名称
     * @param object 弹出层定义对象
     */
    t.ui.LayerFactory = function (name, object) {
        var bg = this.c('div', 't-ui-layer');
        var layer = this.c('div', 't-ui-layer-box');
        var title = this.c('div', null, 'string' === typeof object.title ? object.title : '提示');
        var close = this.c('i');
        var content = this.c('div');
        var bottom = this.c('div');
        bg.appendChild(layer);    //追加节点
        layer.appendChild(title);
        title.appendChild(close);
        layer.appendChild(content);
        layer.appendChild(bottom);

        if ('ask' === name) {

        } else if ('error' === name) {

        } else if ('warn' === name) {

        } else {

        }
        document.body.appendChild(bg);
    }
    t.ui.ask = function ask(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}
    t.ui.error = function error(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}
    t.ui.warn = function warn(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}
    t.ui.success = function success(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}

    window.tool = t;
})(window);