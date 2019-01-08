/**
 * Demo组件
 * @author Edwin Young
 */

import React from 'react';
import Window from '../UI/Window';
import Dish from '../UI/Dish';
import Empty from '../UI/Empty';
import Page from '../UI/Page';
import Select from '../UI/Select';
import MultiSelect from '../UI/MultiSelect';
import MathUI from '../UI/MathUI';
import Triangle from '../UI/Triangle';
import Clothes from '../UI/Clothes';
import Photo from '../UI/Photo';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dish:false, selectVal:'麻辣香锅', values:[], number:0, total:100, current:1, fetch:20, data:[], checked:[], show:false, string:new String(1111), photo:false}
        this.handleClickForSuccess = this.handleClickForSuccess.bind(this);
        this.handleClickForError = this.handleClickForError.bind(this);
        this.handleCLickForWarn = this.handleCLickForWarn.bind(this);
        this.handleEat = this.handleEat.bind(this);
        this.handleEat2 = this.handleEat2.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
        this.option = ['全选', '麻辣香锅', '水煮鱼', '三文鱼刺身', '金枪鱼寿司', '波仔鲜芦笋', '金枪鱼饭团', '明太子', '海胆', '小米海参'];
    }

    componentDidMount() {
        new QRCode(this.div, {text: "bitch, don't scan me!", width: 80, height: 80, correctLevel : QRCode.CorrectLevel.H});
        new QRCode(this.div2, {text: "http://www.suxida.com.cn/", width: 80, height: 80, correctLevel : QRCode.CorrectLevel.H});
        api.post('clothes', {token:'token'.getData(), page:1, limit:10000}, (res, ver, handle) => {    //获取衣物列表
            if (ver) {
                this.setState({data:res.result.type});
            } else {
                handle()
            }
        });
    }
    handleClickForSuccess() {
        tool.ui.success({callback:close => close()})
    }
    handleClickForError() {
        tool.ui.error({callback:close => close()});
    }
    handleCLickForWarn() {
        tool.ui.warn({
            title: '删除员工', msg: '提示:删除员工后，该账号将被强<br/>制下线并永久封停，但该员工的操作历史仍将保留。<br/>', callback: (close, event) => {
                if (event == '取消' || 'close') {
                    close(); 
                }else{
                    close(); 
                }
        }});
    }
    handleEat() {
        tool.ui.error({title:'品尝失败', msg:'我姐竟然不给吃！', button:['吃另一盘'],callback:(close, value) => {
            console.log(value);
            close();
        }});
    }
    handleEat2() {
        tool.ui.warn({title:'偷偷摸摸搞事情中...', msg:'尝尝麻辣小龙虾？', button:['高冷离开', '低调品尝'],callback:(close, value) => {
            console.log(value);
            close();
        }});
    }
    handleChoose(e) {
        let value = e.target.innerText;
        if (e.target.dataset.checked == 'checked') {
            if ('全选' === value) {
                return this.setState({values:[]});
            } else {
                let index = value.inArray(this.state.values);
                this.state.values.splice(index, 1);
            }
        } else {
            if ('全选' === value) {
                return this.setState({values:tool.clone(this.option)});
            } else {
                this.state.values.push(value);
            }
        }
        this.setState({values:this.state.values});
    }
    render() {
        let arr = [
            { id: 're', name: 'df', img:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=475001989,366276207&fm=26&gp=0.jpg'},
            { id: 're', name: 'df', img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1951101960,3872257815&fm=26&gp=0.jpg'},
            { id: 're', name: 'df', img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2376860606,2887384089&fm=26&gp=0.jpg'},
        ];
        return (
            <Window title='偷窥厨房的窗口' onClose={this.props.closeView} padding={true}>
                <div ref={div => this.div = div}></div>
                <p></p>
                <div ref={div => this.div2 = div}></div>
                <Triangle/>
                <button type='button' className='e-btn' onClick={this.handleClickForSuccess}>成功弹窗</button>&nbsp;
                <button type='button' className='e-btn' onClick={this.handleCLickForWarn}>警告弹窗</button>&nbsp;
                <button type='button' className='e-btn' disabled>样式禁用</button>&nbsp;
                <button type='button' className='e-btn-b' onClick={this.handleClickForError}>失败弹窗</button><br/>
                <button type='button' className='e-btn' onClick={() => this.setState({photo:true})}>图片弹窗</button><br/>
                <button type='button' className='e-btn larger' onClick={() => this.setState({dish:true})}>盘子里的菜</button><br/>
                <button type='button' className='e-btn larger' onClick={() => this.setState({show:true})}>衣物选择组件</button>&emsp;选中的:{this.state.checked.toString()}<br/>
                <p><input type='text' value={this.state.string} onChange={e => this.setState({string:e.target.value})}/> </p>
                <label><input type='checkbox' className='e-checkbox' value='111' onClick={e => console.log(e.target)}/> 你好</label><br/>
                <label><input type='radio' className='e-radio' value='222' name='r'/> 你好</label>&emsp;
                <label><input type='radio' className='e-radio' value='333' name='r'/> 不好</label><br/>
                <input type='date' className='e-date'/><br/>
                <input type='text' className='e-input' placeholder='输入内容' value={this.state.total} onChange={e => this.setState({total:e.target.value})}/>&emsp;
                <input type='text' className='e-input e-error' placeholder='输入内容'/>&emsp;
                <input type='text' className='e-input e-error' placeholder='输入内容' disabled/><br/>
                <Select option={['麻辣香锅', '水煮鱼', '西芹淮山炒百合']} value={this.state.selectVal} onChange={obj => {console.log(obj);this.setState({selectVal:obj.value})}}/>
                &emsp;
                <Select option={['麻辣香锅', '水煮鱼', '西芹淮山炒百合']} disabled={true} value={this.state.selectVal} onChange={obj => {console.log(obj);this.setState({selectVal:obj.value})}}/>
                &emsp;

                <MultiSelect value={this.state.values.toString()}>
                    {this.option.map(value => <span key={tool.UUID()} data-checked={-1 === value.inArray(this.state.values) ? '' : 'checked'} onClick={this.handleChoose}>{value}</span>)}
                </MultiSelect>

                <MathUI onAdd={() => this.setState({number:this.state.number+1})} onSub={() => this.setState({number:this.state.number-1})}>{this.state.number}</MathUI><br/>
                <textarea className='e-textarea' rows='10' cols='50'></textarea>
                <br/>
                {
                    this.state.dish 
                    && 
                    <Dish title='盘子' onClose={() => this.setState({dish:false})}>
                        <div className='e-red'>麻辣小龙虾</div>
                        <div className='e-blue'>三文鱼北极贝刺身拼盘</div>
                        <button type='button' className='e-btn-b' onClick={this.handleEat}>尝尝刺身</button>
                        &nbsp;
                        <button type='button' className='e-btn-b' onClick={this.handleEat2}>尝尝小龙虾</button>
                    </Dish>
                }
                <Page 
                    total={this.state.total}
                    current={this.state.current}
                    fetch={this.state.fetch}
                    onUpdateFetch={value => this.setState({fetch:value})}
                    callback={value => this.setState({current:value})}
                />
                <Empty>暂无数据</Empty>
                {this.state.show && <Clothes data={this.state.data} onClose={() => this.setState({show:false})} callback={checked => this.setState({checked:checked, show:false})}/>}
                {
                    this.state.photo
                    &&
                    <Photo 
                        // images={[
                        //     'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=475001989,366276207&fm=26&gp=0.jpg',
                        //     'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1951101960,3872257815&fm=26&gp=0.jpg',
                        //     'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2376860606,2887384089&fm=26&gp=0.jpg',
                        //     'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=984849569,2956369117&fm=26&gp=0.jpg'
                        // ]} 
                        images={arr}
                        keyName='img'
                        onClose={() => this.setState({photo:false})}
                    />
                }
           </Window>
        );
    }
}