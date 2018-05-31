/**
 * 原型函数库
 * @author Edwin Young
 */

(function() {
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
        return null === result ? null : mime[result[0].replace('.', '').toLowerCase()];
    }
    /**
     * 文件路径转二进制对象
     * @return Blob
     */
    String.prototype.blob = function (buffer) {return new Blob([buffer], {type: this.mime()})}

    /**
     * 通过数组对象获取指定属性的数组
     * @param {*string} key 数组对象将要提取的属性
     * @return {*array} 属性列表数组
     */
    Array.prototype.typeArray = function (key) {
        var len = this.length, arr = [];
        for (var i = 0;i < len;++i) {
            if (this[i] instanceof Object && 'undefined' !== this[i][key]) {
                arr.push(this[i][key]);
            } else {
                break;
            }
        }
        return arr;
    }
})();