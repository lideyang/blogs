/**
 * Created by Lidy on 2016/11/15.
 */
import React from 'react';

const Header = React.createClass({
    render() {
        return (
            <header id="masthead" class="site-header" role="banner">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="top">
                                <div class="site-branding">
                                    <h1 class="site-title logo">
                                        <a id="blogname" rel="home" href="/" title="<%= title %>">dsd</a>
                                    </h1>
                                </div>
                                <div class="nav-switch"><i class="fa fa-bars"></i> <i class="fa fa-times"></i></div>
                            </div>
                            <nav id="site-navigation" class="main-navigation" role="navigation">
                                {/*分割线*/}
                            </nav>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
});

export default Header;