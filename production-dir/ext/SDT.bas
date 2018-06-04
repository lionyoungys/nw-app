Attribute VB_Name = "SDT"


' *****************************************************************************
' * Copyright @ 2011 by YOWO RFID                                             *
' * All rights are reserved.                                                  *
' *                                                                           *
' * YW SDT RFID Reader   Include File                                         *
' * VB                                                                        *
' * SDT.bas                                                                 *
' * file vesion: 1.2                                                          *
' * web: http://www.youwokeji.com.cn                                          *
' * tel: 010-59395668                                                         *
' *****************************************************************************

Global Const REQUESTMODE_ALL = &H52
Global Const REQUESTMODE_ACTIVE = &H26

Global Const SAM_BOUND_9600 = 0
Global Const SAM_BOUND_38400 = 1

Global Const PASSWORD_A = &H60
Global Const PASSWORD_B = &H61

Global Const ENCRYPT = 0
Global Const DECRYPT = 1


'//*******************************************DLL相关函数 ************************/


'/*    函数： YW_GetDLLVersion
' *    名称： 返回当前DLL的版本
' *    参数：无
' *  返回值：版本号
'*/

Public Declare Function YW_GetDLLVersion Lib "SDT.dll" () As Long



'/*    函数： DES
' *    名称： DES加解密函数
' *    参数：cModel： 加密或者解密 ， 0加密，1解密，对应常数ENCRYPT =0，DECRYPT = 1
'              pkey：加解密秘钥指针，8个字节
'            inData：要加解密的数据指针，8个字节
'            OutData: 经过加解密后的数据指针，8个字节
' *  返回值：无意义
'*/

Public Declare Function DES Lib "SDT.dll" (ByVal cModel As Byte, ByRef pkey As Byte, ByRef InData As Byte, ByRef OutData As Byte) As Long



'/*    函数： DES3
' *    名称： 3DES加解密函数
' *    参数：cModel： 加密或者解密 ， 0加密，1解密，对应常数ENCRYPT =0，DECRYPT = 1
'              pkey：加解密秘钥指针，16个字节
'            inData：要加解密的数据指针，8个字节
'            OutData: 经过加解密后的数据指针，8个字节
' *  返回值：无意义
'*/
Public Declare Function DES3 Lib "SDT.dll" (ByVal cModel As Byte, ByRef pkey As Byte, ByRef InData As Byte, ByRef OutData As Byte) As Long


'/*    函数： DES3_CBC
' *    名称： 带向量的3DES加解密函数
' *    参数：cModel： 加密或者解密 ， 0加密，1解密，对应常数ENCRYPT =0，DECRYPT = 1
'             pkey：加解密秘钥指针，8个字节
'             inData：要加解密的数据指针，8个字节
'             OutData: 经过加解密后的数据指针，8个字节
'             pIV:    向量指针，8个字节
'
' *  返回值：无意义
'*/

Public Declare Function DES3_CBC Lib "SDT.dll" (ByVal cModel As Byte, ByRef pkey As Byte, ByRef InData As Byte, ByRef OutData As Byte, ByRef pIV As Byte) As Long


'//*******************************************读写器相关函数 ************************/



'{
'/*    函数： YW_USBHIDInitial
' *    名称： 免驱USB端口初始化
' *    参数： 无
' *  返回值：>0为成功 ，其它失败
'*/
'}
Public Declare Function YW_USBHIDInitial Lib "SDT.dll" () As Long

'{
'/*    函数： YW_USBHIDInitial
' *    名称： 免驱USB端口释放
' *    参数： 无
' *  返回值：>0为成功，其它失败
'*/
'}
Public Declare Function YW_USBHIDFree Lib "SDT.dll" () As Long




'{
'/*    函数： YW_ComNewBound
' *    名称： 更改串口波特率
' *    参数： NewBound， 新的波特率
' *  返回值：>0为成功，其它失败
'*/
'}
Public Declare Function YW_SetReaderID Lib "SDT.dll" (ByVal OldID As Integer, ByVal NewID As Integer) As Long

'{
'/*    函数： YW_GetReaderID
' *    名称： 读取读写器ID
' *    参数： ReaderID：读写器ID号，0为广播地址
' *  返回值：>=0为成功，并且为读写器ID ，其它失败
'*/
'}
Public Declare Function YW_GetReaderID Lib "SDT.dll" (ByVal ReaderID As Integer) As Long

'{
'/*    函数： YW_GetReaderVersion
' *    名称： 获取读写器的版本
' *    参数： ReaderID：读写器ID号，0为广播地址
' *  返回值：>=0为成功，并且为读写器版本 ，其它失败
'*/
'}
Public Declare Function YW_GetReaderVersion Lib "SDT.dll" (ByVal ReaderID As Integer) As Long

'{
'/*    函数： YW_GetReaderSerial
' *    名称： 获取读写器的序列号
' *    参数：     ReaderID：读写器ID号，0为广播地址
'             ReaderSerial：输出为读写器的序列号，8个字节
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_GetReaderSerial Lib "SDT.dll" (ByVal ReaderID As Integer, ByRef ReaderSerial As Byte) As Long

'{
'/*    函数： YW_GetReaderNo
' *    名称： 获取读写器的型号
' *    参数： ReaderID：读写器ID号，0为广播地址
'              ReadeNo：输出为读写器的型号，8个字节
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_GetReaderNo Lib "SDT.dll" (ByVal ReaderID As Integer, ByRef ReadeNo As Byte) As Long

'
'{
'/*    函数： YW_Buzzer
' *    名称： 蜂鸣器操作函数
' *    参数： ReaderID：读写器ID号，0为广播地址
'              Time_ON：蜂鸣器响时间，单位0.1s
'             Time_OFF：蜂鸣器不响时间，单位0.1s
'Cycle:                   蜂鸣器循环次数
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_Buzzer Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal Time_ON As Integer, ByVal Time_OFF As Integer, ByVal Cycle As Integer) As Long


'{
'/*    函数： YW_Led
' *    名称： LED灯操作函数
' *    参数： ReaderID：读写器ID号，0为广播地址
'LEDIndex:              选择要操作的LED灯
'              Time_ON： 灯亮的时间，单位0.1s
'             Time_OFF：灯不亮时间，单位0.1s
'Cycle:                    循环次数
'LedIndexOn:              最后要亮的灯
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_Led Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal LEDIndex As Integer, ByVal Time_ON As Integer, ByVal Time_OFF As Integer, ByVal Cycle As Integer, ByVal LedIndexOn As Integer) As Long


'{
'/*    函数： YW_AntennaStatus
' *    名称： 开启天线，在所有卡操作之前必须开启天线
' *    参数：  ReaderID：读写器ID号，0为广播地址
'               Status: true为开启天线， false为关闭天线
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_AntennaStatus Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal Status As Boolean) As Long


'//*******************************************ISO14443A卡片操作函数 ************************/


'{
'/*    函数： YW_RequestCard
' *    名称： 寻卡TypeA卡
' *    参数：  ReaderID：读写器ID号，0为广播地址
'RequestMode:            寻卡模式
'                        所有卡  常数 REQUESTMODE_ALL=$52,
'                        激活的卡 常数 REQUESTMODE_ACTIVE=$26,
'CardType:            输出卡类型
'                      0x4400 -> Ultralight/UltraLight C /MifarePlus(7Byte UID)
'                      0x4200 -> MifarePlus(7Byte UID)
'                      0x0400 ->Mifare Mini/Mifare 1K (S50) /MifarePlus(4Byte UID)
'                      0x0200->Mifare_4K(S70)/ MifarePlus(4Byte UID)
'                      0x4403 ->Mifare_DESFire
'                      0x0800 ->Mifare_Pro
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_RequestCard Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal RequestMode As Byte, ByRef CardType As Integer) As Long

'{
'/*    函数： YW_AntiCollide
' *    名称： 访冲突操作
' *    参数：  ReaderID：读写器ID号，0为广播地址
'LenSNO:              输出卡号的长度
'SNO:                 输出卡号
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_AntiCollide Lib "SDT.dll" (ByVal ReaderID As Integer, ByRef LenSNO As Byte, ByRef SNO As Byte) As Long

'
'{
'/*    函数： YW_CardSelect
' *    名称： 选卡
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'LenSNO:                   要选择卡卡号的长度
'SNO:                      要选择卡卡号
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_CardSelect Lib "SDT.dll" (ByVal ReaderID As Integer, ByRef LenSNO As Byte, ByRef SNO As Byte) As Long

'{
'/*    函数： YW_KeyAuthorization
' *    名称： M1卡授权
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'                KeyMode:  秘钥选择Key A或者Key B
'                           常数  PASSWORD_A           =    $60,
'                           常数  PASSWORD_B           =    $61,
'BlockAddr:                 要授权的块
'                   Key：  秘钥字节指针，6字节
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_KeyAuthorization Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal KeyMode As Byte, ByVal BlockAddr As Integer, ByRef Key As Byte) As Long

'{
'/*    函数： YW_ReadaBlock
' *    名称： 读取M1卡一个块
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'BlockAddr:                要读取的块号
'              LenData：  要读取的字节数，最大为16
'Data:                    数据指针
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_ReadaBlock Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal BlockAddr As Integer, ByVal LenData As Integer, ByRef Data As Byte) As Long

'{
'/*    函数： YW_WriteaBlock
' *    名称： 写入M1卡一个块
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'BlockAddr:                要写入的块号
'              LenData：  要读取的字节数，必须为16
'Data:                    数据指针
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_WriteaBlock Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal BlockAddr As Integer, ByVal LenData As Integer, ByRef Data As Byte) As Long

'{
'/*    函数： YW_Purse_Initial
' *    名称： M1卡将某一块初始化钱包
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'BlockAddr:                要初始化钱包的块号
'IniValue:                 钱包初始化值
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_Purse_Initial Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal BlockAddr As Integer, ByVal IniValue As Integer) As Long
'
'{
'/*    函数： YW_Purse_Read
' *    名称： 读取M1卡某个块的钱包值
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'BlockAddr:                要初始化钱包的块号
'Value:                   钱包的当前值
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_Purse_Read Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal BlockAddr As Integer, ByRef Value As Integer) As Long

'{
'/*    函数： YW_Purse_Decrease
' *    名称： 对钱包进行减值操作
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'BlockAddr:                要初始化钱包的块号
'Decrement:                要减去的值
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_Purse_Decrease Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal BlockAddr As Integer, ByVal Decrement As Integer) As Long

'{
'/*    函数： YW_Purse_Decrease
' *    名称： 对钱包进行加值操作
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'BlockAddr:                要初始化钱包的块号
'Charge:                  要增加的值
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_Purse_Charge Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal BlockAddr As Integer, ByVal Charge As Integer) As Long

'{
'/*    函数： YW_Purse_Decrease
' *    名称： 对钱包进行Restor操作
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'BlockAddr:                钱包的块号
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_Restore Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal BlockAddr As Integer) As Long

'{
'/*    函数： YW_Purse_Decrease
' *    名称： 对钱包进行Transfer操作
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'BlockAddr:                钱包的块号
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_Transfer Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal BlockAddr As Integer) As Long


'{
'/*    函数： YW_CardHalt
' *    名称： 对M1卡进行Halt操作
' *    参数：  ReaderID：  读写器ID号，0为广播地址
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_CardHalt Lib "SDT.dll" (ReaderID As Integer) As Long

'{
'/*    函数： YW_AntiCollide_Level
' *    名称： 对M1卡进行n级防碰撞
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'              Leveln：n级防碰撞，从1到3
'LenSNO:               卡号的长度
'SNO:                 卡号指针
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_AntiCollide_Level Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal Leveln As Integer, ByRef LenSNO As Byte, ByRef SNO As Byte) As Long


'{
'/*    函数： YW_SelectCard_Level
' *    名称： 对M1卡进行n级选卡
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'              Leveln：n级防碰撞，从1到3
'SAK:                  输出SAK
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_SelectCard_Level Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal Leveln As Integer, ByRef SAK As Byte) As Long

'{
'/*    函数： YW_AntiCollideAndSelect
' *    名称： 对M1卡进行防碰撞并选卡
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'RequestMode:            寻卡模式
'                        所有卡  常数 REQUESTMODE_ALL=$52,
'                        激活的卡 常数 REQUESTMODE_ACTIVE=$26,
'MultiCardMode:          对多张卡的处理方式
'0                            返回多卡错误
'1                            返回一张卡片
'CardMem:                返回卡的内存代码
'SNOLen:                 输出卡号的长度
'SNO:                    卡的序列号
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_AntiCollideAndSelect Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal MultiCardMode As Byte, ByRef CardMem As Byte, ByRef SNOLen As Long, ByRef SNO As Byte) As Long

'{
'/*    函数： YW_RequestAntiandSelect
' *    名称： 对M1卡寻卡，防碰撞并选卡
' *    参数：  ReaderID：  读写器ID号，0为广播地址

'MultiCardMode:          对多张卡的处理方式
'0                            返回多卡错误
'1                            返回一张卡片
'ATQA:                    ATQA
'SAK:                    SAK
'SNOLen:                 输出卡号的长度
'SNO:                    卡的序列号
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_RequestAntiandSelect Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal RequestMode As Byte, ByVal MultiCardMode As Byte, ByRef ATQA As Integer, ByRef SAK As Byte, ByRef LenSNO As Byte, ByRef SNO As Byte) As Long

'{
'/*    函数： YW_WriteM1MultiBlock
' *    名称： 对M1卡写多块
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'StartBlock:               开始块号
'BlockNums:                要写得块数量
'                LenData： 要写得数据长度，16的倍数
'PData:                    要写得数据
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_WriteM1MultiBlock Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal StartBlock As Integer, ByVal BlockNums As Integer, ByVal LenData As Integer, ByRef PData As Byte) As Long

'{
'/*    函数： YW_ReadM1MultiBlock
' *    名称： 对M1卡读取多块
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'StartBlock:               开始块号
'BlockNums:                要读取的块数量
'LenData:                  返回读取的数据长度
'PData:                    返回的数据
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_ReadM1MultiBlock Lib "SDT.dll" (ByVal ReaderID As Integer, StartBlock As Integer, BlockNums As Integer, ByRef LenData As Integer, ByRef PData As Byte) As Long


'//*******************************************UltraLight卡片操作函数 ************************/

'{
'/*    函数： YW_UltraLightRead
' *    名称： Ultra Light 卡读取块
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'BlockID:                 读取的块号
'PData:                    返回的数据
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_UltraLightRead Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal BlockID As Integer, ByRef PData As Byte) As Long

'{
'/*    函数： YW_UltraLightWrite
' *    名称： Ultra Light 卡写块
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'BlockID:                 要写的块号
'PData:                    写入的数据
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_UltraLightWrite Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal BlockID As Integer, ByRef PData As Byte) As Long


'//*******************************************Type A CPU 卡片操作函数 ************************/

'{
'/*    函数： YW_TypeA_Reset
' *    名称： Type A CPU卡复位
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'RequestMode:            寻卡模式
'                        所有卡  常数 REQUESTMODE_ALL=$52,
'                        激活的卡 常数 REQUESTMODE_ACTIVE=$26,
'MultiCardMode:          对多张卡的处理方式
'0                            返回多卡错误
'1                            返回一张卡片
'rtLen:                  复位返回数据的长度
'PData:                   复位返回的数据
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_TypeA_Reset Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal RequestMode As Byte, ByVal MultiCardMode As Byte, ByRef rtLen As Integer, ByRef PData As Byte) As Long

'{
'/*    函数： YW_TypeA_COS
' *    名称： Type A CPU卡执行COS命令
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'LenCOS:                   COS命令的长度
'Com_COS:                  COS命令
'rtLen:                    执行COS后返回的数据长度
'PData:                    执行COS后返回的数据
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_TypeA_COS Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal LenCOS As Integer, ByVal Com_COS As Byte, ByRef DataLen As Integer, ByRef PData As Byte) As Long


'{
'/*    函数： YW_SAM_ResetBaud
' *    名称： SAM卡复位波特率设置
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'SAMIndex:                SAM卡序号
'BoundIndex:                波特率序号
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_SAM_ResetBaud Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal SAMIndex As Integer, ByVal BoundIndex As Integer) As Long

'{
'/*    函数： YW_SAM_Reset
' *    名称： SAM卡复位
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'SAMIndex:                 SAM卡序号
'DataLen:                  返回复位数据的长度
'PData:                    复位数据
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_SAM_Reset Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal SAMIndex As Integer, ByRef DataLen As Integer, ByRef PData As Byte) As Long

'{
'/*    函数： YW_SAM_Reset
' *    名称： SAM卡复位
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'SAMIndex:                 SAM卡序号
'LenCOS:                   COS命令长度
'Com_COS:                  COS命令数据
'DataLen:                  返回复位数据的长度
'PData:                    复位数据
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_SAM_COS Lib "SDT.dll" (ByVal ReaderID As Integer, ByVal ByValSAMIndex As Integer, ByVal LenCOS As Integer, ByRef Com_COS As Byte, ByRef DataLen As Integer, ByRef PData As Byte) As Long

'{
'/*    函数： YW_SAM_PPSBaud
' *    名称： SAM卡PPS波特率设置
' *    参数：  ReaderID：  读写器ID号，0为广播地址
'SAMIndex:                 SAM卡序号
'BoundIndex:                波特率序号
' *  返回值：>=0为成功，其它失败
'*/
'}
Public Declare Function YW_SAM_PPSBaud Lib "SDT.dll" (ByVal ReaderID As Integer, ByValSAMIndex As Integer, ByVal BaudIndex As Integer) As Long


