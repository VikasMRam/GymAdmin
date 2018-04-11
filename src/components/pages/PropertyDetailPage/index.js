import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import PropertyDetailContainer from 'sly/containers/PropertyDetailContainer';
import ConciergeContainer from 'sly/containers/ConciergeContainer';

const PageWrapper = styled.div`

`;


const PropertyDetailPage = ({ propertySlug }) => {  
  return (
    <PageWrapper>
      <PropertyDetailContainer propertySlug={propertySlug} />
      <ConciergeContainer propertySlug={propertySlug} />
    </PageWrapper>
  );
};

PropertyDetailPage.propTypes = {
  propertySlug: string.isRequired,
};

export default PropertyDetailPage;
