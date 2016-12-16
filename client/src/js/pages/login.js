/**
 * Created by Lidy on 2016/12/12.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, LoginForm} from '../components';
import {ObjectParamToStr} from '../utils';
const Login = React.createClass({
    renderHeader(){
        return (
            <Header>
                <header className="header-title">
                    <h1>用户登录</h1>
                </header>
            </Header>
        );
    },
    renderLogin(){
        return (
            <LoginForm className="login" onSubmit={this.onSubmit}/>
        )
    },

    onSubmit(formParams){
        var that = this;
        let formParamsStr = ObjectParamToStr(formParams);
        fetch('/api/login', {
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
                        //  window.location.href = data.msg;
                    }
                }
            });
        });
    },
    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderLogin()}
            </div>
        )
    }
})
render(<Login />, document.getElementById('page'));