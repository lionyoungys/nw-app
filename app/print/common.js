(function(window) {
    
    var c = {
        win:nw.Window.get(),
        barcode:function(elem, code) {JsBarcode(elem, code, {displayValue: false,width:2, height:30})},    //依赖JsBarcode
        print:function() {
            win.print({
                headerFooterEnabled:false,
                marginsType:3,
                mediaSize:{'name':'CUSTOM', 'width_microns':58000, 'custom_display_name':'Letter', 'is_default':true},
                marginsCustom:{"marginBottom":0,"marginLeft":13,"marginRight":22,"marginTop":0}
            });
        }
    };
    c.win.on('close', function() {
        this.hide();
        null !== c.win && c.win.close(true);
        this.close(true);
    });
    c.win.on('closed', function() {c.win = null});
    
    window.common = c;
})(window);