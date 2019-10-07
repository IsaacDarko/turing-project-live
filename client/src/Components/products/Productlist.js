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
background-color: #e5f8ff;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23cc0000' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23aa0000' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23d6002b' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23b10022' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d9004b' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23b2003d' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23d3006c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23ac0057' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23c4008c' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%239e0071' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23aa00aa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23880088' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;

.container{
  background-color:rgba(225,225,225,0.2);
}
`
