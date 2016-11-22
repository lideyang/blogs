/**
 * Created by Lidy on 2016/11/22.
 */
import React from 'react';
import {render} from 'react-dom';
import {Home} from '../components';


const Article = React.createClass({
    getInitialState: function () {
        return {
            ArticleList: false,
            menuBarClass: 'stmenu-bar'
        };
    },
    renderHeader(){
        return (
            <Header data={this.state.ArticleList}/>
        );
    },
    componentDidMount: function () {
        var that = this;
        fetch('/api/getNavInfo').then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    console.log(data);
                    that.setState({
                        ArticleList: data
                    });
                }
            });
        });
    },
    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderArticleList()}
            </div>
        )
    }
});