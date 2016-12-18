/**
 * Created by lidy on 2016/12/18.
 */
import React, {PropTypes, Component} from 'react'
import {Header, ArticleList, Loading} from '../components';
import {Carousel} from 'react-bootstrap';
import '../../less/pages/home.less';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.onChangePage = this.onChangePage.bind(this);
    }

    static propTypes = {
        total: PropTypes.object.number,
        menuBarClass: PropTypes.string.isRequired
    }

    render() {
        const {articleList, total, menuBarClass} = this.props
        console.log(__DEVCLIENT__);
        console.log(articleList);
        if(__DEVCLIENT__){

        }
        if (articleList) {
            return (
                <div>
                    <Header>
                        {/*banner*/}
                        <Carousel className="home-banner" interval={5000} controls={false}>
                            { articleList.map(function (item, index) {
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
                    <ArticleList data={articleList} total={total} onChangePage={this.onChangePage}/>
                </div>
            );
        } else {
            return <Loading />
        }
    }

    getArticleList(pageIndex) {
        var that = this;
        fetch('/api/ArticleList?p=' + pageIndex).then(function (response) {
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
       // this.getArticleList(1);
    }
}