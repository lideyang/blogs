/**
 * Created by Lidy on 2016/12/2.
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import {Header, Post} from '../components';
import Action from '../../api'

export default class ArticleEdit extends Component {

    constructor(props) {
        super(props);
        this.state = this.props;
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(formParams) {
        var that = this;
        formParams.id = this.state.data._id;
        Action.ArticleEdit('post', formParams).then(
            response=> {
                var data = response.data;
                if (data.success) {
                    window.location.href = data.msg;
                }
            }
        )
    }

    render() {
        console.log(this.state.data);
        return (
            <div>
                <Header>
                    <header className="header-title">
                        <h1>编辑文章</h1>
                    </header>
                </Header>
                <Post data={this.state.data} loading={this.state.loading} onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

if (__DEVCLIENT__) {
    ReactDOM.render(
        React.createElement(ArticleEdit, initialState),
        document.getElementById('root')
    );
}