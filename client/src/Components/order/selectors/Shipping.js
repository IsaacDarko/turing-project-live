import React from 'react';
import {Form, Button, 
    FormGroup, Label, 
    Input, FormText
} from 'reactstrap';

const Shipping = ({ option, setShippingMethod, value }) => {
    const { shipping_id, shipping_type, shipping_cost, shipping_region_id } = option;
    return (    
        <Form>
            <FormGroup>            
                <Label check>
                    <Input type="radio" value={shipping_type}  onChange={({ target })=>setShippingMethod(target.value)} />
                    { shipping_type } 
                </Label>
            </FormGroup>
        </Form> 
        
     
    )
}

export default Shipping
