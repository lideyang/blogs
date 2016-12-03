/**
 * Created by Lidy on 2016/12/2.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, Footer} from '../components';
const Page404 = React.createClass({
    getInitialState() {
        return {
            countdown: 5
        };
    },
    renderHeader(){
        return (
            <Header>
                <header className="page-header">
                    <h1>404</h1>
                </header>
            </Header>
        );
    },
    renderContent(){
        return (
            <div>
                <h2>404</h2>
                <p>请求出错啦，{this.state.countdown}秒后跳转回首页^_^</p>
            </div>
        )
    },
    renderFooter(){
        return (
            <Footer/>
        )
    },
    componentDidMount: function () {
        var Tid = setInterval(function () {
            var countdown = this.state.countdown;
            if (countdown > 0) {
                countdown--;
                this.setState({
                    countdown: countdown
                })
            }
            else {
                clearInterval(Tid);
                window.location.href = '/';
            }
        }.bind(this), 1000)
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
render(<Page404 />, document.getElementById('page'));