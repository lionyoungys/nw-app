/**
 * 全局引用无需babel编译使用的node库
 */
(function(window){
    window.ADODB = require('node-adodb');
    ADODB.connection = function(address, password) {
        password = password || '';
        return ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=' + address + ';Persist Security Info=False;Jet OLEDB:Database Password=' + password);
    }
    window.request = require('request');
    window.progress = require('request-progress');
    
})(window);