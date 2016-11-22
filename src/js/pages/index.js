/**
 * Created by Lidy on 2016/11/15.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header,ArticleList} from '../components';
import {Carousel} from 'react-bootstrap';

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
                        { this.state.ArticleList.map(function (post, index) {
                            if (index < 3) {
                                return (
                                    <Carousel.Item key={index}>
                                        <Carousel.Caption>
                                            <h3><a href="/u/">{post.title}</a></h3>
                                            <div>{post.description }</div>
                                            <a className="readmore" href="/u/">
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
    componentDidMount: function () {
        var that = this;
        fetch('/api/getNavInfo').then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    console.log(data);
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
            </div>
        )
    }
});

//生成视图
render(<Home />, document.getElementById('page'));
