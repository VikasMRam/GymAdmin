import React from 'react';
import styled from 'styled-components';

import { community as communityPropType } from 'sly/common/propTypes/community';
import { upTo } from 'sly/common/components/helpers';
import { capitalize } from 'sly/web/services/helpers/utils';
import { Paragraph, Block, Link, Grid } from 'sly/common/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import CollapsibleBlock from 'sly/web/components/molecules/CollapsibleBlock';

const Wrapper = styled(Grid)`
  ${upTo('laptop', 'grid-template-columns: 100%;')}
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
  communityHighlights: 'Community highlights',
  careServices: 'Care services',
  personalSpace: 'Room amenities',
  communitySpace: 'Community amenities',
  nonCareServices: 'Non-care services',
};

const groupItemIcons = {
  'recently renovated': 'community-size-large',
  'family-owned and operated': 'family',
  'medication management': 'care',
  'meal preparation and service': 'care',
  'transportation arrangement': 'care',
  '24-hour supervision': 'care',
  '24-hour call system': 'care',
  'coordination with health care providers': 'care',
  'housekeeping and linen services': 'laundry',
  'housekeeping & linen services': 'laundry',
  'fitness programs': 'fitness',
  'community-sponsored activities': 'entertainment',
  'move-in coordination': 'luggage',
  'planned day trips': 'transportation',
  'transportation arrangement (non-medical)': 'transportation',
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
  'beauty salon': 'spa',
  'located close to shopping centers': 'location',
  'activities of daily living assistance': 'care',
  'assistance with bathing': 'care',
  'assistance with dressing': 'care',
  'assistance with transfers': 'care',
  'transportation arrangement (medical)': 'care',
  'transportation to doctors appointment': 'care',
  'coordination with health care provide': 'care',
  'physical therapy': 'care',
  'special dietary restrictions': 'care',
  'diabetes diet': 'care',
  'diabetes care': 'care',
  'administer insulin injections': 'care',
  '24-hour nursing': 'care',
  '12-16 hour nursing': 'care',
  "parkinson's care": 'care',
  'care with behavioral issues': 'care',
  'rehabilitation program': 'care',
  'mental wellness program': 'care',
  'mild cognitive impairment': 'care',
  'dementia waiver': 'care',
  'specialized memory care programming': 'care',
  'respite program': 'care',
  'hospice waiver': 'care',
  'accept incoming residents on hospice': 'care',
  'same day assessments': 'care',
  'preventative health screenings': 'care',
  'non-care services': 'laundry',
  'community operated transportation': 'transportation',
  'concierge services': 'room-service',
  'scheduled daily activities': 'entertainment',
  'resident-run activities': 'entertainment',
  'continuing learning programs': 'book',
  'family education and support services': 'book',
  'private bathrooms': 'bathroom',
  'air conditioning': 'ac',
  'fully furnished': 'couch',
  'restaurant style dining': 'food',
  'family private dining rooms': 'food',
  cafe: 'food',
  'organic food and ingredients': 'food',
  'on-site market': 'food',
  'outdoor space': 'outdoor',
  'small library': 'book',
  'gaming room': 'entertainment',
  'computer center': 'tv',
  'fitness room': 'fitness',
  'swimming pool': 'pool',
  spa: 'spa',
  'wellness center': 'spa',
  'religious/meditation center': 'spa',
  'located close to restaurants': 'location',
  'pet friendly': 'pet',
  'family overnight stay rooms': 'bed',
};

const groupItemOrders = {
  careServices: [
    'activities of daily living assistance',
    'assistance with dressing',
    'medication management',
    'transportation arrangement (medical)',
    'coordination with health care providers',
    '24-hour supervision',
    'special dietary restrictions',
    'diabetes care',
    '24-hour nursing',
    "parkinson's care",
    'rehabilitation program',
    'mild cognitive impairment',
    'specialized memory care programming',
    'hospice waiver',
    'same day assessments',
    'assistance with bathing',
    'assistance with transfers',
    'meal preparation and service',
    'transportation to doctors appointment',
    '24-hour call system',
    'physical therapy',
    'diabetes diet',
    'administer insulin injections',
    '12-16 hour nursing',
    'care with behavioral issues',
    'mental wellness program',
    'dementia waiver',
    'respite program',
    'accept incoming residents on hospice',
    'preventative health screenings',
  ],
  personalSpace: [
    'cable',
    'internet',
    'private bathrooms',
    'kitchenettes',
    'wifi',
    'telephone',
    'air-conditioning',
    'air conditioning',
    'fully furnished',
  ],
  communitySpace: [
    'dining room',
    'family private dining rooms',
    'organic food and ingredients',
    'outdoor space',
    'garden',
    'gaming room',
    'fitness room',
    'spa',
    'wellness center',
    'located close to shopping centers',
    'pet friendly',
    'restaurant-style dining',
    'cafe',
    'on-site market',
    'outdoor patio',
    'small library',
    'computer center',
    'swimming pool',
    'beauty salon',
    'religious/meditation center',
    'located close to restaurants',
  ],
  nonCareServices: [
    'housekeeping and linen services',
    'community operated transportation',
    'concierge services',
    'community-sponsored activities',
    'planned day trips',
    'continuing learning programs',
    'transportation arrangement (non-medical)',
    'fitness programs',
    'scheduled daily activities',
    'resident-run activities',
    'move-in coordination',
    'family education and support services',
  ],
};

const shuffle = (input) => {
  const leftsize = Math.ceil(input.length / 2);
  const output = [];
  for (let i = 0; i < leftsize; i++) {
    output.push(input[i]);
    if (input[leftsize + i]) output.push(input[leftsize + i]);
  }
  return output;
};

export const orderItems = (keys, groupName) => {
  keys = keys.map(k => k.toLowerCase());

  return shuffle(
    groupItemOrders[groupName] ?
      groupItemOrders[groupName]
        .slice()
        .filter(item => keys.includes(item) ? item : null)
        .filter(i => i) : keys,
  );
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
      const sortedKeys = orderItems(keys, k);

      const icons = sortedKeys
        .map(k => (
          <IconItem
            key={k}
            icon={groupItemIcons[k.toLowerCase()] || 'care'}
            iconPalette="slate"
            iconVariation="base"
          >
            {capitalize(k.toLowerCase())}
          </IconItem>
        ));

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
