/**
 * Created by Lidy on 2016/12/12.
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import {Header, LoginForm} from '../components';


export default class Login extends Component{

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
    }

    render() {
        return (
            <div>
                <Header>
                    <header className="header-title">
                        <h1>用户登录</h1>
                    </header>
                </Header>
                <LoginForm className="login" onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

if (__DEVCLIENT__) {
    ReactDOM.render(
        React.createElement(Login),
        document.getElementById('root')
    );
}