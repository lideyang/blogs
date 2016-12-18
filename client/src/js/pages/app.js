/**
 * Created by Lidy on 2016/11/15.
 */
import React, {PureComponent} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Header} from '../components';
import * as Actions from '../actions'

const mapStateToProps = state =>{
    return {

    }
}

const mapDispatchToProps = dispatch =>{
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class App extends PureComponent {
    constructor(props){
        super(props)
    }

    render() {
        const {location, children} = this.props;

        return (
            <div>
                <Header >
                    <header className="header-title">
                        <h1>编辑文章</h1>
                    </header>
                </Header>
                { children }
            </div>
        )
    }
}