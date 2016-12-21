/**
 * Created by Lidy on 2016/12/13.
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import {Header, SearchList} from '../components';
export default class Tag extends Component {

    constructor(props) {
        super(props);
        this.state = this.props;
        console.log(this.state.list);
    }

    render() {
        return (
            <div>
                <Header>
                    <header className="header-title">
                        <h1>标签</h1>
                    </header>
                </Header>
                <SearchList data={this.state.list} loading={this.state.loading}/>
            </div>
        )
    }
}

//游览器数据
if (__DEVCLIENT__) {
    ReactDOM.render(
        React.createElement(Tag, initialState),
        document.getElementById('root')
    );
}