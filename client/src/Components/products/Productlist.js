import React, { Component } from 'react';
import Title from '../Title';
import {ProductConsumer} from '../../context';
import axios from 'axios';
import Product from './Product';
import styled from 'styled-components';
import Paginator from '../Paginator';
import { 
    Container,
    ListGroup, 
    Spinner
} from 'reactstrap';
import Searchbar from '../Searchbar';
 
const Productlist = () => {


      const onChange = event => {
        this.setState({ query: event.target.value });
      };


      const onSearch = event => {
        event.preventDefault();
        const { query } = this.state;
        if (query === '') {
          return;
        }
        axios.get('' + query)
          .then(response => response.json())
          .then(result => this.onSetResult(result, query));
      };

      const onSetResult = (result, key) => {
        this.setState({ hits: result.hits });
      };

      

       
      return ( 
                
        <React.Fragment>  
            
            <ProductListWrapper>
            <Container> 
                 <Searchbar/>
                  <div className="py-5">
                    <div className="container">
                        <Title name="Turing" title="Products"/>
                            <div className="row">
                                <ListGroup >
                                    <div className="row">

                                        <ProductConsumer>   
                                            { value =>{    
                                                return value.products.map(product =>{
                                                    return <Product key={product.product_id} product={product} /> 
                                                });                                  
                                                    
                                            }} 
                                        </ProductConsumer>
                                     
                                    </div>  
                                </ListGroup>
                            </div>                       
                    </div> 
                    
                        <ProductConsumer>     
                          {value =>{
                            return <Paginator value={value} />
                          } } 
                        </ProductConsumer>
                   
                </div>
              </Container>
            </ProductListWrapper>
                               
            </React.Fragment>

        )
    }



export default Productlist;

const ProductListWrapper = styled.div `
background-color: #70c8ff;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 2 1'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%2370c8ff'/%3E%3Cstop offset='1' stop-color='%23ffffff'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23b0e6ff' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23b0e6ff' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='2' y2='2'%3E%3Cstop offset='0' stop-color='%23b0e6ff' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23b0e6ff' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='2' height='1'/%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23b)' points='0 1 0 0 2 0'/%3E%3Cpolygon fill='url(%23c)' points='2 1 2 0 0 0'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;

.container{
  background-color:rgba(225,225,225,0.2);
}
`
