/**
 * Created by Lidy on 2016/12/2.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, Footer, Ueditor} from '../components';
import {Form, FormGroup, FormControl, ControlLabel, Grid, Col, Button} from 'react-bootstrap';

const Edit = React.createClass({
    getInitialState() {
        return {
            data: {
                name: '',
                tags: '',
                sort: 0,
                post: ''
            },
            sort: ['心情', '学习', '技术']
        };
    },
    renderHeader(){
        return (
            <Header>
                <header className="page-header">
                    <h1>编辑文章</h1>
                </header>
            </Header>
        );
    },
    renderContent(){
        var that = this;
        return (
            <Grid>
                <Form horizontal onSubmit={this.submitHandle}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            标题
                        </Col>
                        <Col sm={10}>
                            <FormControl value={this.state.data.name} placeholder="文章标题"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            标签
                        </Col>
                        <Col sm={10}>
                            <FormControl value={this.state.data.tags} placeholder="文章标签"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            分类
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="select" placeholder="分类" value={that.state.data.sort}>
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
                            <Ueditor content={this.state.data.post}/>
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
    },
    renderFooter(){
        return (
            <Footer/>
        )
    },
    getUeMethod:function(){

    },
    submitHandle(e){
        e.preventDefault();

    },
    componentDidMount: function () {
        var that = this;
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        fetch('/api/getArchiveContent?id=' + id).then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    that.setState({
                        data: data
                    });
                }
            });
        });
    },
    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderContent()}
                {this.renderFooter()}
            </div>
        )
    }
})
render(<Edit />, document.getElementById('page'));