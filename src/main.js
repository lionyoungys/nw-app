/**
 * 主界面组件
 * @author Edwin Young
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import router from './Router';
import Menus from './Menus';
import './Api';
import './Event';
import './main.css';
import './UI/base.css';
import './Elem/App.css';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            max:false, 
            min:false,
            isMaxMin:false,    //是否为最大化的情况下最小化
            view:null,    //视图路由名称
            param:null,   //视图路由携带参数
            MenuIndex:0,    //当前选中的菜单id 

        }
        this.handleClick = this.handleClick.bind(this);
        this.changeView = this.changeView.bind(this);    //界面跳转方法  
        this.leftMenuReload = this.leftMenuReload.bind(this);    //左侧菜单重新加载      
    }
    
    componentDidMount() {
        EventApi.win.on('restore', () => {
            if (this.state.min && this.state.max && !this.state.isMaxMin) {    //窗口最大化的情况下最小化
                this.setState({isMaxMin:true});
            } else if (this.state.min && this.state.max && this.state.isMaxMin) {    //最小化还原为最大化
                this.setState({min:false,isMaxMin:false});
            } else if (this.state.max && !this.state.isMaxMin) {    //窗口最大化的情况下非最小化
                this.setState({max:false});
            }
        });
        EventApi.win.on('maximize', () => this.setState({max:true}));
        EventApi.win.on('minimize', () => this.setState({min:true}));      
    }   

    componentDidCatch(error) {
        console.log(error);
        this.setState({view:null, MenuIndex:0});
        tool.ui.error({msg:'当前界面出了些状况，暂时无法使用！', callback:close => close()});
    }

    handleClick(e) {this.setState({MenuIndex:e.target.dataset.index});}

    //路由跳转方法
    changeView(e) {
        let view = null,    //视图
            param = null,    //视图携带参数
            eventName = null;
        if ('object' === typeof e.target) {    //视图及参数赋值
            let dataset = e.target.dataset;
            if ('string' === typeof dataset.view) view = dataset.view;
            if ('undefined' !== typeof dataset.param) param = dataset.param;
            if ('string' === typeof dataset.event) eventName = dataset.event
        } else {
            if ('string' === typeof e.view) view = e.view;
            if ('undefined' !== typeof e.param) param = e.param;
            if ('string' === typeof e.event) eventName = e.event
        }
        if (eventName && 'function' === typeof EventApi[eventName]) {    //若为事件处理而非跳转视图,则处理事件
            EventApi[eventName]();
        } else {
            null !== view && this.state.view !== view && this.setState({view:view,param:param});
        }
    }

    leftMenuReload(modules) {this.MainLeftMenu.reload(modules)}

    render() {
        let View = null === this.state.view ? null : ('undefined' !== typeof router[this.state.view] ? router[this.state.view] : null);
        let tabs = Menus.map((obj, index) => 
            <span key={obj.key} data-index={index} data-checked={this.state.MenuIndex == index ? '1' : ''} onClick={this.handleClick}>{obj.value}</span>
        );
        return (
            <div id='main'>
                {/* 界面顶部标题栏 */}
                <div className='main-title'>
                    &nbsp;<i className='e-icon-logo'></i> {'mname'.getData()}
                    <div>
                        <i className="e-icon-user"></i> {'aname'.getData()}&emsp;<i className="e-icon-windows"></i> 版本:{nw.App.manifest.version}
                        <span onClick={() => EventApi.win.minimize()}><i className="fas fa-minus"></i></span>
                        <span onClick={() => this.state.max ? EventApi.win.restore() : EventApi.win.maximize()}><i className="far fa-window-maximize"></i></span>
                        <span onClick={() => EventApi.quit()}><i className="fas fa-times"></i></span>
                    </div>
                </div>
                {/* 界面顶部菜单栏 */}
                <div className='main-top'><div>{tabs}</div></div>
                <Container menus={Menus[this.state.MenuIndex].options} changeView={this.changeView}>
                    {null === View ? null : <View changeView={this.changeView} closeView={() => this.setState({view:null,param:null})} leftMenuReload={this.leftMenuReload}/>}
                </Container>
            </div>
        );
    }
}  
class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.menus);
        let html = this.props.menus.map(obj => 
            <span
                key={obj.value} 
                data-view={obj.view} 
                data-event={obj.event} 
                onClick={this.props.changeView} 
                className={obj.className ? 'main-menus-' + obj.className : null}
            >{obj.value}</span>
        );
        return (
            <div className='main-container'>
                <div className='main-menus'>{html}</div>
                {this.props.children}
            </div>
        );
    }
}
//顶部菜单栏组件
/*class MainTopMenu extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let menuList = topMenu.map(obj => 
            <div key={obj.value}>
                【{obj.value}】
                <div className='main-menu-options'>
                    {obj.options.map(obj2 =>
                        <div
                            key={obj2.value}
                            data-view={obj2.view}
                            data-event={obj2.event}
                            onClick={this.props.changeView}
                        ><div data-view={obj2.view}>【{obj2.value}】</div></div>
                    )}
                </div>
            </div>
        );
        return <div className='main-menu'>{menuList}</div>;
    }
}
//顶部导航栏组件
class MainNav extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let navList = nav.map(obj => 
            <div key={obj.value}><div className={obj.class} data-view={obj.view} data-event={obj.event} onClick={this.props.changeView}>{obj.value}</div></div>
        );
        return (
            <div className='main-nav'>{navList}</div>
        );
    }
}
//左侧菜单栏组件
class MainLeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {leftMenu:leftMenu, count:0};
        this.handleClick = this.handleClick.bind(this);
        this.reload = this.reload.bind(this);
    }
    componentDidMount() {
        this.reload();
        // 新订单提示
        this.timeId = setInterval(() => {       
            api.post('new_order',{token:'token'.getData(), mid:'mid'.getData()}, (res,ver) => {
                console.log(res);
                if (ver) {
                    this.setState({count:res.result.length});
                    EventApi.notify({
                        title:'新订单提示', 
                        body:'接到一个新订单，请注意查收',
                        onshow:() => {
                            this.audio.src = 'media/new_order.ogg';
                            this.audio.play();
                        },
                        onclick:() => {this.props.changeView({view:'onlineorder'})}
                    });  
                } else {
                    this.setState({count:0});
                }                              
            })           
        }, 300000); 
    }
    componentWillUnmount() {clearInterval(this.timeId)}

    handleClick(e) {
        let node = e.target.parentNode;
        if (node.classList.contains('main-left-menu-hidd')) {
            node.classList.remove('main-left-menu-hidd');
        } else {
            node.classList.add('main-left-menu-hidd');
        }
    }

    reload(modules) {
        if (!tool.isArray(modules)) {
            try {
                modules = JSON.parse('module'.getData());
            } catch (e) {
                modules = [];
            }
        }
        if ('object' === typeof modules && modules instanceof Array) {
            let menu = tool.clone(leftMenu)
            ,   len = menu[1].options.length
            ,   modulesLen = modules.length
            ,   hasModule = false
            ,   tmp;
            for (var i = 0;i < len;++i) {
                if (!isNaN(menu[1].options[i].id)) {
                    for (var j = 0;j < modulesLen;++j) {
                        tmp = isNaN(modules[j]) ? modules[j].id : modules[j];
                        if (menu[1].options[i].id == tmp) {
                            hasModule = true;
                            break;
                        }
                    }
                } else {
                    hasModule = true;
                }
                if (hasModule) {
                    hasModule = false;
                } else {
                    menu[1].options.splice(i, 1);
                    --i;
                    --len;
                }
            }
            this.setState({leftMenu:menu});
        }
    }
    render() {
        let className;
        let menuList = this.state.leftMenu.map((obj, index) => {
            if (index < 2) {
                className = 'main-left-menu';
            } else {
                className = 'main-left-menu main-left-menu-hidd';
            }
            return (
                <div key={obj.value} className={className}>
                    <div onClick={this.handleClick}>{obj.value}</div>
                    <div>
                        {
                            obj.options.map(obj2 => 
                                <div 
                                    className={obj2.class} 
                                    key={obj2.value} 
                                    data-view={obj2.view} 
                                    data-event={obj2.event} 
                                    onClick={this.props.changeView}
                                >{obj2.value}{obj2.state && !isNaN(this.state[obj2.state]) && this.state[obj2.state] > 0 && <i>{this.state[obj2.state]}</i>}</div>
                            )
                        }
                    </div>
                </div>
            );
        });
        return (
            <div className='main-left'>              
                <div className='main-task-bar'></div>
                {menuList}
                <audio ref={audio => this.audio = audio} style={{display:'none'}}></audio>             
            </div>
        );
    }
}*/

ReactDOM.render(<Main/>, document.getElementById('root'));