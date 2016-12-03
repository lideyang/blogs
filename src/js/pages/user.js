/**
 * Created by Lidy on 2016/11/30.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, Footer, SearchList} from '../components';
const User = React.createClass({
    getInitialState() {
        return {
            userInfo: []
        };
    },
    renderHeader(){
        let userName = this.state.userInfo.length ? this.state.userInfo[0].name + '的文章' : '';
        return (
            <Header>
                <header className="page-header">
                    <h1>{userName}</h1>
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
        fetch('/api/getUserArticleList?name=' + name).then(function (response) {
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
render(<User />, document.getElementById('page'));