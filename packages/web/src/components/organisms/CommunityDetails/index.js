import React from 'react';
import styled, { css } from 'styled-components';

import { size } from 'sly/common/components/themes';
import { community as communityPropType } from 'sly/common/propTypes/community';
import { upTo } from 'sly/common/components/helpers';
import { Paragraph, Block, Link, Grid } from 'sly/common/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import CollapsibleBlock from 'sly/web/components/molecules/CollapsibleBlock';

const Wrapper = styled(Grid)`
  ${upTo('laptop', css`
    grid-template-columns: 100%;
    grid-row-gap: ${size('spacing.large')};
  `)}
`;
Wrapper.displayName = 'Wrapper';

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
  'Recently renovated': 'community-size-large',
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
  const { propInfo, name, address: { state } } = community;
  const { licenseUrl } = propInfo;

  const groupComponents = groupKeys.map((k) => {
    if (propInfo[k]) {
      const keys = propInfo[k];
      return (
        <Block key={k}>
          <Block weight="medium" pad="medium">{groupTitles[k]}</Block>
          <Wrapper gap="medium" dimensions={['50%', '50%']}>
            {keys.map(k => (
              <IconItem
                key={k}
                icon={groupItemIcons[k] || 'check'}
                iconPalette="slate"
                iconVariation="base"
              >
                {k}
              </IconItem>
            ))}
          </Wrapper>
        </Block>
      );
    }

    return null;
  })
    .filter(g => g);

  return (
    <Block as="section">
      {groupComponents.length === 0 &&
        <Paragraph>
          No information about details currently available
        </Paragraph>
      }
      {(groupComponents.length > 0 || licenseUrl) &&
        <CollapsibleBlock minHeight="regular">
          {groupComponents.length > 0 &&
            <Grid flow="row" gap="xxLarge" pad={licenseUrl ? 'xxLarge' : null}>
              {groupComponents}
            </Grid>
          }
          {licenseUrl && (
            <Block>
              <Block weight="medium" pad="medium">Licensing</Block>
              <Block>
                {name} is licensed by the state of {state}. Visit the <Link href={licenseUrl}>state licensing website</Link> for more information.
              </Block>
            </Block>
          )}
        </CollapsibleBlock>
      }
    </Block>
  );
};

CommunityDetails.propTypes = {
  community: communityPropType.isRequired,
};

export default CommunityDetails;
