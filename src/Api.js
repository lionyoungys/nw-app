/**
 * 接口数据函数对象封装
 * @author yangyunlog
 */
(function(window){
    var request = window.require('request')
    ,   progress = window.require('request-progress')
    ,   defaultParameter = {};
    var a = {
        config:{
            hostError:'服务器响应错误！',
            dataError:'服务器数据异常！',
        },
        host:HOST,
    };
    /**
     * 获取url
     * @param uri 指定成员属性或uri或url
     * @return string url
     */
    a.U = function(uri) {
        if ('string' === typeof this[uri]) return (this.host + '/' + (this[uri].indexOf('/') === 0 ? this[uri].substring(1) : this[uri]));
        if (0 === uri.indexOf('http')) return uri;
        if (0 === uri.indexOf('/')) {
            return (this.host + uri);
        } else {
            return (this.host + '/' + uri);
        }
    };
    
    /**
     * 创建数据对象
     * @param object 数据对象
     * @return object 数据对象
     */
    a.D = function (object) {
        const fd = new FormData();
        if ('object' === typeof object) {
            for (let k in object) {
                if ('object' === typeof object[k]) {
                    object[k] instanceof Blob && fd.append(k, object[k], k);
                } else {
                    fd.append(k, object[k]);
                }
            }
        }
        return fd;
    }

    /**
     * 设置默认参数
     * @param {string} key 
     * @param {string} value 
     */
    a.setDefaultParameter = function(key, value) {
        if ('string' === typeof key && 'string' === typeof value) {
            defaultParameter[key] = value;
        }
    }
    
    /**
     * response 数据验证
     * @param object response
     * @return boolean true or false
     */
    a.V = function(object) {return ('object' === typeof object && 'undefined' !== typeof object.code && 0 == object.code)}

    /**
     * get数据请求
     * @param uri 指定成员属性
     * @param success 请求成功回调函数 data, verify
     * @param error 请求错误回调函数
     * @return void
     */
    a.get = function (uri, success, error) {
        request(this.U(uri), (err, res, body) => {
            if (!err && 200 === res.statusCode) {
                try {
                    let data = JSON.parse(body)
                    ,   ver = this.V(data);
                    try {
                        'function' === typeof success 
                        && 
                        success(
                            data, 
                            ver, 
                            function(obj) {
                                obj = obj || {};
                                if (ver) {
                                    tool.ui.success({
                                        msg:obj.msg || null,
                                        callback:close => {
                                            close();
                                            'function' === typeof obj.callback && obj.callback();
                                        }
                                    });
                                } else {
                                    tool.ui.error({
                                        msg:data.msg, 
                                        callback:close => {
                                            'function' === typeof obj.callback && obj.callback();
                                            close();
                                        }
                                    });
                                }
                            }
                        );
                    } catch (e2) {
                        console.log('请注意！这是报错信息！下方为错误对象！数据处理方法错误！');
                        console.log(e2);
                    }
                } catch (e) {
                    'function' === typeof error && error();
                    tool.ui.error({msg:this.config.dataError,callback:close => close()});
                }
            } else {
                'function' === typeof error && error();
                tool.ui.error({msg:this.config.hostError,callback:close => close()});
            }
        });
    }


    /**
     * post数据请求
     * @param uri 指定成员属性
     * @param object 数据对象
     * @param success 请求成功回调函数
     * @param error 请求错误回调函数
     * @return void
     */
    a.post = function(uri, object, success, error) {
        request.post({url:this.U(uri), formData: object}, (err, res, body) => {
            if (!err && 200 === res.statusCode) {
                try {
                    let data = JSON.parse(body)
                    ,   ver = this.V(data);
                    try {
                        'function' === typeof success 
                        && 
                        success(
                            data, 
                            ver, 
                            function(obj) {
                                obj = obj || {};
                                if (ver) {
                                    tool.ui.success({
                                        msg:obj.msg || null,
                                        callback:close => {
                                            close();
                                            'function' === typeof obj.callback && obj.callback();
                                        }
                                    });
                                } else {
                                    tool.ui.error({
                                        msg:data.msg, 
                                        callback:close => {
                                            'function' === typeof obj.callback && obj.callback();
                                            close();
                                        }
                                    });
                                }
                            }
                        );
                    } catch (e2) {
                        console.log('请注意！这是报错信息！下方为错误对象！数据处理方法错误！');
                        console.log(e2);
                    }
                } catch (e) {
                    console.log('error', res);
                    console.log('error_body', body);
                    'function' === typeof error && error();
                    tool.ui.error({msg:this.config.dataError,callback:close => close()});
               }
            } else {
                console.log('error', res);
                console.log('error_body', body);
                'function' === typeof error && error();
                tool.ui.error({msg:this.config.hostError,callback:close => close()});
            }
        });
    }

    a.download = function (uri, writeStream, onProgress, onEnd) {
        progress(request(this.U(uri)))    //热更新且展示进度条
        .on('progress', state => {
            if ('function' === typeof onProgress) {
                state.progress_rate = Math.floor((state.size.transferred / state.size.total) * 100);
                onProgress(state);
            }
        })
        .on('end', () => {'function' === typeof onEnd && onEnd()})
        .pipe(writeStream);
    }

    window.api = a;
})(window);