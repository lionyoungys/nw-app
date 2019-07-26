/**
 * 明华读卡器HRF35LT API
 * @author Lion Young
 * @desc 依赖node模块ffi
 */

(function(window) {
    //引入模块
    var ref = require('ref')
    ,   ffi = require('ffi')    //引入ffi node模块
    ,   int = 'int'
    ,   uint = 'uint'
    ,   long = 'long'
    ,   ulong = 'ulong'
    ,   short = 'short'
    ,   ushort = 'ushort'
    ,   char = 'char'
    ,   uchar = 'uchar'
    ,   char_pointer = ref.refType(char)
    ,   uchar_pointer = ref.refType(uchar)
    ,   long_pointer = ref.refType(long)
    ,   ulong_pointer = ref.refType(ulong)
    ,   ushort_pointer = ref.refType(ushort)
    ,   HANDLE = uint
    ,   mwrf32 = ffi.Library('ext/mwrf32.dll', {

        //#通用函数#

        /**
         * 建立读写器与PC机之间的连接
         * @param {int} 通讯口号(0~250) ，对于无驱设备该参数无效 
         * @param {long} baudrate 通讯波特率(9600~115200),对于无驱设备该参数无效
         * @return {HANDLE} >=0:成功则返回设备描述符;<0:失败
         */
        rf_init: [HANDLE, [short, long]],
        /**
         * 断开PC机与读写器之间的连接，并释放相关设备描述符
         * @param {HANDLE}
         * @return {int}  =0:成功;<>0:失败 
         */
        rf_exit: [short, [HANDLE]],
        //#低级函数:低级和高级函数都可对 Mifare 卡进行同一操作。每一条高级函数都集成了一系列低级函数#

        /**
         * 该函数向卡片发出寻卡命令,开始选择一张新卡片时需要执行该函数
         * @param {HANDLE}
         * @param {char} 寻卡模式:0 - IDLE mode,只有处在IDLE状态的卡片才响应读写器的命令; 1 - ALL mode,处在IDLE状态和HALT状态的卡片都将响应读写器的命令
         * @param {int *} 返回卡片类型(Mifare std. 1k: 0x0004; UltraLight: 0x0044; FM005: 0x0005; Mifare std. 4k: 0x0002; SHC1122: 0x3300)
         * @return {short} =0:成功;<>0:失败
         */
        rf_request:[short, [HANDLE, uchar, ushort_pointer]],
        /**
         * 激活读写器的防冲突队列,如果有几张MIFARE卡片在感应区内,将会选择一张卡片,并返回卡片的序列号供将来调用rf_select函数时使用
         * @param {HANDLE}
         * @param {char} 预选卡片使用的位,标准调用时为0
         * @param {long *} 返回的卡片序列号
         * @return {short} =0:成功;<>0:失败
         */
        rf_anticoll:[short, [HANDLE, uchar, ulong_pointer]],
        /**
         * 用指定的序列号选择卡片,将卡片的容量返回给PC机
         * 例:
         *     unsigned long snr=239474;
         *     unsigned char *size;
         *     rf_select(icdev,snr,&size)
         * @param {HANDLE}
         * @param {long} 卡片的序列号
         * @param {char *} 卡片容量的地址指针,目前该值不能使用
         * @return {short} =0:成功;<>0:失败
         */
        rf_select:[short, [HANDLE, ulong, uchar_pointer]],
        /**
         * DES算法加密,例:用"12345678"加密"abcdefghabcdefgh",rf_encrypt("1234567", "abcdefghabcdefgh", 16, value); 
         * @param {char *} 密钥,长度为8个字节
         * @param {char *} 准备加密的明文,长度必须是8的倍数
         * @param {int} 明文的长度,必须是8的倍数
         * @param {char *} 密文
         * @return {short} =0:成功;<>0:失败
         */
        rf_encrypt:[short, [char_pointer, char_pointer, int, char_pointer]],
        /**
         * DES算法解密,例:用"12345678"来解密"abcdefghabcdefgh",rf_decrypt("1234567", "abcdefghabcdefgh", 16, value); 
         * @param {char *} 密钥（必须和加密时的相同）,长度为8个字节 
         * @param {char *} 密文
         * @param {int} 密文的长度,必须是8的倍数 
         * @param {char *} 明文
         * @return {short} =0:成功;<>0:失败
         */
        rf_decrypt:[short, [char_pointer, char_pointer, int, char_pointer]],
        /**
         * 将16进制数转换为ASCII字符
         * @param {char *} 16进制数
         * @param {char *} 输出的ASCII字符 
         * @param {char} 16进制数的长度 
         * @return {short} =0:成功;<>0:失败
         */
        hex_a:[short, [char_pointer, char_pointer, char]],
        /**
         * 将ASCII字符转换为16进制数
         * @param {char *} ASCII字符
         * @param {char *} 输出的16进制数
         * @param {char} ASCII字符的长度
         * @return {short} =0:成功;<>0:失败
         */
        a_hex:[short, [char_pointer, char_pointer, char]],




        //#设备操作函数#

        /**
         * 射频头复位(射频头掉电几毫秒)
         * @param {HANDLE}
         * @param {int} 复位时间,0~500毫秒有效
         * @return {short} =0:成功;<>0:失败
         */
        rf_reset:[short, [HANDLE, int]],
        /**
         * 蜂鸣几毫秒
         * @param {HANDLE}
         * @param {short} 蜂鸣时间,单位:毫秒
         * @return {short} =0:成功;<>0:失败
         */
        rf_beep:[short, [HANDLE, short]],
        /**
         * 获取读写器的版本号
         * @param {HANDLE}
         * @param {char *} 返回读写器版本信息,长度为18字节
         * @return {short} =0:成功;<>0:失败
         */
        rf_get_status:[short, [HANDLE, char_pointer]],
        /**
         * 获取读写器的产品序列号,例:unsigned char receive_buffer[17];rf_srd_snr(HANDLE, 16, receive_buffer);
         * @param {HANDLE}
         * @param {int} 产品序列号的长度为16字节
         * @param {char *} 返回的产品序列号
         * @return {short} =0:成功;<>0:失败
         */
        rf_srd_snr:[short, [HANDLE, int, char_pointer]],
        /**
         * 获取API函数库版本号
         * @param {char *} 返回API函数库版本号,长度为18个字节
         * @return {short} =0:成功;<>0:失败
         */
        lib_ver:[short, [char_pointer]],
        /**
         * 读取读写器的日期、星期和时间
         * 例:
         *     unsigned char datetime[8];
         *     rf_gettime(icdev, datetime);
         *     #datetime="0x99,0x04,0x05,0x20,0x13,0x30,0x10"
         *     #1999, Thursday, May 20, 13:30:10
         * @param {HANDLE}
         * @param {char *} 接收数据,长度大于7个字节: [0]:年; [1]:星期; [2]:月; [3]:日; [4]:时; [5]:分; [6]:秒;
         * @return {short} =0:成功;<>0:失败
         */
        rf_gettime:[short, [HANDLE, char_pointer]],
        /**
         * 设置读写器时钟的日期、星期和时间
         * 例:
         *     #设置日期为17/06/99,时间为12:34:56,星期一
         *     unsigned char data[8];
         *     data[0]=0x99; data[1]=0x1; data[2]=0x6; data[3]=0x17;
         *     rf_settime(HANDLE, data);
         * @param {HANDLE}
         * @param {char *} 日期、星期和时间数据: [0]:年; [1]:星期; [2]:月; [3]:日; [4]:时; [5]:分; [6]:秒;
         * @return {short} =0:成功;<>0:失败
         */
        rf_settime:[short, [HANDLE, char_pointer]],
        /**
         * 读取读写器时钟的日期、星期和时间 (16进制数)
         * @param {HANDLE}
         * @param {char *} 返回的数据，长度大于14个字节
         * @return {short} =0:成功;<>0:失败
         */
        rf_gettimehex:[short, [HANDLE, char_pointer]],
        /**
         * 以16进制数设置读写器时钟的日期、星期和时间
         * 例:
         *     #设置日期17/06/99,时间12:34:56,星期一
         *     char data[14] = "99010617123456";
         *     rf_settimehex(HANDLE, data);
         * @param {HANDLE}
         * @param {char *} 时间和日期的数值
         * @return {short} =0:成功;<>0:失败
         */
        rf_settimehex:[short, [HANDLE, char_pointer]],
        /**
         * 读取eeprom的内容,例:unsigned char send_buffer[250];rf_srd_eeprom(HANDLE, 0, 200, send_buffer);
         * @param {HANDLE}
         * @param {int} 位移地址(0-249)
         * @param {int} 数据长度(1-250)
         * @param {char *} 接收数据的缓冲区
         * @return {short} =0:成功;<>0:失败
         */
        rf_srd_eeprom:[short, [HANDLE, int, int, char_pointer]],
        /**
         * 向eeprom中写入数据,例:unsigned char send_buffer[249];rf_swr_eeprom(HANDLE, 0, 250, send_buffer);
         * @param {HANDLE}
         * @param {int} 位移地址(0-249)
         * @param {int} 数据长度(1-250)
         * @param {char *} 将写入eeprom中的数据
         * @return {short} =0:成功;<>0:失败
         */
        rf_swr_eeprom:[short, [HANDLE, int, int, char_pointer]],



        //#Mifare Standard 1K 卡片 API 函数#

        /**
         * 向读写器装载指定扇区的新密码（不与卡片进行通讯）,读写器中有16个扇区的 密码（0~15）,每个扇区有两个密码(KEY A 和 KEY B)
         * 例:
         *     #装载扇区1的0号 key A："a0a1a2a3a4a5"
         *     unsigned char key[6] = {0xa0,0xa1,0xa2,0xa3,0xa4,0xa5}
         *     rf_load_key(HANDLE, 0, 1, key);
         * @param {HANDLE}
         * @param {char} 密码类型:0 - KEY A;4 - KEY B;
         * @param {char} 须装载密码的扇区号(0~15)
         * @param {char *} 写入读写器的6字节新密码
         * @return {short} =0:成功;<>0:失败
         */
        rf_load_key:[short, [HANDLE, uchar, uchar, uchar_pointer]],
        /**
         * 与rf_load_key函数相似
         * 例:
         *     #装载扇区1的0号 key A:"a0a1a2a3a4a5"
         *     char key[]= "a0a1a2a3a4a5";
         *     rf_load_key_hex(HANDLE, 0, 1, key);
         * @param {HANDLE}
         * @param {char} 密码类型:0 - KEY A;4 - KEY B;
         * @param {char} 须装载密码的扇区号(0~15)
         * @param {char *} 写入读写器的6字节新密码
         * @return {short} =0:成功;<>0:失败
         */
        rf_load_key_hex:[short, [HANDLE, uchar, uchar, uchar_pointer]],



        
        /**
         * 验证读写器中的密码与需要访问的卡片的同一扇区(0~15)的密码是否一致,如果读写器中选择的密码（可用rf_load_key函数修改）与卡片的相匹配,密码验证通过,传输的数据将用以下的命令加密
         * @param {HANDLE}
         * @param {char} 验证密码类型:0 - 用KEY A验证; 4 - 用KEY B验证
         * @param {char} 将要访问的卡片扇区号(0~15)
         * @return {short} =0:成功;<>0:失败
         */
        rf_authentication:[short, [HANDLE, char, char]],
        /**
         * 验证读写器中的密码与需要访问的卡片的同一扇区(0~15)的密码是否一致,如果读写器中选择的密码（可用rf_load_key函数修改）与卡片的相匹配,密码验证通过,主要用于验证扇区号大于15的扇区
         * 例:
         *     #用读写器中0扇区的KEY A验证块2
         *     rf_authentication_2(HANDLE, 0, 0, 2);
         * @param {HANDLE}
         * @param {char} 验证密码类型:0 - 用KEY A验证; 4 - 用KEY B验证
         * @param {char} 读写器中该扇区(0~15)的密码
         * @param {char} 将要访问的卡片块号
         * @return {short} =0:成功;<>0:失败
         */
        rf_authentication_2:[short, [HANDLE, char, char, char]],
        /**
         * 利用函数参数中提供的密码对卡片指定数据块进行认证,如果参数中提供的密码与卡片的密码匹配,则认证成功,反之则认证失败
         * 例:
         *     unsigned char key[] = {0xff, 0xff, 0xff, 0xff, 0xff, 0xff};
         *     rf_authentication_key(HANDLE, 0, 0, key);
         * @param {HANDLE}
         * @param {char} 验证密码类型:0 - 用KEY A验证; 4 - 用KEY B验证
         * @param {char} 卡片数据块地址(0~63)
         * @param {char *} 用于卡片认证的密码
         * @return {short} =0:成功;<>0:失败
         */
        rf_authentication_key:[short, [HANDLE, char, char, char_pointer]],
        /**
         * 从一张选定并通过密码验证的卡片读取一块共16个字节的数据
         * 例:
         *     unsigned char data[16];
         *     rf_read(HANDLE, 1, data);
         * @param {HANDLE}
         * @param {char} 读取数据的块号(0~63)
         * @param {char *} 读取的数据,PC机上RAM的地址空间由调用该函数来分配
         * @return {short} =0:成功;<>0:失败
         */
        rf_read:[short, [HANDLE, uchar, uchar_pointer]],
        /**
         * 读取16进制数的16个字节
         * 例:
         *     unsigned char data[32];
         *     rf_read_hex(HANDLE, 1, data);
         * @param {HANDLE}
         * @param {char} 读取数据的块号(0~63)
         * @param {char *} 读取的数据
         * @return {short} =0:成功;<>0:失败
         */
        rf_read_hex:[short, [HANDLE, uchar, char_pointer]],
        /**
         * 将一块共16字节写入选定并验证通过的卡片中
         * 例:
         *     unsigned char data[16] = {0x00,0x11,0x22,0x33,0x44,0x55,0x66,0x77,0x88,0x88,0x77,0x66,0x55,0x44,0x33,0x22,0x11};
         *     rf_write(HANDLE, 1, data);    #写入块1 
         * @param {HANDLE}
         * @param {char} 写入数据的块地址(1~63)
         * @param {char *} 写入数据,长度为16字节
         * @return {short} =0:成功;<>0:失败
         */
        rf_write:[short, [HANDLE, char, char_pointer]],
        /**
         * 以十六进制写数据,一次必须写一个块
         * 例:
         *     unsigned char data[32]="a1a2a3a4a5a6a7a8a1a2a3a4a5a6a7a8";
         *     rf_write_hex(HANDLE, 1, data);    #write block 1
         * @param {HANDLE}
         * @param {char} 写入数据的块地址(1~63)
         * @param {char *} 写入数据,长度为32字节
         * @return {short} =0:成功;<>0:失败
         */
        rf_write_hex:[short, [HANDLE, char, char_pointer]],
        /**
         * 初始化某一块的值,例:unsigned long value=1000; rf_initval(HANDLE, 1, value);
         * 注:对某一块进行值操作时使用的是特殊的数据结构,所以需要进行初始化,然后才可以进行其它的增值和减值操作
         * @param {HANDLE}
         * @param {char} 块地址
         * @param {long} 初始化的目标值
         * @return {short} =0:成功;<>0:失败
         */
        rf_initval:[short, [HANDLE, char, long]],
        /**
         * 对值操作的块进行增值操作
         * @param {HANDLE}
         * @param {char} 值操作的块地址
         * @param {long} 增加的值
         * @return {short} =0:成功;<>0:失败
         */
        rf_increment:[short, [HANDLE, char, long]],
        /**
         * 对值操作的块进行减值操作
         * @param {HANDLE}
         * @param {char} 值操作的块地址
         * @param {long} 减少的值
         * @return {short} =0:成功;<>0:失败
         */
        rf_decrement:[short, [HANDLE, char, long]],
        /**
         * 读出指定值操作块的当前值
         * @param {HANDLE}
         * @param {char} 值操作的块地址
         * @param {long *} 返回读出的值操作块的内容
         * @return {short} =0:成功;<>0:失败
         */
        rf_readval:[short, [HANDLE, char, long_pointer]],
        /**
         * 将某块的数据传入卡的内部寄存器中
         * 注:用此函数将某一块内的数值传入卡的内部寄存器,然后用rf_transfer()函数将寄存器的数据再传送到另一块中去,即实现了块与块之间的数值传送
         * @param {HANDLE}
         * @param {char} 卡片上将读出数据的块地址
         * @return {short} =0:成功;<>0:失败
         */
        rf_restore:[short, [HANDLE, char]],
        /**
         * 将内部寄存器的数据传送到某一块中,进行此项操作必须验证该扇区的密码,在执行increment,decrement或restore操作后可直接调用
         * @param {HANDLE}
         * @param {char} 内部寄存器的内容将存放的地址
         * @return {short} =0:成功;<>0:失败
         */
        rf_transfer:[short, [HANDLE, char]],
        /**
         * 通过传送来减少块的值
         * @param {HANDLE}
         * @param {char} 块地址
         * @param {long} 减少的值
         * @return {short} =0:成功;<>0:失败
         */
        rf_decrement_transfer:[short, [HANDLE, char, long]],
        /**
         * 将一张选中的卡片设为"Halt"模式,只有当该卡再次复位或用ALL模式调用request函数时,读写器才能够再次操作它
         * 注:使用rf_card()函数时,如果模式选择为0则在对卡进行读写操作完毕后,必须执行rf_halt(),且只能当该卡离开并再次进入操作区域时,读写器才能够再次操作它
         * @param {HANDLE}
         * @return {short} =0:成功;<>0:失败
         */
        rf_halt:[short, [HANDLE]],



        //#高级函数#

        /**
         * 寻卡并返回卡片的序列号,它可以完成低级函数rf_request,rf_anticoll和rf_select的功能
         * 注:rf_card()是三个低级函数的组合:rf_request(),rf_select()和rf_anticoll()
         * 注意:
         *     选用IDLE模式寻卡时,完成对卡片的操作后调用rf_halt函数来停止操作,此后读写器不能找到卡片,除非卡片离开操作区域并再次重新进入
         *     选用ALL模式寻卡时,完成对卡片的操作后调用rf_halt函数来停止操作,此后读写器仍能找到该卡片,无须离开操作区域并再次重新进入
         * 例:
         *     unsigned char Mode=0;    #IDLE mode
         *     unsigned long snr; 
         *     rf_card(HANDLE, Mode, &snr);
         * @param {HANDLE}
         * @param {char} 寻卡模式:0 - IDLE 模式,一次只操作一张卡; 1 - ALL 模式,一次可操作多张卡
         * @param {long *} 返回卡片的序列号
         * @return {short} =0:成功;<>0:失败
         */
        rf_card:[short, [HANDLE, uchar, ulong_pointer]],
        /**
         * 修改 KeyA, 访问条件和 KeyB
         * 例:
         *     unsigned char keya[6]={0xa0,0xa1,0xa2,0xa3,0xa4,0xa5};
         *     unsigned char keyb[6]={0xb0,0xb1,0xb2,0xb3,0xb4,0xb5};
         *     rf_changeb3(HANDLE,keya,0x04,0x04,0x04,0x04,0,keyb); 
         * @param {HANDLE}
         * @param {char} 扇区号
         * @param {char *} key A
         * @param {char} 0块的控制位，低三位（D2D1D0）对应为 C10,C20,C30
         * @param {char} 1块的控制位，（D2D1D0）对应为 C11,C21,C31
         * @param {char} 2块的控制位，（D2D1D0）对应为 C12,C22,C32
         * @param {char} 3块的控制位，（D2D1D0）对应为 C13,C23,C33
         * @param {char} 保留参数,设为0
         * @param {char *} key B
         * @return {short} =0:成功;<>0:失败
         */
        rf_changeb3:[short, [HANDLE, char, char_pointer, char, char, char, char, char, char_pointer]],
        /**
         * 检查写入卡片的内容，在执行 rf_write() 函数后调用该函数
         * 例:
         *     unsigned char databuff[]={0x00,0x11,0x22,0x33,0x44,0x55,0x66,0x77,0x88,0x88,0x77,0x66,0x55,0x44,0x33,0x22,0x11};
         *     unsigned char authmode=0;
         *     rf_write(HANDLE, 4, databuff);    #写入第4块
         *     rf_check_write(HANDLE, authmode, 4, databuff);    #检查第4块的内容正确与否 
         * @param {HANDLE}
         * @param {long} 卡片序列号
         * @param {char} 密码验证模式: 0 用 A 密码验证; 1 用 B 密码验证;
         * @param {char} 块地址
         * @param {char *} 检查的内容
         * @return {short} =0:成功;<>0:失败
         */
        rf_check_write:[short, [HANDLE, long, char, char, char_pointer]],
        /**
         * 与 rf_check_write() 函数类似,但使用的是16进制数
         * 例:
         *     unsigned char data[32] = "00112233445566778899aabbccddeeff";
         *     unsigned char authmode = 0;
         *     rf_write_hex(HANDLE, 4, data);
         *     rf_check_writehex(HANDLE, authmode, 4, data); 
         * @param {HANDLE}
         * @param {long} 卡片序列号
         * @param {char} 密码验证模式
         * @param {char} 块地址
         * @param {char *} 检查的内容
         * @return {short} =0:成功;<>0:失败
         */
        rf_check_writehex:[short, [HANDLE, long, char, char, char_pointer]],
        /**
         * 高级初始化值（只用于扇区不用于块）
         * 例:
         *     unsigned long snr;
         *     rf_HL_initval(HANDLE, 0x0, 3, 100L, &snr);
         * 函数操作流程:
         *     request(ALL 或 IDLE);
         *     anticoll(SEL=0);
         *     select;
         *     authentication;
         *     write(DATA);
         *     write(BACKUP);
         *     read(DATA);
         *     read(BACKUP)
         *     compare;
         *     halt;
         * @param {HANDLE}
         * @param {char} 高级函数有三种模式:0 - IDLE模式,一次只操作一张卡; 1 - ALL模式,一次可操作多张卡; 2 - 选择模式,只操作选中的卡片
         * @param {char} 扇区号（0～15）
         * @param {long} 初始化的值
         * @param {long *} 卡片序列号（只在模式2，选择模式中使用）
         * @return {short} =0:成功;<>0:失败
         */
        rf_HL_initval:[short, [HANDLE, char, char, long, long_pointer]],
        /**
         * 高级减值操作（用于扇区）
         * 例:
         *     unsigned long Snr, Nvalue, NSnr;
         *     rf_HL_decrement(HANDLE, 0, 2, 1, Snr, &Nvalue, &NSnr);
         * 函数操作流程:
         *     request(ALL或IDLE);
         *     anticoll(SEL=0);
         *     select;
         *     authentication;
         *     read(DATA);
         *     read(BACKUP);
         *     compare;
         *     decrement(DATA);
         *     transfer(BACKUP);
         *     restore(BACKUP);
         *     transfer(DATA);
         *     halt;
         * @param {HANDLE}
         * @param {char} 高级函数有三种模式:0 - IDLE模式,一次只操作一张卡; 1 - ALL模式,一次可操作多张卡; 2 - 选择模式,只操作选中的卡片
         * @param {char} 扇区号（0~15）
         * @param {long} 初始化的值
         * @param {long} 卡片序列号（只在模式2，选择模式中使用）
         * @param {long *} 将要减去的值
         * @param {long *} 返回卡片序列号
         * @return {short} =0:成功;<>0:失败
         */
        rf_HL_decrement:[short, [HANDLE, char, char, long, long, long_pointer, long_pointer]],
        /**
         * 高级增值操作(用于扇区)
         * 例:
         *     unsigned char Snr, Nvalue, NSnr;
         *     rf_HL_increment(HANDLE, 0, 2, 1, Snr, &Nvalue, &NSnr);
         * 函数操作流程:
         *     request(ALL或IDLE);
         *     anticoll(SEL=0);
         *     select;
         *     authentication;
         *     read(DATA);
         *     read(BACKUP);
         *     compare;
         *     increment(DATA);
         *     transfer(BACKUP);
         *     restore(BACKUP);
         *     transfer(DATA);
         *     halt;
         * @param {HANDLE}
         * @param {char} 高级函数有三种模式:0 - IDLE模式,一次只操作一张卡; 1 - ALL模式,一次可操作多张卡; 2 - 选择模式,只操作选中的卡片
         * @param {char} 扇区号（0~15）
         * @param {long} 初始化的值
         * @param {long} 卡片序列号（只在模式2，选择模式中使用）
         * @param {long *} 将要加上的值
         * @param {long *} 返回卡片序列号
         * @return {short} =0:成功;<>0:失败
         */
        rf_HL_increment:[short, [HANDLE, char, char, long, long, long_pointer, long_pointer]],
        /**
         * 高级写函数,向选定的并通过密码验证的卡片写入1块16个字节
         * 例:
         *     unsigned long Snr;
         *     unsigned char data[16] = "f1f2f3f4f5f6f7f8";
         *     rf_HL_write(HANDLE, 0, 3, &Snr, data);
         * 函数操作流程:
         *     request(ALL 或 IDLE);
         *     anticoll(SEL=0);
         *     select;
         *     authentication;
         *     write(Addr);
         *     read(Addr);
         *     halt;
         * @param {HANDLE}
         * @param {char} 高级函数有三种模式:0 - IDLE模式,一次只操作一张卡; 1 - ALL模式,一次可操作多张卡; 2 - 选择模式,只操作选中的卡片
         * @param {char} 块地址
         * @param {long *} 卡片序列号（仅用于模式2）
         * @param {char *} 写入卡片的数据(长度为16 字节)
         * @return {short} =0:成功;<>0:失败
         */
        rf_HL_write:[short, [HANDLE, char, char, long_pointer, char_pointer]],
        /**
         * 16进制高级写操作,参数同rf_HL_write
         * 例:
         *     unsigned char data[32] = "f1f2f3f4f5f6f7f8f1f2f3f4f5f6f7f8";
         *     unsigned long Snr;
         *     rf_HL_writehex(HANDLE, 0, 3, &Snr, data);
         * @return {short} =0:成功;<>0:失败
         */
        rf_HL_writehex:[short, [HANDLE, char, char, long_pointer, char_pointer]],
        /**
         * 高级读函数，从选定的并通过密码验证的卡片读出1块16个字节
         * 例:
         *     unsigned long Snr, NSnr;
         *     unsigned char data[16];
         *     rf_HL_read(HANDLE, 0, 3, Snr, data, &NSnr);
         * 函数操作流程:
         *     request(ALL或IDLE);
         *     anticoll(SEL=0);
         *     select;
         *     authentication;
         *     read(Addr);
         *     read(BACKUP);
         *     compare;
         *     halt;
         * @param {HANDLE}
         * @param {char} 高级函数有三种模式:0 - IDLE模式,一次只操作一张卡; 1 - ALL模式,一次可操作多张卡; 2 - 选择模式,只操作选中的卡片
         * @param {char} 块地址
         * @param {long} 卡片序列号（仅用于模式2）
         * @param {char *} 从卡片中读出的数据(长度为16 字节)
         * @param {long *} 返回卡片序列号
         * @return {short} =0:成功;<>0:失败
         */
        rf_HL_read:[short, [HANDLE, char, char, long, char_pointer, long_pointer]],
        /**
         * 高级16进制读操作,参数同rf_HL_read
         * 例:
         *     unsigned char data[32];
         *     unsigned long Snr, NSnr;
         *     rf_HL_readhex(HANDLE, 0, 3, Snr, data, &NSnr);
         * @return {short} =0:成功;<>0:失败
         */
        rf_HL_readhex:[short, [HANDLE, char, char, long, char_pointer, long_pointer]],
        /**
         * 高级验证函数(组合了rf_card()和rf_authentication()函数)
         * 例:
         *     unsigned long snr;
         *     rf_HL_authentication(HANDLE, 0, snr, 0, 3);
         * @param {HANDLE}
         * @param {char} 高级函数有三种模式:0 - IDLE模式,一次只操作一张卡; 1 - ALL模式,一次可操作多张卡; 2 - 选择模式,只操作选中的卡片
         * @param {long} 卡片序列号（仅用于模式2）
         * @param {char} 密码验证模式:0 - 用A密码验证; 4 - 用B密码验证 
         * @param {char} 扇区号（0～15）
         * @return {short} =0:成功;<>0:失败
         */
        rf_HL_authentication:[short, [HANDLE, char, long, char, char]],



        //#Mifare UltraLight卡的操作函数#

        /**
         * 取UltraLight卡片序列号,此种卡的序列号长度为7字节
         * 例:
         *     unsigned char _Snr[8];
         *     rf_get_snr(HANDLE, _Snr);
         * @param {HANDLE}
         * @param {char *} 返回的卡片序列号; [0]:卡片序列号第0字节, [6]:卡片序列号第6字节
         * @return {short} =0:成功;<>0:失败
         */
        rf_get_snr:[short, [HANDLE, char_pointer]],
    });
    
    //所有读卡器 api对象都追加在window.CardReaderDevice下
    window.CardReaderDevice.mwrf32 = mwrf32;
})(window);