// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import {PrimaryNavigation} from 'components'
import styled from 'styled-components'

const Column = styled.div`
  flex: 1;  
`;

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  @media(min-width:768px){
   flex-direction:row;
  }
`;

const PropertyPage = ({ ...props}) => {
  return (
    <div>
    <PrimaryNavigation {...props}/><Wrapper>
      {props.detail && <Column>This is new {props.detail.name}</Column>
      }
        <Column>Second new column</Column>

    </Wrapper>
    </div>
  )
}

export default PropertyPage
