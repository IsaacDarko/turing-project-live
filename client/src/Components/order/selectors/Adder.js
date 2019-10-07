import React, { useState, useEffect } from 'react';
import {Form, Button, 
    FormGroup, Label, 
    Input, FormText
} from 'reactstrap';


const Adder = ({value}) => {
    const { orderSummaryTotal } = value;

    return (
        <div>
            {
                orderSummaryTotal
            }
        </div>
    )
}

export default Adder;
