/**
 * Created by Lidy on 2016/11/23.
 */
import React from 'react';
import {render} from 'react-dom';
import {Grid, Row, Col} from 'react-bootstrap';
import CommentList from './commentList'
const Comment = React.createClass({
    getDefaultProps(){
        return {
            data: [],
            articleId: ''
        }
    },
    submitHandle(e){
        e.preventDefault();
        console.log(this.refs.content.value + 'dd');
        if (!this.refs.content.value) return;
        let newComment = {
            content: this.refs.content.value,
            name: this.refs.nickName.value||'游客',
            email: this.refs.email.value,
            url: this.refs.url.value
        }
        this.refs.addCommentForm.reset();
        this.props.onAddComment(newComment);
    },
    render(){
        let data = this.props.data;
        return (
            <div id="comments" className="comments-area">
                <h2 className="comments-title">
                    文章留言
                </h2>
                {/*留言列表*/}
                <CommentList data={data}/>
                <div id="respond" className="comment-respond">
                    <h3 id="reply-title" className="comment-reply-title">
                        <div className="crunchify-text">请发表您的留言</div>
                        {/*<small>*/}
                        {/*<!--<a rel="nofollow" id="cancel-comment-reply-link"-->*/}
                        {/*<!--href="/index.php/2016/09/11/hello-world/#respond"-->*/}
                        {/*<!--style="display:none;">取消回复</a>-->*/}
                        {/*</small>*/}
                    </h3>
                    <form method="post" ref="addCommentForm" className="comment-form" onSubmit={this.submitHandle}>
                        <p className="comment-notes">
                            {/*<!--<span id="email-notes">电子邮件地址不会被公开。</span> 必填项已用-->*/}
                            {/*<!--<span class="required">*</span>标注-->*/}
                        </p>
                        <p className="comment-form-comment">
                            <textarea ref="content" name="content" placeholder="留言。。" cols="45" rows="8" aria-required="true">
                            </textarea>
                        </p>
                        <Row>
                            <Col md={4}>
                                <p className="comment-form-author">
                                    <input ref="nickName" placeholder="昵称" name="name" type="text" size="30"/>
                                </p>
                            </Col>
                            <Col md={4}>
                                <p className="comment-form-email">
                                    <input ref="email" placeholder="email@domain.com" name="email" type="text" size="30"/>
                                </p>
                            </Col>
                            <Col md={4}>
                                <p className="comment-form-url">
                                    <input ref="url" name="website" type="text" placeholder="网址" size="30"/>
                                </p>
                            </Col>
                        </Row>
                        <p className="form-submit">
                            <input name="submit" type="submit" className="submit" value="发表评论"/>
                            <input type='hidden' name='comment_post_ID' value={this.props.articleId}/>
                            <input type='hidden' name='comment_parent' value='0'/>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
});
export default Comment;