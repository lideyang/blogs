/**
 * Created by Lidy on 2016/11/15.
 */
import React from 'react';
import RightMenu from './rightMenu';
import { Grid,Row,Col } from 'react-bootstrap';
const Header = React.createClass({
    getInitialState: function () {
        return {
            rightIsOpen: false
        }
    },
    onToggleMenu(){
        this.setState({
            rightIsOpen: !this.state.rightIsOpen
        })
        console.log(this.state.rightIsOpen);
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
                                            <a id="blogname" rel="home" href="/" title="">d332sd</a>
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
                </header>
            </div>
        );
    }
});

export default Header;