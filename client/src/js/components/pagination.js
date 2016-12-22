/**
 * Created by Lidy on 2016/12/13.
 */
import React, {PropTypes, Component} from 'react'
import {Pagination} from 'react-bootstrap';

export default class PaginationAdvanced extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    static defaultProps = {
        items: 0
    }

    static propTypes = {
        items: PropTypes.number.isRequired
    }

    handleSelect(eventKey) {
        if (eventKey !== this.state.activePage) {
            this.setState({
                activePage: eventKey
            });
            this.props.onChangePage(eventKey);
        }
    }

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
}