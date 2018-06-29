/**
 * 主界面组件
 * @author Edwin Young
 */
const process = window.require('process')
,     path = window.require('path');
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import router from './Router';
import {topMenu, nav, leftMenu} from './Menu';
import './Api';
import './Event';
import './main.css';
import './UI/base.css';

let win = nw.Window.get();
win.on('loaded', win.show);    //防止窗口渲染未完成时展示
win.on('close', function() {
    this.hide();    //关闭时先进行隐藏以让用户觉得立即关闭
    null !== win && win.close(true);    //虽然关了,但实际上它还在工作
    this.close(true);    //关闭新窗口也关闭主窗口
});
win.on('closed', function() {win = null});    //新窗口关闭后释放'win'对象
win.showDevTools();
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            max:false, 
            min:false,
            isMaxMin:false,    //是否为最大化的情况下最小化
            view:null,    //视图路由名称
            param:null    //视图路由携带参数
        }
        this.changeView = this.changeView.bind(this);    //界面跳转方法
    }
    
    componentDidMount() {
        win.on('restore', () => {
            if (this.state.min && this.state.max && !this.state.isMaxMin) {    //窗口最大化的情况下最小化
                this.setState({isMaxMin:true});
            } else if (this.state.min && this.state.max && this.state.isMaxMin) {    //最小化还原为最大化
                this.setState({min:false,isMaxMin:false});
            } else if (this.state.max && !this.state.isMaxMin) {    //窗口最大化的情况下非最小化
                this.setState({max:false});
            }
        });
        win.on('maximize', () => this.setState({max:true}));
        win.on('minimize', () => this.setState({min:true}));
    }
    
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
        if (eventName) {    //若为事件处理而非跳转视图,则处理事件
            EventApi[eventName]();
        } else {
            null !== view && this.state.view !== view && this.setState({view:view,param:param});
        }
    }

    render() {
        let View = null === this.state.view ? null : ('undefined' !== typeof router[this.state.view] ? router[this.state.view] : null);
        return (
            <div id='main'>
                {/* 界面顶部菜单栏 */}
                <div className='main-top'>
                    <div className='main-title'>
                        {'mname'.getData()}&nbsp;【操作员：{'aname'.getData()}】&nbsp;【软件版本：{nw.App.manifest.version}】
                        <div>
                            <div className='main-mini' onClick={() => win.minimize()}></div>
                            <div className='main-max' onClick={() => this.state.max ? win.restore() : win.maximize()}></div>
                            <div className='main-close' onClick={() => EventApi.quit()}></div>
                        </div>
                    </div>
                    <MainTopMenu changeView={this.changeView}/>
                    <MainNav changeView={this.changeView}/>
                </div>
                {/* 界面左侧菜单栏 */}
                <MainLeftMenu changeView={this.changeView}/>
                <div className='main-container'>
                    {null === View ? null : <View changeView={this.changeView} closeView={() => this.setState({view:null,param:null})}/>}
                </div>
            </div>
        );
    }
}

//顶部菜单栏组件
class MainTopMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {index:null};
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    handleMouseOver(e) {
        let index = e.target.dataset.index;
        'undefined' !== typeof index && index !== this.state.index && this.setState({index:index})
    }

    render() {
        let menuList = topMenu.map((obj, index) => 
            <div key={obj.value}>
                【{obj.value}】
                <div data-index={index} onMouseOver={this.handleMouseOver} onMouseOut={() => this.setState({index:null})}>
                    <div data-index={index} className='main-menu-options' style={{display:this.state.index == index ? 'block' : 'none'}}>
                        {obj.options.map(obj2 => 
                            <div
                                key={obj2.value}
                                data-index={index}
                                data-view={obj2.view}
                                data-event={obj2.event}
                                onClick={this.props.changeView}
                            ><div data-index={index} data-view={obj2.view}>【{obj2.value}】</div></div>
                        )}
                    </div>
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
    }

    render() {
        let menuList = leftMenu.map(obj => 
            <div key={obj.value} className='main-left-menu'>
                <div>{obj.value}</div>
                <div>
                    {obj.options.map(obj2 => <div className={obj2.class} key={obj2.value} data-view={obj2.view} data-event={obj2.event} onClick={this.props.changeView}>{obj2.value}</div>)}
                </div>
            </div>
        );
        return (
            <div className='main-left'>
                <div className='main-task-bar'></div>
                {menuList}
            </div>
        );
    }
}


ReactDOM.render(<Main/>, document.getElementById('root'));