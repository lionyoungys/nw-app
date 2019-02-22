/**
 * 摄像类
 * @author AbuYoung
 */
(function (window) {
    //camera对象
    var c = function () {
        //旧版本浏览器可能根本没有实现mediaDevices，判断并设置空对象
        if ('undefined' == typeof navigator.mediaDevices) {
            navigator.mediaDevices = {};
        }
        if ('undefined' == typeof navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
                //首先，如果有getUserMedia的话，就获得它
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
                //一些浏览器根本没实现它，那么就返回一个error到promise的reject来保持一个统一的接口
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                } else {    // 否则，为老的navigator.getUserMedia方法包裹一个Promise
                    return new Promise(function (resolve, reject) {
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    });
                }
            }
        }
        this.video = function (videoNode) {
            var promise = navigator.mediaDevices.getUserMedia({video: true,audio: false});
            //video配置
            //{mandatory:{minAspectRatio:1.40,maxAspectRatio:1.78,minFrameRate:15,maxFrameRate:25,minWidth:1280,minHeight:720}}
            promise.then(stream => {
                // 旧的浏览器可能没有srcObject
                if ('srcObject' in videoNode) {
                    videoNode.srcObject = stream;
                } else {
                    // 防止在新的浏览器里使用它，因为它已经不再支持了
                    videoNode.src = window.URL.createObjectURL(stream);
                }
                videoNode.onloadedmetadata = function (e) {
                    videoNode.play();
                };
            }).catch(err => {
                alert('未发现摄像设备');
                console.error(err.name + ': ' + err.message);
            })
        }
    }

    if ('object' !== typeof window.tool) window.tool = {};
    tool.camera = c;
})(window);