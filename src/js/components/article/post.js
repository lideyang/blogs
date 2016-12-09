/**
 * Created by Lidy on 2016/12/9.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, Footer, Ueditor} from '../../components';
import {Form, FormGroup, FormControl, ControlLabel, Grid, Col, Button} from 'react-bootstrap';

const Post = React.createClass({
    getInitialState() {
        return {
            sort: ['心情', '学习', '技术']
        };
    },
    getDefaultProps(){
        return {
            data: {
                title: '',
                tags: '',
                post: '',
                sort: '',
                description: ''
            }
        }
    },
    submitHandle(e){
        e.preventDefault();
        var contentTxt = this.refs.editor.state.editorDOM.getContentTxt();
        var description = contentTxt.length > 100 ? contentTxt.substring(0, 200) : contentTxt; //设置前100字符简介
        if (!contentTxt) {
            //气泡提示
            return;
        }
        let formParams = {
            title: this.refs.title.value,
            tags: this.refs.tags.value.split(','),
            post: contentTxt,
            sort: this.refs.sort.value,
            description: description
        }
        this.props.onSubmit(formParams);
    },
    render() {
        var that = this;
        return (
            <Grid>
                <Form horizontal onSubmit={this.submitHandle}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            标题
                        </Col>
                        <Col sm={10}>
                            <FormControl ref="title" value={this.props.data.title} placeholder="文章标题"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            标签
                        </Col>
                        <Col sm={10}>
                            <FormControl ref="tags" value={this.props.data.tags} placeholder="文章标签"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            分类
                        </Col>
                        <Col sm={10}>
                            <FormControl ref="sort" componentClass="select" placeholder="分类" value={that.props.data.sort}>
                                {this.state.sort.map(function (item, index) {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </FormControl>
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
})
export default Post;