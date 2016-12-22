/**
 * Created by Lidy on 2016/12/12.
 */
import React, {Component} from 'react'
import Loading from './loading'
export default class Link extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var linkList = this.state.props;
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
}