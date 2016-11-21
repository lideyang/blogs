/**
 * Created by Lidy on 2016/11/15.
 */
import React from 'react';
import {render} from 'react-dom';
import {HomeHeader, ArticleList} from '../components';

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
        return (
            <HomeHeader data={this.state.ArticleList}/>
        );
    },
    renderArticleList(){
        return (
            <ArticleList data={this.state.ArticleList} />
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
