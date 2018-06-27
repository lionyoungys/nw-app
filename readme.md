package.json             -->    脚本运行文件
webpack.config.js        -->    编译配置文件
pc.sql                   -->    热更新数据表
shell.txt                -->    node扩展所需的脚本命令
script-src               -->    扩展文件源码
print                    -->    打印界面文件夹

app                      -->    运行目录
app/package.json         -->    系统配置文件
app/login.html           -->    登录界面
app/main.html            -->    系统主界面
app/font                 -->    字体文件夹
app/img                  -->    图片文件夹
app/media                -->    媒体文件夹
app/vendor               -->    外部引入插件或工具包文件夹
app/vendor/include.js    -->    全局引用无需babel编译使用的node库
app/vendor/Tool.js       -->    工具封装库
app/vendor/M1Reader.js     -->    读卡器操作对象封装
app/vendor/Prototype.js  -->    原型函数库
app/vendor/KeyCode.js    -->    输入法强制转换为英文函数库
app/node_modules         -->    node模块文件夹

src                      -->    开发目录
src/Api.js               -->    api请求封装框架
src/Router.js            -->    路由配置
src/Menu.js              -->    菜单配置
src/Event.js             -->    事件注册配置
src/login.js             -->    登录界面开发文件
src/login.css            -->    登录界面样式文件
src/main.js              -->    主界面开发文件
src/main.css             -->    主界面样式文件
src/UI                   -->    界面开发UI组件文件夹
src/Module               -->    界面开发界面模块文件夹




src/Module下界面组件的继承方法
changeView(obj);    
    切换界面方法：
        参数方式1
            obj = {view:'界面路由名称', param:'界面携带参数'}
        参数方式2
            支持dataset
            data-view='界面路由名称' data-param='界面携带参数'

closeView();    
    关闭界面方法：


src/Module下界面组件的继承属性
param:携带参数

####
生产环境软件同级目录须安装的node扩展:node-adodb, request, request-progress, ms, ffi, ref, text-encoding
解决windows xp 下ffi扩展找不到的问题:在node_modules\ffi\src\win32-dlfcn.cc文件中，将里面的地96行和第99行的两行代码，对应的代码应该是：
     errorMode = GetErrorMode();  
     SetErrorMode(errorMode | SEM_FAILCRITICALERRORS);
将这两行代码注释掉，然后重新运行:nw-gyp rebuild --targ et=0.14.7 --arch=ia32
########
使用到的命令
npm install --global --production windows-build-tools
nw-gyp rebuild --target=0.14.7 --arch=ia32
node-pre-gyp rebuild --runtime=node-webkit --target=0.14.7 --target_arch=ia32



