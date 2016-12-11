/**
 * Created by lidy on 2016/11/22.
 */
import React from 'react';
import {render} from 'react-dom';
import {Grid, Row, Col} from 'react-bootstrap';

const Footer=React.createClass({
    componentDidMount(){
        document.getElementById('main_loading').style.display='none';
    },
    render:function(){
        return (
            <footer id="colophon" className="site-footer" role="contentinfo">
                <div className="footer-widgets">
                    <div className="container">
                        <div className="row">
                        </div>
                    </div>
                </div>
                <div className="site-info">
                    <Grid>
                        <Row>
                            <Col>
                                <p>Copyright &copy; 2016 <a href="/" title="lidy个人主页">lidy个人主页</a> - 路曼曼其修远兮，吾将上下而求索。</p>
                                <p>备案号 | <a href="http://www.miitbeian.gov.cn/">赣ICP备16008490号-1</a></p>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </footer>
        )
    }
})

export default Footer;