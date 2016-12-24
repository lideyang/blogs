/**
 * Created by Lidy on 2016/12/2.
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import {Header, Footer} from '../components'
import {Grid} from 'react-bootstrap'
export default class Page404 extends Component {

    constructor() {
        super();
        this.state = {
            countdown: 5
        }
    }

    componentDidMount() {
        if (__DEVCLIENT__) {
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
        }
    }

    render() {
        return (
            <div>
                <Header>
                    <header className="header-title">
                        <h1>404</h1>
                    </header>
                </Header>
                <Grid>
                    <h2>404</h2>
                    <p>请求出错啦，{this.state.countdown}秒后跳转回首页^_^</p>
                </Grid>
            </div>
        )
    }
}
if (__DEVCLIENT__) {
    ReactDOM.render(
        React.createElement(Page404),
        document.getElementById('root')
    );
}