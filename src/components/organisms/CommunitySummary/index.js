import React, { Fragment } from 'react';
import { object, bool, func, string } from 'prop-types';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { size } from 'sly/components/themes';
import { community as communityPropType } from 'sly/propTypes/community';
import { Link, Box, Block, Heading, Hr, Icon, Button } from 'sly/components/atoms';
import CommunityPricingAndRating from 'sly/components/molecules/CommunityPricingAndRating';

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;
StyledBlock.displayName = 'StyledBlock';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.small')};
`;
StyledHeading.displayName = 'StyledHeading';

const StyledHr = styled(Hr)`
  margin-bottom: ${size('spacing.xxLarge')};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
Wrapper.displayName = 'Wrapper';

const StyledButton = styled(Button)`
  margin-right: ${size('spacing.regular')};
`;
StyledButton.displayName = 'StyledButton';

const CommunitySummary = ({
  community, innerRef, isAdmin, onConciergeNumberClicked, className,
  onFavouriteClick, isFavourited, onShareClick,
}) => {
  const {
    address, name, startingRate, propRatings, propInfo, twilioNumber,
  } = community;
  const {
    line1, line2, city, state, zip,
  } = address;
  const { communityPhone } = propInfo;
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

  return (
    <Box innerRef={innerRef} className={className}>
      <StyledHeading>
        {name} {city ? `at ${city}` : ''}
        {isAdmin &&
          <Link
            to={`/mydashboard#/mydashboard/communities/${community.id}/about`}
          >
            &nbsp;(Edit)
          </Link>
        }
      </StyledHeading>
      <StyledBlock palette="grey">{formattedAddress}</StyledBlock>
      <CommunityPricingAndRating price={startingRate} rating={reviewsValue} />
      <StyledHr />
      <Wrapper>
        <div>
          {conciergeNumber &&
            <Fragment>
              For pricing and avilability, call&nbsp;
              <Link href={`tel:${conciergeNumber}`} onClick={onConciergeNumberClicked}>
                <NumberFormat
                  value={conciergeNumber}
                  format="###-###-####"
                  displayType="text"
                />
              </Link>
            </Fragment>
          }
        </div>
        <div>
          <StyledButton ghost palette="slate" onClick={onShareClick}>
            <Icon icon="share" size="regular" palette="slate" /> Share
          </StyledButton>
          {!isFavourited &&
            <Button ghost palette="slate" onClick={onFavouriteClick}>
              <Icon icon="favourite-empty" size="regular" palette="slate" /> Save
            </Button>
          }
          {isFavourited &&
            <Button ghost palette="slate" onClick={onFavouriteClick}>
              <Icon icon="favourite-light" size="regular" palette="primary" /> Save
            </Button>
          }
        </div>
      </Wrapper>
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
  isFavourited: bool,
};

export default CommunitySummary;
