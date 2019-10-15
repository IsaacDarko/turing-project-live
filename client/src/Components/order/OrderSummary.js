import React from 'react';
import { 
    Table
} from 'reactstrap';
import OrderItem from './OrderItem'; 

export default function OrderSummary({ order, value}) {
    const { orders, currentOrder } = value;

    return ( 
         
        <React.Fragment>
                    <tbody>
                                   
                            { 
                                currentOrder.map(item => {
                                    return <OrderItem key={item.item_id} item={item} value={value}/>
                                }) 
                            }      
                        
                    </tbody>     
        </React.Fragment>
        
        
    )
}
