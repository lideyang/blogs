/**
 * Created by Lidy on 2016/12/2.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, Footer, Post} from '../components';
import {objectParamToStr, getUrlToId} from '../utils';

const Edit = React.createClass({
    getInitialState() {
        return {
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
                <header className="page-header">
                    <h1>编辑文章</h1>
                </header>
            </Header>
        );
    },
    renderContent(){
        var that = this;
        return (
            <Post data={this.state.data}/>
        )
    },
    renderFooter(){
        return (
            <Footer/>
        )
    },
    onSubmit(formParams){
        var that = this;
        let formParamsStr = objectParamToStr(formParams);

        fetch('/api/setArchiveContent', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formParamsStr
        }).then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    if (data.success) {
                        that.setState({
                            articleInfo: update(that.state.articleInfo, {comments: {$push: [newComment]}})
                        })
                    }
                }
            });
        });
    },
    componentDidMount: function () {
        var that = this;
        var id = getUrlToId();
        fetch('/api/getArchiveContent?id=' + id).then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    that.setState({
                        data: data
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
                {this.renderFooter()}
            </div>
        )
    }
})
render(<Edit />, document.getElementById('page'));