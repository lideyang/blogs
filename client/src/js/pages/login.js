/**
 * Created by Lidy on 2016/12/12.
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import Action from '../../api'
import {saveCookie} from '../utils/authService'
import {Header, LoginForm} from '../components'


export default class Login extends Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(formParams) {
        var that = this;
        Action.AccountLogin(formParams).then(
            response => {
                let data = response.data;
                if (data.success) {
                    saveCookie('token', data.token);
                    window.location.href = data.msg;
                }
            }
        )
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