/**
 * Created by Lidy on 2016/12/1.
 */
import React from 'react';
import {render} from 'react-dom';
import {Grid} from 'react-bootstrap';
const SearchList = React.createClass({
    getDefaultProps(){
        return {
            data: []
        }
    },
    render(){
        return (
            <Grid>
                {this.props.data.map(function (item, index) {
                    let reprintInfo = item.reprint_info.reprint_from ? '<br><a href="#">原文链接</a>' : '';
                    return (
                        <div key={index}>
                            <h2>
                                <a href={'/u/' + item._id}>{item.title}</a>
                            </h2>
                            <p className="info">
                                作者：<a href={'/u/' + item.name}>{item.name}</a>
                                日期：{ item.time.minute } |
                                标签：
                                {item.tags.map(function (tag, index) {
                                    if (tag) {
                                        return (
                                            <a key={index} className="tag" href={'/tags/' + tag}>{tag} </a>
                                        )
                                    }
                                })}
                                {reprintInfo}
                            </p>
                            <p>{item.description}</p>
                            <p className="info">
                                阅读：{item.pv}
                                评论：{item.comments.length} |
                            </p>
                        </div>
                    )
                })}
            </Grid>
        )
    }
});

export default SearchList;