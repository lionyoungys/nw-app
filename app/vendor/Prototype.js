/**
 * 原型函数库
 * @author Edwin Young
 */

(function() {
    var fs = require('fs');
    var mime = {bmp:'image/bmp',gif:'image/gif',png:'image/png',jpeg:'image/jpeg',jpg:'image/jpeg',jpe:'image/jpeg',txt:'text/plain'};
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
        return mime[ext];
    }
    /**
     * 文件路径转二进制对象
     * @return Blob
     */
    String.prototype.blob = function () {return new Blob([fs.readFileSync(this)], {type: this.mime()})}
})();