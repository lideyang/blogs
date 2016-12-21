/**
 * Created by Lidy on 2016/12/14.
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import {Header, TagList} from '../components';
import {Grid} from 'react-bootstrap';
import '../../less/pages/tags.less';
export default class Tags extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header>
                    <header className="header-title">
                        <h1>所有标签</h1>
                    </header>
                </Header>
                <Grid className="tags-list">
                    <div className="page-header">
                        <h1>所有标签：
                            <small>{this.props.tagList.length}条数据</small>
                        </h1>
                    </div>
                    <TagList data={this.props.tagList}/>
                </Grid>
            </div>
        )
    }
}
if (__DEVCLIENT__) {
    ReactDOM.render(
        React.createElement(Tags, initialState),
        document.getElementById('root')
    );
}