/**
 * Created by Lidy on 2016/12/13.
 */
import React from 'react';
import {Pagination} from 'react-bootstrap';

const PaginationAdvanced = React.createClass({
    getInitialState() {
        return {
            activePage: 1
        };
    },
    getDefaultProps(){
        return {
            items: 0
        }
    },
    handleSelect(eventKey) {
        if(eventKey!==this.state.activePage){
            this.setState({
                activePage: eventKey
            });
            this.props.onChangePage(eventKey);
        }
    },
    render() {
        if (this.props.items) {
            return (
                <div className="text-center">
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        items={this.props.items}
                        maxButtons={5}
                        activePage={this.state.activePage}
                        onSelect={this.handleSelect}/>
                </div>
            );
        }
        return null;
    }
});
export default PaginationAdvanced;