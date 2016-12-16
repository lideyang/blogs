/**
 * Created by Lidy on 2016/11/22.
 */
import React from 'react';
import {render} from 'react-dom';
import update from 'react-addons-update';
import {Header, ArticleInfo, Comment} from '../components';
import {Grid, Row, Col} from 'react-bootstrap';
import 'whatwg-fetch';


const Article = React.createClass({
    getInitialState() {
        return {
            articleInfo: false
        };
    },
    onAddComment(newComment){
        var that = this;
        let newCommentStr = '';
        for (let item in newComment) {
            newCommentStr += item + '=' + newComment[item] + '&';
        }
        newCommentStr += 'id=' + this.state.articleInfo._id;
        fetch('/api/postArticleComment', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: newCommentStr
        }).then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    if (data.success) {
                        that.setState({
                            articleInfo: update(that.state.articleInfo, {comments: {$push: [newComment]}})
                        })
                    }
                }
            });
        });
    },
    renderHeader(){
        let articleTitle = this.state.articleInfo ? this.state.articleInfo.title : '';
        return (
            <Header>
                <header className="header-title">
                    <h1>{articleTitle}</h1>
                </header>
            </Header>
        );
    },
    renderArticleInfo(){
        var comments = this.state.articleInfo ? this.state.articleInfo.comments : [];
        return (
            <div id="content" className="site-content">
                <Grid>
                    <Row>
                        <Col md={12}>
                            <div id="" className="article-content content-area">
                                <main id="main" className="site-main" role="main">
                                    {/*文章详情*/}
                                    <ArticleInfo data={this.state.articleInfo}/>
                                    {/*留言开始*/}
                                    <Comment data={comments} onAddComment={this.onAddComment}/>
                                </main>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    },
    componentDidMount: function () {
        var that = this;
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        fetch('/api/getArticleInfo?id=' + id).then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    that.setState({
                        articleInfo: data
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
            </div>
        )
    }
});


render(<Article />, document.getElementById('page'));