import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { Button } from 'reactstrap';
import styled from 'styled-components';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch("/stripe/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });

  if (response.ok) console.log("Purchase Complete!")
  }

  render() {
    const { closeCheckoutModal } = this.props.value;
    return (
      <ModalWrapper>
        <div id="checkout" className="col-6 mx-auto col-md-4 col-lg-3 text-center text-capitalize pt-5"> 
            <Button id="clsbtn"><i className="fas fa-times" onClick={()=>closeCheckoutModal()}/></Button>
            <h6>Would you like to complete the purchase?</h6>

              <div id="card_element">
                <CardElement />
              </div>
              
            <button id="paybtn" onClick={this.submit}>Purchase</button>
        </div>
      </ModalWrapper>
      
    );
  }
}

export default injectStripe(CheckoutForm);

const ModalWrapper = styled.div `
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,0.6);
    display:flex;
    align-items:center;    
    justify-content: center;

   #checkout{
     border: 2px solid;
     border-radius: 7px;
     height:50%;
     background-color: #a3ffd3;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%23a3ffd3' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%2399eec5' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%238fddb8' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%2384cdaa' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%237bbd9d' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%2371ad90' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23679d83' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%235e8e76' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23547e6a' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%234b705e' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23426152' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23395346' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%2331453b' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23283830' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23202b26' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23181f1b' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%230f1311' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23000000' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
      background-attachment: fixed;
      background-size: cover;

    }

   #clsbtn{
     float: right;
   }

    #card_element{
      background-color:white;
      padding-top:1rem;
      margin-top:4rem;
      height:20%;
      border: 1px solid #8c3b4d;
      border-radius: 7px;
    }

   #paybtn{
     border-radius:7px;
     width: 100%;
     height: 15%
     margin-top: 2rem;
     background-color: #4f0861;
     color:white;

      &:hover{
          background: #d630ff;
          color: white;
        }
   }
`


