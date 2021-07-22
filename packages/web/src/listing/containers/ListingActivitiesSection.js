import React from 'react';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import { string, arrayOf } from 'prop-types';

import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';
import { space, sx$tablet, sx$laptop, Block, font, Button, Grid, Image, Link } from 'sly/common/system';
import { Calendar } from 'sly/common/icons';
import { assetPath } from 'sly/web/components/themes';

const StyledHeadingBoxSection = styled(HeadingBoxSection).attrs({ hasNoHr: true })`
  margin-bottom:  ${space('xs')};
  ${ifProp('hasNoBottomHr', sx$tablet({
    marginBottom: 'm',
    paddingBottom: 'm',
    paddingTop: '0',
    paddingLeft: '0',
    paddingRight: '0',
  }), sx$tablet({
    marginBottom: '0',
    paddingBottom: '0',
    paddingTop: '0',
    paddingLeft: '0',
    paddingRight: '0',
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
    result.imageSrc = 'react-assets/listing-activities/art-classes.jpg';
  } else  if (name === 'Music classes') {
    result.imageSrc = 'react-assets/listing-activities/music-classes.jpg';
  } else  if (name === 'Field trips') {
    result.imageSrc = 'react-assets/listing-activities/field-trips.jpg';
  } else  if (name === 'Virtual entertainment') {
    result.imageSrc = 'react-assets/listing-activities/virtual-entertainment.jpg';
  } else  if (name === 'Yoga and Tai Chi') {
    result.imageSrc = 'react-assets/listing-activities/yoga-and-tai-chi.jpg';
  } else  if (name === 'Gardening') {
    result.imageSrc = 'react-assets/listing-activities/gardening.jpg';
  } else  if (name === 'Spritual practice') {
    result.imageSrc = 'react-assets/listing-activities/spiritual-practice.jpg';
  }  else  if (name === 'Book clubs') {
    result.imageSrc = 'react-assets/listing-activities/book-clubs.jpg';
  }
  return result;
};


const ListingActivitiesSection = ({ activities, activityCalendarURL, ...props }) => {
  return (
    <StyledHeadingBoxSection mb="xs"  heading="Activities" {...props} >
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
            const { name, imageSrc } = getActivityDetailByName(activity);
            return (
              <Block key={activity} height="100%" width="100%">
                <Image
                  path={imageSrc}
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
                <Block as="span" pt="xs" font="body-m">
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
        <Button sx$tablet={{ paddingX: 's' }} variant="neutral" width="100%" mt="l">
          <Calendar mr="xs" />View sample activity calendar
        </Button>
      </Link>
      }
    </StyledHeadingBoxSection>
  );
};

ListingActivitiesSection.propTypes = {
  activities: arrayOf(string),
  activityCalendarURL: string,
};

export default ListingActivitiesSection;
