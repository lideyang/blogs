/**
 * Created by Lidy on 2016/11/17.
 */
import React, {Component} from 'react';

export default class RightMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuClass: 'stmenu',
            menuBarClass: 'stmenu-bar'
        };
    }

    render() {
        this.state.menuClass = this.props.isOpen ? 'stmenu active' : 'stmenu';
        this.state.menuBarClass = this.props.isOpen ? 'stmenu-bar active' : 'stmenu-bar';
        return (
            // 右侧导航
            <div className={this.state.menuClass}>
                <div className="stmenu-bg" onClick={this.props.onToggleMenu}>
                </div>
                <div className={this.state.menuBarClass}>
                    <nav id="site-navigation" className="sidebar-navigation" role="navigation">
                        <div id="primary-menu" className="menu">
                            <ul>
                                <li className="page_item page-item-2"><h2 className="">React</h2></li>
                            </ul>
                        </div>
                    </nav>
                    {/*搜索-文章列表*/}
                    <aside id="secondary" className="widget-area" role="complementary">
                        <section id="search-2" className="widget widget_search">
                            <form role="search" method="get" className="search-form" action="/search">
                                <label>
                                    <input type="search" className="search-field" placeholder="搜索&hellip;" value=""
                                           name="keyword"/>
                                </label>
                                <input type="submit" className="search-submit" value="搜索"/>
                            </form>
                        </section>
                        <section id="recent-posts-2" className="widget widget_recent_entries"><h2
                            className="widget-title">近期文章</h2>
                            <ul>
                            </ul>
                        </section>
                        <section id="recent-comments-2" className="widget widget_recent_comments"><h2
                            className="widget-title">近期评论</h2>
                            <ul id="recentcomments">
                            </ul>
                        </section>
                        <section id="categories-2" className="widget widget_categories"><h2 className="widget-title">
                            分类目录</h2>
                            <ul>
                                <li className="cat-item cat-item-1">
                                    <a href="/u/sort/心情">心情</a>
                                    <a href="/u/sort/技术">技术</a>
                                    <a href="/u/sort/学习">学习</a>
                                    <a href="/archive">存档</a>
                                </li>
                            </ul>
                        </section>
                        <section id="meta-2" className="widget widget_meta">
                            <h2 className="widget-title">
                                工具箱
                            </h2>
                            <ul>
                                <li><a target="_blank" href="http://jquery.lideyang.net">jquery参考手册</a></li>
                                <li><a target="_blank"
                                       href="http://www1.w3cfuns.com/tools.php?mod=compression">js/css压缩</a></li>
                                <li><a target="_blank" href="http://www1.w3cfuns.com/tools.php?mod=regex">正则调试</a></li>
                                <li><a target="_blank" href="http://www.css88.com/book/css/">css3手册</a></li>
                                <li><a target="_blank" href="http://www.iconfont.cn/">矢量图标库</a></li>
                            </ul>
                        </section>
                        <section id="meta-2" className="widget widget_meta">
                            <h2 className="widget-title">
                                案例
                            </h2>
                            <ul>
                                <li><a target="_blank" href="http://zc.lideyang.net">众筹h5</a></li>
                            </ul>
                        </section>
                    </aside>
                </div>
            </div>
        );
    }
}