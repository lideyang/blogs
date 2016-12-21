/**
 * Created by Lidy on 2016/12/1.
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import {Header, SearchList} from '../components';
export default class SortList extends Component {

    constructor(props) {
        super(props);
        this.state = this.props;
    }

    render() {
        return (
            <div>
                <Header>
                    <header className="header-title">
                        <h1>文章分类</h1>
                    </header>
                </Header>
                <SearchList data={this.state.list}/>
            </div>
        )
    }
}
if (__DEVCLIENT__) {
    ReactDOM.render(
        React.createElement(SortList, initialState),
        document.getElementById('root')
    );
}