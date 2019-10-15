import React, { Component } from 'react';
import { register } from './UserFunctions';
import { Form, FormGroup, Input, Button, Container, Card, CardTitle, CardText, Row, Col, Label } from 'reactstrap';
import styled from 'styled-components';


class Register extends Component {
    constructor(){
        super()
        
        this.state = {
            name:'',
            email: '',
            password: '',
            address_1:'',
            address_2:'',
            city:'',
            postal_code:'',
            country:'',
            phone:'',
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            address_1: this.state.address_1,
            address_2: this.state.address_2,
            city: this.state.city,
            postal_code: this.state.postal_code,
            country: this.state.country,
            phone: this.state.phone            
        }

        register(user)
        .then(res =>{
            this.props.history.push('/order-summary')
        })

    }

    render() {
        return (
                <RegistrationWrapper>
                    <div id="center" className="mx-auto my-auto mb-5 ">   
                        <div id="left" className="col-6 mr-1 ml-4  render-box">
                            <Form>

                                <div>
                                    <FormGroup>                                                
                                        <Label>Name</Label>
                                        <Input type="text" id="name" name="name" className="finput" placeholder="Your full name" />                                            
                                    </FormGroup>
                                </div>


                                <div>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input type="text" id="email" name="email" className="finput" placeholder="Your email" />
                                    </FormGroup>
                                </div>                                            


                                <div>
                                    <FormGroup>
                                        <Label>Address</Label>
                                        <Input type="text" id="password" name="password" className="finput" placeholder="Your email" />
                                    </FormGroup>
                                </div>                                            


                                <div>
                                    <FormGroup>
                                        <Label>Alternative Address</Label>
                                        <Input type="text" id="address_1" name="address_1" className="finput" placeholder="Your email" />
                                    </FormGroup>
                                </div>                                            


                                <div>
                                    <FormGroup>
                                        <Label>City/Town</Label>
                                        <Input type="text" id="address_2" name="address_2" className="finput" placeholder="Your email" />
                                    </FormGroup>
                                </div>
                                                    

                                <div>
                                    <FormGroup>
                                        <Label>Zip</Label>
                                        <Input type="text" id="city" name="city" className="finput" placeholder="Your email" />
                                    </FormGroup>
                                </div>
                                                    


                                <div>
                                    <FormGroup>
                                        <Label>Country</Label>
                                        <Input type="text" id="postal_code" name="postal_code" className="finput" placeholder="Your email" />
                                    </FormGroup>
                                </div>
                                                    


                                <div className="finput_box">
                                    <Label>Phone</Label>
                                    <FormGroup>                                                
                                        <Input type="text" id="country" name="country" className="finput" placeholder="Your email" />
                                    </FormGroup>
                                </div>


                                <div className="finput_box">
                                    <Label>Phone</Label>
                                    <FormGroup>                                                
                                        <Input type="text" id="phone" name="phone" className="finput" placeholder="Your email" />
                                    </FormGroup>
                                </div>
                                
                                <Button>
                                    Save And Pay
                                </Button>
                            </Form>
                        </div>
                    </div>
                </RegistrationWrapper>
        )
    }
}
export default Register;

const RegistrationWrapper = styled.div`

#left{
    padding:3rem;
    border-radius:15px;
    border: 2px solid;
    background-color: white;
    text-align:left;

}

#center{
    margin-left:3rem;
    margin-top:;
}
`