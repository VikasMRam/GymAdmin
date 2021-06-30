import React from 'react';
import { object, bool, func, string } from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import Tag  from 'sly/web/components/atoms/Tag/newSystem';
import ListItem from 'sly/web/components/molecules/ListItem/newSystem';
import { AVAILABLE_TAGS, PERSONAL_CARE_HOME, ASSISTED_LIVING, PERSONAL_CARE_HOME_STATES, CONTINUING_CARE_RETIREMENT_COMMUNITY, CCRC, ACTIVE_ADULT } from 'sly/web/constants/tags';
import { listing as listingPropType } from 'sly/common/propTypes/listing';
import { Heading, Block, Span, color, Hr, space, Link, sx$laptop, Button, sx$tablet, Grid } from 'sly/common/system';
import CommunityRating from 'sly/web/components/molecules/CommunityRating';
import { isBrowser } from 'sly/web/config';
import { tocPaths } from 'sly/web/services/helpers/url';
import { phoneFormatter } from 'sly/web/services/helpers/phone';
import { showFafNumber, getFafNumber } from 'sly/web/services/helpers/community';
import { Money, Help, Community, SqFt, Bed, Garage, Bathroom, Beds, Favorite, Share } from 'sly/common/icons';


const overridePosition = ({ left, top }) => ({
  top,
  left: left < 5 ? 5 : left,
});

const StyledHelpIcon = styled(Help)`
  margin-left: ${space('spacing.xxs')};
  color: ${color('slate.lighter-60')};
  vertical-align: text-top;
`;

const TooltipContent = styled(ReactTooltip)`
  padding: ${space('xs')}!important;
  color: ${color('slate')}!important;
  background-color: ${color('white')}!important;
  box-shadow: 0 0 ${space('m')} ${color('slate.lighter-80')}80;
`;

const OverlayTwoColumnListWrapper = styled.div`
  margin-bottom: ${space('m')};
  display: grid;
  grid-template-columns: 100%;
  grid-row-gap: ${space('m')};
  ${sx$laptop({
    gridTemplateColumns: '50% 50%',
  })}
`;


const MobileListingRating = styled(CommunityRating)`
  margin-bottom: ${space('s')};
`;

const getCareTypes = (address, careTypes) => {
  const updatedCareTypes = [];

  const { state, country } = address;

  careTypes.forEach((careType) => {
    const tocBc = tocPaths([careType]);

    const availableTags = AVAILABLE_TAGS[country] || [];


    if (availableTags.includes(careType)) {
      const isPersonalCareHome = PERSONAL_CARE_HOME_STATES.includes(state) && careType === ASSISTED_LIVING;
      let tag = careType;

      if (isPersonalCareHome) {
        tag = PERSONAL_CARE_HOME;
      } else if (careType === CONTINUING_CARE_RETIREMENT_COMMUNITY) {
        tag = CCRC;
      }

      updatedCareTypes.push({ tag, path: tocBc.path });
    }
  });
  return updatedCareTypes;
};


const ListingSummary = ({
  listing, innerRef, isAdmin, className,
  goToReviews, searchParams, formattedAddress, onSaveClick, onShareClick, isFavorited,
}) => {
  const {
    address, name, info, twilioNumber, partnerAgents, tags, community,
  } = listing;

  const { care, propInfo } = community;

  const { typeCare } = propInfo;


  const {
    phoneNumber, typeOfHome, squareFeet, numBeds, numBaths, priceRange, garage,
  } = info;
  const { ratingValue, numReviews } = info.ratingInfo;

  let conciergeNumber = phoneNumber;

  if (twilioNumber && twilioNumber.numbers && twilioNumber.numbers.length) {
    [conciergeNumber] = twilioNumber.numbers;
  }
  if (!conciergeNumber) {
    conciergeNumber = '8558664515';
  }

  const careTypes = care ? getCareTypes(address, care) : getCareTypes(address, typeCare);


  const partnerAgent = partnerAgents && partnerAgents.length > 0 ? partnerAgents[0] : null;


  return (
    <Block pb="l" px="m" sx$laptop={{ px: '0' }} ref={innerRef} className={className}>
      <Heading
        font="title-xl"
        pad="xs"
      >
        {name}
        {isAdmin &&
          <Link
            to={`/dashboard/listings/${listing.id}`}
          >
            &nbsp;(Edit)
          </Link>
        }
      </Heading>

      <Block pad="xs">
        {formattedAddress}
      </Block>


      {ratingValue > 0 &&
        <MobileListingRating
          rating={ratingValue}
          numReviews={numReviews}
          goToReviews={goToReviews}
          reviewsText
        />
      }

      <Block>
        {careTypes.map(careType => (
          <Tag
            key={careType.path}
            marginRight="xs"
          >
            <Link
              color="white"
              to={`${careType.path}/${searchParams.state}/${searchParams.city}`}
              target="_blank"
              event={{
                category: 'care-type-tags',
                action: 'tag-click',
                label: careType.tag,
              }}
            >
              {careType.tag}
            </Link>
          </Tag>
        ))}
      </Block>

      <Hr mt="l" mb="l" />
      <Grid
        gridTemplateColumns="auto"
        sx$tablet={{
        gridTemplateColumns: !phoneNumber && !partnerAgent ? 'auto' : '35% 1fr',
        gridGap: !phoneNumber && !partnerAgent ? '0' : 'xl' }}
      >
        <Grid gridTemplateColumns="1fr 1fr" gridGap="s">
          <Button sx$tablet={{ paddingX: 's' }} onClick={onSaveClick}  variant="neutral"><Favorite active={isFavorited} color={isFavorited && 'red.lighter-20'} mr="xs" />Save</Button>
          <Button sx$tablet={{ paddingX: 's' }} onClick={onShareClick} variant="neutral" ><Share mr="xs" />Share</Button>
        </Grid>
        <Hr mt="l" mb="l" sx$tablet={{ display: 'none' }} />

      </Grid>

      <Hr mt="l" display="none" sx$tablet={{ display: 'block' }} />

    </Block>
  );
};

ListingSummary.propTypes = {
  listing: listingPropType.isRequired,
  innerRef: object,
  isAdmin: bool,
  onListingNumberClicked: func,
  className: string,
  goToReviews: func,
  searchParams: object,
  formattedAddress: string,
  onSaveClick: func,
  onShareClick: func,
  isFavorited: bool,
};

export default ListingSummary;
