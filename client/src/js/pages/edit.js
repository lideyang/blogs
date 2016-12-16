/**
 * Created by Lidy on 2016/12/2.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, Post} from '../components';
import {ObjectParamToStr, GetUrlToId} from '../utils';
import 'whatwg-fetch';

const Edit = React.createClass({
    getInitialState() {
        return {
            loading: true,
            data: {
                id: '',
                title: '',
                tags: '',
                post: '',
                sort: '',
                description: ''
            }
        };
    },
    renderHeader(){
        return (
            <Header>
                <header className="header-title">
                    <h1>编辑文章</h1>
                </header>
            </Header>
        );
    },
    renderContent(){
        var that = this;
        return (
            <Post data={this.state.data} loading={this.state.loading} onSubmit={this.onSubmit}/>
        )
    },

    onSubmit(formParams){
        var that = this;
        let formParamsStr = ObjectParamToStr(formParams);
        fetch('/api/setArchiveContent?id=' + this.state.data._id, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: 'same-origin',//发送cookie，深坑
            body: formParamsStr
        }).then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    if (data.success) {
                        window.location.href = data.msg;
                    }
                }
            });
        });
    },
    componentDidMount: function () {
        var that = this;
        var id = GetUrlToId();
        fetch('/api/getArchiveContent?id=' + id).then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    that.setState({
                        data: data,
                        loading: false
                    });
                }
            });
        });
    },
    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderContent()}
            </div>
        )
    }
})
render(<Edit />, document.getElementById('page'));