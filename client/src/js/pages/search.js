/**
 * Created by Lidy on 2016/12/13.
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import {Header, SearchList} from '../components';
export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = this.props;
    }

    render() {
        return (
            <div>
                <Header>
                    <header className="header-title">
                        <h1>搜索结果</h1>
                    </header>
                </Header>
                <SearchList data={this.state.list} />
            </div>
        )
    }
}

if (__DEVCLIENT__) {
    ReactDOM.render(
        React.createElement(Search, initialState),
        document.getElementById('root')
    );
}