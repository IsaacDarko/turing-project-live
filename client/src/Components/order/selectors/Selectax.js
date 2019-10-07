import React from 'react';
import {Form, Button, 
    FormGroup, Label, 
    Input, FormText
} from 'reactstrap';
import Opxions from './Opxions';

const Selectax = ({ value }) => {
   const { taxes } = value;
        return (
            <div>
                <Form>
                    <FormGroup>
                        { 
                            taxes.map(tax =>{
                                return <Opxions key={ tax.tax_id } value={value} tax={tax} />
                            })
                        }
                        
                    </FormGroup>
                </Form>  
            </div>
     )
    
}
export default Selectax;
