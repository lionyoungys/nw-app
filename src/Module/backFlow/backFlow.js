import React from 'react';
import Window from '../../UI/Window';
import OptionBox from '../../Elem/OptionBox';
import ImageLightbox from '../../Elem/ImageLightbox';   //新增
import Empty from '../../Elem/Empty';
import './backFlow.css';
// import { stat } from 'fs';
const token = 'token'.getData();

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            data: [],
            checked: [],
            all: false,
            loading: null,
            lightboxShow: false,//图片展示
            index: null
        };
        this.onSearch = this.onSearch.bind(this);
        this.handleAllChecked = this.handleAllChecked.bind(this);
        this.handleAgree = this.handleAgree.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleRefuse = this.handleRefuse.bind(this);
        this.query = this.query.bind(this);
        this.lightboxClick = this.lightboxClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onKeyPress(e) {
        13 == (e.keyCode || e.which) && this.onSearch();
    }

    componentDidMount() {
        this.input.focus();
        this.query();
    }

    query() {
        let done;
        tool.ui.loading(handle => done = handle);
        api.post('backFlowList', {
            token: 'token'.getData(),
        }, (res, ver) => {
            if (ver && res) {
                console.log(res);
                done();
                this.setState({
                    data: res.result,
                    value: '',
                    show: false,
                });
            }
        }, () => done());
    }
    //搜索查询
    onSearch() {
        let index = this.state.value.inObjArray(this.state.data, 'clothing_number');
        if (-1 != index) {
            if (this.state.data[index].state == true) return;
            let index2 = this.state.data[index].id.inArray(this.state.checked);
            this.input.focus()
            if (-1 === index2) {
                this.state.checked.push(this.state.data[index].id);
                this.setState({ checked: this.state.checked });
                this.input.focus()
            }
        } else {
            api.post('backFlowList', {
                token: 'token'.getData(),
                clothing_number: this.state.value
            }, (res, ver) => {
                if (ver && res) {
                    console.log(ver)                                                             
                    let index = this.state.value.inObjArray(this.state.data, 'clothing_number');
                    if (index == -1) {
                        this.query();
                        this.input.focus();
                    }
                }
            })
        }
        this.setState({ value: '' });
    }
    //全选
    handleAllChecked(value, checked) {
        if (checked) {
            this.setState({ checked: [], all: false });
        } else {
            let data = this.state.data,
                len = data.length,
                checked = [];
            for (let i = 0; i < len; ++i) {
                if (data[i].state == false) checked.push(data[i].id);
            }
            this.setState({ checked: checked, all: true });
        }
    }
    //单选
    handleChecked(value, checked) {
        if (checked) {
            let index = value.inArray(this.state.checked);
            if (-1 !== index) {
                this.state.checked.splice(index, 1);
                this.setState({ checked: this.state.checked, all: false });
            }
        } else {
            this.state.checked.push(value);
            this.setState({ checked: this.state.checked });
        }
    }
    // 已同意
    handleAgree(e) {
        //item_cleaned
        let id = e.target.dataset.id;
        let index = e.target.dataset.index;
        if (this.state.checked.length < 1 && id == '') return;
        let pram = {
            wid: id ? id : JSON.stringify(this.state.checked),
            status: 1,
            token: 'token'.getData(),
        }
        console.log(pram);
        api.post('returnBack', pram , (res, ver) => {
            // console.log(res)
            if (ver && res) {
                tool.ui.success({
                    callback: (close, event) => {
                        close();
                        if (id =='') {
                            this.setState({ checked: [], all: false });
                            this.query();
                        }else{
                            //删除单一个
                            let sel_index = id.inArray(this.state.checked);
                            if (- 1 !== sel_index){
                                this.setState({ checked: checked.splice(sel_index, 1)});
                            }
                            this.state.data[index].state = true;
                            this.setState({ data: this.state.data });
                        }
                    }
                });
            } else {
                tool.ui.error({
                    title: '错误提示', msg: res.msg, button: '确定', callback: (close, event) => {
                        close();
                    }
                });
            }
        });
    }

    handleRefuse(e) {    //拒绝 
        let id = e.target.dataset.id;
        let index = e.target.dataset.index;    
        if (this.state.checked.length < 1 && id == '') return;
        let pram = {
            wid: id ? id : this.state.checked.toString(),
            status : 2,
            token: 'token'.getData(),
        }
        console.log(pram);
        api.post('returnBack', pram, (res, ver) => {
            if (ver && res) {
                if (id == '') {
                    this.setState({ checked: [], all: false });
                    this.query();
                } else {
                    //删除单一个
                    let sel_index = id.inArray(this.state.checked);
                    if (- 1 !== sel_index) {
                        this.setState({ checked: checked.splice(sel_index, 1) });
                    }
                    this.state.data[index].state = true;
                    this.setState({ data: this.state.data });
                }
            }else{
                alert(res.msg);
            }
        });
    }
    lightboxClick(e) {

        this.setState({ lightboxShow: true, index: e.target.dataset.index });
    }
    render() {
        let html = this.state.data.map((obj, index) =>
            <tr key={obj.id} className={!(obj.state == false) ? null : 'disabled'}>
                <td>
                    {
                        (obj.state == false)
                            ?
                            <OptionBox
                                type='checkbox'
                                checked={-1 !== obj.id.inArray(this.state.checked)}
                                value={obj.id}
                                onClick={this.handleChecked}
                            >{obj.clothing_number}</OptionBox>
                            :
                            obj.clothing_number
                    }
                </td>
                <td>{obj.clothing_name}</td>
                <td>{obj.clothing_color}</td>
                <td>{obj.remark}</td>
                <td>{obj.sign}</td>
                <td>
                    <span className='e-orange e-pointer' data-index={index} onClick={this.lightboxClick}>{obj.img.length}张</span>
                </td>
                <td>
                    <a style={{ display: obj.state ? 'none' :'inline-block'}} data-index={index} data-id={obj.id} onClick={this.handleRefuse}>打回</a>
                    &emsp;
                    <b style={{ display: obj.state ? 'none' : 'inline-block' }} className='photo-btn back-flow-agreBtn' disabled={obj.state} data-index={index} data-id={obj.id} onClick={this.handleAgree}>同意</b>
                </td>
            </tr>
        );
        return (
            <Window title='返流' onClose={this.props.closeView}>
                <div className='right1 topdiv'>
                    <button className="e-btn hangon-btn" onClick={this.onSearch}>查询</button>
                    <input type="text" className='e-input' value={this.state.value} onChange={e => this.setState({ value: e.target.value })} autoFocus={true} placeholder='请输入或扫描衣物编码' ref={input => this.input = input} onKeyPress={this.onKeyPress} />
                </div>
                <div className='clean'>
                    <div className='e-box'>
                        <table className='e-table border'>
                            <thead>
                                <tr><th>衣物编码</th><th>名称</th><th>返流原因</th><th>返流类型</th><th>返流步骤</th><th>照片</th><th>操作</th></tr>
                            </thead>
                            <tbody>{html}</tbody>
                            <Empty show={this.state.data.length < 1} />
                        </table>
                    </div>

                    <ImageLightbox
                        show={this.state.lightboxShow}
                        images={
                            null !== this.state.index && tool.isSet(this.state.data[this.state.index].image)
                                ?
                                this.state.data[this.state.index].image : []
                        }
                        onClose={() => this.setState({ lightboxShow: false })}
                    />
                    <div className='clean-top'>
                        <div className='left back-flow-left'>
                            <OptionBox type='checkbox' checked={this.state.all} onClick={this.handleAllChecked}>
                            全选 &emsp;&emsp;
                            已选择<b className='e-orange'>&nbsp;{this.state.checked.length}&nbsp;</b>件,
                                &nbsp;
                            共<b className='e-orange'>&nbsp;{this.state.data.length}&nbsp;</b>件
                            </OptionBox>
                            <button type='button' className='e-btn confirm btn-both' onClick={this.handleAgree}>全部同意</button>
                            &emsp;
                            <button type='button' className='e-btn confirm' onClick={this.handleRefuse}>全部打回</button>
                        </div>
                    </div>
                </div>
            </Window>
        );
    }
}