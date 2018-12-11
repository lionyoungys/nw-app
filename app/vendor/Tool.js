/**
 * 工具函数库
 * @author Edwin Young
 * @desc iconv方法依赖node模块text-encoding;
 */

(function(window) {
    var t = {
        ui: {},    //ui组件对象
        api: {},    //数据访问对象
        include:function (moduleName){    //引入模块方法
            if ('node-adodb' === moduleName) {
                var ADODB = require('node-adodb');
                ADODB.connection = function(address, password) {
                    password = password || '';
                    //Provider=Microsoft.Jet.OLEDB.4.0;Data Source=
                    //return ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=' + address + ';Persist Security Info=False;Jet OLEDB:Database Password=' + password);
                    return ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=' + address + ';Jet OLEDB:Database Password=' + password);
                }
                return ADODB;
            }
            return require(moduleName);
        }
    };    //工具类对象
    /**
     * 判断值是否存在
     * @return boolean
     */
    t.isSet = function (value) {return ('undefined' !== typeof value && null !== value && '' !== value)}
    /**
     * 日期格式化函数
     * @param format 格式
     * @param timestamp 时间戳
     * @return string 日期值
     */
    t.date = function (format, timestamp) {
        var date = isNaN(timestamp) ? new Date() : new Date( timestamp * 1000 );
        if ('string' === typeof format) {
            var year = date.getFullYear()
            ,   month = date.getMonth() + 1
            ,   day = date.getDate()
            ,   hour = date.getHours()
            ,   minute = date.getMinutes()
            ,   second = date.getSeconds();
            return format.replace('Y', year)
                         .replace('y', year.toString().substr(-2))
                         .replace('m', ( 10 > month ? '0' + month : month ) )
                         .replace('d', ( 10 > day ? '0' + day : day ) )
                         .replace('H', ( 10 > hour ? '0' + hour : hour ))
                         .replace('i', ( 10 > minute ? '0' + minute : minute ))
                         .replace('s', ( 10 > second ? '0' + second : second ));
                
        }
        return date;
    }
    /**
     * 根据当前日期生成拼接当前时间的64进制数的字符串
     * @return {string} 随机字符串
     */
    t.code = function () {
        var date = new Date()
        ,   year = date.getFullYear().toString().substr(-2)
        ,   month = date.getMonth() + 1
        ,   day = date.getDate()
        ,   hour = date.getHours() * 10000
        ,   minute = date.getMinutes() * 100
        ,   second = date.getSeconds();
        return ( year + (( 10 > month ? '0' + month : month )) + ( 10 > day ? '0' + day : day ) + (hour + minute + second).dec2base64() );
    }
    /**
     * 数组或对象转url参数字符串
     * @param {*object} object 
     * @return {*string} url string
     */
    t.toUrlString = function(object) {
        var str = '';
        if ('object' === typeof object) {
            for (var k in object) {
                //使用encodeURIComponent将参数值中的特殊字符进行转义防止发送请求时缺省掉特殊字符
                str += ( k + '=' + encodeURIComponent(object[k]) + '&' );
            }
            return str.substr(0, (str.length - 1) );
        }
        return str;
    }

    t.objToArr = function(object) {
        var arr = [];
        if ('object' === typeof object) {
            for (var k in object) {
                arr.push(object[k]);
            }
        }
        return arr;
    }

    /**
     * 字符编码解析处理
     * @param {*mixd} data 字符编码转换的数据
     * @param {*string} code 解析的字符编码 
     * @param {*bool} encoding 是否为编码,默认解码
     */
    t.iconv = function (data, code, encoding) {
        var {TextEncoder} = require('text-encoding');
        return encoding ? new TextEncoder(code, {NONSTANDARD_allowLegacyEncoding: true}).encode(data) : new TextDecoder(code).decode(new Uint8Array(data));
    }


    /**
     * 16进制数据转buffer
     * @param {*string} data
     * @return {*Buffer}
     */
    t.data2Buf = function(data) {
        if ('string' !== typeof data) return null;
        var len = (data.length / 2)
        ,   buf = new Buffer(len);
        for (var i = 0;i < len;++i) {
            buf.writeIntLE(parseInt('0x' + data.substring(i * 2, i * 2 + 2)), i);
        }
        return buf;
    }

    t.UUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = ( d + Math.random() * 16 ) % 16 | 0;
          d = Math.floor(d / 16);
          return ( c == 'x' ? r : (r & 0x3 | 0x8) ).toString(16);
        });
        return uuid;
    };

    /**
     * 字符串填充
     * @param {string} str 使用填充的字符串 
     * @param {number} len 填充长度
     * @return {string}
     */
    t.repeat = function(str, len) {
        var retStr = '';
        for (var i = 0;i < len;++i) {
            retStr += str;
        }
        return retStr;
    }
    /**
     * 对象克隆方法
     * @param {object} object 需要克隆的对象
     * @return {object} object
     */
    t.clone = function(object) {
        if ('object' !== typeof object) return null;
        var obj = object instanceof Array ? [] : {};
        for (var k in object) {
            obj[k] = ('object' === typeof object[k] && null !== object[k]) ? this.clone(object[k]) : object[k];
        }
        return obj;
    }

    /**
     * 获取指定天数后的事件戳
     * @param {number} number 天数
     * @return {number} 事件戳
     */
    t.timestamp = function(number) {
        var timestamp = new Date().getTime();
        if (isNaN(number)) return timestamp;
        return Math.floor( (number * 1000 * 3600 * 24 + timestamp) / 1000 );
    }

    /**
     * 判断参数是否为对象
     * @param {object} object 
     * @return bool
     */
    t.is_object = function(object) {
        return 'object' === typeof object && null !== object;
    }
    /**
     * 判断参数是否属于对象类
     * @param {object} object 
     * @return bool
     */
    t.isObject = function(object) {
        return 'object' === typeof object && null !== object && object.constructor === Object;
    }
    /**
     * 判断参数是否属于数组
     * @param {array} array 
     * @return bool
     */
    t.isArray = function(array) {
        return 'object' === typeof array && null !== array && array instanceof Array;
    }
    /**
     * 通过条件判断获取指定交集对象的属性值的和
     * @param {array} arr
     * @param {array} arr2 属性数组
     * @param {object} where 条件判断
     * @return bool
     */
    t.arrObjValsSum = function(arr, arr2, where) {
        var sum = 0;
        if (this.isArray(arr) && this.isArray(arr2) && this.isObject(where)) {
            var len = arr.length
            ,   len2 = arr2.length
            ,   ver = true
            ,   i2
            ,   k;
            for (var i = 0;i < len;++i) {
                for (k in where) {
                    if (arr[i][k] != where[k]) {
                        ver = false;
                        break;
                    }
                }
                if (ver) {
                    for (i2 = 0;i2 < len2;++i2) {
                        sum = sum.add(arr[i][arr2[i2]]);
                    }
                }
                ver = true;
            }
        }
        return sum;
    }

    t.getWH = function() {
        return {
            width:(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth),
            height:(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
        };
    }
    /**
     * 判断对象是否相等
     * @param {object} object 初始化对象
     * @function match 匹配方法
     * @return {boolean}
     */
    t.Equals = function(object) {
        this.object = t.clone(object);
        this.match = function(matchObj) {
            if (!t.is_object(matchObj)) return false
            if (null === this.object) return false;
            var temp;
            for (var k in matchObj) {
                if (t.is_object(matchObj[k])) {
                    temp = new t.Equals(matchObj[k]);
                    if (!temp.match(matchObj[k])) {
                        return false;
                    }
                } else if ('undefined' === this.object[k] || matchObj[k] != this.object[k]) {
                    return false;
                }
            }
            return true;
        }
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
        return node;
    }
    /**
     * 居中定位方法
     * @param node 界面展示节点
     */
    t.ui.center = function (node, isFixed) {
        if (node instanceof Node) {
            node.style.position = isFixed ? 'fixed' : 'absolute';
            node.style.marginTop = -node.offsetHeight / 2 + 'px';
            node.style.marginLeft = -node.offsetWidth / 2 + 'px';
            node.style.top = '50%';
            node.style.left = '50%';
        }
    }
    /**
     * 界面弹出层工厂方法
     * @param name 弹出层名称
     * @param object 弹出层定义对象 {title:标题,msg:弹出提示,info:详细描述信息,button:[按钮值, 按钮值],callback(关闭方法, 事件名称:close||click):回调函数}
     */
    t.ui.LayerFactory = function (name, object) {
        if (!t.isObject(object)) object = {};
        var bg = this.c('div', 't-ui-layer-bg')
        ,   layer = this.c('div', 't-ui-layer')
        ,   close = this.c('i', 'e-icon-close')
        ,   btnArea = this.c('div', 't-ui-layer-btn-area')
        ,   btn = this.c('button', 'e-btn')
        ,   btn_b = this.c('button', 'e-btn-b');
        btn.type = btn_b.type = 'button';
        bg.appendChild(layer);    //追加节点
        layer.appendChild( this.c('span', null, 'string' === typeof object.title ? object.title : '提示') );
        layer.appendChild(close);
        layer.appendChild(this.c('div', 't-ui-layer-icon ' + name));
        close.onclick = function() {'function' === typeof object.callback && object.callback(handleClose, 'close')}
        var msg = ''
        ,   values = object.button || [];
        if ('error' === name) {
            btn.innerText = values[0] || '返回';
            btnArea.appendChild(btn);
            btn.onclick = function() {'function' === typeof object.callback && object.callback(handleClose, values[0] || '返回')}
            msg = '操作失败';
        } else if ('warn' === name) {
            btn_b.innerText = values[0] || '取消';
            btn.innerText = values[1] || '确定';
            btnArea.appendChild(btn_b);
            btnArea.appendChild(btn);
            btn_b.onclick = function() {'function' === typeof object.callback && object.callback(handleClose, values[0] || '取消')}
            btn.onclick = function() {'function' === typeof object.callback && object.callback(handleClose, values[1] || '确定')}
            msg = '已操作过此步骤';
        } else {
            btn_b.innerText = values[0] || '取消';
            btn.innerText = values[1] || '确定';
            btnArea.appendChild(btn_b);
            btnArea.appendChild(btn);
            btn_b.onclick = function() {'function' === typeof object.callback && object.callback(handleClose, values[0] || '取消')}
            btn.onclick = function() {'function' === typeof object.callback && object.callback(handleClose, values[1] || '确定')}
            msg = '操作成功';
        }
        if ('string' === typeof object.msg) msg = object.msg
        
        layer.appendChild( this.c('div', 't-ui-layer-content', msg) );
        layer.appendChild(btnArea);
        document.body.appendChild(bg);
        this.center(layer, true);
        function handleClose() {document.body.removeChild(bg)}
    }
    t.ui.ask = function ask(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}
    t.ui.error = function error(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}
    t.ui.warn = function warn(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}
    t.ui.success = function success(object) {this.LayerFactory((arguments.callee.toString().replace(/function\s?/mi,"").split("("))[0], object)}
    t.ui.fail = function (object) {
        var body = document.body
        ,   layer = this.c('div', 't-ui-fail')
        ,   title = this.c('div', 't-ui-fail-title')
        ,   icon = this.c('i')
        ,   span = this.c('span');
        title.appendChild(icon);
        title.appendChild(span);
        span.innerText = object.title;
        layer.appendChild(title);
        layer.appendChild(this.c('div', 't-ui-fail-content', object.msg));
        body.appendChild(layer);
        setTimeout(function() {body.removeChild(layer)}, 3000);
    }
    /**
     * 加载框
     * @param {function} callback 回调函数，回传参数为加载结束方法
     */
    t.ui.loading = function(callback) {
        var bg = this.c('div', 't-ui-layer-bg')
        ,   loading = this.c( 'div', 't-ui-loading');
        bg.appendChild(loading);
        document.body.appendChild(bg);
        'function' === typeof callback && callback(
            function() {document.body.removeChild(bg)}, 
            function(notice) {
                if ('object' === typeof loading && loading instanceof Node && 'string' === typeof notice) {
                    loading.innerHTML = notice;
                }
            }
        );
    }
    /**
     * 自销提示框/蒙层
     * @param {function} callback 回调函数，回传参数为加载结束方法
     * msg,title,second
     */
    t.ui.hud = function (object) {
        var bg = this.c('div', 't-ui-layer-bg');
        bg.style.opacity = '0';
        var content = this.c(
            'div',
            't-ui-layer-hud',
            'string' === typeof object.msg ?  object.msg : '错误信息提示'
        );
        document.body.appendChild(bg);
        document.body.appendChild(content);
        var timeout = setTimeout(() => {
            document.body.removeChild(content);
            document.body.removeChild(bg);
            clearTimeout(timeout);
        }, 'number' === typeof object.second ? object.second *1000 :2000 );
        this.center(content);
    }

    /**
     * 根据接口返回的计算方式及优惠信息计算价格
     * @return {object} calculator
     */
    t.api.calculator = function() {
        var TYPE = 2
        ,   memory = {    //暂存对象
            total:0,    //总金额
            amount:0,    //折后金额
            calc_amount:0,    //经过价格计算方式计算折后金额的值
            dis_amount:0,    //可折金额
            no_dis_amount:0    //不可折金额
        };
        //请求接口获取价格计算方式
        api.post('calculate', {token:'token'.getData()}, (res, ver) => {
            if (ver) {
                TYPE = res.result.money_type;
                console.log(res);
                console.log('TYPE', TYPE);
            }
        });

        /**
         * 根据传入的值及当前的计算方式,进行计算处理
         * @param {mixd} value 数值
         * @return {Number} 计算后的值
         */
        this.calc = function (value) {    //根据商户选择的计算方式计算处理总金额;
            if (isNaN(value)) {
                return 0;
            } else {
                if (0 == TYPE) {
                    return Math.floor(value);
                } else if (1 == TYPE) {
                    return Math.round(value * 10) / 10;
                } else if (2 == TYPE) {
                    return value;
                } else {
                    return value;
                }
            }
        }

        this.setMemory = function (items) {
            if (tool.isArray(items) && 0 == memory.total) {
                var len = items.length;
                if (len > 0) {
                    for (var i = 0;i < len;++i) {
                    }
                }
            }
        }
        
        /**
         * 计算优惠券使用规则,存入暂存
         * @param {Array} items 项目列表数据
         * @param {Object} coupon 优惠券数据
         * @param {Object} this
         */
        this.coupon = function (items, coupon) {    //根据商户所选择的优惠券计算金额
            if (tool.isArray(items)) {
                var len = items.length;
                if (len > 0 && 0 == memory.total) {
                    for (var i = 0;i < len;++i) {

                    }
                    memory.calc_amount = this.calc(memory.amount);
                }
            }
            return this;
        }

        /**
         * 计算活动使用规则,存入暂存
         * @param {Array} items 项目列表数据
         * @param {Object} activity 活动数据
         * @param {Object} this
         */
        this.activity = function (items, activity) {    //根据商户所选的活动计算金额
            if (tool.isArray(items)) {
                var len = items.length;
                if (len > 0) {
                    for (var i = 0;i < len;++i) {

                    }
                    memory.calc_amount = this.calc(memory.amount);
                }
            }
            return this;
        }

        /**
         * 获取当前暂存的值
         * @return {Object} memory 获取当前暂存的值
         */
        this.get = function () {
            var obj = {};
            for (var k in memory) {
                obj[k] = memory[k];
                memory[k] = 0;
            }
            return obj;
        }

        /**
         * 清除当前暂存的值
         * @return {void}
         */
        this.clean = function () {
            for (var k in memory) {
                memory[k] = 0;
            }
        }
    }
    window.tool = t;
})(window);