import React from 'react';
import styled from 'styled-components';

export default function OrderItem({value, item}) {

    const { product_name, quantity, unit_cost, total_amount, auth_code, reference, customer_id, order_id } = item;

    return ( 
        <OrderItemWrapper>

                        <td id="id-cell" className="cells">
                          <span>
                             { order_id }
                           </span>
                        </td>

                        <td id="name-cell" className="cells">
                          <span>
                              { product_name }
                           </span>
                        </td>

                        <td id="cost-cell" className="cells">
                           <span>
                              { unit_cost }
                           </span>
                        </td>

                        <td id="quant-cell" className="cells">
                           <span>
                              { quantity }
                           </span>
                        </td>

                        <td id="ref-cell" className="cells">
                           <span>
                              { reference }
                           </span>
                        </td>

                        <td id="auth-cell" className="cells">
                           <span>
                              { auth_code }
                           </span>                               
                        </td>
                

        </OrderItemWrapper>
            
        
    )
}

const OrderItemWrapper = styled.tr`
.cells{
  width:100px;
  margin-right:3rem;
  margin-left: 2rem;
}


#id-cell{
   width:70px;
   margin-right:1rem;
   margin-left:1rem;
}

#name-cell{
   width:250px;
   margin-right:3rem;
   text-align:center;
}

#cost-cell{
   width:200px
   margin-right:2rem;
}

#quant-cell{
   width:130px
  
}

#ref-cell{
   width:200px
   margin-right:3rem;
}

#auth-cell{
   width:200px
}

`