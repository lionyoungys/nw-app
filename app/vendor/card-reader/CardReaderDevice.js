/**
 * 读卡器类库
 */
(function(window) {
    /**
     * 读卡器状态对象
     */
    var state = function () {
        var __success = 'SUCCESS';    //默认状态码: SUCCESS - 成功
        var __state = {    //状态: code:msg
            SUCCESS:'SUCCESS',
            NOT_FOUND:'未找到IC卡,请将IC卡水平放置到读卡器正上方',
            GET_SN_FAIL:'读取卡序列号失败',
            READ_CARD_FAIL:'卡片读取失败',
            SECRET_ERR:'IC卡密钥格式不正确',
            LOAD_KEY_FAIL:'装载密码失败',
            VER_KEY_FAIL:'密钥验证失败',
            READ_DATA_FAIL:'数据读取失败',
            KEY_SECRET_ERR:'加密密钥数据不正确',
            WRITE_KEY_FAIL:'扇区加密数据写入失败',
            WRITE_DATA_ERR:'写入数据格式错误',
            WRITE_DATA_FAIL:'数据写入失败',
            NULL_CARD:'卡片数据为空'
        };
        /**
         * 获取状态信息
         * @param {string} 状态码
         * @return {object} 状态对象:{code:code, msg:message, success:true/false}
         */
        var s = function (code) {
            var data = null;
            if ('string' == typeof code && 'string' == typeof __state[code]) {
                data = {code:code, msg:__state[code]};
            } else {
                data = {code:__success, msg:__state[__success]};
            }
            data.success = (data.code == __success);
            return data;
        }
        return s;
    }
    //CardReaderDevice utils 对象
    var utils = {
        state:state(),
        /**
         * buffer转16进制字符串
         * @param Buffer Buffer对象
         * @return string
         */
        buf2str: function (buf) {
            var value = '';
            if ('object' == typeof buf && null != buf && buf.constructor == Buffer) {
                var len = buf.length;
                var tmp;
                for (var i = 0;i < len;++i) {
                    //当数值位数位1位时,在数值前方填0
                    tmp = buf[i].toString(16);
                    if (tmp.length < 2) {
                        tmp = '0' + tmp;
                    }
                    value += tmp;
                }
            }
            return value;
        },
        /**
         * 16进制字符串转buffer
         * @param string 字符数据
         * @return Buffer
         */
        str2buf: function(str) {
            var len = str.length;
            var tmp;
            //判断是否含有非16进制字符
            for (var i = 0;i < len;++i) {
                tmp = str[i].toLowerCase();
                if (!(tmp >= '0' && tmp <= '9') && !(tmp >= 'a' && tmp <= 'f')) {
                    return null;
                }
            }
            //判断是否小于32位,小于时补足32位
            if (len < 32) {
                for (len;len < 32;++len) {
                    str += 'f';
                }
            }
            //创建buffer并写入数据
            var buf = new Buffer(16);
            for (var i = 0;i < 16;++i) {
                buf.writeIntLE(parseInt('0x' + str.substring(i * 2, i * 2 + 2)), i);
            }
            return buf;
        },

        /**
         * 获取扇区地址块号
         * @param int 扇区号
         * @param int 地址号,0~3
         * @return int 块号
         */
        getBlockNo: function (sector, adr) {
            return (sector * 4 + adr);
        }
    };

    if ('undefined' == typeof window.CardReaderDevice) {
        window.CardReaderDevice = {};
    }
    window.CardReaderDevice.utils = utils;
})(window);