import React, { useState, useEffect } from "react";

export const CartItem = ({item, value}) => {
    
    const { product_id, name, image, discounted_price, total, count } = item;
    const { increment, decrement, removeItem } = value;
    
    return (
        
        <div className="row my-1 text-capitalize text-center"> {/* the individual row containing the details of each item added to the cart */}
            <div className="col-10 mx-auto col-lg-2 my-3">
                <img src={image} 
                style={{ width:"5rem", height:"5rem" }}
                className="image-fluid"
                alt="product-img" 
                />
            </div>

            <div className="col-10 mx-auto col-lg-2 pt-2 my-3">
                <span>product: </span> {name}
            </div>

            <div className="col-10 mx-auto col-lg-2 pt-2 my-3">
                <span>price: </span> {discounted_price}
            </div>

            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0 pt-3 my-3">
                <div className="d-flex justify-content-center">
                    <div>
                        <span className="btn btn-black mx-1" 
                        onClick={()=>decrement(product_id)}>-</span>

                        <span>{count}</span>

                        <span className="btn btn-black mx-1" 
                        onClick={()=>increment(product_id)}>+</span>
                    </div>
                </div>
            </div>

            {/* the trash icon button / Delete item button */}
            <div className="col-10 mx-auto col-lg-2 pt-2 my-3">
                <div className="trash-button">
                    <i className="fas fa-trash" onClick={()=>removeItem(product_id)}/>
                </div> 
            </div>

            <div className="col-10 mx-auto col-lg-2 pt-2 my-3">
               <strong> Item Total : ${parseFloat(total).toFixed(2)} </strong>
            </div>
           
        </div>
    )
}
