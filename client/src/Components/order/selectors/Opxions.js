import React from 'react';
import {Form, Button, 
    FormGroup, Label, 
    Input, FormText
} from 'reactstrap';

const Opxions = ({value, tax}) => {
    return (
        <Label>
            <Input type="radio" name="radio1" />{tax.tax_type}
        </Label>
    )
}

export default Opxions
