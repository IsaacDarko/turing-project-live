import styled from 'styled-components';
 
export const ButtonContainer = styled.button`
    text-transform: uppercase;
    width:170px;
    height:40px;
    background: transparent;
    color: #02ccaa;
    font-size: 1rem;
    font-family: Roboto;
    border-radius: 0.5rem;
    
    border-color:${props => 
        props.cart ? "#dba309":"white"};

    color:${ props => 
        props.cart ? "#dba309":"#02ccaa" }

    
    padding: 0.2rem 0.5rem;
    margin: 0.2rem 0.5rem;
    cursor: pointer;
    transition: all 0.5s ease-in-out;


  &:hover{
      background: #02ccaa;
      color: white;

      color:${ props => 
        props.cart ? "white":"#ffffff" };

      background:${ props => 
        props.cart ? "#dba309":"#02ccaa" };

  }
  &:focus{
      outline:none;
  }

`;