/**
 * Created by Lidy on 2016/11/17.
 */
import React from 'react';
const Loading = React.createClass({
    getInitialState: function () {
        return {
            display:'block'
        };
    },
    componentWillMount(){

    },
    render() {
        return (
            <div className="height-full">
                载入中...
            </div>
        );
    }
});
export default Loading;