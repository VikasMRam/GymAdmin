import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette, size } from 'styled-theme'
import {UserButton} from "components";



const Nav = styled.nav`
  display: flex;
  list-style: none;
  > :not(:first-child) {
    margin-left: 1rem;
  }
  a {
    font-weight: 300;
    color: ${palette('grayscale', 2)};
    font-size: ${size('fsLg')};
    &.active {
      color: ${palette('grayscale', 0)};
      
    }
  }
`

const Logo = styled.a`
  background-image: url(/assets/footer_logo.png);
  background-size:cover;
  width: 120px;
  height: 60px; 
  
`

const PrimaryNavigation = (props) => {
  return (
    <Nav {...props}>
      <Logo href="/"/>
      <li><a href="/">Home</a></li>
      <UserButton {...props}/>
    </Nav>
  )
}

PrimaryNavigation.propTypes = {
  reverse: PropTypes.bool,
}

export default PrimaryNavigation
