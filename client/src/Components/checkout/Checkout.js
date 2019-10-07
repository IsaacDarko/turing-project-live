import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Container, Card, CardTitle, CardText, Row, Col, Label } from 'reactstrap';
import { ProductConsumer } from '../../context';
import styled from 'styled-components';
import Title from '../Title';

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            stripe: null,
            modal: false
        };
      } 
 

      componentDidMount() {
        if (window.Stripe) {
          this.setState({stripe: window.Stripe("pk_test_r9akatg88nMIYHNCALXBd9yA")});
        } else {
          document.querySelector('#stripe-js').addEventListener('load', () => {
            // Create Stripe instance once Stripe.js loads
            this.setState({stripe: window.Stripe("pk_test_r9akatg88nMIYHNCALXBd9yA")});
          });
        }
      }

    render() {
        const customer = JSON.parse(localStorage.getItem('customer'));
        const { name, email, credit_card, address_1, address_2, city, postal_code, country, day_phone, eve_phone, mob_phone } = customer;
      
        return (
            <ProductConsumer>
                {
                    (value) => {
                        const{ openCheckoutModal, closeCheckoutModal } = value;
                        return(
                            <CheckoutWrapper>
                                <Container className=" py-5 inner-wrapper" onClick={ () => closeCheckoutModal() } >
                                    <Title name="Customer" title="Checkout"/>  
                                    <div id="right" className="col-6 ml-7 mr-2 my-5 offset-6 position-absolute render-box">
                                        <div>
                                        <h4 className="personalheader">Customer Details</h4>
                                        <Row>
                                            <Col sm="6">
                                                <Card body className="info-cards">
                                                    <CardTitle>Personal Information</CardTitle>

                                                    <CardText>

                                                        <div>
                                                            <span>Name :  {name}</span>
                                                        </div>
                                                            
                                                        <div>
                                                            <span>Email :  {email}</span>
                                                        </div>

                                                        <div>
                                                            <span>Address 1 :  {address_1}</span>
                                                        </div>

                                                        <div>
                                                            <span>Address 2 :  {address_2}</span>
                                                        </div>

                                                        <div>
                                                            <span>City :  {city}</span>
                                                        </div>

                                                        <div>
                                                            <span>Zip Code:  {postal_code}</span>
                                                        </div>

                                                        <div>
                                                            <span>Country :  {country}</span>
                                                        </div>
                                                        
                                                        <div>
                                                            <span>Phone :  { mob_phone }</span>
                                                        </div>                                                                                                      
                                                        
                                                    </CardText>
                                                
                                                    </Card>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col sm="6">
                                                    <Card body className="info-cards">
                                                    <CardTitle>Payment Details</CardTitle>

                                                    <CardText>
                                                        <div>   
                                                            {
                                                                credit_card
                                                            }   
                                                        </div>                                                
                                                    </CardText>
                                                    </Card>
                                                </Col>
                                            </Row>

                                        </div>
                                        <Button id="proceedbtn" onClick={ () => openCheckoutModal()}>
                                            Continue to Pay With Stripe
                                        </Button>
                                    </div>



                                    <div><h2 className="billingheader pt-3">Billing Address</h2></div>

                                    <div id="left" className="col-6 mr-1 ml-4 my-5 render-box">                                    
                                        <Form>

                                            <div>
                                                <FormGroup>                                                
                                                    <Label>Name</Label>
                                                    <Input type="text" id="full-name" name="full-name" className="finput" placeholder="Your full name" />                                            
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
                                                    <Input type="text" id="email" name="email" className="finput" placeholder="Your email" />
                                                </FormGroup>
                                            </div>                                            


                                            <div>
                                                <FormGroup>
                                                    <Label>Alternative Address</Label>
                                                    <Input type="text" id="email" name="email" className="finput" placeholder="Your email" />
                                                </FormGroup>
                                            </div>                                            


                                            <div>
                                                <FormGroup>
                                                    <Label>City/Town</Label>
                                                    <Input type="text" id="email" name="email" className="finput" placeholder="Your email" />
                                                </FormGroup>
                                            </div>
                                            

                                            <div>
                                                <FormGroup>
                                                    <Label>Zip</Label>
                                                    <Input type="text" id="email" name="email" className="finput" placeholder="Your email" />
                                                </FormGroup>
                                            </div>
                                            


                                            <div>
                                                <FormGroup>
                                                    <Label>Country</Label>
                                                    <Input type="text" id="email" name="email" className="finput" placeholder="Your email" />
                                                </FormGroup>
                                            </div>
                                            


                                            <div className="finput_box">
                                                <Label>Phone</Label>
                                                <FormGroup>                                                
                                                    <Input type="text" id="email" name="email" className="finput" placeholder="Your email" />
                                                </FormGroup>
                                            </div>
                                            
                                            <Button onClick={ () => openCheckoutModal() }>
                                                Save And Pay
                                            </Button>
                                        </Form>
                                    </div>
                                </Container>
                            </CheckoutWrapper>
                        ) 
                    }
                }
               
            </ProductConsumer>
            
            
        )
    }
}
export default Checkout;

const CheckoutWrapper = styled.div `
    width:100%
    padding: 0px;
    margin: 0px;
    font-family: 'Ubuntu', sans-serif;
    background-color:#ff7700;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23cc0000' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23aa0000' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23d6002b' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23b10022' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d9004b' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23b2003d' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23d3006c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23ac0057' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23c4008c' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%239e0071' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23aa00aa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23880088' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;

    .inner-wrapper{
        width:100%;
        background-color: rgba(0,0,0,0.4);        
    }

    .info-cards{
        border-radius:10px;
        border: 2px solid;
        margin-bottom: 2rem;
        background-color: rgba(224,224,224,0.5);
    }

    .billingheader{
        margin-left:3rem;
        margin-bottom:2rem;
    }

    #proceedbtn{
        margin-right:20rem;
    }

    #left{
        padding:3rem;
        border-radius:15px;
        border: 2px solid;
        background-color: rgba(224,224,224,0.4);
        text-align:left;

    }



    .personalheader{
        margin-right:20rem;
    }

    .finput_box{
        display: inline;
    }

    .finput{
        width:85%;
    }

   #checkout{
     background-color:white;
     border-radius: 7px;
     height:50%;
   }

   #paybtn{
     border-radius:7px;
     width: 100%;
     height: 15%
     margin-top: 2rem;
     background-color: #4f0861
     color:white

      &:hover{
          background: #d630ff;
          color: white;
        }
   }
`