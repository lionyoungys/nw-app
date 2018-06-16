/**
 * 键盘按键英文输入监听
 * @author Edwin Young
 * @desc 依赖Tool.js，需在tool.js之后引入
 */

(function(window) {
    var k = {
        code:new Array(),    //英文键盘编码
        chCode:{
            Space:' ',NumpadDecimal:'.',Comma:',', Period:'.', Slash:'/',Semicolon:';',Quote:'\'',BracketLeft:'[',BracketRight:']',Minus:'-',
            Equal:'=',Backslash:'\\',NumpadDivide:'/',NumpadMultiply:'*',NumpadSubtract:'-',NumpadAdd:'+',Backquote:'`',shift_Backquote:'~',
            shift_Digit1:'!',shift_Digit2:'@',shift_Digit3:'#',shift_Digit4:'$',shift_Digit5:'%',shift_Digit6:'^',shift_Digit7:'&',shift_Digit8:'*',
            shift_Digit9:'(',shift_Digit0:')',shift_Minus:'_',shift_Equal:'+',shift_BracketLeft:'{',shift_BracketRight:'}',shift_Backslash:'|',
            shift_Semicolon:':',shift_Quote:'"',shift_Comma:'<',shift_Period:'>',shift_Slash:'?'
        },           //中文键盘code映射
        CapsLock:false,      //大写锁是否打开
        callback:null,       //回调函数
        Enter:null           //回车键监听
    };
    //键盘映射ASCII表    最大键盘码为222，大于222的keyCode即为中文输入法
    //k.code[8] = 'Backspace';k.code[13] = 'Enter';k.code[16] = 'Shift';k.code[17] = 'Control';k.code[18] = 'Alt';k.code[27] = 'Esc';k.code[46] = 'Delete';

    k.code[32] = ' ';k.code[33] = '!';
    k.code[34] = '"';k.code[35] = '#';
    k.code[36] = '$';k.code[37] = '%';
    k.code[38] = '&';k.code[39] = '\'';
    k.code[40] = '(';k.code[41] = ')';
    k.code[42] = '*';k.code[43] = '+';
    k.code[44] = ',';k.code[45] = '-';
    k.code[46] = '.';k.code[47] = '/';
    k.code[48] = '0';k.code[49] = '1';
    k.code[50] = '2';k.code[51] = '3';
    k.code[52] = '4';k.code[53] = '5';
    k.code[54] = '6';k.code[55] = '7';
    k.code[56] = '8';k.code[57] = '9';
    k.code[58] = ':';k.code[59] = ';';
    k.code[60] = '<';k.code[61] = '=';
    k.code[62] = '>';k.code[63] = '?';
    k.code[64] = '@';k.code[91] = '[';
    k.code[92] = '\\';k.code[93] = ']';
    k.code[94] = '^';k.code[95] = '_';
    k.code[96] = '`';k.code[123] = '{';
    k.code[124] = '|';k.code[125] = '}';k.code[126] = '~';
    //字母映射
    k.code[65] = 'A';k.code[97] = 'a';
    k.code[66] = 'B';k.code[98] = 'b';
    k.code[67] = 'C';k.code[99] = 'c';
    k.code[68] = 'D';k.code[100] = 'd';
    k.code[69] = 'E';k.code[101] = 'e';
    k.code[70] = 'F';k.code[102] = 'f';
    k.code[71] = 'G';k.code[103] = 'g';
    k.code[72] = 'H';k.code[104] = 'h';
    k.code[73] = 'I';k.code[105] = 'i';
    k.code[74] = 'J';k.code[106] = 'j';
    k.code[75] = 'K';k.code[107] = 'k';
    k.code[76] = 'L';k.code[108] = 'l';
    k.code[77] = 'M';k.code[109] = 'm';
    k.code[78] = 'N';k.code[110] = 'n';
    k.code[79] = 'O';k.code[111] = 'o';
    k.code[80] = 'P';k.code[112] = 'p';
    k.code[81] = 'Q';k.code[113] = 'q';
    k.code[82] = 'R';k.code[114] = 'r';
    k.code[83] = 'S';k.code[115] = 's';
    k.code[84] = 'T';k.code[116] = 't';
    k.code[85] = 'U';k.code[117] = 'u';
    k.code[86] = 'V';k.code[118] = 'v';
    k.code[87] = 'W';k.code[119] = 'w';
    k.code[88] = 'X';k.code[120] = 'x';
    k.code[89] = 'Y';k.code[121] = 'y';
    k.code[90] = 'Z';k.code[122] = 'z';

    /**
     * 键盘输入法强制英文监听 tool.KeyCode.listen
     * @param {*object} node 元素节点对象
     * @param {*function} callback 输入回调函数
     */
    k.listen = function(node, callback) {
        if (node instanceof Node) {
            node.onkeydown = this.onkeydown;
            node.onkeypress = this.onkeypress;
            node.onkeyup = this.onkeyup;
            if ('function' === typeof callback) this.callback = callback;
        }
    }
    k.onkeydown = function(e) {
        if ('Backspace' === e.code || 'Delete' === e.code) return null !== k.callback && k.callback('');
        var keyCode = e.keyCode||e.which;    //按键的keyCode
        if (e instanceof KeyboardEvent && keyCode > 222) {    //中文输入法判断
            var value = this.value,
                chCode = e.shiftKey && 'string' === typeof k.chCode['shift_' + e.code] ? k.chCode['shift_' + e.code] : k.chCode[e.code];    //获取中文键盘映射的值
            if ('string' === typeof chCode) {
                value += chCode;
            } else if ('Enter' === e.code) {
                return null !== k.Enter && k.Enter();
            } else {
                if (
                    -1 === e.code.indexOf('Key')
                    &&
                    -1 === e.code.indexOf('Digit')
                    &&
                    -1 === e.code.indexOf('Numpad')
                ) return;
                var tempVal = e.code.replace('Key','').replace('Digit', '').replace('Numpad', '');
                value += (!e.shiftKey && isNaN(tempVal)) ? tempVal.toLowerCase() : tempVal;
            }
            null !== k.callback && k.callback(value);
        }
    }
    k.onkeypress = function(e) {
        var keyCode = e.keyCode||e.which,    //按键的keyCode 
            value = k.code[keyCode];         //对应键盘值
        if (13 == keyCode) return null !== k.Enter && k.Enter();
        if (e instanceof KeyboardEvent && 'string' === typeof value) {    //英文输入法判断
            if (
                ((keyCode > 64 && keyCode < 91 ) && !e.shiftKey)    //大写锁打开，且没有按住shift键 
                || 
                ((keyCode > 96 && keyCode < 123 ) && e.shiftKey)    //大写锁打开，且按住shift键 
            ){
                k.CapsLock = true;
            }
            null !== k.callback && k.callback(this.value + value);
        }
    }
    k.onkeyup = function(e) {
        if (e instanceof KeyboardEvent && 20 == (e.keyCode||e.which)) k.CapsLock = !k.CapsLock;
    }
    if ('object' !== typeof tool) window.tool = {};
    tool.KeyCode = k;
})(window);
