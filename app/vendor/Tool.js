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
    /**
     * 通过支付网关编码获取支付方式名称
     * @param {mixd} code 支付网关编码
     * @return {string} 支付方式名称
     */
    t.getGatewayName = function (code) {
        var ret = '未付款';
        if ('string' != typeof code && 'number' != typeof code) {
            //默认未付款
        } else if ('_' == code || '0' == code) {
            ret = '会员卡支付';
        } else if ('1' == code) {
            ret = '现金支付';
        } else if ('2' == code) {
            ret = '微信支付';
        } else if ('3' == code) {
            ret = '支付宝支付';
        }
        return ret;
    }
    /**
     * 判断是否为数值,增加空字符串判断
     * @param {mixd} val 需要判断的值
     * @return {boolean}
     */
    t.isNaN = function (val) {
        return (isNaN(val) || '' == val);
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
        ,   data = []    //项目列表数据
        ,   size = 0    //data数据大小
        ,   has_act = false    //是否参与促销活动
        ,   has_cou = false    //是否使用优惠券
        ,   memory = {    //暂存对象
            total:0,    //总金额
            amount:0,    //折后金额
            calc_amount:0,    //经过价格计算方式计算折后金额的值
            dis_amount:0,    //可折金额
            no_dis_amount:0,    //不可折金额
            discount:100,    //会员折扣
            cash:0,    //现金使用
            change:0    //找零金额
        };
        //请求接口获取价格计算方式
        api.post('calculate', {token:'token'.getData()}, function(res, ver) {
            if (ver) {
                TYPE = res.result.money_type;
                console.log(res);
                console.log('TYPE', TYPE);
            }
        });


        /**
         * 设置项目数据
         * @param {Array} items 项目数据
         * @return {Object} this
         */
        this.setData = function (items) {
            var len = items.length;
            if (tool.isArray(items) && len > 0) {
                this.clean();    //清除暂存
                data = tool.clone(items);
                size = len;
                var amount;
                for (var i = 0;i < len;++i) {
                    if (tool.isNaN(data[i].raw_price)) {
                        data[i].raw_price = 0;
                    }
                    if (tool.isNaN(data[i].addition_no_price)) {
                        data[i].addition_no_price = 0;
                    }
                    if (tool.isNaN(data[i].addition_price)) {
                        data[i].addition_price = 0;
                    }
                    amount = this.getAmount(i);
                    memory.total = memory.total.add(amount.total);
                    memory.dis_amount = memory.dis_amount.add(amount.dis_amount);
                    memory.no_dis_amount = memory.no_dis_amount.add(amount.no_dis_amount);
                    //在不打折的情况下,折后金额 = 总额;在打折的情况下,折后金额 = 可折金额 * 折扣率 + 不可折金额;
                    memory.amount = memory.total;
                    memory.calc_amount = this.calc(memory.amount);
                }
            }
            return this;
        }

        //通过索引获取指定项目的可折金额及不可折金额
        this.getAmount = function(index) {
            var has_discount = (1 == data[index].has_discount);
            return {
                total:this.getTotal(index),
                dis_amount:data[index].addition_price.add(has_discount ? data[index].raw_price : 0),    //可折金额 = 原价可打折的情况 + 可折附加费
                no_dis_amount:data[index].addition_no_price.add(has_discount ? 0 : data[index].raw_price)    //不可折金额 = 原价不可打折的情况 + 不可折附加费
            };
        }
        //通过索引获取指定项目的总额
        this.getTotal = function (index) {
            //总额 = 原价 + 可折附加费 + 不可折附加费
            return data[index].raw_price.add(data[index].addition_no_price, data[index].addition_price);
        }

        /**
         * 通过折扣率计算折后价格
         * @param {number} discount 折扣率:取值范围1~100;例:100时为100%;1时为1%;
         * @return {object} this
         */
        this.setDiscount = function (discount) {
            if (!isNaN(discount) && discount > 0 && discount < 100 && memory.dis_amount > 0 && !has_act && !has_cou) {
                memory.discount = discount;
                memory.amount = memory.no_dis_amount.add(memory.dis_amount.mul(discount).div(100));
                memory.calc_amount = this.calc(memory.amount);
            } else {
                memory.discount = 100;
            }
            return this;
        }
        /**
         * 通过设置现金金额赋值现金使用金额及找零金额
         * @param {mixd} cash 现金金额
         * @return {object} this
         */
        this.setCash = function (cash) {
            if (!isNaN(cash) && cash > 0) {
                memory.cash = cash;
                memory.change = cash.sub(memory.calc_amount);
            }
            return this;
        }

        /**
         * 根据传入的值及当前的计算方式,进行计算处理
         * @param {mixd} value 数值
         * @return {Number} 计算后的值
         */
        this.calc = function (value) {    //根据商户选择的计算方式计算处理总金额;
            if (isNaN(value)) {
                return '0.00';
            } else {
                if (0 == TYPE) {
                    return Math.floor(value).toFixed(2);
                } else if (1 == TYPE) {
                    return Math.round(value).toFixed(2);
                } else if (2 == TYPE) {
                    return value.toFixed(2);
                } else {
                    return value.toFixed(2);
                }
            }
        }

        /**
         * 通过data索引,减少指定项目金额,当减少金额过多时返回过多的值
         * @param {Number} index 数组索引
         * @param {Number} amount 减少的金额
         * @return {mixd} 
         */
        this.setDec = function (index, amount) {
            if (amount > data[index].raw_price) {    //判断当前阶段金额是否大于项目金额
                amount = amount.sub(data[index].raw_price);
                data[index].raw_price = 0;
                if (amount > data[index].addition_no_price) {    //判断当前阶段金额是否大于项目不可折附加费
                    amount = amount.sub(data[index].addition_no_price);
                    data[index].addition_no_price = 0;
                    if (amount > data[index].addition_price) {    //判断当前阶段金额是否大于项目可折附加费
                        amount = amount.sub(data[index].addition_price);
                        data[index].addition_price = 0;
                    } else {
                        data[index].addition_price = data[index].addition_price.sub(amount);
                        amount = 0;
                    }
                } else {
                    data[index].addition_no_price = data[index].addition_no_price.sub(amount);
                    amount = 0;
                }
            } else {
                data[index].raw_price = data[index].raw_price.sub(amount);
                amount = 0;
            }
            return amount;
        }

        /**
         * 将满足条件的指定数量项目数据打包处理,打包金额赋值于第一件项目的价格上
         * @param {Array} names 满足名称的数组
         * @param {Number} amount 打包金额
         * @param {Number} count 打包数量
         * @return {void}
         */
        this.packData = function (names, amount, count) {
            if (tool.isArray(names) && names.length > 0) {
                if (isNaN(amount)) {
                    amount = 0;
                }
                if (isNaN(count)) {
                    count = size;
                }
                var indexs = [];
                for (var i = 0;i < size;++i) {
                    if (-1 != data[i].clothing_name.inArray(names)) {    //提取满足打包数据条件的项目,同时合计数满足打包数量
                        indexs.push(i);
                        if (indexs.length >= count) {
                            break;
                        }
                    }
                }
                var len = indexs.length;
                for (var j = 0;j < len;++j) {    //将打包金额赋值于第一件满足条件的项目上,其余条件内项目相关价格置零
                    if (0 == j) {
                        data[indexs[j]].raw_price = amount;
                    } else {
                        data[indexs[j]].raw_price = 0;
                    }
                    data[indexs[j]].addition_price = 0;
                    data[indexs[j]].addition_no_price = 0;
                }
            }
        }

        /**
         * 匹配促销活动,优惠券的优先级
         * @param {Object} activity 活动数据
         * @param {Object} coupon 优惠券数据
         * @return {Object} this
         */
        this.matchAC = function (activity, coupon) {
            if (
                tool.isObject(activity) 
                && 
                tool.isObject(coupon) 
                && 
                !isNaN(activity.type) 
                && 
                !isNaN(coupon.type)
            ) {
                if (1 == activity.type && 1 != coupon.type) {
                    this.activity(activity).coupon(coupon);
                } else {
                    this.coupon(coupon).activity(activity);
                }
            } else if (tool.isObject(coupon) && !isNaN(coupon.type)) {
                this.coupon(coupon);
            } else if (tool.isObject(activity) && !isNaN(activity.type)) {
                this.activity(activity);
            }
            return this;
        }

        /**
         * 满减计算处理
         * @param {number} amount 减价金额
         * @param {array} names 减价衣物的名称数组
         * @param {object} this
         */
        this.moneyOff = function (amount, names) {
            if (amount > 0 && tool.isArray(names)) {
                var total = 0    //可优惠项目的总金额
                ,   lastAmount = amount
                ,   indexs = [];    //可抵扣的金额
                for (var i = 0;i < size;++i) {
                    if (-1 != data[i].clothing_name.inArray(names)) {
                        indexs.push(i);
                    }
                }
                var len = indexs.length
                ,   len2 = len - 1
                ,   lastIndex = indexs[len2];
                for (var j = 0;j < len;++j) {    //获取可优惠项目的总额
                    total = total.add(this.getTotal(indexs[j]));
                }

                //根据公式计算
                var tmp;
                for (var k = 0;k < len2;++k) {
                    tmp = this.round(this.getTotal(indexs[k]), total).mul(amount);
                    lastAmount = lastAmount.sub(tmp);
                    this.setDec(indexs[k], tmp);
                }
                this.setDec(lastIndex, lastAmount);
            }
            return this;
        }

        /**
         * 比例计算数值于小数点后第三位进行四舍五入处理
         * @param {number} val 进行处理的值
         * @param {number} val2 进行处理的值
         * @param {number} 
         */
        this.round = function (val, val2) {
            return Math.round(val.mul(100).div(val2)).div(100);
        }

        /**
         * 计算活动使用规则,存入暂存
         * @param {Object} activity 活动数据
         * @param {Object} this
         */
        this.activity = function (activity) {    //根据商户所选的活动计算金额
            if (tool.isObject(activity) && memory.calc_amount > 0) {
                if (1 == activity.type && memory.total >= activity.full_money) {    //满减
                    has_act = true;
                    //var balance = activity.money;    //优惠券抵扣余额
                    this.moneyOff(activity.money, activity.item_name);
                    memory.amount = 0;
                    for (var i = 0;i < size;++i) {
                        // if (balance > 0 && -1 != data[i].clothing_name.inArray(activity.item_name)) {
                        //     balance = this.setDec(i, balance);
                        // }
                        memory.amount = memory.amount.add(this.getTotal(i));
                    }
                } else if (2 == activity.type && memory.total >= activity.full_money) {    //折扣
                    has_act = true;
                    var discount = activity.discount;
                    if (discount < 100 && 0 != discount) {
                        discount = discount.div(100);    //优惠券折扣率,小数计算
                        memory.amount = 0;
                        for (var i = 0;i < size;++i) {
                            if (-1 != data[i].clothing_name.inArray(activity.item_name)) {
                                data[i].raw_price = data[i].raw_price.mul(discount);
                                data[i].addition_price = data[i].addition_price.mul(discount);
                                data[i].addition_no_price = data[i].addition_no_price.mul(discount);
                            }
                            memory.amount = memory.amount.add(this.getTotal(i));
                        }
                    }
                } else if (3 == activity.type && size >= activity.money) {    //多件洗
                    has_act = true;
                    this.packData(activity.item_name, activity.full_money, activity.money);
                    memory.amount = 0;
                    for (var i = 0;i < size;++i) {    //遍历所有项目重新取值
                        memory.amount = memory.amount.add(this.getTotal(i));
                    }
                } else if (4 == activity.type) {    //袋洗
                    has_act = true;
                    this.packData(activity.item_name, activity.full_money);
                    memory.amount = 0;
                    for (var i = 0;i < size;++i) {    //遍历所有项目重新取值
                        memory.amount = memory.amount.add(this.getTotal(i));
                    }
                } else {
                    has_act = false;
                }
                memory.calc_amount = this.calc(memory.amount);
            } else {
                has_act = false;
            }
            return this;
        }

        
        /**
         * 计算优惠券使用规则,存入暂存
         * @param {Object} coupon 优惠券数据
         * @param {Object} this
         */
        this.coupon = function (coupon) {    //根据商户所选择的优惠券计算金额
            if (tool.isObject(coupon) && memory.calc_amount > 0 && memory.total >= coupon.full_money) {    //0 < 总金额 >= 优惠券满足金额
                if (1 == coupon.type) {    //现金券:抵价金额 > 0;
                    //var balance = coupon.money;    //优惠券抵扣余额
                    has_cou = true;
                    this.moneyOff(coupon.money, coupon.item_name);
                    memory.amount = 0;
                    for (var i = 0;i < size;++i) {
                        // if (balance > 0 && -1 != data[i].clothing_name.inArray(coupon.item_name)) {
                        //     balance = this.setDec(i, balance);
                        // }
                        memory.amount = memory.amount.add(this.getTotal(i));
                    }
                } else if (2 == coupon.type) {    //折扣券:优惠折扣 < 10折
                    has_cou = true;
                    var discount = coupon.discount;
                    if (discount < 100 && 0 != discount) {
                        discount = discount.div(100);    //优惠券折扣率,小数计算
                        memory.amount = 0;
                        for (var i = 0;i < size;++i) {
                            if (-1 != data[i].clothing_name.inArray(coupon.item_name)) {
                                data[i].raw_price = data[i].raw_price.mul(discount);
                                data[i].addition_price = data[i].addition_price.mul(discount);
                                data[i].addition_no_price = data[i].addition_no_price.mul(discount);
                            }
                            memory.amount = memory.amount.add(this.getTotal(i));
                        }
                    }
                } else {
                    has_cou = false;
                }
                memory.calc_amount = this.calc(memory.amount);
            } else {
                has_cou = false;
            }
            return this;
        }

        /**
         * 获取当前暂存的值
         * @param {boolean} clean 是否清除暂存计算的值
         * @return {object} 获取当前暂存的值
         */
        this.get = function (clean) {
            var obj = tool.clone(memory);    //复制暂存对象
            if (clean) {    //是否清除暂存
                this.clean();
            }
            return obj;
        }

        /**
         * 清除当前暂存的值
         * @return {Object} this
         */
        this.clean = function () {
            data = [];
            size = 0;
            has_act = false;
            has_cou = false;
            for (var k in memory) {
                memory[k] = 0;
            }
            memory.discount = 100;
            return this;
        }
    }
    window.tool = t;
})(window);