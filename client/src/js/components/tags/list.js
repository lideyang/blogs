/**
 * Created by Lidy on 2016/12/13.
 */
import React, {PropTypes, Component} from 'react'
import {Label} from 'react-bootstrap';
import Loading  from '../loading';

export default class Tags extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        data: []
    }

    render() {
        if (this.props.data) {
            let data = this.props.data;
            if (typeof data === 'string') {
                return (
                    <div className="inline-block tag-list">
                        <a href={'/tag/' + data}><Label bsStyle="info">{data}</Label></a>
                    </div>
                )
            }
            return (
                <div className="inline-block tag-list">
                    {data.map(function (item, index) {
                        return (
                            <a key={index} href={'/tag/' + item}><Label bsStyle="info">{item}</Label></a>
                        )
                    })}
                </div>
            )
        }
        return (
            <Loading/>
        );
    }
}