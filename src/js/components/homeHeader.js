/**
 * Created by Lidy on 2016/11/15.
 */
import React from 'react';
import Header from './header';
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
        },
        {
            name:'dsds2',
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
                <div className="featured-posts" style={{display:'none'}}>
                    { props.banner.map(function (post, index) {
                        return (
                            <div className="featpost" key={index}>
                                <h3>
                                    <a href="/u/">{post.title}</a>
                                </h3>
                                <div className="">
                                    {post.description }
                                </div>
                                <a className="readmore" href="/u/">
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