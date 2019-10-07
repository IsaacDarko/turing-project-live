import React, { useState, useEffect } from 'react';
import { Table,
    Form, Button, 
    FormGroup, Label, 
    Input, FormText
} from 'reactstrap';
import Regionator from './selectors/Regionator';
import Shipping from './selectors/Shipping';
import Selectax from './selectors/Selectax';
import Adder from './selectors/Adder';

const OrderFooter = ({value}) => {

    const [regionId, setRegionId] = useState(0);
    const [shippingMethod, setShippingMethod] = useState();
    const [tax, setTax] = useState();
    const { shipping, taxes, regions } = value;


    return (

        <React.Fragment>
                <thead>
                        
                </thead>

                <tbody>
                    <tr>                            
                        <td>
                            <Label>Shipping Region</Label>
                        </td>
                        <td>
                            <Regionator regions={regions} setRegionId={setRegionId} value={value} />                                    
                        </td>                            
                    </tr>

                    <tr>                            
                        <td>
                            <Label>Shipping Method/Types </Label>
                        </td>

                        
                        <td>
                            {
                            shipping.map( option => {                                        
                                return  (
                                    <Shipping value={value}  key={ option.shipping_id } option={option} setShippingMethod={setShippingMethod} />                                                                                            
                                )
                            })
                            
                            }                                    
                        </td>                            
                    </tr>                        

                    <tr>                            
                        <td>
                            <Label>Tax Type</Label>
                        </td>
                        <td>
                            {
                                 <Selectax value={value} /> 
                                
                            }
                            
                        </td>                            
                    </tr>

                    <tr>                            
                        <td>
                            <Label>Total Amount Due For Order</Label>
                        </td>
                        <td>
                            {
                                <Adder value={value} />
                            }
                            
                        </td>                            
                    </tr>
                            
                </tbody>
                
        </React.Fragment>
           
       
    )
}

export default OrderFooter
