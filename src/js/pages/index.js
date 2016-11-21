/**
 * Created by Lidy on 2016/11/15.
 */
import React from 'react';
import {render} from 'react-dom';
import {HomeHeader} from '../components';

// style
import '../../css/owl-carousel/owl.carousel.css';
import '../../css/owl-carousel/owl.theme.css';

const Home = React.createClass({
    renderHeader(){
        return (
            <HomeHeader/>
        );
    },
    renderArticleList(){

    },
    render() {
        return(
            <div>
                {this.renderHeader()}
            </div>
        )
    }
});

//生成视图
render(<Home />, document.getElementById('page'));
