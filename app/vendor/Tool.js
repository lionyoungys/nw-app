/**
 * 工具及原型函数库
 * @author Edwin Young
 */

(function(window) {
    var fs = require('fs');
    /**
     * localStorage数据存储
     * @param key 数据存储键
     * @return string
     */
    String.prototype.setData = 
    Number.prototype.setData = function (key) {
        'string' === typeof key && localStorage.setItem(key, this);
    }
    /**
     * localStorage根据字符键进行数据获取
     * @return string
     */
    String.prototype.getData = function () {
        return localStorage.getItem(this);
    }
    /**
     * 获取mime类型
     * @return string
     */
    String.prototype.mime = function () {
        var result = /\.[^\.]+$/.exec(this);
        if (null === result) return null;
        var ext = result[0].replace('.', '').toLowerCase();
        if ('jpg' === ext) ext = 'jpeg';
        return 'image/' + ext;
    }
    /**
     * 文件路径转二进制对象
     * @return Blob
     */
    String.prototype.blob = function () {return new Blob([fs.readFileSync(this)], {type: this.mime()})}
    
    var t = {
        
    };    //工具类对象

    t.keycode = function(object) {
        if (object instanceof KeyboardEvent) {
            var code = [];
        }
        return '';
    }

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

    window.tool = t;
})(window);