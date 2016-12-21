/**
 * Created by Lidy on 2016/12/1.
 */
import React from 'react';
import {render} from 'react-dom';
import {Grid} from 'react-bootstrap';
import {TagList, PaginationAdvanced} from '../../components';
import Loading  from '../loading'
const SearchList = React.createClass({
    getDefaultProps(){
        return {
            data: [],
            loading: false
        }
    },
    onChangePage(index){
        this.props.onChangePage(index);
    },
    render(){
        if (this.props.loading) {
            return (
                <Loading/>
            )
        }
        var data = this.props.data;

        if (data.length) {
            return (
                <Grid>
                    <div className="page-header">
                        <h1>查询结果：
                            <small>{data.length}条数据</small>
                        </h1>
                    </div>
                    {this.props.data.map(function (item, index) {
                        let reprintInfo = item.reprint_info.reprint_from ? '<br><a href="#">原文链接</a>' : '';
                        return (
                            <div className="search-list-item" key={index}>
                                <h2>
                                    <a href={'/u/' + item._id}>{item.title}</a>
                                </h2>
                                <div className="info">
                                    <i className="iconfont icon-zuozhe">{/*作者*/}</i><a href={'/u/name/' + item.name}>{item.name}</a>
                                    <i className="iconfont icon-riqi">{/*日期*/}</i>{ item.time.minute }
                                    <i className="iconfont icon-tags">{/*标签*/}</i>
                                    <TagList data={item.tags}/>
                                    {reprintInfo}
                                </div>
                                <p>{item.description}</p>
                                <p className="info">
                                    阅读：{item.pv} |
                                    评论：{item.comments.length}
                                </p>
                            </div>
                        )
                    })}
                    <PaginationAdvanced items={this.props.total} onChangePage={this.onChangePage}/>
                </Grid>
            )
        } else {
            return (
                <div className="height-full">暂无数据</div>
            )
        }
    }
});

export default SearchList;