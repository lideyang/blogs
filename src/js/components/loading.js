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
        window.onload=function(){
            this.setState({
                display:'none'
            })
        }.bind(this);
    },
    render() {
        return (
            <div id="main_loading"  style={{display: this.state.display}}>
                <p id="loading-one">载入中</p>
            </div>
        );
    }
});
export default Loading;