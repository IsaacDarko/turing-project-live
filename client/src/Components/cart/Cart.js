import React, { Component } from 'react'
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import { ProductConsumer } from '../../context';
import { CartList } from './CartList';
import CartTotals from './CartTotals';
import styled from 'styled-components';

class Cart extends Component {

    render() {
        return (
            <ProductConsumer>
                { value =>{
                    const { cart } = value;
                    if(cart.length > 0){
                        return(                            
                            <React.Fragment>
                                <CartWrapper>  
                                    <section>
                                        <div className="inner-wrapper">
                                            <Title name="Your" title="Cart"/> 
                                            <CartColumns />
                                            <CartList value={value} />  
                                            <CartTotals value={value} />  
                                        </div>       
                                    </section>
                                </CartWrapper>
                            </React.Fragment>
                        );
                    }
                    else{
                        return(
                            <React.Fragment>
                                <CartWrapper>
                                <EmptyCart />
                                </CartWrapper>    
                            </React.Fragment>
                        );
                    }
                }}
                    
            </ProductConsumer>
            
            
        )
    }
}
export default Cart;

const CartWrapper = styled.div `
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23cc0000' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23aa0000' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23d6002b' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23b10022' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d9004b' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23b2003d' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23d3006c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23ac0057' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23c4008c' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%239e0071' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23aa00aa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23880088' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;

    .inner-wrapper{
        width:75%;
        background-color:rgba(223,223,223,0.7);
        margin:auto;
    }

`

