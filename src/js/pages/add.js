/**
 * Created by lidy on 2016/12/11.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, Footer, Post} from '../components';
import {ObjectParamToStr, GetUrlToId} from '../utils';

const Add = React.createClass({
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
                    <h1>新增文章</h1>
                </header>
            </Header>
        );
    },
    renderContent(){
        var that = this;
        return (
            <Post onSubmit={this.onSubmit}/>
        )
    },
    renderFooter(){
        return (
            <Footer/>
        )
    },
    onSubmit(formParams){
        var that = this;
        let formParamsStr = ObjectParamToStr(formParams);

        fetch('/api/addArchive', {
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
render(<Add />, document.getElementById('page'));