/**
 * Created by lidy on 2016/12/18.
 */
import React, {PropTypes, Component} from 'react'
import {Link} from 'react-router'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.onChangePage = this.onChangePage.bind(this);
    }

    static propTypes = {
        ArticleList: PropTypes.bool.isRequired,
        total: PropTypes.object.number,
        menuBarClass: PropTypes.string.isRequired
    }

    render() {
        const {ArticleList, total, menuBarClass} = this.props
        if (this.state.ArticleList) {
            return (
                <div>
                    <Header>
                        {/*banner*/}
                        <Carousel className="home-banner" interval={4000000} controls={false}>
                            { ArticleList.map(function (item, index) {
                                if (index < 3) {
                                    return (
                                        <Carousel.Item key={index}>
                                            <Carousel.Caption>
                                                <h3><a href={'/u/' + item._id}>{item.title}</a></h3>
                                                <div>{item.description }</div>
                                                <a className="readmore" href={'/u/' + item._id}>
                                                    Read More
                                                </a>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    );
                                }
                            })}
                        </Carousel>
                    </Header>
                    <ArticleList data={ArticleList} total={total} onChangePage={this.onChangePage}/>
                </div>
            );
        } else {
            return <span>加载中...</span>
        }
    }

    getArticleList(pageIndex) {
        var that = this;
        fetch('/api/getNavInfo?p=' + pageIndex).then(function (response) {
            response.json().then(function (data) {
                if (that.isMounted()) {
                    that.setState({
                        ArticleList: data.data,
                        total: data.total
                    });
                }
            });
        });
    }

    onChangePage(index) {
        this.getArticleList(index);
    }

    componentDidMount() {
        this.getArticleList(1);
    }
}