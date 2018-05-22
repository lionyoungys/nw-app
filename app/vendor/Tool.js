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

    //ui方法实现方式
    /**
     * 界面弹出层工厂方法
     * @param name 弹出层名称
     * @param object 弹出层定义对象
     */
    t.ui.LayerFactory = function (name, object) {

    }
    t.ui.ask = function ask() {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0])}
    t.ui.error = function error() {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0])}
    t.ui.warn = function warn() {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0])}
    t.ui.success = function success() {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0])}

    window.tool = t;
})(window);