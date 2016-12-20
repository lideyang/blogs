/**
 * Created by Lidy on 2016/11/22.
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import update from 'react-addons-update'
import {Header, ArticleInfo, Comment} from '../components'
import Action from '../../api'
import {Grid, Row, Col} from 'react-bootstrap'

export default class ArticleDetail extends Component {

    constructor(props) {
        super(props);
        this.state = this.props;
        this.onAddComment = this.onAddComment.bind(this);
    }

    static defaultProps = {}

    onAddComment(newComment) {
        var that = this;
        newComment.id = this.state.articleDetail._id;
        Action.CommentAdd(newComment).then(
            data=> {
                that.setState({
                    articleDetail: update(that.state.articleDetail, {comments: {$push: [newComment]}})
                })
            }
        )
    }

    render() {
        return (
            <div>
                <Header>
                    <header className="header-title">
                        <h1>{this.state.articleDetail.title}</h1>
                    </header>
                </Header>
                <div id="content" className="site-content">
                    <Grid>
                        <Row>
                            <Col md={12}>
                                <div id="" className="article-content content-area">
                                    <main id="main" className="site-main" role="main">
                                        {/*文章详情*/}
                                        <ArticleInfo data={this.state.articleDetail}/>
                                        {/*留言开始*/}
                                        <Comment data={this.state.articleDetail.comments} onAddComment={this.onAddComment}/>
                                    </main>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        )
    }
}

if (__DEVCLIENT__) {
    ReactDOM.render(
        React.createElement(ArticleDetail, initialState),
        document.getElementById('root')
    );
}