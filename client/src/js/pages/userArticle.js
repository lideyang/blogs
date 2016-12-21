/**
 * Created by Lidy on 2016/11/30.
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import Action from '../../api'
import {Header, SearchList} from '../components'
export default class User extends Component {

    constructor(props) {
        super(props);
        this.state = this.props;
        this.onChangePage = this.onChangePage.bind(this);
        this.getArticleList = this.getArticleList.bind(this);
    }

    getArticleList(pageIndex){
        return Action.ArticleList({
            params: {
                p: pageIndex
            }
        })
    }

    onChangePage(index){
        var that = this;
        this.getArticleList(index).then(
            data => {
                that.setState({
                    list: data.data.data,
                    total: data.data.total
                })
            }
        );
    }

    render() {
        return (
            <div>
                <Header>
                    <header className="header-title">
                        <h1>{this.state.userName}的文章列表</h1>
                    </header>
                </Header>
                <SearchList data={this.state.list} total={this.state.total} onChangePage={this.onChangePage}/>
            </div>
        )
    }
}
if (__DEVCLIENT__) {
    ReactDOM.render(
        React.createElement(User, initialState),
        document.getElementById('root')
    );
}