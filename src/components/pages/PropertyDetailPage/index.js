import React from 'react';
import styled from 'styled-components';
import { string, object } from 'prop-types';

import { size } from 'sly/components/themes';
import PropertyDetail from 'sly/components/organisms/PropertyDetail';
import ConciergeContainer from 'sly/containers/ConciergeContainer';

const PageWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};  
  }
  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: calc(${size('layout.mainColumn')} + ${size('layout.sideColumn')});
  }
`;

const Main = styled(PropertyDetail)`
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};  
  }
`;

const Column = styled(ConciergeContainer)`
  display: none;
  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: ${size('breakpoint.sizeColumn')}; 
    display: block;
  }
`;

const PropertyDetailPage = ({ propertySlug, property, userActions }) => {  
  return (
    <PageWrapper>
      <Main propertySlug={propertySlug} property={property} />
      <Column propertySlug={propertySlug} property={property} userActions={userActions} />
    </PageWrapper>
  );
};

PropertyDetailPage.propTypes = {
  propertySlug: string.isRequired,
  property: object.isRequired,
  userActions: object.isRequired,
};

export default PropertyDetailPage;
