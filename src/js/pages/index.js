/**
 * Created by Lidy on 2016/11/15.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, ArticleList, Footer} from '../components';
import {Carousel} from 'react-bootstrap';
import 'whatwg-fetch';
import '../../less/pages/home.less';
const Home = React.createClass({
    getInitialState: function () {
        return {
            ArticleList: false,
            total: 0,
            menuBarClass: 'stmenu-bar'
        };
    },
    renderHeader(){
        if (this.state.ArticleList) {
            return (
                <Header>
                    {/*banner*/}
                    <Carousel className="home-banner" interval={4000000} controls={false}>
                        { this.state.ArticleList.map(function (item, index) {
                            if (index < 3) {
                                return (
                                    <Carousel.Item key={index}>
                                        <Carousel.Caption>
                                            <h3><a href={'/u/' + item._id}>{item.title}</a></h3>
                                            <div>{item.description }</div>
                                            <a className="readmore" href={'/u/' + item._id}>
                                                Read More
                                            </a>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                );
                            }
                        })}
                    </Carousel>
                </Header>
            );
        } else {
            return <span>加载中...</span>
        }
    },
    renderArticleList(){
        return (
            <ArticleList data={this.state.ArticleList} total={this.state.total} onChangePage={this.onChangePage}/>
        )
    },
    getArticleList(pageIndex){
        var that = this;
        fetch('/api/getNavInfo?p=' + pageIndex).then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    that.setState({
                        ArticleList: data.data,
                        total: data.total
                    });
                }
            });
        });
    },
    onChangePage(index){
        this.getArticleList(index);
    },
    componentDidMount() {
        this.getArticleList(1);
    },
    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderArticleList()}
            </div>
        )
    }
});

//生成视图
render(<Home />, document.getElementById('page'));
