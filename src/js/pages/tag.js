/**
 * Created by Lidy on 2016/12/13.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, SearchList} from '../components';
const Tag = React.createClass({
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
                    <h1>标签</h1>
                </header>
            </Header>
        );
    },
    renderTagList(){
        return (
            <SearchList data={this.state.list} loading={this.state.loading}/>
        )
    },
    componentDidMount: function () {
        let that = this;
        let url = window.location.pathname;
        let index = url.lastIndexOf('tag/');
        if (index) {
            let tag = url.substring(index + 4);
            fetch('/api/tag?tag=' + tag).then(function (response) {
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
                {this.renderTagList()}
            </div>
        )
    }
})
render(<Tag />, document.getElementById('page'));