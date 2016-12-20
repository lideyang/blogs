/**
 * Created by lidy on 2016/12/11.
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import {Header, Post} from '../components'

export default class ArticleAdd extends Component{

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

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
    }

    render() {
        return (
            <div>
                <Header>
                    <header className="header-title">
                        <h1>新增文章</h1>
                    </header>
                </Header>
                <Post onSubmit={this.onSubmit}/>
            </div>
        )
    }
}
if (__DEVCLIENT__) {
    ReactDOM.render(
        React.createElement(ArticleAdd),
        document.getElementById('root')
    );
}