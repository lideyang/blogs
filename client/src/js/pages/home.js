/**
 * Created by lidy on 2016/12/18.
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import {Header, ArticleList, Loading} from '../components'
import Action from '../../api'
import {Carousel} from 'react-bootstrap'
import '../../less/pages/home.less'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = this.props;
        this.onChangePage = this.onChangePage.bind(this);
        this.getArticleList = this.getArticleList.bind(this);
    }

    static defaultProps = {
        articleList: []
    }

    static propTypes = {
        total: PropTypes.number.isRequired,
        articleList: PropTypes.array.isRequired
    }


    getArticleList(pageIndex) {
        return Action.ArticleList({
            params: {
                p: pageIndex
            }
        })
    }

    onChangePage(index) {
        var that = this;
        this.getArticleList(index).then(
            data => {
                that.setState({
                    articleList: data.data.data,
                    total: data.data.total
                })
            }
        );
    }

    componentDidMount() {
        if (__DEVCLIENT__) {
            console.log('render')
        }
    }

    render() {
        const {articleList, total, menuBarClass} = this.state;
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
}
//游览器数据
if (__DEVCLIENT__) {
    ReactDOM.render(
        React.createElement(Home, initialState),
        document.getElementById('root')
    );
}