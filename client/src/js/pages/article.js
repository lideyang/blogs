/**
 * Created by Lidy on 2016/11/22.
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import update from 'react-addons-update'
import {Header, ArticleInfo, Comment} from '../components'
import {Grid, Row, Col} from 'react-bootstrap'

export default class Article extends Component {

    constructor(props) {
        super(props);
        this.state = this.props;
        this.onAddComment = this.onAddComment.bind(this);
    }

    static defaultProps = {
        autoPlay: false,
        maxLoops: 10,
    }

    onAddComment(newComment) {
        // var that = this;
        // let newCommentStr = '';
        // for (let item in newComment) {
        //     newCommentStr += item + '=' + newComment[item] + '&';
        // }
        // newCommentStr += 'id=' + this.state.articleInfo._id;
        // fetch('/api/postArticleComment', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     body: newCommentStr
        // }).then(function (response) {
        //     response.json().then(function (data) {
        //         if (that.isMounted()) {
        //             if (data.success) {
        //                 that.setState({
        //                     articleInfo: update(that.state.articleInfo, {comments: {$push: [newComment]}})
        //                 })
        //             }
        //         }
        //     });
        // });
    }

    render() {
        console.log(this.state);
        const {articleTitle} = this.state.articleDetail.title;
        const {comments}=this.state.articleDetail.comments;
        return (
            <div>
                <Header>
                    <header className="header-title">
                        <h1>{articleTitle}</h1>
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
                                        <Comment data={comments} onAddComment={this.onAddComment}/>
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
        React.createElement(Article, initialState),
        document.getElementById('root')
    );
}