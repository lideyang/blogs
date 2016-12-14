/**
 * Created by Lidy on 2016/12/13.
 */
import React from 'react';
import {Label} from 'react-bootstrap';
import Loading  from '../loading';
const Tags = React.createClass({
    getDefaultProps: function () {
        return {
            data: []
        };
    },
    render() {
        if (this.props.data) {
            let data = this.props.data;
            return (
                <div className="inline-block tag-list">
                    {data.map(function (item, index) {
                        return (
                            <a  key={index} href={'/tag/' + item}><Label bsStyle="info">{item}</Label></a>
                        )
                    })}
                </div>
            )
        }
        return (
            <Loading/>
        );
    }
});
export default Tags;