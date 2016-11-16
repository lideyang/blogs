/**
 * Created by Lidy on 2016/11/15.
 */
import React from 'react';
import {
    Header,
} from '../common';
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
    banner:[
        {
            name:'dsds',
            time:{
                day:3
            },
            title:'3231',
            description:'3dasdasd'
        }
    ],
    onSelect: function (nav, e) {
        e.preventDefault();
        console.log('你点击了', nav);
        // do something
    }
};

const HomeHeader = React.createClass({
    render() {
        return (
            <Header>
                {/*banner*/}
                <div class="featured-posts" style="display: none;">
                    { props.banner.map(function (post, index) {
                        return (
                            <div class="featpost" key={index}>
                                <h3>
                                    <a href="/u/<%= post.name %>/<%= post.time.day %>/<%= post.title %>">{post.title}</a>
                                </h3>
                                <div class="">
                                    {post.description }
                                </div>
                                <a class="readmore" href="/u/<%= post.name %>/<%= post.time.day %>/<%= post.title %>">
                                    Read More
                                </a>
                            </div>
                        );
                    })}
                </div>
            </Header>
        );
    }
});

export default HomeHeader;