/**
 * Created by Lidy on 2016/11/22.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header,Footer} from '../components';
import {Grid, Row, Col} from 'react-bootstrap';
import 'whatwg-fetch';


const Article = React.createClass({
    getInitialState: function () {
        return {
            ArticleInfo: false,
            title: document.title,
            ArticleTitle:''
        };
    },
    renderHeader(){
        return (
            <Header title={this.state.title}>
                <header className="page-header">
                    <h1>{this.state.ArticleTitle}</h1>
                </header>
            </Header>
        );
    },
    renderArticleInfo(){
        if(this.state.ArticleInfo){
            let data=this.state.ArticleInfo;
            let isUser;
            return (
                <div id="content" className="site-content">
                    <Grid>
                        <Row>
                            <Col md={12}>
                                <div id="primary" className="content-area">
                                    <main id="main" className="site-main" role="main">
                                        <article id="post-1"
                                                 className="post-1 post type-post status-publish format-standard hentry category-uncategorized">
                                            <header className="entry-header">
                                                <div className="cat-list">
                                                    <a href="/u/sort/<%=post.sort%>" rel="category tag">{data.sort}</a>
                                                </div>
                                                <h1 className="entry-title">{data.title}</h1>
                                                <div className="entry-meta">
                                                    <span>{data.name} 发表于 { data.time.minute } </span>
                                                </div>
                                            </header>
                                            <div className="entry-content">
                                                {data.post}
                                            </div>
                                            <span><a className="edit" href="/edit/<%= post.name %>/<%= post.time.day %>/<%= post.title %>">编辑</a></span>
                                            <span><a className="edit" href="/remove/<%= post.name %>/<%= post.time.day %>/<%= post.title %>">删除</a></span>
                                            <footer className="entry-footer">
                                                <div className="com-box">
                                                    <i className="fa fa-comment"></i>{ data.comments.length }条留言
                                                </div>
                                                <ul className="sharebtn">
                                                    <li className="weibo">
                                                        <a href="http://service.weibo.com/share/share.php?url=http://<%=host%>/u/<%= post.name %>/<%= post.time.day %>/<%= post.title %>&title=<%= post.title %>"
                                                           target="_blank"><i className="fa fa-weibo"></i></a>
                                                    </li>
                                                    <li className="qqkongjian">
                                                        <a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http://<%=host%>/u/<%= post.name %>/<%= post.time.day %>/<%= post.title %>&title=<%= post.title %>"
                                                           target="_blank"><i className="fa fa-qq"></i></a>
                                                    </li>
                                                </ul>
                                                <div className="clear"></div>
                                            </footer>
                                            <div id="authorarea">
                                                <img alt='头像' src="/assets/dist/images/lidy.png" className='avatar avatar-100 photo' height='100' width='100'/>
                                                <h3>关于 { data.name }</h3>
                                                <div className="authorinfo">
                                                    <a className="author-link" href="/u/<%= post.name %>"
                                                       rel="author">查看{data.name}的文章 <span class="meta-nav">&rarr;</span></a>
                                                </div>
                                            </div>
                                        </article>
                                        {/*留言开始*/}
                                    </main>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
        );
        }else{
               return <div>loading...</div>
        }
    },
    renderFooter(){
        return (
            <Footer/>
        )
    },
    componentDidMount: function () {
        var that = this;
        var url=window.location.pathname;
        var id=url.substring(url.lastIndexOf('/')+1);
        fetch('/api/getArticleInfo?id='+id).then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    console.log(data);
                    that.setState({
                        ArticleInfo: data,
                        ArticleTitle:data.title
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