import React from 'react';
import { object, bool, func, string } from 'prop-types';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { size, palette } from 'sly/components/themes';
import { community as communityPropType } from 'sly/propTypes/community';
import { Link, Box, Heading, Hr, Icon, Tag } from 'sly/components/atoms';
import IconButton from 'sly/components/molecules/IconButton';
import CommunityPricingAndRating from 'sly/components/molecules/CommunityPricingAndRating';
import { USER_SAVE_DELETE_STATUS } from 'sly/constants/userSave';
import { isBrowser } from 'sly/config';
import PlusBadge from 'sly/components/molecules/PlusBadge';
import { tocPaths } from 'sly/services/helpers/url';

const Address = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledTag = styled(Tag)`
  margin-right: ${size('spacing.regular')};
  text-transform: uppercase;
  background-color: ${palette('secondary', 'background')};
  border: 1px solid ${palette('secondary', 'filler')};
  color: ${palette('secondary', 'base')};
  border-radius: ${size('spacing.small')};
  letter-spacing: ${size('spacing.nano')};
  line-height: ${size('spacing.large')};
  height: ${size('spacing.xLarge')};
  font-size: ${size('spacing.medium')};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  > *:first-child {
    margin-bottom: ${size('spacing.medium')};
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
    align-items: center;
    > *:first-child {
      margin-bottom: 0;
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  margin-right: ${size('spacing.regular')};
`;

const StyledIcon = styled(Icon)`
  margin-left: ${size('spacing.small')};
  vertical-align: text-top;
`;

const TooltipContent = styled(ReactTooltip)`
  padding: ${size('spacing.regular')};
  color: ${palette('white', 'base')} !important;
  background-color: ${palette('slate', 'base')} !important;
  border-radius: ${size('spacing.tiny')};
  font-size: ${size('text.caption')};

  &.place-top {
    &:after {
      border-top-color: ${palette('slate', 'base')} !important;
    }
  }
`;
const CommunitySummary = ({
  community, innerRef, isAdmin, onConciergeNumberClicked, className,
  onFavouriteClick, isFavorited, onShareClick, goToReviews, searchParams,
}) => {
  const {
    address, name, startingRate, propRatings, propInfo, twilioNumber,
  } = community;
  const {
    line1, line2, city, state, zip,
  } = address;
  const { communityPhone, plusCommunity, plusCategory, typeCare } = propInfo;
  const { reviewsValue } = propRatings;
  const formattedAddress = `${line1}, ${line2}, ${city},
    ${state}
    ${zip}`
    .replace(/\s/g, ' ')
    .replace(/, ,/g, ', ');
  let conciergeNumber = communityPhone;
  if (twilioNumber && twilioNumber.numbers && twilioNumber.numbers.length) {
    [conciergeNumber] = twilioNumber.numbers;
  }
  if (!conciergeNumber) {
    conciergeNumber = '8558664515';
  }

  const favIcon = isFavorited ? 'favourite-light' : 'favourite-empty';

  return (
    <Box innerRef={innerRef} className={className}>
      <StyledHeading level="hero" size="title">
        {name}
        {isAdmin &&
          <Link
            to={`/mydashboard#/mydashboard/communities/${community.id}/about`}
          >
            &nbsp;(Edit)
          </Link>
        }
      </StyledHeading>
      <Address weight="regular" level="subtitle" size="body" palette="grey">{formattedAddress}</Address>

      {
        typeCare.map((careType) => {
          const tocBc = tocPaths([careType]);

          return (
            <Link
              to={`${tocBc.path}/${searchParams.state}/${searchParams.city}`}
              target="_blank"
            >
              <StyledTag key={careType}>{careType}</StyledTag>
            </Link>);
        })
      }

      {plusCommunity &&
        <PlusBadge plusCategory={plusCategory} />
      }
      <Hr />
      <Wrapper>
        <div>
          For pricing and availability, call&nbsp;
          <Link href={`tel:${conciergeNumber}`} onClick={onConciergeNumberClicked}>
            <NumberFormat
              value={conciergeNumber}
              format="(###) ###-####"
              displayType="text"
            />
          </Link>
          <StyledIcon palette="slate" variation="dark" icon="help" size="caption" data-tip data-for="phone" />
          {isBrowser &&
            <TooltipContent id="phone" place="top" effect="solid" multiline>
              This phone number will connect you to the concierge team at Seniorly.
            </TooltipContent>
          }
        </div>
        <div>
          <StyledIconButton ghost transparent icon="share" onClick={onShareClick}>
            Share
          </StyledIconButton>
          <StyledIconButton ghost transparent icon={favIcon} onClick={onFavouriteClick}>
            Save
          </StyledIconButton>
        </div>
      </Wrapper>
      <Hr />
      <CommunityPricingAndRating price={startingRate} rating={reviewsValue} goToReviews={goToReviews} />
    </Box>
  );
};

CommunitySummary.propTypes = {
  community: communityPropType.isRequired,
  innerRef: object,
  isAdmin: bool,
  onConciergeNumberClicked: func,
  className: string,
  onFavouriteClick: func,
  onShareClick: func,
  goToReviews: func,
  isFavorited: bool,
  searchParams: object,
};

export default CommunitySummary;
