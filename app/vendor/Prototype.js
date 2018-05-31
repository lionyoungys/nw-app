/**
 * 原型函数库
 * @author Edwin Young
 */

(function() {
    var mime = {bmp:'image/bmp',gif:'image/gif',png:'image/png',jpeg:'image/jpeg',jpg:'image/jpeg',jpe:'image/jpeg',txt:'text/plain'};
    //去除字符串中的空字符；
    String.prototype.trim = function () {return this.replace(/(^\s*)|(\s*$)/g,'')};
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
     * 判断字符串是否在指定数组里
     * @param array 数组
     * @return ret 索引值/-1
     */
    Number.prototype.inArray = 
    String.prototype.inArray = function(array) {
        var ret = -1
        ,   len = array.length;
        if (array instanceof Array && len > 0) {
            for (var i = 0;i < len;++i) {
                if (array[i] == this) {
                    ret = i;
                    break;
                }
            }
        }
        return ret;
    };

    /**
     * 判断字符串是否在指定key的对象数组中
     * @param array 数组
     * @param key 键 
     * @return ret 索引值/-1
     */
    Number.prototype.inObjArray = 
    String.prototype.inObjArray = function(array, key) {
        var ret = -1
        ,   len = array.length;
        if (array instanceof Array && len > 0) {
            for (var i = 0;i < len;++i) {
                if (this == array[i][key]) {
                    ret = i;
                    break;
                }
            }
        }
        return ret;
    };

    /**
     * 数值或数值字符串转成百分数字符串
     * @return String
     */
    Number.prototype.toRate = 
    String.prototype.toRate = function() {return (this * 100) + '%'};

    /**
     * url参数字符串转对象
     * @return object
     */
    String.prototype.toObject = function () {
        var arr = (-1 === '?'.indexOf(this)) ? this.split('&') : this.split('?')[1].split('&')
        ,   len = arr.length
        ,   obj = {};
        if (len > 0) {
            var tempArr;
            for (var i = 0;i < len;++i) {
                tempArr = arr[i].split('=');
                obj[tempArr[0]] = decodeURIComponent(tempArr[1]);
            }
        }
        return obj;
    }

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