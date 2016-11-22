/**
 * Created by Lidy on 2016/11/21.
 */
import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

const ArticleList = React.createClass({
    getInitialState: function () {
        return {};
    },
    render() {
        if (this.props.data) {
            return (
                // 首页列表
                <div id="content" className="site-content">
                    <div className="container">
                        <Grid>
                            <Row>
                                <Col md={12}>
                                    <div className="content-area" id="primary">
                                        <main>
                                            {this.props.data.map(function (item, index) {
                                                return (
                                                    <article id={"post" + index} key={index}
                                                             className="dynpost animated post-5 post type-post status-publish format-standard hentry category-uncategorized">
                                                        <header className="entry-header">
                                                            <div className="cat-list">
                                                                <a href={'/u/' + item.name + '/' + item._id}>{item.sort}</a>
                                                            </div>
                                                            <h2 className="entry-title">
                                                                <a href={'/u/' + item.name + '/' + item._id}>{item.title}</a>
                                                            </h2>
                                                            <div className="entry-meta">
                                                                <span>{item.name} 发表于 {item.time.minute}</span>
                                                            </div>
                                                        </header>
                                                        <div className="entry-content">
                                                            {item.description}
                                                        </div>
                                                        <footer className="entry-footer clearfix">
                                                            <a href={'/u/' + item.name + '/' + item._id} className="read-more">
                                                                <i className="fa fa-plus"></i>阅读详情</a>
                                                            <ul className="sharebtn">
                                                                <li className="weibo">
                                                                    <a href="http://service.weibo.com/share/share.php?url=http://<%= host %>/u/<%= post.name %>/<%= post.time.day %>/<%= post.title %>&title=<%= post.title %>"
                                                                       target="_blank"><i
                                                                        className="fa fa-weibo"></i></a>
                                                                </li>
                                                                <li className="qqkongjian">
                                                                    <a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http://<%= host %>/u/<%= post.name %>/<%= post.time.day %>/<%= post.title %>&title=<%= post.title %>"
                                                                       target="_blank"><i className="fa fa-qq"></i></a>
                                                                </li>
                                                            </ul>
                                                        </footer>
                                                    </article>
                                                )
                                            })}
                                        </main>
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    loading...
                </div>
            )
        }

    }
});
export default ArticleList;