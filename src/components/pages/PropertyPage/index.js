// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react';
import {
  PrimaryNavigation,
  Heading,
  BreadCrumb,
  BannerImage,
  RgsSection,
} from 'components';
import styled from 'styled-components';
import { ConversionForm } from 'containers';

const Column = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
  grid-auto-rows: minmax(100px, auto);
  #main {
  }
`;

const PropertyPage = (props) => {
  // TODO Read this from where?
  // define helper on ui side .. that splits url
  //
  const bcs = [
    { label: 'Home', path: '' },
    { label: 'Assisted Living', path: 'assisted-living' },
    { label: 'California', path: 'california' },
    { label: 'San Francisco', path: 'san-francisco' },
  ];
  return (
    <div>
      <PrimaryNavigation {...props} />
      {props.detail && (
        <BreadCrumb bcs={bcs} curr={{ label: props.detail.name, path: '' }} />
      )}
      <Wrapper>
        {props.detail && (
          <Column id="main">
            <BannerImage
              src={props.detail.mainImage}
              alt={`Main Image for${props.detail.name}`}
            />
            <Heading>{props.detail.name}</Heading>
            <RgsSection heading="Description" {...props} />
            <RgsSection heading="Care Services" {...props} />
            <RgsSection heading="Amenities" {...props} />
            <RgsSection heading="Inspection Report" {...props} />
            <RgsSection heading="Reviews" {...props} />
            <RgsSection heading="Questions" {...props} />
          </Column>
        )}
        <Column>
          <ConversionForm {...props} />
        </Column>
      </Wrapper>
    </div>
  );
};

export default PropertyPage;
