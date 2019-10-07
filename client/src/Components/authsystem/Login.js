import React, { Component } from 'react';
import { login } from './UserFunctions';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';

class Login extends Component {
    constructor(){
        super()
        
        this.state = {
            email: '',
            password: '', 
            error: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]:e.target.value })
    }

    onSubmit(e) {
      e.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user)
        .then(res =>{
            this.props.history.push('/order-summary')
        })

    }



    render() {
        return (
                <div className="container mt-0 mb-0 ml-0 mr-0 p-5 ">

                    <div className="row col-10 col-md-8 col-lg-4 mx-auto my-auto p-5 card">
                        <h2>Sign In</h2>

                        <Form className="form" onSubmit={this.onSubmit}>
                            <div className="mx-auto mb-5 mt-3">
                                <FormGroup >
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="input-login-email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </FormGroup>
                            
                                <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="input-login-password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </FormGroup>
                            </div>
                            <Button type="submit">Submit</Button>
                        </Form>
                    </div>
                </div>
        )
    }
}
export default Login;