import React from 'react';
import { object, bool, func, string } from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import Tag  from 'sly/web/components/atoms/Tag/newSystem';
import ListItem from 'sly/web/components/molecules/ListItem/newSystem';
import { AVAILABLE_TAGS, PERSONAL_CARE_HOME, ASSISTED_LIVING, PERSONAL_CARE_HOME_STATES, CONTINUING_CARE_RETIREMENT_COMMUNITY, CCRC, ACTIVE_ADULT } from 'sly/web/constants/tags';
import { community as communityPropType } from 'sly/common/propTypes/community';
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


const MobileCommunityRating = styled(CommunityRating)`
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


const CommunitySummary = ({
  community, innerRef, isAdmin, onConciergeNumberClicked, onCommunityNumberClicked, className,
  goToReviews, searchParams, formattedAddress, onSaveClick, onShareClick, isFavorited,
}) => {
  const {
    address, name, propRatings, propInfo, twilioNumber, partnerAgents, care,
  } = community;

  const {
    communityPhone, typeCare, typeOfHome, squareFeet, numBeds, numBaths, priceRange, garage,
  } = propInfo;
  const { reviewsValue, numReviews } = propRatings;

  let conciergeNumber = communityPhone;

  if (twilioNumber && twilioNumber.numbers && twilioNumber.numbers.length) {
    [conciergeNumber] = twilioNumber.numbers;
  }
  if (!conciergeNumber) {
    conciergeNumber = '8558664515';
  }

  const careTypes = care ? getCareTypes(address, care) : getCareTypes(address, typeCare);

  const partnerAgent = partnerAgents && partnerAgents.length > 0 ? partnerAgents[0] : null;

  const showFriendsFamilyNumber = showFafNumber(address);
  const fafn = getFafNumber(conciergeNumber, '1');

  return (
    <Block pb="l" px="m" sx$laptop={{ px: '0' }} ref={innerRef} className={className}>
      <Heading
        font="title-xl"
        pad="xs"
      >
        {name}
        {isAdmin &&
          <Link
            to={`/dashboard/communities/${community.id}`}
          >
            &nbsp;(Edit)
          </Link>
        }
      </Heading>

      <Block pad="xs">
        {formattedAddress}
      </Block>


      {reviewsValue > 0 &&
        <MobileCommunityRating
          rating={reviewsValue}
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
        gridTemplateColumns: !communityPhone && !partnerAgent ? 'auto' : '35% 1fr',
        gridGap: !communityPhone && !partnerAgent ? '0' : 'xl' }}
      >
        <Grid gridTemplateColumns="1fr 1fr" gridGap="s">
          <Button sx$tablet={{ paddingX: 's' }} onClick={onSaveClick}  variant="neutral"><Favorite active={isFavorited} color={isFavorited && 'red.lighter-20'} mr="xs" />Save</Button>
          <Button sx$tablet={{ paddingX: 's' }} onClick={onShareClick} variant="neutral" ><Share mr="xs" />Share</Button>
        </Grid>
        <Hr mt="l" mb="l" sx$tablet={{ display: 'none' }} />
        <Grid gridTemplateColumns="1fr 1fr" gridGap="m" sx$tablet={{ display: 'flex' }}>
          {
            communityPhone &&
            <div>
              <Span font="body-s">For Friends & Family</Span>
              <StyledHelpIcon  size="s" data-tip data-for="fafPhone" />
              {isBrowser &&
              <TooltipContent overridePosition={overridePosition} id="fafPhone" type="light" effect="solid" multiline>
                This phone number may connect you to the community front desk.
              </TooltipContent>
              }
              <br />
              <Link href={`tel:${communityPhone}`} onClick={onCommunityNumberClicked}>
                {phoneFormatter(communityPhone, true)}
              </Link>
            </div>
          }
          {
            partnerAgent &&
              <div>
                <Span font="body-s">For Pricing & Availability</Span>
                <StyledHelpIcon size="s" data-tip data-for="conciergePhone" />
                {isBrowser &&
                <TooltipContent overridePosition={overridePosition} id="conciergePhone" type="light" effect="solid" multiline>
                  This phone number will connect you to the concierge team at Seniorly.
                </TooltipContent>
                }
                <br />
                <Link href={`tel:${conciergeNumber}`} onClick={onConciergeNumberClicked}>
                  {phoneFormatter(conciergeNumber, true)}
                </Link>
              </div>
          }
        </Grid>
      </Grid>

      <Hr mt="l" display="none" sx$tablet={{ display: 'block' }} />


      {care && care.includes(ACTIVE_ADULT) &&
        <>
          {communityPhone && <Hr mb="l" mt="l" />}
          <OverlayTwoColumnListWrapper>
            {priceRange &&
            <ListItem Icon={<Money color="slate.lighter-40" />}>
              <div>
                <strong> Price Range </strong>
                <br />
                {priceRange}
              </div>

            </ListItem>
            }
            {typeOfHome &&
            <ListItem Icon={<Community color="slate.lighter-40" />}>
              <div>
                <strong> Home Type </strong>
                <br />
                {typeOfHome}
              </div>
            </ListItem>
            }
            {squareFeet &&
            <ListItem Icon={<SqFt color="slate.lighter-40" />}>
              <div>
                <strong> Sq. Ft </strong>
                <br />
                {squareFeet}
              </div>
            </ListItem>
            }
            {numBeds &&
            <ListItem Icon={numBeds === 1 ? <Bed color="slate.ligher-40" /> : <Beds color="slate.lighter-40" />}>
              <div>
                <strong> No. of Beds </strong>
                <br />
                {numBeds}
              </div>
            </ListItem>
            }
            {numBaths &&
            <ListItem Icon={<Bathroom color="slate.lighter-40" />}>
              <div>
                <strong> No. of Baths </strong>
                <br />
                {numBaths}
              </div>
            </ListItem>
            }
            {garage &&
            <ListItem Icon={<Garage color="slate.lighter-40" />}>
              <div>
                <strong> Garage </strong>
                <br />
                {garage}
              </div>
            </ListItem>
            }
          </OverlayTwoColumnListWrapper>
        </>
      }
    </Block>
  );
};

CommunitySummary.propTypes = {
  community: communityPropType.isRequired,
  innerRef: object,
  isAdmin: bool,
  onConciergeNumberClicked: func,
  onCommunityNumberClicked: func,
  className: string,
  goToReviews: func,
  searchParams: object,
  formattedAddress: string,
  onSaveClick: func,
  onShareClick: func,
  isFavorited: bool,
};

export default CommunitySummary;
