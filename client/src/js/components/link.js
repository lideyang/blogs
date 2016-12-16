/**
 * Created by Lidy on 2016/12/12.
 */
import React from 'react';
import Loading from './loading';
const Link = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },
    componentWillMount(){
        var that = this;
        fetch('/api/linkList').then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    that.setState({
                        data: data.data
                    });
                }
            });
        });
    },
    render() {
        var linkList = this.state.data;
        if (linkList) {
            return (
                <ul>
                    {linkList.map(function (item, index) {
                        return (
                            <li key={index}>
                                <h3>
                                    <a href={item.url}>{item.name}</a>
                                </h3>
                            </li>
                        )
                    })}
                </ul>
            )
        }
        return (
            <Loading/>
        );
    }
});
export default Link;