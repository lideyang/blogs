/**
 * Created by Lidy on 2016/12/12.
 */
import React from 'react';
import {Form, FormGroup, ControlLabel, Grid, Col, Button} from 'react-bootstrap';
const LoginForm = React.createClass({
    submitHandle(e){
        e.preventDefault();
        let formParams = {
            name: this.refs.name.value,
            password: this.refs.password.value
        }
        this.props.onSubmit(formParams);
    },
    render() {
        return (
            <Grid>
                <Form horizontal onSubmit={this.submitHandle}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>
                            用户名
                        </Col>
                        <Col sm={8}>
                            <input className="form-control" ref="name" placeholder="用户名"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>
                            密码
                        </Col>
                        <Col sm={8}>
                            <input className="form-control" type="password" ref="password" placeholder="密码"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={4} sm={8}>
                            <Button type="submit">
                                登录
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Grid>
        );
    }
});
export default LoginForm;