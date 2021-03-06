import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


export default function Privitize( ComponentToProtect ) {  
    return   class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }    
    
    
    componentDidMount() {
      const token = localStorage.getItem('xauthtoken');
      const options = {
          headers: {'xauthtoken': token}
      }
            
      axios.get('/customers/checkToken',options)
      .then(res => {
        if (res.status === 200) {
          this.setState(()=>{
            return { loading: false }
          })
        } else {
          const error = new Error(res.error);
            throw error;
          }
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false, redirect: true });
      });
    }    
      
      render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      )
    }
  }}