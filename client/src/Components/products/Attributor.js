import React, { Component } from 'react';
import AttributePicker from './AttributePicker';
import { Form } from 'reactstrap';
import axios from 'axios';

export default function Attributor({value}) {

        const { attributes, values } = value;

        return (
                <Form> 
                    {
                        attributes.map((attribute) => {
                            return <AttributePicker key={attribute.attribute_id} attribute={attribute} value={value} />
                        })
                        
                    }                     
                    
                </Form> 
                   
        )
    }

