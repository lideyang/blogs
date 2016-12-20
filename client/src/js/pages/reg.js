/**
 * Created by Lidy on 2016/12/13.
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import {Header, RegForm} from '../components'
import Action from '../../api';
import '../../less/pages/reg.less'

export default class Reg extends Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(formParams) {
        var that = this;
        Action.AccountRegister(formParams).then(
            response => {
                let data = response.data;
                if (data.success) {
                    window.location.href = data.msg;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Header>
                    <header className="header-title">
                        <h1>用户注册</h1>
                    </header>
                </Header>
                <div className="reg-container">
                    <RegForm onSubmit={this.onSubmit}/>
                </div>
            </div>
        )
    }
}

if (__DEVCLIENT__) {
    ReactDOM.render(
        React.createElement(Reg),
        document.getElementById('root')
    );
}