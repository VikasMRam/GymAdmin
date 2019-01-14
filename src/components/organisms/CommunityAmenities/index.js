import React from 'react';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { community as communityPropType } from 'sly/propTypes/community';
import { Paragraph } from 'sly/components/atoms';
import IconItem from 'sly/components/molecules/IconItem';
import CollapsibleBlock from 'sly/components/molecules/CollapsibleBlock';

const Wrapper = styled(CollapsibleBlock)`
  display: grid;
  grid-template-columns: 100%;
  grid-row-gap: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: 50% 50%;
    grid-column-gap: ${size('layout.gutter')};
  }
`;

const CommunityAmenities = ({ community }) => {
  const { propInfo } = community;
  const {
    communityHighlights = [],
    personalSpace = [],
    communitySpace = [],
    nonCareServices = [],
    languages = [],
  } = propInfo;
  const amenities = [
    ...communityHighlights,
    ...personalSpace,
    ...communitySpace,
    ...nonCareServices,
    ...languages,
  ];
  const amenitiesComponents = amenities.map(amenity => (
    <IconItem
      key={amenity}
      icon="check"
      iconPalette="slate"
      borderless={false}
    >
      {amenity}
    </IconItem>
  ));

  return (
    <section>
      {amenities.length === 0 &&
        <Paragraph>
          No information about amenities currently available
        </Paragraph>
      }
      <Wrapper minHeight="regular">
        {amenitiesComponents}
      </Wrapper>
    </section>
  );
};

CommunityAmenities.propTypes = {
  community: communityPropType.isRequired,
};

export default CommunityAmenities;
