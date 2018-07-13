/**
 * 原型函数库
 * @author Edwin Young
 */

(function() {
    var mime = {bmp:'image/bmp',gif:'image/gif',png:'image/png',jpeg:'image/jpeg',jpg:'image/jpeg',jpe:'image/jpeg',txt:'text/plain'};
    //去除字符串中的空字符；
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g,'')
    };
    //判断输入正整数

    // String.prototype.judgeInt =
    // Number.prototype.judgeInt = function(){

    //     if( /^\d+$/.test(this)){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }

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
        var data = localStorage.getItem(this);
        return data ? data : '';
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
     * 根据数值生成当前毫秒级别的编码号
     * @return {string} 编码号
     */
    Number.prototype.timeCode = function() {
        var timestamp = new Date().getTime().toString();
        if (this < 10) return timestamp + '00' + this;
        if (this < 100) return timestamp + '0' + this;
        return  timestamp + this;
    }

    /**
     * 数值加法
     * @param {number} 数值列表
     * @return {number}
     */
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
    /**
     * 数值减法
     * @param {number} 数值列表
     * @return {number}
     */
    String.prototype.subtract = 
    Number.prototype.subtract = function() {
        var len = arguments.length
        ,   precision = 1000000
        ,   value = Math.floor(parseFloat(this) * precision);
        if (len < 1) return this;
        for (var i = 0;i < len;++i) {
            value -= Math.floor(parseFloat(arguments[i]) * precision);
        }
        return (value / precision);
    }

    /**
     * 返回对象数组指定属性的总长度
     * @param {string} type 对象属性名 
     * @param 总长度
     */
    Array.prototype.objTypeLen = function(type) {
        var len = this.length
        ,   retLen = 0;
        for (var i = 0;i < len;++i) {
            try {
                retLen += this[i][type].length;
            } catch (e) {}
        }
        return retLen;
    }

    /**
     * 通过数组对象获取指定属性的数组
     * @param {string} arguments 数组对象将要提取的属性
     * @return {array} 属性列表数组/属性列表对象数组
     */
    Array.prototype.typeArray = function() {
        var len = this.length
        ,   argLen = arguments.length
        ,   arr = []
        ,   obj = {}
        ,   j;
        for (var i = 0;i < len;++i) {
            if (argLen > 1) {
                for (j = 0;j < argLen;++j) {
                    if ('string' !== typeof arguments[j] && 'number' !== typeof arguments[j]) continue;
                    if (this[i] instanceof Object && 'undefined' !== this[i][arguments[j]]) {
                        if (obj[arguments[j]]) {
                            obj[arguments[j]].push(this[i][arguments[j]]);
                        } else {
                            obj[arguments[j]] = [ this[i][arguments[j]] ];
                        }
                    } else {
                        continue;
                    }
                }
            } else {
                if ('string' !== typeof arguments[0] && 'number' !== typeof arguments[0]) continue;
                if (this[i] instanceof Object && 'undefined' !== this[i][arguments[0]]) {
                    arr.push(this[i][arguments[0]]);
                } else {
                    continue;
                }
            }
        }
        return argLen > 1 ? obj : arr;
    }

    /**
     * 获取数组中与指定对象参数匹配的值的数组
     * @param {object} obj 对象参数
     * @return {array} 
     */
    Array.prototype.intersection = function(obj) {
        var len = this.length
        ,   arr = []
        ,   match = true
        ,   k;
        for (var i = 0;i < len;++i) {
            if ('object' === typeof this[i] && this[i] instanceof Object) {
                for (k in obj) {
                    if ('undefined' === typeof this[i][k] || this[i][k] != obj[k]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    arr.push(this[i]);
                } else {
                    match = true;
                }
            }
        }
        return arr;
    }

    /**
     * 通过键值获取数组对象中匹配值的数量
     * @param {string} key 
     * @param {string} value 
     * @return {number} 
     */
    Array.prototype.keyValCount = function(key, value) {
        var len = this.length
        ,   count = 0;
        for (var i = 0;i < len;++i) {
            if ('object' === typeof this[i]) {
                if ('undefined' !== typeof this[i][key] && this[i][key] == value) ++count;
            }
        }
        return count;
    }

    /**
     * 删除指定键值对匹配值的数组对象
     * @param {string} key 
     * @param {string} value 
     * @param {object} obj 删除额外条件:是否只删除首个、末个{last:true,first:true}
     * @return {void}
     */
    Array.prototype.spliceByKeyVal = function(key, value, obj) {
        var len = this.length
        ,   firstIndex = null    //匹配的首个索引
        ,   lastIndex = null;    //匹配的末个索引
        if ('object' === typeof obj) {
            obj.first = obj.first || false;
            obj.last = obj.last || false;
        } else {
            obj = {first:false, last:false};
        }
        for (var i = 0;i < len;++i) {
            if ('object' === typeof this[i] && this[i][key] == value) {
                if (!obj.first && !obj.last) {
                    this.splice(i, 1);
                    --i;
                    --len;
                } else {
                    if (obj.first && null === firstIndex) firstIndex = i;
                    if (obj.last) lastIndex = i;
                }
            }
        }
        var delFirst = obj.first && null !== firstIndex;
        if (delFirst) this.splice(firstIndex, 1);
        if (obj.last && null !== lastIndex && firstIndex !== lastIndex) {
            if (delFirst) {
                this.splice( (lastIndex - 1), 1 );
            } else {
                this.splice(lastIndex, 1);
            }
        }
    }

    /**
     * 通过对象交集设置数组中匹配的值
     * @param {object} obj 判断对象
     * @param {object} setObj 设置对象
     * @return {void}
     */
    Array.prototype.setByIntersection = function(obj, setObj) {
        if ('object' !== typeof obj || 'object' !== typeof setObj) return;
        var len = this.length
        ,   k
        ,   sk
        ,   match = true;
        for (var i = 0;i < len;++i) {
            for (k in obj) {
                if (this[i][k] != obj[k]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                for (sk in setObj) {
                    this[i][sk] = setObj[sk];
                }
            } else {
                match = true;
            }
        }
    }
     /**
     * 保留两位小数
     * @return String
     */
    Number.prototype.changeTwoDecimal_f = 
    String.prototype.changeTwoDecimal_f = function() {
        try {
            let f_x1 = parseFloat(this);
            if (isNaN(f_x1)) {
                return this;
            }
            let f_x = Math.round(this * 100) / 100;
            let s_x = f_x.toString();
            let pos_decimal = s_x.indexOf('.');
            if (pos_decimal < 0) {
                pos_decimal = s_x.length;
                s_x += '.';
            }
            while (s_x.length <= pos_decimal + 2) {
                s_x += '0';
            }
            return s_x;
        } catch (e) {
            return '0.00';
        }
    };
     /**
     * 限制输入整数
     * 
     * @return {boolean} a.test(this)
     */
    Number.prototype.number = 
    String.prototype.number = function() {
       var a=/[^1-9]/g;
       return a.test(this)
    }
    /**
     * 数组对象通过条件对象判断匹配返回匹配的数量
     * @param {object} where 
     * @return {number} count
     */
    Array.prototype.matchLen = function(where) {
        var count = 0;
        if (tool.isObject(where)) {
            var len = this.length
            ,   ver = true
            ,   k;
            for (var i = 0;i < len;++i) {
                if (tool.isObject(this[i])) {
                    for (k in where) {
                        if ('undefined' === typeof this[i][k] || this[i][k] != where[k]) {
                            ver = false;
                            break;
                        }
                    }
                    if (ver) {
                        ++count;
                    } else {
                        ver = true;
                    }
                }
            }
        }
        return count;
    }
})();