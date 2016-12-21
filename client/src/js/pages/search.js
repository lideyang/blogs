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

    componentDidMount() {
        let that = this;
        let url = window.location.pathname;
        let index = url.lastIndexOf('search/');
        if (index) {
            let keyword = url.substring(index + 7);
            fetch('/api/search?keyword=' + keyword).then(function (response) {
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
        }
    }

    render() {
        return (
            <div>
                <Header>
                    <header className="header-title">
                        <h1>搜索结果</h1>
                    </header>
                </Header>
                <SearchList data={this.state.list} loading={this.state.loading}/>
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