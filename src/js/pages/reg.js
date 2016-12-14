/**
 * Created by Lidy on 2016/12/13.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, RegForm} from '../components';
import {ObjectParamToStr} from '../utils';
import '../../less/pages/reg.less'
const Reg = React.createClass({
    renderHeader(){
        return (
            <Header>
                <header className="header-title">
                    <h1>用户注册</h1>
                </header>
            </Header>
        );
    },
    renderReg(){
        return (
            <div className="reg-container">
                <RegForm onSubmit={this.onSubmit}/>
            </div>
        )
    },
    onSubmit(formParams){
        var that = this;
        let formParamsStr = ObjectParamToStr(formParams);
        fetch('/api/reg', {
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
                {this.renderReg()}
            </div>
        )
    }
})
render(<Reg />, document.getElementById('page'));