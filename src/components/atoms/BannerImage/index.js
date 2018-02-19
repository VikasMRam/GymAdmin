import React from 'react'
import styled from 'styled-components'

const BImage = styled.img`
  width:327px;
  height:
  cursor:pointer; 
  @media(min-width:768px){
    width:720px;
  }
  @media(min-width:1048px){
    width: 696px;
    height:420px;
  }
`;

const BannerImage = (props) => {
  return <BImage src={props.src} alt={props.alt}/>
};




export default BannerImage ;
