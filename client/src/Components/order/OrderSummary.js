import React from 'react';
import { 
    Table
} from 'reactstrap';
import OrderItem from './OrderItem'; 

export default function OrderSummary({value}) {
    const { orders } = value;

    return (
         
        <React.Fragment>
                    <tbody>
                                   
                            { 
                                orders.map(item => {
                                    return <OrderItem key={item.product_id} item={item} value={value}/>
                                }) 
                            }      
                        
                    </tbody>     
        </React.Fragment>
        
        
    )
}
