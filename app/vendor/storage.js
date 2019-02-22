/**
 * localStorage数据存储
 * @author AbuYoung
 */
(function(window) {
    //存储数据更新时间戳的键
    var _STORAGE_UPDATE_TIME_ = '_STORAGE_UPDATE_TIME_';
    /**
     * 记录存储数据更新的时间
     * @param {string} key
     * @return {void} 
     */
    var setUpdateTime = function (key) {
        if ('string' == typeof key && key.length > 0) {
            var update_time = s.get(_STORAGE_UPDATE_TIME_);
            var timestamp = (new Date()).getTime();
            if (null == update_time) {
                update_time = {[key]:timestamp};
            } else {
                update_time[key] = timestamp;
            }
            localStorage.setItem(_STORAGE_UPDATE_TIME_, JSON.stringify(update_time));
        }
    }
    //storage对象
    var s = {
        /**
         * 获取通过set/put方法存储的值
         * @param {string} key 键
         * @return {mixed}
         */
        get:function(key) {
            if ('string' == typeof key && key.length > 0) {
                var val = localStorage.getItem(key);
                if (null == val) {
                    return null;
                } else {
                    try {
                        return JSON.parse(val);
                    } catch (e) {
                        return null;
                    }
                }
            } else {
                return null;
            }
        },

        /**
         * 存储键值对数据
         * @param {string} key 键
         * @param {mixed} val 值
         * @return {void}
         */
        set:function(key, val) {
            if ('string' == typeof key && key.length > 0 && 'undefined' != typeof val && 'function' != typeof val && null != val) {
                localStorage.setItem(key, JSON.stringify(val));
                setUpdateTime(key);
            }
        },
        /**
         * 存储键值对数据
         * @param {object} obj {key:value}
         * @return {void}
         */
        put:function(obj) {
            if ('object' == typeof obj && obj.constructor == Object) {
                for (k in obj) {
                    this.set(k, obj[k]);
                }
            }
        },
        /**
         * 获取通过set/put方法存储值时的毫秒级时间戳
         * @param {string} key 键
         * @return {number}
         */
        getUpdateTime:function(key) {    //获取通过set方法存储值时的时间
            var update_time = this.get(_STORAGE_UPDATE_TIME_);
            if ('object' == typeof update_time && null != update_time && update_time.constructor == Object) {
                if ('number' == typeof update_time[key]) {
                    return update_time[key];
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        }
    };
    if ('object' !== typeof window.tool) window.tool = {};
    tool.storage = s;
})(window);