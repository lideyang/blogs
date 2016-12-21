/**
 * Created by Lidy on 2016/11/22.
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import {Header, Footer} from '../components';
import {Grid} from 'react-bootstrap';

export default class Archive extends Component {

    constructor(props) {
        super(props);
        this.state = this.props;
    }

    render() {
        let lastYear = 0;
        return (
            <div>
                <Header>
                    <header className="header-title">
                        <h1>lidy的存档</h1>
                    </header>
                </Header>
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
            </div>
        )
    }
}

if (__DEVCLIENT__) {
    ReactDOM.render(
        React.createElement(Archive, initialState),
        document.getElementById('root')
    );
}