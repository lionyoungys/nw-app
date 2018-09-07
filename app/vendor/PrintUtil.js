/**
 * esc/pos打印工具模块
 * @author Edwin Young
 * @desc 依赖js库:JsBarcode;依赖node_module:printer, bufferhelper, iconv-lite
 */
(function(window) {
    var node_printer = require('printer')
    ,   BufferHelper = require('bufferhelper')
    ,   iconv = require('iconv-lite')
    ,   cmds = {
            INIT: '\x1B\x40', //Initial paper
            NEW_LINE: '\x0A', //Add new line
            PAPER_CUTTING: '\x1d\x56\x41', //Cut paper
            LINE_HEIGHT: '\x1b\x32', //Normal line height 
            LINE_HEIGHT_B: '\x1b\x33\x6e', //Normal line height large
            CHN_TEXT: '\x1b\x52\x0f', //CHN text
            // text style
            TXT_NORMAL: '\x1d\x21\x00', // Normal text
            TXT_SIZE: '\x1d\x21', // Double height text
            TXT_UNDERL_OFF: '\x1b\x2d\x00', // Underline font OFF
            TXT_UNDERL_ON: '\x1b\x2d\x01', // Underline font 1-dot ON
            TXT_UNDERL2_ON: '\x1b\x2d\x02', // Underline font 2-dot ON
            TXT_BOLD_OFF: '\x1b\x45\x00', // Bold font OFF
            TXT_BOLD_ON: '\x1b\x45\x01', // Bold font ON
            TXT_ALIGN_L: '\x1b\x61\x00', // Left justification
            TXT_ALIGN_C: '\x1b\x61\x01', // Centering
            TXT_ALIGN_R: '\x1b\x61\x02', // Right justification
            //字体
            TXT_FONT_A: '\x1b\x4d\x00', // Font type A
            TXT_FONT_B: '\x1b\x4d\x01', // Font type B
            TXT_FONT_C: '\x1b\x4d\x02', // Font type C
            TXT_FONT_D: '\x1b\x4d\x48', // Font type D
            TXT_FONT_E: '\x1b\x4d\x31', // Font type E
            //barcode
            BARCODE_TXT_OFF: '\x1d\x48\x00', // HRI barcode chars OFF
            BARCODE_TXT_ABV: '\x1d\x48\x01', // HRI barcode chars above
            BARCODE_TXT_BLW: '\x1d\x48\x02', // HRI barcode chars below
            BARCODE_TXT_BTH: '\x1d\x48\x03', // HRI barcode chars both above and below
            BARCODE_FONT_A: '\x1d\x66\x00', // Font type A for HRI barcode chars
            BARCODE_FONT_B: '\x1d\x66\x01', // Font type B for HRI barcode chars
            BARCODE_HEIGHT: '\x1d\x68\x64', // Barcode Height [1-255]
            BARCODE_WIDTH: '\x1d\x77\x03', // Barcode Width  [2-6]
            //一维码
            BARCODE_UPC_A: '\x1d\x6b\x00', // Barcode type UPC-A
            BARCODE_UPC_E: '\x1d\x6b\x01', // Barcode type UPC-E
            BARCODE_EAN13: '\x1d\x6b\x02', // Barcode type EAN13
            BARCODE_EAN8: '\x1d\x6b\x03', // Barcode type EAN8
            BARCODE_CODE39: '\x1d\x6b\x04', // Barcode type CODE39
            BARCODE_ITF: '\x1d\x6b\x05', // Barcode type ITF
            BARCODE_NW7: '\x1d\x6b\x06', // Barcode type NW7
            BARCODE_CODE128: '\x1d\x6b\x08', // Barcode type CODE128
            //BARCODE_CODE128: '\x1d\x6b\x49\x06', // Barcode type CODE128
            //二维码,from http://stackoverflow.com/questions/23577702/printing-qr-codes-through-an-esc-pos-thermal-printer
            QRCODE_SIZE_MODAL: '\x1D\x28\x6B\x03\x00\x31\x41\x32\x00', //Select the model,[49 x31, model 1] [50 x32, model 2] [51 x33, micro qr code]
            QRCODE_SIZE: '\x1D\x28\x6B\x03\x00\x31\x43',  //Set the size of module
            QRCODE_ERROR: '\x1D\x28\x6B\x03\x00\x31\x45\x31', //Set n for error correction [48 x30 -> 7%] [49 x31-> 15%] [50 x32 -> 25%] [51 x33 -> 30%]
            QRCODE_AREA_LSB: '\x1D\x28\x6B', //Store the data in the symbol storage area LSB
            QRCODE_AREA_MSB: '\x31\x50\x30', //Store the data in the symbol storage area MSB
            QRCODE_PRINT:'\x1D\x28\x6B\x03\x00\x31\x51\x30', //Print the symbol data in the symbol storage area
            //钱箱
            CASHBOX_OPEN: '\x1B\x70\x00\xFF\xFF', //Open casebox
            //蜂鸣
            BEEP:'\x1b\x42', //beep
            IMG:'\x1b\x2a\x21',
        };

    /**
     * 打印任务
     * @param  {string}   printer_name 打印机名
     * @param  {function} callback     function(err, msg),当获取打印机后执行,如果不存在指定打印机，返回err信息
     */
    window.PrintUtil = function(printer_name, callback) {
        //判断打印机名称是否传入，若未传入则使用默认打印机
        this.printer = ('string' !== typeof printer_name || 0 == printer_name.length) ? node_printer.getDefaultPrinterName() : printer_name;
        /*try {
            node_printer.getPrinter(this.printer);    //windows xp系统不兼容getPrinter方法,会出现闪退现象
        } catch (err) {
            'function' === typeof callback && callback.call(this, err, '打印机不存在!');
            return;
        }*/
        this.queue = new BufferHelper();    //escpos指令队列
        this.queue.concat(new Buffer('\x5E\x58\x41'));
        this.writeCmd('INIT');
        this.zpl = '';
        'function' === typeof callback && callback.call(this, null, 'Get printer success');
    }
    var now;
    PrintUtil.prototype = {
        config:{
            barcode:{displayValue:false, height:60, margin:0}
        },
        now:function() {
            if (!now) {
                var date = new Date()
                ,   month = date.getMonth() + 1
                ,   day = date.getDate()
                ,   hour = date.getHours()
                ,   minute = date.getMinutes()
                ,   second = date.getSeconds();
                now = date.getFullYear() + '-'
                +      (10 > month ? '0' + month : month) + '-'
                +      (10 > day ? '0' + day : day) + ' '
                +      (10 > hour ? '0' + hour : hour) + ':'
                +      (10 > minute ? '0' + minute : minute) + ':'
                +      (10 > second ? '0' + second : second);
            }
            return now;
        },
        /**
         * 执行命令
         * @param  {string} cmd 命令名
         * @return {object}     当前对象
         */
        writeCmd: function(cmd) {
            if (cmds[cmd]) {
                this.queue.concat(new Buffer(cmds[cmd]));
            }
            return this;
        },
        /**
         * 打印文字
         * @param  {string} text        文字内容
         * @param  {boolen} new_line    是否换行默认换行
         * @return {object}             当前对象
         */
        text: function(text, new_line) {
            if ('string' === typeof text) {
                if ('boolean' !== typeof new_line) new_line = true;
                this.queue.concat(iconv.encode(text, 'GBK'));
                new_line && this.writeCmd('NEW_LINE');
            }
            return this;
        },
        /**
         * 打印虚线
         * @return {object}    当前对象
         */
        dashed: function() {
            var text = '-';
            for (var i = 1;i < 32;++i) {
                text += '-'
            }
            this.queue.concat(iconv.encode(text, 'GBK'));
            this.writeCmd('NEW_LINE');
            return this;
        },
        /**
         * 打印空行
         * @param  {number} number 行数
         * @return {object}        当前对象
         */
        line: function(number) {
            number = number || 1;
            for (var i = 0; i < number; i++) {
                this.writeCmd('NEW_LINE');
            }
            return this;
        },
        /**
         * 设置对其
         * @param  {string} align 居中类型,l/c/r
         * @return {object}       当前对象
         */
        align: function(align) {
            align = align || 'L';
            this.writeCmd('TXT_ALIGN_' + align.toUpperCase());
            return this;
        },
        /**
         * 设置字体
         * @param  {string} family a/b/c/d/e
         * @return {object}        当前对象
         */
        font: function(family) {
            family = family || 'A';
            this.writeCmd('TXT_FONT_' + family.toUpperCase());
            return this;
        },
        /**
         * 设置行距
         * @param {number} hex 16进制数据,如'\x05'
         */
        lineheight: function(hex) {
            this.writeCmd('LINE_HEIGHT');
            'string' === typeof hex && hex.length > 3 && this.queue.concat(new Buffer('\x1b\x33' + hex));    //设置行间距
            return this;
        },
        /**
         * 设置格式（加粗，下拉）
         * @param  {string} type b/u/u2/bu/bu2/normal
         * @return {object}      当前对象
         */
        style: function(type) {
            switch (type.toUpperCase()) {
                case 'B':
                    this.writeCmd('TXT_UNDERL_OFF');
                    this.writeCmd('TXT_BOLD_ON');
                    break;
                case 'U':
                    this.writeCmd('TXT_BOLD_OFF');
                    this.writeCmd('TXT_UNDERL_ON');
                    break;
                case 'U2':
                    this.writeCmd('TXT_BOLD_OFF');
                    this.writeCmd('TXT_UNDERL2_ON');
                    break;
                case 'BU':
                    this.writeCmd('TXT_BOLD_ON');
                    this.writeCmd('TXT_UNDERL_ON');
                    break;
                case 'BU2':
                    this.writeCmd('TXT_BOLD_ON');
                    this.writeCmd('TXT_UNDERL2_ON');
                    break;
                case 'NORMAL':
                default:
                    this.writeCmd('TXT_BOLD_OFF');
                    this.writeCmd('TXT_UNDERL_OFF');
                    break;
            }
            return this;
        },
        /**
         * 设定字体尺寸
         * @param  {string} size  2/3/4/null
         * @return {object}       当前对象
         */
        size: function(size) {
            this.writeCmd('TXT_NORMAL');
            this.writeCmd('LINE_HEIGHT');
            switch(parseInt(size)){
                case 2:
                    this.queue.concat(new Buffer(cmds['TXT_SIZE']+'\x10'));
                    this.queue.concat(new Buffer(cmds['TXT_SIZE']+'\x01'));
                    break;
                case 3:
                    this.queue.concat(new Buffer(cmds['TXT_SIZE']+'\x32'));
                    this.queue.concat(new Buffer(cmds['TXT_SIZE']+'\x02'));
                    break;
                case 4:
                    this.queue.concat(new Buffer(cmds['TXT_SIZE']+'\x48'));
                    this.queue.concat(new Buffer(cmds['TXT_SIZE']+'\x03'));
                    break;
            }
            return this;
        },
        /**
         * 打开钱箱
         * @return {object} 当前对象
         */
        openCashbox: function() {
            this.writeCmd('CASHBOX_OPEN');
            return this;
        },
        /**
         * 清空打印内容
         * @return {object} 当前对象
         */
        empty: function() {
            this.queue.empty();
            return this;
        },
        /**
         * 一维码
         * @param {string} code 一维码字符
         * @param {object} config jsbarcode一维码配置参数
         */
        barcode: function(code, config) {
            if ('object' === typeof config && null !== config) {    //判断jsbarcode配置项
                for (var k in this.config.barcode) {
                    if ('undefined' === typeof config[k]) config[k] = this.config.barcode[k];
                }
            } else {
                config = this.config.barcode;
            }
            var canvas = document.createElement('canvas');
            JsBarcode(canvas, code, config);
            this.draw2PxPoint(canvas);
            return this;
        },
        draw2PxPoint: function(canvas) {
            var tmp = []
            ,   k = 0
            ,   hc = canvas.height / 24;
            for (var j = 0; j < hc; ++j) {
                tmp[k++] = 0x1B;
                tmp[k++] = 0x2A;    //0x1B 2A 表示图片打印指令
                tmp[k++] = 33;    //m=33时，选择24点密度打印
                tmp[k++] = parseInt(canvas.width % 256); // nL
                tmp[k++] = parseInt(canvas.width / 256); // nH
                for (var i = 0; i < canvas.width; ++i) {
                    for (var m = 0; m < 3; ++m) {
                        for (var n = 0; n < 8; ++n) {
                            var b = this.px2byte(i, j * 24 + m * 8 + n, canvas);
                            tmp[k] = tmp[k] ? tmp[k] : 0;
                            tmp[k] += tmp[k] + b;
                        }
                        k++;
                    }
                }
            }
            tmp[k++] = 0x1B;
            tmp[k++] = 0x32;
            this.queue.concat(new Buffer(tmp));
        },
        /**
         * 像素转打印数值
         * @param {number} x x坐标
         * @param {number} y y坐标
         * @return {number} 转换后的数值
         */
        px2byte: function(x, y, canvas) {
            if (x < canvas.width && y < canvas.height) {
                var rgba = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
                if (0 == rgba[3]) return 0;
                return (rgba[0] < 255 && rgba[1] < 255 && rgba[2] < 255) ? 1 : 0;
            }
            return 0;
        },
        /**
         * 执行打印
         * @param  {Function} callback function(err,msg),当执行打印后，回调该函数，打印错误返回err信息
         */
        print: function(callback) {
            this.writeCmd('PAPER_CUTTING');
            this.writeCmd('INIT');
            this.sendCmd(callback);
        },
        /**
         * 发送命令
         * @param  {Function} callback function(err,msg),当执行打印后，回调该函数，打印错误返回err信息
         */
        sendCmd:function(callback){
            var _this = this;
            node_printer.printDirect({
                data: _this.queue.toBuffer(),
                printer: _this.printer,
                type: "RAW",
                success: function() {
                    'function' === typeof callback && callback.call(_this, null, '打印成功');
                    _this.queue.empty();
                },
                error: function(err) {
                    'function' === typeof callback && callback.call(_this, err, '打印失败');
                }
            });
        },
        zplStart: function() {
            this.zpl += '^XA';
            this.zpl += '^CW1,ANMDJ.TTF^CI28';    //使用utf-8编码
            return this;
        },
        zplEnd: function() {
            this.zpl += '^XZ';
            return this;
        },
        /**
         * zpl原点定位
         * @param {number} x x坐标
         * @param {number} y y坐标
         * @return {object}    当前对象
         */
        zplPosition: function(x, y) {
            if (isNaN(x)) x = 0;
            if (isNaN(y)) y = 0;
            this.zpl += ('^LH' + x + ',' + y);
            return this;
        },
        /**
         * zpl相对于原点定位的绝对定位位置
         * @param {number} x x坐标
         * @param {number} y y坐标
         * @return {object}    当前对象
         */
        zplAbsolute: function(x, y) {
            if (isNaN(x)) x = 0;
            if (isNaN(y)) y = 0;
            this.zpl += ('^FO' + x + ',' + y);
            return this;
        },
        /**
         * zpl像素模式设置
         * @param {string} mode A:打印机使用当前最高分辨率;B:打印分辨率减半
         * @return {object}    当前对象
         */
        zplPixel: function(mode) {
            mode = mode || 'A';
            this.zpl += '^JM' + mode.toUpperCase();
            return this;
        },
        /**
         * zpl文字写入
         * @param {string} text 写入文字
         * @return {object}    当前对象
         */
        zplText: function(text, h, w) {
            if ('string' !== typeof text) text = '';
            if (isNaN(h)) h = 18;
            if (isNaN(w)) w = 10;
            this.zpl += ('^A1N,' + h + ',' + w + '^FD' + text + '^FS');
            return this;
        },
        /**
         * barcode128打印
         * @param {string} value barcode内容
         * @param {number} h barcode高度;默认:50;
         * @param {boolean} displayValue 是否显示barcode的值;默认:true
         * @param {boolean} aboveValue barcode值是否显示在上方;默认:false
         * @param {string} UCCModel UCC模型:N/U/A/D;默认:A
         * @return {object}    当前对象
         */
        zplBarcode: function(value, h, displayValue, aboveValue, UCCModel) {
            if ('string' !== typeof value) value = '';
            if (isNaN(h)) h = 50;
            if ('boolean' !== typeof displayValue) displayValue = true;
            if ('string' !== typeof UCCModel || 1 !== UCCModel.length) UCCModel = 'A';
            this.zpl += ('^BY2^BCN,' + h + ',' + (displayValue ? 'Y' : 'N') + ',' + (aboveValue ? 'Y' : 'N') + ',Y,' + UCCModel.toUpperCase() + '^FD' + value + '^FS');
            return this;
        },
        /**
         * zpl指令写入
         * @param {string} cmd 写入的指令
         * @return {object}    当前对象
         */
        zplCmd: function(cmd) {
            this.zpl += cmd;
            return this;
        },
        sendZpl:function(callback){
            var _this = this;
            node_printer.printDirect({
                data: _this.zpl,
                printer: _this.printer,
                type: "RAW",
                success: function() {
                    'function' === typeof callback && callback.call(_this, null, '打印成功');
                },
                error: function(err) {
                    'function' === typeof callback && callback.call(_this, err, '打印失败');
                }
            });
        }
    };
})(window)