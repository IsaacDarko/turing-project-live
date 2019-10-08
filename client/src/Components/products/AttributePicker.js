import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';

export default function AttributePicker({ attribute, value }) {

    const { attribute_id, name } = attribute;
    //const [ attribute_value_id, {value : valueName } ] = value;
    const { getValues, setValue, values } = value;
    
    const captureId = (e) =>{       
        let id = e.target.id;
        if(id !== e.currentTarget.id) {
            e.stopImmediatePropagation();
        }
            getValues(id);
    }

    /*const lockIn = (e) =>{
        let id = e.target.id;
        captureId.off('mouseEnter', id);
    }*/

    
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
                        (e)=> setValue(e)
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

const AttributorWrapper = styled.div`
    .attribute-input{
        width:35%;
        float:right;
        margin-left:-4rem;
        margin-right:9rem;
    }

`