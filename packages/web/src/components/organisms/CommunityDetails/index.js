import React from 'react';

import { community as communityPropType } from 'sly/common/propTypes/community';
import { capitalize } from 'sly/web/services/helpers/utils';
import { Block, Span, Grid, Paragraph, Link, IconWithTextWrapper } from 'sly/common/system';
import CollapsibleBlock from 'sly/web/components/molecules/CollapsibleBlock';
import { CommunitySizeLarge, Family, Care, Laundry, Fitness, Entertainment, Luggage, Transportation, Tv, Wifi, Phone, Ac, Kitchen, Food, Bed, Pet, Location, Outdoor, Spa, Flower, RoomService, Book, Couch, Pool, Bathroom } from 'sly/common/icons';


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
  'recently renovated': CommunitySizeLarge,
  'family-owned and operated': Family,
  'medication management': Care,
  'meal preparation and service': Care,
  'transportation arrangement': Care,
  '24-hour supervision': Care,
  '24-hour call system': Care,
  'coordination with health care providers': Care,
  'housekeeping and linen services': Laundry,
  'housekeeping & linen services': Laundry,
  'fitness programs': Fitness,
  'community-sponsored activities': Entertainment,
  'move-in coordination': Luggage,
  'planned day trips': Transportation,
  'transportation arrangement (non-medical)': Transportation,
  cable: Tv,
  wifi: Wifi,
  internet: Wifi,
  telephone: Phone,
  'air-conditioning': Ac,
  kitchenettes: Kitchen,
  'dining room': Food,
  'restaurant-style dining': Food,
  'outdoor patio': Outdoor,
  garden: Flower,
  'beauty salon': Spa,
  'located close to shopping centers': Location,
  'activities of daily living assistance': Care,
  'assistance with bathing': Care,
  'assistance with dressing': Care,
  'assistance with transfers': Care,
  'transportation arrangement (medical)': Care,
  'transportation to doctors appointment': Care,
  'coordination with health care provide': Care,
  'physical therapy': Care,
  'special dietary restrictions': Care,
  'diabetes diet': Care,
  'diabetes care': Care,
  'administer insulin injections': Care,
  '24-hour nursing': Care,
  '12-16 hour nursing': Care,
  "parkinson's care": Care,
  'care with behavioral issues': Care,
  'rehabilitation program': Care,
  'mental wellness program': Care,
  'mild cognitive impairment': Care,
  'dementia waiver': Care,
  'specialized memory care programming': Care,
  'respite program': Care,
  'hospice waiver': Care,
  'accept incoming residents on hospice': Care,
  'same day assessments': Care,
  'preventative health screenings': Care,
  'non-care services': Laundry,
  'community operated transportation': Transportation,
  'concierge services': RoomService,
  'scheduled daily activities': Entertainment,
  'resident-run activities': Entertainment,
  'continuing learning programs': Book,
  'family education and support services': Book,
  'private bathrooms': Bathroom,
  'air conditioning': Ac,
  'fully furnished': Couch,
  'restaurant style dining': Food,
  'family private dining rooms': Food,
  cafe: Food,
  'organic food and ingredients': Food,
  'on-site market': Food,
  'outdoor space': Outdoor,
  'small library': Book,
  'gaming room': Entertainment,
  'computer center': Tv,
  'fitness room': Fitness,
  'swimming pool': Pool,
  spa: Spa,
  'wellness center': Spa,
  'religious/meditation center': Spa,
  'located close to restaurants': Location,
  'pet friendly': Pet,
  'family overnight stay rooms': Bed,
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
        .map((k) => {
          const Icon = groupItemIcons[k.toLowerCase()] || Care;

          return (
            <IconWithTextWrapper
              key={k}
              pad="0"
            >
              <Icon /> {capitalize(k.toLowerCase())}
            </IconWithTextWrapper>
          );
        });

      if (!icons.length) {
        return null;
      }

      return (
        <Block key={k}>
          <Block font="title-m" pad="m">{groupTitles[k]}</Block>
          <Grid
            gridGap="s"
            gridTemplateColumns="100%"
            sx$tablet={{
            gridTemplateColumns: '1fr 1fr',
            gridGap: 'xs',
            gridColumnGap: 'xxl',
            }}
          >
            {icons}
          </Grid>
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
        <CollapsibleBlock showChevron={false} collapsedLabel="Show all amenities" notCollapsedLabel="Show less amenities" minHeight="regular">
          {groupComponents.length > 0 &&
            <Grid flow="row" gridGap="xl" pad={licenseUrl ? 'xl' : null}>
              {groupComponents}
            </Grid>
          }
          {licenseUrl && (
            <Block>
              <Block font="title-xs" pad="s">Licensing</Block>
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
