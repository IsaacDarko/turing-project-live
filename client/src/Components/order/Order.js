import React, { Component } from 'react';
import Title from '../Title';
import OrderEmpty from './OrderEmpty';
import { ProductConsumer } from '../../context';
import OrderColumns from './OrderColumns';
import OrderSummary from './OrderSummary';
import OrderFooter from './OrderFooter';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Order extends Component {
    constructor(){
        super();
        this.state = {
            order:[],
            cart:[]
        }

    } 

    
    render() {
         return (
           <ProductConsumer>
                { value =>{
                    const { orders, culminate } = value;
                    if(orders.length > 0){
                        return(  
                            <OrderWrapper>
                                <section id="inner-wrapper">

                                    <Title name="Your" title="Order"/>
                                    <div id="header-wrapper" className="col-sm-10 order-sm-2 "> 
                                        <OrderColumns />
                                    </div>
                                    <Table hover id="summary-wrapper" className="col-sm-10 order-sm-2 ">                                                                      
                                        <OrderSummary value={value} />                                                                    
                                    </Table>


                                    <Table className="footer-wrapper col-sm-6 order-sm-2 offset-sm-4 mt-5">
                                        <OrderFooter value={value} /> 
                                    </Table> 
                                    <div>
                                        <Link to="/checkout" className="nav-link">
                                            <Button success>
                                                Checkout
                                            </Button>
                                        </Link>                                    
                                    </div>
                                </section>                                                       
                           </OrderWrapper>                                             
                        )
                    }
                    else{
                        return(
                            <React.Fragment>
                                <OrderEmpty />
                            </React.Fragment>
                        );
                    }
                }}
                    
            </ProductConsumer>
        )
    }
}
export default Order;

const OrderWrapper = styled.section `
    font-family: 'Roboto', sans-serif;
    background-color: #296caa;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 2 1'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23296caa'/%3E%3Cstop offset='1' stop-color='%23ffffff'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%237aaa88' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%237aaa88' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='2' y2='2'%3E%3Cstop offset='0' stop-color='%237aaa88' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%237aaa88' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='2' height='1'/%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23b)' points='0 1 0 0 2 0'/%3E%3Cpolygon fill='url(%23c)' points='2 1 2 0 0 0'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
  
   #clsbtn {
     float: right;
   }

    #inner-wrapper {
      background-color: rgba(223,223,223,0.5);
      padding-top:5rem;
    }

    #header-wrapper{
        margin-left:2rem;
    }

    #summary-wrapper{
      margin-left:5rem;
      background-color: rgba(255,255,255,0.7);
      border: 2px solid ;
      border-radius: 5px;
    }

    #footer-wrapper {
      font-family: 'Permanent Marker', cursive !important;
      margin-top:4rem;
      border: 2px solid ;
      border-radius: 4px;
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