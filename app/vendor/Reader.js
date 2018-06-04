/**
 * 读卡器操作对象封装
 * @author Edwin Young
 * @desc 依赖node模块ffi
 */

(function(window) {
    var ffi = require('ffi')    //引入ffi node模块
    ,   SDT = ffi.Library('ext/SDT.dll', {
        'YW_GetDLLVersion': ['int', []],    //读取库函数内部版本号;大于0为版本号,小于0为错误 
        'DES': ['int', ['char', 'char', 'char', 'char']],    //DES加解密函数;param:加解密方向,0为加密,1为解密;param2:加解密秘钥,8个字节;param3:原始数据,8个字节;param4:加解密后的数据,8个字节;1成功,0失败
        'DES3': ['int', ['char', 'char', 'char', 'char']],    //3DES加解密函数;param:加解密方向,0为加密,1为解密;param2:加解密秘钥,16个字节;param3:原始数据,8个字节;param4:加解密后的数据,8个字节;1成功,0失败
        'DES3_CBC': ['int', ['char', 'char', 'char', 'char', 'char']],    //
        'YW_USBHIDInitial': ['int', []],    //USB无驱读写器,初始化USB;1成功,0失败
        'YW_USBHIDFree': ['int', []],    //USB无驱读写器,释放USB;1成功,0失败
        'YW_SetReaderID': ['int', ['int', 'int']],    //设置设备标识;param:老设备标示ID,范围0x0000-0xFFFF,param2:修改成新设备标示ID,范围0x0000-0xFFFF;1成功,0失败 
        'YW_GetReaderID': ['int', ['int']],    //查询设备标识;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;>=0成功,并且为所获取的设备标示,<0失败
        'YW_GetReaderVersion': ['int', ['int']],    //读取读卡器内部版本号;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0;大于0为版本号,小于0为错误
        'YW_GetReaderSerial': ['int', ['int', 'char']]    //查询读写器产品序列号;param:所要获取的设备标示ID,范围0x0000-0xFFFF,如果未知,则param=0,param2:读取的产品序列号,长度为8个字节;大于0为成功,小于0为失败
    });
    console.log(SDT.YW_GetDLLVersion());
})(window);