/**
 * 读卡器操作对象封装
 * @author Edwin Young
 * @desc 依赖node模块ffi
 */

(function(window) {
    //引入模块
    var ref = require('ref')
    ,   ffi = require('ffi')    //引入ffi node模块
    ,   r = {
        USBInit: false,    //USB是否已经初始化
        ID: 0        //设备id
    }
    ,   config = {
        ALL: 0x52,    //寻卡：所有卡
        ACTIVE: 0x26,    //寻卡：激活卡
        KeyModelA: 0x60,    //验证A模块常量
        KeyModelB: 0x61,    //验证B模块常量
        writeKey: 'CBFBCFFEB6FFFF078069CBFBCFFEB6FF',    //写入平台密钥值:写入密钥值的规则:前12位(A密钥) + FF078069(8位填充值,无用途) + 后12位(B密钥);
        KeyAList:['A6C2D6A69286', 'B88736B38429', 'FFFFFFFFFFFF', 'CBFBCFFEB6FF'],    //A密钥值列表:0:菜篮子密钥,1:菜篮子正章定制版密钥,2:平台密钥设置密钥;
        KeyBList:['FFFFFFFFFFFF'],    //B密钥值列表
        Blocks:[
            {sn:4, cid:5, mid:6},    //默认数据对应块:卡号,卡ID,店铺ID,密钥key:7
            {sn:8, phone:9, balance:10, discount:13, name:14, end:21, type:22, cooperator:28, birthday:29, cid:30, passwd:32, mid:33, mname:36},    //菜篮子数据对应块:卡号,电话,余额,折扣率,姓名,截至日期,卡类型,合作单位,生日,卡编号,店密码,企业代码,店铺简称
        ],
    }
    ,   charPtr = ref.refType('char')
    ,   intPtr = ref.refType('int')
    ,   shortPtr = ref.refType('short')
    ,   SDT = ffi.Library('ext/SDT.dll', {
        'YW_GetDLLVersion': ['int', []],    //读取库函数内部版本号;大于0为版本号,小于0为错误 
        'DES': ['int', ['char', charPtr, charPtr, charPtr]],    //DES加解密函数;param:加解密方向,0为加密,1为解密;param2:加解密秘钥,8个字节;param3:原始数据,8个字节;param4:加解密后的数据,8个字节;1成功,0失败
        'DES3': ['int', ['char', charPtr, charPtr, charPtr]],    //3DES加解密函数;param:加解密方向,0为加密,1为解密;param2:加解密秘钥,16个字节;param3:原始数据,8个字节;param4:加解密后的数据,8个字节;1成功,0失败
        'DES3_CBC': ['int', ['char', charPtr, charPtr, charPtr, charPtr]],    //带向量的3DES加解密函数;param:加解密方向,0为加密,1为解密;param2:加解密秘钥,16个字节;param3:原始数据,8个字节;param4:加解密后的数据,param5:8个字节;加解密向量,8个字节;1成功,0失败
        'YW_USBHIDInitial': ['int', []],    //USB无驱读写器,初始化USB;1成功,0失败
        'YW_USBHIDFree': ['int', []],    //USB无驱读写器,释放USB;1成功,0失败
        'YW_SetReaderID': ['int', ['int', 'int']],    //设置设备标识;param:老设备标示ID,范围0x0000-0xFFFF;param2:修改成新设备标示ID,范围0x0000-0xFFFF;1成功,0失败 
        'YW_GetReaderID': ['int', ['int']],    //查询设备标识;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;>=0成功,并且为所获取的设备标示,<0失败
        'YW_GetReaderVersion': ['int', ['int']],    //读取读卡器内部版本号;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;大于0为版本号,小于0为错误
        'YW_GetReaderSerial': ['int', ['int', charPtr]],    //查询读写器产品序列号;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:读取的产品序列号,长度为8个字节;大于0成功,小于0失败
        'YW_Buzzer': ['int', ['int', 'int', 'int', 'int']],    //蜂鸣器控制函数;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:蜂鸣器鸣叫时间,单位:秒;param3:蜂鸣器静音时间,单位:秒;param4:把param2和param3作为一个周期,则此参数为执行此周期的次数;大于0成功,小于0失败
        'YW_Led': ['int', ['int', 'int', 'int', 'int', 'int', 'int']],    //LED指示灯控制;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:LED灯序号 1-红灯,2-绿灯,4-黄灯;param3:LED灯亮时间,单位:秒;param4:LED灯灭时间,单位:秒;param5:把param2和param3作为一个周期,则此参数为执行此周期的次数;param6:最后要亮的灯 0-全灭,1-红灯,2-绿灯,4-黄灯;大于0成功,小于0失败
        'YW_AntennaStatus': ['int', ['int', 'bool']],    //设置天线的状态;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:True-开天线,False-关天线;大于0成功,小于0失败
        'YW_RequestCard': ['int', ['int', 'char', shortPtr]],    //寻卡;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:寻卡的模式 0x52-所有卡,0x26-激活卡;param3:返回卡的类型 0x4400=Ultralight/UltraLight C/MifarePlus(7Byte UID),0x0400=Mifare Mini/Mifare 1K (S50)/MifarePlus(4Byte UID),0x0200=Mifare_4K(S70)/MifarePlus(4Byte UID),0x0800=Mifare_Pro,0x0403=Mifare_ProX,0x4403=Mifare_DESFire,0x4200=MifarePlus(7Byte UID);大于0成功,小于0失败
        'YW_AntiCollide': ['int', ['int', charPtr, charPtr]],    //Type A卡访冲突;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:访冲突获得卡号的长度;param3:访冲突获得卡号;大于0成功,小于0失败
        'YW_CardSelect': ['int', ['int', 'char', charPtr]],    //Type A选卡;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:选择卡的卡号长度;param3:要选择的卡号;大于0成功,小于0失败
        'YW_AntiCollideAndSelect': ['int', ['int', 'char', charPtr, intPtr, charPtr]],    //访冲撞读卡序列号并且选定一张卡;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:对多张卡的处理方式 0-多张卡返回错误,1-返回一张卡号;param3:卡片容量代码;param4:输出卡号的长度;param5:输出卡的序列号;大于0成功,小于0失败
        'YW_RequestAntiandSelect': ['int', ['int', 'char', 'char', shortPtr, charPtr, intPtr, charPtr]],    //寻卡、访冲撞读卡序列号并且选定一张卡;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:寻卡的模式 0x52-所有卡,0x26-激活卡;param3:对多张卡的处理方式 0-多张卡返回错误,1-返回一张卡号;param4:ATQA值;param5:SAK值;param6:输出卡号的长度;param7:输出卡的序列号;大于0成功,小于0失败
        'YW_AntiCollide_Level': ['int', ['int', 'int', charPtr, charPtr]],    //Type A卡n级访冲突;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:访冲突级别，最高为3级;param3:访冲突获得卡号的长度;param4:访冲突获得卡号;大于0成功,小于0失败
        'YW_SelectCard_Level': ['int', ['int', 'int', charPtr]],    //Type A卡n级选卡;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:访冲突级别，最高为3级;param3:SAK值;大于0成功,小于0失败
        'YW_KeyAuthorization': ['int', ['int', 'char', 'int', charPtr]],    //验证某扇区密钥;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:0x60为A密钥,0x61为B密钥;param3:要验证的绝对块号地址;param4:密钥字节(共6个字节);大于0成功,小于0失败
        'YW_ReadaBlock': ['int', ['int', 'int', 'int', charPtr]],    //读取一块数据;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:绝对块号地址;param3:要读出的数据的字节数,Mifare One为16个字节;param4:输出读到的块的数据;大于0成功,小于0失败
        'YW_WriteaBlock': ['int', ['int', 'int', 'int', charPtr]],    //写入一块数据;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:绝对块号地址;param3:要写入的数据的字节数,Mifare One为16个字节;param4:要写入的块的数据;大于0成功,小于0失败
        'YW_Purse_Initial': ['int', ['int', 'int', 'int']],    //将某一扇区初始化为钱包;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:绝对块号地址;param3:初始化钱包时的初始值;大于0成功,小于0失败
        'YW_Purse_Read': ['int', ['int', 'int', intPtr]],    //读取钱包值;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:绝对块号地址;param3:读取的块号钱包的当前值;大于0成功,小于0失败
        'YW_Purse_Decrease': ['int', ['int', 'int', 'int']],    //钱包扣款;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:绝对块号地址;param3:钱包中要扣掉的值;大于0成功,小于0失败
        'YW_Purse_Charge': ['int', ['int', 'int', 'int']],    //钱包充值;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:绝对块号地址;param3:钱包中要充值的值;大于0成功,小于0失败
        'YW_Restore': ['int', ['int', 'int']],    //Restore命令;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:绝对块号地址;大于0成功,小于0失败
        'YW_Transfer': ['int', ['int', 'int']],    //Transfer命令;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:绝对块号地址;大于0成功,小于0失败
        'YW_ReadM1MultiBlock': ['int', ['int', 'int', 'int', intPtr, charPtr]],    //读取多块数据;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:绝对地址开始块号;param3:块的数量;param4:要读出的数据的字节数;param5:输出读到的块的数据;大于0成功,并且为读取的块数量,小于0失败
        'YW_WriteM1MultiBlock': ['int', ['int', 'int', 'int', 'int', charPtr]],    //写多块数据;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:绝对地址开始块号;param3:块的数量;param4:要写入的数据的字节数,Mifare One为16*param3个字节;param5:写入的块的数据;大于0成功,并且为写入的块数量,小于0失败
        'YW_UltraLightRead': ['int', ['int', 'int', charPtr]],    //读取UltraLight卡块数据;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:绝对块号地址;param3:输出读到的块的数据，4字节;大于0成功,小于0失败
        'YW_UltraLightWrite': ['int', ['int', 'int', charPtr]],    //写UltraLight卡块数据;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:绝对块号地址;param3:要写入的块的数据,4字节;大于0成功,小于0失败
        'YW_TypeA_Reset': ['int', ['int', 'char', 'char', intPtr, charPtr]],    //Type A CPU卡复位;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:寻卡的模式 0x52-所有卡,0x26-激活卡;param3:对多张卡的处理方式 0-多张卡返回错误,1-返回一张卡号;param4:返回复位信息的长度;param5:返回复位信息;大于0成功,小于0失败
        'YW_TypeA_COS': ['int', ['int', charPtr, charPtr, intPtr, charPtr]],    //Type A CPU卡执行COS命令;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:输入的COS命令的长度;param3:COS命令;param4:返回执行命令结果的长度;param5:返回执行命令结果;大于0成功,小于0失败
        'YW_SAM_ResetBaud': ['int', ['int', 'int', 'int']],    //SAM卡波特率设置;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:SAM卡序号;param3:0x00->9600(默认复位波特率),0x01->19200,0x02->38400,0x03->55800,0x04->57600,0x05->115200;大于0成功,小于0失败
        'YW_SAM_Reset': ['int', ['int', 'int', intPtr, charPtr]],    //SAM卡复位;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:SAM卡序号;param3:SAM卡复位返回的数据param4的长度;param4:SAM卡复位返回的数据;大于0成功,小于0失败
        'YW_SAM_COS': ['int', ['int', 'int', 'int', charPtr, charPtr, charPtr]],    //SAM卡执行COS命令;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:SAM卡序号;param3:向SAM卡要发送的COS命令的长度;param4:向SAM卡要发送的COS命令;param5:SAM执行COS命令后返回的数据的长度;param6:SAM执行COS命令后返回的数据;大于0成功,小于0失败
        'YW_SAM_PPSBaud': ['int', ['int', 'int', 'int']],    //SAM卡PPS波特率设置;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;param2:SAM卡序号;param3:0x00->9600(默认复位波特率),0x01->19200,0x02->38400,0x03->55800,0x04->57600,0x05->115200;大于0成功,小于0失败
    });
    r.init = function () {
        if (!this.USBInit) {
            this.USBInit = SDT.YW_USBHIDInitial() > 0;
            if (!this.USBInit) throw '初始化USB失败';
        }
    }
    r.destroy = function() {
        if (this.USBInit) {
            if (SDT.YW_USBHIDFree() > 0) {
                this.USBInit = false;
            } else {
                throw '释放USB失败';
            }
        }
    }
    r.authorization = function(model, key, blockId) {
        if ('undefined' === typeof key || key.length !== 12) throw '密钥格式错误';
        if (isNaN(blockId)) throw '绝对块号地址错误';
        this.init();       
        if (SDT.YW_AntennaStatus(this.ID, true) < 0) throw '天线打开失败';
        var type = ref.alloc('short');
        if (SDT.YW_RequestCard(this.ID, config.ALL, type) < 0) throw '寻卡失败';
        var memory = ref.alloc('char')
        ,   sn  = ref.alloc('char')
        ,   snLen = ref.alloc('int');
        if (SDT.YW_AntiCollideAndSelect(this.ID, 1, memory, snLen, sn) < 0) throw '选卡失败';
        if (SDT.YW_KeyAuthorization(
            this.ID, 
            ( (!isNaN(model) && 1 == model) ? config.KeyModelA : config.KeyModelB ), 
            blockId, 
            tool.data2Buf(key)
        ) < 0) throw '扇区密钥验证失败';
    }
    /**
     * 所读扇区验证
     * @param {*number} model 所读区域:值为1=A或2=B
     * @return {*string} 成功返回密钥值,失败返回空字符串
     */
    r.KMVerify = function(model) {
        var keys = (!isNaN(model) && 1 == model) ? config.KeyAList : config.KeyBList
        ,   len = keys.length
        ,   ret = '';
        for (var i = 0;i < len;++i) {
            try {
                this.authorization(model, keys[i], config.Blocks[0].sn);
                ret = keys[i];
                break;
            } catch (e) {
                console.log(keys[i], i, e);
            }
        }
        return ret;
    }

    /**
     * 读取卡数据
     * @param {*number} model 所读区域:值为1=A或2=B
     * @param {*number} blockId 绝对块号地址
     * @return {*string} 数据结果
     */
    r.read = function(model, key, blockId) {
        this.authorization(model, key, blockId);
        var buf = new Buffer(16);
        if (SDT.YW_ReadaBlock(this.ID, blockId, 16, buf) < 0) throw '读卡失败';
        return tool.iconv(buf, 'gbk').replace(/\0/g, '');
    }

    r.readKey = function(model, key, blockId) {
        this.authorization(model, key, blockId);
        var buf = new Buffer(16);
        if (SDT.YW_ReadaBlock(this.ID, blockId, 16, buf) < 0) throw '读卡失败';
        return buf;
    }

    /**
     * 写入卡数据 扇区 * 4 + 3 的位置为密钥区块
     * @param {*number} model 所读区域:值为1=A或2=B
     * @param {*number} blockId 绝对块号地址
     * @param {*string} data 要写入的数据最大长度为8
     * @return {*bool} 写入成功与否
     */
    r.write = function(model, key, blockId, data) {
        this.authorization(model, key, blockId);
        var buf = tool.iconv(data + tool.repeat('\0', 16), 'gbk', true);
        return SDT.YW_WriteaBlock(this.ID, blockId, 16, buf) > 0;
    }

    r.writeKey = function(model, key, blockId, data) {
        this.authorization(model, key, blockId);
        return SDT.YW_WriteaBlock(this.ID, blockId, 16, tool.data2Buf(data)) > 0;
    }

    /**
     * 逻辑获取卡数据
     * @return {*object} {empty:是否为空卡,hasUpdate:会员卡是否已经更新为本平台的卡,error:是否为读卡错误}
     */
    r.get = function () {
        var obj = {empty:true, hasUpdate:false, error:false}
        ,   key = this.KMVerify(1);
        if ('' == key) {
            obj.error = true;
            return obj;
        }
        var verify = true
        ,   temp
        ,   k;
        for (k in config.Blocks[0]) {
            temp = this.read(1, key, config.Blocks[0][k]);
            if ('' == temp) {
                verify = false;
                break;
            } else {
                obj[k] = temp;
            }
        }
        if (verify) {
            obj.empty = false;
            obj.hasUpdate = true;
            SDT.YW_Buzzer(this.ID, 1, 1, 1);
            return obj;
        }
        for (k in config.Blocks[1]) {
            obj[k] = this.read(1, key, config.Blocks[1][k]);
        }
        obj.empty = false;
        SDT.YW_Buzzer(this.ID, 1, 1, 1);
        console.log(obj);
        return obj;
    }

    /**
     * 逻辑设置卡数据
     * @param {object} data sn:卡号,cid:卡ID,mid:商户id
     * @return {bool}
     */
    r.set = function(data) {
        if ('object' !== typeof data) throw '参数格式错误';
        if ('string' !== typeof data.sn) throw 'sn格式错误';
        if ('string' !== typeof data.cid) throw 'cid格式错误';
        if ('string' !== typeof data.mid) throw 'mid格式错误';
        var key = key = this.KMVerify(1);
        if ('' == key) {
            return false;
        }
        var tempArr = [];
        for (var k in config.Blocks[0]) {
            if (!this.write(1, key, config.Blocks[0][k], data[k])) tempArr.push(k);
        }
        if (tempArr.length > 0) throw tempArr.toString() + '写入失败';
        SDT.YW_Buzzer(this.ID, 2, 1, 2);
        return true;
    }

    window.M1Reader = r;
})(window);