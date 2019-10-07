import React, { Component } from 'react';
import { ProductConsumer } from '../../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from '../styles/Button';
import Attributor from './Attributor';
import styled from 'styled-components';


 
class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
                productDetails:[],
                id:null,
                att: [],
                values: []
        };
      }


    

    render() { 
        return (
            <DetailWrapper>
                <ProductConsumer>
                    {value => {
                    const { product_id, inCart } = value.detailProduct;

                        const product_detail = JSON.parse(localStorage.getItem('currentdetails'));

                        const { name: saved_name,
                                image: saved_image,
                                image_2: saved_image2,
                                price: saved_price, 
                                discounted_price: saved_discounted_price, 
                                description: saved_description, 
                                inCart: saved_inCart } = product_detail;

                    return (
                        <div className="container py-5 ">
                                {/* Product details title */}

                                    <div className="row">
                                        <div className="col-10 mx-auto text-center my-5">
                                            <h1>{saved_name}</h1>
                                        </div>
                                    </div>

                                {/* End of product details title */}

                                {/* Product details body */}

                                <div className="row">

                                    {/* product details image */}
                                    <div className="img-container-main col-10 mx-auto col-md-6 my-3">

                                        {/*taking image1 from the backend db*/} <img className="img-main" src={saved_image} className="image-fluid" alt="product" />
                                        {/*taking image2 from the backend db*/} <img className="img-secondary" src={saved_image2} className="image-fluid" alt="product" />
                                    
                                    </div>

                                    {/* product details text */}
                                    <div className="col-10 mx-auto col-md-6 my-3 text-capitalie">

                                        {/*taking name from the backend db*/}
                                        <h2> {saved_name} </h2>

                                        {/*taking both prices from the db*/}
                                        <del> <span>$</span>{saved_discounted_price} </del>  <h4><span>$</span>{saved_price} </h4>


                                        <div>       
                                            <Attributor value={value} />                                                
                                        </div>
                                        {/*taking description from the backend db*/}
                                        <p className="text-capitalie font-weight-bold mb-0 mt-3">                                        
                                            Description :
                                        </p>


                                    


                                        <p className="text-muted lead">                                        
                                        {saved_description}
                                        </p>


                                        {/* buttons */}
                                        <div>
                                            <Link to="/">
                                                <ButtonContainer btp >
                                                    Back To Products
                                                </ButtonContainer>
                                            </Link>
                                            
                                                <ButtonContainer cart 
                                                disabled={ inCart? true:false } 
                                                onClick={(e)=>{                                                                                     
                                                    value.addToCart(product_id);                   
                                                    value.openModal(product_id);                                            
                                                    }                                               
                                                }>
                                                { inCart? "In Cart":"Add To Cart" }  
                                                </ButtonContainer>
                                        </div>   
                                    </div>
                                </div>


                        </div>
                    )
                    }} 
                    
                </ProductConsumer>
            </DetailWrapper>
            

            
        )
    }
}

export default Details;

const DetailWrapper = styled.div`
background-color: #70c8ff;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 2 1'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%2370c8ff'/%3E%3Cstop offset='1' stop-color='%23ffffff'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23b0e6ff' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23b0e6ff' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='2' y2='2'%3E%3Cstop offset='0' stop-color='%23b0e6ff' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23b0e6ff' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='2' height='1'/%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23b)' points='0 1 0 0 2 0'/%3E%3Cpolygon fill='url(%23c)' points='2 1 2 0 0 0'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;

.img-main{
    transition: all 0.5s linear;
    margin-right:2rem;
}

.img-secondary{
    width:100px;
    height:100px;
}

.img-container-main {
    position:relative;
    overflow: hidden;
}

.img-container-main:hover .img-main{
    transform: scale(1.5);
}

`
