/**
 * Created by Lidy on 2016/11/15.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, ArticleList, Footer} from '../components';
import {Carousel} from 'react-bootstrap';
import 'whatwg-fetch';

// style
import '../../css/owl-carousel/owl.carousel.css';
import '../../css/owl-carousel/owl.theme.css';
const Home = React.createClass({
    getInitialState: function () {
        return {
            ArticleList: false,
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
            <ArticleList data={this.state.ArticleList}/>
        )
    },
    renderFooter(){
        return (
            <Footer/>
        )
    },
    componentDidMount: function () {
        var that = this;
        fetch('/api/getNavInfo').then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    that.setState({
                        ArticleList: data
                    });
                }
            });
        });
    },
    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderArticleList()}
                {this.renderFooter()}
            </div>
        )
    }
});

//生成视图
render(<Home />, document.getElementById('page'));
