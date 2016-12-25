/**
 * Created by Lidy on 2016/11/15.
 */
import React, {PropTypes, Component} from 'react';
import RightMenu from './rightMenu';
import {Grid, Row, Col} from 'react-bootstrap';
import {WaveCanvas} from '../plugins/waveCanvas';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rightIsOpen: false
        };
        this.onToggleMenu = this.onToggleMenu.bind(this);
    }

    static defaultProps = {
        title: 'lidy'//document.title
    }

    onToggleMenu() {
        setTimeout(function () {
            this.setState({
                rightIsOpen: !this.state.rightIsOpen
            })
        }.bind(this), 0);
    }

    componentWillMount() {
        if (__DEVCLIENT__) {
            debugger;
            WaveCanvas('waveCanvas');
            document.getElementById('main_loading').style.display = 'none';
        }
    }

    render() {
        var leftMenuIcon;
        if (this.state.rightIsOpen) {
            leftMenuIcon = <i className="iconfont icon-cha"></i>;
        } else {
            leftMenuIcon = <i className="iconfont icon-bars"></i>;
        }
        return (
            <div className="top-boxer">
                <RightMenu isOpen={this.state.rightIsOpen} onToggleMenu={this.onToggleMenu.bind(this)}/>
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
                                {this.props.children}
                            </Col>
                        </Row>
                    </Grid>
                    <canvas id="waveCanvas"></canvas>
                </header>
            </div>
        );
    }
};