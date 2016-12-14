/**
 * Created by Lidy on 2016/12/13.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, SearchList} from '../components';
const Search = React.createClass({
    getInitialState() {
        return {
            list: [],
            loading: true
        };
    },
    renderHeader(){
        return (
            <Header>
                <header className="header-title">
                    <h1>搜索结果</h1>
                </header>
            </Header>
        );
    },
    renderSearchList(){
        return (
            <SearchList data={this.state.list} loading={this.state.loading}/>
        )
    },
    componentDidMount: function () {
        let that = this;
        let url = window.location.pathname;
        let index = url.lastIndexOf('search/');
        if (index) {
            let keyword = url.substring(index + 7);
            fetch('/api/search?keyword=' + keyword).then(function (response) {
                response.json().then(function (data) {
                    if (that.isMounted()) {
                        if (data.success) {
                            that.setState({
                                list: data.data,
                                loading: false
                            });
                        }
                    }
                });
            });
        }
    },
    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderSearchList()}
            </div>
        )
    }
})
render(<Search />, document.getElementById('page'));