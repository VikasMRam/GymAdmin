import React from 'react';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';
import { space, sx$tablet, sx$laptop, Block, font, Button, Grid, Image, Link } from 'sly/common/system';
import { Calendar } from 'sly/common/icons';

const StyledHeadingBoxSection = styled(HeadingBoxSection).attrs({ hasNoHr: true })`
  margin-bottom:  ${space('s')};
  ${ifProp('hasNoBottomHr', sx$tablet({
    marginBottom: 'm',
    paddingBottom: 'm',
    paddingTop: '0',
  }), sx$tablet({
    marginBottom: '0',
    paddingBottom: '0',
    paddingTop: '0',
  }))}

  ${sx$laptop({
    paddingX: '0',
  })}
  font:${font('body-l')};
`;


const getActivityDetailByName = (name) => {
  const result = {};
  result.name = name;
  // ToDo : Hardcoded as of now, will replace with actual images
  if (name === 'Art classes') {
    result.imageUrl = 'react-assets/home/bottom-banner.jpg';
  } else  if (name === 'Music classes') {
    result.imageUrl = 'react-assets/home/bottom-banner.jpg';
  } else  if (name === 'Field trips') {
    result.imageUrl = 'react-assets/home/bottom-banner.jpg';
  } else  if (name === 'Virtual entertainment') {
    result.imageUrl = 'react-assets/home/bottom-banner.jpg';
  } else  if (name === 'Yoga and Tai Chi') {
    result.imageUrl = 'react-assets/home/bottom-banner.jpg';
  } else  if (name === 'Gardening') {
    result.imageUrl = 'react-assets/home/bottom-banner.jpg';
  } else  if (name === 'Spritual practice') {
    result.imageUrl = 'react-assets/home/bottom-banner.jpg';
  }  else  if (name === 'Book clubs') {
    result.imageUrl = 'react-assets/home/bottom-banner.jpg';
  }
  return result;
};


const ListingActivitiesSection = (props) => {
  const { activities, activityCalendarURL } = props;

  return (
    <StyledHeadingBoxSection  heading="Activities" >
      <Block position="relative">
        <Grid
          gridTemplateColumns="1fr 1fr"
          gridGap="m"
          sx$laptop={{
               gridTemplateColumns: 'repeat(4, 1fr)',
             }}
          sx$tablet={{
              gridTemplateColumns: 'repeat(4, 1fr)',
            }}
        >
          {
          activities.map(((activity) => {
            const { name, imageUrl } = getActivityDetailByName(activity);
            return (
              <Block height="100%" width="100%">
                <Image
                  path={imageUrl}
                  alt={name}
                  sx$tablet={{
               }}
                  sx$laptop={{
                    width: '100%',
               }}
                  key={name}
                  aspectRatio="3:2"
                  sizes="(max-width: 727px) 50vw, (max-width: 1079px) 334px, 250px"
                  sources={[
                138,
                186,
                250,
                334,
              ]}
                  loading="lazy"
                  border="round"
                />
                <Block lineHeight="normal">
                  {name}
                </Block>
              </Block>

            );
          }))
          }
        </Grid>
      </Block>
      {
      activityCalendarURL &&
      <Link href={activityCalendarURL}>
        <Button sx$tablet={{ paddingX: 's' }} variant="neutral" width="100%" mt="m">
          <Calendar mr="xs" />View sample activity calendar
        </Button>
      </Link>
      }
    </StyledHeadingBoxSection>
  );
};

export default ListingActivitiesSection;
