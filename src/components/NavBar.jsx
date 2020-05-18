import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../logo.svg';
import { ButtonContainer, NavWrapper } from './Styled.jsx'

export default class NavBar extends Component{
    render(){
        return(
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                <Link to="/">
                    <img src={logo}  className="navbar-brand" alt="store"/>
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5">
                        <Link to='/'
                        className="nav-link">Products</Link>
                    </li>
                    <li className="nav-item ">
                        <Link to='/'
                        className="nav-link">||    contact me</Link>
                    </li>
                </ul>
              
 
               
                <Link to="/cart" className="ml-auto">
                    <ButtonContainer>
                    <span className="mr-2">
                        <i className="fas fa-cart-plus"/>
                        </span>
                        My Cart
                    </ButtonContainer>
                </Link>

            </NavWrapper>
        )
    }
}
