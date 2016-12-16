/**
 * Created by Lidy on 2016/11/30.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, SearchList} from '../components';
const User = React.createClass({
    getInitialState() {
        return {
            list: [],
            total: 0
        };
    },
    renderHeader(){
        let userName = this.state.list.length ? this.state.list[0].name + '的文章' : '';
        return (
            <Header>
                <header className="header-title">
                    <h1>{userName}</h1>
                </header>
            </Header>
        );
    },
    renderUserArticle(){
        return (
            <SearchList data={this.state.list} total={this.state.total} onChangePage={this.onChangePage}/>
        )
    },
    getArticleList(pageIndex){
        var that = this;
        var url = window.location.pathname;
        var name = url.substring(url.lastIndexOf('/') + 1);
        fetch('/api/getUserArticleList?name=' + name + '&p=' + pageIndex).then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    that.setState({
                        list: data.data,
                        total: data.total
                    });
                }
            });
        });
    },
    onChangePage(index){
        this.getArticleList(index);
    },
    componentDidMount: function () {
        this.getArticleList(1);
    },
    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderUserArticle()}
            </div>
        )
    }
})
render(<User />, document.getElementById('page'));