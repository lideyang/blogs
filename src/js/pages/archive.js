/**
 * Created by Lidy on 2016/11/22.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, Footer} from '../components';
import {Grid} from 'react-bootstrap';
const Archive = React.createClass({
    getInitialState() {
        return {
            archiveList: []
        };
    },
    renderHeader(){
        return (
            <Header>
                <header className="header-title">
                    <h1>lidy的存档</h1>
                </header>
            </Header>
        );
    },
    renderArchiveList(){
        let lastYear = 0;
        return (
            <Grid>
                <ul className="archive">
                    {this.state.archiveList.map(function (item, index) {
                        var yearLi;
                        if (item.time.year != lastYear) {
                            lastYear = item.time.year;
                            yearLi = <li><h2>{  item.time.year }</h2></li>;
                        }
                        return (
                            <div key={index}>
                                {yearLi}
                                <li className="post">
                                    <h3>
                                        <span>
                                            <a href={'/u/' + item._id}>{item.title}</a>
                                        </span>
                                        <div className="post-time">
                                            {item.time.day}
                                        </div>
                                    </h3>
                                </li>
                            </div>
                        )
                    })}
                </ul>
            </Grid>
        )
    },
    componentDidMount: function () {
        var that = this;
        fetch('/api/getArchiveList').then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    that.setState({
                        archiveList: data
                    });
                }
            });
        });
    },
    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderArchiveList()}
            </div>
        )
    }
})
render(<Archive />, document.getElementById('page'));