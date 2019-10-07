import React, { Component }  from 'react';
import {Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Privatize from './Components/Privatize';
import Navigation from './Components/Navbar';
import Productlist from './Components/products/Productlist';
import Cart from './Components/cart';
import Details from './Components/products/Details';
import Modal from './Components/products/modal';
import Order from './Components/order';
import Default from './Components/Default';
import Login from './Components/authsystem/Login';
import Catalogue from './Components/pages/Catalogue';
import ShippingRegions from './Components/pages/ShippingRegions';
import PrivacyPolicy from './Components/pages/PrivacyPolicy';
import SpecialOffers from './Components/pages/SpecialOffers';
import Checkout from './Components/checkout/Checkout';
import CheckoutModal from './Components/checkout/CheckoutModal';
//import Pagination from './Components/Paginator';
 

class App extends Component {
  constructor() {
    super();
    this.state = {
              loading: true,
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
        this.setState(()=>{
          return { loading: false }
        })
      });
    }
  }

  render(){
      return (
        
        <React.Fragment>          
            <div className="App">
              <Navigation />
                <Switch>
                
                  <Route exact path="/" component={Productlist} />
                  <Route path="/details" component={Details} />
                  <Route path="/products/:page" component={Productlist} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/catalogue" component={Catalogue} />
                  <Route path="/shipping-regions" component={ShippingRegions} />
                  <Route path="/special-offers" component={SpecialOffers} />
                  <Route path="/privacy-policy" component={PrivacyPolicy} />
                  <Route path="/login" component={Login} />
                  <Route path="/order-summary" component={Privatize(Order)} />
                  <Route path="/checkout" component={Checkout} />
                  <Route component={Default} />

                </Switch>
                
                    <CheckoutModal />
                 
                
                <Modal />
                
            </div>
            
        </React.Fragment>
       
      )}
      
  }


export default App;
