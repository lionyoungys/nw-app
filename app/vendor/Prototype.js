/**
 * 原型函数库
 * @author Edwin Young
 */

(function() {
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
})();