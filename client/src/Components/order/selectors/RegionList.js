import React from 'react';
import {Form, Button, 
    FormGroup, Label, 
    Input, FormText
} from 'reactstrap';


export const RegionList = ({region}) => {
    return (
            <option value={region.shipping_region_id}>
                { region.shipping_region }
            </option>
       
    )
}

export default RegionList;
