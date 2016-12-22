/**
 * Created by Lidy on 2016/11/21.
 */
import React, {PropTypes, Component} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import PaginationAdvanced from '../pagination'
import Loading from '../loading'
import {Host} from '../../../config'

export default class ArticleList extends Component {

    constructor(props) {
        super(props);
        this.onChangePage = this.onChangePage.bind(this);
    }

    static defaultProps = {
        data: []
    }

    onChangePage(index) {
        this.props.onChangePage(index);
    }

    render() {
        if (this.props.data.length) {
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
                                                                <a href={'/u/sort/' + item.sort}>{item.sort}</a>
                                                            </div>
                                                            <h2 className="entry-title">
                                                                <a href={'/u/' + item._id}>{item.title}</a>
                                                            </h2>
                                                            <div className="entry-meta">
                                                                <span><i
                                                                    className="iconfont icon-zuozhe"></i>{item.name}<i
                                                                    className="iconfont icon-riqi"></i>{item.time.minute}</span>
                                                            </div>
                                                        </header>
                                                        <div className="entry-content">
                                                            {item.description}
                                                        </div>
                                                        <footer className="entry-footer clearfix">
                                                            <a href={'/u/' + item._id} className="read-more">
                                                                <i className="iconfont icon-read"></i>阅读详情</a>
                                                            <ul className="sharebtn">
                                                                <li className="weibo">
                                                                    <a href={'http://service.weibo.com/share/share.php?url=' + Host + 'u/' + item._id + '&title=' + item.title}
                                                                       target="_blank">
                                                                        <i className="iconfont icon-weibo"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="qqkongjian">
                                                                    <a href={'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + Host + 'u/' + item._id + '&title=' + item.title}
                                                                       target="_blank">
                                                                        <i className="iconfont icon-qq"></i>
                                                                    </a>
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
                    <PaginationAdvanced items={this.props.total} onChangePage={this.onChangePage}/>
                </div>
            );
        } else {
            return (
                <Loading/>
            )
        }

    }
}