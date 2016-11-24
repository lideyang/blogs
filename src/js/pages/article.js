/**
 * Created by Lidy on 2016/11/22.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, Footer, ArticleInfo, Comment} from '../components';
import {Grid, Row, Col} from 'react-bootstrap';
import 'whatwg-fetch';


const Article = React.createClass({
    getInitialState() {
        return {
            articleInfo: false,
            title: document.title,
            articleTitle: '',
            comments: [],
            articleId: ''
        };
    },
    onAddComment(newComment){
        fetch('/api/getArticleInfo?id=' + this.state.articleId).then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    console.log(data);
                    that.setState({
                        articleInfo: data,
                        articleTitle: data.title,
                        comments: data.comments,
                        articleId: data._id
                    });
                }
            });
        });
        let newComments = this.state.comments.concat(newComment);
        this.setState({
            comments: newComments
        })
    },
    renderHeader(){
        return (
            <Header title={this.state.title}>
                <header className="page-header">
                    <h1>{this.state.articleTitle}</h1>
                </header>
            </Header>
        );
    },
    renderArticleInfo(){
        return (
            <div id="content" className="site-content">
                <Grid>
                    <Row>
                        <Col md={12}>
                            <div id="primary" className="content-area">
                                <main id="main" className="site-main" role="main">
                                    {/*文章详情*/}
                                    <ArticleInfo data={this.state.articleInfo}/>
                                    {/*留言开始*/}
                                    <Comment data={this.state.comments} articleId={this.state.articleId} onAddComment={this.onAddComment}/>
                                </main>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    },
    renderFooter(){
        return (
            <Footer/>
        )
    },
    componentDidMount: function () {
        var that = this;
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        fetch('/api/getArticleInfo?id=' + id).then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    console.log(data);
                    that.setState({
                        articleInfo: data,
                        articleTitle: data.title,
                        comments: data.comments,
                        articleId: data._id
                    });
                }
            });
        });
    },
    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderArticleInfo()}
                {this.renderFooter()}
            </div>
        )
    }
});


render(<Article />, document.getElementById('page'));