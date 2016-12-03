/**
 * Created by Lidy on 2016/12/1.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, Footer, SearchList} from '../components';
const Sort = React.createClass({
    getInitialState() {
        return {
            userInfo: []
        };
    },
    renderHeader(){
        return (
            <Header>
                <header className="page-header">
                    <h1>文章分类</h1>
                </header>
            </Header>
        );
    },
    renderUserArticle(){
        return (
            <SearchList data={this.state.userInfo}/>
        )
    },
    renderFooter(){
        return (
            <Footer/>
        )
    },
    componentDidMount: function () {
        var that = this;
        var url = window.location.pathname;
        var name = url.substring(url.lastIndexOf('/') + 1);
        fetch('/api/getSortArticleList?sort=' + name).then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    that.setState({
                        userInfo: data
                    });
                }
            });
        });
    },
    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderUserArticle()}
                {this.renderFooter()}
            </div>
        )
    }
})
render(<Sort />, document.getElementById('page'));