/**
 * Created by Lidy on 2016/12/13.
 */
import React from 'react';
import {Form, FormGroup, ControlLabel, Grid, Col, Button} from 'react-bootstrap';

const RegForm = React.createClass({
    submitHandle(e){
        e.preventDefault();
        let formParams = {
            name: this.refs.name.value,
            password: this.refs.password.value,
            rePwd: this.refs.rePwd.value,
            email: this.refs.email.value
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
                        <Col componentClass={ControlLabel} sm={4}>
                            确认密码
                        </Col>
                        <Col sm={8}>
                            <input className="form-control" type="password" ref="rePwd" placeholder="密码"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>
                            邮箱
                        </Col>
                        <Col sm={8}>
                            <input className="form-control" type="email" ref="email" placeholder="email"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={4} sm={8}>
                            <Button type="submit">
                                注册
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Grid>
        );
    }
});
export default RegForm;