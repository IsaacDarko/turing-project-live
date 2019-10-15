import React, { Component } from 'react';
import { ProductConsumer } from '../../context';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class CheckoutModal extends Component {
  constructor() {
    super();
    this.state = {
              stripe: null
            };
  }


  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: window.Stripe('pk_test_r9akatg88nMIYHNCALXBd9yA')});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: window.Stripe('pk_test_r9akatg88nMIYHNCALXBd9yA')});
      });
    }
  }


    render() {
        return (   
          <StripeProvider apiKey="pk_test_r9akatg88nMIYHNCALXBd9yA">
            <Elements>
              <ProductConsumer>
                    { (value) => {
                        const { checkoutOpen } = value; 

                        if( !checkoutOpen ){
                           return null;
                        }
                        else{
                            return <CheckoutForm value={value} />                   
                                        
                        } 
                          
                    }}
              </ProductConsumer>
            </Elements>                  
          </StripeProvider>
        )
    }
}
export default CheckoutModal;
