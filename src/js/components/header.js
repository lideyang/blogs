/**
 * Created by Lidy on 2016/11/15.
 */
import React from 'react';
import RightMenu from './rightMenu';
import {Grid, Row, Col} from 'react-bootstrap';
import {WaveCanvas} from '../plugins/waveCanvas';
const Header = React.createClass({
    getDefaultProps: function () {
        return {
            title: ''
        }
    },
    getInitialState: function () {
        return {
            rightIsOpen: false
        }
    },
    onToggleMenu(){
        setTimeout(function () {
            this.setState({
                rightIsOpen: !this.state.rightIsOpen
            })
        }.bind(this), 0);
        //console.log(this.state.rightIsOpen);
    },
    componentDidMount: function () {
        WaveCanvas('waveCanvas');
    },
    render() {
        var leftMenuIcon;
        if (this.state.rightIsOpen) {
            leftMenuIcon = <i className="fa fa-times"></i>;
        } else {
            leftMenuIcon = <i className="fa fa-bars"></i>;
        }
        return (
            <div className="top-boxer">
                <RightMenu isOpen={this.state.rightIsOpen} onToggleMenu={this.onToggleMenu}/>
                <header id="masthead" className="site-header" role="banner">
                    <Grid>
                        <Row>
                            <Col md={12}>
                                <div className="top">
                                    <div className="site-branding">
                                        <h1 className="site-title logo">
                                            <a id="blogname" rel="home" href="/" title="">{this.props.title}</a>
                                        </h1>
                                    </div>
                                    <div className="nav-switch" onClick={this.onToggleMenu}>
                                        {leftMenuIcon}
                                    </div>
                                </div>
                                <nav id="site-navigation" className="main-navigation" role="navigation">
                                    {/*分割线*/}
                                </nav>
                                {this.props.children}
                            </Col>
                        </Row>
                    </Grid>
                    <canvas id="waveCanvas"></canvas>
                </header>
            </div>
        );
    }
});

export default Header;