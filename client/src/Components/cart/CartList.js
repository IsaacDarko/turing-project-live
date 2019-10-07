import React, { useState, useEffect } from "react";
import { CartItem } from './CartItem';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
 
export const CartList = ({value}) => {

    const [localCart, setLocalCart] = useState();

    const { cart } = value;
    console.log(value);

    useEffect(() => {
        const localcart = JSON.parse(localStorage.getItem('localcart'));
        setLocalCart(localcart);        
}, []);
        

    return localCart ? (
        
        <div className="container-fluid">

            { 
                cart.map(item => {
                return <CartItem key={item.product_id} item={item} value={value}/>
            }) }
            
        </div>
        
    ) : (
        <div>....Loading</div>
    )
}
