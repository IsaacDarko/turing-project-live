import React from 'react';
import {Form, Button, 
    FormGroup, Label, 
    Input, FormText
} from 'reactstrap';
import RegionList from './RegionList';


const Regionator = ({option, regions, value}) => {
    const { getMyShippingMethods, getMyTaxPrice } = value;

    const retrieveId = (e) =>{
        const id = e.target.value;
        getMyShippingMethods(id);
        getMyTaxPrice(id);
    }

    return (
       <React.Fragment>
            <Form>
                <Input type="select" name="shipping_region" id="region"
                        onChange={
                            (e) => retrieveId(e)

                        } >
                            {
                                regions.map(region =>{
                                    return <RegionList key={region.shipping_region_id}  region={region} />                      
                                })
                            }
                </Input> 
            </Form>
         
                                                                                              
       </React.Fragment>
    )
}

export default Regionator
