import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../logo.png';
import {
    Collapse,
    NavbarToggler,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import styled from 'styled-components';
import {ButtonContainer} from './styles/Button';

export default class Navigation extends Component {
      constructor() {
        super();
    
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
          isOpen: false
        };
      }


      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      logout(e) {
        //e.preventDefault()
        localStorage.removeItem('xauthtoken');
        this.props.history.push('/')
      }
        

      render() {

        const loginRegLinks = (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Sign In
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <Link to="/login">
                        Login
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="/register">
                        Register
                        </Link>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        <Link to="/admin">
                        Admin
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
        )


        const userLinks =(
                  <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        My Account
                      </DropdownToggle>
                      <DropdownMenu right>
                        <Link to="/order-summary">
                          <DropdownItem>
                            Orders
                          </DropdownItem>
                        </Link>
                        <a href="" onClick={ this.logout.bind(this) }>
                          <DropdownItem>
                            Logout                          
                          </DropdownItem>
                          </a>                 
                      </DropdownMenu>
                    </UncontrolledDropdown>
        )

        return (
            <Navbar color="dark" className="navbar navbar-expand-sm navbar-dark">
              <NavbarBrand href="/">
                <img id="brand" src={logo} alt="Turing Store" />
              </NavbarBrand>

              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>

              <Nav className="ml-5 align-items-center" navbar>
                    <NavItem>
                        <Link to="/catalogue" className="nav-link">                                    
                            Catalogue     
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/shipping-regions" className="nav-link">                                    
                            Shipping Regions     
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/special-offers" className="nav-link">                                    
                            Special Offers     
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/privacy-policy" className="nav-link">                                    
                            Privacy Policy     
                        </Link>
                    </NavItem>

                   
                </Nav>

               
                <Nav className="ml-auto" navbar>

                   <Link to="/cart" className="ml-auto"> 
                        <ButtonContainer>
                          <span className="mr-2">
                              <i className="fas fa-cart-plus" />
                            </span>
                               Cart
                        </ButtonContainer>
                    </Link>    

                {localStorage.xauthtoken ? userLinks : loginRegLinks}  

                </Nav>
              </Collapse>
            </Navbar>
          
        );
      }
}
