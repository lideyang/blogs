/**
 * Created by Lidy on 2016/12/14.
 */
import React from 'react';
import {render} from 'react-dom';
import {Header, TagList} from '../components';
import {Grid} from 'react-bootstrap';
import '../../less/pages/tags.less';
const Tags = React.createClass({
    getInitialState() {
        return {
            list: [],
            loading: true
        };
    },
    renderHeader(){
        return (
            <Header>
                <header className="header-title">
                    <h1>所有标签</h1>
                </header>
            </Header>
        );
    },
    renderTagList(){
        let tagList = this.state.list;
        return (
            <Grid className="tags-list">
                <div className="page-header">
                    <h1>所有标签：
                        <small>{tagList.length}条数据</small>
                    </h1>
                </div>
                <TagList data={tagList}/>
            </Grid>
        )
    },
    componentDidMount: function () {
        let that = this;
        fetch('/api/tags').then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    if (data.success) {
                        that.setState({
                            list: data.data,
                            loading: false
                        });
                    }
                }
            });
        });
    },
    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderTagList()}
            </div>
        )
    }
})
render(<Tags />, document.getElementById('page'));