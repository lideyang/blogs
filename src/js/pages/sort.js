/**
 * Created by Lidy on 2016/12/1.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, SearchList} from '../components';
const Sort = React.createClass({
    getInitialState() {
        return {
            list: []
        };
    },
    renderHeader(){
        return (
            <Header>
                <header className="header-title">
                    <h1>文章分类</h1>
                </header>
            </Header>
        );
    },
    renderUserArticle(){
        return (
            <SearchList data={this.state.list}/>
        )
    },
    componentDidMount: function () {
        let that = this;
        let url = window.location.pathname;
        let index = url.lastIndexOf('sort/');
        if(index){
            let sort = url.substring(index + 5);
            fetch('/api/getSortArticleList?sort=' + sort).then(function (response) {
                response.json().then(function (data) {
                    if (that.isMounted()) {
                        that.setState({
                            list: data
                        });
                    }
                });
            });
        }
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
render(<Sort />, document.getElementById('page'));