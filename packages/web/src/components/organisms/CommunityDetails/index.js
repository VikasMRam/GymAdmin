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
  'recently renovated': 'community-size-large',
  'family-owned and operated': 'family',
  'medication management': 'care',
  'meal preparation and service': 'food',
  'transportation arrangement': 'transportation',
  '24-hour supervision': 'security',
  '24-hour call system': 'phone',
  'coordination with health care providers': 'care',
  'housekeeping and linen services': 'laundry',
  'fitness programs': 'fitness',
  'community-sponsored activities': 'family',
  'move-in coordination': 'luggage',
  'planned day trips': 'transportation',
  'transportation arrangement(non-medical)': 'transportation',
  cable: 'tv',
  wifi: 'wifi',
  internet: 'wifi',
  telephone: 'phone',
  'air-conditioning': 'ac',
  kitchenettes: 'kitchen',
  'dining room': 'food',
  'restaurant-style dining': 'food',
  'outdoor patio': 'outdoor',
  garden: 'flower',
  'beauty salon': 'favourite-light',
  'located close to shopping centers': 'shopping',
};

const CommunityDetails = ({ community }) => {
  const { propInfo, name, address: { state }, rgsAux } = community;
  let { licenseUrl } = propInfo;

  if (rgsAux.stateLicensingWebsite) {
    licenseUrl = rgsAux.stateLicensingWebsite;
  }

  const groupComponents = groupKeys.map((k) => {
    if (propInfo[k]) {
      const keys = propInfo[k];

      const icons = keys.map(k => groupItemIcons[k.toLowerCase()] ? (
        <IconItem
          key={k}
          icon={groupItemIcons[k.toLowerCase()] || 'check'}
          iconPalette="slate"
          iconVariation="base"
        >
          {k}
        </IconItem>
      ) : null)
        .filter(i => i);

      if (!icons.length) {
        return null;
      }

      return (
        <Block key={k}>
          <Block weight="medium" pad="medium">{groupTitles[k]}</Block>
          <Wrapper gap="medium" dimensions={['50%', '50%']}>
            {icons}
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
