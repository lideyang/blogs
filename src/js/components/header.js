/**
 * Created by Lidy on 2016/11/15.
 */
import React from 'react';
import RightMenu from './rightMenu';
const Header = React.createClass({
    getInitialState: function () {
        return {
            rightIsOpen: false
        }
    },
    toggleMenu(){
        this.setState({
            rightIsOpen: !this.state.rightIsOpen
        })
        console.log(this.state.rightIsOpen);
    },
    render() {
        console.log(this.state.rightIsOpen);
        return (
            <div className="top-boxer">
                <RightMenu isOpen={this.state.rightIsOpen} />
                <header id="masthead" className="site-header" role="banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="top">
                                    <div className="site-branding">
                                        <h1 className="site-title logo">
                                            <a id="blogname" rel="home" href="/" title="">d332sd</a>
                                        </h1>
                                    </div>
                                    <div className="nav-switch" onClick={this.toggleMenu}>
                                        <i className="fa fa-bars"></i>
                                        <i className="fa fa-times"></i>
                                    </div>
                                </div>
                                <nav id="site-navigation" className="main-navigation" role="navigation">
                                    {/*分割线*/}
                                </nav>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
});

export default Header;