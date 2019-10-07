import React, { Component } from 'react';
import { ProductConsumer } from '../../context';
import { ButtonContainer } from '../styles/Button';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import Attributor from './Attributor';


class Modal extends Component {
    render() {
        return (
            <ProductConsumer>
                { (value) => {
                    const { modalOpen, closeModal } = value;
                    const { image, discounted_price, name  } = value.modalProduct;
                    


                    if(!modalOpen){
                        return null;
                    }
                    else{
                        return(
                            <ModalWrapper>
                                <div className="container">
                                    <div className="row">
                                        <div id="modal" className="col-10 mx-auto col-md-7 col-lg-5 text-center text-capitalize p-5">
                                            <h4>Item Added To Cart</h4>
                                            <div className="container">
                                            <img src={image} className="image-fluid" alt="product" />
                                            </div>
                                            <h4> {name} </h4>

                                            <div>
                                                <Attributor value={value} />
                                            </div>

                                            <h5 className="text-muted"> ${discounted_price} </h5>   
                                            <Link to="/">
                                                <ButtonContainer onClick={ () => closeModal()}>
                                                    Continue
                                                </ButtonContainer> 
                                            </Link>
                                            <Link to="/cart">
                                                <ButtonContainer cart onClick={ () => closeModal()}>
                                                    Go To Cart
                                                </ButtonContainer>
                                            </Link>                                        
                                        </div>
                                    </div>
                                </div>
                            </ModalWrapper>
                        )

                    }
                }}
            </ProductConsumer>
        )
    }
}
export default Modal;

const ModalWrapper = styled.div `
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,0.3);
    display:flex;
    align-items:center;
    justify-content: center;
    #modal{
        background-color:white;
    }
`

