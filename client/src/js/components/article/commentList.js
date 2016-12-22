/**
 * Created by Lidy on 2016/11/23.
 */
import React, {PropTypes, Component} from 'react'
import {render} from 'react-dom'
import headerPng from '../../../../public/images/header.png'

export default class CommentList extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        data: []
    }

    render() {
        if (this.props.data.length) {
            return (
                <ol className="comment-list">
                    {this.props.data.map(function (item, index) {
                        return (
                            <li id={'comment-' + index} className="comment even thread-even depth-1" key={index}>
                                <article id={'div-comment--' + index} className="comment-body">
                                    <footer className="comment-meta">
                                        <div className="comment-author vcard">
                                            <img alt='头像' src={headerPng} className="avatar avatar-80 photo avatar-default" height="80" width="80"/>
                                            <b className="fn">
                                                <a href={'/u/name/' + item.name} rel='external nofollow' className='url'>
                                                    {item.name}
                                                </a>
                                            </b>
                                            <span className="says">说道：</span>
                                        </div>
                                        <div data-className="comment-metadata">
                                            <a href={'#comment-' + index}>
                                                <time data-datetime={item.time}>
                                                    {item.time}
                                                </time>
                                            </a>
                                        </div>
                                    </footer>
                                    <div className="comment-content">
                                        {item.content}
                                    </div>
                                </article>
                            </li>
                        )
                    })}
                </ol>
            )
        }
        return <p>暂无评论</p>
    }
}