/**
 * 读卡器操作对象封装
 * @author Edwin Young
 * @desc 依赖node模块ffi
 */

(function(window) {
    /**
     * 常量指令配置
     */
    var ALL = 0x52    //寻卡：所有卡
    ,   ACTIVE = 0x26    //寻卡：激活卡
    ,   KeyAModel = 0x60    //A密钥
    ,   KeyBModel = 0x61    //B密钥
    ,   KeyA = 'A6C2D6A69286'    //A密钥值
    ,   KeyB = 'FFFFFFFFFFFF'    //B密钥值
    ,   BlockID = 9;    //绝对块号地址
    var r = {
        USBInit: false,    //USB是否已经初始化
        ID: 0,          //设备id
        Antenna: false,    //天线是否已经开启
        inited: false,    //M1Reader是否已被初始化
    }
    ,   ref = require('ref')
    ,   ffi = require('ffi')    //引入ffi node模块
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
        if (this.inited) return false;
        this.USBInit = SDT.YW_USBHIDInitial() > 0;
        if (!this.USBInit) throw '初始化USB失败';
        this.Antenna = SDT.YW_AntennaStatus(this.ID, true) > 0;
        if (!this.Antenna) throw '天线打开失败';
        console.log('初始化USB', this.USBInit);
        console.log('设备id', this.ID);
        console.log('打开天线', this.Antenna);

        var type = ref.alloc('short');
        console.log('寻卡', SDT.YW_RequestCard(this.ID, ALL, type));
        var memory = ref.alloc('char')
        ,   snLen = ref.alloc('int')
        ,   sn  = ref.alloc('char');
        console.log('选卡', SDT.YW_AntiCollideAndSelect(this.ID, 1, memory, snLen, sn));
        console.log('memory', memory.deref());
        console.log('snLen', snLen.deref());
        console.log('sn', sn.deref());
        var keyArr = this.keyHandle(KeyB);
        console.log('验证某扇区密钥', SDT.YW_KeyAuthorization(this.ID, KeyBModel, BlockID, keyArr));
        console.log('keyArr', keyArr);
        var readData = new Buffer(16);
        console.log('读卡', SDT.YW_ReadaBlock(this.ID, BlockID, 16, readData));
        console.log('readData arr', readData);
        console.log('readData', readData.toString('ascii'));
        // console.log('after deref', type.deref());
        // var memory = charPtr
        // ,   len = intPtr
        // ,   sn  = charPtr;
        // console.log('memory', memory);
        // console.log('len', len);
        // console.log('sn', sn);
        // console.log('选卡', SDT.YW_AntiCollideAndSelect(this.ID, '1', memory, len, sn));
        // console.log('memory', memory);
        // console.log('len', len);
        // console.log('sn', sn);
        //this.inited = true;
        return this.inited;
    }

    r.keyHandle = function (key) {
        var keyArr = new Buffer(6);
        for (var i = 0;i < 6;++i) {
            keyArr.writeIntLE(parseInt('0x' + key.substring(i * 2, i * 2 + 2)), i);
        }
        return keyArr;
    }
    r.pointer = function (type, value, size) {
        size = 'number' === typeof size ? size : 4;
        var buf = new Buffer(size);
        buf.writeInt32LE(value, 0);
        buf.type = ref.types[type];
        return buf;
    }
    function strToHexCharCode(str) {
        　if(str === "") return "";
        var hexCharCode = [];
        hexCharCode.push("0x"); 
        for(var i = 0; i < str.length; i++) {
        　　hexCharCode.push((str.charCodeAt(i)).toString(16));
        }
        return hexCharCode.join("");
    }
        
         
        
        
        function hexCharCodeToStr(hexCharCodeStr) {
        　　var trimedStr = hexCharCodeStr.trim();
        　　var rawStr = 
        　　trimedStr.substr(0,2).toLowerCase() === "0x"
        　　? 
        　　trimedStr.substr(2) 
        　　: 
        　　trimedStr;
        　　var len = rawStr.length;
        　　if(len % 2 !== 0) {
        　　　　alert("Illegal Format ASCII Code!");
        　　　　return "";
        　　}
        　　var curCharCode;
        　　var resultStr = [];
        　　for(var i = 0; i < len;i = i + 2) {
        　　　　curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
        　　　　resultStr.push(String.fromCharCode(curCharCode));
        　　}
        　　return resultStr.join("");
        }
    window.M1Reader = r;
})(window);