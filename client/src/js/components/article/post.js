/**
 * Created by Lidy on 2016/12/9.
 */
import React, {PropTypes, Component} from 'react'
import {Loading, Ueditor} from '../../components';
import {Form, FormGroup, ControlLabel, Grid, Col, Button} from 'react-bootstrap';

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: ['心情', '学习', '技术']
        }
        this.submitHandle = this.submitHandle.bind(this);
    }

    static defaultProps = {
        loading: false,
        data: {
            title: '',
            tags: '',
            post: '',
            sort: '',
            description: ''
        }
    }

    submitHandle(e) {
        e.preventDefault();
        var contentHTML = this.refs.editor.state.editorDOM.getContent();
        var contentTxt = this.refs.editor.state.editorDOM.getContentTxt();
        var description = contentTxt.length > 100 ? contentTxt.substring(0, 200) : contentTxt; //设置前100字符简介
        if (!contentTxt) {
            //气泡提示
            return;
        }
        let formParams = {
            title: this.refs.title.value,
            tags: this.refs.tags.value.split(','),
            post: contentHTML,
            sort: this.refs.sort.value,
            description: description
        }
        this.props.onSubmit(formParams);
    }

    render() {
        var that = this;
        if (this.props.loading) {
            return <Loading/>
        }
        return (
            <Grid>
                <Form horizontal onSubmit={this.submitHandle}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            标题
                        </Col>
                        <Col sm={10}>
                            <input className="form-control" ref="title" defaultValue={this.props.data.title} placeholder="文章标题"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            标签
                        </Col>
                        <Col sm={10}>
                            <input className="form-control" ref="tags" defaultValue={this.props.data.tags} placeholder="文章标签"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            分类
                        </Col>
                        <Col sm={10}>
                            <select className="form-control" ref="sort" placeholder="分类" defaultValue={that.props.data.sort}>
                                {this.state.sort.map(function (item, index) {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            正文
                        </Col>
                        <Col sm={10}>
                            <Ueditor ref="editor" content={this.props.data.post}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">
                                发表
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Grid>
        )
    }
}