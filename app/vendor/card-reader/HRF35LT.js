/**
 * 明华读卡器HRF35LT使用库
 * @author Lion Young
 * @desc 依赖node模块ffi
 */

(function(window) {
    //依赖mwrf32.dll.js
    var ref = require('ref');
    var utils = window.CardReaderDevice.utils;
    var mwrf32 = window.CardReaderDevice.mwrf32;
    var config = {
        Port:0,    //通讯口
        Baud:9600,    //波特率
        RequestMode:1,    //寻卡模式:0 - IDLE mode,只有处在IDLE状态的卡片才响应读写器的命令; 1 - ALL mode,处在IDLE状态和HALT状态的卡片都将响应读写器的命令
        KEYA:0,
        KEYB:4,
        SECTOR:1,    //扇区号0~15,0号扇区为系统区,不可用,每号扇区有4块地址,第4块地址为加密块,分别对应块号:sector * 4, sector * 4 + 1, sector * 4 + 2, sector * 4 + 3
        ADR_NO:0,    //地址号
        KEY_SECRET:'62245501027fff078069ffffffffffff',    //密钥值:写入密钥值的规则:前12位(A密钥) + ff078069(8位访问控制码) + 后12位(B密钥);
        KeyASecret: ['62245501027f', 'ffffffffffff'],
        KeyBSecret: ['ffffffffffff'],
        NULL_CARD:'00000000000000000000000000000000',
        StorageCardReaderHandle: '__HRF35LT_HANDLE'
    };
    var hrf = {
        __handle:-1    //通讯句柄,<0时说明句柄未连接,>=0时说明句柄已连接
    };

    //连接读卡器,回调参数未读卡器handle
    hrf.connect = function(callback) {
        if (this.__handle < 0) {
            //清除之前的通讯句柄
            mwrf32.rf_exit(localStorage.getItem(config.StorageCardReaderHandle));
            this.__handle = mwrf32.rf_init(config.Port, config.Baud);
            if (this.__handle < 0) {
                console.log('HRF35LT连接失败');
                localStorage.setItem(config.StorageCardReaderHandle, null);
                return null;
            } else {
                console.log('HRF35LT连接成功');
                localStorage.setItem(config.StorageCardReaderHandle, this.__handle);
                return callback(this.__handle);
            }
        } else {
            return callback(this.__handle);
        }
    };
    /**
     * 读取卡片数据
     * @return object CardReaderDevice.utils.state状态对象,成功时包含no:卡号
     */
    hrf.read = function () {
        return this.connect(function(handle) {
            //循环验证密钥
            var read_st = hrf.verify(handle);
            if (!read_st.success) {
                return read_st;
            }
            //创建buffer数组,buffer[16] = char[16]
            var buf = new Buffer(16);
            //读取卡片指定块号数据
            var st = mwrf32.rf_read(handle, utils.getBlockNo(config.SECTOR, config.ADR_NO), buf);
            if (0 == st) {
                read_st.no = utils.buf2str(buf).replace(/f/g, '');
                if (read_st.no == config.NULL_CARD) {
                    return utils.state('NULL_CARD');
                }
                mwrf32.rf_beep(handle, 10);
                return read_st;
            } else {
                return utils.state('READ_DATA_FAIL')
            }
        });
    }

    /**
     * 写入卡片数据
     * @param mixed no卡号
     * @return  object CardReaderDevice.utils.state状态对象
     */
    hrf.write = function(no) {
        //当参数位数值类型时,转为字符串
        if ('number' == typeof no) {
            no = no.toString();
        }
        //判断参数格式是否正确
        if ('string' != typeof no || no.length < 1) {
            return utils.state('WRITE_DATA_ERR');
        }
        return this.connect(function(handle) {
            //循环验证密钥
            var write_st = hrf.verify(handle);
            if (!write_st.success) {
                return write_st;
            }
            write_st = hrf.encrypt(handle);
            if (!write_st.success) {
                return write_st;
            }
            var buf = utils.str2buf(no);
            if (null == buf) {
                return utils.state('WRITE_DATA_ERR');
            }
            var st = mwrf32.rf_write(handle, utils.getBlockNo(config.SECTOR, config.ADR_NO), buf);
            if (0 == st) {
                mwrf32.rf_beep(handle, 10);
                return utils.state();
            } else {
                return utils.state('WRITE_DATA_FAIL');
            }
        });
    }

    /**
     * 循环验证密钥
     * @param int 操作句柄
     * @return object CardReaderDevice.utils.state状态对象
     */
    hrf.verify = function (handle) {
        var len = config.KeyASecret.length;
        var ver_st
        for (var i = 0;i < len;++i) {
            ver_st = hrf.find(handle, config.KEYA, config.SECTOR, config.KeyASecret[i]);
            if (ver_st.success) {
                break;
            }
        }
        return ver_st;
    }

    /**
     * 寻卡并验证密钥
     * @param {int} handle 操作句柄
     * @param {int} mode 密码类型:0 - KEY A;4 - KEY B;
     * @param {int} sector 须装载密码的扇区号(0~15)
     * @param {string} key 密钥
     * @return {object} 状态信息,成功时包含sn(卡片序列号)
     */
    hrf.find = function (handle, mode, sector, key) {
        var st = mwrf32.rf_reset(handle, 3);
        //寻卡
        var type = ref.alloc('ushort');    //卡片类型
        st = mwrf32.rf_request(handle, config.RequestMode, type);
        if (0 != st) {    //未找到IC卡
            return utils.state('NOT_FOUND');
        }
        //获取卡片序列号
        var sn = ref.alloc('ulong');
        st = mwrf32.rf_anticoll(handle, 0, sn);
        if (0 != st) {
            return utils.state('GET_SN_FAIL');
        }
        //选卡
        var size = ref.alloc('uchar');
        st = mwrf32.rf_select(handle, sn.deref(), size);
        if (0 != st) {
            return utils.state('READ_CARD_FAIL');
        }
        //验证密钥
        var auth_st = this.auth(handle, mode, sector, key);
        if (!auth_st.success) {
            return auth_st;
        }
        return utils.state();
    }


    /**
     * 验证卡片密钥
     * @param {int} handle 操作句柄
     * @param {int} mode 密码类型:0 - KEY A;4 - KEY B;
     * @param {int} sector 须装载密码的扇区号(0~15)
     * @param {string} key 密钥
     * @param {object} 状态信息
     */
    hrf.auth = function (handle, mode, sector, key) {
        //判断密钥长度
        var len = key.length;
        if (12 != len) {
            return utils.state('SECRET_ERR');
        }
        //装载密钥
        var value = ref.allocCString(key);
        var st = mwrf32.rf_load_key_hex(handle, mode, sector, value);
        if (st != 0) {
            return utils.state('LOAD_KEY_FAIL');
        }
        //验证密钥
        st = mwrf32.rf_authentication(handle, mode, sector);
        if (st != 0) {
            return utils.state('VER_KEY_FAIL');
        }
        return utils.state();
    }

    /**
     * 加密扇区
     * @param int 操作句柄
     * @return {object} 状态信息
     */
    hrf.encrypt = function(handle) {
        var buf = utils.str2buf(config.KEY_SECRET);
        if (null == buf) {
            return utils.state('KEY_SECRET_ERR');
        }
        var st = mwrf32.rf_write(handle, utils.getBlockNo(config.SECTOR, 3), buf);
        if (0 == st) {
            return utils.state();
        } else {
            return utils.state('WRITE_KEY_FAIL');
        }
    }
    window.CardReaderDevice.HRF35LT = hrf;
})(window);