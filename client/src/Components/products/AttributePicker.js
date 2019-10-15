import React, { useState, useEffect } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';

const AttributePicker = ({ attribute, value }) => {

    const [triggeredFirst, setTrigeredFirst] = useState(false);
    const [triggeredSecond, setTrigeredSecond] = useState(false);

    const { attribute_id, name } = attribute;
    //const [ attribute_value_id, {value : valueName } ] = value;
    const { getValues, setValue, values } = value;
    
    const captureId = (e) =>{       
        let id = e.target.id;
        if(id == e.currentTarget.id) {
            e.stopPropagation();
        }
            getValues(id);
            
    }

    const stopCapture = (e) => {
       e.target.removeEventListener('mouseEnter', captureId, false);
    } 
    
    return (
        <AttributorWrapper>
        <div>
            <FormGroup>
                <Label >{name}</Label>
                    <Input className="attribute-input" id={attribute_id} type="select" 
                    onMouseEnter={                       
                        (e) =>{
                            captureId(e);
                            }
                    }
                    onChange={
                        (e)=> {
                            setValue(e);
                        }
                    }>

                        {
                            values.map(value =>{
                                return <option key={value.attribute_value_id} value={value.value}>
                                {value.value}
                                </option>        
                            })
                        }
                    </Input>
            </FormGroup>
        </div>
        </AttributorWrapper>
    )
}
export default AttributePicker;

const AttributorWrapper = styled.div`
    .attribute-input{
        width:35%;
        float:right;
        margin-left:-4rem;
        margin-right:9rem;
    }

`