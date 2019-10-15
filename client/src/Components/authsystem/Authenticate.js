import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import BackgroundImage from './BackgroundImage';
import Register from './Register';
import Login from './Login';
import { Link, withRouter } from 'react-router-dom';

import styled from 'styled-components';

export default class Authenticate extends Component {
    constructor(){
        super()
        
        this.state = {
            isLogin : true
        }
    }

    render() {
       
        const authToggler = () =>{
            let page = this.props.location.pathname.substr(1);
            if (page !== 'login'){
                this.setState(()=>{
                    return { isLogin:false }
                })
            }
        } 

               
        const currPage = this.state.isLogin;


        return currPage ? (
            
            <div>
                <ReactCSSTransitionGroup transitionName="background" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
                    <Login page={this.page} key={this.page} />
                    <div id="inlogin" className="toggle_button">
                        <button className="highligted">Login</button><Link to="/register"><button onClick={ ()=> authToggler()}>Register</button></Link>
                    </div>
                </ReactCSSTransitionGroup>                
            </div>
        ):(
            <div>
                <ReactCSSTransitionGroup>
                    <Register page={this.page} key={this.page} />
                    <div id="inlogout" className="toggle_button">
                    <Link to="/login"><button>Login</button></Link><button className="highligted">Register</button>
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}
