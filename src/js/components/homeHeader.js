/**
 * Created by Lidy on 2016/11/15.
 */
import React from 'react';
import Header from './header';
import {Carousel} from 'react-bootstrap';
import 'whatwg-fetch';

var props = {
    title: '众筹首页',
    link: '#title-link',
    data: {
        left: [
            {
                link: '#left-link',
                icon: 'shopping-cart'
            }
        ],
        right: [
            {
                link: '#right-link',
                icon: 'search'
            }
        ]
    },
    banner: [
        {
            name: 'dsds',
            time: {
                day: 3
            },
            title: '3231',
            description: '3dasdasd'
        },
        {
            name: 'dsds2',
            time: {
                day: 3
            },
            title: '3231',
            description: '3dasdasd'
        }
    ],
    onSelect: function (nav, e) {
        e.preventDefault();
        console.log('你点击了', nav);
        // do something
    }
};



const HomeHeader = React.createClass({
    getInitialState: function () {
        return {loading: true, error: null, data: null};
    },
    componentDidMount: function () {
        var that=this;
        fetch('/api/getNavInfo').then(function (response) {
            response.json().then(function(data) {
                console.log(data);
                if (that.isMounted()) {
                    that.setState({
                        loading: false,
                        data: data
                    });
                }
            });
        });
    },
    render() {
        console.log(this.state.data);
        console.log(this.state.loading);
        if(this.state.loading){
            return <span>加载中...</span>
        }else{
            return (
                <Header>
                    {/*banner*/}
                    <Carousel className="home-banner" interval={4000000} controls={false}>
                        { this.state.data.map(function (post, index) {
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
                        })}
                    </Carousel>
                </Header>
            );
        }
    }
});

export default HomeHeader;