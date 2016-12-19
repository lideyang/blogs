/**
 * Created by Lidy on 2016/11/23.
 */
import React from 'react'
import {render} from 'react-dom'
import Loading  from '../loading'
import {Host} from '../../../config'

const ArticleInfo = React.createClass({
    getDefaultProps(){
        return {
            // data: false
        }
    },
    render(){
        if (this.props.data) {
            var data = this.props.data;
            return (
                <article id="post-1" className="post-1 post type-post status-publish format-standard hentry category-uncategorized">
                    <header className="entry-header">
                        <div className="cat-list">
                            <a href={'/u/sort/' + data.sort} rel="category tag">{data.sort}</a>
                        </div>
                        <h1 className="entry-title">{data.title}</h1>
                        <div className="entry-meta">
                            <span><i className="iconfont icon-zuozhe"></i> {data.name} <i className="iconfont icon-riqi"></i> { data.time.minute } </span>
                        </div>
                    </header>
                    <div className="entry-content" dangerouslySetInnerHTML={{__html: data.post}}>
                    </div>
                    <span><a className="edit" href={'/edit/' + data._id}>编辑</a></span>
                    <span><a className="edit" href={'/remove/' + data._id}>删除</a></span>
                    <footer className="entry-footer">
                        <div className="com-box">
                            <i className="iconfont icon-comment"></i>{ data.comments.length }条留言
                        </div>
                        <ul className="sharebtn">
                            <li className="weibo">
                                <a href={'http://service.weibo.com/share/share.php?url=' + Host + 'u/' + data._id + '&title=' + data.title} target="_blank">
                                    <i className="iconfont icon-weibo"></i>
                                </a>
                            </li>
                            <li className="qqkongjian">
                                <a href={'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + Host + 'u/' + data._id + '&title=' + data.title} target="_blank">
                                    <i className="iconfont icon-qq"></i>
                                </a>
                            </li>
                        </ul>
                        <div className="clear"></div>
                    </footer>
                    <div id="authorarea">
                        <img alt='头像' src="" className='avatar avatar-100 photo' height='100' width='100'/>
                        <h3>关于 { data.name }</h3>
                        <div className="authorinfo">
                            <a className="author-link" href={'/u/name/' + data.name} rel="author">
                                查看{data.name}的文章
                                <span className="meta-nav">&rarr;</span>
                            </a>
                        </div>
                    </div>
                </article>
            )
        } else {
            return <Loading/>
        }
    }
})
export default ArticleInfo;