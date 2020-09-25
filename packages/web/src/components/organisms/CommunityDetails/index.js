import React from 'react';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { community as communityPropType } from 'sly/common/propTypes/community';
import { Paragraph, Block } from 'sly/common/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import CollapsibleBlock from 'sly/web/components/molecules/CollapsibleBlock';

const Wrapper = styled(CollapsibleBlock)`
  display: grid;
  grid-template-columns: 100%;
  grid-row-gap: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: 50% 50%;
    grid-column-gap: ${size('layout.gutter')};
  }
`;

const groupKeys = [
  'communityHighlights',
  'careServices',
  'nonCareServices',
  'personalSpace',
  'communitySpace',
];

const groupTitles = {
  communityHighlights: 'Community Highlights',
  careServices: 'Care Services',
  personalSpace: 'Amenities',
  communitySpace: 'Community Space',
  nonCareServices: 'Non-Care Services',
};

const groupItemIcons = {
  'Recently removated': 'community-size-large',
  'Family-owned and operated': 'family',
  'Medication management': 'care',
  'Meal preparation and service': 'food',
  'Transportation arrangement': 'transportation',
  '24-hour supervision': 'security',
  '24-hour call system': 'phone',
  'Coordination with health care providers': 'care',
  'Housekeeping and linen services': 'laundry',
  'Fitness programs': 'fitness',
  'Community-sponsored activities': 'family',
  'Move-in coordination': 'luggage',
  'Planned day trips': 'transportation',
  'Transportation arrangement(non-medical)': 'transportation',
  Cable: 'tv',
  Wifi: 'wifi',
  Internet: 'wifi',
  Telephone: 'phone',
  'Air-conditioning': 'ac',
  Kitchenettes: 'kitchen',
  'Dining room': 'food',
  'Restaurant-style dining': 'food',
  'Outdoor patio': 'outdoor',
  Garden: 'flower',
  'Beauty salon': 'favourite-light',
  'Located close to shopping centers': 'shopping',
};

const CommunityDetails = ({ community }) => {
  const { propInfo } = community;
  const {
    communityHighlights,
    personalSpace,
    communitySpace,
    nonCareServices,
    languages,
  } = propInfo;
  let amenities = [];
  if (communityHighlights) {
    amenities = amenities.concat(communityHighlights)
  }
  if (personalSpace) {
    amenities = amenities.concat(personalSpace)
  }
  if (communitySpace) {
    amenities = amenities.concat(communitySpace)
  }
  if (nonCareServices) {
    amenities = amenities.concat(nonCareServices)
  }
  if (languages) {
    amenities = amenities.concat(languages)
  }
  let amenitiesComponents;
  if (amenities.length > 0 ) {
    amenitiesComponents = amenities.map(amenity => (
      <IconItem
        key={amenity}
        icon="check"
        iconPalette="primary"
        iconVariation="base"
        borderless={false}
      >
        {amenity}
      </IconItem>
    ));
  }

  return (
    <Block as="section">
      {amenities.length === 0 &&
        <Paragraph>
          No information about amenities currently available
        </Paragraph>
      }
      {amenities.length > 0 &&
        <Wrapper minHeight="regular">
          {amenitiesComponents}
        </Wrapper>
      }
    </Block>
  );
};

CommunityDetails.propTypes = {
  community: communityPropType.isRequired,
};

export default CommunityDetails;
